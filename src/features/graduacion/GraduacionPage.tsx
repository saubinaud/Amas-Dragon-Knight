import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Calendar, MapPin, ChevronRight, Loader2, CheckCircle, Clock, XCircle } from 'lucide-react';
import { API_BASE } from '@/config/api';

interface Graduacion {
  id: number;
  nombre: string;
  fecha: string;
  lugar: string;
  descripcion: string;
  activa: boolean;
}

interface Participante {
  id: number;
  nombre_alumno: string;
  dni_alumno: string;
  cinturon_actual: string;
  cinturon_nuevo: string;
  estado: string;
}

const CINTURONES = [
  { nombre: 'Blanco', color: 'bg-white' },
  { nombre: 'Amarillo', color: 'bg-yellow-400' },
  { nombre: 'Verde', color: 'bg-green-500' },
  { nombre: 'Azul', color: 'bg-blue-600' },
  { nombre: 'Rojo', color: 'bg-red-600' },
  { nombre: 'Negro', color: 'bg-black border border-white/30' },
];

export default function GraduacionPage() {
  const navigate = useNavigate();
  const [graduaciones, setGraduaciones] = useState<Graduacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrad, setSelectedGrad] = useState<Graduacion | null>(null);
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    fetchGraduaciones();
  }, []);

  const fetchGraduaciones = async () => {
    try {
      const res = await fetch(`${API_BASE}/graduacion`);
      const data = await res.json();
      if (data.success) {
        setGraduaciones(data.graduaciones);
      }
    } catch (err) {
      console.error('Error fetching graduaciones:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetail = async (grad: Graduacion) => {
    setSelectedGrad(grad);
    setLoadingDetail(true);
    try {
      const res = await fetch(`${API_BASE}/graduacion/${grad.id}`);
      const data = await res.json();
      if (data.success) {
        setParticipantes(data.participantes);
      }
    } catch (err) {
      console.error('Error fetching detail:', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-PE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'Aprobado':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'Reprobado':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-dk-black text-dk-white">
      {/* Header */}
      <header className="border-b border-dk-gray-800 bg-dk-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => {
              if (selectedGrad) {
                setSelectedGrad(null);
                setParticipantes([]);
              } else {
                navigate('/');
              }
            }}
            className="flex items-center gap-2 text-dk-gray-400 hover:text-dk-red transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-body">{selectedGrad ? 'Volver a graduaciones' : 'Volver al inicio'}</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dk-red/[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <span className="w-5 h-[2px] bg-dk-red rounded-full" />
            <span className="text-dk-red text-xs font-semibold tracking-[0.3em] uppercase font-heading">
              Progresión de Cinturón
            </span>
            <span className="w-5 h-[2px] bg-dk-red rounded-full" />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Graduaciones <span className="text-dk-red">Dragon Knight</span>
          </h1>
          <p className="font-body text-lg text-white/60 max-w-2xl mx-auto">
            Cada graduación es un paso en tu camino marcial. Conoce las próximas fechas
            y revisa los resultados de exámenes anteriores.
          </p>
        </div>
      </section>

      {/* Belt Journey */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {CINTURONES.map((belt, i) => (
            <div key={belt.nombre} className="flex items-center gap-2">
              <div className={`w-8 h-3 rounded-sm ${belt.color}`} />
              <span className="text-white/50 text-xs font-body">{belt.nombre}</span>
              {i < CINTURONES.length - 1 && <ChevronRight className="w-3 h-3 text-white/20" />}
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-dk-red" />
          </div>
        ) : selectedGrad ? (
          /* Detail View */
          <div>
            <div className="bg-dk-surface border border-white/[0.07] rounded-xl p-6 sm:p-8 mb-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-2">{selectedGrad.nombre}</h2>
              <div className="flex flex-wrap gap-4 text-white/60 font-body text-sm mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-dk-red" />
                  <span>{formatDate(selectedGrad.fecha)}</span>
                </div>
                {selectedGrad.lugar && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-dk-red" />
                    <span>{selectedGrad.lugar}</span>
                  </div>
                )}
              </div>
              {selectedGrad.descripcion && (
                <p className="text-white/50 font-body leading-relaxed">{selectedGrad.descripcion}</p>
              )}
            </div>

            {/* Participants */}
            <h3 className="font-heading text-xl font-bold text-white mb-4">
              Participantes ({participantes.length})
            </h3>
            {loadingDetail ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-dk-red" />
              </div>
            ) : participantes.length === 0 ? (
              <div className="text-center py-12 text-white/40 font-body">
                Aún no hay participantes registrados para esta graduación.
              </div>
            ) : (
              <div className="grid gap-3">
                {participantes.map((p) => (
                  <div
                    key={p.id}
                    className="bg-dk-surface border border-white/[0.07] rounded-lg px-5 py-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-body font-medium text-white">{p.nombre_alumno}</p>
                      <p className="text-white/40 text-sm font-body">
                        {p.cinturon_actual} → {p.cinturon_nuevo}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getEstadoIcon(p.estado)}
                      <span className="text-sm font-body text-white/60">{p.estado}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : graduaciones.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <Award className="w-16 h-16 text-white/10 mx-auto mb-6" />
            <h3 className="font-heading text-2xl text-white/40 mb-2">No hay graduaciones programadas</h3>
            <p className="font-body text-white/30">
              Las próximas graduaciones se anunciarán cuando haya alumnos listos para avanzar.
            </p>
          </div>
        ) : (
          /* List View */
          <div className="grid gap-6">
            {graduaciones.map((grad) => (
              <button
                key={grad.id}
                onClick={() => fetchDetail(grad)}
                className="bg-dk-surface border border-white/[0.07] rounded-xl p-6 sm:p-8 hover:border-dk-red/30 transition-colors text-left w-full group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-dk-red transition-colors">
                      {grad.nombre}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-white/60 font-body text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-dk-red" />
                        <span>{formatDate(grad.fecha)}</span>
                      </div>
                      {grad.lugar && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-dk-red" />
                          <span>{grad.lugar}</span>
                        </div>
                      )}
                    </div>
                    {grad.descripcion && (
                      <p className="text-white/50 font-body text-sm">{grad.descripcion}</p>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-dk-red transition-colors mt-1 shrink-0" />
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
