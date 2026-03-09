import { Search, Bell, Plus, User } from 'lucide-react';

export default function Navbar({ onPostClick }) {
    return (
        <nav className="glass sticky top-0 z-50 px-6 py-3 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-8">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 cursor-pointer">
                    <span className="text-accent-neon">Mod</span>Hub
                </h1>

                <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 min-w-[320px] focus-within:border-accent-neon/50 transition-all">
                    <Search size={18} className="text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search mod ideas..."
                        className="bg-transparent border-none focus:outline-none px-3 text-sm w-full text-white"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={onPostClick}
                    className="flex items-center gap-2 bg-gradient-to-r from-accent-neon to-accent-green text-bg-deep border-none font-bold hover:opacity-90 active:scale-95 transition-all px-4 py-2 rounded-full text-sm"
                >
                    <Plus size={18} strokeWidth={3} />
                    POST IDEA
                </button>

                <button className="p-2 text-text-secondary hover:text-white transition-colors flex-center">
                    <Bell size={20} />
                </button>

                <div className="w-9 h-9 rounded-full bg-accent-neon/20 border border-accent-neon/30 flex-center cursor-pointer hover:border-accent-neon transition-all">
                    <User size={18} className="text-accent-neon" />
                </div>
            </div>
        </nav>
    );
}
