import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import JoinLogo from "@/components/ui/JoinLogo";

const DAILY_LIMIT = 10;

async function getTodayCount(): Promise<number> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return 0;
  const supabase = createClient(url, key);
  const today = new Date().toISOString().split("T")[0];
  const { count } = await supabase
    .from("tasks")
    .select("id", { count: "exact", head: true })
    .eq("creator_type", "external")
    .gte("created_at", `${today}T00:00:00`)
    .lt("created_at", `${today}T23:59:59`);
  return count ?? 0;
}

function BackArrowIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 8L12 16L20 24"
        stroke="#2A3647"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12L9.5 17.5L20 6"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function StakeholderPage() {
  const todayCount = await getTodayCount();
  const limitReached = todayCount >= DAILY_LIMIT;
  const counterColor = limitReached ? "text-[#ff3d00]" : "text-[#29abe2]";
  const mailtoHref = `mailto:issue-collector@marcus-hartmann.net`;

  return (
    <main className="min-h-screen bg-[#f6f7f8] flex flex-col">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <JoinLogo width={37} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[56px] items-center mx-auto w-full max-w-[1121px] px-4 pt-[85px] pb-[100px]">
        {/* Top bar: back arrow + counter */}
        <div className="flex items-center justify-between w-full">
          <Link
            href="/"
            className="flex items-center justify-center size-[37px] cursor-pointer hover:opacity-70 transition-opacity duration-100"
            aria-label="Zurück"
          >
            <BackArrowIcon />
          </Link>
          <p className={`text-[19px] leading-[1.2] ${counterColor}`}>
            <strong>{Math.min(todayCount, DAILY_LIMIT)}</strong> of{" "}
            <strong>{DAILY_LIMIT}</strong> requests used today
          </p>
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-[48px] items-center w-full">
          <h1 className="font-bold text-[64px] leading-[1.2] text-[#2a3647] text-center">
            Welcome
          </h1>

          <div className="flex flex-col lg:flex-row gap-[48px] items-start w-full max-w-[964px]">
            {/* Left: text + CTA */}
            <div className="flex flex-col gap-[40px] items-start flex-1">
              {limitReached ? (
                <>
                  <div className="bg-[rgba(255,210,210,0.52)] flex items-center justify-center px-[24px] py-[16px] rounded-[8px] w-full">
                    <p className="font-medium text-[20px] leading-[1.2] text-[#2a3647] text-center">
                      The daily 10-request limit has been reached!
                    </p>
                  </div>
                  <div className="flex flex-col gap-[16px]">
                    <p className="text-[19px] leading-[1.2] text-[#2a3647] text-justify max-w-[502px]">
                      Need more? No worries — you can still send emails, but our
                      team will review them manually instead of using AI to
                      create tickets.
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-[40px]">
                  <p className="text-[28px] leading-[1.2] text-[#42526e]">
                    Easily create a ticket by sending an email — no extra steps
                    needed.
                  </p>
                  <div className="flex flex-col gap-[16px] text-[19px] leading-[1.2] text-[#42526e] text-justify max-w-[502px]">
                    <p>
                      On this platform, you can submit your feature requests via
                      email. Our AI system will automatically generate a ticket
                      with a deadline and priority level.
                    </p>
                    <p>
                      A total of 10 requests can be created per day. After this
                      limit, emails can still be sent, but they will be manually
                      reviewed by our team instead of generating AI tickets.
                    </p>
                  </div>
                </div>
              )}

              <a
                href={mailtoHref}
                className="bg-[#29abe2] text-white text-[23px] leading-[1.2] flex items-center gap-[4px] h-[60px] px-[18px] py-[16px] rounded-[10px] cursor-pointer hover:bg-[#1a8cc0] transition-colors duration-100"
              >
                {limitReached ? "Send an email" : "Create Email Request"}
                <CheckIcon />
              </a>
            </div>

            {/* Right: illustration */}
            <div className="hidden lg:block shrink-0">
              <Image
                src={
                  limitReached
                    ? "/stakeholder-illustration-limit.png"
                    : "/stakeholder-illustration.png"
                }
                alt="Kanban board illustration"
                width={416}
                height={280}
                className="object-contain rounded-[8px]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto pb-[40px] flex items-center justify-center gap-0">
        <Link
          href="/privacy-policy"
          className="text-[16px] leading-[1.2] text-[#a8a8a8] px-[8px] py-[8px] hover:text-[#2a3647] transition-colors duration-100 cursor-pointer"
        >
          Privacy Policy
        </Link>
        <Link
          href="/legal-notice"
          className="text-[16px] leading-[1.2] text-[#a8a8a8] px-[8px] py-[8px] hover:text-[#2a3647] transition-colors duration-100 cursor-pointer"
        >
          Legal notice
        </Link>
      </footer>
    </main>
  );
}
