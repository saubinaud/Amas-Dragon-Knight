import { useReveal } from '@/shared/hooks/useReveal';

const stats = [
    { value: '25+', label: 'Años de tradición' },
    { value: '12', label: 'Instructores certificados' },
    { value: 'Élite', label: 'Nivel competitivo' },
    { value: '100%', label: 'Éxito en graduaciones' },
];

export const StatsStrip = () => {
    const ref = useReveal<HTMLDivElement>({ children: true });

    return (
        <section
            className="py-10 sm:py-12 relative overflow-hidden"
            style={{
                background: 'linear-gradient(to right, rgba(200, 16, 46, 0.06), rgba(26, 26, 29, 0.8), rgba(200, 16, 46, 0.06))',
                borderTop: '1px solid rgba(200, 16, 46, 0.15)',
                borderBottom: '1px solid rgba(200, 16, 46, 0.15)',
            }}
        >
            <div ref={ref} className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className={`reveal reveal-delay-${i + 1} group flex flex-col items-center text-center px-4 py-2 transition-all duration-300 ${
                                i < stats.length - 1 ? 'md:border-r md:border-white/[0.08]' : ''
                            }`}
                        >
                            <span className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1.5 group-hover:text-dk-red transition-colors duration-300">
                                {stat.value}
                            </span>
                            <span className="text-[10px] sm:text-xs text-white/40 font-medium uppercase tracking-[0.15em] group-hover:text-white/60 transition-colors duration-300">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
