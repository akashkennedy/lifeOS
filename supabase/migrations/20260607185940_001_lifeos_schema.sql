-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create todos table
CREATE TABLE todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT FALSE,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create goals table
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Personal', 'Career', 'Health', 'Finance', 'Learning')),
  due_date DATE,
  done BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create savings_goals table
CREATE TABLE savings_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target INTEGER NOT NULL CHECK (target >= 0),
  saved INTEGER NOT NULL DEFAULT 0 CHECK (saved >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create focus_sessions table
CREATE TABLE focus_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  minutes INTEGER NOT NULL CHECK (minutes > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create wellbeing_entries table
CREATE TABLE wellbeing_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  mood TEXT NOT NULL CHECK (mood IN ('Great', 'Good', 'Okay', 'Low', 'Rough')),
  sleep REAL NOT NULL CHECK (sleep >= 0 AND sleep <= 12),
  water INTEGER NOT NULL CHECK (water >= 0 AND water <= 12),
  exercised BOOLEAN NOT NULL DEFAULT FALSE,
  note TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE focus_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE wellbeing_entries ENABLE ROW LEVEL SECURITY;

-- RLS policies for profiles
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- RLS policies for todos
CREATE POLICY "select_own_todos" ON todos FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_todos" ON todos FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_todos" ON todos FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_todos" ON todos FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- RLS policies for goals
CREATE POLICY "select_own_goals" ON goals FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_goals" ON goals FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_goals" ON goals FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_goals" ON goals FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- RLS policies for savings_goals
CREATE POLICY "select_own_savings_goals" ON savings_goals FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_savings_goals" ON savings_goals FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_savings_goals" ON savings_goals FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_savings_goals" ON savings_goals FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- RLS policies for focus_sessions
CREATE POLICY "select_own_focus_sessions" ON focus_sessions FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_focus_sessions" ON focus_sessions FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_focus_sessions" ON focus_sessions FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- RLS policies for wellbeing_entries
CREATE POLICY "select_own_wellbeing_entries" ON wellbeing_entries FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_wellbeing_entries" ON wellbeing_entries FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_wellbeing_entries" ON wellbeing_entries FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_todos_user_date ON todos(user_id, date);
CREATE INDEX idx_focus_sessions_user_date ON focus_sessions(user_id, date);
CREATE INDEX idx_wellbeing_entries_user_date ON wellbeing_entries(user_id, date);