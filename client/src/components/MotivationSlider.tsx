import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Battery, BatteryLow, BatteryMedium, BatteryFull, Zap } from "lucide-react";

interface MotivationSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const motivationMessages: Record<number, { message: string; icon: typeof Battery }> = {
  1: { message: "That's okay. Let's start with something small.", icon: BatteryLow },
  2: { message: "Even small steps count. You've got this.", icon: BatteryLow },
  3: { message: "Taking it easy is perfectly fine.", icon: BatteryLow },
  4: { message: "Building momentum, one task at a time.", icon: BatteryMedium },
  5: { message: "You're in a balanced state. Good for steady progress.", icon: BatteryMedium },
  6: { message: "Nice energy! Ready for some productive work.", icon: BatteryMedium },
  7: { message: "Feeling motivated! Let's tackle some challenges.", icon: BatteryFull },
  8: { message: "Great energy! Time to make real progress.", icon: BatteryFull },
  9: { message: "You're on fire! Let's accomplish big things.", icon: Zap },
  10: { message: "Maximum power! Nothing can stop you today!", icon: Zap },
};

export function MotivationSlider({ value, onChange }: MotivationSliderProps) {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const currentMessage = motivationMessages[displayValue] || motivationMessages[5];
  const IconComponent = currentMessage.icon;

  const getGradientColor = (val: number) => {
    if (val <= 3) return "from-amber-400 to-orange-500";
    if (val <= 6) return "from-cyan-400 to-blue-500";
    return "from-emerald-400 to-green-500";
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-6">
      <div className="text-center mb-8">
        <h2 className="text-lg font-medium text-muted-foreground mb-2">
          How motivated are you feeling today?
        </h2>
        <div className={`text-7xl font-bold bg-gradient-to-r ${getGradientColor(displayValue)} bg-clip-text text-transparent transition-all duration-300`}>
          {displayValue}
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground">
          <IconComponent className="h-5 w-5" />
          <span className="text-base">{currentMessage.message}</span>
        </div>
      </div>

      <div className="relative px-2">
        <div className="flex justify-between text-xs text-muted-foreground mb-3">
          <span>Low Energy</span>
          <span>High Energy</span>
        </div>
        <Slider
          value={[displayValue]}
          onValueChange={(vals) => {
            setDisplayValue(vals[0]);
            onChange(vals[0]);
          }}
          min={1}
          max={10}
          step={1}
          className="w-full"
          data-testid="slider-motivation"
        />
        <div className="flex justify-between mt-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              onClick={() => {
                setDisplayValue(num);
                onChange(num);
              }}
              className={`w-6 h-6 rounded-full text-xs font-medium transition-all duration-200 ${
                num === displayValue
                  ? "bg-primary text-primary-foreground scale-110"
                  : "text-muted-foreground hover-elevate"
              }`}
              data-testid={`button-motivation-${num}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
