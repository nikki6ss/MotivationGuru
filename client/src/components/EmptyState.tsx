import { ClipboardList, Sparkles } from "lucide-react";

interface EmptyStateProps {
  motivationLevel: number;
}

export function EmptyState({ motivationLevel }: EmptyStateProps) {
  const getMessage = () => {
    if (motivationLevel <= 3) {
      return {
        title: "Start Small",
        description: "Add a simple task to get started. Even tiny wins count!",
      };
    }
    if (motivationLevel <= 6) {
      return {
        title: "Ready to Begin",
        description: "Add some tasks and make progress at your own pace.",
      };
    }
    return {
      title: "Let's Go!",
      description: "You're full of energy! Add some challenging tasks to tackle.",
    };
  };

  const { title, description } = getMessage();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="relative mb-6">
        <ClipboardList className="h-16 w-16 text-muted-foreground/40" />
        <Sparkles className="h-6 w-6 text-primary absolute -top-1 -right-1" />
      </div>
      <h3 className="text-xl font-semibold mb-2" data-testid="text-empty-title">
        {title}
      </h3>
      <p className="text-muted-foreground max-w-sm" data-testid="text-empty-description">
        {description}
      </p>
    </div>
  );
}
