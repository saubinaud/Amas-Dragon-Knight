# Guía: Sistema de Contrato Digital con Firma

> Firma en pantalla + PDF generado automáticamente + envío por email como adjunto.

---

## Arquitectura

```
Frontend (ContratoFirma.tsx)         Backend (API)
┌─────────────────────────┐         ┌─────────────────────────┐
│ Cláusulas colapsables   │         │ POST /api/contratos/    │
│ Canvas firma táctil     │ ──────► │   generar               │
│ Checkbox "Acepto"       │         │   → genera PDF con      │
│ Botón "Confirmar firma" │         │     pdfkit              │
└─────────────────────────┘         │   → guarda en tabla     │
                                    │     contratos           │
En el submit del formulario:        └──────────┬──────────────┘
┌─────────────────────────┐                    ��
│ POST /api/matricula     │         ┌──────────▼────��─────────┐
│   → guarda en BD        │         │ notifuse.js             │
│   → llama emailMatricula│ ──────► │   → genera PDF          │
│     con datos           │         │   → adjunta al email    │
│                         │         │   → envía via Notifuse   │
└─────────────────────────┘         └─────────────────────────┘
```

---

## 1. Archivos involucrados

| Archivo | Qué hace |
|---------|----------|
| `src/components/ContratoFirma.tsx` | Componente React: cláusulas + pad de firma + checkbox |
| `api/src/pdfContrato.js` | Genera el PDF con pdfkit (datos + cláusulas + firma) |
| `api/src/routes/contratos.js` | Endpoint POST /api/contratos/generar |
| `api/src/notifuse.js` | Genera PDF y lo adjunta al email de bienvenida/renovación |

---

## 2. Backend

### 2.1. Instalar pdfkit

```bash
cd api/
npm install pdfkit
```

### 2.2. Crear `api/src/pdfContrato.js`

Este es el generador de PDF. Lo que debes personalizar:

```js
// Cambiar estos valores para tu academia:

// Línea ~20: Nombre de la academia
doc.fontSize(18).font('Helvetica-Bold')
   .text('NOMBRE DE TU ACADEMIA', { align: 'center' });
doc.fontSize(10).font('Helvetica')
   .text('Tu subtítulo', { align: 'center' });

// Línea ~25: Color de la línea decorativa
doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke('#FA7B21'); // ← tu color

// Líneas 80-87: Cláusulas del contrato
const clausulas = [
  'Cláusula 1...',
  'Cláusula 2...',
  // Personalizar según tu academia
];

// Línea ~110: Texto de declaración
doc.text(`Yo, ${d.nombrePadre}, ... de TU ACADEMIA.`);

// Línea final: Pie de página
doc.text('Documento generado digitalmente por TU ACADEMIA', { align: 'center' });
```

### 2.3. Crear `api/src/routes/contratos.js`

```js
const { Router } = require('express');
const { pool } = require('../db');
const { generarPDFContrato } = require('../pdfContrato');

const router = Router();

router.post('/generar', async (req, res) => {
  try {
    const { inscripcion_id, firma_base64, datos } = req.body;
    if (!datos) return res.status(400).json({ error: 'Datos requeridos' });

    const pdfBuffer = await generarPDFContrato(datos, firma_base64 || null);
    const pdfBase64 = pdfBuffer.toString('base64');

    // Guardar en tabla contratos
    if (inscripcion_id) {
      await pool.query(
        `INSERT INTO contratos (inscripcion_id, archivo_url, firmado, fecha_firma)
         VALUES ($1, $2, TRUE, CURRENT_DATE)
         ON CONFLICT (inscripcion_id) DO UPDATE SET archivo_url = $2, firmado = TRUE, fecha_firma = CURRENT_DATE`,
        [inscripcion_id, `pdf:${pdfBase64.substring(0, 50)}...`]
      );
    }

    res.json({
      success: true,
      pdf_base64: pdfBase64,
      filename: `contrato_${datos.nombreAlumno?.replace(/\s+/g, '_') || 'alumno'}.pdf`,
    });
  } catch (err) {
    console.error('Error generando contrato:', err);
    res.status(500).json({ error: 'Error generando contrato' });
  }
});

module.exports = router;
```

### 2.4. Registrar la ruta en `api/src/index.js`

```js
const contratosRoutes = require('./routes/contratos');
app.use('/api/contratos', contratosRoutes);
```

### 2.5. Agregar unique index en BD

```sql
CREATE UNIQUE INDEX IF NOT EXISTS idx_contratos_inscripcion_unique ON contratos(inscripcion_id);
```

---

## 3. Email con PDF adjunto

### 3.1. Modificar `notifuse.js`

La función `enviarNotificacion` acepta un 5to parámetro `attachments`:

