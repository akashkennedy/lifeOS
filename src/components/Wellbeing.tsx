import { useState } from 'react';
import { Heart, Save, Dumbbell, Droplets, Moon, MessageSquare } from 'lucide-react';
import type { WellbeingEntry } from '../types';
import { getDateString } from '../utils';
import { useToast } from '../context/ToastContext';

interface WellbeingProps {
  entries: WellbeingEntry[];
  onSave: (entry: Omit<WellbeingEntry, 'id'>) => void;
}

const MOODS: WellbeingEntry['mood'][] = ['Great', 'Good', 'Okay', 'Low', 'Rough'];

const moodEmoji: Record<WellbeingEntry['mood'], string> = {
  Great: '😄',
  Good: '🙂',
  Okay: '😐',
  Low: '😔',
  Rough: '😞',
};

export function Wellbeing({ entries, onSave }: WellbeingProps) {
  const [mood, setMood] = useState<WellbeingEntry['mood'] | null>(null);
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

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-white">
        Wellbeing
      </h2>

      {/* Mood Picker */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm">
        <h3 className="text-lg font-semibold text-[#1a1a1a] dark:text-white mb-4">
          How are you feeling today?
        </h3>
        <div className="flex justify-between gap-2">
          {MOODS.map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-150 ${
                mood === m
                  ? 'bg-accent/10 border-2 border-accent'
                  : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
              }`}
            >
              <span className="text-3xl">{moodEmoji[m]}</span>
              <span
                className={`text-sm font-medium ${
                  mood === m
                    ? 'text-accent'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {m}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sleep & Water */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Moon size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-[#1a1a1a] dark:text-white">
              Sleep
            </h3>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-bold text-[#1a1a1a] dark:text-white">
              {sleep}h
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="12"
            step="0.5"
            value={sleep}
            onChange={(e) => setSleep(parseFloat(e.target.value))}
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0h</span>
            <span>12h</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Droplets size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-[#1a1a1a] dark:text-white">
              Water
            </h3>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-bold text-[#1a1a1a] dark:text-white">
              {water}
            </span>
            <span className="text-gray-400">glasses</span>
          </div>
          <input
            type="range"
            min="0"
            max="12"
            value={water}
            onChange={(e) => setWater(parseInt(e.target.value, 10))}
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0</span>
            <span>12</span>
          </div>
        </div>
      </div>

      {/* Exercise */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Dumbbell size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-[#1a1a1a] dark:text-white">
            Exercise
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setExercised(true)}
            className={`flex-1 py-3 rounded-lg font-medium transition-all duration-150 ${
              exercised
                ? 'bg-accent text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            Yes, I exercised
          </button>
          <button
            onClick={() => setExercised(false)}
            className={`flex-1 py-3 rounded-lg font-medium transition-all duration-150 ${
              !exercised
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            Not today
          </button>
        </div>
      </div>

      {/* Reflection */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-[#1a1a1a] dark:text-white">
            Reflection
          </h3>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="How was your day? Any thoughts..."
          rows={3}
          className="w-full bg-transparent outline-none text-[#1a1a1a] dark:text-white placeholder-gray-400 resize-none"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={!mood}
        className="w-full py-4 bg-accent text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
      >
        <Save size={20} />
        Save Check-in
      </button>

      {/* Recent Entries */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-border dark:border-gray-800 shadow-sm">
        <h3 className="text-lg font-semibold text-[#1a1a1a] dark:text-white mb-4">
          Recent Check-ins
        </h3>
        {recentEntries.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Heart size={32} className="mx-auto mb-2 opacity-50" />
            <p>No check-ins yet</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {recentEntries.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <span className="text-2xl">{moodEmoji[entry.mood]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1a1a1a] dark:text-white">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {entry.sleep}h sleep · {entry.water} glasses ·{' '}
                    {entry.exercised ? 'Exercised' : 'No exercise'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
