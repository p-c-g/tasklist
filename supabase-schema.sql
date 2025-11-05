-- Supabase Database Schema for Todo App
-- Run this SQL in your Supabase SQL Editor

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  emoji TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id TEXT NOT NULL
);

-- Create an index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_todos_user_id ON todos(user_id);

-- Create an index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Enable all operations for all users" ON todos;

-- Create simple policy that allows all operations for demo
-- This allows the demo user ID to work without authentication
CREATE POLICY "Enable all operations for all users"
  ON todos
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Optional: Add a comment to the table
COMMENT ON TABLE todos IS 'Stores user todo tasks with emoji support';

-- Verify the table was created
SELECT 
  table_name, 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'todos'
ORDER BY ordinal_position;

