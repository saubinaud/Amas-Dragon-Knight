import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/shared/components/ui/Button';

export const HeroElite = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    const yText = useTransform(scrollY, [0, 500], [0, 120]);
    const opacityText = useTransform(scrollY, [0, 350], [1, 0]);

    return (
        <div
            ref={containerRef}
            className="relative min-h-[640px] h-[90dvh] w-full overflow-hidden bg-dk-black flex items-center isolate"
        >
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/placeholder-hero-elite.jpg"
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-25"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-dk-black via-dk-black/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-dk-black via-transparent to-black/20" />
            </div>

            {/* Red accent glow — very subtle */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-dk-red/[0.06] rounded-full blur-[120px] pointer-events-none z-[1]" />

            {/* Main Content */}
            <motion.div
                style={{ y: yText, opacity: opacityText }}
                className="relative z-10 flex flex-col items-start px-6 sm:px-10 md:px-16 lg:px-24 max-w-5xl"
            >
                {/* Small label */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="flex items-center gap-2.5 mb-6"
                >
                    <span className="w-5 h-[2px] bg-dk-red rounded-full" />
                    <span className="text-dk-red text-xs font-semibold tracking-[0.3em] uppercase font-heading">
                        Transformación Personal de Élite
                    </span>
                </motion.div>

                {/* Main headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="font-heading text-[3rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.0] tracking-tight mb-6"
                >
                    De Potencial<br />
                    <span className="text-dk-red">a Poder</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.48, duration: 0.6 }}
                    className="text-white/55 text-base sm:text-lg max-w-md mb-10 leading-relaxed"
                >
                    Más que un arte marcial. Un camino de disciplina, respeto y fortaleza mental para la próxima generación de líderes.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3"
                >
                    <Button
                        size="lg"
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-base font-semibold"
                    >
                        Empieza Tu Viaje
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-base font-semibold"
                    >
                        Nuestra Filosofía
                    </Button>
                </motion.div>
            </motion.div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-dk-black to-transparent z-[5]" />
        </div>
    );
};
