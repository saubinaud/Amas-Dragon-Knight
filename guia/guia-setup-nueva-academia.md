# Guía: Setup completo para nueva academia

> Basado en la arquitectura de AMAS Team Wolf. Replicar para Dragon Knight u otra academia.

---

## 1. Base de datos PostgreSQL

La DB de Dragon Knight (`dragonknight_database`) ya tiene las tablas creadas. Si necesitas crear desde cero en otra academia, usa este SQL:

```sql
-- ============================================
-- SETUP DATABASE — Academia de Artes Marciales
-- ============================================
-- Timezone Lima
ALTER DATABASE nombre_database SET timezone TO 'America/Lima';

-- ============================================
-- TABLAS
-- ============================================

CREATE TABLE alumnos (
    id SERIAL PRIMARY KEY,
    nombre_alumno VARCHAR(200) NOT NULL,
    dni_alumno VARCHAR(20),
    fecha_nacimiento DATE,
    categoria VARCHAR(50) DEFAULT 'No especificada',
    nombre_apoderado VARCHAR(200),
    dni_apoderado VARCHAR(20),
    correo VARCHAR(150),
    telefono VARCHAR(50),
    direccion TEXT,
    estado VARCHAR(20) DEFAULT 'Activo',
    auth_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE alumnos ADD CONSTRAINT alumnos_dni_unique UNIQUE (dni_alumno);
CREATE INDEX idx_alumnos_estado ON alumnos(estado);
CREATE INDEX idx_alumnos_nombre ON alumnos(nombre_alumno);
CREATE INDEX idx_alumnos_auth_id ON alumnos(auth_id);

CREATE TABLE inscripciones (
    id SERIAL PRIMARY KEY,
    alumno_id INTEGER NOT NULL REFERENCES alumnos(id) ON DELETE CASCADE,
    programa VARCHAR(100),
    fecha_inscripcion DATE,
    fecha_inicio DATE,
    fecha_fin DATE,
    clases_totales INTEGER,
    turno VARCHAR(50),
    dias_tentativos VARCHAR(100),
    precio_programa DECIMAL(10,2),
    precio_pagado DECIMAL(10,2),
    descuento DECIMAL(10,2) DEFAULT 0,
    codigo_promocional VARCHAR(50),
    tipo_cliente VARCHAR(50) DEFAULT 'Nuevo/Primer registro',
    estado VARCHAR(30) DEFAULT 'Activo',
    estado_pago VARCHAR(30) DEFAULT 'Pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_inscripciones_alumno ON inscripciones(alumno_id);
CREATE INDEX idx_inscripciones_estado ON inscripciones(estado);

CREATE TABLE tallas (
    id SERIAL PRIMARY KEY,
    alumno_id INTEGER NOT NULL REFERENCES alumnos(id) ON DELETE CASCADE,
    talla_uniforme VARCHAR(20),
    talla_polo VARCHAR(20),
    fecha_registro DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    inscripcion_id INTEGER NOT NULL REFERENCES inscripciones(id) ON DELETE CASCADE,
    monto DECIMAL(10,2) NOT NULL,
    fecha DATE,
    tipo VARCHAR(50) DEFAULT 'Inscripción',
    metodo_pago VARCHAR(50),
    comprobante VARCHAR(200),
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contratos (
    id SERIAL PRIMARY KEY,
    inscripcion_id INTEGER NOT NULL REFERENCES inscripciones(id) ON DELETE CASCADE,
    archivo_url VARCHAR(500),
    firmado BOOLEAN DEFAULT FALSE,
    fecha_firma DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sedes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    direccion TEXT,
    activa BOOLEAN DEFAULT TRUE
);

CREATE TABLE horarios (
    id SERIAL PRIMARY KEY,
    sede_id INTEGER REFERENCES sedes(id),
    dia_semana SMALLINT,
    hora_inicio TIME,
    hora_fin TIME,
    nombre_clase VARCHAR(100),
    capacidad INTEGER,
    instructor VARCHAR(200),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE qr_sesiones (
    id SERIAL PRIMARY KEY,
    sede_id INTEGER REFERENCES sedes(id),
    horario_id INTEGER REFERENCES horarios(id),
    token VARCHAR(64) UNIQUE,
    fecha DATE,
    hora_apertura TIMESTAMP,
    hora_cierre TIMESTAMP,
    activa BOOLEAN DEFAULT TRUE
);

CREATE TABLE asistencias (
    id SERIAL PRIMARY KEY,
    alumno_id INTEGER NOT NULL REFERENCES alumnos(id) ON DELETE CASCADE,
    inscripcion_id INTEGER REFERENCES inscripciones(id) ON DELETE SET NULL,
    fecha DATE NOT NULL,
    hora TIME,
    turno VARCHAR(50),
    asistio VARCHAR(20) DEFAULT 'Sí',
    observaciones TEXT,
    sede_id INTEGER REFERENCES sedes(id),
    qr_sesion_id INTEGER REFERENCES qr_sesiones(id),
    metodo_registro VARCHAR(20) DEFAULT 'manual',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_asistencias_alumno ON asistencias(alumno_id);
CREATE INDEX idx_asistencias_fecha ON asistencias(fecha);
-- Un alumno solo marca una vez por día por turno
ALTER TABLE asistencias ADD CONSTRAINT asistencias_unica_por_turno UNIQUE(alumno_id, fecha, turno);

CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    nombre_apoderado VARCHAR(200),
    telefono VARCHAR(50),
    correo VARCHAR(150),
    nombre_alumno VARCHAR(200),
    fecha_nacimiento DATE,
    plataforma VARCHAR(50),
    campana VARCHAR(100),
    campana_id VARCHAR(100),
    estado VARCHAR(50) DEFAULT 'Nuevo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- DATOS INICIALES
-- ============================================

-- Insertar sede principal (cambiar nombre y dirección)
INSERT INTO sedes (nombre, direccion, activa) VALUES ('Sede Principal', 'Dirección de tu academia', TRUE);

-- ============================================
-- FUNCIÓN: REGISTRAR ASISTENCIA (con conteo de clases)
-- ============================================

CREATE OR REPLACE FUNCTION registrar_asistencia(
    p_dni VARCHAR,
    p_token VARCHAR DEFAULT NULL,
    p_turno VARCHAR DEFAULT NULL
) RETURNS JSON
LANGUAGE plpgsql AS $$
DECLARE
    v_alumno RECORD;
    v_inscripcion RECORD;
    v_sesion_id INTEGER DEFAULT NULL;
    v_asistencia_id INTEGER;
    v_sede_id INTEGER DEFAULT 1;
    v_turno VARCHAR;
    v_clases_usadas INTEGER;
    v_clases_restantes INTEGER;
BEGIN
    v_turno := COALESCE(p_turno, 'General');

    -- 1. Buscar alumno
    SELECT id, nombre_alumno, estado INTO v_alumno FROM alumnos WHERE dni_alumno = p_dni;
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'DNI no encontrado', 'dni', p_dni);
    END IF;

    -- 2. Verificar inscripción activa
    SELECT id, programa, fecha_fin, estado, clases_totales INTO v_inscripcion
    FROM inscripciones WHERE alumno_id = v_alumno.id AND estado = 'Activo'
    ORDER BY fecha_inicio DESC LIMIT 1;
    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'No tiene inscripción activa', 'alumno', v_alumno.nombre_alumno);
    END IF;

    -- 3. Contar clases usadas
    SELECT COUNT(*) INTO v_clases_usadas FROM asistencias
    WHERE inscripcion_id = v_inscripcion.id AND asistio = 'Sí';
    v_clases_restantes := GREATEST(COALESCE(v_inscripcion.clases_totales, 0) - v_clases_usadas, 0);

    -- 4. Verificar límite de clases
    IF v_inscripcion.clases_totales > 0 AND v_clases_usadas >= v_inscripcion.clases_totales THEN
        RETURN json_build_object('success', false, 'error', 'Ya completaste todas tus clases del programa',
            'alumno', v_alumno.nombre_alumno, 'programa', v_inscripcion.programa,
            'clases_totales', v_inscripcion.clases_totales, 'clases_usadas', v_clases_usadas, 'clases_restantes', 0);
    END IF;

    -- 5. Verificar QR
    IF p_token IS NOT NULL THEN
        SELECT id, sede_id INTO v_sesion_id, v_sede_id FROM qr_sesiones
        WHERE token = p_token AND activa = TRUE AND fecha = CURRENT_DATE;
        IF v_sesion_id IS NULL THEN
            RETURN json_build_object('success', false, 'error', 'QR expirado o inválido');
        END IF;
    END IF;

    -- 6. Verificar duplicado hoy
    IF EXISTS (SELECT 1 FROM asistencias WHERE alumno_id = v_alumno.id AND fecha = CURRENT_DATE AND turno = v_turno) THEN
        RETURN json_build_object('success', false, 'error', 'Asistencia ya registrada hoy',
            'alumno', v_alumno.nombre_alumno, 'turno', v_turno,
            'clases_totales', v_inscripcion.clases_totales, 'clases_usadas', v_clases_usadas, 'clases_restantes', v_clases_restantes);
    END IF;

    -- 7. Registrar
    INSERT INTO asistencias (alumno_id, inscripcion_id, fecha, hora, turno, asistio, sede_id, qr_sesion_id, metodo_registro)
    VALUES (v_alumno.id, v_inscripcion.id, CURRENT_DATE, CURRENT_TIME, v_turno, 'Sí', v_sede_id, v_sesion_id,
        CASE WHEN p_token IS NOT NULL THEN 'qr' ELSE 'manual' END)
    RETURNING id INTO v_asistencia_id;

    v_clases_usadas := v_clases_usadas + 1;
    v_clases_restantes := GREATEST(COALESCE(v_inscripcion.clases_totales, 0) - v_clases_usadas, 0);

    RETURN json_build_object('success', true, 'alumno', v_alumno.nombre_alumno, 'programa', v_inscripcion.programa,
        'fecha', CURRENT_DATE, 'hora', TO_CHAR(CURRENT_TIME::time, 'HH24:MI'), 'turno', v_turno,
        'asistencia_id', v_asistencia_id, 'clases_totales', COALESCE(v_inscripcion.clases_totales, 0),
        'clases_usadas', v_clases_usadas, 'clases_restantes', v_clases_restantes);
END;
$$;
```

