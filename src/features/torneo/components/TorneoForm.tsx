import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/shared/components/ui-forms/form-button';
import { Input } from '@/shared/components/ui-forms/input';
import { Label } from '@/shared/components/ui-forms/label';
import { toast } from 'sonner';
import { API_BASE } from '@/config/api';

interface Torneo {
  id: number;
  nombre: string;
  fecha: string;
  lugar: string;
  precio: number;
}

interface TorneoFormProps {
  torneo: Torneo;
  onClose: () => void;
  onSuccess: () => void;
}

const MODALIDADES = [
  'Poomsae Individual',
  'Poomsae Parejas',
  'Poomsae Equipos',
  'Combate',
  'Rompimiento',
];

export function TorneoForm({ torneo, onClose, onSuccess }: TorneoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombreAlumno: '',
    dniAlumno: '',
    fechaNacimiento: '',
    categoria: '',
    nombreApoderado: '',
    dniApoderado: '',
    correo: '',
    telefono: '',
  });
  const [modalidades, setModalidades] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleModalidad = (mod: string) => {
    setModalidades((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombreAlumno || !formData.dniAlumno) {
      toast.error('Nombre y DNI del alumno son obligatorios');
      return;
    }
    if (!formData.nombreApoderado || !formData.correo) {
      toast.error('Nombre del apoderado y correo son obligatorios');
      return;
    }
    if (modalidades.length === 0) {
      toast.error('Seleccione al menos una modalidad');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/torneos/inscripcion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          torneoId: torneo.id,
          torneoNombre: torneo.nombre,
          nombreAlumno: formData.nombreAlumno,
          dniAlumno: formData.dniAlumno,
          fechaNacimiento: formData.fechaNacimiento || null,
          categoria: formData.categoria || 'No especificada',
          nombreApoderado: formData.nombreApoderado,
          dniApoderado: formData.dniApoderado,
          correo: formData.correo,
          telefono: formData.telefono,
          modalidades: modalidades.join(', '),
          montoPagado: torneo.precio,
        }),
      });

      const data = await response.json();

      if (response.status === 409) {
        toast.error(data.error || 'El alumno ya está inscrito en este torneo');
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || 'Error del servidor');
      }

      toast.success('¡Inscripción al torneo registrada exitosamente!');
      onSuccess();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Hubo un error al registrar. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="bg-dk-surface border border-white/[0.07] rounded-xl w-full max-w-lg relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.07]">
          <div>
            <h2 className="font-heading text-xl font-bold text-white">Inscripción al Torneo</h2>
            <p className="text-white/50 text-sm font-body mt-1">{torneo.nombre}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Alumno */}
          <div className="space-y-4">
            <h3 className="font-heading text-sm text-dk-red tracking-wider uppercase">
              Datos del Alumno
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombreAlumno">Nombre completo *</Label>
                <Input name="nombreAlumno" value={formData.nombreAlumno} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="dniAlumno">DNI *</Label>
                <Input name="dniAlumno" value={formData.dniAlumno} onChange={handleChange} maxLength={8} required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
                <Input name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="categoria">Categoría</Label>
                <Input name="categoria" value={formData.categoria} onChange={handleChange} placeholder="Ej: Infantil, Juvenil" />
              </div>
            </div>
          </div>

          {/* Apoderado */}
          <div className="space-y-4">
            <h3 className="font-heading text-sm text-dk-red tracking-wider uppercase">
              Datos del Apoderado
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombreApoderado">Nombre completo *</Label>
                <Input name="nombreApoderado" value={formData.nombreApoderado} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="dniApoderado">DNI</Label>
                <Input name="dniApoderado" value={formData.dniApoderado} onChange={handleChange} maxLength={8} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="correo">Correo electrónico *</Label>
                <Input name="correo" type="email" value={formData.correo} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input name="telefono" value={formData.telefono} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Modalidades */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm text-dk-red tracking-wider uppercase">
              Modalidades *
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MODALIDADES.map((mod) => (
                <button
                  key={mod}
                  type="button"
                  onClick={() => toggleModalidad(mod)}
                  className={`text-left px-4 py-3 rounded-lg border text-sm font-body transition-all ${
                    modalidades.includes(mod)
                      ? 'bg-dk-red/10 border-dk-red/50 text-white'
                      : 'bg-white/[0.03] border-white/[0.07] text-white/60 hover:border-white/20'
                  }`}
                >
                  {mod}
                </button>
              ))}
            </div>
          </div>

          {/* Precio */}
          {torneo.precio > 0 && (
            <div className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.07]">
              <div className="flex justify-between items-center">
                <span className="text-white/60 font-body">Total a pagar</span>
                <span className="font-heading text-2xl font-bold text-white">S/{torneo.precio}</span>
              </div>
            </div>
          )}

          {/* Submit */}
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Registrando...' : 'Confirmar Inscripción'}
          </Button>
        </form>
      </div>
    </div>
  );
}
