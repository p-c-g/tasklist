"use client";

import { supabase } from './supabase';
import { Todo } from '@/types/todo';

// Simple user ID for demo purposes (stored in localStorage)
// In production, you'd use Supabase Auth
const DEMO_USER_ID = 'demo-user-001';

// Convert Supabase row to Todo type
function mapRowToTodo(row: any): Todo {
  return {
    id: row.id,
    text: row.text,
    completed: row.completed,
    emoji: row.emoji,
    createdAt: new Date(row.created_at).getTime(),
  };
}

export const todosService = {
  // Fetch all todos for the current user
  async fetchTodos(): Promise<Todo[]> {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', DEMO_USER_ID)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching todos:', error);
        return [];
      }

      return data?.map(mapRowToTodo) || [];
    } catch (error) {
      console.error('Error fetching todos:', error);
      return [];
    }
  },

  // Add a new todo
  async addTodo(todo: Omit<Todo, 'id' | 'createdAt'> & { id?: string; createdAt?: number }): Promise<Todo | null> {
    try {
      const { data, error } = await supabase
        .from('todos')
        .insert({
          id: todo.id,
          text: todo.text,
          completed: todo.completed,
          emoji: todo.emoji || null,
          user_id: DEMO_USER_ID,
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding todo:', error);
        return null;
      }

      return mapRowToTodo(data);
    } catch (error) {
      console.error('Error adding todo:', error);
      return null;
    }
  },

  // Update an existing todo
  async updateTodo(id: string, updates: Partial<Todo>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('todos')
        .update({
          text: updates.text,
          completed: updates.completed,
          emoji: updates.emoji,
        })
        .eq('id', id)
        .eq('user_id', DEMO_USER_ID);

      if (error) {
        console.error('Error updating todo:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating todo:', error);
      return false;
    }
  },

  // Delete a todo
  async deleteTodo(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', DEMO_USER_ID);

      if (error) {
        console.error('Error deleting todo:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting todo:', error);
      return false;
    }
  },

  // Delete multiple todos (for clear completed)
  async deleteTodos(ids: string[]): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .in('id', ids)
        .eq('user_id', DEMO_USER_ID);

      if (error) {
        console.error('Error deleting todos:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting todos:', error);
      return false;
    }
  },

  // Check if Supabase is configured
  isConfigured(): boolean {
    return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  },
};

