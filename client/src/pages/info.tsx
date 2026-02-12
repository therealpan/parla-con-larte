import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import logoPath from "@assets/logo_hires_1770711090576.png";
import illustrationPath from "@assets/guida_1770886189087.png";

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center gap-2 p-4 border-b border-border">
        <Link href="/">
          <Button size="icon" variant="ghost" aria-label="Torna indietro" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold" data-testid="text-info-title">Informazioni</h1>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-lg mx-auto p-6 flex flex-col items-center gap-6">
          <img
            src={illustrationPath}
            alt="Come funziona il Widget di Chat del Libro"
            className="w-full rounded-md"
            data-testid="img-illustration"
          />

          <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-info-description">
            "Parla con l'Arte" è un'interfaccia vocale intelligente che consente di dialogare direttamente con le opere, interrogandole su significato, tecniche, contesto e intenzioni, senza mediazioni interpretative. Il sistema costruisce le risposte esclusivamente da fonti documentate e autorizzate, ricostruendo la prospettiva concettuale dell'opera e rendendo accessibili contenuti normalmente nascosti come archivi, studi critici, restauri e materiali curatoriali.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-info-description-2">
            La piattaforma funziona come strumento culturale, educativo ed economico per musei, gallerie e artisti: attiva archivi, rafforza l'esperienza di visita, stabilizza il discorso artistico e preserva conoscenze tecniche nel tempo. Trasforma la fruizione da osservazione passiva a dialogo informato, riducendo la distanza tra pubblico e patrimonio e organizzando il sapere in forma interrogabile.
          </p>

          <div className="pt-4 border-t border-border w-full flex justify-center">
            <img
              src={logoPath}
              alt="Piirz Digital"
              className="h-8 opacity-70"
              data-testid="img-logo"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
