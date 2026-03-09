import { ChevronUp, ChevronDown, MessageSquare, Share2, ArrowLeft, MoreHorizontal, Send } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';

export default function IdeaDetailView() {
    const { id } = useParams();
    const [idea, setIdea] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');

    const fetchIdea = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('mod_ideas')
                .select(`
                    *,
                    author:profiles(username, avatar_url),
                    reactions(reaction_type, user_id)
                `)
                .eq('id', id)
                .single();

            if (error) throw error;

            const processedIdea = {
                ...data,
                author: data.author?.username || 'Anonymous',
                avatar: data.author?.avatar_url,
                upvotes: (data.reactions || []).reduce((acc, curr) => acc + curr.reaction_type, 0)
            };

            setIdea(processedIdea);
        } catch (err) {
            console.error('Error fetching idea:', err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async (type) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert('Please sign in to vote!');
                return;
            }

            const { error } = await supabase
                .from('reactions')
                .upsert({
                    idea_id: id,
                    user_id: user.id,
                    reaction_type: type
                }, { onConflict: 'idea_id, user_id' });

            if (error) throw error;
            fetchIdea();
        } catch (err) {
            console.error('Voting error:', err.message);
        }
    };

    useEffect(() => {
        if (id) fetchIdea();
    }, [id]);

    if (loading) return (
        <Layout>
            <div className="min-h-screen bg-background-dark pt-24 text-center text-slate-500">Loading idea details...</div>
        </Layout>
    );

    if (!idea) return (
        <Layout>
            <div className="min-h-screen bg-background-dark pt-24 text-center text-slate-500 italic">Idea not found.</div>
        </Layout>
    );

    return (
        <Layout>
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
                <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors no-underline w-fit group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Back to feed</span>
                </Link>

                <article className="bg-neutral-dark border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-8 flex flex-col md:flex-row gap-8">
                        {/* Vote Sidebar */}
                        <div className="flex md:flex-col items-center gap-2 min-w-[48px]">
                            <button
                                onClick={() => handleVote(1)}
                                className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-500 hover:text-primary hover:bg-primary/10 transition-all border-none cursor-pointer"
                            >
                                <ChevronUp size={32} />
                            </button>
                            <span className="text-xl font-black text-slate-100 italic">{idea.upvotes}</span>
                            <button
                                onClick={() => handleVote(-1)}
                                className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all border-none cursor-pointer"
                            >
                                <ChevronDown size={32} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${idea.status === 'Verified' ? 'bg-accent-green/20 text-accent-green' : 'bg-primary/20 text-primary'
                                        }`}>
                                        {idea.status || 'Draft'}
                                    </div>
                                    <span className="text-slate-500 text-xs font-semibold">•</span>
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{idea.category}</span>
                                </div>
                                <button className="text-slate-600 hover:text-slate-300 transition-colors bg-transparent border-none cursor-pointer">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 leading-tight">{idea.title}</h1>

                            <div className="flex items-center gap-3 py-2">
                                <img src={idea.avatar || "https://api.dicebear.com/7.x/pixel-art/svg?seed=" + idea.author} alt={idea.author} className="w-10 h-10 rounded-full border-2 border-primary/20 bg-slate-800" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-200">@{idea.author}</span>
                                    <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">MOD ARCHITECT</span>
                                </div>
                            </div>

                            <div className="text-slate-300 text-lg leading-relaxed py-6 border-y border-white/5 my-4">
                                {idea.description}
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <MessageSquare size={20} className="text-primary" />
                                    <span className="text-sm font-bold">Discussion Open</span>
                                </div>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        alert('Link copied!');
                                    }}
                                    className="flex items-center gap-2 text-slate-400 hover:text-slate-100 transition-colors bg-transparent border-none cursor-pointer"
                                >
                                    <Share2 size={20} />
                                    <span className="text-sm font-bold">Share Idea</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Comment Section */}
                    <div className="bg-background-dark/30 border-t border-slate-800 p-8">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-widest">Discussion</h3>
                            <div className="relative">
                                <textarea
                                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none min-h-[120px] resize-none"
                                    placeholder="What are your thoughts on this idea? Be constructive!"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                                <button className="absolute bottom-4 right-4 bg-primary text-background-dark p-2 rounded-lg hover:opacity-90 transition-opacity border-none cursor-pointer shadow-lg shadow-primary/20">
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="mt-4 flex flex-col gap-4 opacity-50 italic text-slate-500 text-sm text-center py-4 border border-dashed border-slate-800 rounded-xl">
                                No comments yet. Start the conversation!
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </Layout>
    );
}
