import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, BookOpen } from 'lucide-react';
import { DragonLogo } from '@/shared/components/ui/DragonLogo';
import { API_BASE } from '@/config/api';

interface ResultadoAsistencia {
  success: boolean;
  alumno?: string;
  programa?: string;
  hora?: string;
  turno?: string;
  clases_totales?: number;
  clases_usadas?: number;
  clases_restantes?: number;
  error?: string;
}

export default function AsistenciaPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [dni, setDni] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<ResultadoAsistencia | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dni.trim()) return;

    setLoading(true);
    setResultado(null);

    try {
      const res = await fetch(`${API_BASE}/asistencia/marcar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dni: dni.trim(), token }),
      });
      const data = await res.json();
      setResultado(data);
    } catch {
      setResultado({ success: false, error: 'Error de conexión. Intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDni('');
    setResultado(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="min-h-[100dvh] bg-dk-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 pt-8 pb-4">
        <DragonLogo size={36} variant="default" />
        <div className="leading-tight">
          <div className="font-heading text-sm font-bold text-white tracking-tight">Dragon</div>
          <div className="font-heading text-[9px] font-semibold text-dk-red tracking-[0.35em] uppercase">Knight</div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-8">
        {!resultado ? (
          /* Form State */
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-dk-red/10 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-dk-red" />
              </div>
              <h1 className="font-heading text-2xl font-bold text-white mb-2">
                Registro de Asistencia
              </h1>
              <p className="text-white/50 font-body text-sm">
                Ingresa el DNI del alumno para marcar asistencia
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={8}
                  value={dni}
                  onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
                  placeholder="DNI del alumno"
                  className="w-full bg-dk-surface border border-white/10 rounded-xl px-5 py-4 text-white text-center text-2xl font-heading tracking-[0.3em] placeholder:text-white/20 placeholder:text-base placeholder:tracking-normal focus:outline-none focus:border-dk-red/50 focus:ring-1 focus:ring-dk-red/30 transition-colors"
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={loading || dni.length < 8}
                className={`w-full py-4 rounded-xl font-heading text-base uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  dni.length >= 8
                    ? 'bg-dk-red text-white hover:bg-dk-red-light active:scale-[0.98] shadow-lg shadow-dk-red/20'
                    : 'bg-white/5 text-white/30 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Marcar Asistencia'
                )}
              </button>
            </form>

            {!token && (
              <p className="text-center text-amber-400/60 text-xs font-body mt-6">
                Sin token QR — el registro será manual
              </p>
            )}
          </div>
        ) : resultado.success ? (
          /* Success State */
          <div className="w-full max-w-sm text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-white mb-1">
              ¡Asistencia Registrada!
            </h2>
            <p className="text-white/50 font-body text-sm mb-6">{resultado.hora}</p>

            <div className="bg-dk-surface border border-white/[0.07] rounded-xl p-5 space-y-3 text-left mb-6">
              <div className="flex justify-between items-center">
                <span className="text-white/50 font-body text-sm">Alumno</span>
                <span className="text-white font-heading font-semibold">{resultado.alumno}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/50 font-body text-sm">Programa</span>
                <span className="text-white/80 font-body text-sm">{resultado.programa}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/50 font-body text-sm">Turno</span>
                <span className="text-white/80 font-body text-sm">{resultado.turno}</span>
              </div>
              {resultado.clases_totales && resultado.clases_totales > 0 && (
                <>
                  <div className="border-t border-white/[0.07] pt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/50 font-body text-sm">Clases usadas</span>
                      <span className="text-white font-heading font-bold">
                        {resultado.clases_usadas} / {resultado.clases_totales}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-dk-red rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(((resultado.clases_usadas || 0) / resultado.clases_totales) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <p className="text-right text-xs text-white/40 font-body mt-1">
                      {resultado.clases_restantes} clases restantes
                    </p>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={resetForm}
              className="w-full py-3.5 rounded-xl font-heading text-sm uppercase tracking-wider bg-white/[0.06] text-white/70 hover:bg-white/10 transition-colors"
            >
              Registrar otro alumno
            </button>
          </div>
        ) : (
          /* Error State */
          <div className="w-full max-w-sm text-center">
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-5">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="font-heading text-xl font-bold text-white mb-2">
              No se pudo registrar
            </h2>
            <p className="text-white/60 font-body text-sm mb-8">
              {resultado.error}
            </p>

            {resultado.alumno && (
              <div className="bg-dk-surface border border-white/[0.07] rounded-xl p-4 mb-6 text-left">
                <span className="text-white/50 font-body text-xs">Alumno: </span>
                <span className="text-white font-body text-sm">{resultado.alumno}</span>
              </div>
            )}

            <button
              onClick={resetForm}
              className="w-full py-3.5 rounded-xl font-heading text-sm uppercase tracking-wider bg-dk-red text-white hover:bg-dk-red-light transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center pb-6">
        <p className="text-white/20 text-xs font-body">Dragon Knight — Academia de Taekwondo</p>
      </div>
    </div>
  );
}
