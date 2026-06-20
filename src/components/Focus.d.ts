import type { FocusSession, Todo } from '../types';
interface FocusProps {
    sessions: FocusSession[];
    todos: Todo[];
    onSessionComplete: (minutes: number, taskId?: string | null) => void;
    onAddTodo: (text: string) => void;
}
export declare function Focus({ sessions, todos, onSessionComplete, onAddTodo }: FocusProps): import("react").JSX.Element;
export {};
