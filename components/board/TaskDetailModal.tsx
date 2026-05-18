"use client";

import { useState } from "react";
import { TaskWithRelations, Priority, Contact, CreatorType } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import Avatar from "@/components/ui/Avatar";
import EditTaskForm from "./EditTaskForm";

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
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const configs: Record<
    Priority,
    { label: string; color: string; icon: React.ReactNode }
  > = {
    urgent: {
      label: "Urgent",
      color: "#FF3D00",
      icon: (
        <svg width="18" height="14" viewBox="0 0 21 16" fill="none">
          <path
            d="M20 15L10.5 8L1 15"
            stroke="#FF3D00"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 8L10.5 1L1 8"
            stroke="#FF3D00"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    medium: {
      label: "Medium",
      color: "#FFA800",
      icon: (
        <svg width="18" height="7" viewBox="0 0 21 8" fill="none">
          <path
            d="M1 1.5H20"
            stroke="#FFA800"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M1 6.5H20"
            stroke="#FFA800"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    low: {
      label: "Low",
      color: "#7AE229",
      icon: (
        <svg width="18" height="14" viewBox="0 0 21 16" fill="none">
          <path
            d="M1 1L10.5 8L20 1"
            stroke="#7AE229"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 8L10.5 15L20 8"
            stroke="#7AE229"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  };
  const { label, color, icon } = configs[priority];
  return (
    <span className="flex items-center gap-2 text-[20px]" style={{ color }}>
      {label} {icon}
    </span>
  );
}

function CreatorTypeBadge({ type }: { type: CreatorType }) {
  const isInternal = type === "internal";
  return (
    <span
      className={`text-white text-[14px] px-3 py-1 rounded-[8px] shrink-0 ${isInternal ? "bg-[#42526E]" : "bg-[#FF6B35]"}`}
    >
      {isInternal ? "Intern" : "Extern"}
    </span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const isTechnical = category === "Technical Task";
  return (
    <span
      className={`text-white text-[16px] px-4 py-1 rounded-[8px] shrink-0 ${isTechnical ? "bg-[#1FD7C1]" : "bg-[#0038FF]"}`}
    >
      {category}
    </span>
  );
}

interface TaskDetailModalProps {
  task: TaskWithRelations;
  contacts: Contact[];
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (updated: TaskWithRelations) => void;
  onSubtaskToggle: (subtaskId: string, completed: boolean) => void;
}

export default function TaskDetailModal({
  task,
  contacts,
  onClose,
  onDelete,
  onUpdate,
  onSubtaskToggle,
}: TaskDetailModalProps) {
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [currentTask, setCurrentTask] = useState(task);
  const [isEditing, setIsEditing] = useState(false);

  async function toggleSubtask(id: string, completed: boolean) {
    setSubtasks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed } : s)),
    );
    onSubtaskToggle(id, completed);
    const supabase = createClient();
    await supabase.from("subtasks").update({ completed }).eq("id", id);
  }

  function handleUpdateSuccess(updated: TaskWithRelations) {
    setCurrentTask(updated);
    setSubtasks(updated.subtasks);
    setIsEditing(false);
    onUpdate(updated);
  }

  const maxW = isEditing ? "max-w-[1125px]" : "max-w-[530px]";

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 overflow-y-auto"
        onClick={isEditing ? undefined : onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-[30px] shadow-[0_0_4px_rgba(0,0,0,0.1)] w-full ${maxW} relative px-[40px] py-[48px] transition-all duration-100`}
        >
          {isEditing ? (
            <>
              <div className="flex items-center justify-between mb-6 lg:mb-10">
                <h2 className="text-[47px] lg:text-[61px] font-bold leading-[1.2] text-black">
                  Edit Task
                </h2>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-navy hover:text-blue transition-colors duration-100 cursor-pointer border-0 bg-transparent shrink-0"
                >
                  <CloseIcon />
                </button>
              </div>
              <EditTaskForm
                task={currentTask}
                contacts={contacts}
                onCancel={() => setIsEditing(false)}
                onSuccess={handleUpdateSuccess}
              />
            </>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Header row */}
              <div className="flex items-center justify-between">
                <CategoryBadge category={currentTask.category} />
                <button
                  type="button"
                  onClick={onClose}
                  className="text-navy hover:text-blue transition-colors duration-100 cursor-pointer border-0 bg-transparent shrink-0"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Title */}
              <h2 className="text-[35px] lg:text-[61px] font-bold leading-[1.2] text-black">
                {currentTask.title}
              </h2>

              {/* Description */}
              {currentTask.description && (
                <p className="text-[16px] lg:text-[20px] text-black leading-[1.4]">
                  {currentTask.description}
                </p>
              )}

              {/* Due date */}
              <div className="flex gap-[25px] items-start text-[16px] lg:text-[20px]">
                <span className="text-navy shrink-0">Due date:</span>
                <span className="text-black">
                  {currentTask.due_date.split("-").reverse().join("/")}
                </span>
              </div>

              {/* Priority */}
              <div className="flex gap-[25px] items-center text-[16px] lg:text-[20px]">
                <span className="text-navy shrink-0">Priority:</span>
                <PriorityBadge priority={currentTask.priority} />
              </div>

              {/* Creator */}
              {currentTask.creator_email && (
                <div className="flex gap-[25px] items-center text-[16px] lg:text-[20px]">
                  <span className="text-navy shrink-0">Creator:</span>
                  <span className="text-black">
                    {currentTask.creator_email}
                  </span>
                  {currentTask.creator_type && (
                    <CreatorTypeBadge type={currentTask.creator_type} />
                  )}
                </div>
              )}

              {/* Assigned To */}
              {currentTask.contacts.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-[16px] lg:text-[20px] text-navy">
                    Assigned To:
                  </span>
                  <div className="flex flex-col gap-1">
                    {currentTask.contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center gap-4 px-4 py-[7px]"
                      >
                        <Avatar
                          name={contact.name}
                          color={contact.color}
                          size="sm"
                          filled
                        />
                        <span className="text-[16px] lg:text-[20px] text-black">
                          {contact.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subtasks */}
              {subtasks.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-[16px] lg:text-[20px] text-navy">
                    Subtasks
                  </span>
                  <div className="flex flex-col gap-1">
                    {subtasks.map((sub) => (
                      <label
                        key={sub.id}
                        className="flex items-center gap-4 px-4 py-[6px] cursor-pointer rounded-[10px] hover:bg-bg-app transition-colors duration-100"
                      >
                        <input
                          type="checkbox"
                          checked={sub.completed}
                          onChange={(e) =>
                            toggleSubtask(sub.id, e.target.checked)
                          }
                          className="size-4 accent-navy cursor-pointer shrink-0"
                        />
                        <span
                          className={`text-[16px] text-black ${sub.completed ? "line-through text-muted" : ""}`}
                        >
                          {sub.title}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer: Delete | Edit */}
              <div className="flex items-center gap-2 self-end pt-2">
                <button
                  type="button"
                  onClick={onDelete}
                  className="flex items-center gap-2 text-navy hover:text-blue transition-colors duration-100 cursor-pointer border-0 bg-transparent px-2 py-1"
                >
                  <TrashIcon />
                  <span className="text-[16px]">Delete</span>
                </button>
                <div className="w-px h-6 bg-border shrink-0" />
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-navy hover:text-blue transition-colors duration-100 cursor-pointer border-0 bg-transparent px-2 py-1"
                >
                  <EditIcon />
                  <span className="text-[16px]">Edit</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
