import type { Todo, Goal } from '../types';
interface GoalsProps {
    todos: Todo[];
    goals: Goal[];
    onAddTodo: (text: string) => void;
    onToggleTodo: (id: string) => void;
    onDeleteTodo: (id: string) => void;
    onAddGoal: (goal: Omit<Goal, 'id'>) => void;
    onToggleGoal: (id: string) => void;
    onDeleteGoal: (id: string) => void;
}
export declare function Goals({ todos, goals, onAddTodo, onToggleTodo, onDeleteTodo, onAddGoal, onToggleGoal, onDeleteGoal, }: GoalsProps): import("react").JSX.Element;
export {};
