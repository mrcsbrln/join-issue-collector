"use client";

import { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  TaskWithRelations,
  TaskStatus,
  Contact,
  COLUMN_ORDER,
} from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import KanbanColumn from "./KanbanColumn";
import AddTaskModal from "./AddTaskModal";

const COLUMN_TITLES: Record<TaskStatus, string> = {
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

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const filtered = search.trim()
    ? tasks.filter((t) =>
        t.title.toLowerCase().includes(search.trim().toLowerCase()),
      )
    : tasks;

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const newStatus = destination.droppableId as TaskStatus;
    setTasks((prev) =>
      prev.map((t) => (t.id === draggableId ? { ...t, status: newStatus } : t)),
    );
    const supabase = createClient();
    await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", draggableId);
  }

  function handleSuccess() {
    setModalStatus(null);
    setShowSuccess(true);
    router.refresh();
    setTimeout(() => setShowSuccess(false), 3000);
  }

  return (
    <div className="pl-14 pr-8 pt-[70px]">
      <div className="flex items-center justify-between mb-12">
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
          <Link
            href="/add-task"
            className="flex items-center gap-2 px-4 py-2 bg-navy text-white text-[20px] font-bold rounded-[10px] hover:bg-blue transition-colors duration-100"
          >
            Add task <AddIcon />
          </Link>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-4 gap-6">
          {COLUMN_ORDER.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              title={COLUMN_TITLES[status]}
              tasks={filtered.filter((t) => t.status === status)}
              onAdd={() => setModalStatus(status)}
            />
          ))}
        </div>
      </DragDropContext>

      {modalStatus && (
        <AddTaskModal
          contacts={contacts}
          initialStatus={modalStatus}
          onClose={() => setModalStatus(null)}
          onSuccess={handleSuccess}
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
