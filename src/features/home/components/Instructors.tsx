import { type FC } from 'react';
import { Award } from 'lucide-react';
import { useReveal } from '@/shared/hooks/useReveal';

interface Instructor {
    name: string;
    credentials: string;
    initials: string;
    dan: string;
}

const INSTRUCTORS: Instructor[] = [
    {
        name: 'Alexander Zea',
        credentials: 'Maestro Fundador · Décadas formando campeones',
        initials: 'AZ',
        dan: '5° Dan',
    },
    {
        name: 'Rosmery Espinoza',
        credentials: 'Instructora · Especialista en formación integral',
        initials: 'RE',
        dan: '1° Dan',
    },
];

export const Instructors: FC = () => {
    const ref = useReveal<HTMLDivElement>({ children: true });

    return (
        <section id="instructores" className="py-20 sm:py-28 bg-dk-black relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-dk-red/[0.04] rounded-full blur-[150px] pointer-events-none" />

            <div ref={ref} className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-12 sm:mb-14">
                    <div className="reveal inline-flex items-center gap-2 bg-dk-red/10 border border-dk-red/20 rounded-full px-5 py-2 mb-5">
                        <Award size={10} className="text-dk-red" />
                        <span className="text-dk-red-light text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-heading">
                            Tus Instructores
                        </span>
                    </div>
                    <h2 className="reveal reveal-delay-1 font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                        <span className="text-gradient-light">Maestros con</span>{' '}
                        <span className="text-gradient-red">pasión</span>
                    </h2>
                    <p className="reveal reveal-delay-2 text-white/40 text-sm sm:text-base mt-3 max-w-md mx-auto">
                        Certificados con décadas de experiencia formando campeones
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    {INSTRUCTORS.map((instructor, i) => (
                        <div
                            key={instructor.name}
                            className={`reveal reveal-delay-${i + 3} group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#222225] via-[#222225]/95 to-[#1A1A1D] border border-white/[0.07] hover:border-dk-red/25 transition-colors duration-300 card-glow`}
                        >
                            <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden flex items-center justify-center">
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        backgroundImage: `
                                            linear-gradient(rgba(200, 16, 46, 0.3) 1px, transparent 1px),
                                            linear-gradient(90deg, rgba(200, 16, 46, 0.3) 1px, transparent 1px)
                                        `,
                                        backgroundSize: '40px 40px',
                                        opacity: 0.04,
                                    }}
                                />

                                <span className="font-heading text-[5rem] sm:text-[6rem] font-bold text-white/[0.06] group-hover:text-white/[0.10] transition-colors duration-500 select-none z-10">
                                    {instructor.initials}
                                </span>

                                <div className="absolute inset-0 bg-gradient-to-t from-dk-red/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#C8102E] to-[#DF1939] px-3.5 py-1.5 rounded-lg font-heading text-[10px] sm:text-xs text-white tracking-widest uppercase font-bold shadow-lg shadow-dk-red/20">
                                    {instructor.dan}
                                </div>

                                <div className="absolute top-4 right-4 w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center group-hover:border-dk-red group-hover:bg-dk-red/20 transition-all duration-300">
                                    <Award size={16} className="text-white/30 group-hover:text-dk-red transition-colors" />
                                </div>

                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-dk-red to-dk-red-light group-hover:w-full transition-all duration-500 ease-out z-20" />
                            </div>

                            <div className="p-6 sm:p-7">
                                <h3 className="font-heading text-xl sm:text-2xl text-white tracking-tight font-bold mb-1.5">
                                    {instructor.name}
                                </h3>
                                <p className="text-white/40 text-xs sm:text-sm leading-relaxed">
                                    {instructor.credentials}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
