import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee, Briefcase, Target, CircleCheck as CheckCircle2 } from 'lucide-react';
import { formatTime, getDateString } from '../utils';
import { useToast } from '../context/ToastContext';
const DURATIONS = {
    work: 25 * 60,
    break: 5 * 60,
    longBreak: 15 * 60,
};
export function Focus({ sessions, todos, onSessionComplete }) {
    const [mode, setMode] = useState('work');
    const [timeLeft, setTimeLeft] = useState(DURATIONS.work);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [completedCycles, setCompletedCycles] = useState(0);
    const intervalRef = useRef(null);
    const { showToast } = useToast();
    const today = getDateString();
    const todaySessions = sessions.filter((s) => s.date === today);
    const totalMinutes = todaySessions.reduce((sum, s) => sum + s.minutes, 0);
    const undoneTodos = todos.filter((t) => !t.done && t.date === today);
    const selectedTask = undoneTodos.find((t) => t.id === selectedTaskId);
    const circumference = 2 * Math.PI * 120;
    const progress = (DURATIONS[mode] - timeLeft) / DURATIONS[mode];
    const strokeDashoffset = circumference * (1 - progress);
    const handleComplete = useCallback(() => {
        if (mode === 'work') {
            onSessionComplete(DURATIONS.work / 60, selectedTaskId);
            const newCycles = completedCycles + 1;
            setCompletedCycles(newCycles);
            showToast(selectedTaskId
                ? `Focus on "${selectedTask?.text}" complete!`
                : 'Focus session complete!');
            // After 4 work sessions, suggest a long break
            if (newCycles % 4 === 0) {
                setMode('longBreak');
                setTimeLeft(DURATIONS.longBreak);
                showToast('Great work! Take a long break.');
                return;
            }
            setMode('break');
            setTimeLeft(DURATIONS.break);
        }
        else {
            showToast('Break done! Ready to focus?');
            setMode('work');
            setTimeLeft(DURATIONS.work);
        }
        setIsRunning(false);
    }, [mode, onSessionComplete, selectedTaskId, selectedTask, completedCycles, showToast]);
    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        else if (timeLeft === 0) {
            handleComplete();
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, timeLeft, handleComplete]);
    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };
    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(DURATIONS[mode]);
    };
    const changeMode = (newMode) => {
        setIsRunning(false);
        setMode(newMode);
        setTimeLeft(DURATIONS[newMode]);
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[#1a1a1a] dark:text-white", children: "Focus Timer" }), _jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm", children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx(Target, { size: 18, className: "text-accent" }), _jsx("h3", { className: "text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide", children: "Focus Target" })] }), undoneTodos.length === 0 ? (_jsx("div", { className: "text-center py-4 text-gray-400", children: _jsx("p", { className: "text-sm", children: "No tasks for today. Add tasks in Goals to focus on them." }) })) : (_jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-2", children: "Select a task to focus on during this session:" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx("button", { onClick: () => setSelectedTaskId(null), className: `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${selectedTaskId === null
                                            ? 'bg-accent text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`, children: "General Focus" }), undoneTodos.map((todo) => (_jsx("button", { onClick: () => setSelectedTaskId(todo.id), className: `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 max-w-xs truncate ${selectedTaskId === todo.id
                                            ? 'bg-accent text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`, children: todo.text }, todo.id)))] })] })), selectedTask && (_jsx("div", { className: "mt-3 p-3 bg-accent/10 rounded-lg border border-accent/20", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle2, { size: 16, className: "text-accent" }), _jsxs("span", { className: "text-sm font-medium text-accent", children: ["Focusing on: ", selectedTask.text] })] }) }))] }), _jsxs("div", { className: "flex justify-center gap-2", children: [_jsxs("button", { onClick: () => changeMode('work'), className: `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 ${mode === 'work'
                            ? 'bg-accent text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`, children: [_jsx(Briefcase, { size: 18 }), "Work"] }), _jsxs("button", { onClick: () => changeMode('break'), className: `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 ${mode === 'break'
                            ? 'bg-accent text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`, children: [_jsx(Coffee, { size: 18 }), "Break"] }), _jsxs("button", { onClick: () => changeMode('longBreak'), className: `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 ${mode === 'longBreak'
                            ? 'bg-accent text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`, children: [_jsx(Coffee, { size: 18 }), "Long Break"] })] }), _jsx("div", { className: "flex justify-center", children: _jsxs("div", { className: "flex items-center gap-1", children: [Array.from({ length: 4 }).map((_, i) => (_jsx("div", { className: `w-3 h-3 rounded-full transition-all duration-300 ${i < (completedCycles % 4)
                                ? 'bg-accent'
                                : 'bg-gray-200 dark:bg-gray-700'}` }, i))), _jsxs("span", { className: "text-sm text-gray-500 dark:text-gray-400 ml-2", children: [Math.floor(completedCycles / 4), " set", Math.floor(completedCycles / 4) !== 1 ? 's' : ''] })] }) }), _jsx("div", { className: "flex justify-center", children: _jsxs("div", { className: "relative", children: [_jsxs("svg", { className: "w-72 h-72 -rotate-90", viewBox: "0 0 256 256", children: [_jsx("circle", { cx: "128", cy: "128", r: "120", fill: "none", stroke: "currentColor", strokeWidth: "8", className: "text-gray-200 dark:text-gray-700" }), _jsx("circle", { cx: "128", cy: "128", r: "120", fill: "none", stroke: "currentColor", strokeWidth: "8", strokeLinecap: "round", className: "text-accent", style: {
                                        strokeDasharray: circumference,
                                        strokeDashoffset,
                                        transition: 'stroke-dashoffset 1s linear',
                                    } })] }), _jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [_jsx("span", { className: "font-mono text-5xl font-bold text-[#1a1a1a] dark:text-white", children: formatTime(timeLeft) }), _jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400 capitalize mt-2", children: mode === 'work' ? 'Focus Time' : mode === 'break' ? 'Short Break' : 'Long Break' })] })] }) }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx("button", { onClick: toggleTimer, className: "flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white hover:bg-accent/90 transition-all duration-150 shadow-lg", children: isRunning ? _jsx(Pause, { size: 24 }) : _jsx(Play, { size: 24, className: "ml-1" }) }), _jsx("button", { onClick: resetTimer, className: "flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-150", children: _jsx(RotateCcw, { size: 24 }) })] }), _jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[#1a1a1a] dark:text-white", children: "Today's Sessions" }), _jsxs("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: [totalMinutes, " minutes total"] })] }), todaySessions.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-gray-400", children: [_jsx(Briefcase, { size: 32, className: "mx-auto mb-2 opacity-50" }), _jsx("p", { children: "No focus sessions today" })] })) : (_jsx("ul", { className: "space-y-2", children: todaySessions.map((session) => (_jsxs("li", { className: "flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: session.time }), session.task_text && (_jsx("span", { className: "text-xs px-2 py-1 bg-accent/10 text-accent rounded-full truncate max-w-[200px]", children: session.task_text }))] }), _jsxs("span", { className: "text-sm font-medium text-[#1a1a1a] dark:text-white", children: [session.minutes, " minutes"] })] }, session.id))) }))] })] }));
}
//# sourceMappingURL=Focus.js.map