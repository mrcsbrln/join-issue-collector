const AVATAR_COLORS = [
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

const sizeMap = { sm: 32, md: 42, header: 56 };
const fontSizeMap = { sm: "text-xs", md: "text-sm", header: "text-[16px]" };
const borderMap = { sm: 2, md: 2, header: 3 };

interface AvatarProps {
  name: string;
  color?: string;
  borderColor?: string;
  size?: "sm" | "md" | "header";
  className?: string;
}

export function getAvatarColor(name: string): string {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

export function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "G";
  const parts = trimmed.split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Avatar({
  name,
  color,
  borderColor,
  size = "md",
  className = "",
}: AvatarProps) {
  const ringColor = color ?? getAvatarColor(name);
  const px = sizeMap[size];
  const borderPx = borderMap[size];

  return (
    <div
      className={[
        "inline-flex items-center justify-center rounded-full font-bold bg-white select-none shrink-0",
        fontSizeMap[size],
        className,
      ].join(" ")}
      style={{
        width: px,
        height: px,
        border: `${borderPx}px solid ${borderColor ?? ringColor}`,
        color: ringColor,
      }}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
}
