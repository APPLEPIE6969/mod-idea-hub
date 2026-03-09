import { X, Send, Info, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import CustomDropdown from './CustomDropdown';

export default function CreateIdeaModal({ isOpen, onClose, onRefresh }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Minecraft Mod',
        tags: ''
    });
    const [loading, setLoading] = useState(false);

    const categoryOptions = [
        { value: 'Minecraft Mod', label: 'Minecraft Mod' },
        { value: 'Plugin', label: 'Plugin' },
        { value: 'Resource Pack', label: 'Resource Pack' },
        { value: 'Data Pack', label: 'Data Pack' },
        { value: 'Tool', label: 'Tool' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert('Please login to submit an idea');
                return;
            }

            const tagArray = formData.tags.split(',').map(t => t.trim()).filter(t => t !== '');

            const { error } = await supabase
                .from('mod_ideas')
                .insert([
                    {
                        title: formData.title,
                        description: formData.description,
                        category: formData.category,
                        tags: tagArray,
                        author_id: user.id
                    }
                ]);

            if (!error) {
                onRefresh();
                onClose();
                setFormData({ title: '', description: '', category: 'Minecraft Mod', tags: '' });
            } else {
                throw error;
            }
        } catch (error) {
            alert(`Failed to publish: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background-dark/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-2xl bg-neutral-dark border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Header Branding */}
                        <div className="h-2 bg-linear-to-r from-primary via-accent-green to-primary opacity-50"></div>

                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20">
                                        <Lightbulb className="text-primary" size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-100 italic tracking-tight uppercase">New Idea</h2>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-none">Share your vision with the community</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-slate-100 transition-all bg-transparent border-none cursor-pointer"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Project Title</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Procedural Alchemy Systems"
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <CustomDropdown
                                        label="Category"
                                        options={categoryOptions}
                                        value={formData.category}
                                        onChange={(val) => setFormData({ ...formData, category: val })}
                                    />
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Tags (comma separated)</label>
                                        <input
                                            type="text"
                                            placeholder="survival, herds, realism"
                                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                                            value={formData.tags}
                                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Description</label>
                                    <textarea
                                        required
                                        placeholder="Describe your idea in detail..."
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none min-h-[160px] resize-none"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="mt-4 flex items-start gap-3 bg-primary/5 border border-primary/10 p-4 rounded-2xl">
                                    <Info size={18} className="text-primary shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-slate-400 leading-relaxed">
                                        <strong>Tip:</strong> Be descriptive! Developers are more likely to claim ideas that have clear mechanics and goals. High-quality posts get featured.
                                    </p>
                                </div>

                                <div className="mt-2 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-2xl transition-all border-none cursor-pointer"
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        disabled={loading}
                                        className="flex-1 bg-primary text-background-dark font-bold py-3 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border-none cursor-pointer disabled:opacity-50"
                                    >
                                        {loading ? 'PUBLISHING...' : (
                                            <>
                                                <Send size={18} strokeWidth={3} />
                                                PUBLISH IDEA
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
