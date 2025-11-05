export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  emoji?: string;
  createdAt: number;
}

export type FilterType = "all" | "active" | "completed";

