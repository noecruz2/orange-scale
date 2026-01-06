import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import LikertScale from "./LikertScale";
import { toast } from "@/hooks/use-toast";
import { Send, CheckCircle2, Sparkles } from "lucide-react";

const SurveyCard = () => {
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (score === null) {
      toast({
        title: "Por favor selecciona una puntuación",
        description: "Debes elegir un valor del 0 al 10",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "¡Gracias por tu respuesta!",
      description: "Tu opinión es muy valiosa para nosotros",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-card rounded-3xl p-6 md:p-10 shadow-2xl max-w-2xl mx-auto overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-6 py-8"
          >
            <motion.div 
              className="w-24 h-24 mx-auto rounded-full bg-likert-promoter/10 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <CheckCircle2 className="w-12 h-12 text-likert-promoter" />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">
                ¡Gracias!
              </h2>
              <p className="text-muted-foreground text-lg mt-2">
                Tu opinión nos ayuda a mejorar cada día.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  setScore(null);
                  setComment("");
                }}
                variant="outline"
                className="mt-4"
              >
                Enviar otra respuesta
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-8"
          >
            {/* Header */}
            <motion.div 
              className="text-center space-y-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Tu opinión importa</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">
                Datos del Cliente
              </h2>
            </motion.div>

            {/* Question */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-card-foreground font-medium text-lg text-center">
                ¿Recomendarías comprar en MOBO?{" "}
                <span className="text-accent">*</span>
              </label>
              
              <LikertScale value={score} onChange={setScore} />
            </motion.div>

            {/* Comment section */}
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-card-foreground font-medium">
                ¿Tienes algún comentario adicional?
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Cuéntanos más sobre tu experiencia..."
                className="min-h-[100px] bg-muted/50 border-border resize-none transition-all duration-200 focus:shadow-lg"
              />
            </motion.div>

            {/* Submit button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-semibold rounded-xl bg-accent hover:bg-accent/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Enviar
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SurveyCard;
