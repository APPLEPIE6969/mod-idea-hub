import { ChevronUp, ChevronDown, MessageSquare, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function IdeaCard({ idea, onVote }) {
    const { id, title, description, author, category, status, upvotes = 0, comments = 0 } = idea;

    const voteDisplay = upvotes >= 1000 ? (upvotes / 1000).toFixed(1) + 'k' : upvotes;

    const handleShare = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(`${window.location.origin}/idea/${id}`);
        alert('Link copied to clipboard!');
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="idea-card bg-neutral-dark border border-slate-800 rounded-xl p-5 flex gap-6 transition-all group hover:border-primary/40 hover:shadow-[0_8px_30px_rgb(13,242,242,0.05)]"
        >
            <div className="flex flex-col items-center gap-1 min-w-[40px]">
                <motion.button
                    whileTap={{ scale: 1.2 }}
                    onClick={() => onVote(id, 1)}
                    className="text-slate-500 hover:text-primary transition-colors bg-transparent border-none p-0 cursor-pointer outline-none"
                >
                    <ChevronUp size={32} />
                </motion.button>
                <span className="font-bold text-slate-200">{voteDisplay}</span>
                <motion.button
                    whileTap={{ scale: 1.2 }}
                    onClick={() => onVote(id, -1)}
                    className="text-slate-500 hover:text-red-500 transition-colors bg-transparent border-none p-0 cursor-pointer outline-none"
                >
                    <ChevronDown size={32} />
                </motion.button>
            </div>
            <Link to={`/idea/${id}`} className="flex-1 flex flex-col gap-2 no-underline cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${status === 'Verified' ? 'bg-accent-green/20 text-accent-green' :
                            status === 'In Progress' ? 'bg-primary/20 text-primary' : 'bg-slate-500/20 text-slate-400'
                        }`}>
                        {status || 'Draft'}
                    </span>
                    <span className="text-slate-500 text-xs font-medium tracking-tight">• Posted by <span className="text-slate-300 font-bold group-hover:text-primary transition-colors lowercase">@{author || 'anonymous'}</span></span>
                </div>
                <h2 className="text-xl font-bold text-slate-100 group-hover:text-primary transition-colors tracking-tight">{title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors">
                            <MessageSquare size={18} />
                            <span className="text-xs font-semibold">{comments} Comments</span>
                        </div>
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors bg-transparent border-none p-0 cursor-pointer"
                        >
                            <Share2 size={18} />
                            <span className="text-xs font-semibold">Share</span>
                        </button>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
