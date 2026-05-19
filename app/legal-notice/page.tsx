"use client";

import { useRouter } from "next/navigation";
import JoinLogo from "@/components/ui/JoinLogo";

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

function Join() {
  return <span className="text-[#29abe2]">Join</span>;
}

function DevAkademie() {
  return <span className="text-[#29abe2]">Developer Akademie GmbH</span>;
}

export default function LegalNoticePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f6f7f8]">
      <div className="absolute top-8 left-8">
        <JoinLogo width={37} />
      </div>

      <div className="mx-auto w-full max-w-[1121px] px-4 pt-[85px] pb-[100px]">
        <div className="flex flex-col gap-4 mb-6 lg:mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center justify-center size-[37px] cursor-pointer hover:opacity-70 transition-opacity duration-100 border-0 bg-transparent self-start"
          >
            <BackArrowIcon />
          </button>
          <h1 className="text-[47px] lg:text-[61px] font-bold leading-[1.2] text-black">
            Legal Notice
          </h1>
        </div>

        <div className="flex flex-col gap-6 max-w-[1014px] text-black text-[16px] leading-[1.2]">
          {/* Imprint */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[27px] font-bold leading-[1.2]">Imprint</h2>
            <div className="flex flex-col gap-3">
              <ul className="list-disc pl-6 flex flex-col gap-1">
                <li>Marcus Hartmann</li>
                <li>Liegnitzer Str. 16</li>
                <li>10999 Berlin, Germany</li>
              </ul>
              <div>
                <p className="text-[20px] font-bold leading-[1.2] mb-1">
                  Contact
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@marcus-hartmann.net"
                    className="text-[#29abe2] hover:underline"
                  >
                    info@marcus-hartmann.net
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Acceptance of terms */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] font-bold leading-[1.2]">
              Acceptance of terms
            </h2>
            <p>
              By accessing and using <Join /> (Product), you acknowledge and
              agree to the following terms and conditions, and any policies,
              guidelines, or amendments thereto that may be presented to you
              from time to time. We, the listed students, may update or change
              the terms and conditions from time to time without notice.
            </p>
          </div>

          {/* Scope and ownership */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] font-bold leading-[1.2]">
              Scope and ownership of the product
            </h2>
            <p>
              <Join /> has been developed as part of a student group project in
              a web development bootcamp at the <DevAkademie />. It has an
              educational purpose and is not intended for extensive personal
              &amp; business usage. As such, we cannot guarantee consistent
              availability, reliability, accuracy, or any other aspect of
              quality regarding this Product.
            </p>
            <p>
              The design of <Join /> is owned by the <DevAkademie />.
              Unauthorized use, reproduction, modification, distribution, or
              replication of the design is strictly prohibited.
            </p>
          </div>

          {/* Proprietary rights */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] font-bold leading-[1.2]">
              Proprietary rights
            </h2>
            <p>
              Aside from the design owned by <DevAkademie />, we, the listed
              students, retain all proprietary rights in <Join />, including any
              associated copyrighted material, trademarks, and other proprietary
              information.
            </p>
          </div>

          {/* Use of the product */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] font-bold leading-[1.2]">
              Use of the product
            </h2>
            <p>
              <Join /> is intended to be used for lawful purposes only, in
              accordance with all applicable laws and regulations. Any use of{" "}
              <Join /> for illegal activities, or to harass, harm, threaten, or
              intimidate another person, is strictly prohibited. You are solely
              responsible for your interactions with other users of <Join />.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] font-bold leading-[1.2]">
              Disclaimer of warranties and limitation of liability
            </h2>
            <p>
              <Join /> is provided &quot;as is&quot; without warranty of any
              kind, whether express or implied, including but not limited to the
              implied warranties of merchantability, fitness for a particular
              purpose, and non-infringement. In no event will we, the listed
              students, or the <DevAkademie />, be liable for any direct,
              indirect, incidental, special, consequential or exemplary damages,
              including but not limited to, damages for loss of profits,
              goodwill, use, data, or other intangible losses, even if we have
              been advised of the possibility of such damages, arising out of or
              in connection with the use or performance of <Join />.
            </p>
          </div>

          {/* Indemnity */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] font-bold leading-[1.2]">Indemnity</h2>
            <p>
              You agree to indemnify, defend and hold harmless us, the listed
              students, the <DevAkademie />, and our affiliates, partners,
              officers, directors, agents, and employees, from and against any
              claim, demand, loss, damage, cost, or liability (including
              reasonable legal fees) arising out of or relating to your use of{" "}
              <Join /> and/or your breach of this Legal Notice.
            </p>
            <p>
              For any questions or notices, please contact us at{" "}
              <a
                href="mailto:info@marcus-hartmann.net"
                className="text-[#29abe2] hover:underline"
              >
                info@marcus-hartmann.net
              </a>
              .
            </p>
            <p>Date: May 12, 2026</p>
          </div>
        </div>
      </div>
    </main>
  );
}
