# Join – AI-Powered Kanban Board

A collaborative Kanban board with a built-in AI issue collector. Stakeholders can submit feature requests and bug reports via email — the AI automatically analyses the message and creates a prioritised ticket in the Triage column.

**Live:** [join-issue-collector.vercel.app](https://join-issue-collector.vercel.app)

---

## Features

- **Kanban board** with columns: Triage, To Do, In Progress, Awaiting Feedback, Done
- **Drag & Drop** between columns (desktop) + move menu (mobile)
- **AI Issue Collector:** Email → Mistral AI → ticket in Triage (fully automated)
- **Stakeholder landing page** with daily request counter and direct email link
- **Confirmation email** to the sender after successful ticket creation
- **Creator badge** (Internal / External) in the task detail view
- **Contact management** with alphabetical sorting
- **Guest login** without registration

---

## Demo

### As a Stakeholder (no login required)

1. Visit [join-issue-collector.vercel.app](https://join-issue-collector.vercel.app)
2. Click "Create Email Request" → send an email to `issue-collector@marcus-hartmann.net`
3. Write any subject and body — the AI generates a ticket from it
4. Wait for the confirmation email (approx. 30–60 seconds)
5. The new ticket appears in the Triage column at [/board](https://join-issue-collector.vercel.app/board)

> **Daily limit:** 10 AI-generated tickets per day

### As a Team Member

1. Visit [join-issue-collector.vercel.app/login](https://join-issue-collector.vercel.app/login)
2. Log in as guest or register
3. Move tickets between columns via drag & drop
4. Create, edit and delete tasks and contacts

---

## Tech Stack

| Area                | Technology                               |
| ------------------- | ---------------------------------------- |
| Framework           | Next.js 16 (App Router)                  |
| Language            | TypeScript                               |
| Styling             | Tailwind CSS                             |
| Database / Auth     | Supabase (PostgreSQL + RLS)              |
| App Hosting         | Vercel (Frankfurt, EU)                   |
| Workflow Automation | n8n (self-hosted, Hetzner Nuremberg, EU) |
| AI Model            | Mistral AI – Magistral Small             |
| Drag & Drop         | @hello-pangea/dnd                        |

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
JOIN_API_KEY=
NEXT_PUBLIC_N8N_STATUS_WEBHOOK_URL=
```

---

## n8n Workflows

Workflow JSON files are located in [`/n8n`](./n8n/).

**Workflow 1 – Email → Ticket:**
`IMAP Trigger → Daily counter → LLM analysis → POST /api/tasks → Confirmation email`

**Workflow 2 – Status change → Notification:**
`Webhook → Email to creator`

---

## API

### `POST /api/tasks`

Creates a task in the Triage column. Secured via `x-api-key` header.

```json
{
  "title": "required",
  "description": "optional",
  "category": "Technical Task | User Story",
  "priority": "urgent | medium | low",
  "due_date": "YYYY-MM-DD | null",
  "creator_email": "required"
}
```

Response: `201 { "id": "uuid" }`
