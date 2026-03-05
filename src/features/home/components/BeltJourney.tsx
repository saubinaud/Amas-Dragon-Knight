import { type FC } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/shared/components/ui/SectionTitle';
import { Section } from '@/shared/components/ui/Section';

const BELT_MILESTONES = [
    {
        belt: 'Blanco',
        color: '#E0E0E0',
        bg: '#1A1A1A',
        title: 'El Comienzo',
        description: 'Fundamentos, respeto y primeras técnicas básicas.',
        age: '7+ años',
        index: '01',
    },
    {
        belt: 'Amarillo',
        color: '#FACC15',
        bg: '#1A1800',
        title: 'Despertar',
        description: 'Dominas patadas básicas y tu primera forma (Poomsae).',
        age: '~6 meses',
        index: '02',
    },
    {
        belt: 'Verde',
        color: '#4ADE80',
        bg: '#021A08',
        title: 'Crecimiento',
        description: 'Combate controlado y técnicas intermedias.',
        age: '~1 año',
        index: '03',
    },
    {
        belt: 'Azul',
        color: '#60A5FA',
        bg: '#001020',
        title: 'Confianza',
        description: 'Técnicas avanzadas y primeras competencias.',
        age: '~2 años',
        index: '04',
    },
    {
        belt: 'Rojo',
        color: '#E8000A',
        bg: '#1A0000',
        title: 'Poder',
        description: 'Dominio técnico y preparación para liderazgo.',
        age: '~3 años',
        index: '05',
    },
    {
        belt: 'Negro',
        color: '#E8000A',
        bg: '#0A0A0A',
        title: 'Maestría',
        description: 'Excelencia técnica, liderazgo y espíritu de campeón.',
        age: '~4-5 años',
        index: '06',
    },
] as const;

/**
 * Belt Journey — brutalist horizontal numbered steps
 */
export const BeltJourney: FC = () => {
    return (
        <Section background="dark" spacing="lg">
            <div className="max-w-6xl mx-auto">
                <SectionTitle
                    title="TU CAMINO AL CINTURÓN NEGRO"
                    subtitle="7 años de edad, infinitas posibilidades"
                />

                {/* Desktop: horizontal row of milestone cards */}
                <div className="hidden md:grid grid-cols-6 gap-0 border border-white/8">
                    {BELT_MILESTONES.map((milestone, i) => (
                        <motion.div
                            key={milestone.belt}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className={`group relative flex flex-col p-5 overflow-hidden transition-all duration-300 hover:bg-white/[0.03] ${i < BELT_MILESTONES.length - 1 ? 'border-r border-white/8' : ''
                                }`}
                        >
                            {/* Belt color accent top bar */}
                            <div
                                className="h-[3px] w-full mb-4 transition-all duration-300 group-hover:h-[5px]"
                                style={{ backgroundColor: milestone.color }}
                            />
                            <span className="font-heading text-xs tracking-widest text-gray-700 mb-1">{milestone.index}</span>
                            <h3
                                className="font-heading text-base font-bold uppercase tracking-wider mb-2 transition-colors duration-200"
                                style={{ color: milestone.color }}
                            >
                                {milestone.belt}
                            </h3>
                            <p className="font-heading text-sm text-white uppercase tracking-wide mb-1 leading-tight font-bold">
                                {milestone.title}
                            </p>
                            <p className="font-body text-gray-600 text-xs leading-relaxed flex-1">
                                {milestone.description}
                            </p>
                            <span className="font-heading text-[10px] tracking-widest text-gray-700 uppercase mt-3">
                                {milestone.age}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile: vertical numbered list */}
                <div className="md:hidden space-y-0 border border-white/8">
                    {BELT_MILESTONES.map((milestone, i) => (
                        <motion.div
                            key={milestone.belt}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                            className={`flex items-start gap-4 p-5 ${i < BELT_MILESTONES.length - 1 ? 'border-b border-white/8' : ''}`}
                        >
                            <div
                                className="w-1 self-stretch min-h-[60px] shrink-0"
                                style={{ backgroundColor: milestone.color }}
                            />
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-heading text-[10px] text-gray-700 tracking-widest">{milestone.index}</span>
                                    <span className="font-heading text-sm font-bold uppercase tracking-wider" style={{ color: milestone.color }}>
                                        {milestone.belt}
                                    </span>
                                </div>
                                <h3 className="font-heading text-base text-white uppercase font-bold mb-0.5">{milestone.title}</h3>
                                <p className="font-body text-gray-500 text-sm">{milestone.description}</p>
                                <span className="font-heading text-[10px] text-gray-700 uppercase tracking-wider">{milestone.age}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
