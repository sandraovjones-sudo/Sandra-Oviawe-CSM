import React, { useMemo, useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import AccountsTable from "./components/AccountsTable";
import CSShowcase from "./components/CSShowcase";
import EarlyWarningCSDashboard from "./components/EarlyWarningCSDashboard";

export default function App() {
  const [activeId, setActiveId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [query, setQuery] = useState("");

  // -----------------------------
  // PROJECTS DATA
  // -----------------------------
  const projects = useMemo(
    () => [
      {
        id: "as-micro-journey",
        title:
          "Predictive Onboarding Journey: BlueJeans by Verizon x Freshfields",
        tags: ["Adoption", "Onboarding", "Predictive Analytics", "AI & Scale"],
        role:
          "Customer Success Manager — BlueJeans by Verizon- Tech (Enterprise SaaS)",
        period: "2024",
        summary:
          "Designed a predictive onboarding framework for Freshfields to accelerate client enablement and forecast engagement health across global legal teams using AI-assisted analytics.",
        outcomes: [
          "Reduced onboarding cycle by 41% through automation of workflow mapping and milestone tracking in Gainsight and Micro",
          "Delivered data-driven Success Plans mapping each client’s communication objectives to measurable outcomes (meeting adoption rate, collaboration ROI).",
          "Delivered data-driven Success Plans with value-based milestones that connected contract terms to measurable outcomes (billable efficiency, client collaboration speed).",
          "Partnered with Product and Customer Insights teams to forecast adoption probability an
