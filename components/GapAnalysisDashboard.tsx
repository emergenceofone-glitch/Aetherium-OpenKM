"use client";

import React, { useState } from "react";
import {
  FileText,
  TrendingUp,
  Package,
  Database,
  CheckCircle2,
  ShoppingBag,
  Handshake,
  Award,
  Calendar,
  ShieldAlert,
  ArrowRight,
  Play,
  CheckCircle,
  Target,
  Box,
  TriangleAlert,
} from "lucide-react";

const documents = [
  {
    id: "openkm_pitch",
    title: "Pitch Deck v5",
    meta: "17 slides",
    desc: "Market + Fleet Triple + Safety + Hire Add-Ons + Intranet Integration + Pilot + Ask",
    status: "Ready",
    tag: "Deck",
    icon: FileText,
  },
  {
    id: "OpenKM_Financial_Model_8_Hubs.xlsx",
    title: "Financial Model 8 Hubs",
    meta: "Excel • 5yr P&L",
    desc: "Monthly Year1, Break-even 0.73 rides/bike/day, Funding Ask R1.68M",
    status: "Bankable",
    tag: "Model",
    icon: TrendingUp,
  },
  {
    id: "equipment_journal",
    title: "Equipment Journal",
    meta: "per Station • R154k capex",
    desc: "QR tagged assets, lifecycle, maintenance log, TCO tracking",
    status: "Live",
    tag: "Ops",
    icon: Package,
  },
  {
    id: "station2station",
    title: "Station2Station Inventory",
    meta: "S2S Control",
    desc: "QR out/in, min 3 bikes guard, transfer ledger S2S-001",
    status: "Live",
    tag: "Ops",
    icon: Box,
  },
  {
    id: "intranet_integration",
    title: "Community Intranet Blueprint",
    meta: "D.A.T.A.H. Mesh",
    desc: "Bike as data mule, 802.11s, Mediator model battery priority",
    status: "Ready",
    tag: "Tech",
    icon: Database,
  },
  {
    id: "hire_addons",
    title: "Hire Menus",
    meta: "Comfort + Storage",
    desc: "MIK HD 27kg • R30-70/ride • TCO R2.87/km • 60-sec fit",
    status: "Ready",
    tag: "Revenue",
    icon: ShoppingBag,
  },
  {
    id: "mou_pagers",
    title: "MOU 1-Pagers",
    meta: "Checkers + City",
    desc: "GB1 Beach Rd site, insurance cert, safety checklist attached",
    status: "Ready",
    tag: "Legal",
    icon: Handshake,
  },
  {
    id: "overall_assessment",
    title: "Overall Assessment",
    meta: "Grade A • 9/10",
    desc: "Investment ready, risk mitigated, pilot validated",
    status: "Signed",
    tag: "Review",
    icon: Award,
  },
  {
    id: "implementation_plan",
    title: "Implementation Plan",
    meta: "90d to pilot • 12mo scale",
    desc: "8 hubs rollout, recruitment, fabrication, mesh commissioning",
    status: "Ready",
    tag: "Plan",
    icon: Calendar,
  },
  {
    id: "full_business_plan_gap",
    title: "Full Gap Analysis",
    meta: "65% → 100%",
    desc: "Closure plan for remaining gaps, compliance, permits",
    status: "Closed",
    tag: "Analysis",
    icon: ShieldAlert,
  },
];

const week1Actions = [
  {
    day: "Day 1",
    owner: "Adrian",
    task: "Sign Checkers GB1 Beach Rd MOU",
    detail: "Provide insurance cert + DropBox safety checklist",
    icon: Handshake,
  },
  {
    day: "Day 1-2",
    owner: "Adrian / Procurement",
    task: "Order 5 bikes + 8 batteries",
    detail:
      "2 HillClimber 85Nm Cargo Tannus 130kg + 2 CiTiDriver 65Nm + 1 SleekSlider belt tan-wall + 8x 500/625Wh",
    icon: Package,
  },
  {
    day: "Day 2-3",
    owner: "Fabricator",
    task: "Fabricate 8 DropBoxes",
    detail:
      "Faraday labyrinth 86x2mm 90° bend + IR + Last Tap Receiver + timber clad, charging cabinets IP54 max 2 + smoke + CO2",
    icon: Box,
  },
  {
    day: "Day 3-4",
    owner: "Tech Lead",
    task: "Flash ESP32-S3 mesh firmware",
    detail:
      "802.11s D.A.T.A.H. mesh on 8 nodes, test ping <50ms, load Mediator model battery priority",
    icon: Database,
  },
  {
    day: "Day 4-5",
    owner: "Ops",
    task: "Procure hire inventory",
    detail:
      "2x wide saddle 185mm, 2x Kinekt post, 4x gel, 2x wing grips, 2x Sixty60 40L, 2x panniers, 3x wine crate, 2x leather, 2x top box 30L",
    icon: ShoppingBag,
  },
  {
    day: "Day 5-6",
    owner: "HR / Adrian",
    task: "Recruit 2 Time Controllers",
    detail:
      "Training SOP battery swap 06:00/14:00, weight gate S/M/L 150kg/110kg, 60-sec comfort fit, QR out/in, first aid",
    icon: Award,
  },
  {
    day: "Day 6-7",
    owner: "Ops Team",
    task: "Install GB1 hub",
    detail:
      "QR tag all assets, load Equipment Journal + S2S ledger SQLite, hub tablet PN532 reader live, test TapCard R80 keepsake tourist",
    icon: CheckCircle2,
  },
  {
    day: "Day 7",
    owner: "All",
    task: "Soft launch 10 rides",
    detail: "Log odo + battery temp + mesh uptime, photo for City report",
    icon: Play,
  },
];

