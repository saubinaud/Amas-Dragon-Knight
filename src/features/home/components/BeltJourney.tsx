import { type FC } from 'react';
import { motion } from 'framer-motion';

const BELT_MILESTONES = [
    {
        belt: 'Blanco',
        color: '#E0E0E0',
        title: 'El Comienzo',
        description: 'Fundamentos, respeto y primeras técnicas básicas.',
        age: '7+ años',
        index: '01',
    },
    {
        belt: 'Amarillo',
        color: '#FACC15',
        title: 'Despertar',
        description: 'Dominas patadas básicas y tu primera forma (Poomsae).',
        age: '~6 meses',
        index: '02',
    },
    {
        belt: 'Verde',
        color: '#4ADE80',
        title: 'Crecimiento',
        description: 'Combate controlado y técnicas intermedias.',
        age: '~1 año',
        index: '03',
    },
    {
        belt: 'Azul',
        color: '#60A5FA',
        title: 'Confianza',
        description: 'Técnicas avanzadas y primeras competencias.',
        age: '~2 años',
        index: '04',
    },
    {
        belt: 'Rojo',
        color: '#C8102E',
        title: 'Poder',
        description: 'Dominio técnico y preparación para liderazgo.',
        age: '~3 años',
        index: '05',
    },
    {
        belt: 'Negro',
        color: '#C8102E',
        title: 'Maestría',
        description: 'Excelencia técnica, liderazgo y espíritu de campeón.',
        age: '~4-5 años',
        index: '06',
    },
] as const;

export const BeltJourney: FC = () => {
    return (
        <section className="py-20 sm:py-28 bg-dk-black relative overflow-hidden">
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid-red pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header (AMAS style) */}
                <div className="text-center mb-12 sm:mb-14">
                    <div className="inline-flex items-center gap-2 bg-dk-red/10 border border-dk-red/20 rounded-full px-5 py-2 mb-5">
                        <span className="text-[10px]">🥋</span>
                        <span className="text-dk-red-light text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-heading">
                            Tu Camino
                        </span>
                    </div>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                        <span className="text-gradient-light">El camino al</span>{' '}
                        <span className="text-gradient-red">Cinturón Negro</span>
                    </h2>
                    <p className="text-white/40 text-sm sm:text-base mt-3 max-w-md mx-auto">
                        7 años de edad, infinitas posibilidades
                    </p>
                </div>

                {/* Desktop/Tablet: 3 cols on iPad portrait, 6 cols on lg+ */}
                <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-0 rounded-2xl border border-white/[0.07] overflow-hidden">
                    {BELT_MILESTONES.map((milestone, i) => (
                        <motion.div
                            key={milestone.belt}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className={`group relative flex flex-col p-5 overflow-hidden transition-all duration-300 hover:bg-white/[0.03] bg-gradient-to-b from-dk-card/50 to-dk-black
                                ${(i + 1) % 3 !== 0 ? 'md:border-r md:border-white/[0.07]' : ''}
                                ${i < 3 ? 'md:border-b md:border-white/[0.07] lg:border-b-0' : ''}
                                ${i < BELT_MILESTONES.length - 1 ? 'lg:!border-r lg:!border-white/[0.07]' : 'lg:!border-r-0'}
                            `}
                        >
                            {/* Belt color accent top bar */}
                            <div
                                className="h-[3px] w-full mb-4 rounded-full transition-all duration-300 group-hover:h-[5px] group-hover:shadow-lg"
                                style={{
                                    backgroundColor: milestone.color,
                                    boxShadow: `0 0 12px ${milestone.color}33`,
                                }}
                            />
                            <span className="font-heading text-xs tracking-widest text-white/20 mb-1">{milestone.index}</span>
                            <h3
                                className="font-heading text-base font-bold uppercase tracking-wider mb-2 transition-colors duration-200"
                                style={{ color: milestone.color }}
                            >
                                {milestone.belt}
                            </h3>
                            <p className="font-heading text-sm text-white uppercase tracking-wide mb-1 leading-tight font-bold">
                                {milestone.title}
                            </p>
                            <p className="font-body text-white/30 text-xs leading-relaxed flex-1">
                                {milestone.description}
                            </p>
                            <span className="font-heading text-[10px] tracking-widest text-white/20 uppercase mt-3">
                                {milestone.age}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile: vertical list */}
                <div className="md:hidden space-y-0 rounded-2xl border border-white/[0.07] overflow-hidden">
                    {BELT_MILESTONES.map((milestone, i) => (
                        <motion.div
                            key={milestone.belt}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                            className={`flex items-start gap-4 p-5 bg-gradient-to-r from-dk-card/30 to-transparent ${
                                i < BELT_MILESTONES.length - 1 ? 'border-b border-white/[0.07]' : ''
                            }`}
                        >
                            <div
                                className="w-1 self-stretch min-h-[60px] shrink-0 rounded-full"
                                style={{
                                    backgroundColor: milestone.color,
                                    boxShadow: `0 0 8px ${milestone.color}44`,
                                }}
                            />
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-heading text-[10px] text-white/20 tracking-widest">{milestone.index}</span>
                                    <span className="font-heading text-sm font-bold uppercase tracking-wider" style={{ color: milestone.color }}>
                                        {milestone.belt}
                                    </span>
                                </div>
                                <h3 className="font-heading text-base text-white uppercase font-bold mb-0.5">{milestone.title}</h3>
                                <p className="font-body text-white/35 text-sm">{milestone.description}</p>
                                <span className="font-heading text-[10px] text-white/20 uppercase tracking-wider">{milestone.age}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
