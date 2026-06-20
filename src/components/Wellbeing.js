import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Heart, Save, Dumbbell, Droplets, Moon, MessageSquare } from 'lucide-react';
import { getDateString } from '../utils';
import { useToast } from '../context/ToastContext';
const MOODS = ['Great', 'Good', 'Okay', 'Low', 'Rough'];
const moodEmoji = {
    Great: '😄',
    Good: '🙂',
    Okay: '😐',
    Low: '😔',
    Rough: '😞',
};
export function Wellbeing({ entries, onSave }) {
    const [mood, setMood] = useState(null);
    const [sleep, setSleep] = useState(7);
    const [water, setWater] = useState(4);
    const [exercised, setExercised] = useState(false);
    const [note, setNote] = useState('');
    const { showToast } = useToast();
    const today = getDateString();
    const todayEntry = entries.find((e) => e.date === today);
    const handleSave = () => {
        if (!mood) {
            showToast('Please select a mood');
            return;
        }
        onSave({
            date: today,
            mood,
            sleep,
            water,
            exercised,
            note,
        });
        showToast('Wellbeing check-in saved! 💚');
    };
    const recentEntries = entries
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);
    return (_jsxs("div", { className: "space-y-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[#1a1a1a] dark:text-white", children: "Wellbeing" }), _jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm", children: [_jsx("h3", { className: "text-lg font-semibold text-[#1a1a1a] dark:text-white mb-4", children: "How are you feeling today?" }), _jsx("div", { className: "flex justify-between gap-2", children: MOODS.map((m) => (_jsxs("button", { onClick: () => setMood(m), className: `flex-1 flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-150 ${mood === m
                                ? 'bg-accent/10 border-2 border-accent'
                                : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700'}`, children: [_jsx("span", { className: "text-3xl", children: moodEmoji[m] }), _jsx("span", { className: `text-sm font-medium ${mood === m
                                        ? 'text-accent'
                                        : 'text-gray-500 dark:text-gray-400'}`, children: m })] }, m))) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Moon, { size: 20, className: "text-accent" }), _jsx("h3", { className: "text-lg font-semibold text-[#1a1a1a] dark:text-white", children: "Sleep" })] }), _jsx("div", { className: "flex items-center justify-between mb-2", children: _jsxs("span", { className: "text-3xl font-bold text-[#1a1a1a] dark:text-white", children: [sleep, "h"] }) }), _jsx("input", { type: "range", min: "0", max: "12", step: "0.5", value: sleep, onChange: (e) => setSleep(parseFloat(e.target.value)), className: "w-full accent-accent" }), _jsxs("div", { className: "flex justify-between text-xs text-gray-400 mt-1", children: [_jsx("span", { children: "0h" }), _jsx("span", { children: "12h" })] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Droplets, { size: 20, className: "text-accent" }), _jsx("h3", { className: "text-lg font-semibold text-[#1a1a1a] dark:text-white", children: "Water" })] }), _jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-3xl font-bold text-[#1a1a1a] dark:text-white", children: water }), _jsx("span", { className: "text-gray-400", children: "glasses" })] }), _jsx("input", { type: "range", min: "0", max: "12", value: water, onChange: (e) => setWater(parseInt(e.target.value, 10)), className: "w-full accent-accent" }), _jsxs("div", { className: "flex justify-between text-xs text-gray-400 mt-1", children: [_jsx("span", { children: "0" }), _jsx("span", { children: "12" })] })] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Dumbbell, { size: 20, className: "text-accent" }), _jsx("h3", { className: "text-lg font-semibold text-[#1a1a1a] dark:text-white", children: "Exercise" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setExercised(true), className: `flex-1 py-3 rounded-lg font-medium transition-all duration-150 ${exercised
                                    ? 'bg-accent text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`, children: "Yes, I exercised" }), _jsx("button", { onClick: () => setExercised(false), className: `flex-1 py-3 rounded-lg font-medium transition-all duration-150 ${!exercised
                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`, children: "Not today" })] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(MessageSquare, { size: 20, className: "text-accent" }), _jsx("h3", { className: "text-lg font-semibold text-[#1a1a1a] dark:text-white", children: "Reflection" })] }), _jsx("textarea", { value: note, onChange: (e) => setNote(e.target.value), placeholder: "How was your day? Any thoughts...", rows: 3, className: "w-full bg-transparent outline-none text-[#1a1a1a] dark:text-white placeholder-gray-400 resize-none" })] }), _jsxs("button", { onClick: handleSave, disabled: !mood, className: "w-full py-4 bg-accent text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150", children: [_jsx(Save, { size: 20 }), "Save Check-in"] }), _jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm", children: [_jsx("h3", { className: "text-lg font-semibold text-[#1a1a1a] dark:text-white mb-4", children: "Recent Check-ins" }), recentEntries.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-gray-400", children: [_jsx(Heart, { size: 32, className: "mx-auto mb-2 opacity-50" }), _jsx("p", { children: "No check-ins yet" })] })) : (_jsx("ul", { className: "space-y-3", children: recentEntries.map((entry) => (_jsxs("li", { className: "flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [_jsx("span", { className: "text-2xl", children: moodEmoji[entry.mood] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-[#1a1a1a] dark:text-white", children: new Date(entry.date).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric',
                                            }) }), _jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: [entry.sleep, "h sleep \u00B7 ", entry.water, " glasses \u00B7", ' ', entry.exercised ? 'Exercised' : 'No exercise'] })] })] }, entry.id))) }))] })] }));
}
//# sourceMappingURL=Wellbeing.js.map