export default function GapAnalysisDashboard() {
  const [completedActions, setCompletedActions] = useState<boolean[]>(
    Array(week1Actions.length).fill(false),
  );

  const toggleAction = (idx: number) => {
    const newActions = [...completedActions];
    newActions[idx] = !newActions[idx];
    setCompletedActions(newActions);
  };

  const completedCount = completedActions.filter(Boolean).length;
  const progressPercent = Math.round(
    (completedCount / week1Actions.length) * 100,
  );

  return (
    <div className="w-full bg-[#FDF0E3] text-[#1A2A3A] font-sans rounded-2xl overflow-hidden shadow-sm border border-[#cbd5e1]">
      <header className="bg-[#3F5B75] text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF0E3] text-[#3F5B75] font-black flex items-center justify-center text-[18px]">
              O
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[20px] md:text-[28px] font-bold tracking-tight">
                OpenKM
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#16726E] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>{" "}
                Ready
              </span>
            </div>
          </div>
          <h1 className="text-[24px] md:text-[32px] font-bold tracking-tight">
            Full Business Plan Pack{" "}
            <span className="opacity-80 font-normal italic">
              — Gap Analysis
            </span>
          </h1>
          <p className="text-[13px] md:text-[14px] text-white/70 mt-2 max-w-[600px] leading-relaxed">
            Master dashboard • 10 linked docs • Week 1 actions • Funding pack •
            KPIs • GB1 Beach Rd pilot • Proceed = execute checklist
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-widest text-white/60 font-semibold mb-1">
              Progress
            </div>
            <div className="text-[20px] font-bold">
              {completedCount}{" "}
              <span className="opacity-50">/ {week1Actions.length}</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-full border-[3px] border-white/20 flex items-center justify-center relative">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(#10b981 ${progressPercent * 3.6}deg, transparent 0deg)`,
              }}
            ></div>
            <div className="absolute inset-[3px] rounded-full bg-[#3F5B75] flex items-center justify-center z-10 text-[12px] font-bold">
              {progressPercent}%
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 md:p-8 space-y-10">
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-[22px] md:text-[26px] font-bold tracking-tight text-[#3F5B75]">
                Section 1 — All Documents
              </h2>
              <p className="text-[13px] text-[#3F5B75]/70 mt-1">
                10 cards • status green • internal directory
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => {
              const Icon = doc.icon;
              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-[#3F5B75]/15 p-5 hover:shadow-md hover:border-[#3F5B75]/30 transition-all flex flex-col cursor-default"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FDF0E3] text-[#3F5B75] flex items-center justify-center border border-[#3F5B75]/10">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#3F5B75]/50">
                          {doc.tag} • {doc.meta}
                        </div>
                        <div className="text-[15px] font-bold leading-tight mt-0.5 text-[#1A2A3A]">
                          {doc.title}
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#16726E]/10 text-[#16726E] text-[10px] font-bold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16726E]"></span>{" "}
                      {doc.status}
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-[#3F5B75]/80 flex-1">
                    {doc.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-[22px] md:text-[26px] font-bold tracking-tight text-[#3F5B75]">
                Section 2 — Week 1 Action List
              </h2>
              <p className="text-[13px] text-[#3F5B75]/70 mt-1">
                Proceed Now • Owner + Date • transient checklist
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#3F5B75]/15 overflow-hidden shadow-sm">
            <div className="grid grid-cols-12 gap-0 px-6 py-3 bg-[#FDF0E3]/70 border-b border-[#3F5B75]/15 text-[11px] uppercase tracking-widest font-bold text-[#3F5B75]/60">
              <div className="col-span-1 text-center">Done</div>
              <div className="col-span-2">Day</div>
              <div className="col-span-6">Task + Detail</div>
              <div className="col-span-3">Owner</div>
            </div>
            <div className="divide-y divide-[#3F5B75]/10">
              {week1Actions.map((action, idx) => {
                const Icon = action.icon;
                const isDone = completedActions[idx];
                return (
                  <div
                    key={idx}
                    className={`grid grid-cols-12 gap-4 px-6 py-4 items-start transition-colors ${isDone ? "bg-[#16726E]/5" : "hover:bg-[#FDF0E3]/40"}`}
                  >
                    <div className="col-span-1 flex justify-center pt-1">
                      <button
                        onClick={() => toggleAction(idx)}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all cursor-pointer ${isDone ? "bg-[#16726E] border-[#16726E] text-white" : "bg-white border-[#cbd5e1] text-transparent hover:border-[#94a3b8]"}`}
                      >
                        <CheckCircle2 className="w-4 h-4" strokeWidth={3} />
                      </button>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 pt-1">
                      <div className="w-7 h-7 rounded-full bg-[#3F5B75]/10 text-[#3F5B75] hidden lg:flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[13px] font-bold tracking-wide text-[#3F5B75]">
                        {action.day}
                      </span>
                    </div>
                    <div className="col-span-6">
                      <div
                        className={`text-[14px] font-bold leading-tight ${isDone ? "line-through text-[#3F5B75]/40" : "text-[#1A2A3A]"}`}
                      >
                        {action.task}
                      </div>
                      <div className="text-[12px] leading-relaxed text-[#3F5B75]/70 mt-1">
                        {action.detail}
                      </div>
                    </div>
                    <div className="col-span-3 pt-1">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium border ${isDone ? "bg-[#16726E] text-white border-[#16726E]" : "bg-white text-[#3F5B75]/80 border-[#3F5B75]/20"}`}
                      >
                        {action.owner}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#3F5B75]/15 p-6 md:p-8">
            <h2 className="text-[22px] md:text-[26px] font-bold tracking-tight text-[#3F5B75] mb-6">
              Section 3 — Funding & Bankable Pack
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#3F5B75]/60 mb-4">
                  Ask R1.68M Breakdown
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Capex", value: 1230000, pct: 73 },
                    { label: "Working capital", value: 119000, pct: 7 },
                    { label: "Mesh dev", value: 80000, pct: 5 },
                    { label: "Permits Insurance", value: 60000, pct: 4 },
                    { label: "Marketing", value: 40000, pct: 2 },
                    { label: "Contingency", value: 153000, pct: 9 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[12px] mb-1.5">
                        <span className="font-semibold text-[#1A2A3A]">
                          {item.label}
                        </span>
                        <span className="text-[#3F5B75]/70 font-mono">
                          R{(item.value / 1000).toFixed(0)}k
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#FDF0E3] overflow-hidden">
                        <div
                          className="h-full bg-[#3F5B75] rounded-full"
                          style={{ width: `${item.pct}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl bg-[#3F5B75] text-white p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">
                        Payback
                      </div>
                      <div className="text-[24px] font-bold mt-1 tracking-tight">
                        16 mo
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-white/50 font-bold">
                        Year1 Net
                      </div>
                      <div className="text-[24px] font-bold mt-1 tracking-tight">
                        R1.2M*
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-white/60 mt-3 pt-3 border-t border-white/20">
                    * after side-road fund allocation
                  </div>
                </div>
                <div className="rounded-xl border border-dashed border-[#16726E]/30 bg-[#16726E]/5 p-5">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#16726E] mb-3">
                    Attach Pack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-md bg-white border border-[#16726E]/20 text-[11px] font-medium text-[#16726E]">
                      Financial Model Excel
                    </span>
                    <span className="px-3 py-1.5 rounded-md bg-white border border-[#16726E]/20 text-[11px] font-medium text-[#16726E]">
                      Pitch Deck v5
                    </span>
                    <span className="px-3 py-1.5 rounded-md bg-[#16726E] text-white text-[11px] font-semibold">
                      Insurance quote
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#3F5B75] rounded-2xl p-6 md:p-8 text-white">
            <h2 className="text-[22px] md:text-[26px] font-bold tracking-tight mb-6">
              Section 4 — KPIs for Week 1
            </h2>
            <div className="space-y-4">
              {[
                {
                  gate: "Safety gate",
                  kpi: "Faraday + IR + weight gate logged",
                  status: "Required",
                  icon: ShieldAlert,
                },
                {
                  gate: "Asset gate",
                  kpi: "100% QR tagged, S2S transfer S2S-001 test closed <30min",
                  status: "Required",
                  icon: Package,
                },
                {
                  gate: "Mesh gate",
                  kpi: "8 nodes ping <50ms, gateway Checkers fiber bridge",
                  status: "Required",
                  icon: Database,
                },
                {
                  gate: "Business gate",
                  kpi: "10 rides Day7, hire take rate 20% comfort 30% storage",
                  status: "Target",
                  icon: TrendingUp,
                },
              ].map((k) => (
                <div
                  key={k.gate}
                  className="flex gap-4 p-4 rounded-xl bg-white/10 border border-white/10"
                >
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <k.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-widest">
                        {k.gate}
                      </span>
                      <span className="px-2 py-0.5 rounded border border-white/30 text-[9px] font-bold uppercase tracking-widest">
                        {k.status}
                      </span>
                    </div>
                    <div className="text-[13px] leading-relaxed text-white/80">
                      {k.kpi}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
