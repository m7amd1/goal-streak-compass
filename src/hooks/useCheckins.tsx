
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Checkin } from '@/types/database';
import { useAuth } from '@/hooks/useAuth';

export function useCheckins(goalId?: string) {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCheckins = async () => {
    if (!user) return;
    
    setLoading(true);
    let query = supabase
      .from('checkins')
      .select('*')
      .eq('user_id', user.id)
      .order('check_date', { ascending: false });

    if (goalId) {
      query = query.eq('goal_id', goalId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching checkins:', error);
    } else {
      setCheckins(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCheckins();
  }, [user, goalId]);

  const createCheckin = async (checkinData: Omit<Checkin, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('checkins')
      .insert([{ ...checkinData, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error creating checkin:', error);
      return null;
    }

    await fetchCheckins();
    return data;
  };

  const getGoalProgress = (goalId: string) => {
    const goalCheckins = checkins.filter(c => c.goal_id === goalId);
    const progressCheckins = goalCheckins.filter(c => c.made_progress);
    return goalCheckins.length > 0 ? Math.round((progressCheckins.length / goalCheckins.length) * 100) : 0;
  };

  return {
    checkins,
    loading,
    createCheckin,
    getGoalProgress,
    refreshCheckins: fetchCheckins,
  };
}
