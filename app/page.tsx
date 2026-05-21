import Link from "next/link";
import JoinLogo from "@/components/ui/JoinLogo";

function WorkIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        x="2"
        y="7"
        width="20"
        height="14"
        rx="2"
        stroke="#2A3647"
        strokeWidth="2"
      />
      <path
        d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
        stroke="#2A3647"
        strokeWidth="2"
      />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg
      width="25"
      height="20"
      viewBox="0 0 25 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="9" cy="6" r="4" stroke="#29ABE2" strokeWidth="2" />
      <path
        d="M1 19c0-4.418 3.582-8 8-8s8 3.582 8 8"
        stroke="#29ABE2"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="19" cy="5" r="3" stroke="#29ABE2" strokeWidth="2" />
      <path
        d="M19 12c2.761 0 5 2.239 5 5"
        stroke="#29ABE2"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-[#2a3647] flex flex-col">
      {/* Logo */}
      <div className="px-8 pt-8 lg:absolute lg:top-8 lg:left-8">
        <JoinLogo width={60} variant="light" />
      </div>

      {/* Centered content area */}
      <div className="flex-1 flex flex-col justify-center px-4 py-6 lg:items-center lg:p-4">
        {/* "Not a Join user?" — mobile only, grouped with card so they center together */}
        <div className="lg:hidden flex items-center justify-center gap-4 pb-4">
          <span className="text-[16px] leading-[1.2] text-white">
            Not a Join user?
          </span>
          <Link
            href="/register"
            className="text-[19px] leading-[1.2] text-white hover:opacity-70 transition-opacity duration-100"
          >
            Sign up
          </Link>
        </div>

        <div className="bg-white rounded-[30px] shadow-[0px_0px_10px_3px_rgba(0,0,0,0.08)] w-full max-w-[789px] mx-auto px-5 py-10 lg:px-[56px] lg:py-[56px]">
          <div className="flex flex-col gap-10 lg:gap-[56px] items-center lg:items-start">
            {/* Heading */}
            <div className="flex flex-col gap-5 lg:gap-[24px] items-center w-full">
              <div className="flex flex-col gap-4 items-center">
                <h1 className="font-bold text-[40px] leading-[1.2] text-[#2a3647] text-center">
                  Welcome
                </h1>
                <div className="h-[2px] w-[100px] lg:w-[120px] bg-[#29abe2]" />
              </div>
              <p className="text-[16px] lg:text-[23px] leading-[1.2] text-[#42526e] lg:text-[#2a3647] text-center max-w-[645px]">
                Pick the option that suits your role: create a request as a
                stakeholder or log in if you&apos;re part of the team.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col lg:flex-row gap-14 lg:gap-[64px] items-center lg:items-end lg:justify-center w-full">
              {/* Stakeholder */}
              <div className="flex flex-col gap-4 lg:gap-[24px] items-center lg:items-start">
                <div className="flex gap-2 items-center">
                  <WorkIcon />
                  <span className="text-[18px] lg:text-[23px] leading-[1.2] text-[#2a3647] lg:whitespace-nowrap">
                    Are you a stakeholder?
                  </span>
                </div>
                <Link
                  href="/stakeholder"
                  className="bg-[#2a3647] text-white text-[16px] lg:text-[23px] leading-[1.2] px-6 py-[15px] lg:px-[18px] lg:py-[10px] rounded-[8px] cursor-pointer hover:bg-[#29abe2] transition-colors duration-100 w-[240px] lg:w-auto text-center"
                >
                  Create request
                </Link>
              </div>

              {/* Team member */}
              <div className="flex flex-col gap-4 lg:gap-[24px] items-center lg:items-start">
                <div className="flex gap-2 items-center">
                  <TeamIcon />
                  <span className="text-[18px] lg:text-[23px] leading-[1.2] text-[#2a3647] lg:whitespace-nowrap">
                    Are you a team member?
                  </span>
                </div>
                <Link
                  href="/login"
                  className="bg-white border border-[#2a3647] text-[#2a3647] text-[16px] lg:text-[19px] leading-[1.2] px-6 py-[15px] lg:px-[18px] lg:py-[12px] rounded-[8px] cursor-pointer hover:border-[#29abe2] hover:text-[#29abe2] transition-colors duration-100 w-[240px] lg:w-auto lg:h-[48px] flex items-center justify-center"
                >
                  Member log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto flex items-center justify-center gap-0 pb-10 pt-2">
        <Link
          href="/privacy-policy"
          className="text-[16px] leading-[1.2] text-white px-2 py-2 hover:opacity-70 transition-opacity duration-100"
        >
          Privacy Policy
        </Link>
        <Link
          href="/legal-notice"
          className="text-[16px] leading-[1.2] text-white px-2 py-2 hover:opacity-70 transition-opacity duration-100"
        >
          Legal Notice
        </Link>
      </footer>
    </main>
  );
}
