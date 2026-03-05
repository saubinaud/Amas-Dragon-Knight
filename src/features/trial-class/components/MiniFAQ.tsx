import { type FC, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Section } from '@/shared/components/ui/Section';

const FAQ_ITEMS = [
    { question: '¿Es realmente gratis?', answer: 'Sí, 100% gratis y sin compromiso. Queremos que conozcas la experiencia Dragon Knight antes de tomar cualquier decisión.' },
    { question: '¿Qué necesito llevar?', answer: 'Solo ropa deportiva cómoda y una botella de agua. Nosotros proporcionamos todo el equipo necesario para la clase.' },
    { question: '¿Puedo acompañar a mi hijo/a?', answer: 'Por supuesto. Los padres son bienvenidos a observar toda la clase. Tenemos un área cómoda de espera.' },
];

export const MiniFAQ: FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const toggle = useCallback((i: number) => setOpenIndex(prev => prev === i ? null : i), []);

    return (
        <Section background="dark" spacing="md">
            <div className="max-w-2xl mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl text-dk-white tracking-wider text-center mb-8">DUDAS FRECUENTES</h2>
                <div className="space-y-2">
                    {FAQ_ITEMS.map((item, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                            <button onClick={() => toggle(i)}
                                className={`w-full flex items-center justify-between gap-4 bg-dk-gray-900/50 border rounded-sm p-4 text-left transition-all duration-300 cursor-pointer ${openIndex === i ? 'border-dk-red/30' : 'border-dk-gray-800 hover:border-dk-red/20'}`}>
                                <span className="font-body text-dk-white font-medium">{item.question}</span>
                                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                    <ChevronDown size={18} className={`shrink-0 transition-colors ${openIndex === i ? 'text-dk-red' : 'text-dk-gray-600'}`} />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                        <p className="px-4 py-3 text-dk-gray-400 font-body text-sm leading-relaxed">{item.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
