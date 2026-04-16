import { type FC } from 'react';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/shared/hooks/useReveal';

export const RedCTA: FC = () => {
    const ref = useReveal<HTMLDivElement>();

    return (
        <section className="py-16 sm:py-20 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div
                    ref={ref}
                    className="reveal relative rounded-2xl sm:rounded-3xl overflow-hidden px-8 sm:px-14 py-14 sm:py-16 flex flex-col md:flex-row items-center justify-between gap-10"
                    style={{ background: 'linear-gradient(135deg, #C8102E 0%, #DF1939 50%, #C8102E 100%)' }}
                >
                    <div className="absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                            backgroundSize: '28px 28px',
                        }}
                    />

                    <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -top-20 -left-20 w-60 h-60 bg-black/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-xl text-center md:text-left">
                        <p className="text-white/60 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
                            No esperes más
                        </p>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                            ¿Listo para ser tu mejor versión?
                        </h2>
                        <p className="text-white/70 text-sm sm:text-base mt-3 leading-relaxed">
                            Tu verdadera transformación comienza con un solo paso.
                        </p>
                    </div>

                    <div className="relative z-10 flex-shrink-0">
                        <button
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group flex items-center gap-3 bg-white text-[#C8102E] px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-heading font-bold text-base sm:text-lg hover:bg-white/95 active:scale-[0.97] transition-all duration-200 shadow-xl shadow-black/20"
                            style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                        >
                            Inscribirme Ahora
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
