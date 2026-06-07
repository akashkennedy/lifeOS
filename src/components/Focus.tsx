import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee, Briefcase } from 'lucide-react';
import type { FocusSession } from '../types';
import { formatTime, getDateString } from '../utils';
import { useToast } from '../context/ToastContext';

type TimerMode = 'work' | 'break' | 'longBreak';

const DURATIONS: Record<TimerMode, number> = {
  work: 25 * 60,
  break: 5 * 60,
  longBreak: 15 * 60,
};

interface FocusProps {
  sessions: FocusSession[];
  onSessionComplete: (minutes: number) => void;
}

export function Focus({ sessions, onSessionComplete }: FocusProps) {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(DURATIONS.work);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const { showToast } = useToast();

  const today = getDateString();
  const todaySessions = sessions.filter((s) => s.date === today);
  const totalMinutes = todaySessions.reduce((sum, s) => sum + s.minutes, 0);

  const circumference = 2 * Math.PI * 120;
  const progress = (DURATIONS[mode] - timeLeft) / DURATIONS[mode];
  const strokeDashoffset = circumference * (1 - progress);

  const handleComplete = useCallback(() => {
    if (mode === 'work') {
      onSessionComplete(DURATIONS.work / 60);
      showToast('Focus session complete! 🎯');
    } else {
      showToast('Break done! Ready to focus?');
    }
    setIsRunning(false);
    setTimeLeft(DURATIONS.work);
    setMode('work');
  }, [mode, onSessionComplete, showToast]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
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

  const changeMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(DURATIONS[newMode]);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-white">
        Focus Timer
      </h2>

      {/* Mode Selector */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => changeMode('work')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 ${
            mode === 'work'
              ? 'bg-accent text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <Briefcase size={18} />
          Work
        </button>
        <button
          onClick={() => changeMode('break')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 ${
            mode === 'break'
              ? 'bg-accent text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <Coffee size={18} />
          Break
        </button>
        <button
          onClick={() => changeMode('longBreak')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 ${
            mode === 'longBreak'
              ? 'bg-accent text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <Coffee size={18} />
          Long Break
        </button>
      </div>

      {/* Timer Circle */}
      <div className="flex justify-center">
        <div className="relative">
          <svg className="w-72 h-72 -rotate-90" viewBox="0 0 256 256">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className="text-accent"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
                transition: 'stroke-dashoffset 1s linear',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-5xl font-bold text-[#1a1a1a] dark:text-white">
              {formatTime(timeLeft)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize mt-2">
              {mode === 'work' ? 'Focus Time' : mode === 'break' ? 'Short Break' : 'Long Break'}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white hover:bg-accent/90 transition-all duration-150 shadow-lg"
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
        <button
          onClick={resetTimer}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-150"
        >
          <RotateCcw size={24} />
        </button>
      </div>

      {/* Today's Sessions */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1a1a1a] dark:text-white">
            Today&apos;s Sessions
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {totalMinutes} minutes total
          </span>
        </div>
        {todaySessions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Briefcase size={32} className="mx-auto mb-2 opacity-50" />
            <p>No focus sessions today</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {todaySessions.map((session) => (
              <li
                key={session.id}
                className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {session.time}
                </span>
                <span className="text-sm font-medium text-[#1a1a1a] dark:text-white">
                  {session.minutes} minutes
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
