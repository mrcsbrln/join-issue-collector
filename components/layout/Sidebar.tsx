"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import JoinLogo from "@/components/ui/JoinLogo";
import {
  SummaryIcon,
  BoardIcon,
  ContactsIcon,
  AddTaskIcon,
  PrivacyPolicyIcon,
  LegalNoticeIcon,
  HelpIcon,
} from "@/components/ui/icons";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const mainNav: NavItem[] = [
  { href: "/summary", label: "Summary", icon: <SummaryIcon /> },
  { href: "/board", label: "Board", icon: <BoardIcon /> },
  { href: "/contacts", label: "Contacts", icon: <ContactsIcon /> },
  { href: "/add-task", label: "Add Task", icon: <AddTaskIcon /> },
];

const bottomNav: NavItem[] = [
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
    icon: <PrivacyPolicyIcon />,
  },
  { href: "/legal-notice", label: "Legal Notice", icon: <LegalNoticeIcon /> },
  { href: "/help", label: "Help", icon: <HelpIcon /> },
];

function NavLink({ href, label, icon }: NavItem) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-[15px] w-[232px] h-[46px] px-[56px] rounded-[8px] transition-colors duration-100",
        "text-sm font-medium",
        isActive
          ? "bg-[#091931] text-white"
          : "text-[#cdcdcd] hover:bg-[#091931] hover:text-white",
      ].join(" ")}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-[232px] bg-navy flex flex-col z-40">
      <div className="px-[56px] pt-[68px] pb-[56px]">
        <JoinLogo width={100} />
      </div>

      <nav className="flex flex-col gap-[6px] flex-1">
        {mainNav.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>

      <nav className="flex flex-col gap-[6px] pb-[40px]">
        {bottomNav.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
    </aside>
  );
}
