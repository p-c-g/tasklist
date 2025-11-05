"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2" aria-label="Add new task">
      <Input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1"
        aria-label="New task description"
        autoComplete="off"
      />
      <Button type="submit" size="icon" aria-label="Add task" disabled={!text.trim()}>
        <Plus className="h-5 w-5" />
      </Button>
    </form>
  );
}

