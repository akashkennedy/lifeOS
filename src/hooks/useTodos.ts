import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Todo } from '../types';
import { useAuth } from '../context/AuthContext';
import { getDateString } from '../utils';

export function useTodos() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setTodos(
          data.map((t) => ({
            id: t.id,
            text: t.text,
            done: t.done,
            date: t.date,
          }))
        );
      }
      setLoading(false);
    };

    fetchTodos();
  }, [user]);

  const addTodo = useCallback(
    async (text: string) => {
      if (!user) return;
      const date = getDateString();
      const { data, error } = await supabase
        .from('todos')
        .insert({ user_id: user.id, text, done: false, date })
        .select()
        .single();

      if (!error && data) {
        setTodos((prev) => [
          { id: data.id, text: data.text, done: data.done, date: data.date },
          ...prev,
        ]);
      }
    },
    [user]
  );

  const toggleTodo = useCallback(
    async (id: string) => {
      if (!user) return;
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const { error } = await supabase
        .from('todos')
        .update({ done: !todo.done })
        .eq('id', id);

      if (!error) {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        );
      }
    },
    [user, todos]
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      if (!user) return;
      const { error } = await supabase.from('todos').delete().eq('id', id);

      if (!error) {
        setTodos((prev) => prev.filter((t) => t.id !== id));
      }
    },
    [user]
  );

  return { todos, loading, addTodo, toggleTodo, deleteTodo };
}
