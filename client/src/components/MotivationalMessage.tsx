import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Lightbulb, Heart, Trophy, Star, Flame } from "lucide-react";

interface MotivationalMessageProps {
  tasksCompleted: number;
  totalTasks: number;
  motivationLevel: number;
}

const icons = [Lightbulb, Heart, Trophy, Star, Flame];

const messages = {
  noTasks: [
    "Every journey begins with a single step. Add your first task!",
    "Your potential is limitless. Let's start building momentum.",
    "Today is a fresh start. What would you like to accomplish?",
  ],
  lowProgress: [
    "You've started! That takes courage. Keep going.",
    "Progress, not perfection. You're doing great.",
    "Small steps lead to big changes. Nice work!",
  ],
  midProgress: [
    "You're making real progress! Keep up the momentum.",
    "Half way there! You should be proud of yourself.",
    "Your effort is paying off. Stay focused!",
  ],
  highProgress: [
    "Almost there! You're crushing it today.",
    "So close to finishing! You've got this.",
    "Incredible progress! One more push!",
  ],
  complete: [
    "You did it! All tasks complete. Celebrate this win!",
    "Amazing! You've accomplished everything on your list.",
    "Perfect execution! Take a moment to appreciate your effort.",
  ],
  lowEnergy: [
    "It's okay to take it slow. You showed up, and that matters.",
    "Even on low energy days, small wins count. Be gentle with yourself.",
    "Rest when you need to. Tomorrow is another opportunity.",
  ],
};

export function MotivationalMessage({
  tasksCompleted,
  totalTasks,
  motivationLevel,
}: MotivationalMessageProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [iconIndex, setIconIndex] = useState(0);

  useEffect(() => {
    setMessageIndex(Math.floor(Math.random() * 3));
    setIconIndex(Math.floor(Math.random() * icons.length));
  }, [tasksCompleted, totalTasks]);

  const getMessage = (): string => {
    if (totalTasks === 0) {
      return messages.noTasks[messageIndex];
    }
    if (motivationLevel <= 3) {
      return messages.lowEnergy[messageIndex];
    }
    
    const progress = tasksCompleted / totalTasks;
    
    if (progress === 1) {
      return messages.complete[messageIndex];
    }
    if (progress >= 0.75) {
      return messages.highProgress[messageIndex];
    }
    if (progress >= 0.4) {
      return messages.midProgress[messageIndex];
    }
    return messages.lowProgress[messageIndex];
  };

  const IconComponent = icons[iconIndex];

  return (
    <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-primary/10">
          <IconComponent className="h-5 w-5 text-primary" />
        </div>
        <p className="text-sm font-medium" data-testid="text-motivational-message">
          {getMessage()}
        </p>
      </div>
    </Card>
  );
}
