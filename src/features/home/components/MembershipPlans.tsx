import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, ArrowRight, Star } from 'lucide-react';
import { FormularioMatricula } from '@/features/formularios/components/FormularioMatricula';

const plans = [
    {
        id: '1mes',
        name: "Mes a Mes",
        duration: '1 mes',
        price: "300",
        features: [
            '8 Clases (2x semana)',
            'Acceso a instalaciones',
        ],
        highlight: false,
    },
    {
        id: '2meses',
        name: "Programa 2 Meses",
        duration: '2 meses',
        price: "450",
        features: [
            '16 Clases (2x semana)',
            'Acceso a instalaciones',
            'Seguimiento de progreso',
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
            '24 Clases presenciales',
            'Matrícula gratis',
            'Uniforme oficial incluido',
            '1 Graduación + cinturón',
            'Certificado de rango',
            'Cartilla de seguimiento',
            'Clases recuperables',
            '1 Congelamiento incluido',
        ],
        highlight: true,
        tag: "Mejor valor",
    },
];

export const MembershipPlans = () => {
    const [selectedPlan, setSelectedPlan] = useState<'full' | '1mes' | '2meses' | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleSelectPlan = (planId: string) => {
        setSelectedPlan(planId as 'full' | '1mes' | '2meses');
        setIsFormOpen(true);
    };

    return (
        <section id="pricing" className="py-20 sm:py-28 bg-dk-surface/40">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12 sm:mb-14">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-dk-red text-xs font-semibold tracking-[0.35em] uppercase font-heading mb-3 flex items-center gap-2.5"
                    >
                        <span className="w-5 h-[2px] bg-dk-red rounded-full" />
                        Inversión en tu Futuro
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
                    >
                        Elige tu{' '}
                        <span className="text-white/30">plan</span>
                    </motion.h2>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative flex flex-col rounded-2xl p-6 sm:p-7 border transition-all duration-300 ${plan.highlight
                                    ? 'bg-dk-red border-dk-red shadow-2xl shadow-dk-red/20 scale-[1.02]'
                                    : 'bg-dk-card border-white/[0.07] hover:border-white/[0.14] hover:bg-dk-card/80'
                                }`}
                        >
                            {/* Popular badge */}
                            {plan.highlight && (
                                <div className="absolute -top-3.5 left-6 bg-white text-dk-red text-[10px] font-bold font-heading tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                    <Star size={9} fill="currentColor" />
                                    {plan.tag}
                                </div>
                            )}

                            {/* Duration & Name */}
                            <div className="mb-5">
                                <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${plan.highlight ? 'text-white/60' : 'text-white/30'}`}>
                                    {plan.duration}
                                </span>
                                <h3 className="font-heading text-xl font-bold text-white mt-1 tracking-tight">
                                    {plan.name}
                                </h3>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                {plan.originalPrice && (
                                    <span className={`text-xs line-through mb-1 block ${plan.highlight ? 'text-white/40' : 'text-white/25'}`}>
                                        S/ {plan.originalPrice}
                                    </span>
                                )}
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-sm font-medium ${plan.highlight ? 'text-white/60' : 'text-white/40'}`}>S/</span>
                                    <span className="font-heading text-5xl sm:text-6xl font-bold text-white tracking-tight">
                                        {plan.price}
                                    </span>
                                </div>
                                <span className={`text-[10px] uppercase tracking-[0.15em] mt-1 block ${plan.highlight ? 'text-white/50' : 'text-white/30'}`}>
                                    pago único
                                </span>
                            </div>

                            {/* Features */}
                            <ul className="space-y-2.5 mb-7 flex-1">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? 'bg-white/20' : 'bg-white/[0.07]'
                                            }`}>
                                            <Check size={10} className="text-white" strokeWidth={3} />
                                        </div>
                                        <span className={`text-sm leading-snug ${plan.highlight ? 'text-white/85' : 'text-white/55'}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <button
                                onClick={() => handleSelectPlan(plan.id)}
                                className={`group w-full font-heading font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97] ${plan.highlight
                                        ? 'bg-white text-dk-red hover:bg-white/95 shadow-lg shadow-black/20'
                                        : 'bg-white/[0.07] text-white border border-white/[0.1] hover:bg-white/[0.12]'
                                    }`}
                            >
                                Inscribirme Ahora
                                {plan.highlight
                                    ? <Zap size={14} />
                                    : <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                }
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Footer note */}
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
