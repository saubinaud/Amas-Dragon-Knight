import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, MapPin, Calendar, Users, Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { API_BASE } from '@/config/api';
import { TorneoForm } from './components/TorneoForm';

interface Torneo {
  id: number;
  nombre: string;
  fecha: string;
  lugar: string;
  descripcion: string;
  precio: number;
  activo: boolean;
}

export default function TorneoPage() {
  const navigate = useNavigate();
  const [torneos, setTorneos] = useState<Torneo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTorneo, setSelectedTorneo] = useState<Torneo | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    fetchTorneos();
  }, []);

  const fetchTorneos = async () => {
    try {
      const res = await fetch(`${API_BASE}/torneos`);
      const data = await res.json();
      if (data.success) {
        setTorneos(data.torneos);
      }
    } catch (err) {
      console.error('Error fetching torneos:', err);
    } finally {
      setLoading(false);
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

  return (
    <div className="min-h-screen bg-dk-black text-dk-white">
      {/* Header */}
      <header className="border-b border-dk-gray-800 bg-dk-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-dk-gray-400 hover:text-dk-red transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-body">Volver al inicio</span>
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
              Competencia Oficial
            </span>
            <span className="w-5 h-[2px] bg-dk-red rounded-full" />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Torneos <span className="text-dk-red">Dragon Knight</span>
          </h1>
          <p className="font-body text-lg text-white/60 max-w-2xl mx-auto">
            Demuestra tu disciplina y habilidad en nuestros torneos oficiales.
            Compite, aprende y crece como artista marcial.
          </p>
        </div>
      </section>

      {/* Tournament List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-dk-red" />
          </div>
        ) : torneos.length === 0 ? (
          <div className="text-center py-20">
            <Trophy className="w-16 h-16 text-white/10 mx-auto mb-6" />
            <h3 className="font-heading text-2xl text-white/40 mb-2">No hay torneos programados</h3>
            <p className="font-body text-white/30">
              Los próximos torneos se anunciarán pronto. ¡Sigue entrenando!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {torneos.map((torneo) => (
              <div
                key={torneo.id}
                className="bg-dk-surface border border-white/[0.07] rounded-xl p-6 sm:p-8 hover:border-dk-red/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-heading text-2xl font-bold text-white mb-3">
                      {torneo.nombre}
                    </h3>
                    <div className="flex flex-col gap-2 text-white/60 font-body text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-dk-red" />
                        <span>{formatDate(torneo.fecha)}</span>
                      </div>
                      {torneo.lugar && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-dk-red" />
                          <span>{torneo.lugar}</span>
                        </div>
                      )}
                    </div>
                    {torneo.descripcion && (
                      <p className="text-white/50 font-body text-sm leading-relaxed">
                        {torneo.descripcion}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    {torneo.precio > 0 && (
                      <div className="text-right">
                        <span className="font-heading text-3xl font-bold text-white">
                          S/{torneo.precio}
                        </span>
                        <span className="text-white/40 text-sm block">por alumno</span>
                      </div>
                    )}
                    <Button
                      size="md"
                      onClick={() => {
                        setSelectedTorneo(torneo);
                        setShowForm(true);
                      }}
                    >
                      <Users className="w-4 h-4" />
                      Inscribirse
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Registration Form Modal */}
      {showForm && selectedTorneo && (
        <TorneoForm
          torneo={selectedTorneo}
          onClose={() => {
            setShowForm(false);
            setSelectedTorneo(null);
          }}
          onSuccess={() => {
            setShowForm(false);
            setSelectedTorneo(null);
          }}
        />
      )}
    </div>
  );
}
