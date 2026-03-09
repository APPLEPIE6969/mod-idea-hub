import { Search, PlusCircle, Bell, User, LogOut, Settings, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function Navbar({ onPostClick, searchQuery, onSearchChange }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [user, setUser] = useState(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('username, avatar_url')
                    .eq('id', session.user.id)
                    .single();
                setUser({ ...session.user, profile });
            }
        };

        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                // Fetch profile again if needed or set user
                setUser(session.user);
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsProfileOpen(false);
    };

    return (
        <header className="fixed top-0 w-full z-50 glass-nav border-b border-white/5">
            <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2 text-primary no-underline group">
                        <motion.div
                            whileHover={{ rotate: 90 }}
                            className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors"
                        >
                            <PlusCircle size={20} className="text-primary" />
                        </motion.div>
                        <h1 className="text-xl font-black tracking-tighter text-slate-100 italic">
                            HUB<span className="text-primary">.</span>
                        </h1>
                    </Link>
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link to="/" className="text-xs font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-1 no-underline">Explore</Link>
                        <Link to="/marketplace" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors no-underline">Marketplace</Link>
                        <Link to="/devs" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors no-underline">Devs</Link>
                    </nav>
                </div>

                <div className="flex-1 flex justify-center max-w-xl px-4">
                    <div className="relative w-full group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search ideas, plugins, or creators..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full bg-neutral-dark/40 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary/30 focus:border-primary/50 transition-all outline-none text-slate-100 placeholder:text-slate-600"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onPostClick}
                        className="hidden md:flex items-center gap-2 bg-primary text-background-dark px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all border-none cursor-pointer shadow-lg shadow-primary/10"
                    >
                        <PlusCircle size={14} strokeWidth={3} />
                        Post Idea
                    </button>

                    <div className="h-8 w-px bg-slate-800 mx-1 hidden md:block"></div>

                    <button className="p-2 text-slate-500 hover:text-slate-100 transition-colors bg-transparent border-none cursor-pointer relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background-dark"></span>
                    </button>

                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-all bg-transparent border-none cursor-pointer group"
                        >
                            <img
                                src={user?.profile?.avatar_url || "https://api.dicebear.com/7.x/pixel-art/svg?seed=" + (user?.email || 'guest')}
                                alt="Profile"
                                className="w-8 h-8 rounded-lg border border-slate-700 bg-slate-800"
                            />
                            <ChevronDown size={14} className={`text-slate-500 group-hover:text-slate-300 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-3 w-56 bg-neutral-dark border border-slate-800 rounded-2xl shadow-2xl p-2 z-200 overflow-hidden"
                                >
                                    <div className="px-3 py-3 border-b border-white/5 mb-2">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Signed in as</p>
                                        <p className="text-sm font-bold text-slate-200 truncate">{user?.profile?.username || user?.email || 'Guest User'}</p>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all no-underline">
                                            <User size={16} />
                                            <span className="text-xs font-bold uppercase tracking-widest">My Profile</span>
                                        </Link>
                                        <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all no-underline w-full text-left">
                                            <LayoutDashboard size={16} />
                                            <span className="text-xs font-bold uppercase tracking-widest">Dashboard</span>
                                        </Link>
                                        <Link to="/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all no-underline w-full text-left">
                                            <Settings size={16} />
                                            <span className="text-xs font-bold uppercase tracking-widest">Settings</span>
                                        </Link>
                                    </div>

                                    <div className="mt-2 pt-2 border-t border-white/5">
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all no-underline bg-transparent border-none cursor-pointer w-full text-left"
                                        >
                                            <LogOut size={16} />
                                            <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
}
