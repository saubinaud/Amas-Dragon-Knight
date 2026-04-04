/**
 * FAKE email stubs — replace with real Notifuse integration later
 * Structure is ready for attachments (PDF contracts)
 */

const { generarPDFContrato } = require('./pdfContrato');

async function generarAdjuntoContrato(datos) {
  try {
    const pdfBuffer = await generarPDFContrato(datos, datos.firmaBase64 || null);
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

async function sendBienvenidaEmail(data) {
  const adjuntos = await generarAdjuntoContrato(data);
  console.log('[FAKE EMAIL] bienvenida:', JSON.stringify({
    to: data.email,
    nombrePadre: data.nombrePadre,
    nombreAlumno: data.nombreAlumno,
    programa: data.programa,
    hasAttachment: !!adjuntos,
    attachmentSize: adjuntos?.[0]?.content?.length || 0,
  }, null, 2));
  return { success: true, fake: true };
}

async function sendRenovacionEmail(data) {
  const adjuntos = await generarAdjuntoContrato(data);
  console.log('[FAKE EMAIL] renovacion:', JSON.stringify({
    to: data.email,
    nombrePadre: data.nombrePadre,
    nombreAlumno: data.nombreAlumno,
    programa: data.programa,
    hasAttachment: !!adjuntos,
  }, null, 2));
  return { success: true, fake: true };
}

async function sendTorneoConfirmacionEmail(data) {
  console.log('[FAKE EMAIL] torneo_confirmacion:', JSON.stringify({
    to: data.email,
    nombreAlumno: data.nombreAlumno,
    nombreApoderado: data.nombreApoderado,
    torneo: data.torneoNombre,
  }, null, 2));
  return { success: true, fake: true };
}

module.exports = {
  sendBienvenidaEmail,
  sendRenovacionEmail,
  sendTorneoConfirmacionEmail,
  generarAdjuntoContrato,
};
