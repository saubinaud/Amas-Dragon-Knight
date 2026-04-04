const PDFDocument = require('pdfkit');

const CLAUSULAS = [
  'El apoderado autoriza la inscripción del alumno en el programa de Taekwondo seleccionado en la academia Dragon Knight, aceptando los términos y condiciones aquí descritos.',
  'El apoderado se compromete a cumplir con el pago total del programa dentro de los plazos establecidos. En caso de no efectuar el pago, la academia se reserva el derecho de suspender el acceso a las clases.',
  'Las clases perdidas por inasistencia del alumno podrán ser recuperadas dentro del periodo del programa, según disponibilidad de horarios. No se realizarán reembolsos por clases no asistidas.',
  'La academia no se hace responsable por lesiones menores propias de la práctica deportiva. El apoderado autoriza la participación del alumno en las actividades físicas del programa.',
  'El apoderado autoriza a la academia a utilizar fotografías y videos del alumno durante las clases y eventos para fines promocionales en redes sociales y materiales de la academia.',
  'La academia se reserva el derecho de modificar horarios y sedes por razones operativas, notificando con anticipación razonable a los apoderados.',
  'En caso de retiro voluntario, no se realizarán devoluciones del monto pagado. El alumno podrá completar las clases restantes dentro del periodo acordado.',
  'El apoderado declara que la información proporcionada es verídica y se compromete a mantener actualizados sus datos de contacto para la comunicación con la academia.',
];

async function generarPDFContrato(datos, firmaBase64) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      const d = datos;

      // === Header ===
      doc.fontSize(20).font('Helvetica-Bold')
        .text('DRAGON KNIGHT', { align: 'center' });
      doc.fontSize(10).font('Helvetica')
        .text('Academia de Taekwondo', { align: 'center' });
      doc.moveDown(0.3);

      // Red line
      const lineY = doc.y;
      doc.moveTo(50, lineY).lineTo(545, lineY).strokeColor('#C8102E').lineWidth(2).stroke();
      doc.moveDown(0.8);

      // === Title ===
      doc.fontSize(14).font('Helvetica-Bold')
        .text('CONTRATO DE INSCRIPCIÓN', { align: 'center' });
      doc.moveDown(0.5);

      doc.fontSize(9).font('Helvetica')
        .fillColor('#666666')
        .text(`Fecha: ${new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })}`, { align: 'center' });
      doc.fillColor('#000000');
      doc.moveDown(1);

      // === Datos del contrato ===
      doc.fontSize(11).font('Helvetica-Bold').text('DATOS DEL PROGRAMA');
      doc.moveDown(0.3);

      const datosProg = [
        ['Programa', d.programa || '-'],
        ['Fecha de inicio', d.fechaInicio || 'Por definir'],
        ['Fecha de fin', d.fechaFin || 'Por definir'],
        ['Clases totales', String(d.clasesTotales || '-')],
        ['Turno', d.turnoSeleccionado || '-'],
        ['Días', d.diasTentativos || '-'],
      ];

      doc.fontSize(9).font('Helvetica');
      for (const [label, value] of datosProg) {
        doc.font('Helvetica-Bold').text(`${label}: `, { continued: true });
        doc.font('Helvetica').text(value);
      }
      doc.moveDown(0.8);

      // === Datos del alumno ===
      doc.fontSize(11).font('Helvetica-Bold').text('DATOS DEL ALUMNO');
      doc.moveDown(0.3);

      const datosAlumno = [
        ['Nombre', d.nombreAlumno || '-'],
        ['DNI', d.dniAlumno || '-'],
        ['Fecha de nacimiento', d.fechaNacimiento || '-'],
        ['Categoría', d.categoriaAlumno || '-'],
      ];

      doc.fontSize(9).font('Helvetica');
      for (const [label, value] of datosAlumno) {
        doc.font('Helvetica-Bold').text(`${label}: `, { continued: true });
        doc.font('Helvetica').text(value);
      }
      doc.moveDown(0.8);

      // === Datos del apoderado ===
      doc.fontSize(11).font('Helvetica-Bold').text('DATOS DEL APODERADO');
      doc.moveDown(0.3);

      const datosApoderado = [
        ['Nombre', d.nombrePadre || '-'],
        ['DNI', d.dniPadre || '-'],
        ['Email', d.email || '-'],
        ['Teléfono', d.telefono || '-'],
        ['Dirección', d.direccion || '-'],
      ];

      doc.fontSize(9).font('Helvetica');
      for (const [label, value] of datosApoderado) {
        doc.font('Helvetica-Bold').text(`${label}: `, { continued: true });
        doc.font('Helvetica').text(value);
      }
      doc.moveDown(0.8);

      // === Inversión ===
      doc.fontSize(11).font('Helvetica-Bold').text('INVERSIÓN');
      doc.moveDown(0.3);

      doc.fontSize(9).font('Helvetica');
      doc.font('Helvetica-Bold').text('Precio del programa: ', { continued: true });
      doc.font('Helvetica').text(`S/ ${d.precioPrograma || 0}`);
      if (d.descuentoDinero > 0) {
        doc.font('Helvetica-Bold').text('Descuento: ', { continued: true });
        doc.font('Helvetica').text(`- S/ ${d.descuentoDinero}`);
      }
      doc.font('Helvetica-Bold').text('Total a pagar: ', { continued: true });
      doc.font('Helvetica-Bold').fillColor('#C8102E').text(`S/ ${d.total || 0}`);
      doc.fillColor('#000000');
      doc.moveDown(1);

      // === Cláusulas ===
      doc.fontSize(11).font('Helvetica-Bold').text('TÉRMINOS Y CONDICIONES');
      doc.moveDown(0.3);

      doc.fontSize(8).font('Helvetica');
      CLAUSULAS.forEach((clausula, i) => {
        doc.text(`${i + 1}. ${clausula}`, { indent: 10 });
        doc.moveDown(0.3);
      });
      doc.moveDown(0.5);

      // === Declaración ===
      doc.fontSize(9).font('Helvetica-Bold')
        .text(`Yo, ${d.nombrePadre || '___'}, con DNI ${d.dniPadre || '___'}, declaro haber leído y aceptado todos los términos y condiciones del presente contrato para la inscripción de ${d.nombreAlumno || '___'} en el programa ${d.programa || '___'} de la academia Dragon Knight.`);
      doc.moveDown(1.5);

      // === Firma ===
      if (firmaBase64) {
        try {
          const imgData = firmaBase64.replace(/^data:image\/\w+;base64,/, '');
          const imgBuffer = Buffer.from(imgData, 'base64');
          doc.text('Firma del apoderado:', { underline: true });
          doc.moveDown(0.3);
          doc.image(imgBuffer, { width: 200, height: 80 });
        } catch (err) {
          doc.text('Firma: [Error al procesar imagen]');
        }
      } else {
        doc.text('Firma: ____________________________');
      }
      doc.moveDown(0.3);
      doc.fontSize(8).font('Helvetica').text(`${d.nombrePadre || '___'} — DNI: ${d.dniPadre || '___'}`);
      doc.moveDown(2);

      // === Footer ===
      doc.fontSize(7).font('Helvetica').fillColor('#999999')
        .text('Documento generado digitalmente por Dragon Knight — Academia de Taekwondo', { align: 'center' });
      doc.text(`Generado el ${new Date().toLocaleString('es-PE')}`, { align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generarPDFContrato };
