import { type FC, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui-forms/Input';

interface FormData {
    studentName: string;
    age: string;
    parentName: string;
    whatsapp: string;
    hasExperience: string;
}

const initialFormData: FormData = {
    studentName: '', age: '', parentName: '', whatsapp: '', hasExperience: '',
};

export const TrialForm: FC = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        if (!formData.studentName.trim()) newErrors.studentName = 'Nombre del alumno es requerido';
        if (!formData.age.trim()) { newErrors.age = 'Edad es requerida'; }
        else { const n = parseInt(formData.age, 10); if (isNaN(n) || n < 7 || n > 17) newErrors.age = 'Edad debe ser entre 7 y 17 años'; }
        if (!formData.parentName.trim()) newErrors.parentName = 'Nombre del padre/tutor es requerido';
        if (!formData.whatsapp.trim()) { newErrors.whatsapp = 'WhatsApp es requerido'; }
        else if (!/^\d{9,}$/.test(formData.whatsapp.replace(/\s+/g, ''))) newErrors.whatsapp = 'Ingresa un número válido';
        if (!formData.hasExperience) newErrors.hasExperience = 'Selecciona una opción';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    if (isSubmitted) {
        return (
            <section id="formulario" className="py-16 md:py-24 px-4 bg-dk-gray-900">
                <div className="container mx-auto max-w-xl">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-dk-black border border-dk-gray-800 rounded-sm p-8 md:p-12 text-center">
                        <div className="w-20 h-20 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} className="text-green-500" />
                        </div>
                        <h2 className="font-heading text-3xl text-dk-white tracking-wider mb-3">¡RESERVA CONFIRMADA!</h2>
                        <p className="font-body text-dk-gray-400 mb-6">Te contactaremos por WhatsApp en las próximas horas para confirmar tu clase.</p>
                        <p className="font-body text-dk-gray-600 text-sm">
                            ¿Tienes preguntas? Escríbenos directo por{' '}
                            <a href="https://wa.me/51999999999" className="text-dk-red hover:underline">WhatsApp</a>
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="formulario" className="py-16 md:py-24 px-4 bg-dk-gray-900">
            <div className="container mx-auto max-w-xl">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <div className="text-center mb-8">
                        <h2 className="font-heading text-3xl md:text-4xl text-dk-white tracking-wider mb-2">RESERVA TU CLASE</h2>
                        <p className="font-body text-dk-gray-400">Completa el formulario y te contactamos</p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-dk-black border border-dk-gray-800 rounded-sm p-8 md:p-10 space-y-5">
                        <Input label="Nombre del alumno" type="text" value={formData.studentName} onChange={e => handleChange('studentName', e.target.value)} placeholder="Nombre completo" error={errors.studentName} />
                        <Input label="Edad" type="number" min={7} max={17} value={formData.age} onChange={e => handleChange('age', e.target.value)} placeholder="7 - 17 años" error={errors.age} />
                        <Input label="Nombre del padre/tutor" type="text" value={formData.parentName} onChange={e => handleChange('parentName', e.target.value)} placeholder="Nombre del responsable" error={errors.parentName} />
                        <Input label="WhatsApp" type="tel" value={formData.whatsapp} onChange={e => handleChange('whatsapp', e.target.value)} placeholder="999 999 999" error={errors.whatsapp} />

                        <div>
                            <label className="block font-body text-sm font-medium text-dk-gray-400 mb-2">¿Tiene experiencia previa en artes marciales?</label>
                            <div className="flex gap-4">
                                {['Sí', 'No'].map(option => (
                                    <button key={option} type="button" onClick={() => handleChange('hasExperience', option)}
                                        className={`flex-1 py-3 rounded-sm border font-body text-sm font-medium transition-all cursor-pointer ${formData.hasExperience === option
                                                ? 'border-dk-red bg-dk-red/10 text-dk-red'
                                                : 'border-dk-gray-800 text-dk-gray-400 hover:border-dk-gray-600'
                                            }`}>
                                        {option}
                                    </button>
                                ))}
                            </div>
                            {errors.hasExperience && <p className="mt-1 text-red-500 text-xs font-body">{errors.hasExperience}</p>}
                        </div>

                        <Button type="submit" size="lg" glow loading={isSubmitting} className="w-full">
                            <Send size={18} />
                            {isSubmitting ? 'ENVIANDO...' : 'QUIERO MI CLASE GRATIS'}
                        </Button>
                        <p className="text-center text-dk-gray-600 text-xs font-body">Al enviar, aceptas ser contactado por WhatsApp. Sin spam, prometido.</p>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};
