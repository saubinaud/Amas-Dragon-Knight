import { type FC } from 'react';
import { cn } from '@/shared/utils/cn';

interface DragonLogoProps {
    size?: number;
    className?: string;
    variant?: 'default' | 'white';
}

/**
 * Dragon Knight logo — uses the REAL brand dragon PNG
 * Black dragon head inside a red circle
 */
export const DragonLogo: FC<DragonLogoProps> = ({
    size = 48,
    className,
    variant = 'default'
}) => {
    return (
        <img
            src="/dragon-logo.png"
            alt="Dragon Knight"
            width={size}
            height={size}
            className={cn(
                'object-contain',
                variant === 'white' && 'brightness-0 invert',
                className
            )}
            loading="eager"
        />
    );
};
