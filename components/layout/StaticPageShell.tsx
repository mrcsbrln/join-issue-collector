import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import LoggedOutSidebar from "@/components/layout/LoggedOutSidebar";
import LoggedOutMobileNav from "@/components/layout/LoggedOutMobileNav";
import JoinLogo from "@/components/ui/JoinLogo";

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
          <div className="px-2 py-4 lg:p-[40px]">{children}</div>
        </main>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-app">
      <LoggedOutSidebar />
      <header className="fixed top-0 lg:left-[232px] left-0 right-0 h-[96px] bg-white z-30 flex items-center pl-2 lg:pl-[116px] drop-shadow-[0px_4px_2px_rgba(0,0,0,0.1)]">
        <JoinLogo width={55} variant="dark" className="lg:hidden" />
        <span className="hidden lg:block text-[20px] font-normal text-black">
          Kanban Project Management Tool
        </span>
      </header>
      <main className="lg:ml-[232px] pt-[96px] pb-20 lg:pb-0 min-h-screen">
        <div className="px-2 py-4 lg:p-[40px]">{children}</div>
      </main>
      <LoggedOutMobileNav />
    </div>
  );
}
