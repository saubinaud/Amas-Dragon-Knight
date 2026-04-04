/**
 * FAKE email stubs — replace with real Notifuse integration later
 */

async function sendBienvenidaEmail(data) {
  console.log('[FAKE EMAIL] bienvenida:', JSON.stringify({
    to: data.email,
    nombrePadre: data.nombrePadre,
    nombreAlumno: data.nombreAlumno,
    programa: data.programa,
  }, null, 2));
  return { success: true, fake: true };
}

async function sendRenovacionEmail(data) {
  console.log('[FAKE EMAIL] renovacion:', JSON.stringify({
    to: data.email,
    nombrePadre: data.nombrePadre,
    nombreAlumno: data.nombreAlumno,
    programa: data.programa,
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
};
