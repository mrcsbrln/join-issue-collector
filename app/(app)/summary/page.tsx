import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function getSummaryData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: tasks } = await supabase
    .from("tasks")
    .select("status, priority, due_date");

  let name = "";
  const isGuest = user?.is_anonymous === true;
  if (user && !isGuest) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", user.id)
      .single();
    name = profile?.name ?? "";
  }

  const allTasks = tasks ?? [];
  const urgentTasks = allTasks.filter((t) => t.priority === "urgent");
  const nextDeadline =
    urgentTasks
      .filter((t) => t.due_date)
      .sort(
        (a, b) =>
          new Date(a.due_date).getTime() - new Date(b.due_date).getTime(),
      )[0]?.due_date ?? null;

  return {
    todo: allTasks.filter((t) => t.status === "todo").length,
    done: allTasks.filter((t) => t.status === "done").length,
    inProgress: allTasks.filter((t) => t.status === "in-progress").length,
    awaitingFeedback: allTasks.filter((t) => t.status === "awaiting-feedback")
      .length,
    total: allTasks.length,
    urgent: urgentTasks.length,
    nextDeadline,
    name,
    isGuest,
  };
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning,";
  if (hour >= 12 && hour < 18) return "Good afternoon,";
  return "Good evening,";
}

function formatDeadline(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function TodoCircleIcon() {
  return (
    <div className="size-[40px] lg:size-[69px] rounded-full bg-navy group-hover:bg-white flex items-center justify-center shrink-0 text-white group-hover:text-navy transition-colors duration-100">
      <svg
        className="w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"
        viewBox="0 0 25 25"
        fill="none"
      >
        <path
          d="M2.66667 21.6667H4.53333L16.0333 10.1667L14.1667 8.3L2.66667 19.8V21.6667ZM21.7333 8.23333L16.0667 2.63333L17.9333 0.766667C18.4444 0.255556 19.0722 0 19.8167 0C20.5611 0 21.1889 0.255556 21.7 0.766667L23.5667 2.63333C24.0778 3.14444 24.3444 3.76111 24.3667 4.48333C24.3889 5.20556 24.1444 5.82222 23.6333 6.33333L21.7333 8.23333ZM19.8 10.2L5.66667 24.3333H0V18.6667L14.1333 4.53333L19.8 10.2Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function DoneCircleIcon() {
  return (
    <div className="size-[40px] lg:size-[69px] rounded-full bg-navy group-hover:bg-white flex items-center justify-center shrink-0 text-white group-hover:text-navy transition-colors duration-100">
      <svg
        className="w-[22px] h-[18px] lg:w-[37px] lg:h-[30px]"
        viewBox="0 0 37 30"
        fill="none"
      >
        <path
          d="M3.5 14.566L14.7288 25.6321L33.4434 3.5"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function UrgentCircleIcon() {
  return (
    <div className="size-[40px] lg:size-[60px] rounded-full bg-priority-urgent flex items-center justify-center shrink-0">
      <svg
        className="w-[22px] h-[16px] lg:w-[35px] lg:h-[26px]"
        viewBox="0 0 35 26"
        fill="none"
      >
        <path
          d="M32.3128 25.1162C31.9118 25.1169 31.5211 24.9873 31.1982 24.7465L17.093 14.2167L2.98773 24.7465C2.78971 24.8947 2.56479 25.0019 2.32583 25.062C2.08687 25.1222 1.83854 25.1341 1.59502 25.0971C1.3515 25.0602 1.11755 24.975 0.906549 24.8466C0.695544 24.7181 0.511607 24.5489 0.365241 24.3485C0.218876 24.1481 0.112947 23.9205 0.0535029 23.6787C-0.00594092 23.4369 -0.0177355 23.1856 0.0187927 22.9391C0.0925645 22.4415 0.358687 21.9938 0.758615 21.6947L15.9784 10.3213C16.301 10.0796 16.6917 9.94922 17.093 9.94922C17.4943 9.94922 17.885 10.0796 18.2075 10.3213L33.4274 21.6947C33.7452 21.9317 33.9808 22.2642 34.1007 22.6448C34.2207 23.0254 34.2187 23.4347 34.0951 23.8141C33.9715 24.1935 33.7326 24.5237 33.4125 24.7575C33.0925 24.9913 32.7076 25.1169 32.3128 25.1162Z"
          fill="white"
        />
        <path
          d="M32.3127 15.1645C31.9116 15.1652 31.521 15.0357 31.1981 14.7949L17.0929 4.265L2.98762 14.7949C2.58769 15.094 2.08671 15.2201 1.5949 15.1455C1.10309 15.0708 0.660727 14.8015 0.365127 14.3968C0.0695279 13.9921 -0.0550935 13.4852 0.0186784 12.9875C0.0924502 12.4898 0.358572 12.0421 0.758501 11.743L15.9783 0.36961C16.3009 0.127979 16.6916 -0.00244141 17.0929 -0.00244141C17.4942 -0.00244141 17.8849 0.127979 18.2074 0.36961L33.4272 11.743C33.745 11.98 33.9807 12.3126 34.1006 12.6932C34.2205 13.0738 34.2186 13.483 34.095 13.8624C33.9714 14.2418 33.7325 14.572 33.4124 14.8058C33.0924 15.0397 32.7075 15.1652 32.3127 15.1645Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

const cardBase =
  "group bg-white rounded-[30px] shadow-[0_0_4px_rgba(0,0,0,0.1)] hover:bg-navy hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-all duration-100";

function StatCard({
  href,
  icon,
  count,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  count: number;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`${cardBase} flex items-center gap-[12px] lg:gap-[18px] flex-1 h-[110px] lg:h-[168px] justify-center`}
    >
      {icon}
      <div className="flex flex-col items-center">
        <span className="text-[47px] lg:text-[64px] font-semibold leading-[1.2] text-black group-hover:text-white">
          {count}
        </span>
        <span className="text-[16px] lg:text-[20px] font-normal text-navy group-hover:text-white whitespace-nowrap">
          {label}
        </span>
      </div>
    </Link>
  );
}

function UrgencyCard({
  count,
  deadline,
}: {
  count: number;
  deadline: string | null;
}) {
  return (
    <Link
      href="/board"
      className={`${cardBase} flex items-center justify-center gap-[24px] lg:gap-[61px] h-[110px] lg:h-[168px] px-4 lg:px-12`}
    >
      <div className="flex items-center gap-[12px] lg:gap-[18px]">
        <UrgentCircleIcon />
        <div className="flex flex-col items-center">
          <span className="text-[47px] lg:text-[64px] font-semibold leading-[1.2] text-black group-hover:text-white w-[50px] text-center">
            {count}
          </span>
          <span className="text-[16px] font-normal text-navy group-hover:text-white">
            Urgent
          </span>
        </div>
      </div>
      <div className="w-px h-[70px] lg:h-[102px] bg-border group-hover:bg-white/30 shrink-0" />
      <div className="flex flex-col gap-[8px] lg:gap-[13px]">
        <span className="text-[16px] lg:text-[21px] font-bold text-navy group-hover:text-white leading-[1.2]">
          {deadline ? formatDeadline(deadline) : "No deadline"}
        </span>
        <span className="text-[16px] font-normal text-navy group-hover:text-white">
          Upcoming Deadline
        </span>
      </div>
    </Link>
  );
}

function MiniStatCard({
  href,
  count,
  line1,
  line2,
}: {
  href: string;
  count: number;
  line1: string;
  line2: string;
}) {
  return (
    <Link
      href={href}
      className={`${cardBase} flex flex-col items-center justify-center flex-1 h-[116px] lg:size-[168px]`}
    >
      <span className="text-[47px] lg:text-[64px] font-semibold leading-[1.2] text-black group-hover:text-white">
        {count}
      </span>
      <div className="text-[14px] lg:text-[20px] font-normal text-navy group-hover:text-white text-center leading-[1.2]">
        <p>{line1}</p>
        <p>{line2}</p>
      </div>
    </Link>
  );
}

export default async function SummaryPage() {
  const data = await getSummaryData();
  const greeting = getGreeting();

  return (
    <div className="lg:pl-14 lg:pt-[70px]">
      <div className="mb-8 lg:mb-[59px] flex flex-col lg:flex-row lg:items-center lg:gap-[30px]">
        <h1 className="text-[47px] lg:text-[61px] font-bold leading-[1.2] text-black whitespace-nowrap">
          Join 360
        </h1>
        <div className="hidden lg:block w-px h-[59px] bg-border shrink-0" />
        <p className="text-[20px] lg:text-[27px] font-normal text-navy whitespace-nowrap">
          Key Metrics at a Glance
        </p>
        <div className="w-[90px] h-px bg-blue mt-2 lg:hidden" />
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-20 lg:items-center">
        <div className="flex flex-col items-stretch gap-4 lg:gap-7 w-full max-w-[560px] mx-auto lg:mx-0 lg:shrink-0">
          <div className="flex gap-6 lg:gap-8">
            <StatCard
              href="/board"
              icon={<TodoCircleIcon />}
              count={data.todo}
              label="To-do"
            />
            <StatCard
              href="/board"
              icon={<DoneCircleIcon />}
              count={data.done}
              label="Done"
            />
          </div>
          <UrgencyCard count={data.urgent} deadline={data.nextDeadline} />
          <div className="flex gap-6 lg:gap-7">
            <MiniStatCard
              href="/board"
              count={data.total}
              line1="Tasks in"
              line2="Board"
            />
            <MiniStatCard
              href="/board"
              count={data.inProgress}
              line1="Tasks In"
              line2="Progress"
            />
            <MiniStatCard
              href="/board"
              count={data.awaitingFeedback}
              line1="Awaiting"
              line2="Feedback"
            />
          </div>
        </div>

        <div className="hidden lg:block pl-20">
          <p className="text-[47px] font-medium text-navy leading-[1.2]">
            {data.isGuest ? `${greeting.replace(/,$/, "")}!` : greeting}
          </p>
          {!data.isGuest && (
            <p className="text-[64px] font-bold text-blue leading-[1.2]">
              {data.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
