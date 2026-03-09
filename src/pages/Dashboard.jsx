import { Bell, Activity, MessageSquare, ChevronUp, Clock, Target, ArrowUpRight, BarChart3, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useActivity } from '../hooks/useActivity';
import { useIdeas } from '../hooks/useIdeas';

const ActivityItem = ({ activity_type, content_preview, created_at, user }) => (
    <div className="flex gap-4 p-4 hover:bg-white/5 rounded-2xl transition-all group cursor-pointer border border-transparent hover:border-white/5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 ${activity_type === 'upvote' ? 'bg-primary/10 text-primary' :
                activity_type === 'comment' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-accent-green/10 text-accent-green'
            }`}>
            {activity_type === 'upvote' ? <ChevronUp size={20} /> :
                activity_type === 'comment' ? <MessageSquare size={20} /> :
                    <Activity size={20} />}
        </div>
        <div className="flex flex-col gap-1 flex-1">
            <p className="text-sm text-slate-300 leading-tight">
                <span className="font-bold text-slate-100">@{user?.username || 'user'}</span>
                {activity_type === 'upvote' ? ' upvoted ' :
                    activity_type === 'comment' ? ' commented on ' :
                        activity_type === 'new_idea' ? ' posted a new idea: ' : ' activity on '}
                <span className="font-bold text-primary italic">"{content_preview}"</span>
            </p>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <Clock size={10} />
                {new Date(created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
        <ArrowUpRight size={16} className="text-slate-600 group-hover:text-primary transition-colors mt-1" />
    </div>
);

export default function Dashboard() {
    const { activities, loading: loadingActivity } = useActivity();
    const { ideas, loading: loadingIdeas } = useIdeas();

    const myIdeas = ideas.filter(i => i.is_own_idea); // Need to implement this in useIdeas

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
                                <span className="text-3xl font-black text-slate-100 italic">{ideas.length}</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Ideas</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-black text-accent-green italic">86%</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Growth</span>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col gap-4">
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Community Trends</h2>
                        <div className="flex flex-col gap-3">
                            {ideas.slice(0, 3).map((idea, i) => (
                                <div key={i} className="bg-neutral-dark/40 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 hover:border-slate-700 transition-all cursor-pointer">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-sm font-bold text-slate-200 truncate pr-4">{idea.title}</h3>
                                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full">{idea.status}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                        <span>Reactions</span>
                                        <span>{idea.upvotes} UPVOTES</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Middle: Activity Feed */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <section className="bg-neutral-dark border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col gap-4 min-h-[400px]">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Activity size={16} className="text-primary" />
                                Community Activity
                            </h2>
                        </div>

                        {loadingActivity ? (
                            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-500">
                                <Loader2 size={32} className="animate-spin text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Hydrating Live Feed...</span>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                {activities.length > 0 ? (
                                    activities.map((act, i) => (
                                        <ActivityItem key={i} {...act} />
                                    ))
                                ) : (
                                    <div className="text-center py-20 text-slate-600 text-xs font-bold uppercase tracking-widest">
                                        No recent activity detected.
                                    </div>
                                )}
                            </div>
                        )}
                    </section>

                    <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 flex items-center justify-between relative overflow-hidden group">
                        <div className="flex flex-col gap-2 relative z-10">
                            <h3 className="text-lg font-black text-slate-100 uppercase italic tracking-tight">Become a Top Architect</h3>
                            <p className="text-slate-400 text-sm max-w-md">Contribute ideas and build mods to increase your global reputation index.</p>
                        </div>
                        <div className="relative z-10">
                            <Target size={48} className="text-primary opacity-50 group-hover:scale-110 transition-transform" />
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
}
