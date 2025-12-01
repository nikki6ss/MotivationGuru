import { EmptyState } from "../EmptyState";
import { ThemeProvider } from "../ThemeProvider";

export default function EmptyStateExample() {
  return (
    <ThemeProvider>
      <div className="bg-background p-4">
        <EmptyState motivationLevel={5} />
      </div>
    </ThemeProvider>
  );
}
