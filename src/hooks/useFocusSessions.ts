import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { FocusSession } from '../types';
import { useAuth } from '../context/AuthContext';

export function useFocusSessions() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSessions([]);
      setLoading(false);
      return;
    }

    const fetchSessions = async () => {
      const { data, error } = await supabase
        .from('focus_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setSessions(
          data.map((s) => ({
            id: s.id,
            date: s.date,
            time: s.time,
            minutes: s.minutes,
          }))
        );
      }
      setLoading(false);
    };

    fetchSessions();
  }, [user]);

  const addSession = useCallback(
    async (minutes: number) => {
      if (!user) return;
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const { data, error } = await supabase
        .from('focus_sessions')
        .insert({
          user_id: user.id,
          date,
          time,
          minutes,
        })
        .select()
        .single();

      if (!error && data) {
        setSessions((prev) => [
          { id: data.id, date: data.date, time: data.time, minutes: data.minutes },
          ...prev,
        ]);
      }
    },
    [user]
  );

  return { sessions, loading, addSession };
}
