import { motion } from 'framer-motion';
import { Shield, Zap, Award } from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: "Defensa Personal Real",
        description: "Técnicas efectivas aplicables a situaciones reales. No solo deporte, sino supervivencia y confianza.",
        points: ["Resiliencia mental bajo presión", "Nuevo sentido de agencia", "Habilidades de desescalada"],
    },
    {
        icon: Zap,
        title: "Disciplina Mental",
        description: "Desarrollamos foco, autocontrol y respeto. Herramientas que sirven para toda la vida, dentro y fuera del dojo.",
        points: ["Control de impulsos", "Enfoque estratégico", "Respeto por uno mismo y otros"],
    },
    {
        icon: Award,
        title: "Reconocimiento Global",
        description: "Grados certificados por Kukkiwon, la autoridad mundial del Taekwondo. Una credencial de excelencia reconocida internacionalmente.",
        points: ["Certificados Dan de Kukkiwon", "Preparación para torneos", "Seminarios internacionales"],
    }
];

export const TransformationProcess = () => {
    return (
        <section id="why-us" className="py-20 sm:py-28 bg-layered relative overflow-hidden">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-grid-red pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Section header (AMAS style — centered with badge) */}
                <div className="text-center mb-14 sm:mb-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-dk-red/10 border border-dk-red/20 rounded-full px-5 py-2 mb-5"
                    >
                        <span className="text-[10px]">✨</span>
                        <span className="text-dk-red-light text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-heading">
                            El Proceso de Transformación
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight"
                    >
                        <span className="text-gradient-red">Dominando</span>{' '}
                        <span className="text-gradient-light">tu Dragón Interior</span>
                    </motion.h2>
                </div>

                {/* Cards with glow effect */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 lg:gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12 }}
                            className="group relative bg-gradient-to-br from-[#222225] via-[#222225]/95 to-[#1A1A1D] rounded-2xl p-5 md:p-5 lg:p-7 border border-white/[0.07] hover:border-dk-red/25 transition-all duration-500 card-glow"
                        >
                            {/* Corner accent (AMAS style) */}
                            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-dk-red/15 to-transparent rounded-br-full pointer-events-none" />

                            {/* Icon */}
                            <div className="relative w-12 h-12 rounded-xl bg-dk-red/10 flex items-center justify-center mb-5 text-dk-red group-hover:bg-dk-red group-hover:text-white group-hover:shadow-lg group-hover:shadow-dk-red/30 transition-all duration-300">
                                <feature.icon className="w-5 h-5" />
                            </div>

                            <h3 className="font-heading text-lg font-bold text-white mb-2.5">
                                {feature.title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed mb-5">
                                {feature.description}
                            </p>

                            <ul className="space-y-2.5">
                                {feature.points.map((point, i) => (
                                    <li key={i} className="flex items-center gap-2.5 text-xs text-white/45">
                                        <span className="w-1.5 h-1.5 bg-dk-red rounded-full flex-shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
