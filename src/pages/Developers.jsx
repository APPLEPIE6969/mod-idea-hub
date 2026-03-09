import { User, Users, Star, MessageSquare, Plus, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useState } from 'react';

const DevCard = ({ username, bio, ideas, mods, avatar, isVerified }) => (
    <motion.div
        whileHover={{ x: 5 }}
        className="bg-neutral-dark border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl transition-all hover:border-primary/20"
    >
        <div className="relative">
            <img
                src={avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`}
                alt={username}
                className="w-24 h-24 rounded-3xl border-4 border-background-dark shadow-2xl bg-slate-800"
            />
            {isVerified && (
                <div className="absolute -top-2 -right-2 bg-primary text-background-dark p-1 rounded-lg border-2 border-background-dark">
                    <Star size={14} fill="currentColor" />
                </div>
            )}
        </div>

        <div className="flex-1 flex flex-col gap-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
                <h3 className="text-xl font-black text-slate-100 uppercase tracking-tight italic">{username}</h3>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800 px-2 py-0.5 rounded">MOD ARCHITECT</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 max-w-md">
                {bio || "Passionate creator dedicated to pushing the limits of voxel engineering and immersive gameplay."}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-6 mt-2">
                <div className="flex flex-col">
                    <span className="text-primary font-black text-lg leading-none">{ideas}</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Ideas</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-accent-green font-black text-lg leading-none">{mods}</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Mods</span>
                </div>
            </div>
        </div>

        <button className="w-full md:w-auto bg-primary/10 hover:bg-primary text-primary hover:text-background-dark px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all border border-primary/20 cursor-pointer shadow-lg hover:shadow-primary/20">
            FOLLOW
        </button>
    </motion.div>
);

export default function Developers() {
    const devs = [
        { username: 'Caelum', ideas: 42, mods: 12, isVerified: true },
        { username: 'VoidWalker', ideas: 28, mods: 5, isVerified: false },
        { username: 'TimeKeeper', ideas: 56, mods: 18, isVerified: true },
        { username: 'NatureGuard', ideas: 15, mods: 3, isVerified: false },
        { username: 'EnergyMage', ideas: 89, mods: 24, isVerified: true },
    ];

    return (
        <Layout>
            <div className="flex flex-col gap-8">
                <header className="flex flex-col gap-2">
                    <h1 className="text-4xl font-black text-slate-100 tracking-tight uppercase italic">Creators</h1>
                    <p className="text-slate-400 font-medium">Discover the brilliant minds bringing ideas to life across the multiverse.</p>
                </header>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Find a developer..."
                            className="w-full bg-neutral-dark border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-100 focus:ring-1 focus:ring-primary outline-none transition-all shadow-xl"
                        />
                    </div>
                    <button className="bg-neutral-dark border border-slate-800 rounded-2xl px-6 py-4 text-slate-400 flex items-center gap-2 hover:border-slate-600 transition-all cursor-pointer">
                        <Filter size={18} />
                        <span className="font-bold uppercase text-xs tracking-widest">Filter</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {devs.map((dev, i) => (
                        <DevCard key={i} {...dev} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
