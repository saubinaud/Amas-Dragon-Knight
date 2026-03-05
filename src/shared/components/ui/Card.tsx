import { type FC } from 'react';
import { cn } from '@/shared/utils/cn';

interface CardProps {
    variant?: 'default' | 'bordered' | 'glass';
    padding?: 'sm' | 'md' | 'lg';
    hoverable?: boolean;
    className?: string;
    children: React.ReactNode;
}

/**
 * Card — Brutalist dark card with hard shadows and sharp edges
 */
export const Card: FC<CardProps> = ({
    variant = 'default',
    padding = 'md',
    hoverable = false,
    className,
    children,
}) => {
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8 md:p-10',
    };

    const variantClasses = {
        default: 'bg-[#0D0D0D] border border-white/8 rounded-none',
        bordered: 'bg-dk-black border-2 border-dk-red rounded-none shadow-[4px_4px_0px_0px_#E8000A]',
        glass: 'bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-none',
    };

    return (
        <div
            className={cn(
                variantClasses[variant],
                paddingClasses[padding],
                hoverable && 'hover:border-dk-red hover:shadow-[4px_4px_0px_0px_#E8000A] transition-all duration-200 cursor-pointer',
                className
            )}
        >
            {children}
        </div>
    );
};
