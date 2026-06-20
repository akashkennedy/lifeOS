import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Overview } from './components/Overview';
import { Focus } from './components/Focus';
import { Goals } from './components/Goals';
import { Finance } from './components/Finance';
import { Wellbeing } from './components/Wellbeing';
import { Auth } from './components/Auth';
import { useTodos } from './hooks/useTodos';
import { useGoals as useGoalsHook } from './hooks/useGoals';
import { useSavingsGoals } from './hooks/useSavingsGoals';
import { useFocusSessions } from './hooks/useFocusSessions';
import { useWellbeing as useWellbeingHook } from './hooks/useWellbeing';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Section } from './types';

function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [section, setSection] = useLocalStorage<Section>('lifeos_section', 'overview');

  const { todos, loading: todosLoading, addTodo, toggleTodo, deleteTodo } = useTodos();
  const { goals, loading: goalsLoading, addGoal, toggleGoal, deleteGoal } = useGoalsHook();
  const { savingsGoals, loading: savingsLoading, addGoal: addSavingsGoal, contribute, deleteGoal: deleteSavingsGoal } = useSavingsGoals();
  const { sessions, loading: sessionsLoading, addSession } = useFocusSessions();
  const { entries, loading: wellbeingLoading, saveEntry } = useWellbeingHook();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-surface-dark">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const isLoading = todosLoading || goalsLoading || savingsLoading || sessionsLoading || wellbeingLoading;

  if (isLoading) {
    return (
      <Layout activeSection={section} onSectionChange={setSection} onSignOut={signOut}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeSection={section} onSectionChange={setSection} onSignOut={signOut}>
      {section === 'overview' && (
        <Overview
          todos={todos}
          sessions={sessions}
          savingsGoals={savingsGoals}
          wellbeing={entries}
          onToggleTodo={toggleTodo}
        />
      )}
      {section === 'focus' && (
        <Focus sessions={sessions} todos={todos} onSessionComplete={addSession} />
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
          onContribute={contribute}
        />
      )}
      {section === 'wellbeing' && (
        <Wellbeing entries={entries} onSave={saveEntry} />
      )}
    </Layout>
  );
}

function AppContent() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
