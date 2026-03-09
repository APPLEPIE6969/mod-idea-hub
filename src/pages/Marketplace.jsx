import { Package, Download, Star, CheckCircle2, ChevronRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import CustomDropdown from '../components/CustomDropdown';
import { useState } from 'react';

const MarketCard = ({ title, author, downloads, category, isVerified, icon }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-neutral-dark border border-slate-800 rounded-2xl overflow-hidden shadow-xl group"
    >
        <div className="p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 shadow-inner group-hover:border-primary/30 transition-colors">
                    <Package size={32} className="text-primary group-hover:scale-110 transition-transform" />
                </div>
                {isVerified && (
                    <div className="bg-accent-green/10 text-accent-green p-1.5 rounded-lg border border-accent-green/20">
                        <CheckCircle2 size={16} />
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{category}</span>
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-xs text-slate-400 font-medium italic">by {author}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-slate-500">
                    <Download size={14} />
                    <span className="text-xs font-bold">{downloads}</span>
                </div>
                <button className="bg-primary/10 hover:bg-primary text-primary hover:text-background-dark p-2 rounded-lg transition-all border border-primary/20 cursor-pointer">
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    </motion.div>
);

export default function Marketplace() {
    const [filter, setFilter] = useState('All');

    const mods = [
        { title: 'Aetherial Dynamics', author: 'Caelum', downloads: '12.4k', category: 'Minecraft Mod', isVerified: true },
        { title: 'Nexus Gates', author: 'VoidWalker', downloads: '8.2k', category: 'Plugin', isVerified: false },
        { title: 'Chrono-Craft', author: 'TimeKeeper', downloads: '15.1k', category: 'Minecraft Mod', isVerified: true },
        { title: 'Primal Spirits', author: 'NatureGuard', downloads: '4.5k', category: 'Data Pack', isVerified: false },
        { title: 'Flux Generators', author: 'EnergyMage', downloads: '22.8k', category: 'Minecraft Mod', isVerified: true },
        { title: 'Shadow Realm', author: 'Abyss', downloads: '6.7k', category: 'Plugin', isVerified: false },
    ];

    const filterOptions = [
        { value: 'All', label: 'All Projects' },
        { value: 'Verified', label: 'Verified Only' },
        { value: 'New', label: 'Newly Released' },
        { value: 'Editor', label: 'Editor Choice' }
    ];

    return (
        <Layout>
            <div className="flex flex-col gap-8">
                <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-black text-slate-100 tracking-tight uppercase italic">Marketplace</h1>
                        <p className="text-slate-400 font-medium">Browse high-quality mods and plugins brought to life by the community.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <CustomDropdown
                            options={filterOptions}
                            value={filter}
                            onChange={setFilter}
                            className="w-48"
                        />
                    </div>
                </header>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search the marketplace..."
                        className="w-full bg-neutral-dark border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-100 focus:ring-1 focus:ring-primary outline-none transition-all shadow-2xl"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mods.map((mod, i) => (
                        <MarketCard key={i} {...mod} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
