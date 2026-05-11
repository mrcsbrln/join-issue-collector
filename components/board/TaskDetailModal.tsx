"use client";

import { useState } from "react";
import { TaskWithRelations, Priority } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import Avatar from "@/components/ui/Avatar";

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
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 5h14M8 5V3h4v2M6 5l1 12h6l1-12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const config = {
    urgent: { label: "Urgent", color: "text-priority-urgent" },
    medium: { label: "Medium", color: "text-priority-medium" },
    low: { label: "Low", color: "text-priority-low" },
  };
  const { label, color } = config[priority];
  return (
    <span className={`text-[16px] lg:text-[20px] font-semibold ${color}`}>
      {label}
    </span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const isTechnical = category === "Technical Task";
  return (
    <span
      className={`text-white text-[14px] lg:text-[16px] px-4 py-1 rounded-[8px] ${isTechnical ? "bg-[#1FD7C1]" : "bg-[#0038FF]"}`}
    >
      {category}
    </span>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface TaskDetailModalProps {
  task: TaskWithRelations;
  onClose: () => void;
  onDelete: () => void;
}

export default function TaskDetailModal({
  task,
  onClose,
  onDelete,
}: TaskDetailModalProps) {
  const [subtasks, setSubtasks] = useState(task.subtasks);

  async function toggleSubtask(id: string, completed: boolean) {
    setSubtasks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed } : s)),
    );
    const supabase = createClient();
    await supabase.from("subtasks").update({ completed }).eq("id", id);
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 overflow-y-auto">
        <div className="bg-white rounded-[30px] shadow-[0_0_4px_rgba(0,0,0,0.1)] w-full max-w-[860px] relative px-4 py-8 lg:px-12 lg:py-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 lg:top-8 lg:right-8 text-navy hover:text-blue transition-colors duration-100 cursor-pointer"
          >
            <CloseIcon />
          </button>

          <CategoryBadge category={task.category} />

          <div className="flex flex-col lg:flex-row lg:gap-12 mt-4 lg:mt-6">
            {/* Left column */}
            <div className="flex flex-col gap-4 lg:gap-6 flex-1 min-w-0">
              <h2 className="text-[27px] lg:text-[35px] font-bold text-navy leading-[1.2]">
                {task.title}
              </h2>

              {task.description && (
                <p className="text-[16px] lg:text-[20px] text-navy leading-[1.4]">
                  {task.description}
                </p>
              )}

              {subtasks.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-[16px] lg:text-[20px] font-bold text-navy">
                    Subtasks
                  </span>
                  {subtasks.map((sub) => (
                    <label
                      key={sub.id}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={sub.completed}
                        onChange={(e) =>
                          toggleSubtask(sub.id, e.target.checked)
                        }
                        className="w-4 h-4 accent-navy cursor-pointer"
                      />
                      <span
                        className={`text-[16px] lg:text-[18px] ${sub.completed ? "line-through text-muted" : "text-navy"}`}
                      >
                        {sub.title}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden lg:block w-px self-stretch bg-border shrink-0" />

            {/* Right column */}
            <div className="flex flex-col gap-4 lg:gap-5 mt-4 lg:mt-0 lg:w-[220px] lg:shrink-0">
              <div>
                <p className="text-[14px] lg:text-[16px] font-bold text-navy mb-1">
                  Due date
                </p>
                <p className="text-[16px] lg:text-[20px] text-navy">
                  {formatDate(task.due_date)}
                </p>
              </div>

              <div>
                <p className="text-[14px] lg:text-[16px] font-bold text-navy mb-1">
                  Priority
                </p>
                <PriorityBadge priority={task.priority} />
              </div>

              {task.contacts.length > 0 && (
                <div>
                  <p className="text-[14px] lg:text-[16px] font-bold text-navy mb-2">
                    Assigned to
                  </p>
                  <div className="flex flex-col gap-2">
                    {task.contacts.map((contact) => (
                      <div key={contact.id} className="flex items-center gap-3">
                        <Avatar
                          name={contact.name}
                          color={contact.color}
                          size="sm"
                        />
                        <span className="text-[14px] lg:text-[16px] text-navy">
                          {contact.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={onDelete}
                className="flex items-center gap-2 text-navy hover:text-priority-urgent transition-colors duration-100 cursor-pointer mt-2 lg:mt-auto pt-2 lg:pt-4 border-t border-border"
              >
                <TrashIcon />
                <span className="text-[16px]">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