```js
async function enviarNotificacion(templateId, email, firstName, data, attachments) {
  const body = {
    workspace_id: WORKSPACE_ID,
    notification: {
      id: templateId,
      channels: ['email'],
      contact: { email, first_name: firstName },
      data,
    },
  };

  // Agregar adjuntos
  if (attachments && attachments.length > 0) {
    body.notification.attachments = attachments;
  }

  // ... fetch a Notifuse
}
```

### 3.2. Función para generar el adjunto

```js
const { generarPDFContrato } = require('./pdfContrato');

async function generarAdjuntoContrato(datos) {
  try {
    const pdfBuffer = await generarPDFContrato(datos, null);
    const pdfBase64 = pdfBuffer.toString('base64');
    return [{
      filename: `Contrato_${(datos.nombreAlumno || 'alumno').replace(/\s+/g, '_')}.pdf`,
      content: pdfBase64,
      contentType: 'application/pdf',
    }];
  } catch (err) {
    console.error('Error generando PDF para adjunto:', err.message);
    return null;
  }
}
```

### 3.3. Usar en cada función de email

```js
async function emailMatricula(d) {
  const adjuntos = await generarAdjuntoContrato(d);
  return enviarNotificacion('tu_template_id', d.email, d.nombrePadre, {
    // ... tus datos del template
  }, adjuntos);  // ← adjuntos como último parámetro
}
```

**Formato del adjunto Notifuse:**
```json
{
  "filename": "Contrato_Juan_Perez.pdf",
  "content": "base64_del_pdf...",
  "contentType": "application/pdf"
}
```

---

## 4. Frontend

### 4.1. Componente `ContratoFirma.tsx`

Copiar `src/components/ContratoFirma.tsx` y personalizar:

**Cláusulas** (array `clausulas` dentro del componente):
```tsx
const clausulas = [
  'Tu cláusula 1...',
  'Tu cláusula 2...',
  // 6-8 cláusulas recomendadas
];
```

**Texto de declaración:**
```tsx
<p>
  Yo, <strong>{datos.nombrePadre}</strong>, con DNI{' '}
  <strong>{datos.dniPadre}</strong>, acepto inscribir a{' '}
  <strong>{datos.nombreAlumno}</strong> en el programa{' '}
  <strong>{datos.programa}</strong> de TU ACADEMIA.
</p>
```

**Props que recibe:**
```tsx
interface ContratoFirmaProps {
  datos: {
    nombrePadre: string;
    dniPadre: string;
    email: string;
    telefono?: string;
    direccion?: string;
    nombreAlumno: string;
    dniAlumno: string;
    fechaNacimiento?: string;
    categoriaAlumno?: string;
    programa: string;
    fechaInicio?: string;
    fechaFin?: string;
    clasesTotales?: number;
    turnoSeleccionado?: string;
    diasTentativos?: string;
    precioPrograma?: number;
    descuentoDinero?: number;
    total?: number;
  };
  onFirmaCompleta: (firmaBase64: string) => void;
  onContratoGenerado?: (pdfBase64: string) => void;
}
```

### 4.2. Integrar en el formulario de matrícula/renovación

```tsx
import { ContratoFirma } from './ContratoFirma';

// En el state del formulario:
const [firmaBase64, setFirmaBase64] = useState<string | null>(null);

// Validación en el submit:
if (!firmaBase64) {
  toast.error('Por favor firma el contrato antes de enviar');
  return;
}

// En el JSX, antes del botón de submit:
<ContratoFirma
  datos={{
    nombrePadre: formData.nombrePadre,
    dniPadre: formData.dniPadre,
    email: formData.email,
    nombreAlumno: formData.nombreAlumno,
    dniAlumno: formData.dniAlumno,
    programa: 'Nombre del programa',
    fechaInicio: formData.fechaInicio,
    fechaFin: fechaFinCalculada,
    precioPrograma: precioBase,
    total: total,
    // ... todos los campos que tengas
  }}
  onFirmaCompleta={(firma) => setFirmaBase64(firma)}
/>

// Botón submit debe estar disabled sin firma:
<Button type="submit" disabled={isSubmitting || !firmaBase64}>
  Enviar
</Button>
```

---

## 5. Checklist

- [ ] `pdfkit` instalado en el API (`npm install pdfkit`)
- [ ] `api/src/pdfContrato.js` creado con nombre y cláusulas de tu academia
- [ ] `api/src/routes/contratos.js` creado
- [ ] Ruta registrada en `api/src/index.js`
- [ ] Unique index en tabla `contratos` (SQL)
- [ ] `notifuse.js` actualizado con soporte de adjuntos
- [ ] `ContratoFirma.tsx` copiado y personalizado
- [ ] Integrado en formulario de matrícula (state + validación + componente)
- [ ] Integrado en formulario de renovación
- [ ] API redeployada con pdfkit
- [ ] Test: matrícula → llega email con PDF adjunto
