import { TaskForm } from "../TaskForm";
import { ThemeProvider } from "../ThemeProvider";

export default function TaskFormExample() {
  return (
    <ThemeProvider>
      <div className="bg-background p-4 max-w-lg">
        <TaskForm onSubmit={(title, difficulty) => console.log("Add task:", title, difficulty)} />
      </div>
    </ThemeProvider>
  );
}
