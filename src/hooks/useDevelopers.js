import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useDevelopers() {
    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDevelopers = useCallback(async () => {
        try {
            setLoading(true);
            // In a real app, you'd use a more complex query or a view for idea/mod counts
            // For now, we'll fetch profiles and their follow status
            const { data: { user } } = await supabase.auth.getUser();

            const { data, error } = await supabase
                .from('profiles')
                .select(`
                    id, 
                    username, 
                    avatar_url, 
                    bio, 
                    reputation,
                    is_verified,
                    mod_ideas!mod_ideas_author_id_fkey(id),
                    marketplace_items!marketplace_items_author_id_fkey(id),
                    followers:follows!follows_following_id_fkey(follower_id),
                    is_following:follows!follows_following_id_fkey(follower_id)
                `)
                .order('reputation', { ascending: false });

            if (error) throw error;

            const processedDevs = data.map(dev => ({
                ...dev,
                ideas_count: dev.mod_ideas?.length || 0,
                mods_count: dev.marketplace_items?.length || 0,
                followers_count: dev.followers?.length || 0,
                am_following: user && dev.is_following?.some(f => f.follower_id === user.id)
            }));

            setDevelopers(processedDevs);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const toggleFollow = async (devId, currentFollowStatus) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert('Sign in to follow developers!');
                return;
            }

            if (currentFollowStatus) {
                await supabase
                    .from('follows')
                    .delete()
                    .eq('follower_id', user.id)
                    .eq('following_id', devId);
            } else {
                await supabase
                    .from('follows')
                    .insert({ follower_id: user.id, following_id: devId });
            }
            fetchDevelopers();
        } catch (err) {
            console.error('Follow error:', err.message);
        }
    };

    useEffect(() => {
        fetchDevelopers();
    }, [fetchDevelopers]);

    return { developers, loading, error, refreshDevelopers: fetchDevelopers, toggleFollow };
}
