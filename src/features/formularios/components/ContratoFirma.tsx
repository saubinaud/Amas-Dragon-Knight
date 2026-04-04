import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, Check } from 'lucide-react';

interface ContratoFirmaDatos {
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
}

interface ContratoFirmaProps {
  datos: ContratoFirmaDatos;
  onFirmaCompleta: (firmaBase64: string) => void;
}

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

export function ContratoFirma({ datos, onFirmaCompleta }: ContratoFirmaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [expandedClause, setExpandedClause] = useState<number | null>(null);
  const [firmado, setFirmado] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getPos = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  }, []);

  const startDrawing = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  }, [getPos]);

  const draw = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setHasSignature(true);
  }, [isDrawing, getPos]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHasSignature(false);
    setFirmado(false);
  };

  const confirmarFirma = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature || !accepted) return;

    const firmaBase64 = canvas.toDataURL('image/png');
    setFirmado(true);
    onFirmaCompleta(firmaBase64);
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-dk-red/30">
        <h3 className="font-heading text-base sm:text-lg font-bold text-white tracking-wider uppercase">
          Contrato Digital
        </h3>
        <p className="text-white/50 text-xs sm:text-sm font-body mt-1">
          Lee las cláusulas, firma y acepta los términos
        </p>
      </div>

      {/* Cláusulas */}
      <div className="px-4 sm:px-6 py-4 space-y-2 max-h-[300px] overflow-y-auto border-b border-white/10">
        {CLAUSULAS.map((clausula, i) => (
          <div key={i} className="border border-white/[0.06] rounded-sm">
            <button
              type="button"
              onClick={() => setExpandedClause(expandedClause === i ? null : i)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-left"
            >
              <span className="text-white/80 text-xs sm:text-sm font-body flex items-center gap-2">
                <span className="text-dk-red font-heading font-bold text-xs">{i + 1}.</span>
                <span className="line-clamp-1">{clausula.substring(0, 60)}...</span>
              </span>
              {expandedClause === i ? (
                <ChevronUp className="w-4 h-4 text-white/40 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />
              )}
            </button>
            {expandedClause === i && (
              <div className="px-3 pb-3 text-white/60 text-xs leading-relaxed font-body">
                {clausula}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Declaración */}
      <div className="px-4 sm:px-6 py-4 border-b border-white/10 bg-white/[0.02]">
        <p className="text-white/70 text-xs sm:text-sm font-body leading-relaxed">
          Yo, <strong className="text-white">{datos.nombrePadre || '___'}</strong>, con DNI{' '}
          <strong className="text-white">{datos.dniPadre || '___'}</strong>, acepto inscribir a{' '}
          <strong className="text-white">{datos.nombreAlumno || '___'}</strong> en el programa{' '}
          <strong className="text-dk-red">{datos.programa || '___'}</strong> de la academia Dragon Knight.
        </p>
      </div>

      {/* Canvas de firma */}
      <div className="px-4 sm:px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/60 text-xs font-body">Firma del apoderado</span>
          {hasSignature && (
            <button
              type="button"
              onClick={clearSignature}
              className="flex items-center gap-1 text-white/40 hover:text-dk-red text-xs transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Borrar
            </button>
          )}
        </div>
        <div className="relative border border-white/20 rounded-sm bg-white/[0.03] overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full cursor-crosshair touch-none"
            style={{ height: '120px' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          {!hasSignature && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-white/20 text-sm font-body">Dibuja tu firma aquí</span>
            </div>
          )}
        </div>
      </div>

      {/* Checkbox + Confirmar */}
      <div className="px-4 sm:px-6 py-4 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              accepted
                ? 'bg-dk-red border-dk-red'
                : 'border-white/30 group-hover:border-white/50'
            }`}>
              {accepted && <Check className="w-3 h-3 text-white" />}
            </div>
          </div>
          <span className="text-white/70 text-xs sm:text-sm font-body leading-relaxed">
            He leído y acepto todos los términos y condiciones del contrato de inscripción.
          </span>
        </label>

        {firmado ? (
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-sm px-4 py-3">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-green-400 text-sm font-body font-medium">Contrato firmado correctamente</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={confirmarFirma}
            disabled={!hasSignature || !accepted}
            className={`w-full py-3 rounded-sm font-heading text-sm uppercase tracking-wider transition-all ${
              hasSignature && accepted
                ? 'bg-dk-red text-white hover:bg-dk-red-light cursor-pointer'
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
          >
            Confirmar Firma
          </button>
        )}
      </div>
    </div>
  );
}
