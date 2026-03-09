import { User, Mail, Shield, Bell, Github, Twitter, Globe, Save, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const SettingsSection = ({ title, children }) => (
    <section className="flex flex-col gap-6 bg-neutral-dark border border-slate-800 rounded-3xl p-8 shadow-xl">
        <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">{title}</h3>
        <div className="flex flex-col gap-6">
            {children}
        </div>
    </section>
);

const InputField = ({ label, icon: Icon, ...props }) => (
    <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">{label}</label>
        <div className="relative group">
            <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" />
            <input
                {...props}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
            />
        </div>
    </div>
);

const ToggleSwitch = ({ label, description, enabled, onToggle }) => (
    <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors">
        <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-slate-200">{label}</span>
            <span className="text-[10px] text-slate-500 font-medium">{description}</span>
        </div>
        <button
            onClick={onToggle}
            className={`w-12 h-6 rounded-full relative transition-all duration-300 ${enabled ? 'bg-primary' : 'bg-slate-800'}`}
        >
            <motion.div
                animate={{ x: enabled ? 26 : 4 }}
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md`}
            />
        </button>
    </div>
);

export default function Settings() {
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({
        username: '',
        bio: '',
        avatar_url: '',
        github: '',
        twitter: '',
        website: ''
    });

    const [notifications, setNotifications] = useState({
        upvotes: true,
        comments: true,
        milestones: false
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
                if (data) setProfile(data);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    ...profile,
                    updated_at: new Date()
                });
            if (error) throw error;
            alert('Settings saved successfully!');
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto flex flex-col gap-8">
                <header className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-black text-slate-100 tracking-tight uppercase italic">Settings</h1>
                        <p className="text-slate-400 font-medium">Manage your digital identity and community preferences.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-primary text-background-dark px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                        <Save size={18} strokeWidth={3} />
                        {loading ? 'SAVING...' : 'SAVE CHANGES'}
                    </button>
                </header>

                <div className="flex flex-col gap-6">
                    <SettingsSection title="Profile Information">
                        <div className="flex items-center gap-6 mb-4">
                            <div className="relative group">
                                <img
                                    src={profile.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${profile.username || 'user'}`}
                                    alt="Preview"
                                    className="w-24 h-24 rounded-3xl border-4 border-slate-800 bg-slate-900 object-cover shadow-2xl"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-background-dark/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl cursor-pointer">
                                    <Camera size={24} className="text-primary" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <InputField
                                    label="Avatar URL"
                                    icon={Globe}
                                    value={profile.avatar_url}
                                    onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                                    placeholder="Link to your profile picture..."
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Username"
                                icon={User}
                                value={profile.username}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                placeholder="Your public name"
                            />
                            <InputField
                                label="Email Address"
                                icon={Mail}
                                value="user@example.com"
                                disabled
                                className="opacity-50 cursor-not-allowed w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-500 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Bio</label>
                            <textarea
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-slate-100 focus:ring-1 focus:ring-primary outline-none transition-all min-h-[120px] resize-none"
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                placeholder="Tell the community about yourself..."
                            />
                        </div>
                    </SettingsSection>

                    <SettingsSection title="Social Connections">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputField
                                label="GitHub"
                                icon={Github}
                                value={profile.github}
                                onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                                placeholder="Username"
                            />
                            <InputField
                                label="Twitter"
                                icon={Twitter}
                                value={profile.twitter}
                                onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                                placeholder="@handle"
                            />
                            <InputField
                                label="Website"
                                icon={Globe}
                                value={profile.website}
                                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>
                    </SettingsSection>

                    <SettingsSection title="Community Notifications">
                        <div className="grid grid-cols-1 gap-4">
                            <ToggleSwitch
                                label="New Upvotes"
                                description="Get notified when someone upvotes your mod ideas."
                                enabled={notifications.upvotes}
                                onToggle={() => setNotifications({ ...notifications, upvotes: !notifications.upvotes })}
                            />
                            <ToggleSwitch
                                label="Comments"
                                description="Get notified when someone joins the discussion on your posts."
                                enabled={notifications.comments}
                                onToggle={() => setNotifications({ ...notifications, comments: !notifications.comments })}
                            />
                            <ToggleSwitch
                                label="Milestone Updates"
                                description="Receive alerts when projects you follow reach new development stages."
                                enabled={notifications.milestones}
                                onToggle={() => setNotifications({ ...notifications, milestones: !notifications.milestones })}
                            />
                        </div>
                    </SettingsSection>

                    <SettingsSection title="Account Security">
                        <button
                            onClick={async () => {
                                const { data: { user } } = await supabase.auth.getUser();
                                if (user) {
                                    const { error } = await supabase.auth.resetPasswordForEmail(user.email);
                                    if (error) alert(error.message);
                                    else alert('Password reset email sent!');
                                }
                            }}
                            className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer w-fit font-bold uppercase text-[10px] tracking-widest"
                        >
                            <Shield size={16} />
                            Reset Password
                        </button>
                    </SettingsSection>
                </div>
            </div>
        </Layout>
    );
}
