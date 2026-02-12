import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getElevenLabsApiKey } from "./elevenlabs";

const AGENT_ID = "agent_2701kh8essq0f9g8g2e1k2fcatnd";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/elevenlabs/signed-url", async (_req, res) => {
    try {
      const apiKey = await getElevenLabsApiKey();

      const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${AGENT_ID}`,
        {
          headers: {
            "xi-api-key": apiKey,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("ElevenLabs signed URL error:", errorText);
        return res.status(response.status).json({ error: "Failed to get signed URL" });
      }

      const body = await response.json();
      res.json({ signedUrl: body.signed_url });
    } catch (error: any) {
      console.error("Signed URL error:", error.message);
      res.status(500).json({ error: "Failed to generate signed URL" });
    }
  });

  return httpServer;
}
