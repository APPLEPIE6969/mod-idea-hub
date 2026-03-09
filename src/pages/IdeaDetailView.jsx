import { ArrowLeft, ChevronUp, ChevronDown, MessageSquare, Share2, Bookmark, Flag } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';

export default function IdeaDetailView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [idea, setIdea] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchIdea() {
            const { data, error } = await supabase
                .from('mod_ideas')
                .select(`
                    *,
                    profiles:author_id (username, avatar_url)
                `)
                .eq('id', id)
                .single();

            if (data) setIdea(data);
            setLoading(false);
        }
        fetchIdea();
    }, [id]);

    if (loading) return <Layout><div className="animate-pulse h-96 bg-neutral-dark rounded-3xl" /></Layout>;
    if (!idea) return <Layout><div className="text-center py-20">Idea not found</div></Layout>;

    return (
        <Layout>
            <div className="flex flex-col gap-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm bg-transparent border-none cursor-pointer w-fit"
                >
                    <ArrowLeft size={18} />
                    BACK TO FEED
                </button>

                <div className="flex gap-8">
                    {/* Main Content Card */}
                    <div className="flex-1 bg-neutral-dark border border-slate-800 rounded-3xl p-8 flex flex-col gap-6">
                        <header className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${idea.status === 'Verified' ? 'bg-accent-green/20 text-accent-green' :
                                        idea.status === 'In Progress' ? 'bg-primary/20 text-primary' : 'bg-slate-500/20 text-slate-400'
                                    }`}>
                                    {idea.status}
                                </span>
                                <span className="text-slate-500 text-xs font-bold uppercase tracking-tight">{idea.category}</span>
                            </div>
                            <h1 className="text-4xl font-black text-slate-100 leading-tight italic">{idea.title}</h1>

                            <div className="flex items-center gap-4 py-4 border-y border-white/5">
                                <img
                                    src={idea.profiles?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuD1AaUZqcribDMmY0Bc8WAuOQdLEZhzgIEqbz-yh8MJOnRIL9Mo_0SeoDdYYi7ihss5q0N8zuvLpMgmQsVcqZMOdveDAEyzwGPvaXhHOtM56fHxKULtWcYDMZeitdtKn-ynrWmJgHesO5Xxlz3Ib-C__V12-3L_b3uvwjP-vK4YG08lGDUBm4jxb-ryUL64RV1yHxgVDTV1C2AZ2Wzv8I-mWycee0PmlYl00K-XXnSAYRgUOKLK9TpCznqCpbezN48y_n9NrtLq_b4"}
                                    alt={idea.profiles?.username}
                                    className="w-10 h-10 rounded-full border border-slate-700"
                                />
                                <div className="flex flex-col">
                                    <span className="text-slate-200 font-bold text-sm">@{idea.profiles?.username || 'Guest'}</span>
                                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Idea Proposer</span>
                                </div>
                            </div>
                        </header>

                        <div className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
                            {idea.description}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {idea.tags?.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-slate-800 text-xs text-slate-400 font-medium whitespace-nowrap">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <footer className="mt-8 flex items-center justify-between pt-6 border-t border-white/5">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
                                    <button className="p-2 hover:bg-white/10 text-slate-500 hover:text-primary transition-all bg-transparent border-none cursor-pointer">
                                        <ChevronUp size={24} />
                                    </button>
                                    <span className="font-bold text-slate-200">{idea.upvotes || 0}</span>
                                    <button className="p-2 hover:bg-white/10 text-slate-500 hover:text-red-500 transition-all bg-transparent border-none cursor-pointer">
                                        <ChevronDown size={24} />
                                    </button>
                                </div>
                                <button className="flex items-center gap-2 text-slate-400 hover:text-slate-200 font-bold text-sm bg-transparent border-none cursor-pointer">
                                    <MessageSquare size={20} />
                                    {idea.comments || 0} Comments
                                </button>
                                <button className="flex items-center gap-2 text-slate-400 hover:text-slate-200 font-bold text-sm bg-transparent border-none cursor-pointer">
                                    <Share2 size={20} />
                                    Share
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-3 hover:bg-white/5 text-slate-500 hover:text-slate-200 transition-all bg-transparent border-none cursor-pointer rounded-xl border border-slate-800">
                                    <Bookmark size={20} />
                                </button>
                                <button className="p-3 hover:bg-white/5 text-slate-500 hover:text-red-400 transition-all bg-transparent border-none cursor-pointer rounded-xl border border-slate-800">
                                    <Flag size={20} />
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
