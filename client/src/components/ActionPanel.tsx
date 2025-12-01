import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Zap, Wind, BookOpen, Droplets, Music } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const quickPushTasks = [
  "Drink a glass of water",
  "Do 5 squats",
  "Stretch for 30 seconds",
  "Stand up and walk around",
  "Touch your toes",
  "Do 10 jumping jacks",
  "Clap 5 times",
  "Take 3 deep breaths",
  "Shake your hands out",
  "Wipe your desk",
];

interface ActionPanelProps {
  onReset: () => void;
  waterCount: number;
  onWaterAdd: () => void;
  onSpotifyClick: () => void;
}

export function ActionPanel({ onReset, waterCount, onWaterAdd, onSpotifyClick }: ActionPanelProps) {
  const [breathingOpen, setBreathingOpen] = useState(false);
  const [quickPushOpen, setQuickPushOpen] = useState(false);
  const [pomodoroOpen, setPomodoroOpen] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathingTime, setBreathingTime] = useState(4);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [quickPushTask, setQuickPushTask] = useState("");

  useEffect(() => {
    if (!breathingOpen) return;
    
    const timer = setInterval(() => {
      setBreathingTime((prev) => {
        if (prev <= 1) {
          if (breathingPhase === "inhale") {
            setBreathingPhase("hold");
            return 4;
          } else if (breathingPhase === "hold") {
            setBreathingPhase("exhale");
            return 4;
          } else {
            setBreathingPhase("inhale");
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [breathingOpen, breathingPhase]);

  useEffect(() => {
    if (!pomodoroRunning || pomodoroTime <= 0) return;

    const timer = setInterval(() => {
      setPomodoroTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [pomodoroRunning, pomodoroTime]);

  const getBreathingScale = () => {
    if (breathingPhase === "inhale") return "scale-100";
    if (breathingPhase === "hold") return "scale-110";
    return "scale-95";
  };

  const formatPomodoroTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const showRandomQuickPush = () => {
    const task = quickPushTasks[Math.floor(Math.random() * quickPushTasks.length)];
    setQuickPushTask(task);
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-0">
        <Button
          size="sm"
          variant="ghost"
          onClick={onReset}
          data-testid="button-reset-tasks"
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset</span>
        </Button>

        <div className="w-px h-5 bg-border" />

        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            showRandomQuickPush();
            setQuickPushOpen(true);
          }}
          data-testid="button-quick-push"
          className="gap-2"
        >
          <Zap className="h-4 w-4" />
          <span>Quick Push</span>
        </Button>

        <div className="w-px h-5 bg-border" />

        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setBreathingPhase("inhale");
            setBreathingTime(4);
            setBreathingOpen(true);
          }}
          data-testid="button-breath"
          className="gap-2"
        >
          <Wind className="h-4 w-4" />
          <span>Breath</span>
        </Button>

        <div className="w-px h-5 bg-border" />

        <Button
          size="sm"
          variant="ghost"
          onClick={() => setPomodoroOpen(true)}
          data-testid="button-study"
          className="gap-2"
        >
          <BookOpen className="h-4 w-4" />
          <span>Study</span>
        </Button>

        <div className="w-px h-5 bg-border" />

        <Button
          size="sm"
          variant="ghost"
          onClick={onWaterAdd}
          data-testid="button-water"
          className="gap-2"
        >
          <Droplets className="h-4 w-4" />
          <span>Water</span>
          <span className="text-xs font-medium">({waterCount})</span>
        </Button>

        <div className="w-px h-5 bg-border" />

        <Button
          size="sm"
          variant="ghost"
          onClick={onSpotifyClick}
          data-testid="button-spotify"
          className="gap-2"
        >
          <Music className="h-4 w-4" />
          <span>Playlist</span>
        </Button>
      </div>

      {/* Breathing Dialog */}
      <Dialog open={breathingOpen} onOpenChange={setBreathingOpen}>
        <DialogContent className="flex flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle>Guided Breathing</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-8">
            <div className={`w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-transform duration-1000 ${getBreathingScale()}`} />
            <div className="text-center">
              <p className="text-2xl font-bold capitalize">{breathingPhase}</p>
              <p className="text-lg text-muted-foreground">{breathingTime}s</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Push Dialog */}
      <Dialog open={quickPushOpen} onOpenChange={setQuickPushOpen}>
        <DialogContent className="flex flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle>Quick Dopamine Boost</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-3xl font-bold mb-4">{quickPushTask}</p>
            <p className="text-sm text-muted-foreground mb-6">30-60 seconds to energize!</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => {
                showRandomQuickPush();
              }} data-testid="button-another-task">
                Another
              </Button>
              <Button variant="outline" onClick={() => setQuickPushOpen(false)} data-testid="button-close-quick">
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pomodoro Dialog */}
      <Dialog open={pomodoroOpen} onOpenChange={setPomodoroOpen}>
        <DialogContent className="flex flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle>Pomodoro Study Timer</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-5xl font-bold mb-6 font-mono">{formatPomodoroTime(pomodoroTime)}</p>
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => setPomodoroRunning(!pomodoroRunning)}
                data-testid={pomodoroRunning ? "button-pause-timer" : "button-start-timer"}
              >
                {pomodoroRunning ? "Pause" : "Start"}
              </Button>
              <Button variant="outline" onClick={() => {
                setPomodoroTime(25 * 60);
                setPomodoroRunning(false);
              }} data-testid="button-reset-timer">
                Reset
              </Button>
              <Button variant="outline" onClick={() => {
                setPomodoroOpen(false);
                setPomodoroRunning(false);
              }} data-testid="button-close-pomodoro">
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
