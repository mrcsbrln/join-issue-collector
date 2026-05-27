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
    <div className="lg:pl-14 lg:pt-[3vh]">
      <h1 className="text-[47px] lg:text-[61px] font-bold leading-[1.2] text-black mb-6 lg:mb-12">
        Add Task
      </h1>
      <AddTaskForm contacts={contacts} />
    </div>
  );
}
