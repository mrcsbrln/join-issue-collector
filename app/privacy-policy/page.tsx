import Link from "next/link";
import JoinLogo from "@/components/ui/JoinLogo";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-bg-app flex flex-col">
      <header className="px-8 py-6">
        <Link href="/summary">
          <JoinLogo width={80} />
        </Link>
      </header>
      <main className="flex-1 max-w-[800px] mx-auto w-full px-8 py-10">
        <h1 className="text-4xl font-bold text-navy mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-[30px] shadow-card p-10 text-navy space-y-4">
          <p className="text-muted">
            This is a student project built for educational purposes only. No
            personal data is collected or shared.
          </p>
        </div>
      </main>
    </div>
  );
}
