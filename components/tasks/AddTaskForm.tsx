"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Contact, Priority, Category, TaskStatus } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import PrioritySelector from "./PrioritySelector";
import AssignedToDropdown from "./AssignedToDropdown";
import SubtaskInput from "./SubtaskInput";

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
  const options: Category[] = ["Technical Task", "User Story"];

  return (
    <div className="flex flex-col gap-1 relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between bg-white border rounded-[10px] px-4 py-3 w-full cursor-pointer text-left focus:outline-none transition-colors duration-100 ${error ? "border-error" : "border-border"}`}
      >
        <span className={`text-[20px] ${value ? "text-navy" : "text-muted"}`}>
          {value ?? "Select task category"}
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9L12 15L18 9"
            stroke="#2A3647"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 z-10 bg-white border border-border rounded-[10px] shadow-[0_0_4px_rgba(0,0,0,0.1)] mt-1 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 text-[16px] cursor-pointer border-0 transition-colors duration-100 ${value === opt ? "bg-navy text-white" : "bg-transparent text-navy hover:bg-bg-app"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
      {error && <p className="text-error text-sm">{error}</p>}
    </div>
  );
}

async function insertTask(
  values: FormValues,
  priority: Priority,
  category: Category,
  assignedIds: string[],
  subtasks: string[],
  status: TaskStatus = "todo",
) {
  const supabase = createClient();
  const { data: task, error } = await supabase
    .from("tasks")
    .insert({
      title: values.title.trim(),
      description: values.description.trim() || null,
      category,
      priority,
      due_date: values.dueDate,
      status,
    })
    .select("id")
    .single();
  if (error || !task) throw error ?? new Error("Insert failed");

  if (assignedIds.length > 0) {
    await supabase.from("task_contacts").insert(
      assignedIds.map((contactId) => ({
        task_id: task.id,
        contact_id: contactId,
      })),
    );
  }
  if (subtasks.length > 0) {
    await supabase.from("subtasks").insert(
      subtasks.map((title, position) => ({
        task_id: task.id,
        title,
        completed: false,
        position,
      })),
    );
  }
}

interface AddTaskFormProps {
  contacts: Contact[];
  onSuccess?: () => void;
  onCancel?: () => void;
  initialStatus?: TaskStatus;
}

export default function AddTaskForm({
  contacts,
  onSuccess,
  onCancel,
  initialStatus = "todo",
}: AddTaskFormProps) {
  const [priority, setPriority] = useState<Priority>("medium");
  const [assignedIds, setAssignedIds] = useState<string[]>([]);
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [categoryError, setCategoryError] = useState("");
  const [loading, setLoading] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { title: "", description: "", dueDate: "" },
  });

  const { ref: dueDateRef, ...dueDateRest } = register("dueDate", {
    validate: (v) => v !== "" || "This field is required",
  });

  function clearForm() {
    reset();
    setPriority("medium");
    setAssignedIds([]);
    setSubtasks([]);
    setCategory(null);
    setCategoryError("");
  }

  async function onSubmit(values: FormValues) {
    if (!category) {
      setCategoryError("This field is required");
      return;
    }
    setCategoryError("");
    setLoading(true);
    try {
      await insertTask(
        values,
        priority,
        category,
        assignedIds,
        subtasks,
        initialStatus,
      );
      if (onSuccess) {
        onSuccess();
      } else {
        toast.success("Task created!");
      }
      clearForm();
    } catch {
      toast.error("Could not create task. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex gap-12 items-start">
        {/* Left column */}
        <div className="flex flex-col gap-6 w-[440px] shrink-0">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] text-navy">
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
                className="w-full text-[20px] text-navy placeholder:text-muted bg-transparent outline-none border-none"
              />
            </div>
            {errors.title && (
              <p className="text-error text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] text-navy">Description</label>
            <textarea
              {...register("description")}
              placeholder="Enter a Description"
              rows={4}
              className="w-full bg-white border border-border rounded-[10px] px-4 py-3 text-[20px] text-navy placeholder:text-muted outline-none resize-none focus:border-blue transition-colors duration-100"
            />
          </div>

          {/* Due date */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] text-navy">
              Due date<span className="text-[#FF8190]">*</span>
            </label>
            <div
              className={`relative flex items-center justify-between bg-white border rounded-[10px] px-4 py-3 cursor-pointer transition-colors duration-100 ${errors.dueDate ? "border-error" : "border-border hover:border-blue"}`}
            >
              <span
                className={`text-[20px] ${watch("dueDate") ? "text-navy" : "text-muted"}`}
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
              <p className="text-error text-sm">{errors.dueDate.message}</p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="w-px self-stretch bg-border shrink-0" />

        {/* Right column */}
        <div className="flex flex-col gap-6 w-[440px] shrink-0">
          {/* Priority */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] text-navy">Priority</label>
            <PrioritySelector value={priority} onChange={setPriority} />
          </div>

          {/* Assigned to */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] text-navy">Assigned to</label>
            <AssignedToDropdown
              contacts={contacts}
              value={assignedIds}
              onChange={setAssignedIds}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] text-navy">
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

          {/* Subtasks */}
          <div className="flex flex-col gap-2">
            <label className="text-[20px] text-navy">Subtasks</label>
            <SubtaskInput subtasks={subtasks} onChange={setSubtasks} />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-[60px]">
        <button
          type="button"
          onClick={onCancel ?? clearForm}
          className="flex items-center gap-1 px-6 py-4 text-[20px] text-navy bg-bg-app border-2 border-navy rounded-[10px] cursor-pointer hover:border-blue hover:text-blue hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-all duration-100"
        >
          {onCancel ? "Cancel" : "Clear"} <CancelIcon />
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-1 px-6 py-4 text-[20px] text-white font-bold bg-navy rounded-[10px] cursor-pointer border-0 hover:bg-blue hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-all duration-100 disabled:opacity-50"
        >
          {loading ? "Creating…" : "Create Task"} <CheckIcon />
        </button>
      </div>
    </form>
  );
}
