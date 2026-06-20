import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus, Trash2, CircleCheck as CheckCircle2, Target, Calendar } from 'lucide-react';
import { getDateString } from '../utils';
const CATEGORIES = [
    'Personal',
    'Career',
    'Health',
    'Finance',
    'Learning',
];
const categoryColors = {
    Personal: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    Career: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    Health: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Finance: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    Learning: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
};
export function Goals({ todos, goals, onAddTodo, onToggleTodo, onDeleteTodo, onAddGoal, onToggleGoal, onDeleteGoal, }) {
    const [newTodo, setNewTodo] = useState('');
    const [newGoalTitle, setNewGoalTitle] = useState('');
    const [newGoalCategory, setNewGoalCategory] = useState('Personal');
    const [newGoalDueDate, setNewGoalDueDate] = useState('');
    const today = getDateString();
    const todayTodos = todos.filter((t) => t.date === today);
    const handleAddTodo = (e) => {
        if (e.key === 'Enter' && newTodo.trim()) {
            onAddTodo(newTodo.trim());
            setNewTodo('');
        }
    };
    const handleAddGoal = () => {
        if (newGoalTitle.trim()) {
            onAddGoal({
                title: newGoalTitle.trim(),
                category: newGoalCategory,
                dueDate: newGoalDueDate || undefined,
                done: false,
            });
            setNewGoalTitle('');
            setNewGoalDueDate('');
        }
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[#1a1a1a] dark:text-white", children: "Goals" }), _jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm", children: [_jsx("h3", { className: "text-lg font-semibold text-[#1a1a1a] dark:text-white mb-4", children: "Today's Tasks" }), _jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Plus, { size: 20, className: "text-gray-400" }), _jsx("input", { type: "text", value: newTodo, onChange: (e) => setNewTodo(e.target.value), onKeyDown: handleAddTodo, placeholder: "Add a task...", className: "flex-1 bg-transparent outline-none text-[#1a1a1a] dark:text-white placeholder-gray-400" }), _jsx("button", { onClick: () => {
                                    if (newTodo.trim()) {
                                        onAddTodo(newTodo.trim());
                                        setNewTodo('');
                                    }
                                }, disabled: !newTodo.trim(), className: "px-3 py-1.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150", children: "Add Task" })] }), todayTodos.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-gray-400", children: [_jsx(CheckCircle2, { size: 32, className: "mx-auto mb-2 opacity-50" }), _jsx("p", { children: "No tasks for today. Add one above!" })] })) : (_jsx("ul", { className: "space-y-2", children: todayTodos.map((todo) => (_jsxs("li", { className: "flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150 group", children: [_jsx("button", { onClick: () => onToggleTodo(todo.id), className: `w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150 ${todo.done
                                        ? 'bg-accent border-accent'
                                        : 'border-gray-300 dark:border-gray-600 hover:border-accent'}`, children: todo.done && (_jsx("svg", { className: "w-3 h-3 text-white", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) })) }), _jsx("span", { className: `flex-1 ${todo.done
                                        ? 'text-gray-400 line-through'
                                        : 'text-[#1a1a1a] dark:text-white'}`, children: todo.text }), _jsx("button", { onClick: () => onDeleteTodo(todo.id), className: "opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all duration-150", children: _jsx(Trash2, { size: 16 }) })] }, todo.id))) }))] }), _jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm", children: [_jsx("h3", { className: "text-lg font-semibold text-[#1a1a1a] dark:text-white mb-4", children: "Long-term Goals" }), _jsxs("div", { className: "space-y-3 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [_jsx("input", { type: "text", value: newGoalTitle, onChange: (e) => setNewGoalTitle(e.target.value), placeholder: "Goal title...", className: "w-full bg-transparent outline-none text-[#1a1a1a] dark:text-white placeholder-gray-400 font-medium" }), _jsx("div", { className: "flex flex-wrap gap-2", children: CATEGORIES.map((cat) => (_jsx("button", { onClick: () => setNewGoalCategory(cat), className: `px-3 py-1 rounded-full text-sm font-medium transition-all duration-150 ${newGoalCategory === cat
                                        ? categoryColors[cat]
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`, children: cat }, cat))) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { size: 18, className: "text-gray-400" }), _jsx("input", { type: "date", value: newGoalDueDate, onChange: (e) => setNewGoalDueDate(e.target.value), className: "flex-1 bg-transparent outline-none text-[#1a1a1a] dark:text-white" })] }), _jsx("button", { onClick: handleAddGoal, disabled: !newGoalTitle.trim(), className: "w-full py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150", children: "Add Goal" })] }), goals.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-gray-400", children: [_jsx(Target, { size: 32, className: "mx-auto mb-2 opacity-50" }), _jsx("p", { children: "No long-term goals yet. Add one above!" })] })) : (_jsx("ul", { className: "space-y-3", children: goals.map((goal) => (_jsx("li", { className: "p-4 border border-border dark:border-gray-800 rounded-lg group hover:border-accent/50 transition-all duration-150", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("button", { onClick: () => onToggleGoal(goal.id), className: `mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150 ${goal.done
                                            ? 'bg-accent border-accent'
                                            : 'border-gray-300 dark:border-gray-600 hover:border-accent'}`, children: goal.done && (_jsx("svg", { className: "w-3 h-3 text-white", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: `font-medium ${goal.done
                                                    ? 'text-gray-400 line-through'
                                                    : 'text-[#1a1a1a] dark:text-white'}`, children: goal.title }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx("span", { className: `px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[goal.category]}`, children: goal.category }), goal.dueDate && (_jsxs("span", { className: "text-xs text-gray-400 flex items-center gap-1", children: [_jsx(Calendar, { size: 12 }), new Date(goal.dueDate).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                            })] }))] })] }), _jsx("button", { onClick: () => onDeleteGoal(goal.id), className: "opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all duration-150", children: _jsx(Trash2, { size: 16 }) })] }) }, goal.id))) }))] })] }));
}
//# sourceMappingURL=Goals.js.map