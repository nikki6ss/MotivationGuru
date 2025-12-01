import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export type Difficulty = "easy" | "medium" | "hard";

export interface Task {
  id: string;
  title: string;
  difficulty: Difficulty;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: { 
    label: "Easy", 
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
  },
  medium: { 
    label: "Medium", 
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" 
  },
  hard: { 
    label: "Hard", 
    className: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" 
  },
};

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const config = difficultyConfig[task.difficulty];

  return (
    <Card
      className={`p-4 transition-all duration-200 ${
        task.completed ? "opacity-60" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-task-${task.id}`}
    >
      <div className="flex items-center gap-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          data-testid={`checkbox-task-${task.id}`}
          className="h-5 w-5"
        />
        <div className="flex-1 min-w-0">
          <p
            className={`text-base font-medium truncate transition-all duration-200 ${
              task.completed ? "line-through text-muted-foreground" : ""
            }`}
            data-testid={`text-task-title-${task.id}`}
          >
            {task.title}
          </p>
        </div>
        <Badge 
          variant="outline" 
          className={`text-xs shrink-0 ${config.className}`}
          data-testid={`badge-difficulty-${task.id}`}
        >
          {config.label}
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
          className={`shrink-0 text-muted-foreground transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ visibility: isHovered ? "visible" : "hidden" }}
          data-testid={`button-delete-task-${task.id}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
