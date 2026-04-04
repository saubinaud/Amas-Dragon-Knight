import { type FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { DragonLogo } from '@/shared/components/ui/DragonLogo';
import { Button } from '@/shared/components/ui/Button';

const NAV_LINKS = [
    { label: 'Inicio', href: '#' },
    { label: 'Filosofía', href: '#why-us' },
    { label: 'Planes', href: '#pricing' },
    { label: 'Torneos', href: '/torneo', isRoute: true },
    { label: 'Graduaciones', href: '/graduacion', isRoute: true },
] as const;

export const Header: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setIsScrolled(latest > 40);
        });
        return () => unsubscribe();
    }, [scrollY]);

    const headerBg = useTransform(
        scrollY,
        [0, 80],
        ['rgba(12, 12, 15, 0)', 'rgba(12, 12, 15, 0.96)']
    );

    const navigateTo = useNavigate();

    const handleNavClick = (href: string, isRoute?: boolean) => {
        setIsOpen(false);
        if (isRoute) {
            navigateTo(href);
        } else if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.querySelector(href);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.header
                style={{ backgroundColor: headerBg }}
                className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-300 ${isScrolled ? 'border-b border-white/[0.06] backdrop-blur-xl' : ''
                    }`}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <div className="flex items-center justify-between h-[68px] md:h-[76px]">
                        {/* Logo */}
                        <div
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => handleNavClick('#')}
                        >
                            <DragonLogo size={40} variant="default" className="transition-transform duration-300 group-hover:scale-105" />
                            <div className="hidden sm:block leading-tight">
                                <div className="font-heading text-base font-bold text-white tracking-tight">Dragon</div>
                                <div className="font-heading text-[10px] font-semibold text-dk-red tracking-[0.35em] uppercase">Knight</div>
                            </div>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            {NAV_LINKS.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => handleNavClick(link.href, 'isRoute' in link && link.isRoute)}
                                    className="relative text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 link-underline"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <Button
                                size="sm"
                                className="ml-2 text-sm font-semibold"
                                onClick={() => handleNavClick('#pricing')}
                            >
                                Inscribirme
                            </Button>
                        </nav>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-white p-2 rounded-lg bg-white/[0.06] hover:bg-white/10 transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="fixed top-[68px] left-0 right-0 z-[49] bg-dk-black/95 backdrop-blur-xl border-b border-white/[0.06]"
                    >
                        <div className="max-w-7xl mx-auto px-5 py-6 flex flex-col gap-1">
                            {NAV_LINKS.map((link, i) => (
                                <motion.button
                                    key={link.label}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    onClick={() => handleNavClick(link.href, 'isRoute' in link && link.isRoute)}
                                    className="flex items-center gap-4 py-3.5 text-left border-b border-white/[0.05] last:border-0 group"
                                >
                                    <span className="text-[10px] font-semibold text-dk-red font-heading tracking-wider">0{i + 1}</span>
                                    <span className="font-heading text-xl font-semibold text-white/80 group-hover:text-white transition-colors">
                                        {link.label}
                                    </span>
                                </motion.button>
                            ))}
                            <div className="pt-4">
                                <Button
                                    size="md"
                                    className="w-full font-semibold"
                                    onClick={() => handleNavClick('#pricing')}
                                >
                                    Inscribirme Ahora
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
