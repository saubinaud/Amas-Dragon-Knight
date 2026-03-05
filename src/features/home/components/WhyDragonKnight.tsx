import { motion } from 'framer-motion';
import { Shield, Target, Award, Users, Star, Zap } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/shared/components/ui/Button';

// Counter Hook for animated numbers
const useCounter = (end: number, duration: number = 2, shouldStart: boolean = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldStart) return;
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration, shouldStart]);

    return count;
};

const FeatureCard = ({ icon: Icon, title, description, delay, index }: {
    icon: React.ElementType, title: string, description: string, delay: number, index: number
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="group relative border border-white/8 hover:border-dk-red p-6 sm:p-8 overflow-hidden transition-all duration-300 bg-[#080808] hover:shadow-[inset_0_0_40px_rgba(232,0,10,0.05)]"
        >
            {/* Index number watermark */}
            <span className="absolute top-3 right-5 font-heading text-6xl font-bold text-white/[0.03] group-hover:text-dk-red/[0.06] transition-colors duration-500 select-none leading-none">
                0{index + 1}
            </span>

            <div className="relative z-10 flex flex-col gap-5">
                <div className="w-10 h-10 flex items-center justify-center border border-white/10 group-hover:border-dk-red group-hover:bg-dk-red transition-all duration-300 text-gray-500 group-hover:text-white">
                    <Icon className="w-5 h-5" />
                </div>

                <div>
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-white uppercase tracking-wide mb-3 leading-tight">
                        {title}
                    </h3>
                    <p className="text-gray-500 font-body text-base leading-relaxed group-hover:text-gray-400 transition-colors">
                        {description}
                    </p>
                </div>
            </div>

            {/* Bottom border reveal on hover */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-dk-red group-hover:w-full transition-all duration-500 ease-out" />
        </motion.div>
    );
};

const StatItem = ({ number, label, suffix = "+", shouldStart }: {
    number: number, label: string, suffix?: string, shouldStart: boolean
}) => {
    const count = useCounter(number, 2, shouldStart);
    return (
        <div className="flex flex-col items-center gap-1 py-4 border-b-2 border-transparent hover:border-dk-red transition-colors duration-300">
            <div className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white tracking-tighter leading-none">
                {count}{suffix}
            </div>
            <p className="text-dk-red font-heading tracking-[0.25em] uppercase text-[10px] font-bold mt-2">
                {label}
            </p>
        </div>
    );
};

const FEATURES = [
    {
        icon: Shield,
        title: "Defensa Personal Real",
        description: "Técnicas efectivas aplicables a situaciones reales. No solo deporte, sino supervivencia y confianza.",
    },
    {
        icon: Target,
        title: "Disciplina Mental",
        description: "Desarrollamos foco, autocontrol y respeto. Herramientas que sirven para toda la vida.",
    },
    {
        icon: Star,
        title: "Acondicionamiento Físico",
        description: "Mejora tu fuerza, flexibilidad y resistencia con entrenamientos de alto impacto.",
    },
    {
        icon: Users,
        title: "Comunidad Unida",
        description: "Únete a una familia de guerreros que se apoyan mutuamente. Aquí nadie lucha solo.",
    },
    {
        icon: Award,
        title: "Certificación Oficial",
        description: "Grados avalados por la Federación Nacional. Tu esfuerzo reconocido internacionalmente.",
    },
];

export const WhyDragonKnight = () => {
    const statsRef = useRef<HTMLDivElement>(null);
    const [statsVisible, setStatsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
            { threshold: 0.3 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="why-us" className="relative py-24 sm:py-32 overflow-hidden bg-dk-black">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

            {/* Large red blur accent */}
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-dk-red/[0.04] rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

                {/* Header — Left-aligned brutalist style */}
                <div className="mb-16 sm:mb-20">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '64px' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="h-[2px] bg-dk-red mb-6"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-dk-red font-heading font-bold tracking-[0.4em] text-xs uppercase mb-3"
                    >
                        Nuestra Filosofía
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold text-white uppercase tracking-tighter leading-[0.85]"
                    >
                        ¿Por Qué{' '}
                        <span className="text-transparent [-webkit-text-stroke:2px_#E8000A]">
                            Dragon Knight
                        </span>
                        ?
                    </motion.h2>
                </div>

                {/* Stats Strip */}
                <div
                    ref={statsRef}
                    className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-20 border border-white/8"
                >
                    {[
                        { number: 15, label: "Años de Experiencia" },
                        { number: 500, label: "Alumnos Formados" },
                        { number: 50, label: "Medallas Ganadas" },
                        { number: 100, label: "Éxito Garantizado", suffix: "%" },
                    ].map((stat, i) => (
                        <div key={i} className={`p-6 md:p-8 ${i < 3 ? 'border-r border-white/8' : ''} ${i >= 2 ? 'border-t border-white/8 md:border-t-0' : ''}`}>
                            <StatItem
                                number={stat.number}
                                label={stat.label}
                                suffix={stat.suffix || '+'}
                                shouldStart={statsVisible}
                            />
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
                    {FEATURES.map((feat, i) => (
                        <div key={i} className="bg-dk-black">
                            <FeatureCard
                                icon={feat.icon}
                                title={feat.title}
                                description={feat.description}
                                delay={i * 0.08}
                                index={i}
                            />
                        </div>
                    ))}
                    {/* CTA Card */}
                    <div className="bg-dk-black">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="group relative p-6 sm:p-8 bg-dk-red overflow-hidden flex flex-col justify-between h-full min-h-[200px]"
                        >
                            <div>
                                <Zap className="w-8 h-8 text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
                                <h3 className="text-2xl font-heading font-bold text-white uppercase leading-tight mb-2">
                                    Clase de Prueba GRATIS
                                </h3>
                                <p className="text-white/80 font-body text-sm">Ven sin compromiso y vive la experiencia.</p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="mt-6 self-start border-white text-white hover:bg-white hover:text-dk-red shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Reservar Ahora
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
