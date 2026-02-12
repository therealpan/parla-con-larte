# ElevenLabs Voice Agent Widget

## Overview
A voice agent widget that connects to an ElevenLabs Conversational AI agent. The widget displays agent info (name, description, avatar) and allows users to start a voice call with the agent. Features animated audio visualizer and pulse rings when the agent speaks.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Express.js serving a signed URL endpoint
- **ElevenLabs**: Uses Replit connector for secure API key management. The `@elevenlabs/react` SDK handles the voice conversation on the client side.

## Key Files
- `server/elevenlabs.ts` - ElevenLabs connector credentials helper
- `server/routes.ts` - `/api/elevenlabs/signed-url` endpoint for secure conversation initialization
- `client/src/components/VoiceAgentWidget.tsx` - Main voice agent widget with audio visualizer, pulse rings, call controls
- `client/src/pages/home.tsx` - Home page rendering the widget
- `client/public/images/agent-avatar.jpg` - Agent avatar image

## Agent Configuration
- Agent ID: `agent_2701kh8essq0f9g8g2e1k2fcatnd`
- Agent Name: Maurizio
- Description: La versione virtuale di Maurizio Bellante, autore del libro "Senza Girarci Troppo Intorno"

## Security
- API key never exposed to the client
- Uses signed URLs generated server-side via `/api/elevenlabs/signed-url`
- ElevenLabs API key managed through Replit connector

## Recent Changes
- 2026-02-10: Initial implementation of voice agent widget
