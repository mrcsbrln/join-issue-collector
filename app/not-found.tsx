import Link from "next/link";
import JoinLogo from "@/components/ui/JoinLogo";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg-app flex flex-col">
      <div className="absolute top-8 left-8">
        <JoinLogo width={37} />
      </div>

      <div className="flex flex-col items-center justify-center flex-1 px-4 gap-8">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[160px] lg:text-[220px] font-bold leading-none text-navy select-none">
            4<span className="text-blue">0</span>4
          </span>
          <h1 className="text-[27px] lg:text-[36px] font-bold text-navy leading-[1.2]">
            Page not found
          </h1>
          <p className="text-[16px] text-muted leading-[1.2] text-center max-w-[380px] mt-1">
            This page doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Link
          href="/summary"
          className="bg-blue text-white text-[20px] leading-[1.2] flex items-center gap-2 h-[56px] px-6 rounded cursor-pointer hover:bg-blue-hover transition-colors duration-100"
        >
          Go to Board
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
          </svg>
        </Link>
      </div>

      <footer className="pb-10 flex items-center justify-center gap-0">
        <Link
          href="/privacy-policy"
          className="text-[16px] leading-[1.2] text-muted px-2 py-2 hover:text-navy transition-colors duration-100"
        >
          Privacy Policy
        </Link>
        <Link
          href="/legal-notice"
          className="text-[16px] leading-[1.2] text-muted px-2 py-2 hover:text-navy transition-colors duration-100"
        >
          Legal notice
        </Link>
      </footer>
    </main>
  );
}
