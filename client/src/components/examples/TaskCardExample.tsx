import { TaskCard } from "../TaskCard";
import { ThemeProvider } from "../ThemeProvider";

export default function TaskCardExample() {
  const tasks = [
    { 
      id: "1", 
      title: "Drink a glass of water", 
      difficulty: "easy" as const, 
      completed: false,
      category: "personal",
      duration: 5,
      hasTimer: true,
      hasReminder: false,
    },
    { 
      id: "2", 
      title: "Review project proposal", 
      difficulty: "medium" as const, 
      completed: false,
      category: "study",
      duration: 30,
      hasTimer: false,
      hasReminder: true,
      reminderTime: "14:00",
    },
    { 
      id: "3", 
      title: "Complete quarterly report", 
      difficulty: "hard" as const, 
      completed: true,
      category: "custom",
      duration: 60,
    },
  ];

  return (
    <ThemeProvider>
      <div className="bg-background p-4 space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={(id) => console.log("Toggle task:", id)}
            onDelete={(id) => console.log("Delete task:", id)}
          />
        ))}
      </div>
    </ThemeProvider>
  );
}