---

## 2. Backend API (Express)

Copiar la carpeta `api/` de AMAS Team Wolf y modificar:

### Archivo `api/src/db.js` — Cambiar conexión:

```js
const pool = new Pool({
  host: process.env.DB_HOST || 'pallium_dragonknight_db',  // ← container de DK
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'dragonknight_database', // ← DB de DK
  user: process.env.DB_USER || 'dk_user',                   // ← usuario DK
  password: process.env.DB_PASS || 'Aubinaud2',
});
```

### Archivo `api/src/notifuse.js` — Cambiar templates:

Crear templates nuevos en Notifuse para Dragon Knight o reusar los de AMAS cambiando el `workspace_id` y los `notification.id`.

### Archivo `api/src/routes/qr.js` — Cambiar URL del QR:

```js
url: `https://TU-DOMINIO.com/asistencia?token=${sesion.token}`,
```

### Deploy:

```bash
# En el servidor Contabo
mkdir -p /opt/dragonknight-api
cd /opt/dragonknight-api
# Copiar archivos del API...

docker build -t dk-api:latest .

docker run -d --name dk-api --network easypanel -p 4001:4000 \
  -e DB_HOST=pallium_dragonknight_db \
  -e DB_PORT=5432 \
  -e DB_NAME=dragonknight_database \
  -e DB_USER=dk_user \
  -e DB_PASS=Aubinaud2 \
  -e PORT=4000 \
  -e TZ=America/Lima \
  --restart unless-stopped dk-api:latest

