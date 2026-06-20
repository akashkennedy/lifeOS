import { useState, useEffect, type ReactNode } from 'react';
import { LayoutDashboard, Timer, Target, PiggyBank, Heart, LogOut } from 'lucide-react';
import type { Section } from '../types';
import { getTodayFormatted } from '../utils';

const navItems: { id: Section; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'focus', label: 'Focus', icon: Timer },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'finance', label: 'Finance', icon: PiggyBank },
  { id: 'wellbeing', label: 'Wellbeing', icon: Heart },
];

interface LayoutProps {
  children: ReactNode;
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  onSignOut?: () => void;
}

export function Layout({ children, activeSection, onSectionChange, onSignOut }: LayoutProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-surface dark:bg-surface-dark">
      {!isMobile && (
        <aside className="w-64 border-r border-border dark:border-gray-800 flex flex-col">
          <div className="p-6 border-b border-border dark:border-gray-800">
            <h1 className="text-2xl font-bold text-[#1a1a1a] dark:text-white">
              LifeOS
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {getTodayFormatted()}
            </p>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onSectionChange(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
                        isActive
                          ? 'bg-accent/10 text-accent border-l-4 border-accent -ml-1 pl-5'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
          {onSignOut && (
            <div className="p-4 border-t border-border dark:border-gray-800">
              <button
                onClick={onSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-150"
              >
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          )}
        </aside>
      )}

      <main className="flex-1 pb-20 md:pb-0">
        <header className="md:hidden sticky top-0 z-40 bg-surface dark:bg-surface-dark border-b border-border dark:border-gray-800 px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-[#1a1a1a] dark:text-white">
              LifeOS
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {getTodayFormatted()}
              </p>
              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <LogOut size={20} />
                </button>
              )}
            </div>
          </div>
        </header>
        <div className="p-6 md:p-8">{children}</div>
      </main>

      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-dark border-t border-border dark:border-gray-800 z-50">
          <ul className="flex justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onSectionChange(item.id)}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-150 ${
                      isActive
                        ? 'text-accent'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    <Icon size={22} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
