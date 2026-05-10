"use client";

import { Contact, TaskStatus } from "@/lib/types";
import AddTaskForm from "@/components/tasks/AddTaskForm";

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

interface AddTaskModalProps {
  contacts: Contact[];
  initialStatus: TaskStatus;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddTaskModal({
  contacts,
  initialStatus,
  onClose,
  onSuccess,
}: AddTaskModalProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-8 overflow-y-auto">
        <div className="bg-white rounded-[30px] shadow-[0_0_4px_rgba(0,0,0,0.1)] w-full max-w-[1092px] relative pl-[74px] pr-[40px] py-16">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-8 right-10 text-navy hover:text-blue transition-colors duration-100 cursor-pointer border-0 bg-transparent"
          >
            <CloseIcon />
          </button>
          <h1 className="text-[61px] font-bold leading-[1.2] text-black mb-12">
            Add Task
          </h1>
          <AddTaskForm
            contacts={contacts}
            initialStatus={initialStatus}
            onSuccess={onSuccess}
            onCancel={onClose}
          />
        </div>
      </div>
    </>
  );
}
