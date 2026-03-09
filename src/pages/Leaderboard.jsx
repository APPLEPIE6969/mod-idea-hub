import { Trophy, TrendingUp, Users, Target, ChevronUp, Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

const LeaderboardItem = ({ rank, username, upvotes, projects, engagement, avatar }) => (
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
            <img src={avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`} alt={username} className="w-10 h-10 rounded-lg bg-slate-800" />
            <div className="flex flex-col truncate">
                <span className="text-sm font-bold text-slate-100 group-hover:text-primary transition-colors">{username}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Master Creator</span>
            </div>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
                <span className="text-sm font-black text-primary italic">{upvotes}</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Upvotes</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-sm font-black text-accent-green italic">{projects}</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Projects</span>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-16 h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${engagement}%` }}
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
    const topThree = [
        { rank: 1, username: 'EnergyMage', upvotes: '24.2k', projects: 24, engagement: 95, avatar: null },
        { rank: 2, username: 'TimeKeeper', upvotes: '18.5k', projects: 18, engagement: 82, avatar: null },
        { rank: 3, username: 'Caelum', upvotes: '15.1k', projects: 12, engagement: 74, avatar: null },
    ];

    const others = [
        { rank: 4, username: 'VoidWalker', upvotes: '12.4k', projects: 8, engagement: 65 },
        { rank: 5, username: 'NatureGuard', upvotes: '9.2k', projects: 5, engagement: 58 },
        { rank: 6, username: 'Alchemix', upvotes: '8.1k', projects: 4, engagement: 52 },
        { rank: 7, username: 'RedstoneKing', upvotes: '7.5k', projects: 10, engagement: 48 },
        { rank: 8, username: 'PixelArtist', upvotes: '6.9k', projects: 2, engagement: 42 },
    ];

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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {topThree.map(item => (
                        <motion.div
                            key={item.rank}
                            whileHover={{ y: -10 }}
                            className={`relative bg-neutral-dark border border-slate-800 rounded-3xl p-8 flex flex-col items-center gap-4 shadow-2xl overflow-hidden ${item.rank === 1 ? 'border-yellow-500/30' : ''
                                }`}
                        >
                            {item.rank === 1 && (
                                <div className="absolute top-0 right-0 p-4">
                                    <Award className="text-yellow-500 opacity-20" size={64} />
                                </div>
                            )}
                            <div className={`relative p-1 rounded-4xl border-4 ${item.rank === 1 ? 'border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.2)]' :
                                    item.rank === 2 ? 'border-slate-300 shadow-[0_0_20px_rgba(203,213,225,0.2)]' :
                                        'border-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.2)]'
                                }`}>
                                <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${item.username}`} className="w-24 h-24 rounded-3xl bg-slate-800" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-black text-slate-100 italic uppercase">{item.username}</h3>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${item.rank === 1 ? 'text-yellow-500' :
                                        item.rank === 2 ? 'text-slate-300' :
                                            'text-amber-600'
                                    }`}>
                                    RANK #{item.rank}
                                </span>
                            </div>
                            <div className="flex gap-6 mt-4">
                                <div className="text-center">
                                    <p className="text-xl font-black text-slate-100 italic">{item.upvotes}</p>
                                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Votes</p>
                                </div>
                                <div className="w-px h-8 bg-slate-800 self-center" />
                                <div className="text-center">
                                    <p className="text-xl font-black text-slate-100 italic">{item.projects}</p>
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
                    {others.map(item => (
                        <LeaderboardItem key={item.rank} {...item} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
