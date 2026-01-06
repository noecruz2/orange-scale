import { useState } from "react";
import { cn } from "@/lib/utils";

interface LikertScaleProps {
  value: number | null;
  onChange: (value: number) => void;
}

const LikertScale = ({ value, onChange }: LikertScaleProps) => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const getScoreColor = (score: number) => {
    if (score <= 6) return "detractor";
    if (score <= 8) return "passive";
    return "promoter";
  };

  const getScoreStyles = (score: number, isSelected: boolean, isHovered: boolean) => {
    const colorType = getScoreColor(score);
    const baseStyles = "transition-all duration-200 ease-out";
    
    if (isSelected) {
      return cn(baseStyles, {
        "bg-likert-detractor text-white scale-110 shadow-lg": colorType === "detractor",
        "bg-likert-passive text-card-foreground scale-110 shadow-lg": colorType === "passive",
        "bg-likert-promoter text-white scale-110 shadow-lg": colorType === "promoter",
      });
    }
    
    if (isHovered) {
      return cn(baseStyles, "scale-105", {
        "bg-likert-detractor/20 border-likert-detractor": colorType === "detractor",
        "bg-likert-passive/20 border-likert-passive": colorType === "passive",
        "bg-likert-promoter/20 border-likert-promoter": colorType === "promoter",
      });
    }
    
    return cn(baseStyles, "bg-card hover:scale-105", {
      "border-likert-detractor/60 text-likert-detractor": colorType === "detractor",
      "border-likert-passive/80 text-likert-passive": colorType === "passive",
      "border-likert-promoter/60 text-likert-promoter": colorType === "promoter",
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-2 md:gap-3">
        {Array.from({ length: 11 }, (_, i) => {
          const isSelected = value === i;
          const isHovered = hoveredValue === i;
          
          return (
            <button
              key={i}
              onClick={() => onChange(i)}
              onMouseEnter={() => setHoveredValue(i)}
              onMouseLeave={() => setHoveredValue(null)}
              className={cn(
                "w-9 h-9 md:w-12 md:h-12 rounded-full border-2 font-semibold text-sm md:text-base",
                "flex items-center justify-center cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                getScoreStyles(i, isSelected, isHovered)
              )}
              aria-label={`Puntuación ${i}`}
            >
              {i}
            </button>
          );
        })}
      </div>
      
      <div className="flex justify-between mt-4 text-sm text-card-foreground/70">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-likert-detractor"></span>
          Nada probable
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-likert-promoter"></span>
          Muy probable
        </span>
      </div>
    </div>
  );
};

export default LikertScale;
