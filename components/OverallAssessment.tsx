"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  FileText,
  Settings,
  ShieldCheck,
  Database,
  ShoppingBag,
  Handshake,
  CheckCircle,
  ArrowRight,
  Target,
} from "lucide-react";

const gapData = [
  {
    id: 1,
    name: "Executive Summary",
    status: "yellow",
    have: "Core translator story low-data",
    need: "1-page investor version with ask R? for 8 hubs",
  },
  {
    id: 2,
    name: "Company Description & Legal",
    status: "red",
    have: "OpenKM concept",
    need: "PTY registration, BEE, City partnership model, Checkers MOU template, insurance public liability + battery fire",
  },
  {
    id: 3,
    name: "Market Analysis",
    status: "red",
    have: "Gordon's Bay side roads observation",
    need: "TAM/SAM/SOM: GB population, Constantia tourist 500k/yr, Kirstenbosch 1M/yr, UCT 30k students, Sixty60 market size, competitor analysis (UpCycles, Aevon, Bolt, Uber), Eskom load shedding impact",
  },
  {
    id: 4,
    name: "Customer Segments & Personas",
    status: "yellow",
    have: "Feeder 0.8-2km, tourist wine route, Sixty60 driver",
    need: "Personas: Mama with groceries S tag, Student M/L tag max weight 150kg, Tourist couple SleekSlider, Checkers manager",
  },
  {
    id: 5,
    name: "Products & Services",
    status: "green",
    have: "Triple Fleet HillClimber/CiTiDriver/SleekSlider, Tannus limits, comfort + storage hire menus R30-70, TapCard DropBox inclusive lock",
    need: "Complete — No gaps",
  },
  {
    id: 6,
    name: "Marketing & Sales Strategy",
    status: "red",
    have: "Tourist R450 day includes wine crate",
    need: "Go-to-market: Checkers till flyer, Airbnb host referral R50, Instagram Kirstenbosch protea, Sixty60 driver incentive, pricing R12.50 feeder vs R450 day, sales funnel TapCard R80 keepsake",
  },
  {
    id: 7,
    name: "Operations Plan",
    status: "green",
    have: "Equipment Journal per station R154k, Station2Station S2S QR out/in min 3 bikes guard, SOP 06:00/14:00 swap, Time Controller training",
    need: "Complete — No gaps",
  },
  {
    id: 8,
    name: "Technology & Intranet",
    status: "green",
    have: "ESP32-S3 AI chip wet grip, 802.11s mesh, DFL, bike as data mule, Faraday labyrinth",
    need: "Architecture diagram for POPIA compliance",
  },
  {
    id: 9,
    name: "Financials",
    status: "yellow",
    have: "5-year TCO per bike R21,595 base R10,095 net after hire R2.87/km, capex per station R154k",
    need: "Full P&L 5yr 8 hubs, cash flow monthly yr1, break-even rides/day, funding ask, side-road fund 20%, sensitivity analysis max weight take rate 10% vs 30%",
  },
  {
    id: 10,
    name: "Team & Org",
    status: "red",
    have: "Time Controller role",
    need: "Org chart: Adrian Ops Manager, tech lead mesh, 2 controllers per hub, advisor City, hiring plan",
  },
  {
    id: 11,
    name: "Risk Analysis",
    status: "yellow",
    have: "Thermal, loss, mesh down, max weight",
    need: "Formal register with likelihood impact mitigation insurance",
  },
  {
    id: 12,
    name: "Impact & Sustainability",
    status: "yellow",
    have: "Km saved + m2 patched",
    need: "ESG metrics: CO2 saved vs car, blackout resilience hours, community jobs created, BEE score",
  },
  {
    id: 13,
    name: "Appendix",
    status: "green",
    have: "Pitch deck 16 slides, Equipment Journal, S2S Control, Integration blueprint, Implementation 90-day plan",
    need: "MOUs, safety checklist laminated, insurance certs",
  },
];

const immediateTodo = [
  {
    area: "Market",
    icon: TrendingUp,
    tasks:
      "Pull StatsSA GB population, SANParks Kirstenbosch visitor numbers, Constantia wine route tourist numbers, Sixty60 avg orders per Checkers",
  },
  {
    area: "Legal",
    icon: FileText,
    tasks:
      "Draft Checkers hub MOU 1-pager, City partnership proposal, public liability quote, battery fire SOP for City",
  },
  {
    area: "Financial model",
    icon: Database,
    tasks:
      "Build 5yr P&L for 8 hubs in Sheet — inputs rides/day per hub, hire take rate, battery cycles, odo, output cash flow break-even month",
  },
  {
    area: "Marketing",
    icon: ShoppingBag,
    tasks:
      "3 flyers — feeder R12.50, tourist SleekSlider R450, Sixty60 driver R25 box, plus Airbnb host pack",
  },
  {
    area: "Team",
    icon: Handshake,
    tasks: "Write Time Controller JD + training manual",
  },
  {
    area: "Impact",
    icon: ShieldCheck,
    tasks:
      "CO2 calc — 2km car = 0.4kg CO2, 1250 rides/yr = 500kg saved per bike",
  },
];

