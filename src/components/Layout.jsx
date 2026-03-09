import { Box, Puzzle, Wrench, Paintbrush, Trophy, Layout as LayoutIcon } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false }) => (
    <a href="#" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-neutral-dark'
        }`}>
        <Icon size={20} />
        <span className={`text-sm ${active ? 'font-semibold' : 'font-medium'}`}>{label}</span>
    </a>
);

export default function Layout({ children }) {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
            <main className="max-w-[1440px] mx-auto pt-24 px-6 grid grid-cols-12 gap-8">
                {/* Left Sidebar */}
                <aside className="col-span-3 hidden lg:flex flex-col gap-8 sticky top-24 h-fit">
                    <section className="flex flex-col gap-2">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Categories</h3>
                        <div className="flex flex-col gap-1">
                            <SidebarItem icon={Box} label="Minecraft Mods" active />
                            <SidebarItem icon={Puzzle} label="Server Plugins" />
                            <SidebarItem icon={Wrench} label="Developer Tools" />
                            <SidebarItem icon={Paintbrush} label="Asset Packs" />
                        </div>
                    </section>

                    <section className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Trending Tags</h3>
                        <div className="flex flex-wrap gap-2 px-2">
                            {['Optimization', 'Shaders', 'PaperMC', 'Forge', 'Fabric'].map(tag => (
                                <span key={tag} className="px-2 py-1 rounded bg-neutral-dark border border-slate-800 text-xs text-slate-300 hover:border-primary/40 cursor-pointer transition-colors">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="bg-neutral-dark/40 border border-slate-800/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Trophy size={20} className="text-primary" />
                            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-tight">Top Ideators</h3>
                        </div>
                        <div className="flex flex-col gap-4">
                            {[
                                { name: 'AlexCraft', pts: '1,240', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb3Q0kDDsw--Dz_wflUHGlcr-R0fnTamTB6q-SXR8Oj3IRqGGMoXgrWBf9OaQ3pnt3nrwr6qA71nIHSIoR22_78HW_HjwL5mGrrarMGLJdRdgikfoIxSSNM2Ek6kNSI4elo4pBHcLd6wZQJBWryQ_Qo9DimtechHadDJ5I9Bf7LcITWQUPkLv_P6C4zKWSJnBlAEwY2DZmyvHNKOmplmRBZ0r9NPHSFkSHKThIWxUbHzO8ATtPRQm71OXNC7gRmbAWjzAnnObm9Nc' },
                                { name: 'PixelMaster', pts: '980', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUsCNlgLC-x1bUoGigloLUTHeon5v2w6eTwOf4MfrxwLD75kqdOnGuMQBqCqpQ3sXSFofnCJ_6rkXk2Ljmmv3ft9qTj1jhTLtMLJc4khGz-reQKzAX-SexaF7eZHpteU5R3r6_OCOMrBNHe2Vl3_waFEq2MNPnFwKpUDMMZzV0uPsiu2RLdSK_C9J8t6JA6ptMY1jdkCzzl30rBWz2HY2MeRwa_zFp0P5EFndAhpHjov4XUFaKJ4QZmSGVkrDF67HXRZFsi7n8tBQ' },
                                { name: 'NovaDev', pts: '850', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1AaUZqcribDMmY0Bc8WAuOQdLEZhzgIEqbz-yh8MJOnRIL9Mo_0SeoDdYYi7ihss5q0N8zuvLpMgmQsVcqZMOdveDAEyzwGPvaXhHOtM56fHxKULtWcYDMZeitdtKn-ynrWmJgHesO5Xxlz3Ib-C__V12-3L_b3uvwjP-vK4YG08lGDUBm4jxb-ryUL64RV1yHxgVDTV1C2AZ2Wzv8I-mWycee0PmlYl00K-XXnSAYRgUOKLK9TpCznqCpbezN48y_n9NrtLq_b4' }
                            ].map(user => (
                                <div key={user.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-slate-700" />
                                        <span className="text-xs font-medium">@{user.name}</span>
                                    </div>
                                    <span className="text-[10px] text-primary font-bold">{user.pts} pts</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </aside>

                {/* Main Feed */}
                <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
                    {children}
                </div>

                {/* Right Sidebar */}
                <aside className="col-span-3 hidden xl:flex flex-col gap-6 sticky top-24 h-fit">
                    <div className="bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 rounded-xl p-5">
                        <h3 className="text-slate-100 font-bold mb-2">New Feature!</h3>
                        <p className="text-xs text-slate-400 mb-4">You can now directly fund mod concepts using our integrated developer bounties system.</p>
                        <button className="w-full bg-primary/20 text-primary border border-primary/40 py-2 rounded font-bold text-xs hover:bg-primary/30 transition-all outline-none">Learn More</button>
                    </div>

                    <section className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Community Stats</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-neutral-dark border border-slate-800 p-3 rounded-lg">
                                <div className="text-primary text-lg font-black">4.2k</div>
                                <div className="text-[10px] text-slate-500 uppercase font-bold">Ideas Posted</div>
                            </div>
                            <div className="bg-neutral-dark border border-slate-800 p-3 rounded-lg">
                                <div className="text-accent-green text-lg font-black">156</div>
                                <div className="text-[10px] text-slate-500 uppercase font-bold">Mods Shipped</div>
                            </div>
                        </div>
                    </section>

                    <footer className="mt-8 px-2">
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                            {['About', 'Privacy', 'Terms', 'API'].map(link => (
                                <a key={link} href="#" className="text-[10px] text-slate-600 hover:text-slate-400 transition-colors">{link}</a>
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-700">© 2024 ModHub Premium Creators. All rights reserved.</p>
                    </footer>
                </aside>
            </main>
        </div>
    );
}
