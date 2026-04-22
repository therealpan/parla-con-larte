# Parla con l'Arte

> Questo progetto è ospitato e sviluppato su **[Replit](https://replit.com)**.  
> Non clonare o eseguire localmente senza configurare correttamente le variabili d'ambiente e le integrazioni Replit.

---

## Descrizione

**Parla con l'Arte** è un'interfaccia vocale intelligente che permette agli utenti di dialogare con le opere d'arte attraverso agenti AI conversazionali alimentati da ElevenLabs.

Il primo agente disponibile è **Amore e Psiche** — la voce del Maestro **Antonio Canova**, che guida personalmente il visitatore alla scoperta della sua scultura, raccontandone significato, ispirazione e segreti di esecuzione.

---

## Stack Tecnologico

| Layer | Tecnologia |
|-------|-----------|
| Frontend | React + Vite + Tailwind CSS + shadcn/ui |
| Backend | Express.js (Node.js) |
| Voce AI | ElevenLabs Conversational AI |
| Hosting | Replit |

---

## Architettura

```
client/          → Frontend React (Vite)
server/          → Backend Express
shared/          → Tipi e schema condivisi
client/public/   → Asset statici (immagini, favicon)
```

- Il backend genera **signed URL** sicuri per inizializzare la conversazione con ElevenLabs
- La chiave API ElevenLabs non è mai esposta al client
- L'SDK `@elevenlabs/react` gestisce la conversazione vocale lato client

---

## Configurazione Replit

Il progetto richiede le seguenti integrazioni configurate su Replit:

- **ElevenLabs** — connettore Replit per la gestione sicura della API key
- **GitHub** — connettore Replit per la sincronizzazione del repository

Le variabili d'ambiente sono gestite tramite il sistema di Secrets di Replit.

---

## Agente Configurato

| Campo | Valore |
|-------|--------|
| Nome | Amore e Psiche |
| Agent ID | `agent_2701kh8essq0f9g8g2e1k2fcatnd` |
| Opera | Amore e Psiche — Antonio Canova |

---

## Note

- Questo repository contiene solo il codice sorgente
- Le credenziali e i segreti sono gestiti esclusivamente tramite Replit
- Per contribuire o modificare il progetto, è necessario avere accesso al progetto su Replit
