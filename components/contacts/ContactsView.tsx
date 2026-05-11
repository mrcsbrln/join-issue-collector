"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Contact } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import ContactFormModal from "./ContactFormModal";

function ArrowLeftIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19 12H5M5 12L12 19M5 12L12 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
    <>
      {/* Mobile: heading (list view) or back button (detail view) */}
      <div className="lg:hidden mb-6">
        {selectedId === null ? (
          <div>
            <h1 className="text-[47px] font-bold leading-[1.2] text-black">
              Contacts
            </h1>
            <p className="text-[20px] text-navy mt-1">Better with a team</p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="flex items-center gap-2 text-navy text-[16px] cursor-pointer border-0 bg-transparent hover:text-blue transition-colors duration-100"
          >
            <ArrowLeftIcon />
            Contacts
          </button>
        )}
      </div>

      <div className="lg:-m-[40px] lg:flex lg:h-[calc(100vh-96px)]">
        {/* Contact list panel — hidden on mobile when a contact is selected */}
        <div className={selectedId !== null ? "hidden lg:flex" : ""}>
          <ContactList
            contacts={contacts}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onAdd={openAdd}
          />
        </div>

        {/* Detail panel — hidden on mobile when no contact is selected */}
        <div
          className={`${selectedId === null ? "hidden lg:block" : ""} pt-4 lg:pt-0 lg:flex-1 lg:pl-[55px] lg:pr-[40px] lg:pt-[110px] lg:pb-[40px] lg:overflow-y-auto`}
        >
          {/* Desktop heading */}
          <div className="hidden lg:flex items-center gap-[30px] mb-[55px]">
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
      </div>

      {modalContact !== undefined && (
        <ContactFormModal
          contact={modalContact}
          onClose={closeModal}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
