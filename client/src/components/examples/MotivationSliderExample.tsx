import { useState } from "react";
import { MotivationSlider } from "../MotivationSlider";
import { ThemeProvider } from "../ThemeProvider";

export default function MotivationSliderExample() {
  const [value, setValue] = useState(5);
  
  return (
    <ThemeProvider>
      <div className="bg-background p-4">
        <MotivationSlider value={value} onChange={setValue} />
      </div>
    </ThemeProvider>
  );
}
