import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { SavingsGoal } from '../types';
import { useAuth } from '../context/AuthContext';

export function useSavingsGoals() {
  const { user } = useAuth();
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSavingsGoals([]);
      setLoading(false);
      return;
    }

    const fetchGoals = async () => {
      const { data, error } = await supabase
        .from('savings_goals')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setSavingsGoals(
          data.map((g) => ({
            id: g.id,
            name: g.name,
            target: g.target,
            saved: g.saved,
          }))
        );
      }
      setLoading(false);
    };

    fetchGoals();
  }, [user]);

  const addGoal = useCallback(
    async (goal: Omit<SavingsGoal, 'id'>) => {
      if (!user) return;
      const { data, error } = await supabase
        .from('savings_goals')
        .insert({
          user_id: user.id,
          name: goal.name,
          target: goal.target,
          saved: goal.saved,
        })
        .select()
        .single();

      if (!error && data) {
        setSavingsGoals((prev) => [
          { id: data.id, name: data.name, target: data.target, saved: data.saved },
          ...prev,
        ]);
      }
    },
    [user]
  );

  const contribute = useCallback(
    async (id: string, amount: number) => {
      if (!user) return;
      const goal = savingsGoals.find((g) => g.id === id);
      if (!goal) return;

      const newSaved = goal.saved + amount;
      const { error } = await supabase
        .from('savings_goals')
        .update({ saved: newSaved })
        .eq('id', id);

      if (!error) {
        setSavingsGoals((prev) =>
          prev.map((g) => (g.id === id ? { ...g, saved: newSaved } : g))
        );
      }
    },
    [user, savingsGoals]
  );

  const deleteGoal = useCallback(
    async (id: string) => {
      if (!user) return;
      const { error } = await supabase
        .from('savings_goals')
        .delete()
        .eq('id', id);

      if (!error) {
        setSavingsGoals((prev) => prev.filter((g) => g.id !== id));
      }
    },
    [user]
  );

  return { savingsGoals, loading, addGoal, contribute, deleteGoal };
}
