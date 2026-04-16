import { useState } from 'react';
import { Check, X, Zap, ArrowRight, Star } from 'lucide-react';
import { FormularioMatricula } from '@/features/formularios/components/FormularioMatricula';
import { useReveal } from '@/shared/hooks/useReveal';

const plans = [
    {
        id: '1mes',
        name: "Mes a Mes",
        duration: '1 mes',
        price: "300",
        features: [
            { text: '8 Clases (2x semana)', included: true },
            { text: 'Acceso a instalaciones', included: true },
            { text: 'Matrícula gratis', included: false },
            { text: 'Uniforme oficial', included: false },
            { text: 'Graduación + cinturón', included: false },
        ],
        highlight: false,
    },
    {
        id: '2meses',
        name: "Programa 2 Meses",
        duration: '2 meses',
        price: "450",
        features: [
            { text: '16 Clases (2x semana)', included: true },
            { text: 'Acceso a instalaciones', included: true },
            { text: 'Seguimiento de progreso', included: true },
            { text: 'Uniforme oficial', included: false },
            { text: 'Graduación + cinturón', included: false },
        ],
        highlight: false,
    },
    {
        id: 'full',
        name: "Programa 3 Meses",
        duration: '3 meses',
        price: "559",
        originalPrice: "690",
        features: [
            { text: '24 Clases presenciales', included: true },
            { text: 'Matrícula gratis', included: true },
            { text: 'Uniforme oficial incluido', included: true },
            { text: '1 Graduación + cinturón', included: true },
            { text: 'Certificado de rango', included: true },
            { text: 'Cartilla de seguimiento', included: true },
        ],
        highlight: true,
        tag: "Mejor valor",
    },
];

export const MembershipPlans = () => {
    const [selectedPlan, setSelectedPlan] = useState<'full' | '1mes' | '2meses' | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const ref = useReveal<HTMLDivElement>({ children: true });

    const handleSelectPlan = (planId: string) => {
        setSelectedPlan(planId as 'full' | '1mes' | '2meses');
        setIsFormOpen(true);
    };

    return (
        <section id="pricing" className="py-20 sm:py-28 bg-layered relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-red pointer-events-none" />

            <div ref={ref} className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-14">
                    <div className="reveal inline-flex items-center gap-2 bg-dk-red/10 border border-dk-red/20 rounded-full px-5 py-2 mb-5">
                        <span className="text-[10px]">💪</span>
                        <span className="text-dk-red-light text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-heading">
                            Inversión en tu Futuro
                        </span>
                    </div>
                    <h2 className="reveal reveal-delay-1 font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                        <span className="text-gradient-light">Elige tu</span>{' '}
                        <span className="text-gradient-red">plan</span>
                    </h2>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 lg:gap-6 md:max-w-none lg:max-w-6xl mx-auto">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`reveal reveal-delay-${i + 2} relative flex flex-col rounded-2xl p-5 md:p-5 lg:p-7 border transition-colors duration-300 ${
                                plan.highlight
                                    ? 'bg-gradient-to-br from-[#222225] via-[#222225]/95 to-[#1A1A1D] border-2 border-dk-red shadow-2xl shadow-dk-red/20 scale-[1.02]'
                                    : 'bg-gradient-to-br from-[#222225] via-[#222225]/95 to-[#1A1A1D] border-white/[0.07] hover:border-white/[0.14] card-glow'
                            }`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#C8102E] to-[#DF1939] text-white text-[10px] sm:text-xs font-bold font-heading tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-bl-xl shadow-lg flex items-center gap-1.5 z-10">
                                    <Star size={10} fill="currentColor" />
                                    {plan.tag}
                                </div>
                            )}

                            {plan.highlight && (
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-dk-red/0 via-dk-red/[0.06] to-dk-red/0 pointer-events-none" />
                            )}

                            <div className="mb-5">
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                                    {plan.duration}
                                </span>
                                <h3 className="font-heading text-xl font-bold text-white mt-1 tracking-tight">
                                    {plan.name}
                                </h3>
                            </div>

                            <div className="mb-6">
                                {plan.originalPrice && (
                                    <span className="text-xs line-through mb-1 block text-white/30">
                                        S/ {plan.originalPrice}
                                    </span>
                                )}
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm font-medium text-white/40">S/</span>
                                    <span
                                        className="font-heading text-5xl md:text-4xl lg:text-6xl font-bold tracking-tight"
                                        style={plan.highlight ? {
                                            background: 'linear-gradient(135deg, #C8102E, #DF1939, #FF4D6A)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                        } : { color: 'white' }}
                                    >
                                        {plan.price}
                                    </span>
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.15em] mt-1 block text-white/30">
                                    pago único
                                </span>
                            </div>

                            <ul className="space-y-2.5 mb-7 flex-1">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            feature.included
                                                ? plan.highlight ? 'bg-dk-red/20 text-dk-red' : 'bg-white/[0.07] text-white/60'
                                                : 'bg-white/[0.03] text-white/15'
                                        }`}>
                                            {feature.included
                                                ? <Check size={10} strokeWidth={3} />
                                                : <X size={9} strokeWidth={3} />
                                            }
                                        </div>
                                        <span className={`text-sm leading-snug ${
                                            feature.included ? 'text-white/60' : 'text-white/20 line-through'
                                        }`}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleSelectPlan(plan.id)}
                                className={`group w-full font-heading font-semibold text-sm py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.97] ${
                                    plan.highlight
                                        ? 'bg-gradient-to-r from-[#C8102E] to-[#DF1939] text-white hover:from-[#B00E28] hover:to-[#C8102E] shadow-lg shadow-dk-red/25 hover:shadow-dk-red/40'
                                        : 'bg-white/[0.07] text-white border border-white/[0.1] hover:bg-white/[0.12] hover:border-dk-red/30'
                                }`}
                                style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                            >
                                Inscribirme Ahora
                                {plan.highlight
                                    ? <Zap size={14} />
                                    : <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                }
                            </button>
                        </div>
                    ))}
                </div>

                <p className="text-center text-white/25 text-xs mt-6 tracking-wide">
                    * Todos los planes incluyen evaluación inicial gratuita
                </p>
            </div>

            {selectedPlan && (
                <FormularioMatricula
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    programa={selectedPlan}
                    onSuccess={(total) => {
                        console.log('Payment success:', total);
                        setIsFormOpen(false);
                    }}
                />
            )}
        </section>
    );
};
