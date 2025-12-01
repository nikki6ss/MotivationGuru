import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, BookOpen, Dumbbell, Sparkles as SparklesIcon, User, Palette, Heart, PenLine,
  ArrowLeft, Clock, Bell, Play, Check, FolderPlus,
  Music, Coffee, Briefcase, Home, ShoppingCart, Utensils, Camera, Gamepad2, Plane, Star
} from "lucide-react";
import type { Difficulty } from "./TaskCard";

interface TaskTemplate {
  title: string;
  baseDifficulty: 1 | 2 | 3;
}

export interface CustomCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  tasks: TaskTemplate[];
}

interface Category {
  id: string;
  name: string;
  icon: typeof BookOpen;
  color: string;
  tasks: TaskTemplate[];
}

const iconOptions = [
  { name: "BookOpen", icon: BookOpen },
  { name: "Dumbbell", icon: Dumbbell },
  { name: "Sparkles", icon: SparklesIcon },
  { name: "User", icon: User },
  { name: "Palette", icon: Palette },
  { name: "Heart", icon: Heart },
  { name: "Music", icon: Music },
  { name: "Coffee", icon: Coffee },
  { name: "Briefcase", icon: Briefcase },
  { name: "Home", icon: Home },
  { name: "ShoppingCart", icon: ShoppingCart },
  { name: "Utensils", icon: Utensils },
  { name: "Camera", icon: Camera },
  { name: "Gamepad2", icon: Gamepad2 },
  { name: "Plane", icon: Plane },
  { name: "Star", icon: Star },
];

