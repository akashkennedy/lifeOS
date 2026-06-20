import type { FocusSession, Todo } from '../types';
interface FocusProps {
    sessions: FocusSession[];
    todos: Todo[];
    onSessionComplete: (minutes: number, taskId?: string | null) => void;
}
export declare function Focus({ sessions, todos, onSessionComplete }: FocusProps): import("react").JSX.Element;
export {};
