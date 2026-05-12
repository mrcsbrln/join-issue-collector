"use client";

import { useState, KeyboardEvent } from "react";

interface SubtaskInputProps {
  subtasks: string[];
  onChange: (subtasks: string[]) => void;
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="#2A3647"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12L9.5 17.5L20 6"
        stroke="#2A3647"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#2A3647"
      aria-hidden="true"
    >
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#2A3647"
      aria-hidden="true"
    >
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  );
}

function Divider() {
  return <div className="w-px h-6 bg-navy opacity-30 shrink-0" />;
}

export default function SubtaskInput({
  subtasks,
  onChange,
}: SubtaskInputProps) {
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const isTyping = input.length > 0;

  function add() {
    const trimmed = input.trim();
    if (!trimmed) return;
    onChange([...subtasks, trimmed]);
    setInput("");
  }

  function remove(index: number) {
    if (editIndex === index) setEditIndex(null);
    onChange(subtasks.filter((_, i) => i !== index));
  }

  function startEdit(index: number) {
    setEditIndex(index);
    setEditValue(subtasks[index]);
  }

  function confirmEdit() {
    if (editIndex === null) return;
    const trimmed = editValue.trim();
    if (!trimmed) {
      remove(editIndex);
    } else {
      const updated = [...subtasks];
      updated[editIndex] = trimmed;
      onChange(updated);
    }
    setEditIndex(null);
  }

  function handleAddKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
    if (e.key === "Escape") setInput("");
  }

  function handleEditKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      confirmEdit();
    }
    if (e.key === "Escape") setEditIndex(null);
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Add input */}
      <div
        className={`flex items-center justify-between bg-white border rounded-[10px] px-4 py-[12px] transition-colors duration-100 ${isTyping ? "border-blue" : "border-border"}`}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleAddKey}
          placeholder="Add  new subtask"
          className="flex-1 text-[16px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
        />
        {isTyping && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setInput("")}
              className="cursor-pointer"
            >
              <CloseIcon />
            </button>
            <Divider />
            <button type="button" onClick={add} className="cursor-pointer">
              <CheckIcon />
            </button>
          </div>
        )}
      </div>

      {/* Subtask list */}
      {subtasks.map((subtask, i) =>
        editIndex === i ? (
          /* Edit mode — blue bottom border only */
          <div
            key={i}
            className="flex items-center justify-between h-[48px] px-4 py-1 border-b border-blue bg-white"
          >
            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleEditKey}
              autoFocus
              className="flex-1 text-[16px] text-navy bg-transparent outline-none border-none"
            />
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => remove(i)}
                className="cursor-pointer"
              >
                <DeleteIcon />
              </button>
              <Divider />
              <button
                type="button"
                onClick={confirmEdit}
                className="cursor-pointer"
              >
                <CheckIcon />
              </button>
            </div>
          </div>
        ) : (
          /* Display mode */
          <div
            key={i}
            className="flex items-center justify-between h-[48px] px-4 py-1 rounded-[10px] hover:bg-bg-app transition-colors duration-100"
          >
            <ul className="flex-1 text-[16px] text-navy list-disc list-inside">
              <li>{subtask}</li>
            </ul>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => startEdit(i)}
                className="cursor-pointer"
              >
                <EditIcon />
              </button>
              <Divider />
              <button
                type="button"
                onClick={() => remove(i)}
                className="cursor-pointer"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
