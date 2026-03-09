import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useIdeas() {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    const fetchIdeas = useCallback(async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('mod_ideas')
                .select(`
                    *,
                    author:profiles(username, avatar_url),
                    reactions(reaction_type, user_id)
                `)
                .order('created_at', { ascending: false });

            if (categoryFilter !== 'All') {
                query = query.eq('category', categoryFilter);
            }

            if (searchQuery) {
                query = query.ilike('title', `%${searchQuery}%`);
            }

            const { data, error } = await query;

            if (error) throw error;

            // Process upvotes/downvotes
            const processedIdeas = data.map(idea => ({
                ...idea,
                author: idea.author?.username || 'Anonymous',
                avatar: idea.author?.avatar_url,
                upvotes: (idea.reactions || []).reduce((acc, curr) => acc + curr.reaction_type, 0),
                comments: 0 // Mocking comments for now
            }));

            setIdeas(processedIdeas);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, categoryFilter]);

    const voteIdea = async (ideaId, type) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert('Please sign in to vote!');
                return;
            }

            // Logic for single vote per user (upsert)
            const { error } = await supabase
                .from('reactions')
                .upsert({
                    idea_id: ideaId,
                    user_id: user.id,
                    reaction_type: type
                }, { onConflict: 'idea_id, user_id' });

            if (error) throw error;
            fetchIdeas(); // Refresh feed
        } catch (err) {
            console.error('Voting error:', err.message);
        }
    };

    useEffect(() => {
        fetchIdeas();
    }, [fetchIdeas]);

    return {
        ideas,
        loading,
        error,
        refreshIdeas: fetchIdeas,
        voteIdea,
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter
    };
}
