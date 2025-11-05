"use client";

import { Plus } from "lucide-react";
import { TodoInput } from "./todo-input";

interface SidebarProps {
  onAddTodo: (text: string) => void;
  totalTasks: number;
  activeTasks: number;
  completedTasks: number;
}

export function Sidebar({ onAddTodo, totalTasks, activeTasks, completedTasks }: SidebarProps) {
  return (
    <aside 
      className="w-full lg:w-80 lg:min-h-screen bg-card border-b lg:border-b-0 lg:border-r border-border p-6 lg:sticky lg:top-0"
      aria-label="Task management sidebar"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Plus className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-card-foreground">Add Task</h2>
              <p className="text-sm text-muted-foreground">Create a new todo</p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          <TodoInput onAdd={onAddTodo} />
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Stats */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-card-foreground uppercase tracking-wider">
            Statistics
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-background">
              <span className="text-sm text-muted-foreground">Total Tasks</span>
              <span className="text-lg font-bold text-card-foreground">{totalTasks}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-background">
              <span className="text-sm text-muted-foreground">Active</span>
              <span className="text-lg font-bold text-primary">{activeTasks}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-background">
              <span className="text-sm text-muted-foreground">Completed</span>
              <span className="text-lg font-bold text-secondary-foreground">{completedTasks}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {totalTasks > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-card-foreground">
                {Math.round((completedTasks / totalTasks) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-background rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  completedTasks === totalTasks 
                    ? 'bg-gradient-to-r from-primary via-accent to-primary animate-pulse-glow' 
                    : 'bg-primary'
                }`}
                style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
                role="progressbar"
                aria-valuenow={(completedTasks / totalTasks) * 100}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${Math.round((completedTasks / totalTasks) * 100)}% of tasks completed`}
              />
            </div>
            {completedTasks === totalTasks && (
              <div className="text-center py-2 animate-bounce-in">
                <span className="text-2xl">🎉</span>
                <p className="text-xs font-semibold text-primary mt-1">
                  All tasks completed!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

