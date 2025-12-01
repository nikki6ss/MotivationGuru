import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MotivationSlider } from "@/components/MotivationSlider";
import { TaskCategoryModal, type CustomCategory } from "@/components/TaskCategoryModal";
import { TaskList } from "@/components/TaskList";
import { StatsPanel } from "@/components/StatsPanel";
import { MotivationalMessage } from "@/components/MotivationalMessage";
import { ActionPanel } from "@/components/ActionPanel";
import type { Task, Difficulty } from "@/components/TaskCard";
import { Sparkles, ListTodo, BarChart3, Settings } from "lucide-react";

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

  const [waterCount, setWaterCount] = useState(() => {
    const saved = localStorage.getItem("waterCount");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [filter, setFilter] = useState<"all" | "recommended">("recommended");
  const [activeTab, setActiveTab] = useState("tasks");
  const [hideCompleted, setHideCompleted] = useState(() => {
    const saved = localStorage.getItem("hideCompleted");
    return saved ? JSON.parse(saved) : false;
  });
  const [setupDialogOpen, setSetupDialogOpen] = useState(false);

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

  useEffect(() => {
    localStorage.setItem("waterCount", waterCount.toString());
  }, [waterCount]);

  useEffect(() => {
    localStorage.setItem("hideCompleted", JSON.stringify(hideCompleted));
  }, [hideCompleted]);

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

  const resetDailyTasks = () => {
    setTasks((prev) => prev.map((task) => ({ ...task, completed: false })));
  };

  const handleSpotifyClick = () => {
    setSetupDialogOpen(true);
  };

  const toggleHideCompleted = () => {
    setHideCompleted((prev: boolean) => !prev);
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
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSetupDialogOpen(true)}
              data-testid="button-setup"
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              Setup
            </Button>
            <ThemeToggle />
          </div>
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

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col">
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

                <div className="flex-1 overflow-y-auto">
                  <TabsContent value="tasks" className="mt-0">
                    <TaskList
                      tasks={tasks}
                      motivationLevel={motivation}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                      filter={filter}
                      hideCompleted={hideCompleted}
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
                </div>
              </Tabs>

              <div className="pt-4 border-t">
                <ActionPanel
                  onReset={resetDailyTasks}
                  waterCount={waterCount}
                  onWaterAdd={() => setWaterCount((prev) => prev + 1)}
                  onSpotifyClick={handleSpotifyClick}
                  hideCompleted={hideCompleted}
                  onToggleHideCompleted={toggleHideCompleted}
                />
              </div>
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

      <Dialog open={setupDialogOpen} onOpenChange={setSetupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Spotify</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To use the Spotify playlist feature, you need to connect your Spotify account.
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="font-medium text-sm">How to connect:</p>
              <ol className="text-sm space-y-2 text-muted-foreground list-decimal list-inside">
                <li>Click on your <strong>Workspace</strong> name at the top left</li>
                <li>Select <strong>"Connectors"</strong> from the sidebar menu</li>
                <li>Click <strong>"Add new integration"</strong></li>
                <li>Find and click on <strong>"Spotify"</strong> from the list</li>
                <li>Follow the Spotify login and authorize the app</li>
                <li>Once connected, the playlist button will work!</li>
              </ol>
            </div>
            <p className="text-xs text-muted-foreground">
              Spotify integration is powered by Replit's connector system. Your authentication is secure and managed by Replit.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
