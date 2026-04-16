# Accesos Servidor Pallium - Contabo VPS

> **Documento confidencial** — No compartir. Última actualización: 2026-03-29

---

## Servidor

| Dato | Valor |
|------|-------|
| **Proveedor** | Contabo |
| **IP** | `95.111.254.27` |
| **OS** | Ubuntu 22.04 (kernel 5.15) |
| **CPU** | 6 cores |
| **RAM** | 12 GB |
| **Disco** | 96 GB SSD |
| **SSH** | `ssh root@95.111.254.27` |
| **User** | `root` |
| **Password** | `Aubinaud919` |

---

## Panel de Control

| Servicio | URL | Notas |
|----------|-----|-------|
| **Easypanel** | `https://95.111.254.27:3000` | Panel principal de gestión |
| **Traefik** | Puerto 80/443 | Reverse proxy automático |

---

## Aplicaciones

| App | URL / Puerto | Imagen |
|-----|-------------|--------|
| **n8n** | `https://pallium-n8n.s6hx3x.easypanel.host` | n8nio/n8n:1.121.3 |
| **Memos** | `http://95.111.254.27:5230` | neosmemo/memos:stable |
| **Metabase** | `http://95.111.254.27:3030` | metabase/metabase:latest |
| **NocoDB** | Via Easypanel (Traefik) | nocodb/nocodb:latest |
| **Evolution API** | Via Easypanel (Traefik) | evoapicloud/evolution-api:v2.3.7 |
| **Notifuse** | Via Easypanel (Traefik) | notifuse/notifuse:latest |
| **Zeppai Backend** | `http://95.111.254.27:8080` | emailmarketing_zeppai-backend |
| **Zeppai Frontend** | `http://95.111.254.27:8081` | emailmarketing_zeppai-frontend |
| **FileVault** | Via Easypanel (Traefik) | emailmarketing_cloudnodum-app |
| **Documenso** | Via Easypanel (Traefik) | documenso/documenso:latest |
| **Pingvin Share** | Via Easypanel (Traefik) | stonith404/pingvin-share:latest |
| **LinkStack** | Via Easypanel (Traefik) | linkstackorg/linkstack:latest |
| **MeTube** | Via Easypanel (Traefik) | alexta69/metube |
| **Umami (programas-extras)** | Via Easypanel (Traefik) | umami:postgresql-latest |
| **FileBrowser** | Via Easypanel (Traefik) | filebrowser/filebrowser:latest |
| **Scrapper Proveedores** | `http://95.111.254.27:8000` | Streamlit app |
| **AMAS Web** | Via Easypanel (Traefik) | easypanel/pallium/amas:latest |
| **Albur Web** | Via Easypanel (Traefik) | easypanel/pallium/albur_web:latest |
| **Dashboard Deals** | Via Easypanel (Traefik) | easypanel/pallium/dashboard_deals:latest |

---

## Bases de Datos PostgreSQL

### AMAS Team Wolf

| Dato | Valor |
|------|-------|
| **Container** | `pallium_amas-db` (Swarm) |
| **Host interno** | `pallium_amas-db` |
| **Host externo** | `95.111.254.27` |
| **Puerto externo** | No expuesto (solo interno 5432) |
| **Database** | `amas_database` |
| **User** | `amas_user` |
| **Password** | `Aubinaud2` |
| **Data** | `/etc/easypanel/projects/pallium/amas-db/data` |

### Dragon Knight

| Dato | Valor |
|------|-------|
| **Container** | `pallium_dragonknight_db` (standalone) |
| **Host interno** | `pallium_dragonknight_db` |
| **Host externo** | `95.111.254.27` |
| **Puerto externo** | `5436` |
| **Database** | `dragonknight_database` |
| **User** | `dk_user` |
| **Password** | `Aubinaud2` |
| **Data** | `/etc/easypanel/projects/pallium/dragonknight-db/data` |

### Unaluka Analytics

| Dato | Valor |
|------|-------|
| **Container** | `emailmarketing_luka` (Swarm) |
| **Puerto externo** | `5432` |
| **Database** | `unaluka_analytics` |
| **User** | `sebastien` |
| **Password** | `Aubinaud2` |

### Aztra

| Dato | Valor |
|------|-------|
| **Container** | `pallium_aztra_db` (Swarm) |
| **Puerto externo** | `5434` |
| **Database** | `aztra_database` |
| **User** | `aztra_db` |
| **Password** | `Aubinaud2` |

### Meta Business

