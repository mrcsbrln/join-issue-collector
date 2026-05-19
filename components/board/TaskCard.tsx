"use client";

import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  TaskWithRelations,
  Priority,
  TaskStatus,
  COLUMN_ORDER,
  COLUMN_LABELS,
} from "@/lib/types";
import Avatar from "@/components/ui/Avatar";
import ProgressBar from "@/components/ui/ProgressBar";

function CategoryBadge({ category }: { category: string }) {
  const isTechnical = category === "Technical Task";
  return (
    <span
      className={`text-white text-[16px] px-4 py-1 rounded-[8px] ${isTechnical ? "bg-[#1FD7C1]" : "bg-[#0038FF]"}`}
    >
      {category}
    </span>
  );
}

function PriorityIcon({ priority }: { priority: Priority }) {
  if (priority === "urgent") {
    return (
      <svg width="21" height="16" viewBox="0 0 21 16" fill="none">
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
    );
  }
  if (priority === "medium") {
    return (
      <svg width="21" height="8" viewBox="0 0 21 8" fill="none">
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
    );
  }
  return (
    <svg width="21" height="16" viewBox="0 0 21 16" fill="none">
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
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface TaskCardProps {
  task: TaskWithRelations;
  index: number;
  onSelect: () => void;
  onMove: (taskId: string, newStatus: TaskStatus) => void;
}

export default function TaskCard({
  task,
  index,
  onSelect,
  onMove,
}: TaskCardProps) {
  const [showMoveMenu, setShowMoveMenu] = useState(false);
  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;
  const moveOptions = COLUMN_ORDER.filter((s) => s !== task.status);

  function toggleMoveMenu(e: React.MouseEvent) {
    e.stopPropagation();
    setShowMoveMenu((p) => !p);
  }

  function handleMoveSelect(e: React.MouseEvent, newStatus: TaskStatus) {
    e.stopPropagation();
    onMove(task.id, newStatus);
    setShowMoveMenu(false);
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onSelect}
          className={`bg-white rounded-[24px] p-4 flex flex-col gap-6 cursor-pointer select-none transition-all duration-100 ${snapshot.isDragging ? "shadow-[0_8px_16px_rgba(0,0,0,0.15)] rotate-[5deg]" : "shadow-[0_0_5px_rgba(0,0,0,0.08)] hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.08)]"}`}
        >
          <div className="flex items-start justify-between gap-2">
            <CategoryBadge category={task.category} />
            <div className="relative lg:hidden shrink-0">
              <button
                type="button"
                onClick={toggleMoveMenu}
                className="flex items-center justify-center size-[28px] text-navy hover:text-blue transition-colors duration-100 cursor-pointer border-0 bg-transparent"
                aria-label="Move task"
              >
                <ChevronRightIcon />
              </button>
              {showMoveMenu && (
                <>
                  <div
                    className="fixed inset-0 z-[25]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMoveMenu(false);
                    }}
                  />
                  <div className="absolute top-8 right-0 z-[30] bg-white rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] py-1 min-w-[160px]">
                    {moveOptions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={(e) => handleMoveSelect(e, s)}
                        className="w-full text-left px-4 py-2 text-[14px] text-navy hover:bg-bg-app transition-colors duration-100 cursor-pointer border-0 bg-transparent"
                      >
                        {COLUMN_LABELS[s]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-bold text-[16px] text-navy leading-[1.2]">
              {task.title}
            </p>
            {task.description && (
              <p className="text-[16px] text-muted leading-[1.2] line-clamp-2">
                {task.description}
              </p>
            )}
          </div>

          {task.subtasks.length > 0 && (
            <ProgressBar
              completed={completedSubtasks}
              total={task.subtasks.length}
            />
          )}

          <div className="flex items-center justify-between">
            <div className="flex">
              {task.contacts.map((contact, i) => (
                <div
                  key={contact.id}
                  className="rounded-full ring-2 ring-white"
                  style={{ marginLeft: i === 0 ? 0 : -8 }}
                >
                  <Avatar
                    name={contact.name}
                    color={contact.color}
                    size="sm"
                    filled
                  />
                </div>
              ))}
            </div>
            <PriorityIcon priority={task.priority} />
          </div>
        </div>
      )}
    </Draggable>
  );
}
