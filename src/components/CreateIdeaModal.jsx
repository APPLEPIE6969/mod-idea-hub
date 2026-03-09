import { X, Send, Info, Code2 } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function CreateIdeaModal({ isOpen, onClose, onRefresh }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Minecraft Mod',
        tags: ''
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const tagArray = formData.tags.split(',').map(t => t.trim()).filter(t => t !== '');

        const { error } = await supabase
            .from('mod_ideas')
            .insert([
                {
                    title: formData.title,
                    description: formData.description,
                    category: formData.category,
                    tags: tagArray,
                    author_id: '00000000-0000-0000-0000-000000000000'
                }
            ]);

        if (!error) {
            onRefresh();
            onClose();
            setFormData({ title: '', description: '', category: 'Minecraft Mod', tags: '' });
        } else {
            alert(`Failed to publish: ${error.message}`);
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-neutral-dark border border-slate-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                <header className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-100 italic">Share your mod idea</h2>
                        <p className="text-slate-500 text-xs">Help developers find the next big project.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors bg-transparent border-none cursor-pointer text-slate-400">
                        <X size={20} />
                    </button>
                </header>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-500 tracking-widest">Idea Title</label>
                        <input
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Dynamic Ecosystems & Animal Migration"
                            className="w-full bg-white/5 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-slate-100"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-500 tracking-widest">Category</label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-white/5 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all appearance-none text-slate-100 outline-none"
                            >
                                <option>Minecraft Mod</option>
                                <option>Plugin</option>
                                <option>Resource Pack</option>
                                <option>Data Pack</option>
                                <option>Tool</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-500 tracking-widest">Tags (comma separated)</label>
                            <input
                                value={formData.tags}
                                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                placeholder="survival, herds, realism"
                                className="w-full bg-white/5 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-slate-100"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-500 tracking-widest">Description (Markdown Supported)</label>
                        <textarea
                            required
                            rows={5}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe what the mod does, how it works, and why it's cool..."
                            className="w-full bg-white/5 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all resize-none text-slate-100"
                        />
                    </div>

                    <div className="flex items-start gap-3 bg-primary/5 border border-primary/10 p-4 rounded-2xl">
                        <Info size={18} className="text-primary shrink-0 mt-0.5" />
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                            <strong>Tip:</strong> Be descriptive! Developers are more likely to claim ideas that have clear mechanics and goals. High-quality posts get featured.
                        </p>
                    </div>

                    <footer className="pt-2 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-2xl transition-all border-none cursor-pointer"
                        >
                            CANCEL
                        </button>
                        <button
                            disabled={loading}
                            className={`flex-1 bg-primary text-background-dark font-bold py-3 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border-none cursor-pointer ${loading ? 'opacity-50' : ''}`}
                        >
                            {loading ? 'PUBLISHING...' : (
                                <>
                                    <Send size={18} strokeWidth={3} />
                                    PUBLISH IDEA
                                </>
                            )}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}
