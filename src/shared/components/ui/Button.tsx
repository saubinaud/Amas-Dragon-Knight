import { type ButtonHTMLAttributes, type FC, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    glow?: boolean;
    loading?: boolean;
    children?: ReactNode;
}

/**
 * Dragon Knight Button — Elite Martial Style
 */
export const Button: FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    glow = false,
    loading = false,
    className,
    children,
    disabled,
    ...props
}) => {
    const baseStyles =
        'group relative font-heading font-semibold tracking-wide transition-all duration-200 rounded-xl cursor-pointer inline-flex items-center justify-center gap-2 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dk-red focus-visible:ring-offset-2 focus-visible:ring-offset-dk-black';

    const variants = {
        primary:
            'bg-dk-red text-white hover:bg-dk-red-light active:scale-[0.97] shadow-lg shadow-dk-red/20 hover:shadow-dk-red/40',
        secondary:
            'bg-white/10 text-white border border-white/10 hover:bg-white/15 hover:border-white/20 active:scale-[0.97]',
        outline:
            'bg-transparent text-white border border-white/20 hover:border-dk-red/60 hover:text-white hover:bg-dk-red/10 active:scale-[0.97]',
        ghost:
            'bg-transparent text-dk-red hover:bg-dk-red/10 active:scale-95',
    };

    const sizes = {
        sm: 'px-5 py-2.5 text-sm',
        md: 'px-7 py-3.5 text-base',
        lg: 'px-9 py-4 text-base',
    };

    const isDisabled = disabled || loading;

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                glow && 'shadow-[0_0_30px_rgba(232,0,10,0.35)]',
                isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
                className
            )}
            disabled={isDisabled}
            {...props}
        >
            {loading && <Loader2 size={16} className="animate-spin" />}
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </button>
    );
};
