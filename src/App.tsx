import { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/Layout';
import { Overview } from './components/Overview';
import { Focus } from './components/Focus';
import { Goals } from './components/Goals';
import { Finance } from './components/Finance';
import { Wellbeing } from './components/Wellbeing';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Todo, Goal, SavingsGoal, FocusSession, WellbeingEntry, Section } from './types';

const STORAGE_KEYS = {
  todos: 'lifeos_todos',
  goals: 'lifeos_goals',
  savings: 'lifeos_savings',
  sessions: 'lifeos_sessions',
  wellbeing: 'lifeos_wellbeing',
  section: 'lifeos_section',
};

function AppContent() {
  const [section, setSection] = useLocalStorage<Section>(STORAGE_KEYS.section, 'overview');
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEYS.todos, []);
  const [goals, setGoals] = useLocalStorage<Goal[]>(STORAGE_KEYS.goals, []);
  const [savingsGoals, setSavingsGoals] = useLocalStorage<SavingsGoal[]>(STORAGE_KEYS.savings, []);
  const [sessions, setSessions] = useLocalStorage<FocusSession[]>(STORAGE_KEYS.sessions, []);
  const [wellbeing, setWellbeing] = useLocalStorage<WellbeingEntry[]>(STORAGE_KEYS.wellbeing, []);

  // Todo handlers
  const addTodo = (todo: Todo) => setTodos((prev) => [...prev, todo]);
  const toggleTodo = (id: string) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  const deleteTodo = (id: string) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  // Goal handlers
  const addGoal = (goal: Goal) => setGoals((prev) => [...prev, goal]);
  const toggleGoal = (id: string) =>
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g))
    );
  const deleteGoal = (id: string) =>
    setGoals((prev) => prev.filter((g) => g.id !== id));

  // Savings handlers
  const addSavingsGoal = (goal: SavingsGoal) =>
    setSavingsGoals((prev) => [...prev, goal]);
  const deleteSavingsGoal = (id: string) =>
    setSavingsGoals((prev) => prev.filter((g) => g.id !== id));
  const contributeToGoal = (id: string, amount: number) =>
    setSavingsGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, saved: g.saved + amount } : g))
    );

  // Focus session handler
  const addSession = (session: FocusSession) =>
    setSessions((prev) => [...prev, session]);

  // Wellbeing handler
  const saveWellbeing = (entry: WellbeingEntry) =>
    setWellbeing((prev) => {
      const existing = prev.findIndex((e) => e.date === entry.date);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = entry;
        return updated;
      }
      return [...prev, entry];
    });

  return (
    <Layout activeSection={section} onSectionChange={setSection}>
      {section === 'overview' && (
        <Overview
          todos={todos}
          sessions={sessions}
          savingsGoals={savingsGoals}
          wellbeing={wellbeing}
          onToggleTodo={toggleTodo}
        />
      )}
      {section === 'focus' && (
        <Focus sessions={sessions} onSessionComplete={addSession} />
      )}
      {section === 'goals' && (
        <Goals
          todos={todos}
          goals={goals}
          onAddTodo={addTodo}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onAddGoal={addGoal}
          onToggleGoal={toggleGoal}
          onDeleteGoal={deleteGoal}
        />
      )}
      {section === 'finance' && (
        <Finance
          savingsGoals={savingsGoals}
          onAddGoal={addSavingsGoal}
          onDeleteGoal={deleteSavingsGoal}
          onContribute={contributeToGoal}
        />
      )}
      {section === 'wellbeing' && (
        <Wellbeing entries={wellbeing} onSave={saveWellbeing} />
      )}
    </Layout>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
