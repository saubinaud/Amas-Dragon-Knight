import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { FormularioMatricula } from '@/features/formularios/components/FormularioMatricula';

export default function RegistroMensualPage() {
    const navigate = useNavigate();
    const [isFormOpen, setIsFormOpen] = useState(true);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

    return (
        <div className="min-h-screen bg-dk-black text-dk-white">
            <header className="border-b border-dk-gray-800 bg-dk-black/95 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-dk-gray-400 hover:text-dk-red transition-colors cursor-pointer">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-body">Volver al inicio</span>
                    </button>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="mb-8">
                    <h1 className="font-heading text-3xl sm:text-4xl text-dk-white tracking-wider mb-2">PROGRAMA MENSUAL</h1>
                    <p className="font-body text-lg text-dk-gray-400">Inscríbete en nuestro programa de 1 mes</p>
                </div>

                <div className="bg-dk-gray-900 border border-dk-red/30 rounded-sm p-6 sm:p-8 mb-8">
                    <h2 className="font-heading text-xl text-dk-red tracking-wider mb-4">¿QUÉ INCLUYE?</h2>
                    <ul className="space-y-3 text-dk-gray-200 font-body">
                        {['8 clases distribuidas según tu disponibilidad', 'Clases recuperables', 'Horarios flexibles', 'Seguimiento del progreso'].map(t => (
                            <li key={t} className="flex items-start gap-3">
                                <Check size={16} className="text-dk-red mt-0.5 shrink-0" />
                                <span>{t}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 pt-6 border-t border-dk-gray-800">
                        <span className="font-heading text-4xl text-dk-white">S/330</span>
                    </div>
                </div>

                {!isFormOpen && (
                    <Button onClick={() => setIsFormOpen(true)} size="lg" className="w-full">INSCRIBIRME AHORA</Button>
                )}
            </div>

            <FormularioMatricula isOpen={isFormOpen} onClose={() => { setIsFormOpen(false); navigate('/'); }} programa="1mes" onSuccess={() => { }} />
        </div>
    );
}
