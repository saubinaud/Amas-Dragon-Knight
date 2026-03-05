import { type FC, type ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

export interface BadgeProps {
    variant?: 'primary' | 'success' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
    className?: string;
}

/**
 * Badge — red/black/white only
 */
export const Badge: FC<BadgeProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    className,
}) => {
    const variantClasses = {
        primary: 'bg-dk-red text-dk-white',
        success: 'bg-green-600 text-white',
        outline: 'border border-dk-red text-dk-red',
    };

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-4 py-1.5 text-xs',
        lg: 'px-5 py-2 text-sm',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center gap-2 rounded-sm uppercase tracking-widest font-heading',
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
        >
            {children}
        </span>
    );
};
