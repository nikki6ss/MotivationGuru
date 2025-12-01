import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Clock, Bell, Play, Pause, RotateCcw } from "lucide-react";

export type Difficulty = "easy" | "medium" | "hard";

export interface Task {
  id: string;
  title: string;
  difficulty: Difficulty;
  completed: boolean;
  category?: string;
  duration?: number;
  hasTimer?: boolean;
  hasReminder?: boolean;
  reminderTime?: string;
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

const categoryIcons: Record<string, string> = {
  study: "📚",
  fitness: "💪",
  cleaning: "✨",
  personal: "👤",
  hobby: "🎨",
  mood: "❤️",
  custom: "📝",
};

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState((task.duration || 15) * 60);
  const config = difficultyConfig[task.difficulty];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setTimeRemaining((task.duration || 15) * 60);
    setTimerActive(false);
  };

  return (
    <Card
      className={`p-4 transition-all duration-200 ${
        task.completed ? "opacity-60" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-task-${task.id}`}
    >
      <div className="flex items-start gap-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          data-testid={`checkbox-task-${task.id}`}
          className="h-5 w-5 mt-0.5"
        />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            {task.category && (
              <span className="text-sm" title={task.category}>
                {categoryIcons[task.category] || "📋"}
              </span>
            )}
            <p
              className={`text-base font-medium transition-all duration-200 ${
                task.completed ? "line-through text-muted-foreground" : ""
              }`}
              data-testid={`text-task-title-${task.id}`}
            >
              {task.title}
            </p>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap">
            {task.duration && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {task.duration} min
              </span>
            )}
            {task.hasReminder && task.reminderTime && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Bell className="h-3 w-3" />
                {task.reminderTime}
              </span>
            )}
          </div>

          {task.hasTimer && !task.completed && (
            <div className="flex items-center gap-2 mt-2">
              <div className={`font-mono text-sm px-2 py-1 rounded ${
                timerActive ? "bg-primary/10 text-primary" : "bg-muted"
              }`}>
                {formatTime(timeRemaining)}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setTimerActive(!timerActive)}
                data-testid={`button-timer-toggle-${task.id}`}
              >
                {timerActive ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={resetTimer}
                data-testid={`button-timer-reset-${task.id}`}
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge 
            variant="outline" 
            className={`text-xs ${config.className}`}
            data-testid={`badge-difficulty-${task.id}`}
          >
            {config.label}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className={`text-muted-foreground transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            style={{ visibility: isHovered ? "visible" : "hidden" }}
            data-testid={`button-delete-task-${task.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
