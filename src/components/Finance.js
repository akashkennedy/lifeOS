import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus, Trash2, PiggyBank } from 'lucide-react';
import { formatRupees, formatPercent } from '../utils';
export function Finance({ savingsGoals, onAddGoal, onDeleteGoal, onContribute, }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newGoalName, setNewGoalName] = useState('');
    const [newGoalTarget, setNewGoalTarget] = useState('');
    const [newGoalSaved, setNewGoalSaved] = useState('');
    const [contributeGoalId, setContributeGoalId] = useState(null);
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
    return (_jsxs("div", { className: "space-y-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[#1a1a1a] dark:text-white", children: "Finance" }), !showAddForm && (_jsxs("button", { onClick: () => setShowAddForm(true), className: "w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400 hover:border-accent hover:text-accent transition-all duration-150 flex items-center justify-center gap-2", children: [_jsx(Plus, { size: 20 }), "Add Savings Goal"] })), showAddForm && (_jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm", children: [_jsx("h3", { className: "text-lg font-semibold text-[#1a1a1a] dark:text-white mb-4", children: "New Savings Goal" }), _jsxs("div", { className: "space-y-3", children: [_jsx("input", { type: "text", value: newGoalName, onChange: (e) => setNewGoalName(e.target.value), placeholder: "Goal name (e.g., Emergency Fund)", className: "w-full px-4 py-2 border border-border dark:border-gray-700 rounded-lg bg-transparent outline-none focus:border-accent text-[#1a1a1a] dark:text-white placeholder-gray-400" }), _jsx("input", { type: "number", value: newGoalTarget, onChange: (e) => setNewGoalTarget(e.target.value), placeholder: "Target amount (\u20B9)", min: "0", className: "w-full px-4 py-2 border border-border dark:border-gray-700 rounded-lg bg-transparent outline-none focus:border-accent text-[#1a1a1a] dark:text-white placeholder-gray-400" }), _jsx("input", { type: "number", value: newGoalSaved, onChange: (e) => setNewGoalSaved(e.target.value), placeholder: "Initial saved amount (\u20B9)", min: "0", className: "w-full px-4 py-2 border border-border dark:border-gray-700 rounded-lg bg-transparent outline-none focus:border-accent text-[#1a1a1a] dark:text-white placeholder-gray-400" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: handleAddGoal, disabled: !newGoalName.trim() || !newGoalTarget, className: "flex-1 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150", children: "Add Goal" }), _jsx("button", { onClick: () => setShowAddForm(false), className: "px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-150", children: "Cancel" })] })] })] })), savingsGoals.length === 0 && !showAddForm ? (_jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-xl p-12 border border-border dark:border-gray-800 shadow-sm text-center text-gray-400", children: [_jsx(PiggyBank, { size: 48, className: "mx-auto mb-4 opacity-50" }), _jsx("p", { children: "No savings goals yet" }), _jsx("p", { className: "text-sm mt-1", children: "Add a goal to start tracking your progress" })] })) : (_jsx("div", { className: "space-y-4", children: sortedGoals.map((goal) => {
                    const percent = goal.target > 0 ? (goal.saved / goal.target) * 100 : 0;
                    const isComplete = goal.saved >= goal.target;
                    return (_jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm group hover:border-accent/30 transition-all duration-150", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { children: [_jsxs("h4", { className: "font-semibold text-[#1a1a1a] dark:text-white flex items-center gap-2", children: [goal.name, isComplete && (_jsx("span", { className: "px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full font-medium", children: "Completed" }))] }), _jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: [formatRupees(goal.saved), " / ", formatRupees(goal.target)] })] }), _jsx("button", { onClick: () => onDeleteGoal(goal.id), className: "opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all duration-150", children: _jsx(Trash2, { size: 16 }) })] }), _jsx("div", { className: "h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-accent rounded-full transition-all duration-500", style: { width: `${Math.min(percent, 100)}%` } }) }), _jsxs("div", { className: "flex items-center justify-between mt-2", children: [_jsx("span", { className: "text-xs text-gray-400", children: formatPercent(goal.saved, goal.target) }), !isComplete && (_jsx("button", { onClick: () => setContributeGoalId(goal.id), className: "text-xs text-accent hover:underline", children: "+ Add contribution" }))] }), contributeGoalId === goal.id && (_jsxs("div", { className: "flex items-center gap-2 mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [_jsx("span", { className: "text-sm text-gray-500", children: "\u20B9" }), _jsx("input", { type: "number", value: contributeAmount, onChange: (e) => setContributeAmount(e.target.value), placeholder: "Amount", min: "0", autoFocus: true, className: "flex-1 bg-transparent outline-none text-[#1a1a1a] dark:text-white" }), _jsx("button", { onClick: handleContribute, disabled: !contributeAmount, className: "px-3 py-1 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 disabled:opacity-50 transition-all duration-150", children: "Add" }), _jsx("button", { onClick: () => {
                                            setContributeGoalId(null);
                                            setContributeAmount('');
                                        }, className: "px-3 py-1 text-gray-500 hover:text-gray-700 text-sm", children: "Cancel" })] }))] }, goal.id));
                }) })), savingsGoals.length > 0 && (_jsx("div", { className: "bg-accent/5 border border-accent/20 rounded-xl p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Total Progress" }), _jsx("span", { className: "font-semibold text-accent", children: formatPercent(savingsGoals.reduce((sum, g) => sum + g.saved, 0), savingsGoals.reduce((sum, g) => sum + g.target, 0)) })] }) }))] }));
}
//# sourceMappingURL=Finance.js.map