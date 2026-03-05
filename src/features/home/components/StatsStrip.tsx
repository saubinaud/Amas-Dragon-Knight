import { motion } from 'framer-motion';

const stats = [
    { value: '25+', label: 'Años de tradición' },
    { value: '12', label: 'Instructores maestros' },
    { value: 'Élite', label: 'Nivel de competencia' },
    { value: '100%', label: 'Récord de éxito' },
];

export const StatsStrip = () => {
    return (
        <section className="py-10 border-y border-white/[0.06] bg-dk-surface/50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`flex flex-col items-center text-center px-4 py-2 ${i < stats.length - 1 ? 'md:border-r md:border-white/[0.08]' : ''
                                }`}
                        >
                            <span className="font-heading text-3xl sm:text-4xl font-bold text-white mb-1.5">
                                {stat.value}
                            </span>
                            <span className="text-xs text-white/45 font-medium uppercase tracking-[0.15em]">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
