"use client";

import { useRouter } from "next/navigation";

function Join() {
  return <span className="text-[#29abe2]">Join</span>;
}

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

export default function HelpPage() {
  const router = useRouter();

  return (
    <div className="lg:pl-14 lg:pt-[70px] pb-12">
      {/* Heading row */}
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <h1 className="text-[47px] lg:text-[61px] font-bold leading-[1.2] text-black">
          Help
        </h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center justify-center size-[37px] rounded-full bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] text-navy hover:bg-blue hover:text-white transition-colors duration-100 cursor-pointer border-0 shrink-0"
        >
          <BackArrow />
        </button>
      </div>

      <div className="flex flex-col gap-6 max-w-[1014px] text-black text-[16px] leading-[1.2]">
        {/* Intro */}
        <p>
          Welcome to the help page for <Join />, your guide to using our kanban
          project management tool. Here, we&apos;ll provide an overview of what{" "}
          <Join /> is, how it can benefit you, and how to use it.
        </p>

        {/* What is Join? */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[27px] font-bold leading-[1.2]">What is Join?</h2>
          <div className="flex flex-col gap-4">
            <p>
              <Join /> is a kanban-based project management tool designed and
              built by a group of dedicated students as part of their web
              development bootcamp at the Developer Akademie.
            </p>
            <p>
              Kanban, a Japanese term meaning &quot;billboard&quot;, is a highly
              effective method to visualize work, limit work-in-progress, and
              maximize efficiency (or flow). <Join /> leverages the principles
              of kanban to help users manage their tasks and projects in an
              intuitive, visual interface.
            </p>
            <p>
              It is important to note that <Join /> is designed as an
              educational exercise and is not intended for extensive business
              usage. While we strive to ensure the best possible user
              experience, we cannot guarantee consistent availability,
              reliability, accuracy, or other aspects of quality regarding{" "}
              <Join />.
            </p>
          </div>
        </div>

        {/* How to use it */}
        <h2 className="text-[27px] font-bold leading-[1.2]">How to use it</h2>
        <div className="flex flex-col gap-4">
          <p>
            Here is a step-by-step guide on how to use <Join />:
          </p>
          <div className="flex flex-col gap-4">
            {/* Step 1 */}
            <div className="flex gap-[35px] items-start">
              <span className="text-[27px] font-bold leading-[1.2] shrink-0">
                1.
              </span>
              <div>
                <p className="text-[20px] font-bold leading-[1.2] mb-1">
                  Exploring the Board
                </p>
                <p>
                  When you log in to <Join />, you&apos;ll find a default board.
                  This board represents your project and contains four default
                  lists: &quot;To Do&quot;, &quot;In Progress&quot;, &quot;Await
                  feedback&quot; and &quot;Done&quot;.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-[35px] items-start">
              <span className="text-[27px] font-bold leading-[1.2] shrink-0">
                2.
              </span>
              <div>
                <p className="text-[20px] font-bold leading-[1.2] mb-1">
                  Creating Contacts
                </p>
                <p>
                  In <Join />, you can add contacts to collaborate on your
                  projects. Go to the &quot;Contacts&quot; section, click on
                  &quot;New contact&quot;, and fill in the required information.
                  Once added, these contacts can be assigned tasks and they can
                  interact with the tasks on the board.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-[35px] items-start">
              <span className="text-[27px] font-bold leading-[1.2] shrink-0">
                3.
              </span>
              <div>
                <p className="text-[20px] font-bold leading-[1.2] mb-1">
                  Adding Cards
                </p>
                <p>
                  Now that you&apos;ve added your contacts, you can start adding
                  cards. Cards represent individual tasks. Click the
                  &quot;+&quot; button under the appropriate list to create a
                  new card. Fill in the task details in the card, like task
                  name, description, due date, assignees, etc.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-[35px] items-start">
              <span className="text-[27px] font-bold leading-[1.2] shrink-0">
                4.
              </span>
              <div>
                <p className="text-[20px] font-bold leading-[1.2] mb-1">
                  Moving Cards
                </p>
                <p>
                  As the task moves from one stage to another, you can reflect
                  that on the board by dragging and dropping the card from one
                  list to another.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-[35px] items-start">
              <span className="text-[27px] font-bold leading-[1.2] shrink-0">
                5.
              </span>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-[20px] font-bold leading-[1.2] mb-1">
                    Deleting Cards
                  </p>
                  <p>
                    Once a task is completed, you can either move it to the
                    &quot;Done&quot; list or delete it. Deleting a card will
                    permanently remove it from the board. Please exercise
                    caution when deleting cards, as this action is irreversible.
                  </p>
                </div>
                <p>
                  Remember that using <Join /> effectively requires consistent
                  updates from you and your team to ensure the board reflects
                  the current state of your project.
                </p>
                <p>
                  Have more questions about <Join />? Feel free to contact us at{" "}
                  <a
                    href="mailto:info@marcus-hartmann.net"
                    className="text-[#29abe2] hover:underline"
                  >
                    info@marcus-hartmann.net
                  </a>
                  . We&apos;re here to help you!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing */}
        <p className="text-[27px] font-bold leading-[1.2]">Enjoy using Join!</p>
      </div>
    </div>
  );
}
