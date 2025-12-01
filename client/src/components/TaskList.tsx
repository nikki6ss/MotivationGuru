import { TaskCard, type Task, type Difficulty } from "./TaskCard";
import { EmptyState } from "./EmptyState";

interface TaskListProps {
  tasks: Task[];
  motivationLevel: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  filter: "all" | "recommended";
  hideCompleted?: boolean;
}

const getDifficultyScore = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case "easy": return 1;
    case "medium": return 2;
    case "hard": return 3;
  }
};

const getRecommendedDifficulty = (motivation: number): Difficulty => {
  if (motivation <= 3) return "easy";
  if (motivation <= 7) return "medium";
  return "hard";
};

const sortByDifficulty = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    const diffA = getDifficultyScore(a.difficulty);
    const diffB = getDifficultyScore(b.difficulty);
    if (diffA !== diffB) return diffA - diffB;
    return (a.duration || 0) - (b.duration || 0);
  });
};

export function TaskList({ tasks, motivationLevel, onToggle, onDelete, filter, hideCompleted }: TaskListProps) {
  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = hideCompleted ? [] : tasks.filter((t) => t.completed);
  
  const recommendedDifficulty = getRecommendedDifficulty(motivationLevel);
  
  const filteredIncompleteTasks = filter === "recommended"
    ? incompleteTasks.filter((t) => t.difficulty === recommendedDifficulty).slice(0, 3)
    : sortByDifficulty(incompleteTasks);

  const sortedCompletedTasks = sortByDifficulty(completedTasks);

  if (tasks.length === 0) {
    return <EmptyState motivationLevel={motivationLevel} />;
  }

  const getDifficultyLabel = (motivation: number): string => {
    if (motivation <= 3) return "Easy";
    if (motivation <= 7) return "Medium";
    return "Hard";
  };

  const groupTasksByDifficulty = (taskList: Task[]) => {
    const easy = taskList.filter((t) => t.difficulty === "easy");
    const medium = taskList.filter((t) => t.difficulty === "medium");
    const hard = taskList.filter((t) => t.difficulty === "hard");
    return { easy, medium, hard };
  };

  const renderGroupedTasks = (taskList: Task[]) => {
    const grouped = groupTasksByDifficulty(taskList);
    
    return (
      <div className="space-y-6">
        {grouped.easy.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Easy Tasks ({grouped.easy.length})
            </h4>
            <div className="space-y-2">
              {grouped.easy.map((task) => (
                <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
              ))}
            </div>
          </div>
        )}
        {grouped.medium.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Medium Tasks ({grouped.medium.length})
            </h4>
            <div className="space-y-2">
              {grouped.medium.map((task) => (
                <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
              ))}
            </div>
          </div>
        )}
        {grouped.hard.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              Hard Tasks ({grouped.hard.length})
            </h4>
            <div className="space-y-2">
              {grouped.hard.map((task) => (
                <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {filter === "recommended" ? (
        <>
          {filteredIncompleteTasks.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                {getDifficultyLabel(motivationLevel)} tasks for your energy level ({filteredIncompleteTasks.length})
              </h3>
              <div className="space-y-2">
                {filteredIncompleteTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">
                No {getDifficultyLabel(motivationLevel).toLowerCase()} tasks available.
                <br />
                Try adding some {getDifficultyLabel(motivationLevel).toLowerCase()} tasks or adjust your motivation level!
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {filteredIncompleteTasks.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                All Tasks ({filteredIncompleteTasks.length})
              </h3>
              {renderGroupedTasks(filteredIncompleteTasks)}
            </div>
          )}
        </>
      )}

      {sortedCompletedTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">
            Completed ({sortedCompletedTasks.length})
          </h3>
          <div className="space-y-2">
            {sortedCompletedTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
