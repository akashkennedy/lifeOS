import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
export function useFocusSessions() {
    const { user } = useAuth();
    const [sessions, setSessions] = useState([]);
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
                .select('*, todos(text)')
                .order('created_at', { ascending: false });
            if (!error && data) {
                setSessions(data.map((s) => ({
                    id: s.id,
                    date: s.date,
                    time: s.time,
                    minutes: s.minutes,
                    task_id: s.task_id ?? null,
                    task_text: s.todos?.text ?? null,
                })));
            }
            setLoading(false);
        };
        fetchSessions();
    }, [user]);
    const addSession = useCallback(async (minutes, taskId) => {
        if (!user)
            return;
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
        const insertData = {
            user_id: user.id,
            date,
            time,
            minutes,
        };
        if (taskId)
            insertData.task_id = taskId;
        const { data, error } = await supabase
            .from('focus_sessions')
            .insert(insertData)
            .select('*, todos(text)')
            .single();
        if (!error && data) {
            setSessions((prev) => [
                {
                    id: data.id,
                    date: data.date,
                    time: data.time,
                    minutes: data.minutes,
                    task_id: data.task_id ?? null,
                    task_text: data.todos?.text ?? null,
                },
                ...prev,
            ]);
        }
    }, [user]);
    return { sessions, loading, addSession };
}
//# sourceMappingURL=useFocusSessions.js.map