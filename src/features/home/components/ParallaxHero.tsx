import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/shared/components/ui/Button';
import { DragonLogo } from '@/shared/components/ui/DragonLogo';
import { ChevronDown } from 'lucide-react';

export const ParallaxHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax transforms - smoothed
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

    // Layer 1: Background (Slowest)
    const yBg = useSpring(useTransform(scrollY, [0, 1000], [0, 200]), springConfig);

    // Layer 2: Silhouette (Medium)
    const ySilhouette = useSpring(useTransform(scrollY, [0, 1000], [0, 100]), springConfig);

    // Layer 3: Logo (Faster)
    const yLogo = useSpring(useTransform(scrollY, [0, 1000], [0, -50]), springConfig);
    const opacityLogo = useTransform(scrollY, [0, 300], [1, 0]);
    const scaleLogo = useTransform(scrollY, [0, 300], [1, 1.2]);

    // Layer 4: Text Content (Fastest fade out)
    const yText = useSpring(useTransform(scrollY, [0, 400], [0, 200]), springConfig);
    const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

    const scrollToPricing = () => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div
            ref={containerRef}
            className="relative h-[100dvh] w-full overflow-hidden bg-dk-black flex items-center justify-center isolate"
        >
            {/* LAYER 0: Noise Overlay (Global) - handled by global CSS .bg-noise on body/sections, 
          but adding specific intensity here if needed */}
            <div className="absolute inset-0 bg-noise z-[1] opacity-50 mix-blend-overlay pointer-events-none" />

            {/* LAYER 1: Background Grid & Gradient */}
            <motion.div
                style={{ y: yBg }}
                className="absolute inset-0 z-[0]"
            >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-dk-red rounded-full blur-[150px] opacity-10 animate-pulse-slow" />
            </motion.div>

            {/* LAYER 2: Fighter Silhouette (Placeholder for now, using gradient shape representation if image missing) */}
            <motion.div
                style={{ y: ySilhouette }}
                className="absolute inset-0 z-[2] flex items-end justify-center pointer-events-none"
            >
                {/* Background Image Placeholder - User to replace src */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/placeholder-hero.jpg"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                </div>
                <div className="w-full h-[60%] bg-gradient-to-t from-black via-black/50 to-transparent relative z-10" />
            </motion.div>

            {/* LAYER 3: Huge Dragon Logo Background */}
            <motion.div
                style={{ y: yLogo, opacity: opacityLogo, scale: scaleLogo }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] opacity-10 pointer-events-none mix-blend-screen"
            >
                <DragonLogo size={600} variant="white" className="opacity-5 blur-sm" />
            </motion.div>

            {/* LAYER 4: Main Content */}
            <motion.div
                style={{ y: yText, opacity: opacityText }}
                className="relative z-[10] text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-6 sm:gap-8"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-dk-red blur-[40px] opacity-20 rounded-full" />
                    <DragonLogo size={120} variant="white" className="relative drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                </motion.div>

                <div className="space-y-2 sm:space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-dk-red font-heading font-bold tracking-[0.4em] text-sm sm:text-base md:text-lg uppercase"
                    >
                        [ Academia de Alto Rendimiento ]
                    </motion.h2>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-heading font-bold uppercase tracking-tighter leading-[0.8] text-white mix-blend-difference"
                    >
                        Dragon <br className="sm:hidden" />
                        <span className="text-transparent [-webkit-text-stroke:2px_white] hover:[-webkit-text-stroke:2px_#FF0000] transition-all duration-300 drop-shadow-[4px_4px_0_#FF0000]">
                            Knight
                        </span>
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-gray-400 text-lg sm:text-xl md:text-2xl font-body uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed border-l-4 border-dk-red pl-4 text-left"
                >
                    Forjando carácter, disciplina y <span className="text-white font-bold">poder</span> a través del Taekwondo.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-6 sm:gap-8 pt-6 sm:pt-10"
                >
                    <Button
                        size="lg"
                        onClick={scrollToPricing}
                        className="text-xl px-12 py-6 bg-dk-white text-dk-black border-2 border-dk-white shadow-[6px_6px_0px_0px_#FF0000] hover:shadow-[0px_0px_0px_0px_#FF0000] hover:translate-x-[6px] hover:translate-y-[6px]"
                    >
                        INSCRIBIRME AHORA
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="text-xl px-12 py-6 border-dk-white border-2"
                        onClick={() => {
                            document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        CONOCER MÁS
                    </Button>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-2 text-white/50"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] font-heading">Scroll Down</span>
                <ChevronDown className="w-6 h-6 animate-bounce" />
            </motion.div>

            {/* Hero Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dk-black to-transparent z-[5]" />
        </div>
    );
};
