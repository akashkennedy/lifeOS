export interface Todo {
  id: string;
  text: string;
  done: boolean;
  date: string;
}

export interface Goal {
  id: string;
  title: string;
  category: 'Personal' | 'Career' | 'Health' | 'Finance' | 'Learning';
  dueDate?: string;
  done: boolean;
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  saved: number;
}

export interface FocusSession {
  id: string;
  date: string;
  time: string;
  minutes: number;
}

export interface WellbeingEntry {
  id: string;
  date: string;
  mood: 'Great' | 'Good' | 'Okay' | 'Low' | 'Rough';
  sleep: number;
  water: number;
  exercised: boolean;
  note: string;
}

export type Section = 'overview' | 'focus' | 'goals' | 'finance' | 'wellbeing';