| Dato | Valor |
|------|-------|
| **Container** | `pallium_metabusinnes` (Swarm) |
| **Puerto externo** | `5435` |
| **Database** | `meta_database` |
| **User** | `meta_db` |
| **Password** | `Aubinaud2` |

### ADPT Brands

| Dato | Valor |
|------|-------|
| **Container** | `programas-extras_adpt-brands` (Swarm) |
| **Puerto externo** | No expuesto (solo interno) |
| **Database** | `adpt-brands` |
| **User** | `ADPT` |
| **Password** | `ADPT` |

### Evolution API

| Dato | Valor |
|------|-------|
| **Container** | `emailmarketing_evolution-api-db` (Swarm) |
| **Puerto externo** | No expuesto |
| **Database** | `emailmarketing` |
| **User** | `postgres` |
| **Password** | `48f809fe05de038b58f2` |

### Notifuse

| Dato | Valor |
|------|-------|
| **Container** | `emailmarketing_notifuse-db` (Swarm) |
| **Puerto externo** | No expuesto |
| **Database** | `amasemailmarketing` |
| **User** | `postgres` |
| **Password** | `dedf4af68824cb77681c` |

### FileVault

| Dato | Valor |
|------|-------|
| **Container** | `emailmarketing_filevault` (Swarm) |
| **Puerto externo** | No expuesto |
| **Database** | `filevault` |
| **User** | `filevault` |
| **Password** | `Aubinaud2` |

### Albur

| Dato | Valor |
|------|-------|
| **Container** | `pallium_albur` (Swarm) |
| **Puerto externo** | No expuesto |
| **Database** | `albur_db` |
| **User** | `albur` |
| **Password** | `Aubinaud2` |

### OpenClaw

| Dato | Valor |
|------|-------|
| **Container** | `pallium_openclaw_db` (Swarm) |
| **Puerto externo** | No expuesto |
| **Database** | `openclaw_database` |
| **User** | `openclaw` |
| **Password** | `Aubinaud2` |

### Zeppai Health

| Dato | Valor |
|------|-------|
| **Container** | `emailmarketing_zeppai-postgres-1` (compose) |
| **Puerto externo** | `5433` |
| **Database** | `zepp_health` |
| **User** | `zepp_user` |
| **Password** | `Aubinaud2` |

### Metabase

| Dato | Valor |
|------|-------|
| **Container** | `metabase-postgres` (compose) |
| **Puerto externo** | No expuesto |
| **Database** | `metabase` |
| **User** | `metabase` |
| **Password** | `MetabaseDbPass123!` |

### NocoDB

| Dato | Valor |
|------|-------|
| **Container** | `nocodb-db` (compose) |
| **Puerto externo** | No expuesto |
| **Database** | `nocodb_metadata` |
| **User** | `noco_admin` |
| **Password** | `Aubinaud2` |

### NodumCRM

| Dato | Valor |
|------|-------|
| **Container** | `nodumcrm-db` (compose) |
| **Puerto externo** | No expuesto |
| **Database** | `nodumcrm` |
| **User** | `nodumcrm` |
| **Password** | `Aubinaud_2` |

### Umami Analytics

| Dato | Valor |
|------|-------|
| **Container** | `programas-extras_unami-postgres-1` (compose) |
| **Puerto externo** | No expuesto |
| **Database** | `umami` |
| **User** | `umami` |
| **Password** | `Aubinaud2` |

---

## Estructura de Tablas AMAS / Dragon Knight

Ambas bases de datos (`amas_database` y `dragonknight_database`) comparten exactamente la misma estructura:

### `alumnos` — Registro de estudiantes

Tabla principal. Cada fila es un alumno con los datos de su apoderado.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | SERIAL PK | ID auto-incremental |
| `nombre_alumno` | VARCHAR(200) | Nombre completo del alumno |
| `dni_alumno` | VARCHAR(20) UNIQUE | DNI del alumno (usado para buscar en QR) |
| `fecha_nacimiento` | DATE | Fecha de nacimiento |
| `categoria` | VARCHAR(50) | Categoría (Baby Wolf, etc.) |
| `nombre_apoderado` | VARCHAR(200) | Nombre del padre/madre |
| `dni_apoderado` | VARCHAR(20) | DNI del apoderado |
| `correo` | VARCHAR(150) | Email del apoderado |
| `telefono` | VARCHAR(50) | Teléfono/WhatsApp |
| `direccion` | TEXT | Dirección |
| `estado` | VARCHAR(20) | `Activo` / `Inactivo` |

