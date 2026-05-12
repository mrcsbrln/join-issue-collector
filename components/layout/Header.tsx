"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Avatar from "@/components/ui/Avatar";
import JoinLogo from "@/components/ui/JoinLogo";
import type { Profile } from "@/lib/types";

export default function Header() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);

  function openMenu() {
    setMenuOpen(true);
    setMenuClosing(false);
  }

  function closeMenu() {
    setMenuClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 140);
  }

  function toggleMenu() {
    menuOpen && !menuClosing ? closeMenu() : openMenu();
  }

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(data);
    }
    load();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="fixed top-0 left-0 lg:left-[232px] right-0 h-[96px] bg-white z-30 flex items-center justify-between pl-[16px] lg:pl-[116px] pr-[40px] drop-shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
      <JoinLogo width={55} variant="dark" className="lg:hidden" />
      <span className="hidden lg:block text-[20px] font-normal text-black">
        Kanban Project Management Tool
      </span>

      <div className="flex items-center gap-4">
        <Link
          href="/help"
          aria-label="Help"
          className="hidden lg:flex items-center justify-center size-[32px] text-[#a8a8a8] hover:text-navy transition-all duration-100 group"
        >
          <svg
            className="size-[20px] group-hover:size-[24px] transition-all duration-100"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
          </svg>
        </Link>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="rounded-full focus:outline-none"
            aria-label="User menu"
          >
            {profile ? (
              <Avatar
                name={profile.name}
                color={profile.color}
                borderColor="#2A3647"
                size="header"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#cdcdcd]" />
            )}
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={closeMenu} />
              <div
                className="fixed top-[96px] right-[40px] z-20 bg-navy rounded-tl-[20px] rounded-br-[20px] rounded-bl-[20px] shadow-[0_0_4px_rgba(0,0,0,0.1)] p-[10px] overflow-hidden"
                style={{
                  animation: menuClosing
                    ? "slide-out-right 140ms ease-in forwards"
                    : "slide-in-right 150ms ease-out",
                }}
              >
                {[
                  { label: "Help", href: "/help" },
                  { label: "Legal Notice", href: "/legal-notice" },
                  { label: "Privacy Policy", href: "/privacy-policy" },
                ].map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className="flex items-center h-[46px] px-[16px] rounded-[8px] text-[#cdcdcd] text-[16px] whitespace-nowrap hover:bg-white/10 transition-colors duration-100"
                  >
                    {label}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full h-[46px] px-[16px] rounded-[8px] text-[#cdcdcd] text-[16px] whitespace-nowrap hover:bg-white/10 transition-colors duration-100"
                >
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
