"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import JoinLogo from "@/components/ui/JoinLogo";
import {
  SummaryIcon,
  BoardIcon,
  ContactsIcon,
  AddTaskIcon,
} from "@/components/ui/icons";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const mainNav: NavItem[] = [
  { href: "/summary", label: "Summary", icon: <SummaryIcon /> },
  { href: "/add-task", label: "Add Task", icon: <AddTaskIcon /> },
  { href: "/board", label: "Board", icon: <BoardIcon /> },
  { href: "/contacts", label: "Contacts", icon: <ContactsIcon /> },
];

const bottomNav = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/legal-notice", label: "Legal notice" },
];

function NavLink({ href, label, icon }: NavItem) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-2 w-58 h-11.5 px-14 transition-colors duration-100",
        "text-base font-normal",
        isActive
          ? "bg-[#091931] text-white"
          : "rounded-lg text-[#cdcdcd] hover:bg-[#2a3d59]",
      ].join(" ")}
    >
      <span className="shrink-0 size-7.5 flex items-center justify-center">
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-full w-58 bg-navy flex-col z-40">
      <div className="px-14 pt-17 pb-14">
        <JoinLogo width={100} variant="light" />
      </div>

      <nav className="flex flex-col gap-3.75 flex-1">
        {mainNav.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>

      <nav className="flex flex-col gap-1 pl-13 pb-10">
        {bottomNav.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="p-2 text-base font-normal text-muted hover:text-white transition-colors duration-100"
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
