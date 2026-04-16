import { type FC } from 'react';
import { cn } from '@/shared/utils/cn';

interface DragonLogoProps {
    size?: number;
    className?: string;
    variant?: 'default' | 'white';
}

/**
 * Dragon Knight logo — served from Cloudinary with auto format/quality optimization.
 * Cloudinary serves WebP/AVIF to supported browsers automatically.
 */
export const DragonLogo: FC<DragonLogoProps> = ({
    size = 48,
    className,
    variant = 'default'
}) => {
    // Cloudinary transformation: f_auto (WebP/AVIF), q_auto:eco (aggressive compression), w_{size*2} for retina
    const w = size * 2;
    const src = `https://res.cloudinary.com/dkoocok3j/image/upload/f_auto,q_auto:eco,w_${w}/dragon-knight/logo.png`;

    return (
        <img
            src={src}
            alt="Dragon Knight"
            width={size}
            height={size}
            className={cn(
                'object-contain',
                variant === 'white' && 'brightness-0 invert',
                className
            )}
            loading="eager"
            decoding="async"
        />
    );
};
