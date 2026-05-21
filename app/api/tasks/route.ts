import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface TaskBody {
  title: string;
  description?: string;
  category: "Technical Task" | "User Story";
  priority: "urgent" | "medium" | "low";
  due_date: string;
  creator_email: string;
  subtasks?: string[];
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
  if (!b.title || !b.category || !b.priority || !b.creator_email) {
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
    category: body.category?.toLowerCase().includes("technical")
      ? "Technical Task"
      : "User Story",
    priority: ["urgent", "medium", "low"].includes(body.priority?.toLowerCase())
      ? (body.priority.toLowerCase() as "urgent" | "medium" | "low")
      : "medium",
    due_date: body.due_date?.trim() || null,
    status: "triage" as const,
    creator_email: body.creator_email,
    creator_type: "external" as const,
  };
}

const DAILY_LIMIT = 10;

export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getSupabaseAdmin();
  const today = new Date().toISOString().split("T")[0];
  const { count, error } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("creator_type", "external")
    .gte("created_at", `${today}T00:00:00.000Z`)
    .lt("created_at", `${today}T23:59:59.999Z`);
  if (error) {
    return NextResponse.json(
      { error: "Failed to count tasks", detail: error.message },
      { status: 500 },
    );
  }
  const dailyCount = count ?? 0;
  return NextResponse.json({
    date: today,
    count: dailyCount,
    limit: DAILY_LIMIT,
    limitReached: dailyCount >= DAILY_LIMIT,
  });
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
      { error: "Failed to create task", detail: error?.message },
      { status: 500 },
    );
  }
  if (body.subtasks && body.subtasks.length > 0) {
    const subtaskRows = body.subtasks.map((title, index) => ({
      task_id: data.id,
      title: String(title).trim(),
      completed: false,
      position: index,
    }));
    await supabase.from("subtasks").insert(subtaskRows);
  }
  return NextResponse.json({ id: data.id }, { status: 201 });
}
