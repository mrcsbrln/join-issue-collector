import { Priority } from "@/lib/types";

const configs: Record<
  Priority,
  { label: string; color: string; icon: React.ReactNode }
> = {
  urgent: {
    label: "Urgent",
    color: "#FF3D00",
    icon: (
      <svg width="18" height="14" viewBox="0 0 21 16" fill="none">
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
    ),
  },
  medium: {
    label: "Medium",
    color: "#FFA800",
    icon: (
      <svg width="18" height="7" viewBox="0 0 21 8" fill="none">
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
    ),
  },
  low: {
    label: "Low",
    color: "#7AE229",
    icon: (
      <svg width="18" height="14" viewBox="0 0 21 16" fill="none">
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
    ),
  },
};

export default function PriorityBadge({ priority }: { priority: Priority }) {
  const { label, color, icon } = configs[priority];
  return (
    <span className="flex items-center gap-2 text-[20px]" style={{ color }}>
      {label} {icon}
    </span>
  );
}
