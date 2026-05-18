import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface TaskBody {
  title: string;
  description?: string;
  category: "Technical Task" | "User Story";
  priority: "urgent" | "medium" | "low";
  due_date: string;
  creator_email: string;
}

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

function validateApiKey(request: NextRequest): boolean {
  return request.headers.get("x-api-key") === process.env.JOIN_API_KEY;
}

function parseBody(body: unknown): TaskBody {
  const b = body as Record<string, unknown>;
  if (
    !b.title ||
    !b.category ||
    !b.priority ||
    !b.due_date ||
    !b.creator_email
  ) {
    throw new Error(
      "Missing required fields: title, category, priority, due_date, creator_email",
    );
  }
  return b as unknown as TaskBody;
}

function buildTaskPayload(body: TaskBody) {
  const aiPrefix = "Dieses Ticket wurde KI-generiert.\n\n";
  return {
    title: String(body.title).trim(),
    description: body.description
      ? aiPrefix + body.description
      : aiPrefix.trim(),
    category: body.category,
    priority: body.priority,
    due_date: body.due_date,
    status: "triage" as const,
    creator_email: body.creator_email,
    creator_type: "external" as const,
  };
}

export async function POST(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: TaskBody;
  try {
    body = parseBody(await request.json());
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("tasks")
    .insert(buildTaskPayload(body))
    .select("id")
    .single();
  if (error || !data) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
  return NextResponse.json({ id: data.id }, { status: 201 });
}
