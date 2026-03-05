import { type FC } from 'react';
import { motion } from 'framer-motion';

import { Button } from '@/shared/components/ui/Button';
import { Section } from '@/shared/components/ui/Section';

/**
 * Fullscreen CTA section with dramatic gradient and twin buttons
 */
export const FinalCTA: FC = () => {
    const scrollToFAQ = () => {
        const el = document.getElementById('faq');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Section background="gradient" spacing="xl" decorative>
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-dragon-red-900/30 via-dragon-black to-dragon-black pointer-events-none" />

            {/* Animated accent lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-1/4 w-96 h-px bg-gradient-to-r from-transparent via-dragon-red-500/20 to-transparent"
                />
                <motion.div
                    animate={{ x: ['200%', '-100%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="absolute bottom-1/3 w-96 h-px bg-gradient-to-r from-transparent via-dragon-fire-from/20 to-transparent"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-dragon-white mb-6">
                        ¿LISTO PARA
                        <br />
                        <span className="bg-gradient-to-r from-dragon-fire-from to-dragon-fire-to bg-clip-text text-transparent">
                            EL DESAFÍO
                        </span>
                        ?
                    </h2>
                    <p className="font-body text-lg md:text-xl text-dragon-gray-400 max-w-xl mx-auto mb-10">
                        Da el primer paso hacia tu transformación. Inscríbete hoy y comienza tu camino.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            glow
                            className="text-xl px-10 py-5"
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            INSCRIBIRME AHORA
                        </Button>
                        <Button variant="outline" size="lg" onClick={scrollToFAQ}>
                            CONOCE MÁS
                        </Button>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};
