"use client";

import React, { useState } from "react";

const phases = [
  {
    id: 0,
    name: "Phase 0 Foundation",
    span: "W1-4",
    start: 0,
    end: 1,
    color: "#3F5B75",
    tasks:
      "Partnerships City + Checkers 5 sites MOU, Constantia Village + Kirstenbosch + UCT upper permissions, procurement list final, Equipment Journal template, S2S ledger SQLite schema",
  },
  {
    id: 1,
    name: "Phase 1 Infrastructure",
    span: "W3-6",
    start: 0.5,
    end: 1.5,
    color: "#4A6B8A",
    tasks:
      "Fabricate 8 DropBoxes Faraday labyrinth 86×2mm 90° bend + IR + Last TapReceiver, install charging cabinets IP54 max 2 + smoke + CO2 + solar LED, flash ESP32-S3 802.11s mesh D.A.T.A.H., install hub tablets PN532, signage MIK dock",
  },
  {
    id: 2,
    name: "Phase 2 Fleet",
    span: "W4-8",
    start: 0.9,
    end: 2,
    color: "#16726E",
    tasks:
      "Procure 5 bikes HillClimber x2 CiTiDriver x2 SleekSlider x1 + 8 batteries 500/625Wh, fit Tannus Cargo 130kg/tyre + Hard + tan-wall, MIK HD rack 27kg, safety kit helmets gilets lights, comfort inventory 2× wide 185mm 2× Kinekt 4× gel 2× grips, storage inventory 2× Sixty60 40L 2× panniers 3× wine crate 2× leather 2× top box, QR tag all assets",
  },
  {
    id: 3,
    name: "Phase 3 Staffing",
    span: "W5-8",
    start: 1.1,
    end: 2,
    color: "#1A8A84",
    tasks:
      "Recruit 2 Time Controllers per station rotation, training SOP battery swap 06:00/14:00, weight gate S/M/L, 60-sec comfort fit 30-sec storage fit, S2S transfer QR out/in, first aid, mesh troubleshooting, Equipment Journal daily log + weekly Sun 16:00 audit",
  },
  {
    id: 4,
    name: "Phase 4 Pilot Launch",
    span: "W9-12",
    start: 2,
    end: 3,
    color: "#0F4C4A",
    tasks:
      "Soft launch Beach Rd, Old Harbour, Mountainside, feeder R12.50 0.8-2km, Sixty60 delivery pilot 11-13h peak, monitor odo + battery temp + hire take rate 20%, side-road patch kit crew logs m2",
  },
  {
    id: 5,
    name: "Phase 5 Tourist + Intranet",
    span: "M4-6",
    start: 3,
    end: 6,
    color: "#3F5B75",
    tasks:
      "Add CT1 Constantia Village, CT2 Kirstenbosch Gate, CT3 UCT Upper, SleekSlider premium R450 day includes wine crate + gel + grips + top box, bundle +R50, enable DFL wet grip model weights share via bike mules, swarm scheduling charging cabinet stagger, gateway Checkers fiber bridge",
  },
  {
    id: 6,
    name: "Phase 6 Scale + City Reporting",
    span: "M7-12",
    start: 6,
    end: 12,
    color: "#2C3E50",
    tasks:
      "Add GB4 Suikerbossie GB5 Bikini Beach, monthly City report km saved + side-road m2 patched + blackout resilience hours + fleet availability %, TCO R2.87/km validation, expand to 3 more Checkers hubs",
  },
];

