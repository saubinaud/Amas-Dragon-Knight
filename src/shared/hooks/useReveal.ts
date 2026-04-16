import { useEffect, useRef } from 'react';

/**
 * Lightweight reveal-on-scroll hook using IntersectionObserver.
 * Replaces framer-motion `whileInView` for simple fade-up animations.
 *
 * Usage:
 *   const ref = useReveal<HTMLDivElement>();
 *   <div ref={ref} className="reveal">...</div>
 *
 * Or for a container where all `.reveal` children should animate:
 *   const ref = useReveal<HTMLDivElement>({ children: true });
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: { children?: boolean; threshold?: number; rootMargin?: string }) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const targets: Element[] = options?.children
            ? Array.from(el.querySelectorAll('.reveal'))
            : [el];

        if (targets.length === 0) return;

        // Respect reduced motion — reveal immediately
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            targets.forEach((t) => t.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: options?.threshold ?? 0.12,
                rootMargin: options?.rootMargin ?? '0px 0px -60px 0px',
            }
        );

        targets.forEach((t) => observer.observe(t));
        return () => observer.disconnect();
    }, [options?.children, options?.threshold, options?.rootMargin]);

    return ref;
}
