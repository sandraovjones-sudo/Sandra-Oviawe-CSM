import React, { useMemo, useState, useEffect } from "react";
import CustomerLifecycleTimeline from "./components/CustomerLifecycleTimeline";
export default function App() {
  const [query, setQuery] = useState("");
  const chips = [
    "Onboarding",
    "Adoption",
    "Renewals",
    "Expansion",
    "Playbooks",
    "Enterprise",
    "AI & Scale",
    "Healthcare",
    "Telecom",
    "Workshops",
  ];

  const projects = useMemo(
    () => [
      {
        id: "as-micro-journey",
        title: "Micro‑Journey Map: monday.com × Artisan Savant",
        tags: ["Adoption", "AI & Scale", "Workshops"],
        role: "Tech CSM (Mock Consulting)",
        period: "2025",
        summary:
          "Designed a micro‑journey for a small business (Artisan Savant Floristry) to operationalise monday.com for CRM, projects, and content planning.",
        outcomes: [
          "Cut content‑production cycle time by 35% using templated automations & status boards.",
          "Increased weekly task throughput by 42% via 1→many training videos and SOP cards.",
          "Introduced value milestones with health‑scored check‑ins to trigger success plays.",
        ],
        details:
          "Assets: journey map, value milestones, Success Plan template, health score (leading signals), and a 12‑week adoption play. Shows I can package ‘product + process’ for quick wins.",
      },
      {
        id: "bj-kingspan",
        title: "Incident to Advocacy: BlueJeans × Kingspan",
        tags: ["Renewals", "Telecom", "Enterprise", "Workshops"],
        role: "Customer Success Manager — BlueJeans by Verizon",
        period: "2022–2024",
        summary:
          "Resolved buffering/audio and Adobe integration issues impacting executive broadcasts; turned a renewal risk into a referenceable advocate.",
        outcomes: [
          "MTTR down 60% through structured triage runbook and war‑room comms.",
          "NPS moved from 3 → 8 within a quarter after stability play + enablement.",
          "Secured 2‑year renewal with expansion to additional business units.",
        ],
        details:
          "Play used: ‘Stabilise → Educate → Expand’. I led root‑cause coordination with Support/Engineering, produced a no‑jargon exec update, then ran role‑based training. Closed loop with a QBR that highlighted value outcomes, not tickets.",
      },
      {
        id: "informa-value-comms",
        title: "Value Communication in Regulated Environments",
        tags: ["Healthcare", "Enterprise", "Adoption", "Renewals"],
        role: "Account Management / Customer Insights — Informa | Datamonitor Healthcare",
        period: "2016–2018",
        summary:
          "Drove usage of healthcare intelligence across pharma & NHS stakeholders with compliant enablement and ROI storytelling.",
        outcomes: [
          "Portfolio ARR influenced: £1.5M+ across global enterprise accounts.",
          "Built executive ‘Why Now’ briefs: usage heatmaps, time‑to‑insight, and saved analyst hours.",
          "Reduced time‑to‑first‑value from 30→10 days via guided pathways.",
        ],
        details:
          "Artifacts included a regulated‑friendly enablement pack, persona‑based decks, and a renewal pre‑mortem to surface blockers 120 days ahead of schedule.",
      },
      {
        id: "as-founder-xfn",
        title: "Founder Lens: CX, Ops & Storytelling at Artisan Savant Floristry",
        tags: ["AI & Scale", "Workshops", "Expansion"],
        role: "Founder — Artisan Savant Floristry (current)",
        period: "2024–present",
        summary:
          "Built repeatable playbooks for subscriptions, seasonal launches, and UGC content — transferable to B2B CS motions.",
        outcomes: [
          "3x launch framework (Tease → Teach → Transact) reusable across releases.",
          "DIY ‘value card’ method for mapping features to customer jobs & outcomes.",
          "Operational dashboards for fulfilment SLAs & churn‑risk signals.",
        ],
        details:
          "Demonstrates product‑led thinking, KPI hygiene, and narrative marketing — the same muscles that power enterprise adoption & expansion.",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.role.toLowerCase().includes(q)
    );
  }, [projects, query]);
// Active section highlighting
const [activeId, setActiveId] = useState("");

useEffect(() => {
  const ids = ["projects", "lifecycle", "playbooks", "experience"];
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActiveId(visible.target.id);
    },
    {
      root: null,
      rootMargin: "0px 0px -40% 0px",
      threshold: [0.2, 0.4, 0.6, 0.8],
    }
  );

  sections.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}, []);
  
  return (
    <main className="min-h-screen w-full bg-stone-50 text-stone-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-14 pb-10">
          <div className="grid gap-8 md:grid-cols-[1.4fr,1fr] items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                Sandra Oviawe
              </h1>
              <p className="mt-2 text-lg md:text-xl opacity-90">
                Customer Success Leader who thinks outside the box — and then labels the box, builds a playbook for it, and ships it on time.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
  <a
    href="#projects"
    aria-current={activeId === "projects" ? "page" : undefined}
    className={
      activeId === "projects"
        ? "rounded-2xl px-4 py-2 bg-stone-900 text-stone-50 transition"
        : "rounded-2xl px-4 py-2 bg-stone-200 hover:bg-stone-300 transition"
    }
  >
    Explore projects
  </a>

  <a
    href="#lifecycle"
    aria-current={activeId === "lifecycle" ? "page" : undefined}
    className={
      activeId === "lifecycle"
        ? "rounded-2xl px-4 py-2 bg-stone-900 text-stone-50 transition"
        : "rounded-2xl px-4 py-2 bg-stone-200 hover:bg-stone-300 transition"
    }
  >
    Lifecycle Journey
  </a>

  <a
    href="#playbooks"
    aria-current={activeId === "playbooks" ? "page" : undefined}
    className={
      activeId === "playbooks"
        ? "rounded-2xl px-4 py-2 bg-stone-900 text-stone-50 transition"
        : "rounded-2xl px-4 py-2 bg-stone-200 hover:bg-stone-300 transition"
    }
  >
    Tailored playbooks
  </a>

  <a
    href="#experience"
    aria-current={activeId === "experience" ? "page" : undefined}
    className={
      activeId === "experience"
        ? "rounded-2xl px-4 py-2 bg-stone-900 text-stone-50 transition"
        : "rounded-2xl px-4 py-2 bg-stone-200 hover:bg-stone-300 transition"
    }
  >
    Experience
  </a>
</div>

              <div className="mt-6 text-sm opacity-80">
                Suffolk, UK • SaaS • Healthcare • Pharma • Telecom • Enterprise & SMB
              </div>
            </div>
            <div className="md:justify-self-end">
              <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
                <h3 className="font-medium text-xl">Signature strengths</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                  <li>• Value‑based onboarding that lands first meaningful outcome quickly</li>
                  <li>• 1→many programmes & AI‑assisted enablement at scale</li>
                  <li>• Renewal risk pre‑emption with health signals & success plays</li>
                  <li>• Executive storytelling (QBRs) anchored on business impact</li>
                  <li>• Cross‑functional ‘war‑room’ for incidents → advocacy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTED SUBJECTS / FILTERS */}
      <section id="subjects" className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium">Highlighted subjects:</span>
            {chips.map((c) => (
              <button
                key={c}
                className="rounded-full border border-stone-300 px-3 py-1 text-sm hover:bg-stone-100"
                onClick={() => setQuery(c)}
              >
                {c}
              </button>
            ))}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tags, roles, projects…"
              className="ml-auto w-full md:w-72 rounded-full border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
            />
          </div>
        </div>
      </section>

      {/* PROJECTS WITH POP‑OUT TABS */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Pop‑out project tabs</h2>
          <p className="mt-2 text-stone-600">
            Click any tab to expand the case study and see outcomes, artefacts, and the play used.
          </p>
        </div>

        <div className="grid gap-4">
          {filtered.map((p) => (
            <details key={p.id} className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm open:shadow-md">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-medium">{p.title}</h3>
                  <div className="mt-1 text-sm text-stone-600">
                    <span className="font-medium">{p.role}</span> • {p.period}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="rounded-full border border-stone-300 px-3 py-1 text-xs text-stone-600 group-open:bg-stone-900 group-open:text-white">Open</span>
              </summary>
              <div className="mt-4 grid gap-3 text-sm leading-relaxed">
                <p className="text-stone-800">{p.summary}</p>
                <ul className="list-disc pl-5">
                  {p.outcomes.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
                <div className="rounded-xl bg-stone-50 p-4 text-stone-700">
                  <span className="text-[13px] font-medium">Notes & artefacts: </span>
                  {p.details}
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-6 text-xs text-stone-500">
        </div>
      </section>
            {/* LIFECYCLE MAP */}
      <section id="lifecycle" className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Customer Lifecycle Journey Map
          </h2>
          <p className="mt-2 text-stone-600">
            Kickoff & Onboarding → Adoption & Engagement → Renewal & Growth → Churn & Offboarding.
            Modular, reusable playbooks you can present as consulting IP.
          </p>
        </div>
        <CustomerLifecycleTimeline />
      </section>

      {/* TAILORED PLAYBOOKS */}
      <section id="playbooks" className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <h2 className="text-2xl md:text-3xl font-semibold">Tailored enterprise playbooks</h2>
          <p className="mt-2 max-w-3xl text-stone-600">
            A sampler of modular plays I tailor to industry, segment, and product maturity. Swap in customer language, define value milestones, wire in alerts, then measure.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {[
              {
                name: "Onboarding → First Value (TTV < 14 days)",
                bullets: [
                  "Milestones by persona (Admin, Champion, End‑user)",
                  "Guided paths + in‑product checklists",
                  "Slack/Email nudges keyed to usage events",
                ],
              },
              {
                name: "Adoption Flywheel",
                bullets: [
                  "Quarterly use‑case sprints",
                  "Internal champions guild (office hours + templates)",
                  "Feature‑to‑Outcome mapping for execs",
                ],
              },
              {
                name: "Renewal Pre‑Mortem",
                bullets: [
                  "120‑day risk scan (support, product, finance signals)",
                  "Action owners & comms plan",
                  "QBR narrative on outcomes, not activities",
                ],
              },
              {
                name: "Expansion Plays",
                bullets: [
                  "Land‑and‑expand triggers (license caps, adjacent teams)",
                  "ROI briefs & customer stories",
                  "Pilot‑to‑Production motion with clear exit criteria",
                ],
              },
              {
                name: "AI‑Assisted Scale",
                bullets: [
                  "1→many academies, snippets, and auto‑play triggers",
                  "Predictive health score with leading indicators",
                  "CSM ‘cockpit’ dashboard for daily focus",
                ],
              },
              {
                name: "Incident → Advocacy",
                bullets: [
                  "War‑room cadence & roles",
                  "Root‑cause read‑outs for execs (no jargon)",
                  "Post‑mortem → enablement → reference ask",
                ],
              },
            ].map((pb) => (
              <div key={pb.name} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-medium">{pb.name}</h3>
                <ul className="mt-3 list-disc pl-5 text-sm">
                  {pb.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold">Experience (abridged)</h2>
        <div className="mt-6 grid gap-4">
          {[ 
            {
              role: "Customer Success Manager",
              org: "BlueJeans by Verizon",
              when: "2022–2024",
              blurb: "Owned enterprise relationships, led incident‑to‑advocacy motions, and drove renewals/expansion through outcomes‑first enablement.",
            },
            {
              role: "Account Management / Customer Insights",
              org: "Informa | Datamonitor Healthcare",
              when: "2016–2018",
              blurb: "Supported highly regulated Healthcare clients (incl. Biotec, Medtec and pharma) with adoption, ROI storytelling, and executive value communication.",
            },
            {
              role: "Founder & Creative Director",
              org: "Artisan Savant Floristry (current)",
              when: "2024–present",
              blurb: "Built repeatable growth plays, CX operations, and content engines; hands‑on proof I can design systems, not just slides.",
            },
          ].map((e) => (
            <div key={e.org} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-medium">{e.role} — {e.org}</h3>
                <span className="text-sm text-stone-600">{e.when}</span>
              </div>
              <p className="mt-2 text-sm text-stone-700">{e.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-6 md:grid-cols-[1.5fr,1fr] items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">Shall we build something brilliant?</h2>
              <p className="mt-2 text-stone-600">
                I’m open to CSM roles (Enterprise/Strategic or Scaled) and CS Ops opportunities. Let’s talk about adoption, renewals, and clever growth.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="/cv.pdf" className="rounded-2xl bg-stone-900 px-4 py-2 text-stone-50">Download CV (PDF)</a>
                <a aria-label="Email Sandra at sandra.ov.jones@gmail.com"
   href="mailto:sandra.ov.jones@gmail.com"
   className="rounded-2xl border border-stone-300 px-4 py-2">Email</a>
                <a href="https://www.linkedin.com/in/sandraovjones/" target="_blank" rel="noreferrer" className="rounded-2xl border border-stone-300 px-4 py-2">Portfolio</a>
              </div>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <h3 className="text-lg font-medium">References & proof</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-stone-700">
                <li>QBR deck samples (sanitised)</li>
                <li>Success Plan & Playbook templates</li>
                <li>Journey maps & academy outlines</li>
                <li>Case study one‑pagers</li>
              </ul>
              <p className="mt-3 text-xs text-stone-500">Available on request or via private link.</p>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-stone-500">
            © {new Date().getFullYear()} Sandra Oviawe • Built with a cup of tea and a tidy playbook.
          </p>
        </div>
      </section>
    </main>
  );
}
