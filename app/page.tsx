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
    <main className="min-h-screen bg-[#2a3647] flex flex-col items-center justify-center p-4">
      <div className="absolute top-8 left-8">
        <JoinLogo width={60} variant="light" />
      </div>

      <div className="bg-white rounded-[30px] shadow-[0px_0px_10px_3px_rgba(0,0,0,0.08)] px-[72px] py-[56px] w-full max-w-[789px]">
        <div className="flex flex-col gap-[56px] items-start">
          {/* Heading */}
          <div className="flex flex-col gap-[24px] items-center w-full">
            <div className="flex flex-col gap-[16px] items-center">
              <h1 className="font-bold text-[32px] leading-[1.2] text-[#2a3647]">
                Welcome
              </h1>
              <div className="h-[2px] w-[120px] bg-[#29abe2]" />
            </div>
            <p className="text-[23px] leading-[1.2] text-[#2a3647] text-center max-w-[645px]">
              Pick the option that suits your role: create a request as a
              stakeholder or log in if you&apos;re part of the team.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-[64px] items-start sm:items-end justify-center w-full">
            {/* Stakeholder */}
            <div className="flex flex-col gap-[24px] items-start">
              <div className="flex gap-[8px] items-center">
                <WorkIcon />
                <span className="text-[23px] leading-[1.2] text-[#2a3647] whitespace-nowrap">
                  Are you a stakeholder?
                </span>
              </div>
              <Link
                href="/stakeholder"
                className="bg-[#29abe2] text-white text-[23px] leading-[1.2] px-[18px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#1a8cc0] transition-colors duration-100"
              >
                Create request
              </Link>
            </div>

            {/* Team member */}
            <div className="flex flex-col gap-[24px] items-start">
              <div className="flex gap-[8px] items-center">
                <TeamIcon />
                <span className="text-[23px] leading-[1.2] text-[#2a3647] whitespace-nowrap">
                  Are you a team member?
                </span>
              </div>
              <Link
                href="/login"
                className="bg-white border border-[#2a3647] text-[#2a3647] text-[19px] leading-[1.2] px-[18px] py-[12px] rounded-[8px] cursor-pointer hover:border-[#29abe2] hover:text-[#29abe2] transition-colors duration-100 h-[48px] flex items-center"
              >
                Member log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
