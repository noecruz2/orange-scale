import SurveyCard from "@/components/SurveyCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Test banner */}
      <div className="bg-secondary/80 text-primary-foreground text-center py-3 px-4">
        <p className="text-sm font-medium">
          Esta es una versión de prueba de tu formulario
        </p>
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl">
          <SurveyCard />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-primary-foreground/70 text-sm">
        Powered by MOBO
      </footer>
    </div>
  );
};

export default Index;
