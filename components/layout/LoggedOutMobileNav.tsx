"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function LoginIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
    </svg>
  );
}

const links = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/legal-notice", label: "Legal Notice" },
];

export default function LoggedOutMobileNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-navy z-40 flex items-center justify-around px-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
      <Link
        href="/login"
        className="flex flex-col items-center gap-1 py-2 px-3 rounded-[16px] text-[#cdcdcd] hover:text-white transition-colors duration-100"
      >
        <LoginIcon />
        <span className="text-[12px]">Log in</span>
      </Link>
      {links.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center justify-center h-[76px] px-3 rounded-[16px] text-[16px] leading-[1.2] text-white transition-colors duration-100 text-center ${active ? "bg-[#091931]" : ""}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