const documentOutline = [
  "Cover",
  "Exec Summary",
  "Market",
  "Product (Fleet Triple + Hire)",
  "Operations (Equipment Journal + S2S)",
  "Technology (Intranet)",
  "Marketing",
  "Team",
  "Financials",
  "Risk",
  "Impact",
  "Appendix",
];

function StatusBadge({ status }: { status: string }) {
  const styles = {
    green: {
      bg: "bg-[#16a34a]",
      label: "Complete",
      Icon: CheckCircle2,
      light: "bg-[#dcfce7] text-[#166534] border-[#bbf7d0]",
    },
    yellow: {
      bg: "bg-[#eab308]",
      label: "Partial",
      Icon: AlertTriangle,
      light: "bg-[#fef9c3] text-[#854d0e] border-[#fde68a]",
    },
    red: {
      bg: "bg-[#ef4444]",
      label: "Missing",
      Icon: XCircle,
      light: "bg-[#fee2e2] text-[#991b1b] border-[#fecaca]",
    },
  }[status as "green" | "yellow" | "red"];

  if (!styles) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border ${styles.light}`}
    >
      <span className={`w-2 h-2 rounded-full ${styles.bg}`}></span>
      {styles.label.toUpperCase()}
    </div>
  );
}

export default function OverallAssessment() {
  const greenCount = gapData.filter((r) => r.status === "green").length;
  const yellowCount = gapData.filter((r) => r.status === "yellow").length;
  const redCount = gapData.filter((r) => r.status === "red").length;

  return (
    <div className="min-h-screen w-full font-sans antialiased bg-[#FDF0E3] rounded-2xl overflow-hidden shadow-sm border border-[#cbd5e1]">
      <header className="w-full bg-[#3F5B75]">
        <div className="max-w-[1160px] mx-auto px-5 md:px-8 py-7 md:py-9 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#FDF0E3] flex items-center justify-center text-[#3F5B75] font-bold text-[16px]">
                B
              </div>
              <span className="text-[#FDF0E3]/70 text-[11px] font-semibold tracking-[0.18em] uppercase">
                Cape Mobility — Internal
              </span>
            </div>
            <h1 className="text-[32px] md:text-[44px] leading-[0.95] text-[#FDF0E3] font-normal tracking-tight font-serif">
              Full Business Plan{" "}
              <span className="italic opacity-80 font-serif">
                — Gap Analysis
              </span>
            </h1>
            <p className="text-[#FDF0E3]/70 text-[13px] md:text-[14px] mt-3 max-w-[520px] leading-[1.5]">
              What you have locked vs what is still needed for a bankable 8-hub
              plan. 13 sections audited.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1.5">
              <div className="w-7 h-7 rounded-full border-2 border-[#3F5B75] bg-[#16a34a] flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="w-7 h-7 rounded-full border-2 border-[#3F5B75] bg-[#eab308] flex items-center justify-center">
                <AlertTriangle className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="w-7 h-7 rounded-full border-2 border-[#3F5B75] bg-[#ef4444] flex items-center justify-center">
                <XCircle className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <div className="text-[11px] text-[#FDF0E3]/60 leading-[1.2]">
              Traffic light
              <br />
              audit
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1160px] mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="rounded-[18px] border border-[#3F5B75]/10 bg-white shadow-sm overflow-hidden mb-8">
          <div className="px-5 md:px-7 py-6 md:py-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="font-bold text-[13px] tracking-[0.12em] uppercase text-[#3F5B75]">
                  Progress
                </h2>
                <span className="h-px w-10 bg-[#3F5B75]/20"></span>
                <span className="text-[11px] font-medium text-[#16726E] bg-[#16726E]/10 px-2 py-0.5 rounded-full border border-[#16726E]/20">
                  Audited Today
                </span>
              </div>
              <div className="flex items-baseline gap-3 mb-3">
                <div className="text-[48px] md:text-[56px] leading-none tracking-tight text-[#3F5B75] font-serif">
                  65%
                </div>
                <div className="text-[15px] font-semibold text-[#3F5B75]/80">
                  Complete
                </div>
                <div className="hidden md:flex items-center gap-2 ml-4 text-[12px] text-[#3F5B75]/60">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#16a34a]"></span>
                    {greenCount} done
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#eab308]"></span>
                    {yellowCount} partial
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
                    {redCount} missing
                  </span>
                </div>
              </div>
              <div className="relative h-[14px] w-full rounded-full bg-[#FDF0E3] border border-[#3F5B75]/10 overflow-hidden p-1">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: "65%",
                    background:
                      "linear-gradient(90deg, #16726E 0%, #3F5B75 100%)",
                  }}
                ></div>
                <div className="absolute inset-0 flex">
                  {[33, 66].map((r) => (
                    <div
                      key={r}
                      className="h-full w-px bg-white/60"
                      style={{ marginLeft: `${r}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:w-[380px] shrink-0">
              <div className="rounded-[12px] bg-[#FDF0E3] border border-[#3F5B75]/10 p-4">
                <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#3F5B75]/70 mb-2.5 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#16726E]" /> You
                  Have Locked
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Fleet Triple",
                    "Safety SOP",
                    "TCO R21,595",
                    "Hire R30-70",
                    "Equipment Journal R154k",
                    "Station2Station QR",
                    "Intranet ESP32-S3",
                    "Implementation 90d",
                    "Pitch Deck 16 slides",
                  ].map((r) => (
                    <span
                      key={r}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-[#3F5B75]/15 text-[#3F5B75] font-medium shadow-sm"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-[22px] md:text-[26px] text-[#3F5B75] tracking-tight font-serif">
              Full Business Plan Structure
            </h2>
            <span className="text-[11px] font-semibold tracking-wide uppercase text-[#3F5B75]/50 border border-[#3F5B75]/15 rounded-full px-2.5 py-1 bg-white">
              13 sections
            </span>
          </div>

          <div className="hidden md:block rounded-[16px] border border-[#3F5B75]/10 bg-white overflow-hidden shadow-sm">
            <div className="grid grid-cols-[200px_110px_1.1fr_1.3fr] bg-[#3F5B75] text-[#FDF0E3] text-[11px] font-bold tracking-[0.1em] uppercase">
              <div className="px-5 py-3.5">Section</div>
              <div className="px-4 py-3.5">Status</div>
              <div className="px-4 py-3.5">What You Have</div>
              <div className="px-5 py-3.5">What Still Needed</div>
            </div>
            <div className="divide-y divide-[#3F5B75]/10">
              {gapData.map((r) => (
                <div
                  key={r.id}
                  className="grid grid-cols-[200px_110px_1.1fr_1.3fr] items-start text-[13px] leading-[1.45] hover:bg-[#FDF0E3]/60 transition-colors"
                >
                  <div className="px-5 py-4">
                    <div className="flex gap-2.5">
                      <span className="font-mono text-[11px] text-[#3F5B75]/40 mt-0.5">
                        {String(r.id).padStart(2, "0")}
                      </span>
                      <span className="font-semibold text-[#3F5B75] leading-[1.3]">
                        {r.name}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-4">
                    <StatusBadge status={r.status} />
                  </div>
                  <div className="px-4 py-4 text-[#3F5B75]/80">{r.have}</div>
                  <div className="px-5 py-4">
                    {r.need.includes("Complete") ? (
                      <span className="inline-flex items-center gap-1.5 text-[#16726E] font-semibold bg-[#16726E]/10 px-2.5 py-1 rounded-full text-[12px] border border-[#16726E]/15">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {r.need}
                      </span>
                    ) : (
                      <span className="text-[#3F5B75]">{r.need}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden space-y-3">
            {gapData.map((r) => (
              <div
                key={r.id}
                className="rounded-[14px] border border-[#3F5B75]/10 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex gap-2.5">
                    <span className="font-mono text-[11px] text-[#3F5B75]/40 mt-0.5">
                      {String(r.id).padStart(2, "0")}
                    </span>
                    <span className="font-semibold text-[#3F5B75] text-[14px] leading-[1.3]">
                      {r.name}
                    </span>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                <div className="grid grid-cols-2 gap-3 text-[12px] leading-[1.5]">
                  <div>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-[#3F5B75]/40 mb-1">
                      Have
                    </div>
                    <div className="text-[#3F5B75]/80">{r.have}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-[#3F5B75]/40 mb-1">
                      Still Needed
                    </div>
                    <div
                      className={
                        r.need.includes("Complete")
                          ? "text-[#16726E] font-semibold"
                          : "text-[#3F5B75]"
                      }
                    >
                      {r.need}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-6">
          <div className="rounded-[16px] border border-[#3F5B75]/10 bg-white shadow-sm overflow-hidden">
            <div className="px-5 md:px-6 py-5 flex items-center justify-between border-b border-[#3F5B75]/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[9px] bg-[#3F5B75] text-white flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[14px] text-[#3F5B75] tracking-tight">
                    Immediate To-Do to Close Gaps
                  </h3>
                  <p className="text-[11px] text-[#3F5B75]/60 font-medium">
                    Next 14 days — critical path
                  </p>
                </div>
              </div>
              <span className="hidden md:inline-flex text-[11px] font-bold tracking-wide uppercase bg-[#FDF0E3] border border-[#3F5B75]/10 text-[#3F5B75] px-2.5 py-1 rounded-full">
                6 tasks
              </span>
            </div>
            <div className="p-3 md:p-4 space-y-2.5">
              {immediateTodo.map((r) => (
                <div
                  key={r.area}
                  className="group rounded-[12px] border border-[#3F5B75]/10 bg-[#FDF0E3]/50 hover:bg-[#FDF0E3] transition-colors p-3.5 flex gap-3.5"
                >
                  <div className="shrink-0 w-8 h-8 rounded-[8px] bg-white border border-[#3F5B75]/10 flex items-center justify-center text-[#16726E] group-hover:bg-[#16726E] group-hover:text-white transition-colors">
                    <r.icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[12px] font-bold text-[#3F5B75] tracking-wide uppercase">
                        {r.area}
                      </span>
                      <span className="w-3.5 h-px bg-[#3F5B75]/20 hidden md:block"></span>
                    </div>
                    <p className="text-[12.5px] leading-[1.5] text-[#3F5B75]/80">
                      {r.tasks}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[16px] overflow-hidden border border-[#3F5B75]/10 bg-[#3F5B75] text-[#FDF0E3] shadow-sm flex flex-col">
            <div className="px-5 md:px-6 py-5">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-[#FDF0E3]/70" />
                <h3 className="font-bold text-[13px] tracking-[0.12em] uppercase text-[#FDF0E3]/80">
                  Document Outline for Investor
                </h3>
              </div>
              <p className="text-[20px] leading-[1.1] mt-2 font-serif">
                Bankable plan flow
              </p>
            </div>
            <div className="px-3 pb-3 flex-1">
              <div className="rounded-[12px] bg-[#FDF0E3] p-2.5 h-full">
                <ol className="space-y-1">
                  {documentOutline.map((r, l) => (
                    <li
                      key={r}
                      className="flex items-center gap-3 rounded-[8px] px-3 py-2.5 bg-white border border-[#3F5B75]/10 text-[#3F5B75] text-[13px] font-medium leading-[1.2] hover:border-[#16726E]/30 transition-colors"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#3F5B75] text-[#FDF0E3] flex items-center justify-center text-[11px] font-mono font-bold shrink-0">
                        {l + 1}
                      </span>
                      <span className="flex-1">{r}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#3F5B75]/30" />
                    </li>
                  ))}
                </ol>
                <div className="mt-3 mx-1 rounded-[10px] bg-[#16726E] text-[#FDF0E3] p-3 flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    ⚡
                  </div>
                  <div className="text-[11.5px] leading-[1.5]">
                    <span className="font-bold tracking-wide uppercase">
                      Order logic:
                    </span>{" "}
                    Story → Proof → Math → Moat. Fleet + S2S = operational
                    proof, TCO + P&L = investor math, Mesh = defensibility.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[14px] border border-[#16726E]/20 bg-[#16726E] text-[#FDF0E3] px-5 md:px-7 py-5 md:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="flex gap-3.5">
            <div className="hidden md:flex w-10 h-10 rounded-[10px] bg-white/15 items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-[11px] tracking-[0.14em] uppercase opacity-70 mb-1">
                Final Push
              </div>
              <p className="text-[18px] md:text-[20px] leading-[1.25] max-w-[620px] font-serif">
                You are{" "}
                <span className="underline decoration-white/40 decoration-2 underline-offset-4">
                  2 weeks from full bankable plan
                </span>{" "}
                — financial model + market numbers are the critical missing.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="flex-1 md:flex-none rounded-full bg-white text-[#16726E] px-4 py-2.5 text-[12px] font-bold flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse"></span>{" "}
              Critical: P&L + TAM
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
