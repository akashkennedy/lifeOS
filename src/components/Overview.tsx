import { Timer, CircleCheck as CheckCircle2, PiggyBank, CircleDashed } from 'lucide-react';
import type { Todo, FocusSession, SavingsGoal, WellbeingEntry } from '../types';
import { getDateString, formatPercent, formatRupees } from '../utils';

interface OverviewProps {
  todos: Todo[];
  sessions: FocusSession[];
  savingsGoals: SavingsGoal[];
  wellbeing: WellbeingEntry[];
  onToggleTodo: (id: string) => void;
}

export function Overview({ todos, sessions, savingsGoals, wellbeing, onToggleTodo }: OverviewProps) {
  const today = getDateString();

  const todayTodos = todos.filter((t) => t.date === today);
  const doneTodos = todayTodos.filter((t) => t.done);
  const todaySessions = sessions.filter((s) => s.date === today);
  const todayMinutes = todaySessions.reduce((sum, s) => sum + s.minutes, 0);

  const totalSaved = savingsGoals.reduce((sum, g) => sum + g.saved, 0);
  const totalTarget = savingsGoals.reduce((sum, g) => sum + g.target, 0);
  const savingsPercent = formatPercent(totalSaved, totalTarget);

  const todayWellbeing = wellbeing.find((w) => w.date === today);

  const moodEmoji: Record<string, string> = {
    Great: '😄',
    Good: '🙂',
    Okay: '😐',
    Low: '😔',
    Rough: '😞',
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-white">
        Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-border dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
            <Timer size={18} />
            <span className="text-sm font-medium">Focus Today</span>
          </div>
          <p className="text-2xl font-bold text-[#1a1a1a] dark:text-white">
            {todayMinutes}
            <span className="text-sm font-normal text-gray-500 ml-1">min</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-border dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
            <CircleDashed size={18} />
            <span className="text-sm font-medium">Sessions</span>
          </div>
          <p className="text-2xl font-bold text-[#1a1a1a] dark:text-white">
            {todaySessions.length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-border dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
            <CheckCircle2 size={18} />
            <span className="text-sm font-medium">Tasks Done</span>
          </div>
          <p className="text-2xl font-bold text-[#1a1a1a] dark:text-white">
            {doneTodos.length}
            <span className="text-sm font-normal text-gray-500 ml-1">
              / {todayTodos.length}
            </span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-border dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
            <PiggyBank size={18} />
            <span className="text-sm font-medium">Savings</span>
          </div>
          <p className="text-2xl font-bold text-accent">{savingsPercent}</p>
        </div>
      </div>

      {/* Today's Todos */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm">
        <h3 className="text-lg font-semibold text-[#1a1a1a] dark:text-white mb-4">
          Today&apos;s Tasks
        </h3>
        {todayTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <CheckCircle2 size={32} className="mx-auto mb-2 opacity-50" />
            <p>No tasks for today</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {todayTodos.map((todo) => (
              <li key={todo.id}>
                <button
                  onClick={() => onToggleTodo(todo.id)}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150 text-left"
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150 ${
                      todo.done
                        ? 'bg-accent border-accent'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {todo.done && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`flex-1 ${
                      todo.done
                        ? 'text-gray-400 line-through'
                        : 'text-[#1a1a1a] dark:text-white'
                    }`}
                  >
                    {todo.text}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Today's Wellbeing */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm">
        <h3 className="text-lg font-semibold text-[#1a1a1a] dark:text-white mb-4">
          Today&apos;s Wellbeing
        </h3>
        {todayWellbeing ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl mb-1">{moodEmoji[todayWellbeing.mood]}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {todayWellbeing.mood}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#1a1a1a] dark:text-white">
                {todayWellbeing.sleep}h
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sleep</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#1a1a1a] dark:text-white">
                {todayWellbeing.water}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Glasses</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-accent">
                {todayWellbeing.exercised ? 'Yes' : 'No'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Exercised
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <CircleDashed size={32} className="mx-auto mb-2 opacity-50" />
            <p>No check-in yet today</p>
          </div>
        )}
      </div>
    </div>
  );
}
