import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MotivationSlider } from "@/components/MotivationSlider";
import { TaskCategoryModal, type CustomCategory } from "@/components/TaskCategoryModal";
import { TaskList } from "@/components/TaskList";
import { StatsPanel } from "@/components/StatsPanel";
import { MotivationalMessage } from "@/components/MotivationalMessage";
import type { Task, Difficulty } from "@/components/TaskCard";
import { Sparkles, ListTodo, BarChart3 } from "lucide-react";

export default function Home() {
  const [motivation, setMotivation] = useState(() => {
    const saved = localStorage.getItem("motivation");
    return saved ? parseInt(saved, 10) : 5;
  });
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("streak");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [customCategories, setCustomCategories] = useState<CustomCategory[]>(() => {
    const saved = localStorage.getItem("customCategories");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<"all" | "recommended">("recommended");
  const [activeTab, setActiveTab] = useState("tasks");

  useEffect(() => {
    localStorage.setItem("motivation", motivation.toString());
  }, [motivation]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("streak", streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("customCategories", JSON.stringify(customCategories));
  }, [customCategories]);

  const addTask = (taskData: {
    title: string;
    difficulty: Difficulty;
    category: string;
    duration?: number;
    hasTimer: boolean;
    hasReminder: boolean;
    reminderTime?: string;
  }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      difficulty: taskData.difficulty,
      completed: false,
      category: taskData.category,
      duration: taskData.duration,
      hasTimer: taskData.hasTimer,
      hasReminder: taskData.hasReminder,
      reminderTime: taskData.reminderTime,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const addCategory = (category: CustomCategory) => {
    setCustomCategories((prev) => [...prev, category]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    const task = tasks.find((t) => t.id === id);
    if (task && !task.completed) {
      setStreak((prev) => prev + 1);
    }
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const tasksCompleted = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MotiTask</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Card className="mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
              <MotivationSlider value={motivation} onChange={setMotivation} />
            </div>
          </Card>

          <div className="mb-6">
            <MotivationalMessage
              tasksCompleted={tasksCompleted}
              totalTasks={tasks.length}
              motivationLevel={motivation}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-lg font-semibold">Your Tasks</h2>
                <TaskCategoryModal 
                  motivationLevel={motivation} 
                  customCategories={customCategories}
                  onAddTask={addTask}
                  onAddCategory={addCategory}
                />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <TabsList>
                    <TabsTrigger value="tasks" data-testid="tab-tasks">
                      <ListTodo className="h-4 w-4 mr-2" />
                      Tasks
                    </TabsTrigger>
                    <TabsTrigger value="stats" className="lg:hidden" data-testid="tab-stats-mobile">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Stats
                    </TabsTrigger>
                  </TabsList>

                  {activeTab === "tasks" && (
                    <div className="flex gap-2">
                      <Button
                        variant={filter === "recommended" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter("recommended")}
                        data-testid="button-filter-recommended"
                      >
                        Recommended
                      </Button>
                      <Button
                        variant={filter === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter("all")}
                        data-testid="button-filter-all"
                      >
                        All
                      </Button>
                    </div>
                  )}
                </div>

                <TabsContent value="tasks" className="mt-0">
                  <TaskList
                    tasks={tasks}
                    motivationLevel={motivation}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    filter={filter}
                  />
                </TabsContent>

                <TabsContent value="stats" className="lg:hidden mt-0">
                  <StatsPanel
                    tasksCompleted={tasksCompleted}
                    totalTasks={tasks.length}
                    streak={streak}
                    motivationLevel={motivation}
                  />
                </TabsContent>
              </Tabs>
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                <StatsPanel
                  tasksCompleted={tasksCompleted}
                  totalTasks={tasks.length}
                  streak={streak}
                  motivationLevel={motivation}
                />
                <Link href="/progress">
                  <Button variant="outline" className="w-full gap-2" data-testid="button-view-progress">
                    <BarChart3 className="h-4 w-4" />
                    View Full Progress
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
