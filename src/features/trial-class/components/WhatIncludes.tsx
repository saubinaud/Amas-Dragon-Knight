import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, UserCheck, ShieldCheck } from 'lucide-react';

const INCLUDES = [
    { icon: Clock, text: '60 minutos de entrenamiento real', number: '01' },
    { icon: UserCheck, text: 'Evaluación personalizada de tu nivel', number: '02' },
    { icon: Users, text: 'Conoce a tus futuros compañeros', number: '03' },
    { icon: ShieldCheck, text: 'Sin costo, sin letra chica', number: '04' },
] as const;

export const WhatIncludes: FC = () => {
    return (
        <section className="py-16 md:py-24 px-4 bg-dk-black">
            <div className="container mx-auto max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="border-2 border-dk-red shadow-[6px_6px_0px_0px_#C8102E]"
                >
                    <div className="px-8 pt-8 pb-2 border-b border-dk-red/30">
                        <p className="text-dk-red font-heading text-xs tracking-[0.4em] uppercase font-bold mb-2">— Lo que recibes —</p>
                        <h2 className="font-heading text-3xl md:text-4xl text-white tracking-tighter uppercase font-bold mb-6 leading-tight">
                            Qué Incluye Tu Clase
                        </h2>
                    </div>
                    <div className="divide-y divide-white/8">
                        {INCLUDES.map((item, i) => (
                            <motion.div
                                key={item.text}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex items-center gap-5 px-8 py-5 hover:bg-white/[0.02] transition-colors"
                            >
                                <span className="font-heading text-xs text-dk-red tracking-widest w-6 shrink-0">{item.number}</span>
                                <div className="w-9 h-9 bg-dk-red/10 border border-dk-red/30 flex items-center justify-center shrink-0 group-hover:bg-dk-red group-hover:border-dk-red transition-all duration-200">
                                    <item.icon size={16} className="text-dk-red group-hover:text-white transition-colors" />
                                </div>
                                <span className="font-body text-gray-400 group-hover:text-white transition-colors text-base uppercase tracking-wider">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
