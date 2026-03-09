import { Search, PlusCircle, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ onPostClick, searchQuery, onSearchChange }) {
    return (
        <header className="fixed top-0 w-full z-50 glass-nav">
            <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2 text-primary no-underline">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/20 hover:border-primary/50 transition-colors">
                            <PlusCircle size={20} className="text-primary" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-100">
                            Hub<span className="text-primary">.</span>
                        </h1>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-sm font-medium text-primary border-b-2 border-primary pb-1 no-underline">Explore</Link>
                        <a href="#" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors no-underline">Marketplace</a>
                        <a href="#" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors no-underline">Developers</a>
                        <a href="#" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors no-underline">Docs</a>
                    </nav>
                </div>

                <div className="flex flex-1 justify-center max-w-xl px-8">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" size={16} />
                        <input
                            type="text"
                            placeholder="Search mods, plugins, or creators..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full bg-neutral-dark/50 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-slate-100"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={onPostClick}
                        className="flex items-center gap-2 bg-primary text-background-dark px-4 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity border-none cursor-pointer"
                    >
                        <PlusCircle size={16} />
                        <span>Post Idea</span>
                    </button>
                    <div className="h-8 w-px bg-slate-800 mx-2"></div>
                    <button className="text-slate-400 hover:text-slate-100 transition-colors relative bg-transparent border-none p-1 cursor-pointer">
                        <Bell size={20} />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-background-dark"></span>
                    </button>
                    <Link to="/profile" className="w-10 h-10 rounded-full bg-neutral-dark border border-slate-700 overflow-hidden cursor-pointer block">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOpSc6dH_ukL5_UDEZwLrLLluyX40w_A4kcCur4QDtQg1HYMnyWfeZXhm1fqCgVZY2PWkwVaDOqUh5HXhtMh1xWM9UPKvj50eJxLBVer4i3vzNvk5Zs2Sgk5Cni82h2lX0xTZJ8hUu-kWqDDPtI648ixWNQWmyZuVwdp1ru1eNmr6Pb59x12CKL7l7W9L0hNzYaBuyvmEFVbew-X9_Jfn9azkVMxIimSDE5Whu215e8FDc66siopC93tK0UMdLtoB5OtbO863h0s"
                            alt="User Profile"
                            className="w-full h-full object-cover"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}
