import type { VercelRequest, VercelResponse } from "@vercel/node";

const AGENT_ID = "agent_2701kh8essq0f9g8g2e1k2fcatnd";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      console.error("ELEVENLABS_API_KEY is not set");
      return res
        .status(500)
        .json({ error: "Server misconfigured: ELEVENLABS_API_KEY missing" });
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${AGENT_ID}`,
      {
        headers: {
          "xi-api-key": apiKey,
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs signed URL error:", errorText);
      return res
        .status(response.status)
        .json({ error: "Failed to get signed URL" });
    }

    const body = await response.json();
    res.status(200).json({ signedUrl: body.signed_url });
  } catch (error: any) {
    console.error("Signed URL error:", error?.message ?? error);
    res.status(500).json({ error: "Failed to generate signed URL" });
  }
}
