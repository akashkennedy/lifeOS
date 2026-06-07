import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { WellbeingEntry } from '../types';
import { useAuth } from '../context/AuthContext';

export function useWellbeing() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<WellbeingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setEntries([]);
      setLoading(false);
      return;
    }

    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from('wellbeing_entries')
        .select('*')
        .order('date', { ascending: false });

      if (!error && data) {
        setEntries(
          data.map((e) => ({
            id: e.id,
            date: e.date,
            mood: e.mood,
            sleep: e.sleep,
            water: e.water,
            exercised: e.exercised,
            note: e.note || '',
          }))
        );
      }
      setLoading(false);
    };

    fetchEntries();
  }, [user]);

  const saveEntry = useCallback(
    async (entry: Omit<WellbeingEntry, 'id'>) => {
      if (!user) return;
      const existing = entries.find((e) => e.date === entry.date);

      if (existing) {
        const { error } = await supabase
          .from('wellbeing_entries')
          .update({
            mood: entry.mood,
            sleep: entry.sleep,
            water: entry.water,
            exercised: entry.exercised,
            note: entry.note,
          })
          .eq('id', existing.id);

        if (!error) {
          setEntries((prev) =>
            prev.map((e) =>
              e.id === existing.id
                ? { ...e, ...entry }
                : e
            )
          );
        }
      } else {
        const { data, error } = await supabase
          .from('wellbeing_entries')
          .insert({
            user_id: user.id,
            date: entry.date,
            mood: entry.mood,
            sleep: entry.sleep,
            water: entry.water,
            exercised: entry.exercised,
            note: entry.note,
          })
          .select()
          .single();

        if (!error && data) {
          setEntries((prev) => [
            {
              id: data.id,
              date: data.date,
              mood: data.mood,
              sleep: data.sleep,
              water: data.water,
              exercised: data.exercised,
              note: data.note || '',
            },
            ...prev,
          ]);
        }
      }
    },
    [user, entries]
  );

  return { entries, loading, saveEntry };
}
