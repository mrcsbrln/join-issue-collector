import { createClient } from "@/lib/supabase/server";
import { TaskWithRelations, Contact } from "@/lib/types";
import KanbanBoard from "@/components/board/KanbanBoard";

async function getTasks(): Promise<TaskWithRelations[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tasks")
    .select("*, subtasks(*), task_contacts(contact:contacts(*))")
    .order("created_at", { ascending: false });

  return (data ?? []).map((task) => ({
    ...task,
    contacts: (task.task_contacts ?? []).map(
      (tc: { contact: unknown }) => tc.contact,
    ),
  }));
}

async function getContacts(): Promise<Contact[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("contacts").select("*").order("name");
  return data ?? [];
}

export default async function BoardPage() {
  const [tasks, contacts] = await Promise.all([getTasks(), getContacts()]);
  return <KanbanBoard initialTasks={tasks} contacts={contacts} />;
}
