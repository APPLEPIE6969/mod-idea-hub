import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, UserPlus, Mail, Lock, Loader2, Github } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AuthModal({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { username },
                        emailRedirectTo: window.location.origin
                    }
                });
                if (error) throw error;
                alert('Success! Check your email for a confirmation link.');
            }
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-background-dark/80 backdrop-blur-md"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 10 }}
                    transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                    className="relative w-full max-w-md bg-neutral-dark border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-100"
                >
                    <div className="h-1.5 bg-linear-to-r from-primary to-accent-green"></div>

                    <div className="p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20">
                                    {isLogin ? <LogIn className="text-primary" size={24} /> : <UserPlus className="text-primary" size={24} />}
                                </div>
                                <h2 className="text-2xl font-black text-slate-100 italic tracking-tight uppercase">
                                    {isLogin ? 'Welcome Back' : 'Join the Hub'}
                                </h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-slate-100 transition-all bg-transparent border-none cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold uppercase tracking-widest text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {!isLogin && (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Username</label>
                                    <div className="relative">
                                        <LogIn className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                        <input
                                            required
                                            type="text"
                                            placeholder="master_modder_99"
                                            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-slate-100 focus:ring-1 focus:ring-primary outline-none transition-all"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Email Protocol</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                    <input
                                        required
                                        type="email"
                                        placeholder="user@multiverse.net"
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-slate-100 focus:ring-1 focus:ring-primary outline-none transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Access Key</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                    <input
                                        required
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-slate-100 focus:ring-1 focus:ring-primary outline-none transition-all"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full bg-primary text-background-dark py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2"
                            >
                                {loading ? <Loader2 className="animate-spin" size={16} /> : (isLogin ? 'ACTIVATE SESSION' : 'INITIALIZE ACCOUNT')}
                            </button>
                        </form>

                        <div className="mt-8 flex flex-col gap-4">
                            <div className="relative flex items-center">
                                <div className="grow border-t border-slate-800"></div>
                                <span className="shrink mx-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Or continue with</span>
                                <div className="grow border-t border-slate-800"></div>
                            </div>

                            <button className="w-full bg-slate-800 text-slate-100 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-700 transition-all cursor-pointer border-none flex items-center justify-center gap-2">
                                <Github size={16} />
                                Github
                            </button>

                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="w-full bg-transparent text-slate-500 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:text-primary transition-all cursor-pointer border-none"
                            >
                                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
