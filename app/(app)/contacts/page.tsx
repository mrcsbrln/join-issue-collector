import { createClient } from "@/lib/supabase/server";
import { Contact } from "@/lib/types";
import ContactsView from "@/components/contacts/ContactsView";

async function getContacts(): Promise<Contact[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("contacts").select("*").order("name");
  return data ?? [];
}

export default async function ContactsPage() {
  const contacts = await getContacts();
  return <ContactsView initialContacts={contacts} />;
}
