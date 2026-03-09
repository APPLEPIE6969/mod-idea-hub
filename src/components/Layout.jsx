import { Home, Compass, Terminal, Shield, TrendingUp, Hash } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false }) => (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all ${active ? 'bg-accent-neon/10 text-accent-neon font-medium' : 'text-text-secondary hover:bg-white/5 hover:text-white'
        }`}>
        <Icon size={19} />
        <span className="text-sm">{label}</span>
    </div>
);

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex container mt-6 gap-8">
                {/* Sidebar */}
                <aside className="hidden lg:flex flex-col gap-6 w-64 flex-shrink-0 sticky top-24 h-[calc(100vh-120px)] overflow-y-auto pr-2 pb-8">
                    <div className="flex flex-col gap-1">
                        <SidebarItem icon={Home} label="Home" active />
                        <SidebarItem icon={Compass} label="Browse Ideas" />
                        <SidebarItem icon={TrendingUp} label="Trending" />
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider px-4">Categories</h3>
                        <div className="flex flex-col gap-1">
                            <SidebarItem icon={Terminal} label="Minecraft Mods" />
                            <SidebarItem icon={Hash} label="Plugins" />
                            <SidebarItem icon={Shield} label="Tools & Utilities" />
                        </div>
                    </div>

                    <div className="glass p-4 rounded-2xl mt-4 border-dashed border-white/10">
                        <h3 className="text-sm font-semibold mb-2">Top Researchers</h3>
                        <div className="flex -space-x-2 overflow-hidden mb-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-bg-deep bg-accent-green/20" />
                            ))}
                        </div>
                        <p className="text-[10px] text-text-muted">Join 1.2k developers building the next generation of mods.</p>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 pb-12 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
