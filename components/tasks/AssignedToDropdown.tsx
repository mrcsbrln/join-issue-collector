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
      fill="#2A3647"
      className={`transition-transform duration-100 shrink-0 ${open ? "rotate-180" : ""}`}
    >
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <div className="size-6 flex items-center justify-center shrink-0">
      {checked ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect width="16" height="16" rx="3" fill="#2A3647" />
          <path
            d="M3 8L6.5 11.5L13 4.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect
            x="1"
            y="1"
            width="14"
            height="14"
            rx="2"
            stroke="#2A3647"
            strokeWidth="2"
          />
        </svg>
      )}
    </div>
  );
}

export default function AssignedToDropdown({
  contacts,
  value,
  onChange,
}: AssignedToDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggle(id: string) {
    onChange(
      value.includes(id) ? value.filter((v) => v !== id) : [...value, id],
    );
  }

  function openDropdown() {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );
  const selected = contacts.filter((c) => value.includes(c.id));

  return (
    <div className="flex flex-col gap-2" ref={ref}>
      {/* Closed — static trigger */}
      {!open && (
        <button
          type="button"
          onClick={openDropdown}
          className="flex items-center justify-between bg-white border border-border rounded-[10px] px-4 py-[12px] w-full cursor-pointer text-left transition-colors duration-100 hover:border-navy"
        >
          <span className="text-[16px] text-navy">
            Select contacts to assign
          </span>
          <ChevronIcon open={false} />
        </button>
      )}

      {/* Open — unified container: input + scrollable list */}
      {open && (
        <div className="border border-blue rounded-[10px] bg-white overflow-hidden">
          {/* Input row */}
          <div className="flex items-center px-4 py-[12px]">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-[16px] text-navy bg-transparent outline-none border-none"
            />
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSearch("");
              }}
              className="cursor-pointer"
            >
              <ChevronIcon open={true} />
            </button>
          </div>

          {/* Contact list */}
          <div className="max-h-[240px] overflow-y-auto">
            {filtered.length === 0 && (
              <p className="px-4 py-3 text-muted text-[16px]">
                No contacts found
              </p>
            )}
            {filtered.map((contact) => (
              <button
                key={contact.id}
                type="button"
                onClick={() => toggle(contact.id)}
                className="flex items-center gap-4 w-full px-4 py-[7px] cursor-pointer border-0 text-left hover:bg-bg-app transition-colors duration-100"
              >
                <Avatar
                  name={contact.name}
                  color={contact.color}
                  size="md"
                  filled
                />
                <span className="flex-1 text-[16px] text-navy">
                  {contact.name}
                </span>
                <Checkbox checked={value.includes(contact.id)} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected avatar chips — only shown when closed */}
      {!open && selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((c) => (
            <Avatar key={c.id} name={c.name} color={c.color} size="md" filled />
          ))}
        </div>
      )}
    </div>
  );
}
