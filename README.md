# Join – KI-gestütztes Kanban-Board

Ein kollaboratives Kanban-Board mit integriertem KI-Issue-Collector. Stakeholder können Feature Requests und Bug-Meldungen per E-Mail einreichen – die KI analysiert die Mail automatisch und erstellt ein priorisiertes Ticket in der Triage-Spalte.

**Live:** [join-issue-collector.vercel.app](https://join-issue-collector.vercel.app)

---

## Features

- **Kanban-Board** mit den Spalten Triage, To Do, In Progress, Awaiting Feedback, Done
- **Drag & Drop** zwischen Spalten (Desktop) + Move-Menü (Mobile)
- **KI-Issue-Collector:** E-Mail → Mistral AI → Ticket in Triage (vollautomatisch)
- **Stakeholder-Landing-Page** mit Tageszähler und direktem E-Mail-Link
- **Bestätigungsmail** an den Absender nach erfolgreicher Ticket-Erstellung
- **Ersteller-Badge** (Intern / Extern) im Task-Detail
- **Kontaktverwaltung** mit alphabetischer Sortierung
- **Gast-Login** ohne Registrierung

---

## Demo

### Als Stakeholder (ohne Login)

1. [join-issue-collector.vercel.app](https://join-issue-collector.vercel.app) aufrufen
2. „Create Email Request" klicken → E-Mail an `issue-collector@marcus-hartmann.net` schicken
3. Betreff und Body frei formulieren – die KI generiert daraus ein Ticket
4. Bestätigungsmail abwarten (ca. 30–60 Sekunden)
5. Im Board unter [/board](https://join-issue-collector.vercel.app/board) erscheint das neue Ticket in der Triage-Spalte

> **Tageslimit:** 10 KI-generierte Tickets pro Tag

### Als Teammitglied

1. [join-issue-collector.vercel.app/login](https://join-issue-collector.vercel.app/login) aufrufen
2. Als Gast einloggen oder registrieren
3. Tickets per Drag & Drop durch die Spalten verschieben
4. Tasks und Kontakte anlegen, bearbeiten und löschen

---

## Tech Stack

| Bereich             | Technologie                         |
| ------------------- | ----------------------------------- |
| Framework           | Next.js 16 (App Router)             |
| Sprache             | TypeScript                          |
| Styling             | Tailwind CSS                        |
| Datenbank / Auth    | Supabase (PostgreSQL + RLS)         |
| Hosting App         | Vercel (Frankfurt, EU)              |
| Workflow-Automation | n8n (self-hosted, Hetzner Nürnberg) |
| KI-Modell           | Mistral AI – Magistral Small        |
| Drag & Drop         | @hello-pangea/dnd                   |

---

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000).

### Umgebungsvariablen

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
JOIN_API_KEY=
NEXT_PUBLIC_N8N_STATUS_WEBHOOK_URL=
```

---

## n8n Workflows

Die Workflow-JSONs liegen unter [`/n8n`](./n8n/).

**Workflow 1 – E-Mail → Ticket:**
`IMAP Trigger → Tageszähler → LLM-Analyse → POST /api/tasks → Bestätigungsmail`

**Workflow 2 – Statusänderung → Benachrichtigung:**
`Webhook → E-Mail an Ersteller`

---

## API

### `POST /api/tasks`

Erstellt einen Task in der Triage-Spalte. Gesichert via `x-api-key` Header.

```json
{
  "title": "Pflichtfeld",
  "description": "Optional",
  "category": "Technical Task | User Story",
  "priority": "urgent | medium | low",
  "due_date": "YYYY-MM-DD | null",
  "creator_email": "Pflichtfeld"
}
```

Antwort: `201 { "id": "uuid" }`
