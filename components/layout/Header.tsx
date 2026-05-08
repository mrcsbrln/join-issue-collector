"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Avatar from "@/components/ui/Avatar";
import { HelpIcon } from "@/components/ui/icons";
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
    <header className="fixed top-0 left-[232px] right-0 h-[96px] bg-white z-30 flex items-center justify-between pl-[116px] pr-[40px] drop-shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
      <span className="text-[20px] font-normal text-black">
        Kanban Project Management Tool
      </span>

      <div className="flex items-center gap-4">
        <a
          href="/help"
          className="text-[#A8A8A8] hover:text-navy transition-colors duration-100"
          aria-label="Help"
        >
          <HelpIcon />
        </a>

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
              <div className="absolute right-0 top-10 z-20 bg-white rounded-[10px] shadow-card border border-[#D1D1D1] min-w-[140px] py-1 overflow-hidden">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-navy hover:bg-bg-app transition-colors duration-100"
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
