import { useEffect, useRef, useState } from "react";

const PROGRAMS = [
  {
    id: "simulation",
    title: "Customer Success Leadership Simulation",
    subtitle:
      "30-day enterprise simulation across 15 accounts (£/$4.9M ARR), producing 30+ Director-level artefacts: success plans, health-score dashboards, renewal forecasts, and QBR decks.",
    url: "https://cs-program-site.vercel.app/",
    badge: "Vercel",
  },
];

export default function CSShowcase() {
  const [active, setActive] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const iframeRef = useRef(null);

  // Close with ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") closePreview();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openPreview = (p) => {
    setActive(p);
    setIsOpen(true);
    document.documentElement.style.overflow = "hidden"; // lock scroll
  };

  const closePreview = () => {
    setIsOpen(false);
    setActive(null);
    document.documentElement.style.overflow = ""; // restore scroll
  };

  return (
    <section id="featured" className="mx-auto max-w-6xl px-4 py-12">
      {/* Section Header */}
      <div className="mb-8 grid gap-3">
        <h2 className="text-3xl font-semibold tracking-tight">Featured Projects</h2>
        <p className="text-stone-600 w-full whitespace-nowrap overflow-hidden text-ellipsis">
  live workspace demonstrating outcome-led CS in action — 30 days, £/$4.9M ARR, 30+ director-level artefacts.
</p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 auto-rows-fr">
        {PROGRAMS.map((p) => (
          <article
            key={p.id}
            className="group rounded-2xl border border-stone-200 bg-white/70 shadow-sm ring-1 ring-stone-200/50 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="text-lg font-semibold text-stone-900">{p.title}</h3>
                {p.subtitle && <p className="mt-1 text-sm text-stone-600">{p.subtitle}</p>}
              </div>
              {p.badge && (
                <span className="ml-3 shrink-0 rounded-full border border-stone-200 px-3 py-1 text-xs font-medium text-stone-700">
                  {p.badge}
                </span>
              )}
            </div>

            {/* Live preview (inline) */}
            <div className="relative overflow-hidden rounded-b-2xl">
              <iframe
                ref={iframeRef}
                title={`${p.title} – preview`}
                src={p.url}
                loading="lazy"
                className="h-[320px] w-full border-t border-stone-100"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button
                  onClick={() => openPreview(p)}
                  className="rounded-xl bg-stone-900 px-3 py-2 text-xs font-medium text-white hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
                >
                  Open live preview
                </button>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-white px-3 py-2 text-xs font-medium text-stone-800 ring-1 ring-stone-200 hover:bg-stone-50"
                >
                  Open in new tab
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {isOpen && active && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closePreview} />

          <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3">
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-stone-900">{active.title}</h3>
                {active.subtitle && <p className="truncate text-xs text-stone-600">{active.subtitle}</p>}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={active.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-stone-900 px-3 py-2 text-xs font-medium text-white hover:bg-stone-800"
                >
                  Open in new tab
                </a>
                <button
                  onClick={closePreview}
                  aria-label="Close preview"
                  className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-800 hover:bg-stone-50"
                >
                  Close
                </button>
              </div>
            </div>

           <iframe
  ref={iframeRef}
  title={`${p.title} – preview`}
  src={p.url}
  loading="lazy"
  className="w-full rounded-b-2xl border-t border-stone-100 h-[380px] md:h-[460px] lg:h-[65vh]"
  // allow links & new tabs from inside the iframe
  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
/>
          </div>
        </div>
      )}
    </section>
  );
}
