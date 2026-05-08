import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-app">
      <Sidebar />
      <Header />
      <main className="ml-[232px] pt-[96px] min-h-screen">
        <div className="p-[40px]">{children}</div>
      </main>
    </div>
  );
}
