import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Difficulty } from "./TaskCard";

interface TaskFormProps {
  onSubmit: (title: string, difficulty: Difficulty) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), difficulty);
      setTitle("");
    }
  };

  const difficultyOptions: { value: Difficulty; label: string }[] = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you want to accomplish?"
          className="flex-1"
          data-testid="input-task-title"
        />
        <Button type="submit" disabled={!title.trim()} data-testid="button-add-task">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>
      <div className="flex gap-2">
        {difficultyOptions.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={difficulty === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => setDifficulty(option.value)}
            className="flex-1"
            data-testid={`button-difficulty-${option.value}`}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </form>
  );
}
