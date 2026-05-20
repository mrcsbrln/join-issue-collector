import StaticPageShell from "@/components/layout/StaticPageShell";

export default function PrivacyPolicyPage() {
  return (
    <StaticPageShell>
      <h1 className="text-[47px] lg:text-[61px] font-bold leading-[1.2] text-black mb-8 lg:mb-[35px]">
        Privacy Policy
      </h1>

      <div className="flex flex-col gap-[35px] max-w-[1014px] text-black text-[16px] leading-[1.2]">
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[27px] font-bold leading-[1.2]">
            Data Collection
          </h2>
          <p>
            Join is a student project built for educational purposes. Registered
            users provide their name, email address, and optionally a phone
            number. This data is used solely to provide the application&apos;s
            functionality. Guest users may use the application anonymously via a
            temporary session — no personal data is required for guest access.
          </p>
          <p>
            Tasks and contacts you create within the application are visible to
            all registered users, including guests, as Join operates on a shared
            board. Please do not enter sensitive personal information into tasks
            or contact fields.
          </p>
        </div>

        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[27px] font-bold leading-[1.2]">
            Data Storage &amp; Hosting
          </h2>
          <p>
            All data is stored in a <span className="font-bold">Supabase</span>{" "}
            PostgreSQL database hosted in{" "}
            <span className="font-bold">Frankfurt, Germany</span> (EU). The
            application itself is hosted on{" "}
            <span className="font-bold">Vercel</span>, also using the Frankfurt
            (EU) region. Both providers are subject to EU data protection law
            (GDPR).
          </p>
          <p>
            The AI Issue Collector workflow runs on a self-hosted{" "}
            <span className="font-bold">n8n</span> instance on a{" "}
            <span className="font-bold">Hetzner</span> server located in{" "}
            <span className="font-bold">Nuremberg, Germany</span> (EU). Hetzner
            Online GmbH is a German provider subject to GDPR.
          </p>
        </div>

        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[27px] font-bold leading-[1.2]">
            AI Processing (Issue Collector)
          </h2>
          <p>
            When a feature request or bug report is submitted via email to the
            issue collector address, the email&apos;s subject and body are
            forwarded to <span className="font-bold">Mistral AI</span> (Mistral
            AI SAS, Paris, France) for automated ticket generation. Mistral AI
            processes this data to extract a title, description, category,
            priority, and optional due date.
          </p>
          <p>
            By sending an email to the issue collector address you consent to
            this processing. Please do not include sensitive personal data in
            your email beyond what is necessary to describe the issue. Your
            sender email address is stored in the ticket as the creator and may
            be used to notify you of status changes.
          </p>
          <p>
            Mistral AI&apos;s data processing is governed by their{" "}
            <a
              href="https://mistral.ai/terms/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#29abe2] hover:underline"
            >
              terms of service
            </a>
            . As a French company, Mistral AI is subject to EU data protection
            law (GDPR). Email content sent for processing is not used to train
            Mistral AI models.
          </p>
        </div>

        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[27px] font-bold leading-[1.2]">
            Cookies &amp; Session Data
          </h2>
          <p>
            Join uses HTTP-only cookies to manage authentication sessions via
            Supabase Auth. These cookies are strictly necessary for the
            application to function and do not track you across other websites.
            No analytics cookies or third-party tracking scripts are used.
          </p>
        </div>

        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[27px] font-bold leading-[1.2]">Server Logs</h2>
          <p>
            Vercel automatically collects standard server access logs, which may
            include your IP address, browser type, and request timestamps. These
            logs are retained by Vercel for operational and security purposes
            and are not used by us for any form of tracking or profiling.
          </p>
        </div>

        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[27px] font-bold leading-[1.2]">Your Rights</h2>
          <p>
            Under GDPR you have the right to access, correct, or delete your
            personal data at any time. Since Join is an educational project not
            intended for extensive business use, we cannot guarantee consistent
            availability or long-term data retention. To exercise your rights or
            for any data-related questions, please contact us at{" "}
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
    </StaticPageShell>
  );
}
