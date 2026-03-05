import { type FC, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users } from 'lucide-react';
import { Section } from '@/shared/components/ui/Section';

export const SocialProof: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <Section background="darker" spacing="md">
            <div ref={ref} className="max-w-lg mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="flex flex-col items-center gap-4">
                    <div className="w-14 h-14 rounded-sm bg-dk-red flex items-center justify-center">
                        <Users size={28} className="text-dk-white" />
                    </div>
                    <div>
                        <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} className="font-heading text-5xl md:text-6xl text-dk-white">+12</motion.span>
                        <p className="font-body text-dk-gray-400 mt-2">familias reservaron esta semana</p>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};
