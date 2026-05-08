import { format, isToday, isTomorrow, isPast } from "date-fns";
import { de } from "date-fns/locale";

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return format(date, "dd/MM/yyyy");
}

export function getGreeting(name: string): string {
  const hour = new Date().getHours();
  if (hour < 12) return `Good morning, ${name}!`;
  if (hour < 18) return `Good afternoon, ${name}!`;
  return `Good evening, ${name}!`;
}

export function isOverdue(dateStr: string): boolean {
  return isPast(new Date(dateStr)) && !isToday(new Date(dateStr));
}

export function getDueDateLabel(dateStr: string): string {
  const date = new Date(dateStr);
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "d. MMMM yyyy", { locale: de });
}

export function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function randomAvatarColor(name: string): string {
  const colors = [
    "#FF7A00",
    "#FF5EB3",
    "#6E52FF",
    "#9327FF",
    "#00BEE8",
    "#1FD7C1",
    "#FF745E",
    "#FFA35E",
    "#FC71FF",
    "#FFC701",
    "#0038FF",
    "#C3FF2B",
    "#FFE62B",
    "#FF4646",
    "#FFBB2B",
  ];
  return colors[name.charCodeAt(0) % colors.length];
}

export function clsx(
  ...classes: (string | undefined | false | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}
