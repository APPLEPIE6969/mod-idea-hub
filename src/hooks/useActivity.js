import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useActivity() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchActivity = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('activity_log')
                .select(`
                    *,
                    user:profiles(username, avatar_url)
                `)
                .order('created_at', { ascending: false })
                .limit(20);

            if (error) throw error;
            setActivities(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchActivity();

        // Subscribe to real-time activity updates
        const channel = supabase
            .channel('public:activity_log')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_log' }, (payload) => {
                fetchActivity(); // Refresh when new activity is inserted
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchActivity]);

    return { activities, loading, error, refreshActivity: fetchActivity };
}
