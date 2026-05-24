import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-app">
      <Sidebar />
      <Header />
      <main className="lg:ml-[232px] pt-[96px] pb-20 lg:pb-0 min-h-screen">
        <div className="px-2 py-4 lg:p-[40px]">{children}</div>
      </main>
      <MobileNav />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#2a3647",
            color: "#ffffff",
            borderRadius: "20px",
            padding: "0 24px",
            minHeight: "74px",
            minWidth: "326px",
            fontSize: "20px",
            fontWeight: "400",
            boxShadow: "0px 0px 4px rgba(0,0,0,0.15)",
          },
          success: { icon: null },
          error: { icon: null },
        }}
      />
    </div>
  );
}
