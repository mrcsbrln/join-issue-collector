"use client";

import { Contact } from "@/lib/types";
import { getInitials } from "@/lib/utils";

function EditIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  );
}

interface ContactDetailProps {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ContactDetail({
  contact,
  onEdit,
  onDelete,
}: ContactDetailProps) {
  return (
    <div className="flex flex-col gap-[21px]">
      <div className="flex gap-[54px] items-center">
        <div
          className="size-[120px] rounded-full flex items-center justify-center text-white text-[47px] font-medium shrink-0 shadow-[0_0_2px_rgba(0,0,0,0.1)]"
          style={{ backgroundColor: contact.color }}
        >
          {getInitials(contact.name)}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[47px] font-medium text-black leading-[1.2]">
            {contact.name}
          </span>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onEdit}
              className="flex items-center gap-2 text-navy text-[16px] cursor-pointer border-0 bg-transparent hover:text-blue transition-colors duration-100"
            >
              <EditIcon />
              Edit
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="flex items-center gap-2 text-navy text-[16px] cursor-pointer border-0 bg-transparent hover:text-blue transition-colors duration-100"
            >
              <DeleteIcon />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="text-[20px] text-black py-[27px]">
        Contact Information
      </div>

      <div className="flex flex-col gap-[22px] text-[16px]">
        <div className="flex flex-col gap-[15px]">
          <span className="font-bold text-black">Email</span>
          <a
            href={`mailto:${contact.email}`}
            className="text-[#007cee] hover:underline"
          >
            {contact.email}
          </a>
        </div>
        {contact.phone && (
          <div className="flex flex-col gap-[15px]">
            <span className="font-bold text-black">Phone</span>
            <span className="text-black">{contact.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
