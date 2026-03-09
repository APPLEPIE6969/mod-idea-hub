import { Map, Zap, Award, Edit3, Settings, ExternalLink } from 'lucide-react';
import Layout from '../components/Layout';

export default function ProfileDashboard() {
    const user = {
        username: 'LunarDev',
        displayName: 'Aiden Mitchell',
        bio: 'Core Maintainer @PaperMC. Building high-performance Minecraft infrastructure and essential server utilities.',
        joined: 'March 2024',
        stats: { ideas: 42, solved: 15, impact: '1.2M' },
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOpSc6dH_ukL5_UDEZwLrLLluyX40w_A4kcCur4QDtQg1HYMnyWfeZXhm1fqCgVZY2PWkwVaDOqUh5HXhtMh1xWM9UPKvj50eJxLBVer4i3vzNvk5Zs2Sgk5Cni82h2lX0xTZJ8hUu-kWqDDPtI648ixWNQWmyZuVwdp1ru1eNmr6Pb59x12CKL7l7W9L0hNzYaBuyvmEFVbew-X9_Jfn9azkVMxIimSDE5Whu215e8FDc66siopC93tK0UMdLtoB5OtbO863h0s'
    };

    return (
        <Layout>
            <div className="flex flex-col gap-8">
                <header className="bg-neutral-dark border border-slate-800 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-accent-green rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <img src={user.avatar} className="relative w-40 h-40 rounded-full border-4 border-background-dark object-cover" />
                        <button className="absolute bottom-2 right-2 bg-primary p-2 rounded-full text-background-dark shadow-lg hover:scale-110 transition-transform bg-transparent border-none cursor-pointer">
                            <Edit3 size={18} strokeWidth={3} />
                        </button>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                            <h1 className="text-4xl font-black text-slate-100 italic">{user.displayName}</h1>
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20 w-fit mx-auto md:mx-0">Verified Developer</span>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-6">{user.bio}</p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <button className="bg-primary text-background-dark px-6 py-3 rounded-2xl font-black text-sm hover:opacity-90 active:scale-95 transition-all bg-transparent border-none cursor-pointer">EDIT PROFILE</button>
                            <button className="bg-neutral-dark border border-slate-800 text-slate-300 px-6 py-3 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all bg-transparent cursor-pointer">SHARE PROFILE</button>
                        </div>
                    </div>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-neutral-dark border border-slate-800 p-8 rounded-[2rem]">
                        <Map size={32} className="text-primary mx-auto mb-4" />
                        <div className="text-3xl font-black text-slate-100">{user.stats.ideas}</div>
                        <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 mt-2">Ideas Proposed</div>
                    </div>
                    <div className="bg-neutral-dark border border-slate-800 p-8 rounded-[2rem]">
                        <Zap size={32} className="text-accent-green mx-auto mb-4" />
                        <div className="text-3xl font-black text-slate-100">{user.stats.solved}</div>
                        <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 mt-2">Concepts Claimed</div>
                    </div>
                    <div className="bg-neutral-dark border border-slate-800 p-8 rounded-[2rem]">
                        <Award size={32} className="text-primary mx-auto mb-4" />
                        <div className="text-3xl font-black text-slate-100">{user.stats.impact}</div>
                        <div className="text-[10px] uppercase font-black tracking-widest text-slate-500 mt-2">Community Impact</div>
                    </div>
                </section>

                <section className="flex flex-col gap-6">
                    <div className="flex items-center justify-between px-4">
                        <h2 className="text-xl font-black text-slate-100 uppercase tracking-tighter">Your Active Ideas</h2>
                        <a href="#" className="text-xs font-bold text-primary hover:underline">View All</a>
                    </div>
                    <div className="bg-neutral-dark border border-slate-800 border-dashed py-20 rounded-[2.5rem] flex flex-col items-center justify-center text-center px-10">
                        <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-6">
                            <ExternalLink size={24} className="text-slate-600" />
                        </div>
                        <p className="text-slate-500 max-w-sm mb-6">You haven't posted any public ideas yet. Start sharing to build your reputation!</p>
                        <button className="bg-primary/20 text-primary border border-primary/40 px-8 py-3 rounded-2xl font-black text-xs hover:bg-primary/30 transition-all bg-transparent cursor-pointer">CREATE NEW IDEA</button>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
