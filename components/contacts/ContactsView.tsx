"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Contact } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import ContactFormModal from "./ContactFormModal";

interface ContactsViewProps {
  initialContacts: Contact[];
}

export default function ContactsView({ initialContacts }: ContactsViewProps) {
  const router = useRouter();
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalContact, setModalContact] = useState<Contact | null | undefined>(
    undefined,
  );

  useEffect(() => {
    setContacts(initialContacts);
  }, [initialContacts]);

  const selectedContact = contacts.find((c) => c.id === selectedId) ?? null;

  function openAdd() {
    setModalContact(null);
  }

  function openEdit(contact: Contact) {
    setModalContact(contact);
  }

  function closeModal() {
    setModalContact(undefined);
  }

  function handleSuccess() {
    closeModal();
    router.refresh();
  }

  async function handleDelete(id: string) {
    const supabase = createClient();
    await supabase.from("contacts").delete().eq("id", id);
    if (selectedId === id) setSelectedId(null);
    router.refresh();
  }

  return (
    <div className="-m-[40px] flex h-[calc(100vh-96px)]">
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onAdd={openAdd}
      />
      <div className="flex-1 pl-[55px] pr-[40px] pt-[110px] pb-[40px] overflow-y-auto">
        <div className="flex items-center gap-[30px] mb-[55px]">
          <h1 className="text-[61px] font-bold leading-[1.2] text-black">
            Contacts
          </h1>
          <div className="w-px h-[59px] bg-navy shrink-0" />
          <span className="text-[27px] text-navy">Better with a team</span>
        </div>
        {selectedContact && (
          <ContactDetail
            contact={selectedContact}
            onEdit={() => openEdit(selectedContact)}
            onDelete={() => handleDelete(selectedContact.id)}
          />
        )}
      </div>
      {modalContact !== undefined && (
        <ContactFormModal
          contact={modalContact}
          onClose={closeModal}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}
