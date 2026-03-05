import { type FC } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/**
 * RedCTA — Clean, modern call-to-action section
 */
export const RedCTA: FC = () => {
    return (
        <section className="py-20 sm:py-24 relative overflow-hidden">
            {/* Card with red glow */}
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-2xl sm:rounded-3xl bg-dk-red overflow-hidden px-8 sm:px-14 py-14 sm:py-16 flex flex-col md:flex-row items-center justify-between gap-10"
                >
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                            backgroundSize: '28px 28px',
                        }}
                    />

                    {/* Glow effect */}
                    <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-xl text-center md:text-left">
                        <p className="text-white/60 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
                            No esperes más
                        </p>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                            ¿Listo para evolucionar?
                        </h2>
                        <p className="text-white/70 text-sm sm:text-base mt-3 leading-relaxed">
                            Tu verdadera transformación comienza con un solo paso.
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="relative z-10 flex-shrink-0"
                    >
                        <button
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group flex items-center gap-3 bg-white text-dk-red px-8 py-4 rounded-xl font-heading font-bold text-base hover:bg-white/95 active:scale-[0.97] transition-all duration-200 shadow-xl shadow-black/20"
                        >
                            Inscribirme Ahora
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
