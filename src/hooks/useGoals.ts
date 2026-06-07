import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Goal } from '../types';
import { useAuth } from '../context/AuthContext';

export function useGoals() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setGoals([]);
      setLoading(false);
      return;
    }

    const fetchGoals = async () => {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setGoals(
          data.map((g) => ({
            id: g.id,
            title: g.title,
            category: g.category,
            dueDate: g.due_date,
            done: g.done,
          }))
        );
      }
      setLoading(false);
    };

    fetchGoals();
  }, [user]);

  const addGoal = useCallback(
    async (goal: Omit<Goal, 'id'>) => {
      if (!user) return;
      const { data, error } = await supabase
        .from('goals')
        .insert({
          user_id: user.id,
          title: goal.title,
          category: goal.category,
          due_date: goal.dueDate || null,
          done: goal.done,
        })
        .select()
        .single();

      if (!error && data) {
        setGoals((prev) => [
          {
            id: data.id,
            title: data.title,
            category: data.category,
            dueDate: data.due_date,
            done: data.done,
          },
          ...prev,
        ]);
      }
    },
    [user]
  );

  const toggleGoal = useCallback(
    async (id: string) => {
      if (!user) return;
      const goal = goals.find((g) => g.id === id);
      if (!goal) return;

      const { error } = await supabase
        .from('goals')
        .update({ done: !goal.done })
        .eq('id', id);

      if (!error) {
        setGoals((prev) =>
          prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g))
        );
      }
    },
    [user, goals]
  );

  const deleteGoal = useCallback(
    async (id: string) => {
      if (!user) return;
      const { error } = await supabase.from('goals').delete().eq('id', id);

      if (!error) {
        setGoals((prev) => prev.filter((g) => g.id !== id));
      }
    },
    [user]
  );

  return { goals, loading, addGoal, toggleGoal, deleteGoal };
}
