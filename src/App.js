import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
function Dashboard() {
    const { user, loading: authLoading, signOut } = useAuth();
    const [section, setSection] = useLocalStorage('lifeos_section', 'overview');
    const { todos, loading: todosLoading, addTodo, toggleTodo, deleteTodo } = useTodos();
    const { goals, loading: goalsLoading, addGoal, toggleGoal, deleteGoal } = useGoalsHook();
    const { savingsGoals, loading: savingsLoading, addGoal: addSavingsGoal, contribute, deleteGoal: deleteSavingsGoal } = useSavingsGoals();
    const { sessions, loading: sessionsLoading, addSession } = useFocusSessions();
    const { entries, loading: wellbeingLoading, saveEntry } = useWellbeingHook();
    if (authLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-surface dark:bg-surface-dark", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-accent" }) }));
    }
    if (!user) {
        return _jsx(Auth, {});
    }
    const isLoading = todosLoading || goalsLoading || savingsLoading || sessionsLoading || wellbeingLoading;
    if (isLoading) {
        return (_jsx(Layout, { activeSection: section, onSectionChange: setSection, onSignOut: signOut, children: _jsx("div", { className: "flex items-center justify-center py-12", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-accent" }) }) }));
    }
    return (_jsxs(Layout, { activeSection: section, onSectionChange: setSection, onSignOut: signOut, children: [section === 'overview' && (_jsx(Overview, { todos: todos, sessions: sessions, savingsGoals: savingsGoals, wellbeing: entries, onToggleTodo: toggleTodo })), section === 'focus' && (_jsx(Focus, { sessions: sessions, todos: todos, onSessionComplete: addSession })), section === 'goals' && (_jsx(Goals, { todos: todos, goals: goals, onAddTodo: addTodo, onToggleTodo: toggleTodo, onDeleteTodo: deleteTodo, onAddGoal: addGoal, onToggleGoal: toggleGoal, onDeleteGoal: deleteGoal })), section === 'finance' && (_jsx(Finance, { savingsGoals: savingsGoals, onAddGoal: addSavingsGoal, onDeleteGoal: deleteSavingsGoal, onContribute: contribute })), section === 'wellbeing' && (_jsx(Wellbeing, { entries: entries, onSave: saveEntry }))] }));
}
function AppContent() {
    return (_jsx(AuthProvider, { children: _jsx(Dashboard, {}) }));
}
export default function App() {
    return (_jsx(ToastProvider, { children: _jsx(AppContent, {}) }));
}
//# sourceMappingURL=App.js.map