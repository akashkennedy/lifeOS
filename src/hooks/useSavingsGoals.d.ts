import type { SavingsGoal } from '../types';
export declare function useSavingsGoals(): {
    savingsGoals: SavingsGoal[];
    loading: boolean;
    addGoal: (goal: Omit<SavingsGoal, "id">) => Promise<void>;
    contribute: (id: string, amount: number) => Promise<void>;
    deleteGoal: (id: string) => Promise<void>;
};
