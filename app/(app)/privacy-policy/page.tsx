"use client";

import { useRouter } from "next/navigation";

function BackArrow() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 26L10 16L20 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <div className="lg:pl-14 lg:pt-[70px] pb-12">
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <h1 className="text-[47px] lg:text-[61px] font-bold leading-[1.2] text-black">
          Privacy Policy
        </h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center justify-center size-[37px] rounded-full bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] text-navy hover:bg-blue hover:text-white transition-colors duration-100 cursor-pointer border-0 shrink-0"
        >
          <BackArrow />
        </button>
      </div>

      <div className="flex flex-col gap-[35px] max-w-[1014px] text-black text-[16px] leading-[1.2]">
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[27px] font-bold leading-[1.2]">
            Data Collection
          </h2>
          <p>
            Join is a student project built for educational purposes. We collect
            only the data you explicitly provide during registration: your name,
            email address, and optionally a phone number. This data is stored
            securely in our database and is used solely to provide the Join
            application&apos;s functionality.
          </p>
        </div>

        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[27px] font-bold leading-[1.2]">
            Data Usage &amp; Storage
          </h2>
          <p>
            Your data is stored using Supabase, a secure cloud database
            provider. We do not share, sell, or transmit your personal data to
            third parties. All data is used exclusively within the Join
            application for project management purposes. Guest users may use the
            application without providing personal information.
          </p>
        </div>

        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[27px] font-bold leading-[1.2]">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data
            at any time. Since Join is an educational project and not intended
            for extensive business use, we cannot guarantee consistent
            availability or data retention. If you have any questions or
            requests regarding your data, please contact us at{" "}
            <a
              href="mailto:info@marcus-hartmann.net"
              className="text-[#29abe2] hover:underline"
            >
              info@marcus-hartmann.net
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
