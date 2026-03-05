import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { SectionTitle } from '@/shared/components/ui/SectionTitle';
import { Section } from '@/shared/components/ui/Section';

interface Instructor {
    name: string;
    credentials: string;
    initials: string;
    dan: string;
}

const INSTRUCTORS: Instructor[] = [
    {
        name: 'Maestro Carlos',
        credentials: 'Campeón Nacional · 20 años de experiencia',
        initials: 'MC',
        dan: '5° Dan',
    },
    {
        name: 'Instructora Ana',
        credentials: 'Especialista en formación juvenil · Árbitro Internacional',
        initials: 'IA',
        dan: '3° Dan',
    },
];

/**
 * Instructors — brutalist card grid
 */
export const Instructors: FC = () => {
    return (
        <Section id="instructores" background="dark" spacing="lg">
            <div className="max-w-4xl mx-auto">
                <SectionTitle
                    title="TUS INSTRUCTORES"
                    subtitle="Maestros certificados con pasión por formar campeones"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/8">
                    {INSTRUCTORS.map((instructor, i) => (
                        <motion.div
                            key={instructor.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className={`group relative overflow-hidden bg-[#080808] hover:bg-[#0D0D0D] transition-colors duration-300 ${i < INSTRUCTORS.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/8' : ''
                                }`}
                        >
                            {/* Photo / Initials placeholder */}
                            <div className="relative h-64 md:h-72 overflow-hidden bg-[#0A0A0A] flex items-center justify-center">
                                {/* Background pattern */}
                                <div className="absolute inset-0 bg-grid opacity-50" />

                                {/* Initials */}
                                <span className="font-heading text-[6rem] font-bold text-white/[0.06] group-hover:text-white/[0.10] transition-colors duration-500 select-none z-10">
                                    {instructor.initials}
                                </span>

                                {/* Hover red overlay bottom fade */}
                                <div className="absolute inset-0 bg-gradient-to-t from-dk-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Dan badge */}
                                <div className="absolute top-4 left-4 bg-dk-red px-3 py-1.5 font-heading text-xs text-white tracking-widest uppercase font-bold">
                                    {instructor.dan}
                                </div>

                                {/* Award icon */}
                                <div className="absolute top-4 right-4 w-9 h-9 border border-white/10 flex items-center justify-center group-hover:border-dk-red group-hover:bg-dk-red transition-all duration-300">
                                    <Award size={16} className="text-gray-500 group-hover:text-white transition-colors" />
                                </div>

                                {/* Bottom red line reveal */}
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-dk-red group-hover:w-full transition-all duration-500 ease-out z-20" />
                            </div>

                            {/* Info */}
                            <div className="p-7">
                                <h3 className="font-heading text-2xl text-white tracking-wider uppercase font-bold mb-1">
                                    {instructor.name}
                                </h3>
                                <p className="font-body text-gray-500 text-sm uppercase tracking-wider leading-relaxed">
                                    {instructor.credentials}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
