import type { Goal } from '../types';
export declare function useGoals(): {
    goals: Goal[];
    loading: boolean;
    addGoal: (goal: Omit<Goal, "id">) => Promise<void>;
    toggleGoal: (id: string) => Promise<void>;
    deleteGoal: (id: string) => Promise<void>;
};
