import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface SimpleDialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const SimpleDialog: React.FC<SimpleDialogProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
            style={{ zIndex: 2147483647 }} // Force MAX z-index
        >
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-dk-black/80 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Content */}
            <div
                className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#222225] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 overflow-x-hidden transition-all duration-300 transform scale-100 opacity-100"
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-white/40 hover:text-white hover:bg-white/10 z-50 p-2 rounded-full transition-colors duration-200"
                >
                    <X size={20} />
                </button>

                <div className="p-6 sm:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
};
