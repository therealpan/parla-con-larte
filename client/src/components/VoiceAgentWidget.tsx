import { useState, useCallback, useRef, useEffect } from "react";
import { useConversation } from "@elevenlabs/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Phone, PhoneOff, Mic, MicOff, Info } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/logo_hires_1770710197342.png";
import iconaAmorePsiche from "@assets/icona_amorepsiche_W_1770885982486.png";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const AGENT_NAME = "Amore e Psiche";
const AGENT_DESCRIPTION =
  "Il Maestro Antonio Canova, vi guiderà personalmente alla scoperta della sua Amore e Psiche, raccontandone significato, ispirazione e segreti di esecuzione.";
const AGENT_AVATAR = "/images/agent-avatar.jpg";

function AudioVisualizer({
  isActive,
  isSpeaking,
  getOutputVolume,
}: {
  isActive: boolean;
  isSpeaking: boolean;
  getOutputVolume: () => number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const barsRef = useRef<number[]>(Array(24).fill(0));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = 200;
    const height = 48;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const barCount = 24;
    const barWidth = 4;
    const gap = (width - barCount * barWidth) / (barCount - 1);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const volume = isActive ? getOutputVolume() : 0;
      const intensity = isSpeaking ? Math.max(volume * 3, 0.3) : 0;

      for (let i = 0; i < barCount; i++) {
        const target =
          isActive && isSpeaking
            ? Math.random() * intensity * height * 0.8 + height * 0.05
            : height * 0.03;

        barsRef.current[i] += (target - barsRef.current[i]) * 0.15;
        const barHeight = Math.max(barsRef.current[i], 2);

        const x = i * (barWidth + gap);
        const y = (height - barHeight) / 2;

        const centerDistance = Math.abs(i - barCount / 2) / (barCount / 2);
        const hue = 221;
        const saturation = 83;
        const lightness = 53 + centerDistance * 15;
        const alpha = isActive && isSpeaking ? 0.7 + (1 - centerDistance) * 0.3 : 0.2;

        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isActive, isSpeaking, getOutputVolume]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 200, height: 48 }}
      className="mx-auto"
      data-testid="audio-visualizer"
    />
  );
}

function PulseRing({ isActive, isSpeaking }: { isActive: boolean; isSpeaking: boolean }) {
  return (
    <div className="relative inline-flex items-center justify-center">
      {isActive && (
        <>
          <span
            className={cn(
              "absolute inset-0 rounded-full border-2 border-primary/30",
              isSpeaking && "animate-ping"
            )}
            style={{ animationDuration: "1.5s" }}
          />
          <span
            className={cn(
              "absolute -inset-1 rounded-full border border-primary/20",
              isSpeaking && "animate-ping"
            )}
            style={{ animationDuration: "2s", animationDelay: "0.3s" }}
          />
        </>
      )}
      <Avatar className={cn(
        "h-28 w-28 border-2 transition-all duration-500",
        isActive
          ? isSpeaking
            ? "border-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            : "border-primary/50"
          : "border-border"
      )}>
        <AvatarImage src={AGENT_AVATAR} alt={AGENT_NAME} className="object-cover" />
        <AvatarFallback className="text-2xl font-semibold bg-muted text-muted-foreground">
          {AGENT_NAME.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

export default function VoiceAgentWidget() {
  const [micMuted, setMicMuted] = useState(false);
  const { toast } = useToast();

  const conversation = useConversation({
    micMuted,
    onConnect: () => {
      toast({
        title: "Connesso",
        description: `Sei ora in conversazione con ${AGENT_NAME}`,
      });
    },
    onDisconnect: () => {
      toast({
        title: "Disconnesso",
        description: "La conversazione è terminata",
      });
    },
    onError: (error: any) => {
      console.error("Conversation error:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore nella conversazione",
        variant: "destructive",
      });
    },
  });

  const isConnected = conversation.status === "connected";

  const handleStartCall = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const response = await fetch("/api/elevenlabs/signed-url");
      if (!response.ok) {
        throw new Error("Failed to get signed URL");
      }
      const { signedUrl } = await response.json();

      await conversation.startSession({
        signedUrl,
      });
    } catch (error: any) {
      console.error("Failed to start call:", error);
      toast({
        title: "Errore",
        description:
          error.name === "NotAllowedError"
            ? "Per favore, consenti l'accesso al microfono"
            : "Impossibile avviare la chiamata",
        variant: "destructive",
      });
    }
  }, [conversation, toast]);

  const handleEndCall = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error("Failed to end call:", error);
    }
  }, [conversation]);

  const toggleMute = useCallback(() => {
    setMicMuted((prev) => !prev);
  }, []);

  const statusLabel = isConnected
    ? conversation.isSpeaking
      ? "Sta parlando..."
      : "In ascolto..."
    : "Non connesso";

  return (
    <Card className="w-full max-w-sm mx-auto p-6">
      <div className="flex flex-col items-center gap-3">
        <PulseRing isActive={isConnected} isSpeaking={conversation.isSpeaking} />

        <div className="text-center space-y-1">
          <h2 className="text-xl font-semibold" data-testid="text-agent-name">
            {AGENT_NAME}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs" data-testid="text-agent-description">
            {AGENT_DESCRIPTION}
          </p>
          <Link href="/info">
            <Button size="icon" variant="ghost" className="mt-1" aria-label="Informazioni" data-testid="button-info">
              <Info className="h-4 w-4 text-muted-foreground" />
            </Button>
          </Link>
        </div>

        <div className="w-full">
          <AudioVisualizer
            isActive={isConnected}
            isSpeaking={conversation.isSpeaking}
            getOutputVolume={conversation.getOutputVolume}
          />
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-block h-2 w-2 rounded-full transition-colors",
              isConnected
                ? conversation.isSpeaking
                  ? "bg-primary animate-pulse"
                  : "bg-status-online"
                : "bg-status-offline"
            )}
          />
          <span className="text-xs text-muted-foreground" data-testid="text-status">
            {statusLabel}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isConnected && (
            <Button
              size="icon"
              variant={micMuted ? "destructive" : "secondary"}
              onClick={toggleMute}
              aria-label={micMuted ? "Attiva microfono" : "Disattiva microfono"}
              data-testid="button-mute"
            >
              {micMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          )}

          {isConnected ? (
            <Button
              variant="destructive"
              onClick={handleEndCall}
              className="gap-2 px-6"
              data-testid="button-end-call"
            >
              <PhoneOff className="h-4 w-4" />
              Termina
            </Button>
          ) : (
            <Button
              onClick={handleStartCall}
              className="gap-2 px-6"
              data-testid="button-start-call"
            >
              <img src={iconaAmorePsiche} alt="" className="h-5 w-5" />
              Parla con il Maestro
            </Button>
          )}
        </div>

        <div className="pt-3 border-t border-border w-full flex justify-center">
          <a href="https://piirz.com" target="_blank" rel="noopener noreferrer" data-testid="link-logo">
            <img
              src={logoPath}
              alt="Piirz Digital"
              className="h-6 opacity-60"
              data-testid="img-logo"
            />
          </a>
        </div>
      </div>
    </Card>
  );
}
