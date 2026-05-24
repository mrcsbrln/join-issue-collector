"use client";

import { Contact } from "@/lib/types";
import { getInitials } from "@/lib/utils";

function PersonAddIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="white"
      aria-hidden="true"
    >
      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function ContactAvatar({ contact }: { contact: Contact }) {
  return (
    <div
      className="size-[42px] rounded-full flex items-center justify-center text-white text-[16px] font-medium shrink-0"
      style={{ backgroundColor: contact.color }}
    >
      {getInitials(contact.name)}
    </div>
  );
}

function groupByLetter(contacts: Contact[]): Record<string, Contact[]> {
  return contacts.reduce<Record<string, Contact[]>>((acc, c) => {
    const letter = c.name[0].toUpperCase();
    (acc[letter] ??= []).push(c);
    return acc;
  }, {});
}

interface ContactListProps {
  contacts: Contact[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
}

function ContactRow({
  contact,
  selected,
  onSelect,
}: {
  contact: Contact;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex gap-4 lg:gap-[35px] items-center px-[24px] py-[15px] rounded-[10px] w-full lg:w-[352px] cursor-pointer border-0 text-left transition-colors duration-100 ${
        selected ? "bg-navy" : "bg-white hover:bg-navy/5"
      }`}
    >
      <ContactAvatar contact={contact} />
      <div className="flex flex-col gap-[5px] min-w-0">
        <span
          className={`text-[20px] truncate ${selected ? "text-white" : "text-black"}`}
        >
          {contact.name}
        </span>
        <span className="text-[16px] text-[#007cee] truncate">
          {contact.email}
        </span>
      </div>
    </button>
  );
}

function LetterGroup({
  letter,
  contacts,
  selectedId,
  onSelect,
}: {
  letter: string;
  contacts: Contact[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <div className="px-[36px] py-[17px]">
        <span className="text-[20px] text-black">{letter}</span>
      </div>
      <div className="h-px bg-[#D1D1D1] mb-2" />
      {contacts.map((contact) => (
        <ContactRow
          key={contact.id}
          contact={contact}
          selected={selectedId === contact.id}
          onSelect={() => onSelect(contact.id)}
        />
      ))}
    </div>
  );
}

export default function ContactList({
  contacts,
  selectedId,
  onSelect,
  onAdd,
}: ContactListProps) {
  const grouped = groupByLetter(contacts);

  return (
    <div className="w-full lg:w-[456px] lg:shrink-0 bg-white min-h-screen lg:min-h-0 lg:shadow-[4px_0px_6px_0px_rgba(0,0,0,0.08)] flex flex-col lg:overflow-hidden">
      <div className="hidden lg:block px-[24px] py-[32px] shrink-0">
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center justify-center gap-4 w-full lg:w-[352px] py-3 bg-navy text-white text-[21px] font-bold rounded-[10px] cursor-pointer border-0 hover:bg-blue transition-colors duration-100"
        >
          Add new contact
          <PersonAddIcon />
        </button>
      </div>
      <div className="lg:flex-1 lg:overflow-y-auto px-[24px] pb-[32px]">
        {Object.entries(grouped).map(([letter, groupContacts]) => (
          <LetterGroup
            key={letter}
            letter={letter}
            contacts={groupContacts}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
