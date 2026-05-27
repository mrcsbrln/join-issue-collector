"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Contact,
  Priority,
  Category,
  TaskWithRelations,
  Subtask,
} from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import PrioritySelector from "@/components/tasks/PrioritySelector";
import AssignedToDropdown from "@/components/tasks/AssignedToDropdown";
import SubtaskInput from "@/components/tasks/SubtaskInput";

interface FormValues {
  title: string;
  description: string;
  dueDate: string;
}

function CalendarIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#2A3647"
      aria-hidden="true"
    >
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
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
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CancelIcon() {
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

function CategoryDropdown({
  value,
  onChange,
  error,
}: {
  value: Category | null;
  onChange: (c: Category) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const options: Category[] = ["Technical Task", "User Story"];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex flex-col gap-1" ref={ref}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`flex items-center justify-between bg-white border px-4 py-[12px] w-full cursor-pointer text-left transition-colors duration-100 ${open ? "rounded-t-[10px] border-b-0" : "rounded-[10px]"} ${error ? "border-error" : "border-border"}`}
        >
          <span className={`text-[16px] ${value ? "text-navy" : "text-muted"}`}>
            {value ?? "Select task category"}
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#2A3647"
            className={`transition-transform duration-100 shrink-0 ${open ? "rotate-180" : ""}`}
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
        {open && (
          <div
            className={`absolute left-0 right-0 z-20 bg-white border border-t-0 rounded-b-[10px] overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.08)] ${error ? "border-error" : "border-border"}`}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-[12px] text-[16px] text-navy cursor-pointer border-0 hover:bg-bg-app transition-colors duration-100"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-error text-sm">{error}</p>}
    </div>
  );
}

interface EditTaskFormProps {
  task: TaskWithRelations;
  contacts: Contact[];
  onCancel: () => void;
  onSuccess: (updated: TaskWithRelations) => void;
}

export default function EditTaskForm({
  task,
  contacts,
  onCancel,
  onSuccess,
}: EditTaskFormProps) {
  const [priority, setPriority] = useState<Priority>(task.priority);
  const [assignedIds, setAssignedIds] = useState<string[]>(
    task.contacts.map((c) => c.id),
  );
  const [category, setCategory] = useState<Category | null>(task.category);
  const [categoryError, setCategoryError] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingSubtasks, setExistingSubtasks] = useState<Subtask[]>(
    task.subtasks,
  );
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const [newSubtasks, setNewSubtasks] = useState<string[]>([]);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: task.title,
      description: task.description ?? "",
      dueDate: task.due_date,
    },
  });

  const { ref: dueDateRef, ...dueDateRest } = register("dueDate", {
    validate: (v) => v !== "" || "This field is required",
  });

  function removeExisting(id: string) {
    setExistingSubtasks((prev) => prev.filter((s) => s.id !== id));
    setRemovedIds((prev) => [...prev, id]);
  }

  async function onSubmit(values: FormValues) {
    if (!category) {
      setCategoryError("This field is required");
      return;
    }
    setCategoryError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: taskErr } = await supabase
        .from("tasks")
        .update({
          title: values.title.trim(),
          description: values.description.trim() || null,
          category,
          priority,
          due_date: values.dueDate,
        })
        .eq("id", task.id);
      if (taskErr) throw taskErr;

      const originalIds = new Set(task.contacts.map((c) => c.id));
      const newIds = new Set(assignedIds);
      const toDelete = [...originalIds].filter((id) => !newIds.has(id));
      const toInsert = [...newIds].filter((id) => !originalIds.has(id));

      if (toDelete.length > 0) {
        const { error: delErr } = await supabase
          .from("task_contacts")
          .delete()
          .in("contact_id", toDelete)
          .eq("task_id", task.id);
        if (delErr) throw delErr;
      }
      if (toInsert.length > 0) {
        const { error: insErr } = await supabase
          .from("task_contacts")
          .insert(
            toInsert.map((contactId) => ({
              task_id: task.id,
              contact_id: contactId,
            })),
          );
        if (insErr) throw insErr;
      }

      if (removedIds.length > 0) {
        await supabase.from("subtasks").delete().in("id", removedIds);
      }
      let insertedSubtasks: Subtask[] = [];
      if (newSubtasks.length > 0) {
        const { data } = await supabase
          .from("subtasks")
          .insert(
            newSubtasks.map((title, i) => ({
              task_id: task.id,
              title,
              completed: false,
              position: existingSubtasks.length + i,
            })),
          )
          .select();
        insertedSubtasks = data ?? [];
      }

      const updated: TaskWithRelations = {
        ...task,
        title: values.title.trim(),
        description: values.description.trim() || null,
        category,
        priority,
        due_date: values.dueDate,
        contacts: contacts.filter((c) => assignedIds.includes(c.id)),
        subtasks: [...existingSubtasks, ...insertedSubtasks],
      };
      toast.success("Task updated");
      onSuccess(updated);
    } catch {
      toast.error("Could not update task. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start">
        {/* Left column */}
        <div className="flex flex-col gap-4 lg:gap-6 w-full lg:flex-1 lg:min-w-0 lg:max-w-[440px]">
          <div className="flex flex-col gap-2">
            <label className="text-[16px] lg:text-[20px] text-navy">
              Title<span className="text-[#FF8190]">*</span>
            </label>
            <div
              className={`bg-white border rounded-[10px] px-4 py-3 focus-within:border-blue transition-colors duration-100 ${errors.title ? "border-error" : "border-border"}`}
            >
              <input
                {...register("title", {
                  validate: (v) => v.trim() !== "" || "This field is required",
                })}
                placeholder="Enter a title"
                className="w-full text-[16px] lg:text-[20px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
              />
            </div>
            {errors.title && (
              <p className="text-error text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] lg:text-[20px] text-navy">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Enter a Description"
              rows={4}
              className="w-full bg-white border border-border rounded-[10px] px-4 py-3 text-[16px] lg:text-[20px] text-navy placeholder:text-muted outline-none resize-none focus:border-blue transition-colors duration-100"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] lg:text-[20px] text-navy">
              Due date<span className="text-[#FF8190]">*</span>
            </label>
            <div
              className={`relative flex items-center justify-between bg-white border rounded-[10px] px-[21px] py-[8px] cursor-pointer transition-colors duration-100 ${errors.dueDate ? "border-error" : "border-border hover:border-blue focus-within:border-blue"}`}
            >
              <span
                className={`text-[16px] ${watch("dueDate") ? "text-navy" : "text-muted"}`}
              >
                {watch("dueDate")
                  ? watch("dueDate").split("-").reverse().join("/")
                  : "dd/mm/yyyy"}
              </span>
              <CalendarIcon />
              <input
                {...dueDateRest}
                ref={(e) => {
                  dueDateRef(e);
                  dateInputRef.current = e;
                }}
                type="date"
                onClick={() => dateInputRef.current?.showPicker?.()}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            {errors.dueDate && (
              <p className="text-error text-[16px]">{errors.dueDate.message}</p>
            )}
          </div>
        </div>

        <div className="hidden lg:block w-px self-stretch bg-border shrink-0" />

        {/* Right column */}
        <div className="flex flex-col gap-4 lg:gap-6 w-full lg:flex-1 lg:min-w-0 lg:max-w-[440px]">
          <div className="flex flex-col gap-2">
            <label className="text-[16px] lg:text-[20px] text-navy">
              Priority
            </label>
            <PrioritySelector value={priority} onChange={setPriority} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] lg:text-[20px] text-navy">
              Assigned to
            </label>
            <AssignedToDropdown
              contacts={contacts}
              value={assignedIds}
              onChange={setAssignedIds}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] lg:text-[20px] text-navy">
              Category<span className="text-[#FF8190]">*</span>
            </label>
            <CategoryDropdown
              value={category}
              onChange={(c) => {
                setCategory(c);
                setCategoryError("");
              }}
              error={categoryError}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] lg:text-[20px] text-navy">
              Subtasks
            </label>
            {existingSubtasks.length > 0 && (
              <div className="flex flex-col gap-1 mb-1">
                {existingSubtasks.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between h-[40px] px-4 rounded-[10px] hover:bg-bg-app transition-colors duration-100"
                  >
                    <span className="text-[16px] text-navy flex-1">
                      · {s.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeExisting(s.id)}
                      className="cursor-pointer text-navy hover:text-blue transition-colors duration-100"
                    >
                      <svg
                        width="20"
                        height="20"
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
                    </button>
                  </div>
                ))}
              </div>
            )}
            <SubtaskInput subtasks={newSubtasks} onChange={setNewSubtasks} />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mt-8">
        <div className="hidden lg:block lg:flex-1 lg:max-w-[440px]" />
        <div className="hidden lg:block w-px shrink-0" />
        <div className="flex justify-end gap-4 lg:flex-1 lg:max-w-[440px]">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-1 px-3 py-2 lg:p-[16px] text-[16px] lg:text-[20px] text-navy bg-white border border-navy rounded-[10px] cursor-pointer hover:border-blue hover:text-blue transition-all duration-100"
          >
            Cancel <CancelIcon />
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-1 px-3 py-2 lg:p-[16px] text-[16px] lg:text-[21px] text-white font-bold bg-navy rounded-[10px] cursor-pointer border-0 hover:bg-blue transition-all duration-100 disabled:opacity-50"
          >
            {loading ? "Saving…" : "Save"} <CheckIcon />
          </button>
        </div>
      </div>
    </form>
  );
}
