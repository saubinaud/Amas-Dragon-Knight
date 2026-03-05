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
        <section id="why-us" className="py-20 sm:py-28 bg-dk-black">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <div className="mb-14 sm:mb-16">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-dk-red text-xs font-semibold tracking-[0.35em] uppercase font-heading mb-3 flex items-center gap-2.5"
                    >
                        <span className="w-5 h-[2px] bg-dk-red rounded-full" />
                        El Proceso de Transformación
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-lg"
                    >
                        Dominando tu{' '}
                        <span className="text-white/40">Dragón Interior</span>
                    </motion.h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12 }}
                            className="group bg-dk-card rounded-2xl p-6 sm:p-7 border border-white/[0.06] hover:border-white/[0.12] hover:bg-dk-card/80 transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="w-10 h-10 rounded-xl bg-dk-red/10 flex items-center justify-center mb-5 text-dk-red group-hover:bg-dk-red group-hover:text-white transition-all duration-300">
                                <feature.icon className="w-5 h-5" />
                            </div>

                            <h3 className="font-heading text-lg font-bold text-white mb-2.5">
                                {feature.title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed mb-5">
                                {feature.description}
                            </p>

                            <ul className="space-y-2">
                                {feature.points.map((point, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs text-white/40">
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
