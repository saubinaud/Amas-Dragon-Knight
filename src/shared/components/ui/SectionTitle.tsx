import { type FC } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    light?: boolean;
    className?: string;
    centered?: boolean;
}

export const SectionTitle: FC<SectionTitleProps> = ({
    title, subtitle, light = false, className, centered = true,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className={cn(centered && 'text-center', 'mb-12 md:mb-16', className)}
        >
            {/* Brutalist tag line */}
            <div className={cn(
                'inline-flex items-center gap-3 mb-4',
                centered && 'justify-center'
            )}>
                <span className="block w-8 h-[2px] bg-dk-red" />
                <span className="font-heading text-dk-red text-xs tracking-[0.4em] uppercase font-bold">
                    Dragon Knight
                </span>
                <span className="block w-8 h-[2px] bg-dk-red" />
            </div>

            <h2 className={cn(
                'font-heading text-4xl md:text-5xl lg:text-6xl tracking-tight font-bold uppercase leading-[0.9]',
                light ? 'text-dk-black' : 'text-dk-white',
            )}>
                {title}
            </h2>

            {subtitle && (
                <p className={cn(
                    'mt-5 font-body text-base md:text-lg max-w-2xl uppercase tracking-[0.15em]',
                    centered && 'mx-auto',
                    light ? 'text-gray-600' : 'text-gray-500',
                )}>
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};
