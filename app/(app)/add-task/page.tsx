import { createClient } from "@/lib/supabase/server";
import AddTaskForm from "@/components/tasks/AddTaskForm";

async function getContacts() {
  const supabase = await createClient();
  const { data } = await supabase.from("contacts").select("*").order("name");
  return data ?? [];
}

export default async function AddTaskPage() {
  const contacts = await getContacts();

  return (
    <div className="pl-14 pt-[70px]">
      <h1 className="text-[61px] font-bold leading-[1.2] text-black mb-12">
        Add Task
      </h1>
      <AddTaskForm contacts={contacts} />
    </div>
  );
}
