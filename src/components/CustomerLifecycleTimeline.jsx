import React from "react";

// CustomerLifecycleTimeline
// Single-file React component you can drop into a Vite/Next/CRA project.
// TailwindCSS classes are used for styling. If Tailwind isn't enabled,
// it will still render but without the fancy styles.

const stageStyles = {
  kickoff: {
    bg: "bg-emerald-50",
    ring: "ring-emerald-200",
    title: "text-emerald-800",
    chip: "bg-emerald-100 text-emerald-800",
  },
  adoption: {
    bg: "bg-sky-50",
    ring: "ring-sky-200",
    title: "text-sky-800",
    chip: "bg-sky-100 text-sky-800",
  },
  renewal: {
    bg: "bg-amber-50",
    ring: "ring-amber-200",
    title: "text-amber-800",
    chip: "bg-amber-100 text-amber-900",
  },
  churn: {
    bg: "bg-stone-50",
    ring: "ring-stone-200",
    title: "text-stone-700",
    chip: "bg-stone-100 text-stone-800",
  },
};

const data = [
  {
    key: "kickoff",
    label: "Kickoff & Onboarding",
    description: "Growth begins as we form the partnership and land first value.",
    items: [
      "New Customer Partnership Kickoff",
      "Account Transition",
      "Customer Onboarding",
      "Post-Sales Survey Follow-up",
      "Post-Onboarding Survey Follow-up",
      "Post-Onboarding Review",
    ],
  },
  {
    key: "adoption",
    label: "Adoption & Engagement",
    description: "Steady value building through objectives, engagement and releases.",
    items: [
      "Customer Objectives Review (COR)",
      "Executive Sponsor Engagement",
      "Marketing Engagement",
      "Product Release Playbook",
      "CES Survey Follow-up",
    ],
  },
  {
    key: "renewal",
    label: "Renewal & Growth",
    description: "Secure, expand, and plan budgets with the right stakeholders.",
    items: ["Budget Planning", "New Contact Engagement", "Renewal Management"],
  },
  {
    key: "churn",
    label: "Churn & Offboarding (Optional)",
    description: "If risk isn't mitigated: learn, close well, and feed insights forward.",
    items: [
      "Churn Customer Interview (if risk not mitigated)",
      "Churn Customer Offboarding",
    ],
  },
];

function Icon({ name }) {
  const size = 20;
  const stroke = 1.7;
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "shrink-0",
  };
  switch (name) {
    case "kickoff":
      return (
        <svg {...common}>
          <path d="M20 21v-7" />
          <path d="M4 21V8l8-5 8 5v4" />
          <path d="M12 3v18" />
        </svg>
      );
    case "adoption":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="M7 15l4-4 4 4 5-5" />
        </svg>
      );
    case "renewal":
      return (
        <svg {...common}>
          <path d="M21 12a9 9 0 1 1-9-9" />
          <path d="M21 3v9h-9" />
        </svg>
      );
    case "churn":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9l6 6M15 9l-6 6" />
        </svg>
      );
    default:
      return null;
  }
}

function StageCard({ stage, index }) {
  const styles = stageStyles[stage.key];
  const iconName = stage.key;

  return (
    <section
      className={`relative flex flex-col gap-4 rounded-2xl p-6 ring-1 ${styles.bg} ${styles.ring}`}
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-white/70 shadow-sm">
          <Icon name={iconName} />
        </div>
        <h3 className={`text-xl font-semibold ${styles.title}`}>
          {index + 1}. {stage.label}
        </h3>
      </div>
      <p className="text-sm text-stone-600 leading-relaxed">{stage.description}</p>
      <ul className="mt-1 grid gap-2">
        {stage.items.map((item, i) => (
          <li
            key={i}
            className={`w-full rounded-xl px-3 py-2 text-sm ${styles.chip} border border-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]`}
          >
            <span className="font-medium mr-2 align-middle">
              {String(i + 1).padStart(2, "0")}.
            </span>
            <span className="align-middle">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Legend() {
  const entries = [
    { key: "kickoff", label: "Kickoff & Onboarding" },
    { key: "adoption", label: "Adoption & Engagement" },
    { key: "renewal", label: "Renewal & Growth" },
    { key: "churn", label: "Churn & Offboarding" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      {entries.map((e) => (
        <div
          key={e.key}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ring-1 ${stageStyles[e.key].bg} ${stageStyles[e.key].ring}`}
        >
          <span
            className={`inline-block h-2 w-2 rounded-full ${stageStyles[
              e.key
            ].title.replace("text-", "bg-")}`}
          ></span>
          <span className="font-medium text-stone-700">{e.label}</span>
        </div>
      ))}
    </div>
  );
}

function InfinityTrack() {
  // Decorative figure-eight behind the cards
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-30"
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="33%" stopColor="#38bdf8" />
          <stop offset="66%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#78716c" />
        </linearGradient>
      </defs>
      <path
        d="M 100 300 C 250 100, 450 100, 600 300 S 950 500, 1100 300"
        fill="none"
        stroke="url(#g1)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M 1100 300 C 950 100, 750 100, 600 300 S 250 500, 100 300"
        fill="none"
        stroke="url(#g1)"
        strokeWidth="14"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CustomerLifecycleTimeline() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 font-sans">
      <header className="mb-8 flex flex-col gap-4">
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-stone-200 bg-white/70 px-3 py-1 text-xs text-stone-600 shadow-sm backdrop-blur">
          <span>Artisan Savant Consulting IP</span>
          <span aria-hidden>•</span>
          <span>Modular Playbooks</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900">
          Customer Lifecycle Journey Map
        </h1>
        <p className="max-w-3xl text-stone-600">
          A comprehensive lifecycle toolkit covering{" "}
          <span className="font-medium">
            Kickoff & Onboarding → Adoption & Engagement → Renewal & Growth →
            Churn & Offboarding
          </span>
          . Each playbook is modular and reusable.
        </p>
        <Legend />
      </header>

      <section className="relative">
        <InfinityTrack />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.map((stage, idx) => (
            <StageCard key={stage.key} stage={stage} index={idx} />
          ))}
        </div>
      </section>

      <footer className="mt-10 grid gap-3 text-sm text-stone-600">
        <div className="rounded-xl bg-white/70 p-4 ring-1 ring-stone-200 shadow-sm">
          <p className="mb-2 font-medium text-stone-800">Presentation Tips</p>
          <ul className="list-disc pl-5 grid gap-1">
            <li>
              Place the customer at the centre: <em>“Customer Value Delivered.”</em>
            </li>
            <li>Use the four stages to anchor 30/60/90 day plans and QBRs.</li>
            <li>Add milestone markers (TTV &lt; 14 days, renewal cycle, sponsor cadence).</li>
            <li>Feed learnings from Churn back into Kickoff to close the loop.</li>
          </ul>
        </div>
        <p className="text-xs">
          © {new Date().getFullYear()} Artisan Savant Floristry — Consulting Toolkit
        </p>
      </footer>
    </main>
  );
}
