"use client";

import { useState, useRef, useEffect } from "react";
import { Contact } from "@/lib/types";
import Avatar from "@/components/ui/Avatar";

interface AssignedToDropdownProps {
  contacts: Contact[];
  value: string[];
  onChange: (ids: string[]) => void;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`transition-transform duration-100 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="#2A3647"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
      <path
        d="M1 7L6.5 12.5L17 1"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AssignedToDropdown({
  contacts,
  value,
  onChange,
}: AssignedToDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggle(id: string) {
    onChange(
      value.includes(id) ? value.filter((v) => v !== id) : [...value, id],
    );
  }

  const selected = contacts.filter((c) => value.includes(c.id));

  return (
    <div className="flex flex-col gap-2 relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between bg-white border border-border rounded-[10px] px-4 py-3 w-full cursor-pointer text-left focus:border-blue focus:outline-none transition-colors duration-100"
      >
        <span className="text-[16px] lg:text-[20px] text-navy">
          Select contacts to assign
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-10 bg-white border border-border rounded-[10px] shadow-[0_0_4px_rgba(0,0,0,0.1)] max-h-[200px] overflow-y-auto mt-1">
          {contacts.length === 0 && (
            <p className="px-4 py-3 text-muted text-[16px]">
              No contacts found
            </p>
          )}
          {contacts.map((contact) => {
            const isSelected = value.includes(contact.id);
            return (
              <button
                key={contact.id}
                type="button"
                onClick={() => toggle(contact.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 cursor-pointer border-0 text-left transition-colors duration-100 ${
                  isSelected
                    ? "bg-navy text-white"
                    : "bg-transparent hover:bg-bg-app"
                }`}
              >
                <Avatar name={contact.name} color={contact.color} size="sm" />
                <span
                  className={`flex-1 text-[16px] ${isSelected ? "text-white" : "text-navy"}`}
                >
                  {contact.name}
                </span>
                {isSelected && (
                  <div className="size-5 flex items-center justify-center">
                    <CheckIcon />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {selected.map((c) => (
            <Avatar key={c.id} name={c.name} color={c.color} size="sm" />
          ))}
        </div>
      )}
    </div>
  );
}
