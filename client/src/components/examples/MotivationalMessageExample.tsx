import { MotivationalMessage } from "../MotivationalMessage";
import { ThemeProvider } from "../ThemeProvider";

export default function MotivationalMessageExample() {
  return (
    <ThemeProvider>
      <div className="bg-background p-4 space-y-4 max-w-lg">
        <MotivationalMessage tasksCompleted={2} totalTasks={5} motivationLevel={7} />
        <MotivationalMessage tasksCompleted={0} totalTasks={0} motivationLevel={5} />
      </div>
    </ThemeProvider>
  );
}
