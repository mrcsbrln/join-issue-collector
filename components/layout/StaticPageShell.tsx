import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import LoggedOutSidebar from "@/components/layout/LoggedOutSidebar";
import JoinLogo from "@/components/ui/JoinLogo";

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

export default async function StaticPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <div className="min-h-screen bg-bg-app">
        <Sidebar />
        <Header />
        <main className="lg:ml-[232px] pt-[96px] pb-20 lg:pb-0 min-h-screen">
          <div className="p-[16px] lg:p-[40px]">{children}</div>
        </main>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-app">
      <LoggedOutSidebar />
      <header className="fixed top-0 lg:left-[232px] left-0 right-0 h-[96px] bg-white z-30 flex items-center pl-[16px] lg:pl-[116px] drop-shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
        <JoinLogo width={55} variant="dark" className="lg:hidden" />
        <span className="hidden lg:block text-[20px] font-normal text-black">
          Kanban Project Management Tool
        </span>
      </header>
      <main className="lg:ml-[232px] pt-[96px] pb-20 lg:pb-0 min-h-screen">
        <div className="p-[16px] lg:p-[40px]">{children}</div>
      </main>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-navy z-40 flex items-center justify-around px-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <Link
          href="/login"
          className="flex flex-col items-center gap-1 py-2 px-3 rounded-[16px] text-[#cdcdcd] hover:text-white transition-colors duration-100"
        >
          <LoginIcon />
          <span className="text-[12px]">Log in</span>
        </Link>
      </nav>
    </div>
  );
}
