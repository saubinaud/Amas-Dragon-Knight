import { type FC, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
    quote: string;
    name: string;
    belt: string;
    beltColor: string;
    rating: number;
}

const TESTIMONIALS: Testimonial[] = [
    {
        quote: 'Dragon Knight me enseñó que soy más fuerte de lo que creía.',
        name: 'Mateo R.',
        belt: 'Alumno',
        beltColor: '#C8102E',
        rating: 5,
    },
    {
        quote: 'Mis notas mejoraron y aprendí a ser más disciplinado. Entrenar aquí cambió mi vida.',
        name: 'Valentina S.',
        belt: 'Alumna',
        beltColor: '#C8102E',
        rating: 5,
    },
    {
        quote: 'Siempre fui tímido, pero ahora tengo la confianza para liderar. Dragon Knight es mi segunda familia.',
        name: 'Diego L.',
        belt: 'Alumno',
        beltColor: '#C8102E',
        rating: 5,
    },
    {
        quote: 'Mi hijo llegó sin saber nada y ahora compite a nivel nacional. Increíble el trabajo de los instructores.',
        name: 'María G.',
        belt: 'Madre de alumno',
        beltColor: '#C8102E',
        rating: 5,
    },
];

export const Testimonials: FC = () => {
    const [current, setCurrent] = useState(0);

    const next = useCallback(
        () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length),
        [],
    );

    const prev = useCallback(
        () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
        [],
    );

    useEffect(() => {
        const interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, [next]);

    return (
        <section className="py-20 sm:py-28 bg-layered-alt relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-dk-red/[0.06] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                {/* Header (AMAS style) */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-dk-red/10 border border-dk-red/20 rounded-full px-5 py-2 mb-5">
                        <Star size={10} className="text-dk-red" fill="currentColor" />
                        <span className="text-dk-red-light text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-heading">
                            Historias de Campeones
                        </span>
                    </div>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                        <span className="text-gradient-light">Lo que dicen nuestras</span>{' '}
                        <span className="text-gradient-red">familias</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Quote card */}
                    <div className="relative bg-gradient-to-br from-[#222225] via-[#222225]/95 to-[#1A1A1D] border border-white/[0.07] rounded-2xl sm:rounded-3xl p-8 md:p-12 min-h-[300px] flex items-center">
                        <Quote size={48} className="absolute top-6 left-6 text-dk-red/10" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="text-center w-full"
                            >
                                {/* Star rating */}
                                <div className="flex items-center justify-center gap-1 mb-6">
                                    {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                                        <Star key={i} size={18} className="text-dk-red fill-dk-red" />
                                    ))}
                                </div>

                                <p className="font-body text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mb-8 italic">
                                    &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                                </p>

                                <div className="flex flex-col items-center gap-3">
                                    <div
                                        className="w-14 h-14 rounded-full border-2 flex items-center justify-center bg-dk-card"
                                        style={{ borderColor: TESTIMONIALS[current].beltColor }}
                                    >
                                        <span className="font-heading text-xl text-white">
                                            {TESTIMONIALS[current].name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <span className="font-heading text-lg text-white tracking-wider block">
                                            {TESTIMONIALS[current].name}
                                        </span>
                                        <span
                                            className="font-body text-sm uppercase tracking-widest"
                                            style={{ color: TESTIMONIALS[current].beltColor }}
                                        >
                                            {TESTIMONIALS[current].belt}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center text-white/40 hover:border-dk-red hover:text-dk-red transition-colors cursor-pointer"
                            aria-label="Anterior"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flex items-center gap-2">
                            {TESTIMONIALS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                        i === current
                                            ? 'bg-dk-red w-8'
                                            : 'bg-white/15 hover:bg-white/30 w-2.5'
                                    }`}
                                    aria-label={`Testimonio ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center text-white/40 hover:border-dk-red hover:text-dk-red transition-colors cursor-pointer"
                            aria-label="Siguiente"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
