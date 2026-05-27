"use client";

import { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  TaskWithRelations,
  TaskStatus,
  Contact,
  COLUMN_ORDER,
} from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import KanbanColumn from "./KanbanColumn";
import AddTaskModal from "./AddTaskModal";
import TaskDetailModal from "./TaskDetailModal";

const COLUMN_TITLES: Record<TaskStatus, string> = {
  triage: "Triage",
  todo: "To do",
  "in-progress": "In progress",
  "awaiting-feedback": "Await feedback",
  done: "Done",
};

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 21L16.5 16.5M19 11A8 8 0 1 1 3 11a8 8 0 0 1 16 0Z"
        stroke="#A8A8A8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AddIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5V19M5 12H19"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BoardIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="white"
      aria-hidden="true"
    >
      <rect x="1" y="4" width="7" height="17" rx="2" />
      <rect x="11" y="4" width="7" height="12" rx="2" />
      <rect x="21" y="4" width="8" height="22" rx="2" />
    </svg>
  );
}

interface KanbanBoardProps {
  initialTasks: TaskWithRelations[];
  contacts: Contact[];
}

export default function KanbanBoard({
  initialTasks,
  contacts,
}: KanbanBoardProps) {
  const router = useRouter();
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [modalStatus, setModalStatus] = useState<TaskStatus | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskWithRelations | null>(
    null,
  );

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const filtered = search.trim()
    ? tasks.filter((t) =>
        t.title.toLowerCase().includes(search.trim().toLowerCase()),
      )
    : tasks;

  function notifyStatusChange(task: TaskWithRelations, newStatus: TaskStatus) {
    if (!task.creator_email) return;
    fetch("/api/notify-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskId: task.id,
        taskTitle: task.title,
        newStatus,
        creatorEmail: task.creator_email,
      }),
    });
  }

  async function moveTask(taskId: string, newStatus: TaskStatus) {
    const task = tasks.find((t) => t.id === taskId);
    const originalStatus = task?.status;
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );
    const supabase = createClient();
    const { error } = await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", taskId);
    if (error) {
      if (originalStatus) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskId ? { ...t, status: originalStatus } : t,
          ),
        );
      }
      toast.error("Could not move task.");
      return;
    }
    if (task) notifyStatusChange(task, newStatus);
  }

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    await moveTask(
      result.draggableId,
      result.destination.droppableId as TaskStatus,
    );
  }

  async function handleDeleteTask(taskId: string) {
    const supabase = createClient();
    await supabase.from("tasks").delete().eq("id", taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setSelectedTask(null);
    router.refresh();
  }

  function handleUpdateTask(updated: TaskWithRelations) {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setSelectedTask(updated);
    router.refresh();
  }

  function handleSubtaskToggle(subtaskId: string, completed: boolean) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id !== selectedTask?.id
          ? t
          : {
              ...t,
              subtasks: t.subtasks.map((s) =>
                s.id === subtaskId ? { ...s, completed } : s,
              ),
            },
      ),
    );
  }

  function handleSuccess() {
    setModalStatus(null);
    setShowSuccess(true);
    router.refresh();
    setTimeout(() => setShowSuccess(false), 3000);
  }

  return (
    <div className="lg:pl-14 lg:pr-8 lg:pt-[3vh]">
      {/* Mobile header: title + icon add button */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <h1 className="text-[47px] font-bold leading-[1.2] text-black">
          Board
        </h1>
        <button
          type="button"
          onClick={() => router.push("/add-task")}
          className="size-[50px] flex items-center justify-center bg-navy rounded-[12px] hover:bg-blue transition-colors duration-100 border-0 cursor-pointer"
          aria-label="Add task"
        >
          <AddIcon />
        </button>
      </div>

      {/* Mobile search */}
      <div className="lg:hidden flex items-center gap-4 bg-white border border-muted rounded-[10px] px-4 py-2 mb-4 focus-within:border-navy transition-colors duration-100">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find Task"
          className="flex-1 text-[16px] text-navy placeholder:text-muted bg-transparent outline-none"
        />
        <SearchIcon />
      </div>

      {/* Desktop header: title + search + text button */}
      <div className="hidden lg:flex items-center justify-between mb-12">
        <h1 className="text-[61px] font-bold leading-[1.2] text-black">
          Board
        </h1>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 bg-white border border-muted rounded-[10px] px-4 py-2 w-[312px] focus-within:border-navy transition-colors duration-100">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find Task"
              className="flex-1 text-[20px] text-navy placeholder:text-muted bg-transparent outline-none"
            />
            <SearchIcon />
          </div>
          <button
            type="button"
            onClick={() => setModalStatus("triage")}
            className="flex items-center gap-2 px-4 py-2 bg-navy text-white text-[20px] font-bold rounded-[10px] hover:bg-blue transition-colors duration-100 border-0 cursor-pointer"
          >
            Add task <AddIcon />
          </button>
        </div>
      </div>

      <div className="lg:overflow-x-auto lg:pb-2">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 gap-4 lg:flex lg:flex-row lg:gap-6">
            {COLUMN_ORDER.map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                title={COLUMN_TITLES[status]}
                tasks={filtered.filter((t) => t.status === status)}
                onAdd={() => {
                  if (window.innerWidth < 1024) {
                    router.push("/add-task");
                  } else {
                    setModalStatus(status);
                  }
                }}
                onTaskSelect={setSelectedTask}
                onMove={moveTask}
              />
            ))}
          </div>
        </DragDropContext>
      </div>

      {modalStatus && (
        <AddTaskModal
          contacts={contacts}
          initialStatus={modalStatus}
          onClose={() => setModalStatus(null)}
          onSuccess={handleSuccess}
        />
      )}

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          contacts={contacts}
          onClose={() => setSelectedTask(null)}
          onDelete={() => handleDeleteTask(selectedTask.id)}
          onUpdate={handleUpdateTask}
          onSubtaskToggle={handleSubtaskToggle}
        />
      )}

      <div
        className={`fixed bottom-8 right-8 z-[70] transition-all duration-300 ${showSuccess ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <div className="bg-navy rounded-[20px] h-[74px] w-[326px] flex items-center justify-center gap-3 shadow-[0_0_2px_rgba(0,0,0,0.15)]">
          <span className="text-white text-[20px]">Task added to board</span>
          <BoardIcon />
        </div>
      </div>
    </div>
  );
}