# Conectar a red de la DB
docker network connect easypanel-pallium dk-api

# Agregar config de Traefik
cat > /etc/easypanel/traefik/config/dk-api.yaml << 'EOF'
http:
  routers:
    dk-api-https:
      rule: Host(`dk-api.s6hx3x.easypanel.host`)
      service: dk-api
      tls:
        certResolver: letsencrypt
      entryPoints:
        - https
    dk-api-http:
      rule: Host(`dk-api.s6hx3x.easypanel.host`)
      service: dk-api
      middlewares:
        - redirect-to-https
      entryPoints:
        - http
  services:
    dk-api:
      loadBalancer:
        servers:
          - url: http://dk-api:4000
EOF
```

---

## 3. Frontend — Config de API

### Archivo `src/config/api.ts`:

```ts
const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_BASE = isDev
  ? '/api'
  : 'https://dk-api.s6hx3x.easypanel.host/api';  // ← URL del API de DK
```

### `vite.config.ts` — Proxy para desarrollo:

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:4001',  // ← puerto local del API DK
      changeOrigin: true,
    },
  },
},
```

---

## 4. Páginas que necesita la web

### Páginas de registro (formularios de matrícula):
| Ruta | Descripción | Endpoint API |
|------|-------------|-------------|
| `/registro-X-meses` | Formulario de matrícula | `POST /api/matricula` |
| `/renovacion` | Formulario de renovación | `POST /api/renovacion` |
| `/registro-leadership` | Programa avanzado (si aplica) | `POST /api/leadership` |