const tasks = [
  {
    id: "01",
    name: "MOU Checkers",
    owner: "Adrian",
    deliverable: "Signed 5 sites",
    gate: "Partnership",
    deadline: "W2",
    dot: "bg-[#3F5B75]",
  },
  {
    id: "02",
    name: "DropBox fab",
    owner: "Fabricator",
    deliverable: "8 units Faraday tested",
    gate: "Safety",
    deadline: "W5",
    dot: "bg-[#16726E]",
  },
  {
    id: "03",
    name: "Mesh flash",
    owner: "Tech lead",
    deliverable: "802.11s ping test <50ms",
    gate: "Intranet",
    deadline: "W6",
    dot: "bg-[#1A8A84]",
  },
  {
    id: "04",
    name: "Bike procurement",
    owner: "Supplier",
    deliverable: "5 bikes QR tagged",
    gate: "Fleet",
    deadline: "W6",
    dot: "bg-[#16726E]",
  },
  {
    id: "05",
    name: "Battery cabinet wiring",
    owner: "Electrician",
    deliverable: "IP54 + grounded",
    gate: "Safety",
    deadline: "W6",
    dot: "bg-[#dc2626]",
  },
  {
    id: "06",
    name: "Comfort/storage inventory",
    owner: "Ops",
    deliverable: "Hire menu live in tablet",
    gate: "Business",
    deadline: "W7",
    dot: "bg-[#3F5B75]",
  },
  {
    id: "07",
    name: "Time Controller training",
    owner: "Adrian",
    deliverable: "SOP signed",
    gate: "Staffing",
    deadline: "W8",
    dot: "bg-[#2C3E50]",
  },
  {
    id: "08",
    name: "S2S ledger live",
    owner: "Dev",
    deliverable: "Transfer S2S-001 test",
    gate: "Asset",
    deadline: "W8",
    dot: "bg-[#16726E]",
  },
  {
    id: "09",
    name: "Pilot launch",
    owner: "Ops",
    deliverable: "100 rides week1",
    gate: "Pilot",
    deadline: "W10",
    dot: "bg-[#0F4C4A]",
  },
  {
    id: "10",
    name: "DFL model",
    owner: "AI",
    deliverable: "Wet grip weights shared bike mule",
    gate: "Intelligence",
    deadline: "M5",
    dot: "bg-[#4A6B8A]",
  },
];

const raci = [
  {
    row: "Partnerships",
    adrian: "A",
    controller: "C",
    checkers: "C",
    city: "I",
  },
  {
    row: "Infrastructure",
    adrian: "A",
    controller: "R",
    checkers: "C",
    city: "I",
  },
  { row: "Fleet", adrian: "A", controller: "R", checkers: "I", city: "I" },
  { row: "Staffing", adrian: "A", controller: "R", checkers: "C", city: "I" },
  {
    row: "Safety audit",
    adrian: "A",
    controller: "R",
    checkers: "C",
    city: "C",
  },
  {
    row: "S2S control",
    adrian: "A",
    controller: "R",
    checkers: "I",
    city: "I",
  },
  {
    row: "Intranet mesh",
    adrian: "A",
    controller: "R",
    checkers: "C",
    city: "I",
  },
  {
    row: "City reporting",
    adrian: "A",
    controller: "R",
    checkers: "I",
    city: "C",
  },
];

const risks = [
  {
    trigger: "Battery temp >45°C",
    action: "Quarantine cabinet, spare swap",
    owner: "Time Controller",
    severity: "Critical",
  },
  {
    trigger: "Bike not returned 2h",
    action: "CCTV lock + alert",
    owner: "Ops",
    severity: "High",
  },
  {
    trigger: "Mesh down",
    action: "Offline SQLite + bike mule cache",
    owner: "Tech lead",
    severity: "Medium",
  },
  {
    trigger: "Max weight complaint",
    action: "Offer bundle hire R70/ride",
    owner: "Time Controller",
    severity: "Low",
  },
  {
    trigger: "Checkers fridge anchor power outage",
    action: "Solar LED + battery cabinet as backup anchor",
    owner: "Electrician",
    severity: "High",
  },
];

