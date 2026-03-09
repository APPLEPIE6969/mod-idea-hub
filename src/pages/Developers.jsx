import { Star, Search, Filter, Loader2, UserPlus, UserMinus } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useState, useMemo } from 'react';
import { useDevelopers } from '../hooks/useDevelopers';

const DevCard = ({ id, username, bio, ideas_count, mods_count, avatar_url, is_verified, am_following, onToggleFollow }) => (
    <motion.div
        whileHover={{ x: 8, scale: 1.005 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-neutral-dark border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl transition-all hover:border-primary/20"
    >
        <div className="relative">
            <img
                src={avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`}
                alt={username}
                className="w-24 h-24 rounded-3xl border-4 border-background-dark shadow-2xl bg-slate-800 object-cover"
            />
            {is_verified && (
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
                    <span className="text-primary font-black text-lg leading-none">{ideas_count}</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Ideas</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-accent-green font-black text-lg leading-none">{mods_count}</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Mods</span>
                </div>
            </div>
        </div>

        <button
            onClick={() => onToggleFollow(id, am_following)}
            className={`w-full md:w-auto px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all border cursor-pointer shadow-lg flex items-center justify-center gap-2 ${am_following
                ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-500 group'
                : 'bg-primary/10 border-primary/20 text-primary hover:bg-primary hover:text-background-dark hover:shadow-primary/20'
                }`}
        >
            {am_following ? (
                <>
                    <UserMinus size={16} />
                    UNFOLLOW
                </>
            ) : (
                <>
                    <UserPlus size={16} />
                    FOLLOW
                </>
            )}
        </button>
    </motion.div>
);

export default function Developers() {
    const [search, setSearch] = useState('');
    const { developers, loading, toggleFollow } = useDevelopers();

    const filteredDevs = useMemo(() => {
        return developers.filter(dev =>
            dev.username.toLowerCase().includes(search.toLowerCase())
        );
    }, [developers, search]);

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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-neutral-dark border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-100 focus:ring-1 focus:ring-primary outline-none transition-all shadow-xl"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 size={48} className="animate-spin text-primary" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest italic">Scanning Creators Network...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredDevs.length > 0 ? (
                            filteredDevs.map((dev) => (
                                <DevCard
                                    key={dev.id}
                                    {...dev}
                                    onToggleFollow={toggleFollow}
                                />
                            ))
                        ) : (
                            <div className="text-center py-20 bg-neutral-dark/40 border border-dashed border-slate-800 rounded-3xl">
                                <p className="text-slate-500 font-medium">No developers found in this sector.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
