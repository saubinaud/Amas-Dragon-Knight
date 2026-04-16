import { type FC, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MapPin } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
    {
        question: '¿Desde qué edad pueden entrenar?',
        answer:
            'Aceptamos alumnos desde 1 año de edad. Nuestros programas están adaptados por grupos de edad para garantizar un entrenamiento seguro y efectivo: estimulación temprana (1-3 años), infantil (4-10 años), juvenil (11-14 años), adolescente (15-17 años) y adultos.',
    },
    {
        question: '¿Necesito experiencia previa?',
        answer:
            '¡Para nada! La mayoría de nuestros alumnos comienzan sin ninguna experiencia. Nuestros instructores certificados te guiarán paso a paso desde los fundamentos hasta técnicas avanzadas.',
    },
    {
        question: '¿Dónde están ubicados?',
        answer:
            'Estamos ubicados en Jesús María, Lima, Perú. Contáctanos por WhatsApp para la dirección exacta y coordinar tu visita.',
    },
];

export const FAQ: FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = useCallback((index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    }, []);

    return (
        <section id="faq" className="py-20 sm:py-28 bg-dk-black">
            <div className="max-w-3xl mx-auto px-6">
                {/* Header */}
                <div className="mb-10">
                    <p className="text-dk-red text-xs font-semibold tracking-[0.35em] uppercase font-heading mb-3 flex items-center gap-2.5">
                        <span className="w-5 h-[2px] bg-dk-red rounded-full" />
                        Preguntas frecuentes
                    </p>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Resolvemos tus dudas
                    </h2>
                </div>

                {/* Accordion */}
                <div className="space-y-3">
                    {FAQ_ITEMS.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="rounded-2xl bg-dk-card border border-white/[0.07] overflow-hidden"
                        >
                            <button
                                onClick={() => toggle(i)}
                                className={`w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors duration-200 cursor-pointer ${openIndex === i ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'
                                    }`}
                            >
                                <span className="font-heading text-base font-semibold text-white leading-snug">
                                    {item.question}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${openIndex === i
                                        ? 'bg-dk-red text-white'
                                        : 'bg-white/[0.07] text-white/50'
                                    }`}>
                                    {openIndex === i
                                        ? <Minus size={13} strokeWidth={2.5} />
                                        : <Plus size={13} strokeWidth={2.5} />
                                    }
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 sm:px-6 pb-6 text-white/50 text-sm leading-relaxed">
                                            {item.answer}
                                            {item.question.includes('ubicados') && (
                                                <div className="mt-4 flex items-center gap-2 text-dk-red text-xs font-semibold">
                                                    <MapPin size={13} />
                                                    Jesús María, Lima, Perú
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
