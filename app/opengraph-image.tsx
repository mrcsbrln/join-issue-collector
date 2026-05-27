import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Join – Kanban Project Management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#2A3647",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "64px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Logo */}
      <svg
        width="140"
        height="170"
        viewBox="0 0 101 122"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M71.6725 0H49.5146V25.4923H71.6725V0Z" fill="white" />
        <path
          d="M49.5142 46.2251H71.6721V82.1779C71.7733 90.8292 69.3112 99.3153 64.5986 106.557C59.9455 113.594 50.963 121.966 34.3446 121.966C16.2434 121.966 5.69286 113.406 0 108.715L13.9765 91.4743C19.533 96.0112 24.885 99.7435 34.4299 99.7435C41.6567 99.7435 44.5372 96.7988 46.2247 94.2307C48.5186 90.6637 49.7052 86.4923 49.6335 82.2464L49.5142 46.2251Z"
          fill="white"
        />
        <path
          d="M38.2135 30.1318H16.0557V52.3884H38.2135V30.1318Z"
          fill="#29ABE2"
        />
      </svg>

      {/* Text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontSize: "120px",
            fontWeight: 700,
            color: "white",
            lineHeight: 1,
            letterSpacing: "-2px",
          }}
        >
          Join
        </span>
        <span
          style={{
            fontSize: "32px",
            color: "#29ABE2",
            fontWeight: 500,
            letterSpacing: "1px",
          }}
        >
          Kanban Project Management
        </span>
      </div>
    </div>,
    size,
  );
}
