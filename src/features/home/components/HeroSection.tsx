import { type FC, useRef, useMemo } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

import { Button } from '@/shared/components/ui/Button';
import { Badge } from '@/shared/components/ui/Badge';

/**
 * Fullscreen hero with multi-layer parallax effect
 * Optimized particles and cleaner layout
 */
export const HeroSection: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

    // Reduced to 15 particles for better performance
    const particles = useMemo(
        () =>
            Array.from({ length: 15 }, (_, i) => ({
                id: i,
                left: `${Math.random() * 100}%`,
                top: `${40 + Math.random() * 60}%`,
                size: Math.random() * 4 + 2,
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 2,
            })),
        [],
    );

    const scrollToProgram = () => {
        const el = document.getElementById('programa');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            ref={ref}
            className="relative h-screen overflow-hidden bg-dragon-black flex items-center justify-center"
        >
            {/* Animated Background */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dragon-red-600/10 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-dragon-fire-from/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dragon-red-900/5 rounded-full blur-[150px]" />
            </motion.div>

            {/* Fire particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-dragon-red-500/60"
                        style={{
                            left: p.left,
                            top: p.top,
                            width: p.size,
                            height: p.size,
                        }}
                        animate={{
                            y: [0, -60, -120],
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1, 0.3],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: 'easeOut',
                        }}
                    />
                ))}
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Gradient fades */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dragon-black to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dragon-black to-transparent z-10 pointer-events-none" />

            {/* Main content */}
            <motion.div
                style={{ opacity: textOpacity, y: textY }}
                className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <Badge variant="primary" dot>
                        AMAS Federation · Jesús María, Lima
                    </Badge>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-dragon-white leading-none mb-6"
                >
                    DOMINA TU
                    <br />
                    <span className="bg-gradient-to-r from-dragon-fire-from to-dragon-fire-to bg-clip-text text-transparent">
                        POTENCIAL
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="font-body text-lg md:text-xl lg:text-2xl text-dragon-gray-300 max-w-2xl mb-12"
                >
                    Taekwondo de alto rendimiento para jóvenes de 7 a 17 años
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Button size="lg" glow onClick={scrollToProgram}>
                        QUIERO EMPEZAR MI CAMINO
                    </Button>
                    <Button variant="secondary" size="lg" onClick={scrollToProgram}>
                        CONOCE EL PROGRAMA
                    </Button>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-dragon-gray-500 rounded-full flex justify-center pt-2"
                >
                    <div className="w-1 h-2 bg-dragon-red-500 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
};
