-- Add task_id to focus_sessions for task-specific pomodoro
ALTER TABLE focus_sessions ADD COLUMN task_id UUID REFERENCES todos(id) ON DELETE SET NULL;

-- Update RLS policy to allow selecting based on task ownership
-- No change needed for existing policies; task_id is nullable and doesn't affect ownership
