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
  {
    id: "academy",
    title: "Customer Success Leadership Academy",
    subtitle:
      "A practical lab hosted on Lovable—playbooks, templates, and tutorials that help customers achieve outcomes, not just adopt features.",
    url: "https://preview--cs-leader-lab.lovable.app/",
    badge: "Lovable",
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
      <div clas
