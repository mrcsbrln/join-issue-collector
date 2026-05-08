interface ProgressBarProps {
  completed: number;
  total: number;
  className?: string;
}

export default function ProgressBar({
  completed,
  total,
  className = "",
}: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className={["flex items-center gap-2", className].join(" ")}>
      <div className="flex-1 h-2 bg-bg-app rounded-full overflow-hidden">
        <div
          className="h-full bg-blue rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={completed}
          aria-valuemin={0}
          aria-valuemax={total}
        />
      </div>
      <span className="text-xs text-navy whitespace-nowrap">
        {completed}/{total} Subtasks
      </span>
    </div>
  );
}
