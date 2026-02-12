import VoiceAgentWidget from "@/components/VoiceAgentWidget";
import topLogoPath from "@assets/logo_1770885250628.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 gap-4">
      <img
        src={topLogoPath}
        alt="Parla con i Libri"
        className="w-64"
        data-testid="img-top-logo"
      />
      <VoiceAgentWidget />
    </div>
  );
}