export default function ImplementationPlan() {
  const [activePhase, setActivePhase] = useState<number | null>(4);
  const [filterGate, setFilterGate] = useState<string>("All");

  const filteredTasks =
    filterGate === "All" ? tasks : tasks.filter((t) => t.gate === filterGate);
  const gates = ["All", ...Array.from(new Set(tasks.map((t) => t.gate)))];

  return (
    <div className="w-full bg-[#FDF0E3] text-[#1A2A3A] font-sans rounded-2xl overflow-hidden border border-[#cbd5e1] shadow-sm">
      <div className="border-b border-[#3F5B75]/15 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[2px] w-12 bg-[#16726E]"></div>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-60">
                OpenKM • Community Intranet
              </span>
            </div>
            <h1 className="text-[28px] md:text-[36px] font-bold leading-[1.1] tracking-tight">
              Implementation Plan
              <br />
              <span className="italic font-normal text-[#3F5B75]">
                Gordon&apos;s Bay Pilot to City Scale
              </span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            <div className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-[#3F5B75] text-[#3F5B75] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16726E] animate-pulse"></span>{" "}
              90 DAYS TO REVENUE
            </div>
            <div className="font-mono text-[11px] px-3 py-1.5 rounded-full bg-[#3F5B75] text-white">
              12 MO TO CITY SCALE PROOF
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { k: "Stations", v: "8 hubs" },
            { k: "Pilot Sites", v: "GB1-GB3" },
            { k: "Fleet", v: "5 bikes / hub" },
            { k: "Capex / hub", v: "R154k" },
          ].map((stat) => (
            <div
              key={stat.k}
              className="rounded-xl px-4 py-3 bg-white/60 border border-black/5"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-50">
                {stat.k}
              </div>
              <div className="text-[18px] font-semibold leading-none mt-1">
                {stat.v}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-10">
        <section>
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#3F5B75] text-white font-mono text-[11px]">
                1
              </span>
              Timeline Overview
              <span className="font-mono text-[11px] tracking-widest opacity-40 ml-2 font-normal">
                GANTT 0-12 MONTHS
              </span>
            </h2>
          </div>
          <div className="rounded-2xl bg-white border border-black/[0.07] overflow-hidden">
            <div className="grid grid-cols-12 font-mono text-[10px] tracking-widest uppercase px-4 md:px-6 py-3 border-b border-black/5 bg-[#FDF0E3]/50">
              {[...Array(13)].map((_, i) => (
                <div key={i} className="opacity-40">
                  {i === 0 ? "0" : i + "M"}
                </div>
              ))}
            </div>
            <div className="px-4 md:px-6 py-4 space-y-3">
              {phases.map((phase) => {
                const isActive = activePhase === phase.id;
                const left = (phase.start / 12) * 100;
                const width = ((phase.end - phase.start) / 12) * 100;
                return (
                  <div
                    key={phase.id}
                    className={`group rounded-xl border transition-all ${isActive ? "bg-[#F8F1E7] border-[#3F5B75]/30 shadow-sm" : "bg-white hover:bg-[#FDF0E3]/70 border-black/5"}`}
                  >
                    <button
                      onClick={() => setActivePhase(isActive ? null : phase.id)}
                      className="w-full text-left flex items-center gap-3 md:gap-4 p-3 md:p-3.5 cursor-pointer"
                    >
                      <div
                        className="font-mono text-[10px] w-[58px] shrink-0 px-2 py-1 rounded-full text-white text-center"
                        style={{ backgroundColor: phase.color }}
                      >
                        {phase.span}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#16726E]" : "bg-black/20"}`}
                          ></div>
                          <span className="text-[15px] md:text-[16px] font-semibold leading-none truncate">
                            {phase.name}
                          </span>
                          {phase.id >= 4 && (
                            <span className="hidden md:inline font-mono text-[9px] px-1.5 py-0.5 rounded bg-black/5 font-normal">
                              GB Pilot
                            </span>
                          )}
                        </div>
                        <div className="relative h-[6px] mt-2 rounded-full bg-black/5 overflow-hidden">
                          <div
                            className="absolute top-0 bottom-0 rounded-full transition-all"
                            style={{
                              left: `${left}%`,
                              width: `${width}%`,
                              backgroundColor: phase.color,
                              opacity: isActive ? 1 : 0.85,
                            }}
                          ></div>
                        </div>
                      </div>
                    </button>
                    {isActive && (
                      <div className="px-4 md:px-6 pb-4 pt-0">
                        <div className="ml-[70px] md:ml-[74px] rounded-lg bg-white border border-black/5 p-3 md:p-4 font-mono text-[11.5px] leading-[1.6] opacity-80">
                          {phase.tasks}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="px-6 py-3 border-t border-black/5 flex flex-wrap gap-2 font-mono text-[10px]">
              <span className="opacity-50 pt-1">SITES:</span>
              {[
                "GB1 Beach Rd",
                "GB2 Old Harbour",
                "GB3 Mountainside",
                "GB4 Suikerbossie",
                "GB5 Bikini Beach",
                "CT1 Constantia",
                "CT2 Kirstenbosch",
                "CT3 UCT Upper",
              ].map((s) => (
                <span
                  key={s}
                  className="px-2 py-1 rounded-full bg-[#3F5B75]/10 text-[#3F5B75]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
            <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#3F5B75] text-white font-mono text-[11px]">
                2
              </span>
              Detailed Task List
            </h2>
            <div className="flex gap-1.5 flex-wrap">
              {gates.map((g) => (
                <button
                  key={g}
                  onClick={() => setFilterGate(g)}
                  className={`font-mono text-[10px] px-2.5 py-1 rounded-full border transition cursor-pointer ${filterGate === g ? "bg-[#3F5B75] text-white border-[#3F5B75]" : "bg-white border-black/10 opacity-70 hover:opacity-100"}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-black/[0.07] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="font-mono text-[10px] uppercase tracking-widest bg-[#F8F1E7] border-b border-black/5">
                    <th className="px-4 md:px-6 py-3 font-medium opacity-60">
                      Task
                    </th>
                    <th className="px-3 py-3 font-medium opacity-60">Owner</th>
                    <th className="px-3 py-3 font-medium opacity-60">
                      Deliverable
                    </th>
                    <th className="px-3 py-3 font-medium opacity-60">Gate</th>
                    <th className="px-4 md:px-6 py-3 font-medium opacity-60 text-right">
                      Deadline
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono text-[11px] md:text-[12px]">
                  {filteredTasks.map((t) => (
                    <tr
                      key={t.id}
                      className="border-b border-black/5 last:border-0 hover:bg-[#FDF0E3]/60 transition-colors"
                    >
                      <td className="px-4 md:px-6 py-3 flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${t.dot} inline-block`}
                        ></span>
                        <span className="opacity-50">{t.id}</span> {t.name}
                      </td>
                      <td className="px-3 py-3 font-medium text-[#3F5B75]">
                        {t.owner}
                      </td>
                      <td className="px-3 py-3 opacity-70">{t.deliverable}</td>
                      <td className="px-3 py-3">
                        <span className="px-2 py-1 rounded-full bg-black/5 text-[10px]">
                          {t.gate}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3 text-right font-semibold text-[#16726E]">
                        {t.deadline}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-12 gap-6">
          <section className="lg:col-span-7">
            <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#3F5B75] text-white font-mono text-[11px]">
                3
              </span>
              Budget per Station
            </h2>
            <div className="rounded-2xl bg-[#3F5B75] text-[#FDF0E3] p-5 md:p-6 shadow-md">
              <div className="flex items-baseline justify-between">
                <div className="font-mono text-[11px] tracking-widest uppercase opacity-60">
                  Capex R154k
                </div>
                <div className="font-mono text-[10px] opacity-50">
                  ×8 hubs = R1.232M scale
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  {
                    label: "Infrastructure",
                    val: "R18,000",
                    note: "DropBox + cabinet + IP54",
                  },
                  {
                    label: "Fleet 5 bikes",
                    val: "R90,000",
                    note: "HillClimber x2 CiTi x2 Sleek x1",
                  },
                  {
                    label: "Batteries spare 8",
                    val: "R25,500",
                    note: "500/625Wh mix",
                  },
                  {
                    label: "Safety kit",
                    val: "R8,000",
                    note: "Helmets gilets lights",
                  },
                  {
                    label: "Comfort hire",
                    val: "R4,400",
                    note: "Wide 185mm Kinekt gel grips",
                  },
                  {
                    label: "Storage hire",
                    val: "R5,200",
                    note: "Sixty60 40L pannier crate leather top",
                  },
                  {
                    label: "Tools",
                    val: "R3,000",
                    note: "Patch kit + diagnostics",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[10px] bg-white/10 border border-white/10 p-3"
                  >
                    <div className="font-mono text-[10px] opacity-60 uppercase tracking-widest">
                      {item.label}
                    </div>
                    <div className="text-[18px] font-bold mt-1 tracking-tight">
                      {item.val}
                    </div>
                    <div className="font-mono text-[10px] opacity-50 mt-1 leading-tight">
                      {item.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="lg:col-span-5">
            <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#3F5B75] text-white font-mono text-[11px]">
                4
              </span>
              RACI
            </h2>
            <div className="rounded-2xl bg-white border border-black/[0.07] overflow-hidden">
              <div className="grid grid-cols-5 font-mono text-[10px] uppercase tracking-widest bg-[#F8F1E7] border-b border-black/5">
                <div className="px-4 py-3 opacity-60">Area</div>
                <div className="px-2 py-3 text-center font-bold">
                  Adrian
                  <br />
                  <span className="opacity-50 font-normal">Acc</span>
                </div>
                <div className="px-2 py-3 text-center font-bold">
                  Time C.
                  <br />
                  <span className="opacity-50 font-normal">Resp</span>
                </div>
                <div className="px-2 py-3 text-center font-bold">
                  Checkers
                  <br />
                  <span className="opacity-50 font-normal">Cons</span>
                </div>
                <div className="px-2 py-3 text-center font-bold">
                  City
                  <br />
                  <span className="opacity-50 font-normal">Inf</span>
                </div>
              </div>
              {raci.map((row) => (
                <div
                  key={row.row}
                  className="grid grid-cols-5 border-b border-black/5 last:border-0 font-mono text-[11px] hover:bg-[#FDF0E3]/40"
                >
                  <div className="px-4 py-3 font-semibold">{row.row}</div>
                  <div className="px-2 py-3 text-center">
                    <span
                      className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-[11px] font-bold ${row.adrian === "A" ? "bg-[#3F5B75] text-white" : "bg-black/5"}`}
                    >
                      {row.adrian}
                    </span>
                  </div>
                  <div className="px-2 py-3 text-center">
                    <span
                      className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-[11px] font-bold ${row.controller === "R" ? "bg-[#16726E] text-white" : "bg-black/5"}`}
                    >
                      {row.controller}
                    </span>
                  </div>
                  <div className="px-2 py-3 text-center">
                    <span className="inline-flex w-6 h-6 items-center justify-center rounded-full text-[11px] bg-black/5">
                      {row.checkers}
                    </span>
                  </div>
                  <div className="px-2 py-3 text-center">
                    <span className="inline-flex w-6 h-6 items-center justify-center rounded-full text-[11px] bg-black/5">
                      {row.city}
                    </span>
                  </div>
                </div>
              ))}
              <div className="px-4 py-3 font-mono text-[10px] opacity-50 bg-[#FDF0E3]/50">
                A Accountable • R Responsible • C Consulted • I Informed
              </div>
            </div>
          </section>
        </div>

        <section>
          <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#3F5B75] text-white font-mono text-[11px]">
              5
            </span>
            Risks & Contingency
          </h2>
          <div className="rounded-2xl bg-white border border-black/[0.07] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="font-mono text-[10px] uppercase tracking-widest bg-[#F8F1E7] border-b border-black/5">
                    <th className="px-4 md:px-6 py-3 font-medium opacity-60">
                      Trigger
                    </th>
                    <th className="px-3 py-3 font-medium opacity-60">
                      Contingency
                    </th>
                    <th className="px-3 py-3 font-medium opacity-60">Owner</th>
                    <th className="px-4 md:px-6 py-3 font-medium opacity-60 text-right">
                      Severity
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono text-[12px]">
                  {risks.map((r, i) => (
                    <tr
                      key={i}
                      className="border-b border-black/5 last:border-0 hover:bg-[#FDF0E3]/50"
                    >
                      <td className="px-4 md:px-6 py-3.5 font-semibold">
                        {r.trigger}
                      </td>
                      <td className="px-3 py-3.5 opacity-80">{r.action}</td>
                      <td className="px-3 py-3.5 text-[#3F5B75]">{r.owner}</td>
                      <td className="px-4 md:px-6 py-3.5 text-right">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${r.severity === "Critical" ? "bg-[#dc2626]/10 text-[#dc2626] border-[#dc2626]/20" : r.severity === "High" ? "bg-[#ea580c]/10 text-[#ea580c] border-[#ea580c]/20" : r.severity === "Medium" ? "bg-[#3F5B75]/10 text-[#3F5B75] border-[#3F5B75]/20" : "bg-black/5 border-black/10"}`}
                        >
                          {r.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
