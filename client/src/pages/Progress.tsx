import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProgressRing } from "@/components/ProgressRing";
import { 
  ArrowLeft, Flame, Target, TrendingUp, CheckCircle2, Calendar, Zap,
  BarChart3
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DailyStats {
  date: string;
  day: string;
  tasksCompleted: number;
  motivationLevel: number;
  streak: number;
}

interface ProgressData {
  totalCompleted: number;
  currentStreak: number;
  weeklyConsistency: number;
  momentumPoints: number;
  dailyStats: DailyStats[];
}

export default function Progress() {
  const [progressData, setProgressData] = useState<ProgressData>({
    totalCompleted: 0,
    currentStreak: 0,
    weeklyConsistency: 0,
    momentumPoints: 0,
    dailyStats: [],
  });

  useEffect(() => {
    const loadProgressData = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const streak = parseInt(localStorage.getItem("streak") || "0", 10);
      const motivation = parseInt(localStorage.getItem("motivation") || "5", 10);
      const completedTasks = tasks.filter((t: { completed: boolean }) => t.completed);

      const progressHistory = JSON.parse(localStorage.getItem("progressHistory") || "[]");
      
      const today = new Date().toISOString().split("T")[0];
      const existingToday = progressHistory.find((p: DailyStats) => p.date === today);
      
      if (!existingToday) {
        const newEntry: DailyStats = {
          date: today,
          day: new Date().toLocaleDateString("en-US", { weekday: "short" }),
          tasksCompleted: completedTasks.length,
          motivationLevel: motivation,
          streak: streak,
        };
        progressHistory.push(newEntry);
        localStorage.setItem("progressHistory", JSON.stringify(progressHistory.slice(-30)));
      } else {
        existingToday.tasksCompleted = completedTasks.length;
        existingToday.motivationLevel = motivation;
        existingToday.streak = streak;
        localStorage.setItem("progressHistory", JSON.stringify(progressHistory));
      }

      const last7Days = progressHistory.slice(-7);
      const daysWithActivity = last7Days.filter((d: DailyStats) => d.tasksCompleted > 0).length;
      const weeklyConsistency = Math.round((daysWithActivity / 7) * 100);

      const momentumPoints = completedTasks.length * 10 + streak * 5 + Math.round(weeklyConsistency / 2);

      let chartData = progressHistory.slice(-7);
      
      if (chartData.length < 7) {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const today = new Date();
        const filledData: DailyStats[] = [];
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split("T")[0];
          const dayName = daysOfWeek[date.getDay()];
          
          const existing = chartData.find((d: DailyStats) => d.date === dateStr);
          if (existing) {
            filledData.push(existing);
          } else {
            filledData.push({
              date: dateStr,
              day: dayName,
              tasksCompleted: 0,
              motivationLevel: 5,
              streak: 0,
            });
          }
        }
        chartData = filledData;
      }

      setProgressData({
        totalCompleted: completedTasks.length,
        currentStreak: streak,
        weeklyConsistency,
        momentumPoints,
        dailyStats: chartData,
      });
    };

    loadProgressData();
  }, []);

  const statCards = [
    {
      icon: CheckCircle2,
      label: "Total Completed",
      value: progressData.totalCompleted,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Flame,
      label: "Current Streak",
      value: `${progressData.currentStreak} days`,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Calendar,
      label: "Weekly Consistency",
      value: `${progressData.weeklyConsistency}%`,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Zap,
      label: "Momentum Points",
      value: progressData.momentumPoints,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-home">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Your Progress</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <IconComponent className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold" data-testid={`text-stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Weekly Overview
              </h3>
              <div className="flex justify-center">
                <ProgressRing
                  progress={progressData.weeklyConsistency}
                  size={180}
                  strokeWidth={16}
                  label="This Week"
                  sublabel={`${Math.round(progressData.weeklyConsistency / 100 * 7)} of 7 days active`}
                />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Motivation Trend
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData.dailyStats}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="day" 
                      className="text-muted-foreground"
                      tick={{ fill: 'currentColor', fontSize: 12 }}
                    />
                    <YAxis 
                      domain={[0, 10]} 
                      className="text-muted-foreground"
                      tick={{ fill: 'currentColor', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="motivationLevel" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                      name="Motivation"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Daily Task Completions
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData.dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="day" 
                    className="text-muted-foreground"
                    tick={{ fill: 'currentColor', fontSize: 12 }}
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    tick={{ fill: 'currentColor', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="tasksCompleted" 
                    fill="hsl(var(--chart-1))" 
                    radius={[4, 4, 0, 0]}
                    name="Tasks Completed"
                  />
                  <Bar 
                    dataKey="streak" 
                    fill="hsl(var(--chart-5))" 
                    radius={[4, 4, 0, 0]}
                    name="Streak"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Keep Going!</h3>
                <p className="text-muted-foreground">
                  {progressData.currentStreak > 0
                    ? `You're on a ${progressData.currentStreak}-day streak! Don't break the chain.`
                    : "Complete a task today to start your streak!"}
                </p>
              </div>
              <div className="p-4 rounded-full bg-primary/10">
                <Flame className="h-8 w-8 text-primary" />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
