import { TaskCard, type Task, type Difficulty } from "./TaskCard";
import { EmptyState } from "./EmptyState";

interface TaskListProps {
  tasks: Task[];
  motivationLevel: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  filter: "all" | "recommended";
}

const getDifficultyScore = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case "easy": return 1;
    case "medium": return 2;
    case "hard": return 3;
  }
};

const getRecommendedMaxDifficulty = (motivation: number): number => {
  if (motivation <= 3) return 1;
  if (motivation <= 6) return 2;
  return 3;
};

export function TaskList({ tasks, motivationLevel, onToggle, onDelete, filter }: TaskListProps) {
  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  
  const filteredIncompleteTasks = filter === "recommended"
    ? incompleteTasks.filter(
        (t) => getDifficultyScore(t.difficulty) <= getRecommendedMaxDifficulty(motivationLevel)
      )
    : incompleteTasks;

  if (tasks.length === 0) {
    return <EmptyState motivationLevel={motivationLevel} />;
  }

  return (
    <div className="space-y-6">
      {filteredIncompleteTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">
            {filter === "recommended" ? "Recommended for you" : "To do"} ({filteredIncompleteTasks.length})
          </h3>
          <div className="space-y-2">
            {filteredIncompleteTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {filter === "recommended" && filteredIncompleteTasks.length === 0 && incompleteTasks.length > 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">
            No tasks match your current energy level. 
            <br />
            Try adding easier tasks or boosting your motivation!
          </p>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">
            Completed ({completedTasks.length})
          </h3>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