### Páginas de asistencia:
| Ruta | Descripción | Quién usa |
|------|-------------|-----------|
| `/asistencia?token=UUID` | Padre ingresa DNI del alumno | Padres (mobile) |
| `/asistencia/panel` | Generar QR + ver lista en vivo | Profesora (tablet) |

### PIN del panel de profesora:
En `AsistenciaPanelPage.tsx`, cambiar:
```ts
const PIN_PROFESORA = '2835';  // ← Cambiar a otro PIN para DK
```

### Otras páginas:
| Ruta | Descripción |
|------|-------------|
| `/` | Home |
| `/tienda` | Tienda de implementos |
| `/graduacion` | Lista de graduaciones |
| `/torneo` | Inscripción a torneos |
| `/perfil` | Perfil del padre (requiere auth) |
| `/inicio-sesion` | Login con Logto |
| `/terminos` | Términos y condiciones |

---

## 5. Emails transaccionales (Notifuse)

Crear estos templates en Notifuse para la nueva academia:

| Template ID | Cuándo se envía | Datos que recibe |
|------------|-----------------|-----------------|
| `bienvenida_3_meses` | Matrícula 3/6 meses | nombrePadre, nombreAlumno, dniAlumno, programa, fechaInicio, fechaFinal, precioPrograma |
| `bienvenida_1_mes` | Matrícula mensual | Igual + contratoUrl |
| `renovacion` | Renovación | nombrePadre, nombreAlumno, programa, fechaInicio, fechaFinal, clasesTotales, turno |
| `confirmacion_torneo` | Inscripción torneo | nombreAlumno, nombreApoderado, fechaTorneo, totalPago, modalidadesHtml |

---

## 6. Checklist de lanzamiento

- [ ] DB creada con todas las tablas + función `registrar_asistencia`
- [ ] DB timezone configurado a `America/Lima`
- [ ] Sede insertada en tabla `sedes`
- [ ] API deployada como container Docker
- [ ] API conectada a las redes `easypanel` + `easypanel-pallium`
- [ ] Traefik config creada para HTTPS
- [ ] `src/config/api.ts` apuntando al API correcto
- [ ] PIN de profesora cambiado
- [ ] URL del QR en `qr.js` apuntando al dominio correcto
- [ ] Templates de email creados en Notifuse
- [ ] `notifuse.js` con los IDs de templates correctos
- [ ] GitHub Actions configurado para deploy a GitHub Pages
- [ ] Dominio DNS apuntando a GitHub Pages (IPs: 185.199.108-111.153)
- [ ] Probar: generar QR → escanear → registrar asistencia → ver en panel
- [ ] Probar: matrícula → llega email → aparece en DB
- [ ] Probar: renovación → conteo de clases se reinicia
