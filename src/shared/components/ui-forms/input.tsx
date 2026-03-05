import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '@/shared/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    icon?: ReactNode;
    inputSize?: 'sm' | 'md' | 'lg';
}

/**
 * Input component — dark theme, red focus ring
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            icon,
            inputSize = 'md',
            className,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        const sizeClasses = {
            sm: 'px-3 py-2 text-sm',
            md: 'px-4 py-3 text-base',
            lg: 'px-5 py-4 text-lg',
        };

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block font-body text-sm font-medium text-dk-gray-400 mb-1.5"
                    >
                        {label}
                    </label>
                )}

                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dk-gray-400">
                            {icon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            'w-full rounded-xl border font-body bg-black/40 text-white placeholder:text-white/30',
                            'focus:outline-none focus:ring-1 focus:ring-dk-red/50 focus:border-dk-red/50 focus:bg-white/[0.04]',
                            'disabled:bg-white/[0.02] disabled:cursor-not-allowed disabled:text-white/40',
                            'transition-all duration-300 shadow-inner shadow-black/50',
                            sizeClasses[inputSize],
                            error
                                ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500/50'
                                : 'border-white/[0.08]',
                            icon && 'pl-10',
                            className
                        )}
                        {...props}
                    />
                </div>

                {error && (
                    <p className="mt-1 text-red-500 text-xs font-body">{error}</p>
                )}

                {helperText && !error && (
                    <p className="mt-1 text-dk-gray-600 text-xs font-body">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
