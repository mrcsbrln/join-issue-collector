"use client";

import { useState, KeyboardEvent } from "react";

interface SubtaskInputProps {
  subtasks: string[];
  onChange: (subtasks: string[]) => void;
}

function PlusIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 4.5H17M6 4.5V3C6 2.17 6.67 1.5 7.5 1.5H10.5C11.33 1.5 12 2.17 12 3V4.5M7 9V15M11 9V15M2.5 4.5L3.5 17C3.5 17.83 4.17 18.5 5 18.5H13C13.83 18.5 14.5 17.83 14.5 17L15.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SubtaskInput({
  subtasks,
  onChange,
}: SubtaskInputProps) {
  const [input, setInput] = useState("");

  function add() {
    const trimmed = input.trim();
    if (!trimmed) return;
    onChange([...subtasks, trimmed]);
    setInput("");
  }

  function remove(index: number) {
    onChange(subtasks.filter((_, i) => i !== index));
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 bg-white border border-border rounded-[10px] px-4 py-3 focus-within:border-blue transition-colors duration-100">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Add new subtask"
          className="flex-1 text-[16px] lg:text-[20px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
        />
        <button
          type="button"
          onClick={add}
          className="cursor-pointer border-0 bg-transparent p-0 text-navy hover:text-blue transition-colors duration-100 flex-shrink-0"
        >
          <PlusIcon />
        </button>
      </div>
      {subtasks.map((subtask, i) => (
        <div
          key={i}
          className="flex items-center gap-2 px-4 py-2 rounded-[10px] group hover:bg-bg-app"
        >
          <span className="flex-1 text-[16px] text-navy before:content-['•'] before:mr-2">
            {subtask}
          </span>
          <button
            type="button"
            onClick={() => remove(i)}
            className="cursor-pointer border-0 bg-transparent p-1 text-navy opacity-0 group-hover:opacity-100 transition-opacity duration-100"
          >
            <DeleteIcon />
          </button>
        </div>
      ))}
    </div>
  );
}
