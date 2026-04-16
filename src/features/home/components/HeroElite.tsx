import { ChevronDown } from 'lucide-react';

/**
 * Hero section — lightweight (pure CSS animations, no framer-motion)
 */
export const HeroElite = () => {
    return (
        <div
            className="relative min-h-[640px] h-[100dvh] w-full overflow-hidden flex items-center isolate"
            style={{ background: 'linear-gradient(to bottom right, #000000, #0a0a0c, #000000)' }}
        >
            {/* Layered radial glows */}
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

            {/* Hero image — contained on the right, lazy loaded, optimized */}
            <div className="absolute inset-y-0 right-0 w-full md:w-[55%] lg:w-[50%] z-0 pointer-events-none">
                <img
                    src="https://res.cloudinary.com/dkoocok3j/image/upload/f_auto,q_auto,w_600/dragon-knight/hero-bw.png"
                    srcSet="
                        https://res.cloudinary.com/dkoocok3j/image/upload/f_auto,q_auto,w_400/dragon-knight/hero-bw.png 400w,
                        https://res.cloudinary.com/dkoocok3j/image/upload/f_auto,q_auto,w_600/dragon-knight/hero-bw.png 600w,
                        https://res.cloudinary.com/dkoocok3j/image/upload/f_auto,q_auto,w_900/dragon-knight/hero-bw.png 900w
                    "
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt=""
                    className="w-full h-full object-contain object-right opacity-30"
                    loading="lazy"
                    decoding="async"
                />
            </div>
            {/* Gradient overlays (on top of image) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40 z-[1] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-[1] pointer-events-none" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-start px-6 sm:px-10 md:px-12 lg:px-24 max-w-5xl w-full">
                {/* Badge pill */}
                <div className="hero-in-1 inline-flex items-center gap-2 bg-dk-red/10 border border-dk-red/25 rounded-full px-5 py-2.5 mb-7">
                    <span className="text-[10px] sm:text-xs">🥋</span>
                    <span className="text-dk-red-light text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-heading">
                        Transformación Personal de Élite
                    </span>
                </div>

                {/* Main headline */}
                <h1 className="hero-in-2 font-heading text-4xl sm:text-5xl md:text-[3.5rem] lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.0] tracking-tight mb-6">
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
                </h1>

                {/* Subtext */}
                <p className="hero-in-3 text-white/60 text-base sm:text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
                    Más que un arte marcial. Un camino de disciplina, respeto y fortaleza mental para la próxima generación de líderes.
                </p>

                {/* CTAs */}
                <div className="hero-in-4 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
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
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="hero-in-4 absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-heading">Scroll</span>
                <ChevronDown size={16} className="text-white/30 animate-bounce" />
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#1A1A1D] to-transparent z-[5]" />
        </div>
    );
};
