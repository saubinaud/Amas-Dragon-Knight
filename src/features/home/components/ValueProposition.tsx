import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, Trophy } from 'lucide-react';
import { SectionTitle } from '@/shared/components/ui/SectionTitle';
import { Section } from '@/shared/components/ui/Section';

const PILLARS = [
    {
        icon: Flame,
        title: 'TÉCNICA DE ÉLITE',
        description: 'Entrena como los campeones. Patadas, formas y combate real.',
        gradient: 'from-orange-500 to-red-600',
    },
    {
        icon: Zap,
        title: 'DISCIPLINA MENTAL',
        description: 'Desarrolla enfoque, autocontrol y confianza imparable.',
        gradient: 'from-yellow-500 to-orange-600',
    },
    {
        icon: Trophy,
        title: 'RESULTADOS VISIBLES',
        description: 'Progresa en cinturones, compite, destaca.',
        gradient: 'from-red-500 to-red-700',
    },
] as const;

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' as const },
    }),
};

/**
 * 3-column value proposition section highlighting the core pillars
 */
export const ValueProposition: FC = () => {
    return (
        <Section background="dark" spacing="lg">
            {/* Separator line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dragon-red-500/30 to-transparent" />

            <SectionTitle
                title="NO ES SOLO UN DEPORTE, ES TU TRANSFORMACIÓN"
                subtitle="Tres pilares que definen la experiencia Dragon Knight"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {PILLARS.map((pillar, i) => (
                    <motion.div
                        key={pillar.title}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={cardVariants}
                        className="group relative bg-dragon-gray-900/50 border border-dragon-gray-800 rounded-3xl p-8 text-center hover:border-dragon-red-500/30 transition-all duration-500"
                    >
                        {/* Glow on hover */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-dragon-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Icon */}
                        <div className="relative mb-6 inline-flex">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <pillar.icon size={28} className="text-white" />
                            </div>
                        </div>

                        {/* Text */}
                        <h3 className="relative font-heading text-2xl text-dragon-white tracking-wider mb-3">
                            {pillar.title}
                        </h3>
                        <p className="relative font-body text-dragon-gray-400 leading-relaxed">
                            {pillar.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};
