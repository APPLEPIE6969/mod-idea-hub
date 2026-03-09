import { ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomDropdown({ options, value, onChange, label, className = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption = options.find(opt => opt.value === value) || options[0];

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange(option.value);
        setIsOpen(false);
    };

    return (
        <div className={`relative flex flex-col gap-2 ${className}`} ref={dropdownRef}>
            {label && <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">{label}</label>}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 flex items-center justify-between hover:border-primary/50 transition-all outline-none cursor-pointer group"
            >
                <span className="text-sm font-medium">{selectedOption.label}</span>
                <ChevronDown
                    size={16}
                    className={`text-slate-500 group-hover:text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                        className="absolute top-full left-0 right-0 mt-2 z-200 bg-neutral-dark border border-slate-800 rounded-xl shadow-2xl overflow-hidden p-1.5"
                    >
                        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto custom-scrollbar">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all border-none cursor-pointer ${value === option.value
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                                        }`}
                                >
                                    <span className="text-xs font-bold uppercase tracking-wider">{option.label}</span>
                                    {value === option.value && <Check size={14} />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
