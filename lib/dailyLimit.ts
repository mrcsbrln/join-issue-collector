import { createClient } from "@supabase/supabase-js";

export const DAILY_LIMIT = 10;

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function getDailyLimitStatus(): Promise<{
  date: string;
  count: number;
  limit: number;
  limitReached: boolean;
}> {
  const supabase = getSupabaseAdmin();
  const today = new Date().toISOString().split("T")[0];
  const { count } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("creator_type", "external")
    .gte("created_at", `${today}T00:00:00.000Z`)
    .lt("created_at", `${today}T23:59:59.999Z`);
  const dailyCount = count ?? 0;
  return {
    date: today,
    count: dailyCount,
    limit: DAILY_LIMIT,
    limitReached: dailyCount >= DAILY_LIMIT,
  };
}
