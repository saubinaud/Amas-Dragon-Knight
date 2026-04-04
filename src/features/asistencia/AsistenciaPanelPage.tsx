import { useState, useEffect, useCallback, useRef } from 'react';
import { QrCode, Users, RefreshCw, Power, PowerOff, Clock, Lock } from 'lucide-react';
import { DragonLogo } from '@/shared/components/ui/DragonLogo';
import { API_BASE } from '@/config/api';

const PIN_PROFESORA = '2835';

interface QrSesion {
  id: number;
  token: string;
  fecha: string;
  hora_apertura: string;
  url: string;
}

interface Asistencia {
  id: number;
  nombre_alumno: string;
  dni_alumno: string;
  hora: string;
  turno: string;
  programa: string;
  clases_totales: number;
  clases_usadas: number;
  metodo_registro: string;
}

export default function AsistenciaPanelPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [sesionActiva, setSesionActiva] = useState<QrSesion | null>(null);
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [generandoQr, setGenerandoQr] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check active session on mount
  const checkSesion = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/qr/activa`);
      const data = await res.json();
      if (data.success && data.activa) {
        setSesionActiva(data.sesion);
      } else {
        setSesionActiva(null);
      }
    } catch {
      console.error('Error checking sesion');
    }
  }, []);

  const fetchAsistencias = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/asistencia/hoy`);
      const data = await res.json();
      if (data.success) {
        setAsistencias(data.asistencias);
      }
    } catch {
      console.error('Error fetching asistencias');
    }
  }, []);

  // Auto-refresh every 10 seconds
  useEffect(() => {
    if (!authenticated) return;

    checkSesion();
    fetchAsistencias();

    intervalRef.current = setInterval(() => {
      fetchAsistencias();
    }, 10000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [authenticated, checkSesion, fetchAsistencias]);

  const handlePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === PIN_PROFESORA) {
      setAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPin('');
    }
  };

  const generarQr = async () => {
    setGenerandoQr(true);
    try {
      const res = await fetch(`${API_BASE}/qr/generar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sede_id: 1 }),
      });
      const data = await res.json();
      if (data.success) {
        setSesionActiva(data.sesion);
      }
    } catch {
      console.error('Error generando QR');
    } finally {
      setGenerandoQr(false);
    }
  };

  const cerrarSesion = async () => {
    try {
      await fetch(`${API_BASE}/qr/cerrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sede_id: 1 }),
      });
      setSesionActiva(null);
    } catch {
      console.error('Error cerrando sesión');
    }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    // Handle both "HH:MM:SS" and ISO formats
    const parts = timeStr.split(':');
    if (parts.length >= 2) return `${parts[0]}:${parts[1]}`;
    return timeStr;
  };

  // === PIN Screen ===
  if (!authenticated) {
    return (
      <div className="min-h-[100dvh] bg-dk-black flex flex-col items-center justify-center px-5">
        <DragonLogo size={48} variant="default" className="mb-6" />
        <h1 className="font-heading text-xl font-bold text-white mb-1">Panel de Asistencia</h1>
        <p className="text-white/40 font-body text-sm mb-8">Ingresa el PIN para acceder</p>

        <form onSubmit={handlePin} className="w-full max-w-xs space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ''));
                setPinError(false);
              }}
              placeholder="PIN"
              autoFocus
              className={`w-full bg-dk-surface border rounded-xl pl-11 pr-5 py-4 text-white text-center text-xl font-heading tracking-[0.5em] placeholder:text-white/20 placeholder:tracking-normal focus:outline-none transition-colors ${
                pinError
                  ? 'border-red-500/50 focus:border-red-500'
                  : 'border-white/10 focus:border-dk-red/50 focus:ring-1 focus:ring-dk-red/30'
              }`}
            />
          </div>
          {pinError && (
            <p className="text-red-400 text-xs font-body text-center">PIN incorrecto</p>
          )}
          <button
            type="submit"
            disabled={pin.length < 4}
            className={`w-full py-3.5 rounded-xl font-heading text-sm uppercase tracking-wider transition-all ${
              pin.length >= 4
                ? 'bg-dk-red text-white hover:bg-dk-red-light'
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
          >
            Acceder
          </button>
        </form>
      </div>
    );
  }

  // === Main Panel ===
  return (
    <div className="min-h-[100dvh] bg-dk-black flex flex-col">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-dk-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DragonLogo size={32} variant="default" />
            <div>
              <h1 className="font-heading text-sm font-bold text-white">Panel de Asistencia</h1>
              <p className="text-white/40 text-xs font-body">
                {new Date().toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { fetchAsistencias(); checkSesion(); }}
              className="p-2 rounded-lg bg-white/[0.06] text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              title="Actualizar"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        {/* QR Section */}
        <div className="bg-dk-surface border border-white/[0.07] rounded-xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-dk-red" />
              <h2 className="font-heading text-lg font-bold text-white">Código QR</h2>
            </div>
            {sesionActiva && (
              <div className="flex items-center gap-1.5 text-green-400 text-xs font-body">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Sesión activa
              </div>
            )}
          </div>

          {sesionActiva ? (
            <div className="space-y-4">
              {/* QR Code Display */}
              <div className="bg-white rounded-xl p-4 flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(sesionActiva.url)}`}
                  alt="QR Asistencia"
                  className="w-[250px] h-[250px]"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-white/50 font-body">
                  <Clock className="w-4 h-4" />
                  Abierto desde {formatTime(sesionActiva.hora_apertura)}
                </div>
                <button
                  onClick={cerrarSesion}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors font-heading text-xs uppercase tracking-wider"
                >
                  <PowerOff className="w-3.5 h-3.5" />
                  Cerrar sesión
                </button>
              </div>

              <p className="text-white/30 text-xs font-body text-center break-all">
                {sesionActiva.url}
              </p>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-white/40 font-body text-sm mb-4">
                No hay sesión QR activa. Genera una para iniciar la clase.
              </p>
              <button
                onClick={generarQr}
                disabled={generandoQr}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dk-red text-white font-heading text-sm uppercase tracking-wider hover:bg-dk-red-light transition-colors disabled:opacity-50"
              >
                {generandoQr ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Power className="w-4 h-4" />
                )}
                Generar QR
              </button>
            </div>
          )}
        </div>

        {/* Attendance List */}
        <div className="bg-dk-surface border border-white/[0.07] rounded-xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-dk-red" />
              <h2 className="font-heading text-lg font-bold text-white">
                Asistencia de Hoy
              </h2>
            </div>
            <span className="bg-dk-red/10 text-dk-red px-3 py-1 rounded-full font-heading text-sm font-bold">
              {asistencias.length}
            </span>
          </div>

          {asistencias.length === 0 ? (
            <div className="text-center py-10">
              <Users className="w-10 h-10 text-white/10 mx-auto mb-3" />
              <p className="text-white/30 font-body text-sm">
                Aún no hay asistencias registradas hoy
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {asistencias.map((a, i) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-dk-red/10 flex items-center justify-center text-dk-red font-heading text-xs font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-white font-body font-medium text-sm">
                        {a.nombre_alumno}
                      </p>
                      <div className="flex items-center gap-2 text-white/40 text-xs font-body">
                        <span>{a.programa}</span>
                        {a.clases_totales > 0 && (
                          <>
                            <span className="text-white/20">·</span>
                            <span>{a.clases_usadas}/{a.clases_totales} clases</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 font-heading text-sm">{formatTime(a.hora)}</p>
                    <p className="text-white/30 text-xs font-body capitalize">{a.metodo_registro}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
