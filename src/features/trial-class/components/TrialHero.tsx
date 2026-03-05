import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/shared/components/ui/Button';

export const TrialHero: FC = () => {
    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 bg-dk-black overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />
            {/* Red glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-dk-red/[0.06] rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 container mx-auto max-w-4xl">
                {/* Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3 mb-6"
                >
                    <span className="block w-8 h-[2px] bg-dk-red" />
                    <span className="font-heading text-xs text-dk-red tracking-[0.4em] uppercase font-bold">
                        100% Gratuita · Sin Compromiso
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] text-white leading-[0.85] font-bold uppercase tracking-tighter mb-6"
                >
                    Clase de<br />
                    Prueba{' '}
                    <span className="text-transparent [-webkit-text-stroke:3px_#E8000A]">GRATIS</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-body text-base md:text-lg text-gray-500 max-w-xl mb-10 uppercase tracking-[0.15em] border-l-4 border-dk-red pl-4"
                >
                    Experimenta el entrenamiento Dragon Knight sin costo. Reserva tu lugar ahora.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <a href="#formulario">
                        <Button size="lg" className="text-base px-12 py-6 tracking-[0.2em]">
                            RESERVAR MI LUGAR
                        </Button>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
