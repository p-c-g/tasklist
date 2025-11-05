"use client";

import { useState, useEffect } from "react";
import { ListTodo, CheckCircle2, Circle, Trash2 } from "lucide-react";
import { Todo, FilterType } from "@/types/todo";
import { TodoItem } from "./todo-item";
import { Sidebar } from "./sidebar";
import { Button } from "./ui/button";
import { suggestEmoji } from "@/lib/emoji-suggester";
import { triggerConfetti, triggerCelebration } from "@/lib/confetti";
import { todosService } from "@/lib/todos-service";

const STORAGE_KEY = "todos";

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [useSupabase, setUseSupabase] = useState(false);

  // Load todos on mount
  useEffect(() => {
    setMounted(true);
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);
    
    // Check if Supabase is configured
    const isSupabaseConfigured = todosService.isConfigured();
    setUseSupabase(isSupabaseConfigured);

    if (isSupabaseConfigured) {
      // Use Supabase
      const fetchedTodos = await todosService.fetchTodos();
      setTodos(fetchedTodos);
    } else {
      // Fallback to localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setTodos(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse todos from localStorage", e);
        }
      }
    }
    
    setLoading(false);
  };

  // Save to localStorage when not using Supabase
  useEffect(() => {
    if (mounted && !useSupabase) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, mounted, useSupabase]);

  const addTodo = async (text: string) => {
    const emoji = suggestEmoji(text);
    const tempTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      emoji,
      createdAt: Date.now(),
    };

    if (useSupabase) {
      // Optimistic update
      setTodos([tempTodo, ...todos]);
      
      // Save to Supabase
      const savedTodo = await todosService.addTodo(tempTodo);
      if (savedTodo) {
        // Replace temp todo with saved todo
        setTodos(prev => prev.map(t => t.id === tempTodo.id ? savedTodo : t));
      } else {
        // Rollback on error
        setTodos(prev => prev.filter(t => t.id !== tempTodo.id));
        console.error('Failed to save todo');
      }
    } else {
      // localStorage fallback
      setTodos([tempTodo, ...todos]);
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const newCompleted = !todo.completed;
    
    // Optimistic update
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, completed: newCompleted } : t
    );
    setTodos(updatedTodos);
    
    // Check if this completion resulted in all tasks being done
    const completingTask = !todo.completed;
    const allComplete = completingTask && updatedTodos.every(t => t.completed);
    
    if (completingTask) {
      // Trigger confetti when completing a task
      triggerConfetti();
      
      // Special celebration when all tasks are complete
      if (allComplete && updatedTodos.length > 0) {
        setTimeout(() => {
          triggerCelebration();
        }, 300);
      }
    }

    // Update in Supabase if configured
    if (useSupabase) {
      const success = await todosService.updateTodo(id, { completed: newCompleted });
      if (!success) {
        // Rollback on error
        setTodos(todos);
        console.error('Failed to update todo');
      }
    }
  };

  const deleteTodo = async (id: string) => {
    // Optimistic update
    const previousTodos = todos;
    setTodos(todos.filter((todo) => todo.id !== id));

    // Delete from Supabase if configured
    if (useSupabase) {
      const success = await todosService.deleteTodo(id);
      if (!success) {
        // Rollback on error
        setTodos(previousTodos);
        console.error('Failed to delete todo');
      }
    }
  };

  const editTodo = async (id: string, text: string) => {
    // Optimistic update
    const previousTodos = todos;
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );

    // Update in Supabase if configured
    if (useSupabase) {
      const success = await todosService.updateTodo(id, { text });
      if (!success) {
        // Rollback on error
        setTodos(previousTodos);
        console.error('Failed to update todo');
      }
    }
  };

  const clearCompleted = async () => {
    const completedIds = todos.filter(t => t.completed).map(t => t.id);
    
    // Optimistic update
    const previousTodos = todos;
    setTodos(todos.filter((todo) => !todo.completed));

    // Delete from Supabase if configured
    if (useSupabase) {
      const success = await todosService.deleteTodos(completedIds);
      if (!success) {
        // Rollback on error
        setTodos(previousTodos);
        console.error('Failed to clear completed todos');
      }
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;
  const completedTodosCount = todos.filter((todo) => todo.completed).length;

  // Prevent hydration mismatch
  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar
        onAddTodo={addTodo}
        totalTasks={todos.length}
        activeTasks={activeTodosCount}
        completedTasks={completedTodosCount}
        useSupabase={useSupabase}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <ListTodo className="h-8 w-8 text-primary" aria-hidden="true" />
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">My Tasks</h1>
            </div>
            <p className="text-muted-foreground">
              Stay organized and get things done
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between gap-4 flex-wrap" role="toolbar" aria-label="Task filters">
            <div className="flex gap-2" role="group" aria-label="Filter tasks">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className="gap-2"
                aria-pressed={filter === "all"}
                aria-label={`Show all tasks (${todos.length})`}
              >
                <ListTodo className="h-4 w-4" aria-hidden="true" />
                All ({todos.length})
              </Button>
              <Button
                variant={filter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("active")}
                className="gap-2"
                aria-pressed={filter === "active"}
                aria-label={`Show active tasks (${activeTodosCount})`}
              >
                <Circle className="h-4 w-4" aria-hidden="true" />
                Active ({activeTodosCount})
              </Button>
              <Button
                variant={filter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("completed")}
                className="gap-2"
                aria-pressed={filter === "completed"}
                aria-label={`Show completed tasks (${completedTodosCount})`}
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Completed ({completedTodosCount})
              </Button>
            </div>

            {completedTodosCount > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={clearCompleted}
                className="gap-2"
                aria-label={`Clear ${completedTodosCount} completed ${completedTodosCount === 1 ? 'task' : 'tasks'}`}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Clear Completed
              </Button>
            )}
          </div>

          {/* Todo List */}
          <div className="space-y-2" role="list" aria-label={`${filter === "all" ? "All" : filter === "active" ? "Active" : "Completed"} tasks`}>
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground" role="status">
                <div className="text-6xl mb-4" aria-hidden="true">📝</div>
                <p className="text-lg">
                  {filter === "completed"
                    ? "No completed tasks yet"
                    : filter === "active"
                    ? "No active tasks"
                    : "No tasks yet. Add one in the sidebar!"}
                </p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div key={todo.id} role="listitem">
                  <TodoItem
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                </div>
              ))
            )}
          </div>

          {/* Footer Stats */}
          {todos.length > 0 && (
            <div className="text-center text-sm text-muted-foreground" role="status" aria-live="polite">
              {activeTodosCount === 0
                ? "🎉 All tasks completed!"
                : `${activeTodosCount} ${
                    activeTodosCount === 1 ? "task" : "tasks"
                  } remaining`}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

