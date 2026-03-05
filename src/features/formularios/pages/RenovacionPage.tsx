import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/Button';
import { FormularioRenovacion } from '@/features/formularios/components/FormularioRenovacion';

export default function RenovacionPage() {
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [totalPagado, setTotalPagado] = useState(0);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-dk-black text-dk-white flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="text-6xl mb-6">🎉</div>
                    <h1 className="font-heading text-3xl text-dk-white tracking-wider mb-4">¡RENOVACIÓN EXITOSA!</h1>
                    <p className="font-body text-dk-gray-400 mb-2">
                        Tu renovación por <span className="text-dk-red font-bold">S/ {totalPagado}</span> ha sido registrada.
                    </p>
                    <p className="font-body text-dk-gray-600 text-sm mb-8">Los detalles serán enviados a tu correo electrónico.</p>
                    <Button onClick={() => navigate('/')} size="lg">VOLVER AL INICIO</Button>
                </div>
            </div>
        );
    }

    return (
        <FormularioRenovacion
            onSuccess={(total) => { setTotalPagado(total); setShowSuccess(true); }}
            onClose={() => navigate('/')}
        />
    );
}
