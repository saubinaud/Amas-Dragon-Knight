import { type FC, type ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

interface SectionProps {
    background?: 'dark' | 'darker' | 'light' | 'gradient' | 'none';
    spacing?: 'sm' | 'md' | 'lg' | 'xl';
    container?: boolean;
    decorative?: boolean;
    id?: string;
    className?: string;
    children: ReactNode;
}

/**
 * Section wrapper — consistent spacing and backgrounds
 */
export const Section: FC<SectionProps> = ({
    background = 'dark',
    spacing = 'lg',
    container = true,
    id,
    className,
    children,
}) => {
    const backgroundClasses = {
        dark: 'bg-dk-black',
        darker: 'bg-dk-gray-900',
        gradient: 'bg-gradient-to-br from-[#0C0C0F] to-[#1A1A20]',
        light: 'bg-dk-gray-100',
        none: '',
    };

    const spacingClasses = {
        sm: 'py-8 md:py-12',
        md: 'py-12 md:py-16',
        lg: 'py-16 md:py-24',
        xl: 'py-20 md:py-32',
    };

    return (
        <section
            id={id}
            className={cn(
                backgroundClasses[background],
                spacingClasses[spacing],
                'px-4 relative',
                className
            )}
        >
            {container ? (
                <div className="container mx-auto max-w-6xl">{children}</div>
            ) : (
                children
            )}
        </section>
    );
};