const colorOptions = [
  { name: "Blue", value: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  { name: "Orange", value: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  { name: "Emerald", value: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  { name: "Purple", value: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
  { name: "Pink", value: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20" },
  { name: "Rose", value: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" },
  { name: "Cyan", value: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
  { name: "Amber", value: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  { name: "Indigo", value: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
  { name: "Teal", value: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20" },
];

const defaultCategories: Category[] = [
  {
    id: "study",
    name: "Study",
    icon: BookOpen,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    tasks: [
      { title: "Review notes for 10 minutes", baseDifficulty: 1 },
      { title: "Watch an educational video", baseDifficulty: 1 },
      { title: "Read one chapter of a book", baseDifficulty: 2 },
      { title: "Practice flashcards", baseDifficulty: 1 },
      { title: "Complete one practice problem", baseDifficulty: 2 },
      { title: "Summarize what you learned today", baseDifficulty: 2 },
      { title: "Study for a full hour", baseDifficulty: 3 },
      { title: "Complete an online course module", baseDifficulty: 3 },
      { title: "Write a study guide", baseDifficulty: 3 },
    ],
  },
  {
    id: "fitness",
    name: "Fitness",
    icon: Dumbbell,
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    tasks: [
      { title: "Do 5 stretches", baseDifficulty: 1 },
      { title: "Take a 5-minute walk", baseDifficulty: 1 },
      { title: "10 jumping jacks", baseDifficulty: 1 },
      { title: "15-minute yoga session", baseDifficulty: 2 },
      { title: "20 push-ups", baseDifficulty: 2 },
      { title: "Go for a 20-minute jog", baseDifficulty: 2 },
      { title: "Full 30-minute workout", baseDifficulty: 3 },
      { title: "1-hour gym session", baseDifficulty: 3 },
      { title: "Complete a HIIT workout", baseDifficulty: 3 },
    ],
  },
  {
    id: "cleaning",
    name: "Cleaning",
    icon: SparklesIcon,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    tasks: [
      { title: "Make your bed", baseDifficulty: 1 },
      { title: "Clear one surface", baseDifficulty: 1 },
      { title: "Put away 5 items", baseDifficulty: 1 },
      { title: "Wipe down kitchen counter", baseDifficulty: 2 },
      { title: "Do a load of laundry", baseDifficulty: 2 },
      { title: "Vacuum one room", baseDifficulty: 2 },
      { title: "Deep clean the bathroom", baseDifficulty: 3 },
      { title: "Organize a closet", baseDifficulty: 3 },
      { title: "Full kitchen clean", baseDifficulty: 3 },
    ],
  },
  {
    id: "personal",
    name: "Personal",
    icon: User,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    tasks: [
      { title: "Drink a glass of water", baseDifficulty: 1 },
      { title: "Take 5 deep breaths", baseDifficulty: 1 },
      { title: "Write down 3 gratitudes", baseDifficulty: 1 },
      { title: "Journal for 10 minutes", baseDifficulty: 2 },
      { title: "Call a friend or family member", baseDifficulty: 2 },
      { title: "Plan tomorrow's schedule", baseDifficulty: 2 },
      { title: "Review and set weekly goals", baseDifficulty: 3 },
      { title: "Declutter your digital space", baseDifficulty: 3 },
      { title: "Create a monthly budget", baseDifficulty: 3 },
    ],
  },
  {
    id: "hobby",
    name: "Hobby",
    icon: Palette,
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
    tasks: [
      { title: "Doodle for 5 minutes", baseDifficulty: 1 },
      { title: "Listen to a new song", baseDifficulty: 1 },
      { title: "Take a creative photo", baseDifficulty: 1 },
      { title: "Practice an instrument for 15 min", baseDifficulty: 2 },
      { title: "Work on a craft project", baseDifficulty: 2 },
      { title: "Try a new recipe", baseDifficulty: 2 },
      { title: "Complete a creative project", baseDifficulty: 3 },
      { title: "Learn a new skill for 1 hour", baseDifficulty: 3 },
      { title: "Start a new hobby project", baseDifficulty: 3 },
    ],
  },
  {
    id: "mood",
    name: "Mood Booster",
    icon: Heart,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    tasks: [
      { title: "Smile at yourself in the mirror", baseDifficulty: 1 },
      { title: "Watch a funny video", baseDifficulty: 1 },
      { title: "Pet an animal or look at cute pictures", baseDifficulty: 1 },
      { title: "Go outside for fresh air", baseDifficulty: 2 },
      { title: "Do something kind for someone", baseDifficulty: 2 },
      { title: "Dance to your favorite song", baseDifficulty: 2 },
      { title: "Have a self-care session", baseDifficulty: 3 },
      { title: "Reconnect with an old friend", baseDifficulty: 3 },
      { title: "Plan something you're excited about", baseDifficulty: 3 },
    ],
  },
];

interface TaskCategoryModalProps {
  motivationLevel: number;
  customCategories: CustomCategory[];
  onAddTask: (task: {
    title: string;
    difficulty: Difficulty;
    category: string;
    duration?: number;
    hasTimer: boolean;
    hasReminder: boolean;
    reminderTime?: string;
  }) => void;
  onAddCategory: (category: CustomCategory) => void;
}

type Step = "categories" | "tasks" | "configure" | "newCategory";

const getDifficultyFromMotivation = (baseDifficulty: 1 | 2 | 3, motivation: number): Difficulty => {
  if (motivation <= 3) {
    return "easy";
  }
  if (motivation <= 7) {
    if (baseDifficulty === 1) return "easy";
    if (baseDifficulty === 2) return "medium";
    return "hard";
  }
  if (baseDifficulty === 1) return "easy";
  if (baseDifficulty === 2) return "medium";
  return "hard";
};

const getFilteredTasks = (tasks: TaskTemplate[], motivation: number): TaskTemplate[] => {
  const targetDifficulty = motivation <= 3 ? 1 : motivation <= 7 ? 2 : 3;
  return tasks.filter(t => t.baseDifficulty === targetDifficulty);
};

export function TaskCategoryModal({ motivationLevel, customCategories, onAddTask, onAddCategory }: TaskCategoryModalProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("categories");
  const [selectedCategory, setSelectedCategory] = useState<Category | CustomCategory | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskTemplate | null>(null);
  const [customTitle, setCustomTitle] = useState("");
  const [customDifficulty, setCustomDifficulty] = useState<Difficulty>("medium");
  const [duration, setDuration] = useState("15");
  const [hasTimer, setHasTimer] = useState(false);
  const [hasReminder, setHasReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("Star");
  const [newCategoryColor, setNewCategoryColor] = useState(colorOptions[0].value);
  const [assignToCategory, setAssignToCategory] = useState<string>("");

  const safeCustomCategories = customCategories || [];
  const allCategories = [
    ...defaultCategories,
    ...safeCustomCategories.map(cc => ({
      ...cc,
      icon: iconOptions.find(i => i.name === cc.icon)?.icon || Star,
    })),
  ];

  const resetState = () => {
    setStep("categories");
    setSelectedCategory(null);
    setSelectedTask(null);
    setCustomTitle("");
    setCustomDifficulty("medium");
    setDuration("15");
    setHasTimer(false);
    setHasReminder(false);
    setReminderTime("");
    setNewCategoryName("");
    setNewCategoryIcon("Star");
    setNewCategoryColor(colorOptions[0].value);
    setAssignToCategory("");
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setStep("tasks");
  };

  const handleCustomClick = () => {
    setSelectedCategory({ id: "custom", name: "Custom", icon: PenLine, color: "", tasks: [] });
    setStep("configure");
  };

  const handleNewCategoryClick = () => {
    setStep("newCategory");
  };

  const handleTaskSelect = (task: TaskTemplate) => {
    setSelectedTask(task);
    setStep("configure");
  };

  const handleBack = () => {
    if (step === "configure") {
      if (selectedCategory?.id === "custom") {
        setStep("categories");
      } else {
        setStep("tasks");
        setSelectedTask(null);
      }
    } else if (step === "tasks") {
      setStep("categories");
      setSelectedCategory(null);
    } else if (step === "newCategory") {
      setStep("categories");
    }
  };

  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return;

    const newCategory: CustomCategory = {
      id: `custom-${Date.now()}`,
      name: newCategoryName.trim(),
      icon: newCategoryIcon,
      color: newCategoryColor,
      tasks: [],
    };

    onAddCategory(newCategory);
    setStep("categories");
    setNewCategoryName("");
    setNewCategoryIcon("Star");
    setNewCategoryColor(colorOptions[0].value);
  };

  const handleSubmit = () => {
    const title = selectedCategory?.id === "custom" ? customTitle : selectedTask?.title || "";
    
    let difficulty: Difficulty;
    if (selectedCategory?.id === "custom") {
      difficulty = customDifficulty;
    } else if (selectedTask) {
      difficulty = getDifficultyFromMotivation(selectedTask.baseDifficulty, motivationLevel);
    } else {
      difficulty = "medium";
    }

    if (!title.trim()) return;

    const categoryId = selectedCategory?.id === "custom" && assignToCategory 
      ? assignToCategory 
      : selectedCategory?.id || "custom";

    onAddTask({
      title,
      difficulty,
      category: categoryId,
      duration: parseInt(duration, 10),
      hasTimer,
      hasReminder,
      reminderTime: hasReminder ? reminderTime : undefined,
    });

    setOpen(false);
    resetState();
  };

  const filteredTasks = selectedCategory && 'tasks' in selectedCategory
    ? getFilteredTasks(selectedCategory.tasks, motivationLevel)
    : [];

  const getIconComponent = (iconName: string) => {
    return iconOptions.find(i => i.name === iconName)?.icon || Star;
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetState();
    }}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2" data-testid="button-add-task-modal">
          <Plus className="h-5 w-5" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center gap-2">
            {step !== "categories" && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBack}
                className="h-8 w-8"
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle>
              {step === "categories" && "Choose a Category"}
              {step === "tasks" && selectedCategory?.name}
              {step === "configure" && "Configure Task"}
              {step === "newCategory" && "Create New Category"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {step === "categories" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {allCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card
                      key={category.id}
                      className={`p-4 cursor-pointer transition-all hover-elevate ${category.color} border`}
                      onClick={() => handleCategorySelect(category)}
                      data-testid={`button-category-${category.id}`}
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        <IconComponent className="h-8 w-8" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                <Card
                  className="p-4 cursor-pointer transition-all hover-elevate bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 border"
                  onClick={handleCustomClick}
                  data-testid="button-category-custom"
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <PenLine className="h-8 w-8" />
                    <span className="font-medium">Custom</span>
                  </div>
                </Card>
                <Card
                  className="p-4 cursor-pointer transition-all hover-elevate bg-primary/10 text-primary border-primary/20 border"
                  onClick={handleNewCategoryClick}
                  data-testid="button-new-category"
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <FolderPlus className="h-8 w-8" />
                    <span className="font-medium">New Category</span>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {step === "newCategory" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  data-testid="input-category-name"
                />
              </div>

              <div className="space-y-2">
                <Label>Icon</Label>
                <div className="grid grid-cols-8 gap-2">
                  {iconOptions.map((option) => {
                    const IconComp = option.icon;
                    return (
                      <Button
                        key={option.name}
                        variant={newCategoryIcon === option.name ? "default" : "outline"}
                        size="icon"
                        onClick={() => setNewCategoryIcon(option.name)}
                        data-testid={`button-icon-${option.name}`}
                      >
                        <IconComp className="h-4 w-4" />
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Color</Label>
                <div className="grid grid-cols-5 gap-2">
                  {colorOptions.map((option) => (
                    <Button
                      key={option.name}
                      variant="outline"
                      size="sm"
                      className={`${option.value} ${newCategoryColor === option.value ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setNewCategoryColor(option.value)}
                      data-testid={`button-color-${option.name}`}
                    >
                      {option.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Card className={`p-4 ${newCategoryColor} border`}>
                  <div className="flex flex-col items-center gap-2 text-center">
                    {(() => {
                      const PreviewIcon = getIconComponent(newCategoryIcon);
                      return <PreviewIcon className="h-8 w-8" />;
                    })()}
                    <span className="font-medium">{newCategoryName || "Preview"}</span>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {step === "tasks" && selectedCategory && (
            <div className="space-y-2">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => {
                  const difficulty = getDifficultyFromMotivation(task.baseDifficulty, motivationLevel);
                  const difficultyColors = {
                    easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                    medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                    hard: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                  };
                  return (
                    <Card
                      key={index}
                      className="p-4 cursor-pointer transition-all hover-elevate"
                      onClick={() => handleTaskSelect(task)}
                      data-testid={`button-task-${index}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium">{task.title}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[difficulty]}`}>
                          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </span>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No tasks match your current energy level in this category.
                  </p>
                  <Button variant="outline" onClick={handleCustomClick}>
                    Create Custom Task
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === "configure" && (
            <div className="space-y-6">
              {selectedCategory?.id === "custom" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="custom-title">Task Name</Label>
                    <Input
                      id="custom-title"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="What do you want to do?"
                      data-testid="input-custom-task"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <div className="flex gap-2">
                      {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
                        <Button
                          key={diff}
                          variant={customDifficulty === diff ? "default" : "outline"}
                          size="sm"
                          className="flex-1"
                          onClick={() => setCustomDifficulty(diff)}
                          data-testid={`button-custom-difficulty-${diff}`}
                        >
                          {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Assign to Category (Optional)</Label>
                    <Select value={assignToCategory} onValueChange={setAssignToCategory}>
                      <SelectTrigger data-testid="select-assign-category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">No category</SelectItem>
                        {allCategories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {selectedCategory?.id !== "custom" && selectedTask && (
                <Card className="p-4 bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="font-medium">{selectedTask.title}</span>
                  </div>
                </Card>
              )}

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger data-testid="select-duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Play className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Start Timer</p>
                    <p className="text-sm text-muted-foreground">Begin timing when you start</p>
                  </div>
                </div>
                <Switch 
                  checked={hasTimer} 
                  onCheckedChange={setHasTimer}
                  data-testid="switch-timer"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Set Reminder</p>
                      <p className="text-sm text-muted-foreground">Get notified to start</p>
                    </div>
                  </div>
                  <Switch 
                    checked={hasReminder} 
                    onCheckedChange={setHasReminder}
                    data-testid="switch-reminder"
                  />
                </div>
                {hasReminder && (
                  <Input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full"
                    data-testid="input-reminder-time"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {step === "configure" && (
          <div className="flex-shrink-0 pt-4 border-t">
            <Button 
              onClick={handleSubmit} 
              className="w-full gap-2"
              disabled={selectedCategory?.id === "custom" && !customTitle.trim()}
              data-testid="button-confirm-task"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </div>
        )}

        {step === "newCategory" && (
          <div className="flex-shrink-0 pt-4 border-t">
            <Button 
              onClick={handleCreateCategory} 
              className="w-full gap-2"
              disabled={!newCategoryName.trim()}
              data-testid="button-create-category"
            >
              <FolderPlus className="h-4 w-4" />
              Create Category
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
