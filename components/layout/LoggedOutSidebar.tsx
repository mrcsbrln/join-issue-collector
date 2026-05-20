"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import JoinLogo from "@/components/ui/JoinLogo";

function LoginIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
    </svg>
  );
}

const bottomNav = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/legal-notice", label: "Legal notice" },
];

export default function LoggedOutSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex fixed top-0 left-0 h-full w-58 bg-navy flex-col z-40">
      <div className="px-14 pt-17 pb-14">
        <JoinLogo width={100} variant="light" />
      </div>

      <div className="flex-1">
        <Link
          href="/login"
          className="flex items-center gap-2 w-full h-11.5 px-14 text-base font-normal text-[#cdcdcd] hover:bg-[#2a3d59] rounded-lg transition-colors duration-100"
        >
          <span className="shrink-0 size-7.5 flex items-center justify-center text-[#cdcdcd]">
            <LoginIcon />
          </span>
          <span>Log In</span>
        </Link>
      </div>

      <nav className="flex flex-col pb-10">
        {bottomNav.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={[
              "px-15 py-2 text-base font-normal transition-colors duration-100",
              pathname === href
                ? "bg-[#091931] text-muted"
                : "text-muted hover:text-white",
            ].join(" ")}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
