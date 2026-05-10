"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SummaryIcon,
  AddTaskIcon,
  BoardIcon,
  ContactsIcon,
} from "@/components/ui/icons";

const items = [
  { href: "/summary", label: "Summary", icon: <SummaryIcon /> },
  { href: "/add-task", label: "Add Task", icon: <AddTaskIcon /> },
  { href: "/board", label: "Board", icon: <BoardIcon /> },
  { href: "/contacts", label: "Contacts", icon: <ContactsIcon /> },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-navy z-40 flex items-center justify-around px-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
      {items.map(({ href, label, icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-[16px] transition-colors duration-100 ${active ? "bg-[#091931]" : ""}`}
          >
            <span className={active ? "text-white" : "text-[#cdcdcd]"}>
              {icon}
            </span>
            <span
              className={`text-[12px] ${active ? "text-white" : "text-[#cdcdcd]"}`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
