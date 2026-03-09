import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useMarketplace() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchItems = useCallback(async (filter = 'All') => {
        try {
            setLoading(true);
            let query = supabase
                .from('marketplace_items')
                .select(`
                    *,
                    author:profiles(username, avatar_url)
                `)
                .order('download_count', { ascending: false });

            if (filter === 'Verified') {
                // In a real app we might check for a 'verified' flag on profiles
                query = query.not('author_id', 'is', null);
            } else if (filter === 'New') {
                query = query.order('created_at', { ascending: false });
            }

            const { data, error } = await query;
            if (error) throw error;

            setItems(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const incrementDownload = async (itemId) => {
        try {
            const { data, error } = await supabase.rpc('increment_downloads', { item_id: itemId });
            if (error) throw error;
            // Optionally update local state
            setItems(prev => prev.map(item =>
                item.id === itemId ? { ...item, download_count: item.download_count + 1 } : item
            ));
        } catch (err) {
            console.error('Download error:', err.message);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return { items, loading, error, refreshItems: fetchItems, incrementDownload };
}
