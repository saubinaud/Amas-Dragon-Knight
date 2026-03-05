import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

import { Button } from '@/shared/components/ui/Button';
import { Badge } from '@/shared/components/ui/Badge';
import { Section } from '@/shared/components/ui/Section';
import { Card } from '@/shared/components/ui/Card';

const BENEFITS = [
    'Clases 3 veces por semana',
    'Entrenamiento técnico personalizado',
    'Evaluaciones mensuales de progreso',
    'Acceso a torneos internos',
    'Comunidad de jóvenes líderes',
] as const;

/**
 * Highlighted program card with fire gradient border and benefits list
 */
export const ProgramCard: FC = () => {
    return (
        <Section id="programa" background="gradient" spacing="lg" decorative>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                >
                    <Card variant="gradient-border" padding="lg">
                        <div className="flex flex-col lg:flex-row gap-10 items-center">
                            {/* Left: Info */}
                            <div className="flex-1">
                                <Badge variant="fire">MÁS POPULAR</Badge>

                                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-dragon-white tracking-wide mb-6">
                                    PROGRAMA
                                    <br />
                                    <span className="bg-gradient-to-r from-dragon-fire-from to-dragon-fire-to bg-clip-text text-transparent">
                                        DRAGON KNIGHT
                                    </span>
                                    <br />
                                    BÁSICO
                                </h2>

                                <ul className="space-y-4 mb-8">
                                    {BENEFITS.map((benefit, i) => (
                                        <motion.li
                                            key={benefit}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-dragon-fire-from to-dragon-fire-to flex items-center justify-center shrink-0">
                                                <Check size={14} className="text-white" />
                                            </div>
                                            <span className="font-body text-dragon-gray-300">
                                                {benefit}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <Button
                                    size="lg"
                                    glow
                                    className="w-full sm:w-auto"
                                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    QUIERO ENTRENAR AQUÍ
                                </Button>
                            </div>

                            {/* Right: Decorative */}
                            <div className="flex-1 flex items-center justify-center">
                                <div className="relative w-64 h-64 md:w-80 md:h-80">
                                    {/* Outer ring */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        className="absolute inset-0 rounded-full border-2 border-dashed border-dragon-red-500/20"
                                    />
                                    {/* Inner ring */}
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                                        className="absolute inset-6 rounded-full border border-dragon-fire-from/30"
                                    />
                                    {/* Center content */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <span className="font-heading text-7xl md:text-8xl bg-gradient-to-b from-dragon-fire-from to-dragon-fire-to bg-clip-text text-transparent">
                                                DK
                                            </span>
                                            <p className="font-body text-dragon-gray-400 text-xs uppercase tracking-[0.25em] mt-2">
                                                Básico
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </Section>
    );
};
