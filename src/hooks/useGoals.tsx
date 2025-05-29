
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Goal } from '@/types/database';
import { useAuth } from '@/hooks/useAuth';

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchGoals = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching goals:', error);
    } else {
      setGoals(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGoals();
  }, [user]);

  const createGoal = async (goalData: Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('goals')
      .insert([{ ...goalData, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error creating goal:', error);
      return null;
    }

    await fetchGoals();
    return data;
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    const { error } = await supabase
      .from('goals')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating goal:', error);
      return false;
    }

    await fetchGoals();
    return true;
  };

  const deleteGoal = async (id: string) => {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting goal:', error);
      return false;
    }

    await fetchGoals();
    return true;
  };

  return {
    goals,
    loading,
    createGoal,
    updateGoal,
    deleteGoal,
    refreshGoals: fetchGoals,
  };
}
