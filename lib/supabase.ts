import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using localStorage fallback.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          id: string;
          text: string;
          completed: boolean;
          emoji: string | null;
          created_at: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          text: string;
          completed?: boolean;
          emoji?: string | null;
          created_at?: string;
          user_id: string;
        };
        Update: {
          id?: string;
          text?: string;
          completed?: boolean;
          emoji?: string | null;
          created_at?: string;
          user_id?: string;
        };
      };
    };
  };
}

