import { type FC } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, CalendarCheck, Swords } from 'lucide-react';

const STEPS = [
    { icon: ClipboardList, number: '01', title: 'RESERVA', description: 'Llena el formulario (30 segundos)' },
    { icon: CalendarCheck, number: '02', title: 'CONFIRMA', description: 'Te contactamos para agendar' },
    { icon: Swords, number: '03', title: 'ENTRENA', description: 'Vive la experiencia Dragon Knight' },
] as const;

export const ProcessSteps: FC = () => {
    return (
        <section className="py-16 md:py-20 px-4 bg-[#080808] border-y border-white/8">
            <div className="container mx-auto max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/8">
                    {STEPS.map((step, i) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12, duration: 0.4 }}
                            className={`group relative flex flex-col p-8 transition-colors duration-200 hover:bg-white/[0.02] ${i < STEPS.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/8' : ''
                                }`}
                        >
                            {/* Step number */}
                            <span className="font-heading text-5xl font-bold text-white/[0.04] group-hover:text-dk-red/10 transition-colors mb-4 leading-none select-none">
                                {step.number}
                            </span>

                            {/* Icon */}
                            <div className="w-11 h-11 bg-dk-red flex items-center justify-center mb-5 group-hover:shadow-[4px_4px_0px_0px_rgba(232,0,10,0.3)] transition-shadow duration-200">
                                <step.icon size={22} className="text-white" />
                            </div>

                            <h3 className="font-heading text-xl text-white tracking-[0.2em] uppercase font-bold mb-2">
                                {step.title}
                            </h3>
                            <p className="font-body text-gray-500 text-sm uppercase tracking-wider">
                                {step.description}
                            </p>

                            {/* Bottom red line reveal */}
                            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-dk-red group-hover:w-full transition-all duration-500 ease-out" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
