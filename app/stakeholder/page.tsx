import Image from "next/image";
import Link from "next/link";
import JoinLogo from "@/components/ui/JoinLogo";
import { getDailyLimitStatus } from "@/lib/dailyLimit";

export const dynamic = "force-dynamic";

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
  const {
    count: todayCount,
    limit: DAILY_LIMIT,
    limitReached,
  } = await getDailyLimitStatus();
  const counterColor = limitReached ? "text-[#ff3d00]" : "text-[#29abe2]";
  const mailtoHref = `mailto:issue-collector@marcus-hartmann.net`;

  return (
    <main className="min-h-screen bg-[#f6f7f8] flex flex-col">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <JoinLogo width={37} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-8 lg:gap-[56px] items-center mx-auto w-full max-w-[1121px] px-4 pt-[85px] pb-[60px] lg:pb-[100px]">
        {/* Top bar: back arrow + counter */}
        <div className="flex items-center justify-between w-full gap-4">
          <Link
            href="/"
            className="flex items-center justify-center size-[37px] shrink-0 cursor-pointer hover:opacity-70 transition-opacity duration-100"
            aria-label="Zurück"
          >
            <BackArrowIcon />
          </Link>
          <p
            className={`text-[13px] lg:text-[19px] leading-[1.2] text-right ${counterColor}`}
          >
            <strong>{Math.min(todayCount, DAILY_LIMIT)}</strong> of{" "}
            <strong>{DAILY_LIMIT}</strong> requests used today
          </p>
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-8 lg:gap-[48px] items-center w-full">
          <h1 className="font-bold text-[40px] lg:text-[64px] leading-[1.2] text-[#2a3647] text-center">
            Welcome
          </h1>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-[48px] items-start w-full max-w-[964px]">
            {/* Left: text + CTA */}
            <div className="flex flex-col gap-6 lg:gap-[40px] items-start flex-1 w-full">
              {limitReached ? (
                <>
                  <div className="bg-[rgba(255,210,210,0.52)] flex items-center justify-center px-[24px] py-[16px] rounded-[8px] w-full">
                    <p className="font-medium text-[16px] lg:text-[20px] leading-[1.2] text-[#2a3647] text-center">
                      The daily 10-request limit has been reached!
                    </p>
                  </div>
                  <div className="flex flex-col gap-[16px]">
                    <p className="text-[15px] lg:text-[19px] leading-[1.2] text-[#2a3647] text-justify">
                      Need more? No worries — you can still send emails, but our
                      team will review them manually instead of using AI to
                      create tickets.
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-6 lg:gap-[40px] w-full">
                  <p className="text-[20px] lg:text-[28px] leading-[1.2] text-[#42526e]">
                    Easily create a ticket by sending an email — no extra steps
                    needed.
                  </p>

                  {/* Illustration — mobile only, between subtitle and body text */}
                  <div className="lg:hidden flex justify-center">
                    <Image
                      src="/stakeholder-illustration.png"
                      alt="Kanban board illustration"
                      width={292}
                      height={201}
                      className="object-contain rounded-[8px] w-full max-w-[292px]"
                      loading="eager"
                    />
                  </div>

                  <div className="flex flex-col gap-[16px] text-[15px] lg:text-[19px] leading-[1.2] text-[#42526e] text-justify lg:max-w-[502px]">
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
                className="bg-[#29abe2] text-white text-[18px] lg:text-[23px] leading-[1.2] flex items-center gap-[4px] h-[52px] lg:h-[60px] px-[18px] py-[14px] lg:py-[16px] rounded-[10px] cursor-pointer hover:bg-[#1a8cc0] transition-colors duration-100 shrink-0"
              >
                {limitReached ? "Send an email" : "Create Email Request"}
                <CheckIcon />
              </a>
            </div>

            {/* Right: illustration — desktop only */}
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
