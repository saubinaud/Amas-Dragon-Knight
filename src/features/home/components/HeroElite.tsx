import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const HeroElite = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    const yText = useTransform(scrollY, [0, 500], [0, 120]);
    const opacityText = useTransform(scrollY, [0, 350], [1, 0]);

    return (
        <div
            ref={containerRef}
            className="relative min-h-[640px] h-[100dvh] w-full overflow-hidden flex items-center isolate"
            style={{
                background: 'linear-gradient(to bottom right, #000000, #0a0a0c, #000000)',
            }}
        >
            {/* Layered radial glows (AMAS style) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(circle at 20% 50%, rgba(200, 16, 46, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 50%, rgba(223, 25, 57, 0.10) 0%, transparent 60%)
                    `,
                }}
            />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(200, 16, 46, 0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(200, 16, 46, 0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    opacity: 0.03,
                }}
            />

            {/* Hero image (right side, subtle) */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/taekwondo-hero.png"
                    alt="Taekwondo"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
            </div>

            {/* Main Content */}
            <motion.div
                style={{ y: yText, opacity: opacityText }}
                className="relative z-10 flex flex-col items-start px-6 sm:px-10 md:px-12 lg:px-24 max-w-5xl w-full"
            >
                {/* Badge pill (AMAS style) */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="inline-flex items-center gap-2 bg-dk-red/10 border border-dk-red/25 rounded-full px-5 py-2.5 mb-7"
                >
                    <span className="text-[10px] sm:text-xs">🥋</span>
                    <span className="text-dk-red-light text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-heading">
                        Transformación Personal de Élite
                    </span>
                </motion.div>

                {/* Main headline with gradient text */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="font-heading text-4xl sm:text-5xl md:text-[3.5rem] lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.0] tracking-tight mb-6"
                >
                    <span
                        className="block"
                        style={{
                            background: 'linear-gradient(to right, #fef2f2, #ffffff, #fef2f2)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        De Potencial
                    </span>
                    <span
                        style={{
                            background: 'linear-gradient(135deg, #C8102E 0%, #DF1939 25%, #FF4D6A 50%, #DF1939 75%, #C8102E 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        a Poder
                    </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.48, duration: 0.6 }}
                    className="text-white/60 text-base sm:text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
                >
                    Más que un arte marcial. Un camino de disciplina, respeto y fortaleza mental para la próxima generación de líderes.
                </motion.p>

                {/* CTAs (AMAS style — gradient buttons) */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
                >
                    <button
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-gradient-to-r from-[#C8102E] to-[#DF1939] hover:from-[#B00E28] hover:to-[#C8102E] text-white font-heading font-bold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-xl shadow-2xl shadow-[#C8102E]/30 hover:shadow-[#C8102E]/50 active:scale-95 transition-all duration-300"
                        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                    >
                        Empieza Tu Viaje
                    </button>
                    <button
                        onClick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-transparent border border-[#C8102E]/30 text-white font-heading font-semibold text-base px-8 py-4 rounded-xl hover:bg-[#C8102E]/10 hover:border-[#C8102E]/50 active:scale-95 transition-all duration-300"
                        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                    >
                        Nuestra Filosofía
                    </button>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            >
                <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-heading">Scroll</span>
                <ChevronDown size={16} className="text-white/30 animate-bounce" />
            </motion.div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#1A1A1D] to-transparent z-[5]" />
        </div>
    );
};
