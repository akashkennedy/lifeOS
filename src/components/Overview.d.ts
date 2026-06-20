import type { Todo, FocusSession, SavingsGoal, WellbeingEntry } from '../types';
interface OverviewProps {
    todos: Todo[];
    sessions: FocusSession[];
    savingsGoals: SavingsGoal[];
    wellbeing: WellbeingEntry[];
    onToggleTodo: (id: string) => void;
}
export declare function Overview({ todos, sessions, savingsGoals, wellbeing, onToggleTodo }: OverviewProps): import("react").JSX.Element;
export {};
