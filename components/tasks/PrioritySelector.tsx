"use client";

import { Priority } from "@/lib/types";

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: "urgent", label: "Urgent", color: "#FF3D00" },
  { value: "medium", label: "Medium", color: "#FFA800" },
  { value: "low", label: "Low", color: "#7AE229" },
];

function UrgentIcon() {
  return (
    <svg width="21" height="16" viewBox="0 0 21 16" fill="none">
      <path
        d="M20 15L10.5 8L1 15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 8L10.5 1L1 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg width="21" height="8" viewBox="0 0 21 8" fill="none">
      <path
        d="M1 1.5H20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M1 6.5H20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LowIcon() {
  return (
    <svg width="21" height="16" viewBox="0 0 21 16" fill="none">
      <path
        d="M1 1L10.5 8L20 1"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 8L10.5 15L20 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS: Record<Priority, React.FC> = {
  urgent: UrgentIcon,
  medium: MediumIcon,
  low: LowIcon,
};

interface PrioritySelectorProps {
  value: Priority;
  onChange: (p: Priority) => void;
}

export default function PrioritySelector({
  value,
  onChange,
}: PrioritySelectorProps) {
  return (
    <div className="flex gap-4 w-full">
      {PRIORITIES.map((p) => {
        const active = value === p.value;
        const Icon = ICONS[p.value];
        return (
          <button
            key={p.value}
            type="button"
            onClick={() => onChange(p.value)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[10px] text-[20px] transition-all duration-100 cursor-pointer border-0 ${
              active
                ? "text-white font-bold shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                : "bg-white text-black font-normal shadow-[0_0_4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            }`}
            style={{ backgroundColor: active ? p.color : undefined }}
          >
            <span className="whitespace-nowrap">{p.label}</span>
            <span style={{ color: active ? "white" : p.color }}>
              <Icon />
            </span>
          </button>
        );
      })}
    </div>
  );
}
