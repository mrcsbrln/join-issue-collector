"use client";

import { Draggable } from "@hello-pangea/dnd";
import { TaskWithRelations, Priority } from "@/lib/types";
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

interface TaskCardProps {
  task: TaskWithRelations;
  index: number;
  onSelect: () => void;
}

export default function TaskCard({ task, index, onSelect }: TaskCardProps) {
  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onSelect}
          className={`bg-white rounded-[24px] p-4 flex flex-col gap-6 cursor-pointer select-none transition-shadow duration-100 ${snapshot.isDragging ? "shadow-[0_8px_16px_rgba(0,0,0,0.15)]" : "shadow-[0_0_5px_rgba(0,0,0,0.08)]"}`}
        >
          <CategoryBadge category={task.category} />

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
