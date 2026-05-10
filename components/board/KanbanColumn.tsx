"use client";

import { Droppable } from "@hello-pangea/dnd";
import { TaskWithRelations, TaskStatus } from "@/lib/types";
import TaskCard from "./TaskCard";

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1V13M1 7H13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="bg-[#E7E7E7] border border-dashed border-[#A8A8A8] rounded-[10px] h-12 flex items-center justify-center">
      <span className="text-[16px] text-muted">No tasks {label}</span>
    </div>
  );
}

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: TaskWithRelations[];
  onAdd: () => void;
}

export default function KanbanColumn({
  status,
  title,
  tasks,
  onAdd,
}: KanbanColumnProps) {
  const showPlusButton = status !== "done";

  return (
    <div className="flex flex-col gap-4 min-w-0">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-bold text-[#42526E]">{title}</h2>
        {showPlusButton && (
          <button
            type="button"
            onClick={onAdd}
            className="size-6 flex items-center justify-center border-2 border-navy rounded-[8px] hover:border-blue hover:text-blue transition-colors duration-100 cursor-pointer bg-transparent"
          >
            <PlusIcon />
          </button>
        )}
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-4 min-h-12 rounded-[10px] transition-colors duration-100 ${snapshot.isDraggingOver ? "bg-blue/5" : ""}`}
          >
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <EmptyState label={title} />
            )}
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
