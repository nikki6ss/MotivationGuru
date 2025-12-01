import { Card } from "@/components/ui/card";
import { ProgressRing } from "./ProgressRing";
import { Flame, Target, TrendingUp } from "lucide-react";

interface StatsPanelProps {
  tasksCompleted: number;
  totalTasks: number;
  streak: number;
  motivationLevel: number;
}

export function StatsPanel({ tasksCompleted, totalTasks, streak, motivationLevel }: StatsPanelProps) {
  const completionRate = totalTasks > 0 ? (tasksCompleted / totalTasks) * 100 : 0;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
      
      <div className="flex justify-center mb-6">
        <ProgressRing
          progress={completionRate}
          size={140}
          strokeWidth={12}
          label="Tasks Done"
          sublabel={`${tasksCompleted} of ${totalTasks}`}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-orange-500/10">
              <Flame className="h-4 w-4 text-orange-500" />
            </div>
            <span className="text-sm font-medium">Current Streak</span>
          </div>
          <span className="text-lg font-bold" data-testid="text-streak-value">
            {streak} {streak === 1 ? "day" : "days"}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium">Energy Level</span>
          </div>
          <span className="text-lg font-bold" data-testid="text-energy-value">
            {motivationLevel}/10
          </span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-emerald-500/10">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <span className="text-sm font-medium">Completion Rate</span>
          </div>
          <span className="text-lg font-bold" data-testid="text-completion-rate">
            {Math.round(completionRate)}%
          </span>
        </div>
      </div>
    </Card>
  );
}
