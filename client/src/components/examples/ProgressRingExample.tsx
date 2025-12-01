import { ProgressRing } from "../ProgressRing";
import { ThemeProvider } from "../ThemeProvider";

export default function ProgressRingExample() {
  return (
    <ThemeProvider>
      <div className="bg-background p-8 flex gap-8">
        <ProgressRing progress={75} label="Tasks Done" sublabel="3 of 4" />
        <ProgressRing progress={45} size={100} strokeWidth={8} label="Weekly Goal" />
      </div>
    </ThemeProvider>
  );
}
