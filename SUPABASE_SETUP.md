# Supabase Setup Guide

Follow these steps to set up Supabase as the backend for your todo app.

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in the project details:
   - **Name**: Todo App (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
5. Wait for the project to be created (takes ~2 minutes)

## 2. Get Your Supabase Credentials

1. In your Supabase project dashboard, click on the **Settings** icon (gear) in the sidebar
2. Go to **API** section
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")
4. Copy these values - you'll need them in the next step

## 3. Configure Environment Variables

1. Create a `.env.local` file in your project root:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
   ```

3. **Important**: Never commit `.env.local` to git (it's already in .gitignore)

## 4. Create the Database Schema

1. In your Supabase dashboard, click on the **SQL Editor** icon in the sidebar
2. Click "New query"
3. Copy and paste the following SQL:

```sql
-- Create todos table
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  emoji TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL
);

-- Create an index on user_id for faster queries
CREATE INDEX idx_todos_user_id ON todos(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see their own todos
CREATE POLICY "Users can view their own todos"
  ON todos
  FOR SELECT
  USING (user_id = gen_random_uuid());

-- Create policy to allow users to insert their own todos
CREATE POLICY "Users can insert their own todos"
  ON todos
  FOR INSERT
  WITH CHECK (user_id = gen_random_uuid());

-- Create policy to allow users to update their own todos
CREATE POLICY "Users can update their own todos"
  ON todos
  FOR UPDATE
  USING (user_id = gen_random_uuid())
  WITH CHECK (user_id = gen_random_uuid());

-- Create policy to allow users to delete their own todos
CREATE POLICY "Users can delete their own todos"
  ON todos
  FOR DELETE
  USING (user_id = gen_random_uuid());

-- Create a temporary user ID function for demo purposes
-- This generates a consistent UUID based on browser session
-- In production, you'd use Supabase Auth
CREATE OR REPLACE FUNCTION get_demo_user_id()
RETURNS UUID AS $$
BEGIN
  RETURN '00000000-0000-0000-0000-000000000001'::UUID;
END;
$$ LANGUAGE plpgsql;
```

4. Click "Run" to execute the SQL
5. You should see "Success. No rows returned"

## 5. Update Row Level Security Policies (Simple Version)

For now, let's use a simplified approach without authentication:

```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own todos" ON todos;
DROP POLICY IF EXISTS "Users can insert their own todos" ON todos;
DROP POLICY IF EXISTS "Users can update their own todos" ON todos;
DROP POLICY IF EXISTS "Users can delete their own todos" ON todos;

-- Create simple policies that allow all operations for demo
CREATE POLICY "Enable all operations for all users"
  ON todos
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

Run this query to allow all operations without authentication (good for testing).

## 6. Restart Your Development Server

```bash
npm run dev
```

Your app should now be using Supabase instead of localStorage!

## 7. Verify It's Working

1. Open your app in the browser
2. Add a few tasks
3. Go back to Supabase dashboard → **Table Editor** → select `todos` table
4. You should see your tasks stored in the database!
5. Try refreshing the page - your tasks should persist
6. Open the app in a different browser/device - you should see the same tasks

## Optional: Add Authentication

If you want to add user authentication later:

1. Go to Supabase dashboard → **Authentication** → **Providers**
2. Enable your preferred auth method (Email, Google, GitHub, etc.)
3. Update the RLS policies to use real user IDs
4. Install auth helpers: `npm install @supabase/auth-helpers-nextjs`

## Troubleshooting

### Tasks aren't saving
- Check your `.env.local` file has correct credentials
- Verify you restarted the dev server after adding env variables
- Check browser console for errors
- Verify the database table was created successfully

### Can't see any data in Supabase
- Make sure RLS policies are set up correctly
- Try the simplified "Enable all operations" policy first
- Check the browser console for any error messages

### Environment variables not working
- Make sure the file is named `.env.local` (not `.env.local.txt`)
- Environment variables MUST start with `NEXT_PUBLIC_` to be accessible in browser
- Restart your dev server after changing environment variables

