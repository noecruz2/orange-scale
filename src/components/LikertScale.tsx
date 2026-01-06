import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LikertScaleProps {
  value: number | null;
  onChange: (value: number) => void;
}

const LikertScale = ({ value, onChange }: LikertScaleProps) => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const getScoreType = (score: number) => {
    if (score <= 6) return "detractor";
    if (score <= 8) return "passive";
    return "promoter";
  };

  const getScoreLabel = (score: number) => {
    if (score <= 2) return "Muy malo";
    if (score <= 4) return "Malo";
    if (score <= 6) return "Regular";
    if (score <= 8) return "Bueno";
    return "Excelente";
  };

  const getEmoji = (score: number) => {
    if (score <= 2) return "😞";
    if (score <= 4) return "😕";
    if (score <= 6) return "😐";
    if (score <= 8) return "🙂";
    return "😍";
  };

  const displayValue = hoveredValue !== null ? hoveredValue : value;

  return (
    <div className="w-full space-y-6">
      {/* Score display with animation */}
      <AnimatePresence mode="wait">
        {displayValue !== null && (
          <motion.div
            key={displayValue}
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="flex items-center justify-center gap-3"
          >
            <motion.span 
              className="text-5xl"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, -10, 10, 0]
              }}
              transition={{ duration: 0.5 }}
            >
              {getEmoji(displayValue)}
            </motion.span>
            <div className="text-center">
              <motion.span 
                className={cn(
                  "text-4xl font-bold block",
                  getScoreType(displayValue) === "detractor" && "text-likert-detractor",
                  getScoreType(displayValue) === "passive" && "text-likert-passive",
                  getScoreType(displayValue) === "promoter" && "text-likert-promoter"
                )}
              >
                {displayValue}
              </motion.span>
              <span className="text-sm text-muted-foreground">{getScoreLabel(displayValue)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scale buttons */}
      <div className="flex justify-between items-center gap-1.5 md:gap-2.5">
        {Array.from({ length: 11 }, (_, i) => {
          const isSelected = value === i;
          const isHovered = hoveredValue === i;
          const scoreType = getScoreType(i);
          
          return (
            <motion.button
              key={i}
              onClick={() => onChange(i)}
              onMouseEnter={() => setHoveredValue(i)}
              onMouseLeave={() => setHoveredValue(null)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              animate={isSelected ? { 
                scale: 1.1,
                boxShadow: scoreType === "detractor" 
                  ? "0 0 20px hsl(0 84% 60% / 0.5)"
                  : scoreType === "passive"
                  ? "0 0 20px hsl(45 100% 50% / 0.5)"
                  : "0 0 20px hsl(142 76% 36% / 0.5)"
              } : { scale: 1, boxShadow: "0 0 0px transparent" }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={cn(
                "relative w-8 h-8 md:w-11 md:h-11 rounded-full border-2 font-semibold text-sm md:text-base",
                "flex items-center justify-center cursor-pointer",
                "focus:outline-none transition-colors duration-200",
                // Selected state
                isSelected && scoreType === "detractor" && "bg-likert-detractor border-likert-detractor text-white",
                isSelected && scoreType === "passive" && "bg-likert-passive border-likert-passive text-card-foreground",
                isSelected && scoreType === "promoter" && "bg-likert-promoter border-likert-promoter text-white",
                // Default state
                !isSelected && scoreType === "detractor" && "bg-card border-likert-detractor/50 text-likert-detractor hover:bg-likert-detractor/10",
                !isSelected && scoreType === "passive" && "bg-card border-likert-passive/70 text-likert-passive hover:bg-likert-passive/10",
                !isSelected && scoreType === "promoter" && "bg-card border-likert-promoter/50 text-likert-promoter hover:bg-likert-promoter/10"
              )}
              aria-label={`Puntuación ${i}`}
            >
              {i}
              
              {/* Ripple effect on selection */}
              <AnimatePresence>
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn(
                      "absolute inset-0 rounded-full",
                      scoreType === "detractor" && "bg-likert-detractor",
                      scoreType === "passive" && "bg-likert-passive",
                      scoreType === "promoter" && "bg-likert-promoter"
                    )}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
      
      {/* Gradient bar indicator */}
      <div className="relative h-2 rounded-full bg-gradient-to-r from-likert-detractor via-likert-passive to-likert-promoter overflow-hidden">
        <AnimatePresence>
          {value !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-card-foreground/20"
              style={{ left: `calc(${(value / 10) * 100}% - 8px)` }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs md:text-sm text-card-foreground/70">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-likert-detractor"></span>
          Nada probable
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-likert-passive"></span>
          Neutral
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-likert-promoter"></span>
          Muy probable
        </span>
      </div>
    </div>
  );
};

export default LikertScale;
