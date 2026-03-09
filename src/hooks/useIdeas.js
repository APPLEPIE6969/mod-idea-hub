import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useIdeas() {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchIdeas = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('mod_ideas')
                .select(`
          *,
          author:profiles(username),
          reactions(reaction_type)
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Process upvotes/downvotes
            const processedIdeas = data.map(idea => ({
                ...idea,
                author: idea.author?.username || 'Anonymous',
                upvotes: (idea.reactions || []).reduce((acc, curr) => acc + curr.reaction_type, 0),
                comments: 0
            }));

            setIdeas(processedIdeas);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchIdeas();
    }, [fetchIdeas]);

    return { ideas, loading, error, refresh: fetchIdeas };
}
