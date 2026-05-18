# n8n Workflows – Join AI Issue Collector

Dieses Verzeichnis enthält die n8n-Workflow-JSONs für den KI-basierten Issue Collector.

## Voraussetzungen

- n8n-Instanz (self-hosted oder Cloud)
- IMAP-Zugang zum Postfach `issue-collector@marcus-hartmann.net`
- Anthropic API Key (Claude)
- Join API Key (generieren und in Vercel als `JOIN_API_KEY` setzen)

## Workflows

### 1. `workflow-email-to-ticket.json` – E-Mail → Ticket

**Ablauf:**

```
IMAP Trigger
  └─ Tageszähler prüfen (Static Data oder Google Sheet)
       ├─ ≥ 10/Tag → Limit-Mail an Absender → E-Mail nach "zu bearbeiten" → Stop
       └─ < 10/Tag
            └─ Claude AI Node (Message Parser)
                 └─ HTTP Request: POST https://join-ai.vercel.app/api/tasks
                      ├─ Erfolg → Zähler +1 → Bestätigungsmail → E-Mail nach "erledigt"
                      └─ Fehler → E-Mail nach "zu bearbeiten" → Fehler-Benachrichtigung
```

**Claude Prompt (AI Node):**

```
Du bist ein Assistent, der E-Mails in strukturierte Tickets umwandelt.
Analysiere diese E-Mail und antworte NUR mit einem validen JSON-Objekt (kein Markdown):

{
  "title": "Prägnanter Titel (max 60 Zeichen)",
  "description": "Vollständige Beschreibung des Anliegens",
  "category": "Technical Task" oder "User Story",
  "priority": "urgent" | "medium" | "low",
  "due_date": "YYYY-MM-DD" oder null
}

Bestimme priority nach diesen Regeln:
- urgent: Wörter wie "dringend", "kritisch", "sofort", "asap", "urgent", "critical"
- low: Wörter wie "irgendwann", "nice to have", "optional", "low priority"
- medium: alles andere

E-Mail Betreff: {{ $json.subject }}
E-Mail Body: {{ $json.text }}
E-Mail Absender: {{ $json.from.value[0].address }}
```

**HTTP Request Node (POST /api/tasks):**

- URL: `https://join-ai.vercel.app/api/tasks`
- Method: POST
- Header: `x-api-key: {{ $env.JOIN_API_KEY }}`
- Body (JSON):
  ```json
  {
    "title": "{{ $json.title }}",
    "description": "{{ $json.description }}",
    "category": "{{ $json.category }}",
    "priority": "{{ $json.priority }}",
    "due_date": "{{ $json.due_date }}",
    "creator_email": "{{ $('IMAP Trigger').item.json.from.value[0].address }}"
  }
  ```

---

### 2. `workflow-status-notification.json` – Statusänderung → E-Mail

**Ablauf:**

```
Webhook (POST /webhook/status-change)
  └─ E-Mail senden an creatorEmail
       └─ Respond with 200
```

**Webhook Body:**

```json
{
  "taskId": "...",
  "taskTitle": "...",
  "newStatus": "todo | in-progress | awaiting-feedback | done",
  "creatorEmail": "stakeholder@example.com"
}
```

**E-Mail Template:**

```
Betreff: [Join] Ihr Ticket wurde aktualisiert: {{ $json.taskTitle }}

Ihr Feature Request "{{ $json.taskTitle }}" wurde in den Status
"{{ $json.newStatus }}" verschoben.

Vielen Dank für Ihr Feedback!
Das Join-Team
```

Nach dem Erstellen des Webhooks: die generierte Webhook-URL als
`NEXT_PUBLIC_N8N_STATUS_WEBHOOK_URL` in Vercel eintragen.

---

## Tageszähler (Throttling)

Optionen für den Tageszähler:

**Option A – n8n Static Data (einfach):**

```javascript
// In einem Code-Node:
const staticData = $getWorkflowStaticData("global");
const today = new Date().toISOString().split("T")[0];
if (staticData.date !== today) {
  staticData.date = today;
  staticData.count = 0;
}
staticData.count += 1;
return [
  { json: { count: staticData.count, limitReached: staticData.count > 10 } },
];
```

**Option B – Supabase direkt abfragen:** HTTP Request auf die Join-API.

---

## Setup-Schritte

1. Workflows aus diesem Verzeichnis in n8n importieren
2. IMAP-Credentials für `issue-collector@marcus-hartmann.net` konfigurieren
3. Anthropic API Key als n8n Credential anlegen
4. `JOIN_API_KEY` als n8n Environment Variable setzen
5. Webhook-URL aus Workflow 2 kopieren → in Vercel als `NEXT_PUBLIC_N8N_STATUS_WEBHOOK_URL` eintragen
6. Beide Workflows aktivieren