**Relaciones:** Es la tabla padre. `inscripciones`, `tallas` y `asistencias` dependen de ella.

### `inscripciones` — Programas contratados

Cada vez que un alumno se inscribe a un programa (3 meses, 6 meses, Leadership, etc.) se crea un registro aquí.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | SERIAL PK | ID auto-incremental |
| `alumno_id` | INTEGER FK → alumnos | Referencia al alumno |
| `programa` | VARCHAR(100) | Nombre del programa ("3 Meses Full", "Leadership", etc.) |
| `fecha_inscripcion` | DATE | Cuándo se inscribió |
| `fecha_inicio` | DATE | Inicio del programa |
| `fecha_fin` | DATE | Fin del programa |
| `clases_totales` | INTEGER | Total de clases incluidas |
| `turno` | VARCHAR(50) | Turno asignado |
| `dias_tentativos` | VARCHAR(100) | Días de la semana ("Martes/Jueves") |
| `precio_programa` | DECIMAL(10,2) | Precio original |
| `precio_pagado` | DECIMAL(10,2) | Precio que pagó |
| `descuento` | DECIMAL(10,2) | Monto de descuento |
| `codigo_promocional` | VARCHAR(50) | Código promo aplicado |
| `tipo_cliente` | VARCHAR(50) | "Nuevo/Primer registro" o "Renovación" |
| `estado` | VARCHAR(30) | `Activo` / `Inactivo` / `Vencido` |
| `estado_pago` | VARCHAR(30) | `Pendiente` / `Pagado` / `Parcial` |

**Relaciones:** Un alumno puede tener múltiples inscripciones (renovaciones). `pagos`, `contratos` y `asistencias` referencian a inscripciones.

### `tallas` — Registro de tallas del alumno

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | SERIAL PK | |
| `alumno_id` | INTEGER FK → alumnos | |
| `talla_uniforme` | VARCHAR(20) | Talla del uniforme (2, 4, 6, etc.) |
| `talla_polo` | VARCHAR(20) | Talla del polo |
| `fecha_registro` | DATE | Fecha del registro de talla |

### `pagos` — Registro de pagos

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | SERIAL PK | |
| `inscripcion_id` | INTEGER FK → inscripciones | A qué inscripción corresponde |
| `monto` | DECIMAL(10,2) | Monto pagado |
| `fecha` | DATE | Fecha del pago |
| `tipo` | VARCHAR(50) | "Inscripción", "Mensualidad", etc. |
| `metodo_pago` | VARCHAR(50) | Efectivo, transferencia, Yape, etc. |
| `comprobante` | VARCHAR(200) | URL o referencia del comprobante |
| `observaciones` | TEXT | Notas |

### `contratos` — Documentos contractuales

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | SERIAL PK | |
| `inscripcion_id` | INTEGER FK → inscripciones | |
| `archivo_url` | VARCHAR(500) | URL del archivo del contrato |
| `firmado` | BOOLEAN | Si ya fue firmado |
| `fecha_firma` | DATE | Cuándo se firmó |

### `asistencias` — Registro de asistencias (Módulo QR)

Tabla core del módulo de marcado de asistencias por QR.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | SERIAL PK | |
| `alumno_id` | INTEGER FK → alumnos | Quién asistió |
| `inscripcion_id` | INTEGER FK → inscripciones | En qué programa |
| `fecha` | DATE | Fecha de la asistencia |
| `hora` | TIME | Hora de marcado |
| `turno` | VARCHAR(50) | Turno ("Mañana", "Tarde", "General") |
| `asistio` | VARCHAR(20) | "Sí" / "No" / "Tardanza" |
| `observaciones` | TEXT | Notas |
| `sede_id` | INTEGER FK → sedes | En qué local |
| `qr_sesion_id` | INTEGER FK → qr_sesiones | Token QR usado |
| `metodo_registro` | VARCHAR(20) | `qr` / `manual` / `auto` |

**Constraint:** Un alumno solo puede marcar una vez por día por turno.

### `leads` — Prospectos / Interesados

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | SERIAL PK | |
| `nombre_apoderado` | VARCHAR(200) | Nombre del padre interesado |
| `telefono` | VARCHAR(50) | Teléfono |
| `correo` | VARCHAR(150) | Email |
| `nombre_alumno` | VARCHAR(200) | Nombre del niño |
| `fecha_nacimiento` | DATE | Nacimiento del niño |
| `plataforma` | VARCHAR(50) | De dónde vino ("Web", "Instagram", etc.) |
| `campana` | VARCHAR(100) | Nombre de la campaña |
| `campana_id` | VARCHAR(100) | ID de campaña (Meta Ads, etc.) |
| `estado` | VARCHAR(50) | "Nuevo" / "Contactado" / "Convertido" / "Renovación" |

