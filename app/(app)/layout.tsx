import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-app">
      <Sidebar />
      <Header />
      <main className="md:ml-[232px] pt-[96px] pb-20 md:pb-0 min-h-screen">
        <div className="p-[16px] md:p-[40px]">{children}</div>
      </main>
      <MobileNav />
    </div>
  );
}
