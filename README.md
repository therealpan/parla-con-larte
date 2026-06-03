# Parla con l'Arte

Interfaccia vocale che permette di dialogare con le opere d'arte tramite agenti conversazionali ElevenLabs. Il primo agente è **Amore e Psiche**, la voce del Maestro Antonio Canova, che guida il visitatore alla scoperta della sua scultura.

## Stack

| Layer | Tecnologia |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS + shadcn/ui |
| Backend | Funzione serverless Vercel (`/api`) |
| Voce AI | ElevenLabs Conversational AI |
| Hosting | Vercel |

## Architettura

```
client/                       Frontend React (Vite)
api/elevenlabs/signed-url.ts  Funzione serverless: genera il signed URL ElevenLabs
attached_assets/              Immagini e logo
```

Il frontend chiama `/api/elevenlabs/signed-url`, la funzione serverless usa la chiave `ELEVENLABS_API_KEY` per generare un signed URL e lo restituisce al client. La chiave non è mai esposta al browser. L'SDK `@elevenlabs/react` gestisce la conversazione vocale lato client.

## Variabili d'ambiente

| Nome | Descrizione |
|------|-------------|
| `ELEVENLABS_API_KEY` | Chiave API ElevenLabs, usata solo lato server |

Copia `.env.example` in `.env` per lo sviluppo locale, oppure imposta la variabile su Vercel in Project > Settings > Environment Variables.

## Deploy su Vercel

1. Importa il repository su Vercel.
2. Vercel rileva la configurazione da `vercel.json` (build `vite build`, output `dist`, rewrite SPA).
3. In Settings > Environment Variables aggiungi `ELEVENLABS_API_KEY`.
4. Deploy.

## Sviluppo locale

```bash
npm install

# solo UI (la funzione /api non viene servita)
npm run dev

# UI + funzione serverless insieme (richiede la Vercel CLI)
npx vercel dev
```

Per provare la conversazione vocale in locale serve `vercel dev` con `ELEVENLABS_API_KEY` impostata, perché l'endpoint `/api/elevenlabs/signed-url` deve essere attivo.

## Agente configurato

| Campo | Valore |
|-------|--------|
| Nome | Amore e Psiche |
| Agent ID | `agent_2701kh8essq0f9g8g2e1k2fcatnd` |
| Opera | Amore e Psiche — Antonio Canova |