### `sedes` — Locales / Sucursales

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | SERIAL PK | |
| `nombre` | VARCHAR(100) | Nombre de la sede |
| `direccion` | TEXT | Dirección |
| `activa` | BOOLEAN | Si está operativa |

### `horarios` — Clases programadas

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | SERIAL PK | |
| `sede_id` | INTEGER FK → sedes | En qué local |
| `dia_semana` | SMALLINT | 0=Dom, 1=Lun, ..., 6=Sáb |
| `hora_inicio` | TIME | Inicio de la clase |
| `hora_fin` | TIME | Fin de la clase |
| `nombre_clase` | VARCHAR(100) | "Turno mañana", "Turno tarde" |
| `capacidad` | INTEGER | Cupo máximo |
| `instructor` | VARCHAR(200) | Nombre del instructor |
| `activo` | BOOLEAN | Si está vigente |

### `qr_sesiones` — Tokens QR de marcado

Cada día se genera un token QR por sede. El padre escanea el QR que contiene este token. Así se evita que marquen desde casa.

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | SERIAL PK | |
| `sede_id` | INTEGER FK → sedes | A qué local pertenece |
| `horario_id` | INTEGER FK → horarios | Clase asociada (opcional) |
| `token` | VARCHAR(64) UNIQUE | Token UUID del QR |
| `fecha` | DATE | Fecha de validez |
| `hora_apertura` | TIMESTAMP | Desde cuándo es válido |
| `hora_cierre` | TIMESTAMP | Hasta cuándo es válido |
| `activa` | BOOLEAN | Si está activo |

---

## Función SQL: `registrar_asistencia`

Existe en ambas bases. Se llama así:

```sql
SELECT registrar_asistencia('DNI_ALUMNO', 'TOKEN_QR', 'TURNO');
```

Retorna JSON:
- OK: `{"success": true, "alumno": "...", "programa": "...", "hora": "17:43"}`
- Error DNI: `{"success": false, "error": "DNI no encontrado"}`
- Ya marcó: `{"success": false, "error": "Asistencia ya registrada hoy"}`
- Sin inscripción: `{"success": false, "error": "No tiene inscripción activa"}`
- QR inválido: `{"success": false, "error": "QR expirado o inválido"}`

---

## Vistas SQL

| Vista | Descripción |
|-------|-------------|
| `v_asistencia_hoy` | Todas las asistencias del día actual con datos del alumno |
| `v_asistencia_mensual` | Resumen por alumno/mes con porcentaje de asistencia |

---

## Backups

| Dato | Valor |
|------|-------|
| **Script** | `/opt/pg-backup.sh` |
| **Cron** | Todos los días a las 3:00 AM |
| **Ubicación** | `/opt/backups/postgres/` |
| **Retención** | 7 días |
| **Post-migración AMAS** | `/opt/backups/postgres/pallium_amas-db_POST-MIGRATION_2026-03-29.sql.gz` |

Restaurar un backup:
```bash
gunzip -c /opt/backups/postgres/ARCHIVO.sql.gz | docker exec -i CONTAINER psql -U USER -d DATABASE
```

---

## Scripts de mantenimiento

| Script | Qué hace |
|--------|----------|
| `/opt/pg-backup.sh` | Backup de todas las bases PostgreSQL |
| `/opt/apply-pg.sh` | Aplica config optimizada a todos los PG |
| `/opt/pg-optimize.conf` | Configuración PostgreSQL optimizada |

---

## Resumen de puertos expuestos

| Puerto | Servicio |
|--------|----------|
| 80 | Traefik (HTTP) |
| 443 | Traefik (HTTPS) |
| 3000 | Easypanel |
| 3030 | Metabase |
| 5230 | Memos |
| 5432 | PostgreSQL (Unaluka Analytics) |
| 5433 | PostgreSQL (Zeppai) |
| 5434 | PostgreSQL (Aztra) |
| 5435 | PostgreSQL (Meta Business) |
| 5436 | PostgreSQL (Dragon Knight) |
| 8000 | Scrapper Proveedores |
| 8080 | Zeppai Backend |
| 8081 | Zeppai Frontend |
