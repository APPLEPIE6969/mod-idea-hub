import { Settings, Plus, LayoutGrid, List, MessageSquare, Heart, Trophy, Globe, Github, Twitter, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';
import IdeaCard from '../components/IdeaCard';

export default function ProfileDashboard() {
    const [user, setUser] = useState(null);
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const { data: { user: authUser } } = await supabase.auth.getUser();
                if (!authUser) {
                    setLoading(false);
                    return;
                }

                // Fetch Profile
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', authUser.id)
                    .single();

                // Fetch User's Ideas
                const { data: userIdeas } = await supabase
                    .from('mod_ideas')
                    .select(`
                        *,
                        author:profiles(username, avatar_url),
                        reactions(reaction_type, user_id)
                    `)
                    .eq('author_id', authUser.id)
                    .order('created_at', { ascending: false });

                setUser(profile || { username: authUser.email.split('@')[0] });
                setIdeas(userIdeas?.map(idea => ({
                    ...idea,
                    author: idea.author?.username || 'Anonymous',
                    upvotes: (idea.reactions || []).reduce((acc, curr) => acc + curr.reaction_type, 0)
                })) || []);
            } catch (err) {
                console.error('Error fetching profile:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) return (
        <Layout>
            <div className="text-center py-20 text-slate-500 italic">Preparing your dashboard...</div>
        </Layout>
    );

    if (!user) return (
        <Layout>
            <div className="text-center py-20 text-slate-500">
                <p className="mb-4 italic">Please sign in to view your profile dashboard.</p>
                <button className="bg-primary text-background-dark px-6 py-2 rounded-lg font-bold">Sign In</button>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <div className="max-w-5xl mx-auto flex flex-col gap-8">
                {/* Profile Header */}
                <div className="relative bg-linear-to-tr from-primary/20 via-neutral-dark to-background-dark border border-slate-800 rounded-3xl p-8 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-20 -mt-20"></div>

                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6 relative z-10">
                        <div className="relative group">
                            <img
                                src={user.avatar_url || "https://api.dicebear.com/7.x/pixel-art/svg?seed=" + user.username}
                                alt={user.username}
                                className="w-32 h-32 rounded-4xl border-4 border-background-dark shadow-2xl group-hover:scale-105 transition-transform bg-slate-800"
                            />
                            <Link to="/settings" className="absolute bottom-1 right-1 bg-primary text-background-dark p-2 rounded-2xl shadow-lg border-2 border-background-dark hover:scale-110 transition-transform cursor-pointer">
                                <Settings size={16} />
                            </Link>
                        </div>

                        <div className="flex-1 flex flex-col gap-2 text-center md:text-left">
                            <h1 className="text-4xl font-black text-slate-100 tracking-tight uppercase italic">{user.username}</h1>
                            <p className="text-slate-400 max-w-xl font-medium leading-relaxed">
                                {user.bio || "Crafting the future of Minecraft mods. Addicted to procedural generation and performance optimization."}
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                                <div className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors cursor-pointer">
                                    <Github size={16} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Github</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors cursor-pointer">
                                    <Twitter size={16} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Twitter</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500 hover:text-slate-200 transition-colors cursor-pointer">
                                    <ExternalLink size={16} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Website</span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:grid grid-cols-2 gap-3 pb-2">
                            <div className="bg-background-dark/50 border border-slate-800 rounded-2xl p-4 flex flex-col items-center min-w-[100px] shadow-lg">
                                <span className="text-2xl font-black text-primary italic">24</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Total Ideas</span>
                            </div>
                            <div className="bg-background-dark/50 border border-slate-800 rounded-2xl p-4 flex flex-col items-center min-w-[100px] shadow-lg">
                                <span className="text-2xl font-black text-accent-green italic">1.2k</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Upvotes</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Tabs & Actions */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-8">
                        <button className="text-primary font-black text-sm uppercase tracking-widest border-b-2 border-primary pb-4 bg-transparent border-none cursor-pointer">My Submissions</button>
                        <button className="text-slate-500 font-bold text-sm uppercase tracking-widest pb-4 hover:text-slate-300 transition-all bg-transparent border-none cursor-pointer">Saved Ideas</button>
                        <button className="text-slate-500 font-bold text-sm uppercase tracking-widest pb-4 hover:text-slate-300 transition-all bg-transparent border-none cursor-pointer">Activity Feed</button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex bg-neutral-dark rounded-lg p-1 border border-slate-800">
                            <button className="p-1.5 bg-slate-800 rounded-md text-primary border-none cursor-pointer"><LayoutGrid size={16} /></button>
                            <button className="p-1.5 text-slate-500 bg-transparent border-none cursor-pointer"><List size={16} /></button>
                        </div>
                    </div>
                </div>

                {/* Profile Feed */}
                <div className="grid grid-cols-1 gap-4">
                    {ideas.length > 0 ? (
                        ideas.map(idea => (
                            <IdeaCard key={idea.id} idea={idea} onVote={() => { }} />
                        ))
                    ) : (
                        <div className="py-20 text-center bg-neutral-dark rounded-3xl border border-slate-800 border-dashed">
                            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                                <Plus size={32} className="text-slate-500" />
                            </div>
                            <h3 className="text-slate-300 font-bold mb-2 uppercase tracking-tight">No ideas posted yet</h3>
                            <p className="text-slate-500 text-sm mb-6">Start by sharing your first brilliant mod or plugin idea.</p>
                            <button className="bg-primary text-background-dark px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                                SUBMIT NEW IDEA
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
