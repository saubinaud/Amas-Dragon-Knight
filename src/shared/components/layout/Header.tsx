import { type FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { DragonLogo } from '@/shared/components/ui/DragonLogo';

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
            <header
                className="fixed top-0 left-0 right-0 z-[50] transition-all duration-300"
                style={isScrolled ? {
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.80))',
                    boxShadow: '0 10px 40px rgba(200, 16, 46, 0.20), 0 0 80px rgba(200, 16, 46, 0.08)',
                    borderBottom: '1px solid rgba(200, 16, 46, 0.25)',
                } : {
                    background: 'linear-gradient(to bottom, rgba(200, 16, 46, 0.08), rgba(200, 16, 46, 0.04), rgba(0, 0, 0, 0.20))',
                    boxShadow: '0 8px 32px rgba(200, 16, 46, 0.10), 0 0 60px rgba(200, 16, 46, 0.04)',
                    borderBottom: '1px solid rgba(200, 16, 46, 0.10)',
                }}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <div className="flex items-center justify-between h-[68px] md:h-[76px]">
                        {/* Logo with gradient text */}
                        <div
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => handleNavClick('#')}
                        >
                            <DragonLogo size={40} variant="default" className="transition-transform duration-300 group-hover:scale-105" />
                            <div className="hidden sm:block leading-tight">
                                <div
                                    className="font-heading text-base font-bold tracking-tight"
                                    style={{
                                        background: 'linear-gradient(135deg, #C8102E 0%, #DF1939 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    Dragon
                                </div>
                                <div className="font-heading text-[10px] font-semibold text-white/60 tracking-[0.35em] uppercase">Knight</div>
                            </div>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            {NAV_LINKS.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => handleNavClick(link.href, 'isRoute' in link && link.isRoute)}
                                    className="relative text-sm font-medium text-white/60 hover:text-dk-red transition-colors duration-200 link-underline"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <button
                                onClick={() => handleNavClick('#pricing')}
                                className="ml-2 bg-gradient-to-r from-[#C8102E] to-[#DF1939] hover:from-[#B00E28] hover:to-[#C8102E] text-white font-heading font-semibold text-sm px-5 py-2.5 rounded-lg shadow-lg shadow-dk-red/20 hover:shadow-dk-red/40 active:scale-95 transition-all duration-300"
                            >
                                Inscribirme
                            </button>
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
            </header>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="fixed top-[68px] left-0 right-0 z-[49] border-b border-dk-red/15"
                        style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.97), rgba(0, 0, 0, 0.95))' }}
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
                                <button
                                    onClick={() => handleNavClick('#pricing')}
                                    className="w-full bg-gradient-to-r from-[#C8102E] to-[#DF1939] text-white font-heading font-semibold text-base py-3.5 rounded-xl shadow-lg shadow-dk-red/20 active:scale-95 transition-all duration-300"
                                    style={{ touchAction: 'manipulation' }}
                                >
                                    Inscribirme Ahora
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
