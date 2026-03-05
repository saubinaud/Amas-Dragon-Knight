import { type FC } from 'react';
import { DragonLogo } from '@/shared/components/ui/DragonLogo';
import { Instagram, Facebook, Phone } from 'lucide-react';

export const Footer: FC = () => {
    return (
        <footer className="relative bg-dk-surface border-t border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-6 py-14 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <DragonLogo size={40} variant="default" />
                            <div className="leading-tight">
                                <div className="font-heading text-base font-bold text-white tracking-tight">Dragon Knight</div>
                                <div className="text-[10px] text-white/35 tracking-[0.3em] uppercase">Taekwondo Academy</div>
                            </div>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                            Forjando disciplina, carácter y campeones en Lima, Perú desde 2010.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <p className="text-dk-red text-[10px] font-semibold tracking-[0.3em] uppercase font-heading mb-5">Navegación</p>
                        <ul className="space-y-2.5">
                            {['Inicio', 'Filosofía', 'Planes', 'Instructores', 'FAQ'].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-white/45 hover:text-white text-sm transition-colors duration-200 link-underline"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social / Contact */}
                    <div>
                        <p className="text-dk-red text-[10px] font-semibold tracking-[0.3em] uppercase font-heading mb-5">Síguenos</p>
                        <div className="flex flex-col gap-3">
                            {[
                                { icon: Instagram, label: '@dragonknightperu', href: '#' },
                                { icon: Facebook, label: 'Dragon Knight PE', href: '#' },
                                { icon: Phone, label: '+51 999 999 999', href: '#' },
                            ].map(({ icon: Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    className="group flex items-center gap-3 text-white/45 hover:text-white transition-colors duration-200"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center group-hover:bg-dk-red/20 group-hover:text-dk-red transition-all duration-200">
                                        <Icon size={14} />
                                    </div>
                                    <span className="text-sm">{label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
                    <p>© {new Date().getFullYear()} Dragon Knight. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white/60 transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-white/60 transition-colors">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
