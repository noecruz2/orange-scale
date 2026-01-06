import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import LikertScale from "./LikertScale";
import { toast } from "@/hooks/use-toast";
import { Send, CheckCircle2 } from "lucide-react";

const SurveyCard = () => {
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (score === null) {
      toast({
        title: "Por favor selecciona una puntuación",
        description: "Debes elegir un valor del 0 al 10",
        variant: "destructive",
      });
      return;
    }

    // Simulate submission
    setIsSubmitted(true);
    toast({
      title: "¡Gracias por tu respuesta!",
      description: "Tu opinión es muy valiosa para nosotros",
    });
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-3xl p-8 md:p-12 shadow-2xl max-w-2xl mx-auto animate-in fade-in-50 duration-500">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-likert-promoter/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-likert-promoter" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">
            ¡Gracias!
          </h2>
          <p className="text-muted-foreground text-lg">
            Tu opinión nos ayuda a mejorar cada día.
          </p>
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
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl p-6 md:p-10 shadow-2xl max-w-2xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-card-foreground">
            Datos del Cliente
          </h2>
          <p className="text-muted-foreground">
            Tu opinión nos importa mucho
          </p>
        </div>

        {/* Question */}
        <div className="space-y-6">
          <label className="block text-card-foreground font-medium text-lg">
            ¿Recomendarías comprar en MOBO?{" "}
            <span className="text-accent">*</span>
          </label>
          
          <LikertScale value={score} onChange={setScore} />
        </div>

        {/* Comment section */}
        <div className="space-y-3">
          <label className="block text-card-foreground font-medium">
            ¿Tienes algún comentario adicional?
          </label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Cuéntanos más sobre tu experiencia..."
            className="min-h-[100px] bg-muted/50 border-border resize-none"
          />
        </div>

        {/* Submit button */}
        <Button
          onClick={handleSubmit}
          className="w-full h-14 text-lg font-semibold rounded-xl bg-accent hover:bg-accent/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Send className="w-5 h-5 mr-2" />
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default SurveyCard;
