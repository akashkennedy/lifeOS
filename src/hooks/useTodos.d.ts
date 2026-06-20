import type { Todo } from '../types';
export declare function useTodos(): {
    todos: Todo[];
    loading: boolean;
    addTodo: (text: string) => Promise<void>;
    toggleTodo: (id: string) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
};
