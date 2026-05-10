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
    <header className="fixed top-0 left-0 md:left-[232px] right-0 h-[96px] bg-white z-30 flex items-center justify-between pl-[16px] md:pl-[116px] pr-[40px] drop-shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
      <JoinLogo width={55} variant="dark" className="md:hidden" />
      <span className="hidden md:block text-[20px] font-normal text-black">
        Kanban Project Management Tool
      </span>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-full focus:outline-none"
            aria-label="User menu"
          >
            {profile ? (
              <Avatar name={profile.name} color={profile.color} size="sm" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#cdcdcd]" />
            )}
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div
                className="absolute right-0 top-10 z-20 bg-navy rounded-tl-[20px] rounded-br-[20px] rounded-bl-[20px] shadow-[0_0_4px_rgba(0,0,0,0.1)] p-[10px] overflow-hidden"
                style={{ animation: "slide-in-right 150ms ease-out" }}
              >
                {[
                  { label: "Help", href: "/help" },
                  { label: "Legal Notice", href: "/legal-notice" },
                  { label: "Privacy Policy", href: "/privacy-policy" },
                ].map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
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
