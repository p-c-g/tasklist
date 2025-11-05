"use client";

import { useState, useEffect } from "react";
import { ListTodo, CheckCircle2, Circle, Trash2 } from "lucide-react";
import { Todo, FilterType } from "@/types/todo";
import { TodoItem } from "./todo-item";
import { TodoInput } from "./todo-input";
import { Button } from "./ui/button";

const STORAGE_KEY = "todos";

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [mounted, setMounted] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse todos from localStorage", e);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, mounted]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;
  const completedTodosCount = todos.filter((todo) => todo.completed).length;

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <ListTodo className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Todo List</h1>
        </div>
        <p className="text-muted-foreground">
          Stay organized and get things done
        </p>
      </div>

      {/* Input */}
      <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
        <TodoInput onAdd={addTodo} />
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="gap-2"
          >
            <ListTodo className="h-4 w-4" />
            All ({todos.length})
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("active")}
            className="gap-2"
          >
            <Circle className="h-4 w-4" />
            Active ({activeTodosCount})
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("completed")}
            className="gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Completed ({completedTodosCount})
          </Button>
        </div>

        {completedTodosCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={clearCompleted}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear Completed
          </Button>
        )}
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-lg">
              {filter === "completed"
                ? "No completed tasks yet"
                : filter === "active"
                ? "No active tasks"
                : "No tasks yet. Add one above!"}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        )}
      </div>

      {/* Footer Stats */}
      {todos.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          {activeTodosCount === 0
            ? "🎉 All tasks completed!"
            : `${activeTodosCount} ${
                activeTodosCount === 1 ? "task" : "tasks"
              } remaining`}
        </div>
      )}
    </div>
  );
}

