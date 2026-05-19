@AGENTS.md

# Join – Kanban Board

Lies und befolge die Checkliste in [CHECKLIST.md](./CHECKLIST.md).
Lies und befolge die Checkliste in [CHECKLIST-ISSUE-COLLECTOR.md](./CHECKLIST-ISSUE-COLLECTOR.md).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **Datenbank/Auth:** Supabase (PostgreSQL + Row Level Security)
- **Drag & Drop:** `@hello-pangea/dnd`
- **Formulare:** React Hook Form (eigene Validierung, kein HTML5-required)
- **Notifications:** react-hot-toast

## Projekt starten

```bash
npm run dev       # Dev-Server auf localhost:3000
npm run build     # Production build
npm run typecheck # TypeScript prüfen
```

## Verzeichnisstruktur

```
app/
  (auth)/login, register       ← Nicht-geschützte Auth-Seiten
  (app)/summary, board,        ← Geschützte App-Seiten (Sidebar + Header)
        add-task, contacts,
        legal-notice, privacy-policy
components/
  board/    KanbanBoard, KanbanColumn, TaskCard, TaskMoveMenu
  tasks/    TaskForm, TaskDetail, SubtaskInput, PrioritySelector, AssignedToDropdown
  contacts/ ContactList, ContactCard, ContactForm
  layout/   Sidebar, Header
  ui/       Modal, Button, Input, ProgressBar
lib/
  supabase/ client.ts, server.ts  ← Browser- und Server-Clients
  types.ts                        ← Alle TypeScript-Typen
  utils.ts
middleware.ts                     ← Auth-Guard (redirect → /login)
supabase/migrations/001_initial.sql
```

## Datenbank-Tabellen

- `profiles` – erweitert auth.users (name, email, phone, color, is_guest)
- `contacts` – geteilte Kontaktliste aller User
- `tasks` – status: todo | in-progress | awaiting-feedback | done
- `task_contacts` – Junction-Tabelle Tasks ↔ Contacts
- `subtasks` – mit completed-Flag und position

Alle Tabellen haben RLS aktiviert: authentifizierte User haben vollen Zugriff (geteiltes Board).

## Code-Konventionen

- Max **400 Zeilen** pro Datei
- Max **14 Zeilen** pro Funktion
- **camelCase** für Variablen, Funktionen, Dateinamen
- Kein `console.log` im Code
- Keine HTML5-Formularvalidierung (`required`, `type="email"` etc.)
- Alle Buttons: `cursor-pointer border-0` (Tailwind)
- Transitions: `duration-100` (75–125ms)
- Content max-width: `max-w-[1440px]`

## Wichtige Projektregeln

- Alle User (inkl. Gast) teilen dasselbe Board und dieselben Kontakte
- Gast-Login über Supabase `signInAnonymously`
- Kanban-Spalten: vertikal auf Mobile (`flex-col`), horizontal ab `md:` (`flex-row`)
- Landscape-Modus auf Mobile deaktivieren via CSS media query
- Erstellter Content muss sofort sichtbar sein (kein Page-Reload)

## Deployment

-Das Projekt ist über das Github Repo au Vercel deployed
