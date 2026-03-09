import { Bell, Activity, MessageSquare, ChevronUp, Clock, Target, ArrowUpRight, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useIdeas } from '../hooks/useIdeas';

const ActivityItem = ({ type, text, time, user, highlight }) => (
    <div className="flex gap-4 p-4 hover:bg-white/5 rounded-2xl transition-all group cursor-pointer border border-transparent hover:border-white/5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 ${type === 'upvote' ? 'bg-primary/10 text-primary' :
                type === 'comment' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-accent-green/10 text-accent-green'
            }`}>
            {type === 'upvote' ? <ChevronUp size={20} /> :
                type === 'comment' ? <MessageSquare size={20} /> :
                    <Activity size={20} />}
        </div>
        <div className="flex flex-col gap-1 flex-1">
            <p className="text-sm text-slate-300 leading-tight">
                <span className="font-bold text-slate-100">@{user}</span> {text} <span className="font-bold text-primary italic">"{highlight}"</span>
            </p>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <Clock size={10} />
                {time}
            </div>
        </div>
        <ArrowUpRight size={16} className="text-slate-600 group-hover:text-primary transition-colors mt-1" />
    </div>
);

export default function Dashboard() {
    const { ideas } = useIdeas();

    // Placeholder data
    const activities = [
        { type: 'upvote', user: 'PixelWizard', text: 'upvoted your idea', highlight: 'Procedural Alchemy', time: '2 MINS AGO' },
        { type: 'comment', user: 'VoidWalker', text: 'commented on', highlight: 'Nexus Gates', time: '15 MINS AGO' },
        { type: 'status', user: 'System', text: 'updated status of', highlight: 'Chrono-Craft', time: '1 HOUR AGO' },
        { type: 'upvote', user: 'NatureGuard', text: 'upvoted your idea', highlight: 'Primal Spirits', time: '3 HOURS AGO' },
        { type: 'comment', user: 'EnergyMage', text: 'responded to your comment in', highlight: 'Flux Generators', time: '5 HOURS AGO' },
    ];

    const projects = [
        { name: 'Procedural Alchemy', progress: 75, status: 'In Development' },
        { name: 'Nexus Gates', progress: 40, status: 'Concept' },
        { name: 'Chrono-Craft', progress: 90, status: 'Testing' },
    ];

    return (
        <Layout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Stats & Projects */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <section className="bg-neutral-dark border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all"></div>
                        <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <BarChart3 size={16} className="text-primary" />
                            Performance
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-black text-slate-100 italic">1.2k</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Reach</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-black text-accent-green italic">86%</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Approval</span>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col gap-4">
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Active Projects</h2>
                        <div className="flex flex-col gap-3">
                            {projects.map((p, i) => (
                                <div key={i} className="bg-neutral-dark/40 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 hover:border-slate-700 transition-all cursor-pointer">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-sm font-bold text-slate-200">{p.name}</h3>
                                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full">{p.status}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${p.progress}%` }}
                                            className="h-full bg-primary shadow-[0_0_10px_rgba(13,242,242,0.4)]"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                        <span>Progress</span>
                                        <span>{p.progress}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Middle: Activity Feed */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <section className="bg-neutral-dark border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col gap-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Activity size={16} className="text-primary" />
                                Community Activity
                            </h2>
                            <button className="text-[10px] font-bold text-slate-500 hover:text-primary transition-colors bg-transparent border-none cursor-pointer uppercase tracking-widest">Mark all read</button>
                        </div>
                        <div className="flex flex-col">
                            {activities.map((act, i) => (
                                <ActivityItem key={i} {...act} />
                            ))}
                        </div>
                        <button className="mt-4 w-full py-3 bg-slate-800/50 hover:bg-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-widest rounded-xl transition-all border-none cursor-pointer">
                            Load More History
                        </button>
                    </section>

                    <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 flex items-center justify-between relative overflow-hidden group">
                        <div className="flex flex-col gap-2 relative z-10">
                            <h3 className="text-lg font-black text-slate-100 uppercase italic tracking-tight">Become a Top Architect</h3>
                            <p className="text-slate-400 text-sm max-w-md">Reach 5,000 community impact points to unlock premium project icons and verified status.</p>
                        </div>
                        <div className="relative z-10">
                            <Target size={48} className="text-primary opacity-50 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </section>
                </div>
            </div>
        </Layout>
    );
}
