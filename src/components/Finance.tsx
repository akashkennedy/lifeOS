import { useState } from 'react';
import { Plus, Trash2, PiggyBank, CircleCheck as CheckCircle2 } from 'lucide-react';
import type { SavingsGoal } from '../types';
import { formatRupees, formatPercent } from '../utils';

interface FinanceProps {
  savingsGoals: SavingsGoal[];
  onAddGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
  onDeleteGoal: (id: string) => void;
  onContribute: (goalId: string, amount: number) => void;
}

export function Finance({
  savingsGoals,
  onAddGoal,
  onDeleteGoal,
  onContribute,
}: FinanceProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalSaved, setNewGoalSaved] = useState('');
  const [contributeGoalId, setContributeGoalId] = useState<string | null>(null);
  const [contributeAmount, setContributeAmount] = useState('');

  const handleAddGoal = () => {
    if (newGoalName.trim() && newGoalTarget) {
      onAddGoal({
        name: newGoalName.trim(),
        target: parseInt(newGoalTarget, 10) || 0,
        saved: parseInt(newGoalSaved, 10) || 0,
      });
      setNewGoalName('');
      setNewGoalTarget('');
      setNewGoalSaved('');
      setShowAddForm(false);
    }
  };

  const handleContribute = () => {
    if (contributeGoalId && contributeAmount) {
      onContribute(contributeGoalId, parseInt(contributeAmount, 10) || 0);
      setContributeGoalId(null);
      setContributeAmount('');
    }
  };

  const sortedGoals = [...savingsGoals].sort((a, b) => {
    const aPercent = a.target > 0 ? a.saved / a.target : 0;
    const bPercent = b.target > 0 ? b.saved / b.target : 0;
    return bPercent - aPercent;
  });

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-white">
        Finance
      </h2>

      {/* Add Goal Button */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400 hover:border-accent hover:text-accent transition-all duration-150 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add Savings Goal
        </button>
      )}

      {/* Add Goal Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm">
          <h3 className="text-lg font-semibold text-[#1a1a1a] dark:text-white mb-4">
            New Savings Goal
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              value={newGoalName}
              onChange={(e) => setNewGoalName(e.target.value)}
              placeholder="Goal name (e.g., Emergency Fund)"
              className="w-full px-4 py-2 border border-border dark:border-gray-700 rounded-lg bg-transparent outline-none focus:border-accent text-[#1a1a1a] dark:text-white placeholder-gray-400"
            />
            <input
              type="number"
              value={newGoalTarget}
              onChange={(e) => setNewGoalTarget(e.target.value)}
              placeholder="Target amount (₹)"
              min="0"
              className="w-full px-4 py-2 border border-border dark:border-gray-700 rounded-lg bg-transparent outline-none focus:border-accent text-[#1a1a1a] dark:text-white placeholder-gray-400"
            />
            <input
              type="number"
              value={newGoalSaved}
              onChange={(e) => setNewGoalSaved(e.target.value)}
              placeholder="Initial saved amount (₹)"
              min="0"
              className="w-full px-4 py-2 border border-border dark:border-gray-700 rounded-lg bg-transparent outline-none focus:border-accent text-[#1a1a1a] dark:text-white placeholder-gray-400"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddGoal}
                disabled={!newGoalName.trim() || !newGoalTarget}
                className="flex-1 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
              >
                Add Goal
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-150"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Goals List */}
      {savingsGoals.length === 0 && !showAddForm ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-12 border border-border dark:border-gray-800 shadow-sm text-center text-gray-400">
          <PiggyBank size={48} className="mx-auto mb-4 opacity-50" />
          <p>No savings goals yet</p>
          <p className="text-sm mt-1">Add a goal to start tracking your progress</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedGoals.map((goal) => {
            const percent = goal.target > 0 ? (goal.saved / goal.target) * 100 : 0;
            const isComplete = goal.saved >= goal.target;

            return (
              <div
                key={goal.id}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm group hover:border-accent/30 transition-all duration-150"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-[#1a1a1a] dark:text-white flex items-center gap-2">
                      {goal.name}
                      {isComplete && (
                        <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full font-medium">
                          Completed
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {formatRupees(goal.saved)} / {formatRupees(goal.target)}
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteGoal(goal.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all duration-150"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">{formatPercent(goal.saved, goal.target)}</span>
                  {!isComplete && (
                    <button
                      onClick={() => setContributeGoalId(goal.id)}
                      className="text-xs text-accent hover:underline"
                    >
                      + Add contribution
                    </button>
                  )}
                </div>

                {/* Contribute Form */}
                {contributeGoalId === goal.id && (
                  <div className="flex items-center gap-2 mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-500">₹</span>
                    <input
                      type="number"
                      value={contributeAmount}
                      onChange={(e) => setContributeAmount(e.target.value)}
                      placeholder="Amount"
                      min="0"
                      autoFocus
                      className="flex-1 bg-transparent outline-none text-[#1a1a1a] dark:text-white"
                    />
                    <button
                      onClick={handleContribute}
                      disabled={!contributeAmount}
                      className="px-3 py-1 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 disabled:opacity-50 transition-all duration-150"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setContributeGoalId(null);
                        setContributeAmount('');
                      }}
                      className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Summary */}
      {savingsGoals.length > 0 && (
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Total Progress
            </span>
            <span className="font-semibold text-accent">
              {formatPercent(
                savingsGoals.reduce((sum, g) => sum + g.saved, 0),
                savingsGoals.reduce((sum, g) => sum + g.target, 0)
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
