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
    <div className="md:pl-14 md:pt-[70px]">
      <h1 className="text-[47px] md:text-[61px] font-bold leading-[1.2] text-black mb-6 md:mb-12">
        Add Task
      </h1>
      <AddTaskForm contacts={contacts} />
    </div>
  );
}
