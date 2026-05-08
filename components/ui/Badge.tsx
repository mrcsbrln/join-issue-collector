type Category = "Technical Task" | "User Story";
type Priority = "urgent" | "medium" | "low";

const categoryStyles: Record<Category, string> = {
  "Technical Task": "bg-category-technical text-white",
  "User Story": "bg-category-story text-white",
};

const priorityStyles: Record<Priority, string> = {
  urgent: "text-priority-urgent",
  medium: "text-priority-medium",
  low: "text-priority-low",
};

const priorityIcons: Record<Priority, string> = {
  urgent: "↑↑",
  medium: "↑",
  low: "↓",
};

const priorityLabels: Record<Priority, string> = {
  urgent: "Urgent",
  medium: "Medium",
  low: "Low",
};

interface CategoryBadgeProps {
  category: Category;
}

interface PriorityBadgeProps {
  priority: Priority;
  showLabel?: boolean;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className={[
        "inline-block px-3 py-1 rounded-full text-xs font-bold",
        categoryStyles[category],
      ].join(" ")}
    >
      {category}
    </span>
  );
}

export function PriorityBadge({
  priority,
  showLabel = true,
}: PriorityBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 font-semibold text-sm",
        priorityStyles[priority],
      ].join(" ")}
    >
      <span aria-hidden="true">{priorityIcons[priority]}</span>
      {showLabel ? priorityLabels[priority] : null}
    </span>
  );
}
