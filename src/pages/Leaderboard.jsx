import { Trophy, TrendingUp, ChevronUp, Loader2, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useDevelopers } from '../hooks/useDevelopers';
import { useMemo } from 'react';

const LeaderboardItem = ({ rank, username, reputation, mods_count, ideas_count, avatar_url }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: rank * 0.05 }}
        className="bg-neutral-dark/40 border border-slate-800 rounded-2xl p-4 flex items-center gap-6 hover:bg-neutral-dark/60 transition-colors group"
    >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg italic shadow-lg ${rank === 1 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
            rank === 2 ? 'bg-slate-300/20 text-slate-300 border border-slate-300/30' :
                rank === 3 ? 'bg-amber-600/20 text-amber-600 border border-amber-600/30' :
                    'bg-slate-800 text-slate-500'
            }`}>
            {rank}
        </div>

        <div className="flex items-center gap-3 flex-1 min-w-0">
            <img src={avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`} alt={username} className="w-10 h-10 rounded-lg bg-slate-800 object-cover" />
            <div className="flex flex-col truncate">
                <span className="text-sm font-bold text-slate-100 group-hover:text-primary transition-colors">{username}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Master Creator</span>
            </div>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
                <span className="text-sm font-black text-primary italic">{reputation}</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Rep</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-sm font-black text-accent-green italic">{mods_count}</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Mods</span>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-16 h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(reputation / 10, 100)}%` }}
                        className="h-full bg-primary shadow-[0_0_10px_rgba(13,242,242,0.5)]"
                    />
                </div>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Impact</span>
            </div>
        </div>

        <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 transition-colors bg-transparent border-none cursor-pointer">
            <ChevronUp size={20} />
        </button>
    </motion.div>
);

export default function Leaderboard() {
    const { developers, loading } = useDevelopers();

    const sortedDevs = useMemo(() => {
        return [...developers].sort((a, b) => b.reputation - a.reputation);
    }, [developers]);

    const topThree = sortedDevs.slice(0, 3);
    const others = sortedDevs.slice(3);

    return (
        <Layout>
            <div className="flex flex-col gap-12">
                <header className="text-center flex flex-col items-center gap-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center border border-primary/20 shadow-2xl shadow-primary/10"
                    >
                        <Trophy size={40} className="text-primary" />
                    </motion.div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-5xl font-black text-slate-100 tracking-tight uppercase italic">Leaderboard</h1>
                        <p className="text-slate-400 font-medium max-w-xl">Honoring the architects of the virtual worlds. Celebrating impact, creativity, and community engagement.</p>
                    </div>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 size={48} className="animate-spin text-primary opacity-50" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Calculating Global Standings...</span>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-red-500/10 border border-red-500/20 rounded-3xl">
                        <p className="text-red-400 font-bold uppercase tracking-widest text-xs">Error Accessing Rankings</p>
                        <p className="text-slate-400 text-sm mt-2">{error}</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {topThree.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ y: -8, scale: 1.005 }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                    className={`relative bg-neutral-dark border border-slate-800 rounded-3xl p-8 flex flex-col items-center gap-4 shadow-2xl overflow-hidden ${i === 0 ? 'border-yellow-500/30' : ''
                                        }`}
                                >
                                    {i === 0 && (
                                        <div className="absolute top-0 right-0 p-4">
                                            <Award className="text-yellow-500 opacity-20" size={64} />
                                        </div>
                                    )}
                                    <div className={`relative p-1 rounded-4xl border-4 ${i === 0 ? 'border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.2)]' :
                                        i === 1 ? 'border-slate-300 shadow-[0_0_20px_rgba(203,213,225,0.2)]' :
                                            'border-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.2)]'
                                        }`}>
                                        <img src={item.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${item.username}`} className="w-24 h-24 rounded-3xl bg-slate-800 object-cover" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-2xl font-black text-slate-100 italic uppercase truncate max-w-[200px]">{item.username}</h3>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${i === 0 ? 'text-yellow-500' :
                                            i === 1 ? 'text-slate-300' :
                                                'text-amber-600'
                                            }`}>
                                            RANK #{i + 1}
                                        </span>
                                    </div>
                                    <div className="flex gap-6 mt-4">
                                        <div className="text-center">
                                            <p className="text-xl font-black text-slate-100 italic">{item.reputation}</p>
                                            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Rep</p>
                                        </div>
                                        <div className="w-px h-8 bg-slate-800 self-center" />
                                        <div className="text-center">
                                            <p className="text-xl font-black text-slate-100 italic">{item.mods_count}</p>
                                            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Mods</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-4 mb-2 flex items-center gap-2">
                                <TrendingUp size={14} />
                                Global Standings
                            </h2>
                            {others.map((item, i) => (
                                <LeaderboardItem key={item.id} rank={i + 4} {...item} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}
