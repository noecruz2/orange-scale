import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LikertScaleProps {
  value: number | null;
  onChange: (value: number) => void;
}

const LikertScale = ({ value, onChange }: LikertScaleProps) => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const scaleOptions = [
    { value: 1, label: "Muy malo", emoji: "😞", type: "detractor" },
    { value: 2, label: "Malo", emoji: "😕", type: "detractor" },
    { value: 3, label: "Regular", emoji: "😐", type: "passive" },
    { value: 4, label: "Bueno", emoji: "🙂", type: "passive" },
    { value: 5, label: "Excelente", emoji: "😍", type: "promoter" },
  ];

  const displayValue = hoveredValue !== null ? hoveredValue : value;
  const currentOption = scaleOptions.find(o => o.value === displayValue);

  return (
    <div className="w-full space-y-6">
      {/* Score display with animation */}
      <AnimatePresence mode="wait">
        {currentOption && (
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
              {currentOption.emoji}
            </motion.span>
            <div className="text-center">
              <motion.span 
                className={cn(
                  "text-4xl font-bold block",
                  currentOption.type === "detractor" && "text-likert-detractor",
                  currentOption.type === "passive" && "text-likert-passive",
                  currentOption.type === "promoter" && "text-likert-promoter"
                )}
              >
                {displayValue}
              </motion.span>
              <span className="text-sm text-muted-foreground">{currentOption.label}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scale buttons */}
      <div className="flex justify-center items-center gap-3 md:gap-5">
        {scaleOptions.map((option) => {
          const isSelected = value === option.value;
          const isHovered = hoveredValue === option.value;
          
          return (
            <motion.button
              key={option.value}
              onClick={() => onChange(option.value)}
              onMouseEnter={() => setHoveredValue(option.value)}
              onMouseLeave={() => setHoveredValue(null)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              animate={isSelected ? { 
                scale: 1.1,
                boxShadow: option.type === "detractor" 
                  ? "0 0 25px hsl(0 84% 60% / 0.5)"
                  : option.type === "passive"
                  ? "0 0 25px hsl(45 100% 50% / 0.5)"
                  : "0 0 25px hsl(142 76% 36% / 0.5)"
              } : { scale: 1, boxShadow: "0 0 0px transparent" }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={cn(
                "relative w-14 h-14 md:w-16 md:h-16 rounded-full border-3 font-bold text-xl md:text-2xl",
                "flex items-center justify-center cursor-pointer",
                "focus:outline-none transition-colors duration-200",
                // Selected state
                isSelected && option.type === "detractor" && "bg-likert-detractor border-likert-detractor text-white",
                isSelected && option.type === "passive" && "bg-likert-passive border-likert-passive text-card-foreground",
                isSelected && option.type === "promoter" && "bg-likert-promoter border-likert-promoter text-white",
                // Default state
                !isSelected && option.type === "detractor" && "bg-card border-likert-detractor/50 text-likert-detractor hover:bg-likert-detractor/10",
                !isSelected && option.type === "passive" && "bg-card border-likert-passive/70 text-likert-passive hover:bg-likert-passive/10",
                !isSelected && option.type === "promoter" && "bg-card border-likert-promoter/50 text-likert-promoter hover:bg-likert-promoter/10"
              )}
              aria-label={`Puntuación ${option.value} - ${option.label}`}
            >
              {option.value}
              
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
                      option.type === "detractor" && "bg-likert-detractor",
                      option.type === "passive" && "bg-likert-passive",
                      option.type === "promoter" && "bg-likert-promoter"
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
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-card-foreground/20"
              style={{ left: `calc(${((value - 1) / 4) * 100}% - 10px)` }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs md:text-sm text-card-foreground/70 px-2">
        <span>Nada probable</span>
        <span>Muy probable</span>
      </div>
    </div>
  );
};

export default LikertScale;
