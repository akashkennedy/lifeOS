import type { FocusSession } from '../types';
export declare function useFocusSessions(): {
    sessions: FocusSession[];
    loading: boolean;
    addSession: (minutes: number, taskId?: string | null) => Promise<void>;
};
