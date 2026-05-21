"use client";

import { useRouter } from "next/navigation";

function ArrowLeftIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 8L12 16L20 24"
        stroke="#2A3647"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center justify-center size-[37px] shrink-0 cursor-pointer hover:opacity-70 transition-opacity duration-100 border-0 bg-transparent"
      aria-label="Zurück"
    >
      <ArrowLeftIcon />
    </button>
  );
}
