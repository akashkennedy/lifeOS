import type { SavingsGoal } from '../types';
interface FinanceProps {
    savingsGoals: SavingsGoal[];
    onAddGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
    onDeleteGoal: (id: string) => void;
    onContribute: (goalId: string, amount: number) => void;
}
export declare function Finance({ savingsGoals, onAddGoal, onDeleteGoal, onContribute, }: FinanceProps): import("react").JSX.Element;
export {};
