export function EnvelopeIcon() {
  return (
    <svg
      width="20"
      height="15"
      viewBox="0 0 20 15"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="0.75"
        y="0.75"
        width="18.5"
        height="13.5"
        rx="1.25"
        stroke="#A8A8A8"
        strokeWidth="1.5"
      />
      <path d="M0.75 3.5L10 8.5L19.25 3.5" stroke="#A8A8A8" strokeWidth="1.5" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg
      width="15"
      height="19"
      viewBox="0 0 15 19"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="0.75"
        y="7.75"
        width="13.5"
        height="10.5"
        rx="1.75"
        stroke="#A8A8A8"
        strokeWidth="1.5"
      />
      <path
        d="M3.5 7.5V5C3.5 2.79 5.29 1 7.5 1C9.71 1 11.5 2.79 11.5 5V7.5"
        stroke="#A8A8A8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PersonIcon() {
  return (
    <svg
      width="16"
      height="19"
      viewBox="0 0 16 19"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="5.5" r="4.25" stroke="#A8A8A8" strokeWidth="1.5" />
      <path
        d="M0.75 18C0.75 14.27 4.02 11.25 8 11.25C11.98 11.25 15.25 14.27 15.25 18"
        stroke="#A8A8A8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SummaryIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="0.75"
        y="0.75"
        width="6.5"
        height="6.5"
        rx="1.25"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="0.75"
        y="10.75"
        width="6.5"
        height="6.5"
        rx="1.25"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="10.75"
        y="0.75"
        width="6.5"
        height="6.5"
        rx="1.25"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="10.75"
        y="10.75"
        width="6.5"
        height="6.5"
        rx="1.25"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function BoardIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="0.75"
        y="0.75"
        width="4.5"
        height="16.5"
        rx="1.25"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="6.75"
        y="0.75"
        width="4.5"
        height="10.5"
        rx="1.25"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="12.75"
        y="0.75"
        width="4.5"
        height="13.5"
        rx="1.25"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function AddTaskIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 14L6 10L10 13L15 7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 2H16M16 2V5M16 2L12 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ContactsIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="5" r="3.25" stroke={color} strokeWidth="1.5" />
      <path
        d="M0.75 17C0.75 13.27 4.02 10.25 8 10.25C11.98 10.25 15.25 13.27 15.25 17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 7C15.66 7 17 5.66 17 4C17 2.34 15.66 1 14 1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17 17C17 14.24 15.24 11.9 12.75 11.1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PrivacyPolicyIcon({
  color = "currentColor",
}: {
  color?: string;
}) {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 1L1 4V9C1 12.87 4.13 16.5 8 17C11.87 16.5 15 12.87 15 9V4L8 1Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5 9L7 11L11 7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LegalNoticeIcon({
  color = "currentColor",
}: {
  color?: string;
}) {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="0.75"
        y="0.75"
        width="12.5"
        height="16.5"
        rx="1.25"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M3.5 5.5H10.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3.5 9H10.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3.5 12.5H7.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HelpIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="8.25" stroke={color} strokeWidth="1.5" />
      <path
        d="M6.5 6.5C6.5 5.12 7.62 4 9 4C10.38 4 11.5 5.12 11.5 6.5C11.5 7.88 10.38 9 9 9V10.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="9" cy="13" r="0.75" fill={color} />
    </svg>
  );
}

export function ArrowLeftIcon() {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 15L1 8L8 1"
        stroke="#29ABE2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="1"
        y1="8"
        x2="19"
        y2="8"
        stroke="#29ABE2"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
