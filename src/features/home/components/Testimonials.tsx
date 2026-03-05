import { type FC, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { SectionTitle } from '@/shared/components/ui/SectionTitle';
import { Section } from '@/shared/components/ui/Section';

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
        belt: 'Cinturón Azul',
        beltColor: '#3B82F6',
        rating: 5,
    },
    {
        quote: 'Mis notas mejoraron y aprendí a ser más disciplinado. Entrenar aquí cambió mi vida.',
        name: 'Valentina S.',
        belt: 'Cinturón Verde',
        beltColor: '#22C55E',
        rating: 5,
    },
    {
        quote: 'Siempre fui tímido, pero ahora tengo la confianza para liderar. Dragon Knight es mi segunda familia.',
        name: 'Diego L.',
        belt: 'Cinturón Rojo',
        beltColor: '#EF4444',
        rating: 5,
    },
    {
        quote: 'Mi hijo llegó sin saber nada y ahora compite a nivel nacional. Increíble el trabajo de los instructores.',
        name: 'María G.',
        belt: 'Madre de alumno',
        beltColor: '#A3A3A3',
        rating: 5,
    },
];

/**
 * Testimonials slider with auto-play, ratings, and manual navigation
 */
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

    // Auto-play
    useEffect(() => {
        const interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, [next]);

    return (
        <Section background="dark" spacing="lg">
            {/* Background accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-dragon-red-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto">
                <SectionTitle
                    title="HISTORIAS DE CAMPEONES"
                    subtitle="Lo que dicen nuestros alumnos y familias"
                />

                <div className="relative">
                    {/* Quote card */}
                    <div className="relative bg-dragon-gray-900/30 border border-dragon-gray-800 rounded-3xl p-8 md:p-12 min-h-[300px] flex items-center">
                        <Quote size={48} className="absolute top-6 left-6 text-dragon-red-500/10" />

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
                                        <Star key={i} size={18} className="text-dragon-fire-from fill-dragon-fire-from" />
                                    ))}
                                </div>

                                <p className="font-body text-xl md:text-2xl lg:text-3xl text-dragon-white leading-relaxed mb-8 italic">
                                    &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                                </p>

                                <div className="flex flex-col items-center gap-3">
                                    {/* Avatar placeholder */}
                                    <div
                                        className="w-14 h-14 rounded-full border-2 flex items-center justify-center bg-dragon-gray-800"
                                        style={{ borderColor: TESTIMONIALS[current].beltColor }}
                                    >
                                        <span className="font-heading text-xl text-dragon-white">
                                            {TESTIMONIALS[current].name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <span className="font-heading text-lg text-dragon-white tracking-wider block">
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
                            className="w-10 h-10 rounded-full border border-dragon-gray-700 flex items-center justify-center text-dragon-gray-400 hover:border-dragon-red-500 hover:text-dragon-red-500 transition-colors cursor-pointer"
                            aria-label="Anterior"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Dots */}
                        <div className="flex items-center gap-2">
                            {TESTIMONIALS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${i === current
                                        ? 'bg-dragon-red-500 w-8'
                                        : 'bg-dragon-gray-600 hover:bg-dragon-gray-400 w-2.5'
                                        }`}
                                    aria-label={`Testimonio ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-full border border-dragon-gray-700 flex items-center justify-center text-dragon-gray-400 hover:border-dragon-red-500 hover:text-dragon-red-500 transition-colors cursor-pointer"
                            aria-label="Siguiente"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </Section>
    );
};
