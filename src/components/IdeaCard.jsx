import { ChevronUp, ChevronDown, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';

export default function IdeaCard({ idea }) {
    const { title, author, category, status, upvotes = 0, comments = 0, tags = [] } = idea;

    return (
        <div className="glass p-5 rounded-2xl flex gap-5 hover:border-white/20 transition-all group cursor-pointer">
            {/* Voting Sidebar */}
            <div className="flex flex-col items-center gap-1 mt-1">
                <button className="p-1.5 rounded-lg hover:bg-white/5 hover:text-accent-neon transition-colors">
                    <ChevronUp size={24} />
                </button>
                <span className="text-sm font-bold">{upvotes}</span>
                <button className="p-1.5 rounded-lg hover:bg-white/5 hover:text-red-400 transition-colors">
                    <ChevronDown size={24} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 text-[11px] font-bold uppercase tracking-wider">
                    <span className={`badge ${status === 'Verified' ? 'badge-verified' :
                            status === 'In Progress' ? 'badge-in-progress' : 'badge-concept'
                        }`}>
                        {status}
                    </span>
                    <span className="text-text-muted">•</span>
                    <span className="text-accent-neon">{category}</span>
                    <span className="text-text-muted">•</span>
                    <span className="text-text-muted">Posted by {author}</span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-accent-neon transition-colors">{title}</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-white/5 px-2 py-0.5 rounded-md text-text-secondary border border-white/5 hover:border-white/10">
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-6 text-text-secondary">
                    <button className="flex items-center gap-2 text-xs font-semibold hover:bg-white/5 px-3 py-1.5 rounded-lg transition-all">
                        <MessageSquare size={16} />
                        {comments} Comments
                    </button>
                    <button className="flex items-center gap-2 text-xs font-semibold hover:bg-white/5 px-3 py-1.5 rounded-lg transition-all">
                        <Share2 size={16} />
                        Share
                    </button>
                    <button className="ml-auto p-1.5 hover:bg-white/5 rounded-lg transition-all">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
