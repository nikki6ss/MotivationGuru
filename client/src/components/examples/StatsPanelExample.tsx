import { StatsPanel } from "../StatsPanel";
import { ThemeProvider } from "../ThemeProvider";

export default function StatsPanelExample() {
  return (
    <ThemeProvider>
      <div className="bg-background p-4 max-w-sm">
        <StatsPanel tasksCompleted={3} totalTasks={5} streak={4} motivationLevel={7} />
      </div>
    </ThemeProvider>
  );
}
