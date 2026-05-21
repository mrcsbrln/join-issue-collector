"use client";

import { useState, useEffect } from "react";
import { TaskWithRelations, Contact, CreatorType } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import Avatar from "@/components/ui/Avatar";
import PriorityBadge from "@/components/ui/PriorityBadge";
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

const WandStarsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#9327ff"
      d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"
    />
  </svg>
);

function AiGeneratedBadge() {
  return (
    <div className="flex items-center gap-[8px]">
      <WandStarsIcon />
      <span className="bg-gradient-to-r from-[#9327ff] to-[#2ea1dc] bg-clip-text text-transparent text-[16px]">
        Ai-generated ticket
      </span>
    </div>
  );
}

function CreatorTypeBadge({ type }: { type: CreatorType }) {
  if (type === "external") {
    return (
      <span className="flex items-center gap-[4px] bg-[#ebfc88] text-[#0b3681] text-[14px] px-[4px] h-[22px] rounded-[4px] shrink-0">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#0b3681"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
        Extern
      </span>
    );
  }
  return (
    <span className="text-white text-[14px] px-3 py-1 rounded-[8px] shrink-0 bg-[#42526E]">
      Intern
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

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

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
          className={`bg-white rounded-[30px] shadow-[0_0_4px_rgba(0,0,0,0.1)] w-full ${maxW} relative transition-all duration-100 max-h-[90vh] overflow-hidden`}
        >
          <div className="overflow-y-auto max-h-[90vh] px-5 py-6 lg:px-[40px] lg:py-[48px]">
            {isEditing ? (
              <>
                <div className="flex items-center justify-between mb-6 lg:mb-10">
                  <h2 className="text-[36px] lg:text-[61px] font-bold leading-[1.2] text-black">
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
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <CategoryBadge category={currentTask.category} />
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-navy hover:text-blue transition-colors duration-100 cursor-pointer border-0 bg-transparent shrink-0"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  {currentTask.creator_type === "external" && (
                    <AiGeneratedBadge />
                  )}
                </div>

                {/* Title */}
                <h2 className="text-[35px] lg:text-[61px] font-bold leading-[1.2] text-black wrap-break-word">
                  {currentTask.title}
                </h2>

                {/* Description */}
                {currentTask.description && (
                  <p className="text-[16px] lg:text-[20px] text-black leading-[1.4] wrap-break-word">
                    {currentTask.description}
                  </p>
                )}

                {/* Due date */}
                <div className="flex gap-[25px] items-start text-[16px] lg:text-[20px]">
                  <span className="text-navy shrink-0">Due date:</span>
                  <span className="text-black">
                    {currentTask.due_date
                      ? currentTask.due_date.split("-").reverse().join("/")
                      : "—"}
                  </span>
                </div>

                {/* Priority */}
                <div className="flex gap-[25px] items-center text-[16px] lg:text-[20px]">
                  <span className="text-navy shrink-0">Priority:</span>
                  <PriorityBadge priority={currentTask.priority} />
                </div>

                {/* Creator */}
                {currentTask.creator_email && (
                  <div className="flex flex-col gap-1 text-[16px] lg:text-[20px]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-navy shrink-0">Creator:</span>
                      {currentTask.creator_type && (
                        <CreatorTypeBadge type={currentTask.creator_type} />
                      )}
                      <span className="text-black break-all min-w-0">
                        {currentTask.creator_email}
                      </span>
                    </div>
                    {currentTask.creator_type === "external" && (
                      <a
                        href={`mailto:${currentTask.creator_email}`}
                        className="flex items-center gap-[4px] text-[#42526e] hover:text-[#2a3647] transition-colors duration-100 self-start"
                      >
                        <svg
                          width="18"
                          height="16"
                          viewBox="0 0 24 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M22 0H2C.9 0 0 .9 0 2v16c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 4l-10 6L2 4V2l10 6 10-6v2z" />
                        </svg>
                        <span className="text-[16px]">E-mail</span>
                      </a>
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
      </div>
    </>
  );
}
