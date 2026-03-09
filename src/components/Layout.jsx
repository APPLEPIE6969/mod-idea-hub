import { Box, Puzzle, Wrench, Paintbrush, Trophy, Layout as LayoutIcon, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all border-none cursor-pointer text-left group ${active ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(13,242,242,0.1)]' : 'text-slate-400 hover:bg-neutral-dark bg-transparent'
            }`}
    >
        <div className="flex items-center gap-3">
            <Icon size={18} className={active ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300'} />
            <span className="text-sm font-medium">{label}</span>
        </div>
        {active && <ChevronRight size={14} className="text-primary/50" />}
    </motion.button>
);

export default function Layout({ children, activeCategory = 'All', onCategoryChange }) {
    const categories = [
        { id: 'All', label: 'All Categories', icon: LayoutIcon },
        { id: 'Minecraft', label: 'Minecraft Mods', icon: Box },
        { id: 'Plugins', label: 'Server Plugins', icon: Puzzle },
        { id: 'Tools', label: 'Developer Tools', icon: Wrench },
        { id: 'Assets', label: 'Asset Packs', icon: Paintbrush },
    ];

    return (
        <div className="bg-background-dark min-h-screen pt-16">
            <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[240px_1fr_300px] gap-8">
                {/* Left Sidebar - Navigation */}
                <aside className="hidden lg:flex flex-col gap-8 py-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto hide-scrollbar">
                    <section className="flex flex-col gap-2">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">Categories</h3>
                        <div className="flex flex-col gap-1">
                            {categories.map(cat => (
                                <SidebarItem
                                    key={cat.id}
                                    icon={cat.icon}
                                    label={cat.label}
                                    active={activeCategory === cat.id}
                                    onClick={() => onCategoryChange(cat.id)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Community Stats Card Component - Premium Look */}
                    <section className="bg-linear-to-br from-neutral-dark/80 to-background-dark border border-slate-800 rounded-xl p-4 flex flex-col gap-4 shadow-xl">
                        <div className="flex items-center gap-2 text-primary">
                            <Trophy size={18} />
                            <span className="text-sm font-bold uppercase tracking-tight">Leaderboard</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer p-1 hover:bg-white/5 rounded transition-colors">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${i === 1 ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-slate-800 text-slate-500'
                                            }`}>
                                            {i}
                                        </div>
                                        <div className="text-xs font-medium text-slate-300 group-hover:text-primary transition-colors">Creator_{i}</div>
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-500 group-hover:text-slate-300">1.2k</div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-2 text-[10px] font-bold text-primary/60 hover:text-primary transition-colors bg-transparent border-none cursor-pointer uppercase tracking-widest">
                            View all ranks
                        </button>
                    </section>
                </aside>

                {/* Main Content */}
                <main className="py-6 min-h-[calc(100vh-64px)]">
                    {children}
                </main>

                {/* Right Sidebar - Social & Community */}
                <aside className="hidden lg:flex flex-col gap-8 py-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto hide-scrollbar">
                    <section className="bg-primary/5 border border-primary/20 rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl -mr-12 -mt-12 group-hover:bg-primary/20 transition-all"></div>
                        <h3 className="text-slate-100 font-bold text-sm z-10">Join our Discord</h3>
                        <p className="text-slate-400 text-xs leading-relaxed z-10">Connect with 2,400+ creators and get help with your mod ideas!</p>
                        <button className="w-full bg-primary text-background-dark py-2 rounded-lg font-bold text-xs hover:opacity-90 transition-all border-none cursor-pointer mt-2 z-10 shadow-lg shadow-primary/20">
                            JOIN COMMUNITY
                        </button>
                    </section>

                    <section className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Trending Tags</h3>
                        <div className="flex flex-wrap gap-2 px-2">
                            {['Optimization', 'Visuals', 'New Mobs', 'RPG', 'Biomes', 'Industrial'].map(tag => (
                                <a key={tag} href="#" className="px-3 py-1.5 bg-neutral-dark border border-slate-800 rounded-full text-[10px] font-semibold text-slate-400 hover:text-primary hover:border-primary/30 transition-all no-underline">
                                    #{tag}
                                </a>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    );
}
