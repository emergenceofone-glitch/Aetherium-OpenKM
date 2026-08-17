'use client';

import React, { useState } from 'react';
import CostCalculator from '@/components/CostCalculator';
import TripTracker from '@/components/TripTracker';
import HubBudgetEstimator from '@/components/HubBudgetEstimator';
import Sixty60LetterEditor from '@/components/Sixty60LetterEditor';
import MyCiTiValueEngine from '@/components/MyCiTiValueEngine';
import PilotGateChecklist from '@/components/PilotGateChecklist';
import {
  Bike,
  Bus,
  Car,
  Footprints,
  Shield,
  Zap,
  Wrench,
  Camera,
  Coins,
  TrendingUp,
  FileText,
  Copy,
  Check,
  Download,
  Terminal,
  ExternalLink,
  Info,
  CheckCircle2,
  Sliders,
  Play
} from 'lucide-react';

export default function HomePage() {
  const [activeTabSec2, setActiveTabSec2] = useState<'calc' | 'tracker' | 'code'>('calc');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const formulaCode = `// Open KM Cost Formula
// cost = distance_km * (base_rate * method_factor * fuel_index * availability)

export type Method = 'e-bike' | 'taxi' | 'myciti' | 'walk';

const BASE_RATE = 2.20;       // ZAR per km - City baseline
const BASELINE_DIESEL = 21.5;  // ZAR/L - anchor for fuel_index
const METHOD_FACTOR: Record<Method, number> = {
  'e-bike': 0.9,   // protective feeder discount
  'taxi': 1.15,    // demand / availability surcharge
  'myciti': 0.75,  // trunk feeder incentive
  'walk': 0.0      // zero emission baseline
};

export function calcCostKm(opts: {
  distance_km: number;
  method: Method;
  current_diesel: number; // from open API feed
  availability: number;   // 0.8 - 1.3 (surplus to peak)
}) {
  const fuel_index = opts.current_diesel / BASELINE_DIESEL;
  const cost = opts.distance_km * (
    BASE_RATE * 
    METHOD_FACTOR[opts.method] * 
    fuel_index * 
    opts.availability
  );
  return Math.round(cost * 100) / 100;
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(formulaCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#111827] font-sans antialiased selection:bg-[#005C99]/20 selection:text-[#005C99]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#e5e7eb]">
        <div className="max-w-[1040px] mx-auto px-5 md:px-8 h-[60px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#005C99] flex items-center justify-center text-white font-mono text-[12px] font-black tracking-widest shadow-xs">
              KM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[14px] text-[#111827] tracking-tight">OpenKM Cape Town</span>
                <span className="text-[10px] font-mono uppercase bg-[#e6f0f8] text-[#005C99] px-2 py-0.5 rounded font-semibold border border-[#bfdbfe]">
                  Draft v0.1.0
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#6b7280] block">
                Mobility Layer • Dual-Use Feeder Hub
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="hidden md:inline-block px-2.5 py-1 rounded bg-[#f0fdfa] border border-[#99f6e0] text-[#0f766e] font-semibold">
              MIT Open Source
            </span>
            <a
              href="#sec-04"
              className="px-3 py-1.5 rounded-lg bg-[#111827] text-white hover:bg-[#1f2937] transition-all font-semibold"
            >
              Anchor Letter
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[1040px] mx-auto px-5 md:px-8 pb-28">
        {/* Hero Section */}
        <section className="pt-10 md:pt-14 pb-8">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wide mb-3 bg-white px-3 py-1 rounded-full border border-[#e2e8f0] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#00A6A6] animate-pulse"></span>
            <span className="text-[#005C99] font-bold uppercase tracking-[0.16em]">
              City of Cape Town • Non-Motorized Transport
            </span>
          </div>

          <h1 className="text-[32px] md:text-[46px] font-[800] leading-[1.02] tracking-[-0.03em] max-w-[26ch] text-[#111827]">
            Build Spec: Open KM + Dual-Use Hub —{' '}
            <span className="text-[#005C99]">MVP to Pilot</span>
          </h1>

          <p className="mt-4 text-[15px] md:text-[17px] leading-[1.6] text-[#374151] max-w-[65ch]">
            A protective, open layer for MyCiTi & minibus taxis. One open unit = one GPS km. No proprietary platform lock-in. A translator app paired with 1 dual-use pilot hub with shared Checkers Sixty60 economics.
          </p>

          {/* Rapid Jump Nav */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
            {[
              { n: '01', t: 'README & Mission', h: '#sec-01', desc: 'Protective layer' },
              { n: '02', t: 'Translator App', h: '#sec-02', desc: 'Formula & Tracker' },
              { n: '03', t: 'Pilot Hub BOM', h: '#sec-03', desc: 'Airless tires & rack' },
              { n: '04', t: 'Sixty60 Letter', h: '#sec-04', desc: 'Anchor tenancy' },
              { n: '05', t: 'MyCiTi Value', h: '#sec-05', desc: 'ROI & Protective eq.' }
            ].map((item) => (
              <a
                key={item.n}
                href={item.h}
                className="group flex flex-col justify-between rounded-[14px] border border-[#e5e7eb] bg-white p-3.5 hover:border-[#005C99]/40 hover:shadow-sm transition-all text-left"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[11px] font-bold text-[#9ca3af] group-hover:text-[#005C99]">
                    {item.n}
                  </span>
                  <span className="text-[10px] text-[#cbd5e1] font-mono">›</span>
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#111827] group-hover:text-[#005C99] leading-tight">
                    {item.t}
                  </div>
                  <div className="text-[11px] text-[#64748b] mt-0.5">{item.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* SECTION 01: README */}
        <section id="sec-01" className="scroll-mt-20 mt-6 bg-white rounded-[20px] border border-[#e5e7eb] overflow-clip shadow-xs">
          <div className="px-6 md:px-10 py-8 md:py-10">
            <div className="flex items-start justify-between gap-6 border-b border-[#f1f5f9] pb-6 mb-8">
              <div>
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9ca3af] mb-1.5">
                  Section 01 — README
                </div>
                <h2 className="text-[24px] font-bold tracking-tight text-[#111827]">
                  Overview: Protective Layer for Public Transport
                </h2>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-[10px] font-mono uppercase text-[#9ca3af]">Status</div>
                <div className="text-[11px] font-mono bg-[#f0fdfa] border border-[#ccfbf1] text-[#0f766e] px-2.5 py-1 rounded font-bold mt-1">
                  Ready for Pilot Fork
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-7 space-y-6">
                <div>
                  <h3 className="text-[13px] font-mono uppercase tracking-wide text-[#005C99] font-bold mb-2">
                    Core Mission
                  </h3>
                  <p className="text-[14px] leading-[1.7] text-[#1f2937]">
                    Enable public access to personal transport as a <span className="font-bold text-[#111827] bg-[#fef3c7] px-1 py-0.5 rounded">protective feeder layer</span> for MyCiTi trunk lines and minibus taxi ranks. It is explicitly not a competitor. It fills the dangerous 2–3km walking gaps, off-peak feeder holes, and side-roads where 12m trunk buses cannot economically operate.
                  </p>
                </div>

                <div className="rounded-[14px] bg-[#f8fafc] border border-[#e2e8f0] p-5">
                  <h3 className="text-[12px] font-mono uppercase tracking-wide text-[#475569] font-bold mb-2.5">
                    Foundational Principles
                  </h3>
                  <div className="font-mono text-[13px] leading-[1.6] text-[#111827]">
                    <span className="text-[#005C99] font-bold">One open unit = one GPS km.</span>
                    <br />
                    Open source standard. Government <span className="bg-[#fef3c7] px-1">supported not owned</span>. Verifiable, anonymous, and local-first.
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] font-mono">
                    <div className="bg-white rounded-lg p-2.5 border border-[#e2e8f0]">
                      <div className="text-[#9ca3af] text-[9px] uppercase">Unit Standard</div>
                      <div className="font-bold text-[#111827] mt-0.5">1 km GPS WGS84</div>
                    </div>
                    <div className="bg-white rounded-lg p-2.5 border border-[#e2e8f0]">
                      <div className="text-[#9ca3af] text-[9px] uppercase">License</div>
                      <div className="font-bold text-[#111827] mt-0.5">MIT Open</div>
                    </div>
                    <div className="bg-white rounded-lg p-2.5 border border-[#e2e8f0]">
                      <div className="text-[#9ca3af] text-[9px] uppercase">Privacy</div>
                      <div className="font-bold text-[#111827] mt-0.5">0 PII / Local Hash</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[13px] font-mono uppercase tracking-wide text-[#005C99] font-bold mb-3">
                    What We Are Delivering
                  </h3>
                  <ul className="text-[14px] leading-[1.7] space-y-3">
                    <li className="flex gap-3">
                      <span className="mt-[6px] w-2 h-2 rounded-full bg-[#005C99] flex-shrink-0"></span>
                      <div>
                        <b className="text-[#111827]">Translator App:</b> Offline-first km counter that translates any transport mode (e-bike, taxi, MyCiTi, walk) into a standardized open-km cost index.
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-[6px] w-2 h-2 rounded-full bg-[#00A6A6] flex-shrink-0"></span>
                      <div>
                        <b className="text-[#111827]">1 Pilot Dual-Use Hub:</b> Side-road A-frame rack with charging & battery swap co-located with Checkers Sixty60 as anchor tenant. Re-uses existing rank shelter without expensive civil builds.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Success Criteria Card */}
              <div className="md:col-span-5 space-y-4">
                <div className="rounded-[14px] border border-[#005C99]/20 bg-[#f0f7fc] p-5">
                  <h4 className="font-mono text-[11px] uppercase tracking-wide text-[#005C99] font-bold mb-3 flex items-center justify-between">
                    <span>Pilot Gate Criteria</span>
                    <span className="text-[9px] bg-white px-2 py-0.5 rounded border border-[#bfdbfe]">30-Day Check</span>
                  </h4>
                  <div className="space-y-3">
                    {[
                      { k: '0 Punctures Downtime', d: 'Tannus Airless 20×2.0 solid tires on all 5 bikes. Shadow toolboard has 0 tube tools.' },
                      { k: '>90% Active Circulation', d: 'Bikes moving vs. idle. Monitored via anonymous GPS heartbeat.' },
                      { k: 'MyCiTi Trunk Uplift', d: 'Tap-on increase at paired MyCiTi station within 500m of hub vs 14d baseline.' },
                      { k: 'Sixty60 Fast Turnaround', d: 'Anchor tenant reports reduced theft & battery swap under 15 min.' }
                    ].map((item) => (
                      <div key={item.k} className="flex gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-white border border-[#bfdbfe] flex items-center justify-center text-[10px] text-[#005C99] font-bold flex-shrink-0 mt-0.5">
                          ✓
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-[#111827] leading-tight">{item.k}</div>
                          <div className="text-[12px] leading-[1.5] text-[#475569] mt-0.5">{item.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[14px] bg-[#0b1220] text-[#e5e7eb] p-5 font-mono text-[11px] leading-[1.7] border border-[#1e293b]">
                  <div className="text-[#9ca3af] uppercase tracking-wide mb-2 text-[10px]">Open KM Standard — Schema Preview</div>
                  <div className="text-[#d1d5db]">open_km_version: &quot;0.1.0&quot;</div>
                  <div className="text-[#93c5fd]">unit: &quot;gps_km_wgs84&quot;</div>
                  <div className="text-[#34d399]">method_enum: [&quot;e-bike&quot;, &quot;taxi&quot;, &quot;myciti&quot;, &quot;walk&quot;]</div>
                  <div className="text-[#fde68a]">privacy: &quot;anonymous_id, local-first, zero PII&quot;</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: TECH STACK & TRANSLATOR APP */}
        <section id="sec-02" className="scroll-mt-20 mt-6 bg-white rounded-[20px] border border-[#e5e7eb] overflow-clip shadow-xs">
          <div className="px-6 md:px-10 py-8 md:py-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f1f5f9] pb-6 mb-6">
              <div>
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9ca3af] mb-1.5">
                  Section 02 — Tech Stack
                </div>
                <h2 className="text-[24px] font-bold tracking-tight text-[#111827]">
                  Translator App: OpenKM Cape Town
                </h2>
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1.5 bg-[#f1f5f9] p-1 rounded-xl font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setActiveTabSec2('calc')}
                  className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    activeTabSec2 === 'calc'
                      ? 'bg-white text-[#005C99] shadow-xs'
                      : 'text-[#64748b] hover:text-[#111827]'
                  }`}
                >
                  <Sliders className="w-3 h-3 inline mr-1" /> Simulator
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTabSec2('tracker')}
                  className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    activeTabSec2 === 'tracker'
                      ? 'bg-white text-[#005C99] shadow-xs'
                      : 'text-[#64748b] hover:text-[#111827]'
                  }`}
                >
                  <Play className="w-3 h-3 inline mr-1" /> Trip Logger
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTabSec2('code')}
                  className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                    activeTabSec2 === 'code'
                      ? 'bg-white text-[#005C99] shadow-xs'
                      : 'text-[#64748b] hover:text-[#111827]'
                  }`}
                >
                  <Terminal className="w-3 h-3 inline mr-1" /> Formula Code
                </button>
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { l: 'FRAMEWORK', v: 'React Native + Expo' },
                { l: 'MAPS ENGINE', v: 'MapLibre (Open, No Key)' },
                { l: 'LOCAL DB', v: 'SQLite + MMKV Cache' },
                { l: 'GPS SERVICE', v: 'Background + Foreground' }
              ].map((item) => (
                <div key={item.l} className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3.5">
                  <div className="font-mono text-[9px] text-[#9ca3af] uppercase tracking-wider">{item.l}</div>
                  <div className="text-[13px] font-bold text-[#111827] mt-1">{item.v}</div>
                </div>
              ))}
            </div>

            {/* Dynamic View Content */}
            {activeTabSec2 === 'calc' && (
              <div className="space-y-6">
                <CostCalculator />
              </div>
            )}

            {activeTabSec2 === 'tracker' && (
              <div className="space-y-6">
                <TripTracker />
              </div>
            )}

            {activeTabSec2 === 'code' && (
              <div className="space-y-4">
                <div className="rounded-xl bg-[#0b1220] text-[#cbd5e1] overflow-hidden border border-[#1e293b]">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e293b] bg-[#111a2e]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                      <span className="font-mono text-[11px] text-[#93c5fd] ml-2">/app/utils/cost.ts</span>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#94a3b8] hover:text-white px-2.5 py-1 rounded bg-[#1e293b]"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-[#34d399]" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedCode ? 'Copied' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="p-5 text-[12px] md:text-[13px] leading-[1.8] overflow-x-auto font-mono text-[#d1d5db]">
                    {formulaCode}
                  </pre>
                </div>
              </div>
            )}

            {/* Privacy Architecture & Features Grid */}
            <div className="mt-8 grid md:grid-cols-2 gap-4 pt-6 border-t border-[#f1f5f9]">
              <div className="rounded-xl bg-[#f8fafc] border border-[#e2e8f0] p-5">
                <h4 className="font-mono text-[11px] uppercase tracking-wide font-bold text-[#475569] mb-2">
                  MVP Feature Checklist
                </h4>
                <ul className="text-[13px] space-y-2 text-[#334155]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A6A6] flex-shrink-0" />
                    <span><b>Start / Stop km tracking:</b> One-tap, works 100% in airplane mode.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A6A6] flex-shrink-0" />
                    <span><b>Method Selector:</b> E-bike (0.9x), Taxi (1.15x), MyCiTi (0.75x), Walk (0.0x).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A6A6] flex-shrink-0" />
                    <span><b>CSV Export:</b> Date, km, method, cost exported directly to phone storage.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A6A6] flex-shrink-0" />
                    <span><b>Zero Auth:</b> Local SQLite database, no phone numbers, no credentials.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl bg-[#111827] text-white p-5 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#9ca3af] mb-1">
                    Privacy Guarantee
                  </div>
                  <h4 className="text-[15px] font-bold text-white mb-2">
                    Zero-PII Local-First Cryptography
                  </h4>
                  <p className="text-[12px] leading-[1.6] text-[#d1d5db]">
                    No accounts, passwords, or personal identity are stored. Anonymous ID is generated as <code className="text-[#93c5fd] font-mono text-[11px]">hash(device_id + salt)</code> strictly inside the local SQLite database. Aggregated heatmap opt-in only sends anonymized demand tiles.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[11px] text-[#93c5fd]">
                  Repo structure: /app, /docs/standard.md, /api/fuel
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03: HUB BOM */}
        <section id="sec-03" className="scroll-mt-20 mt-6 bg-white rounded-[20px] border border-[#e5e7eb] overflow-clip shadow-xs">
          <div className="px-6 md:px-10 py-8 md:py-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#f1f5f9] pb-6 mb-6">
              <div>
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9ca3af] mb-1.5">
                  Section 03 — Hub Bill of Materials
                </div>
                <h2 className="text-[24px] font-bold tracking-tight text-[#111827]">
                  Bill of Materials & Specifications — 1 Pilot Hub
                </h2>
              </div>
              <span className="font-mono text-[11px] bg-[#f8fafc] text-[#475569] px-3 py-1 rounded-full border border-[#e2e8f0]">
                Lean Re-Use Model (~R107k Total Capex)
              </span>
            </div>

            <p className="text-[14px] leading-[1.6] text-[#4b5563] max-w-[70ch] mb-6">
              Designed for rapid deployment into existing side-road rank shelters. Co-locates commuter feeder e-bikes with Checkers Sixty60 delivery riders for shared 24/7 security and battery charging.
            </p>

            {/* BOM Table */}
            <div className="rounded-xl border border-[#e2e8f0] overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left border-collapse text-[13px]">
                  <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[10px] font-mono uppercase tracking-wider text-[#64748b]">
                    <tr>
                      <th className="px-4 py-3 font-bold w-[25%]">Item & Component</th>
                      <th className="px-4 py-3 font-bold w-[25%]">Specification & Qty</th>
                      <th className="px-4 py-3 font-bold">Design Rationale / Why</th>
                      <th className="px-4 py-3 font-bold w-[18%]">Procurement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    {[
                      { item: 'Commuter E-Bikes', spec: '5× 250W hub, 20" cargo frame', why: 'Low center of gravity, commuter + courier compatible', src: 'Local OEM / Refurb' },
                      { item: 'Tires (Puncture Proof)', spec: '5× Tannus Airless 20×2.0 solid', why: '100% puncture proof; eliminates tube repairs and downtime', src: 'Tannus Direct' },
                      { item: 'Battery Packs', spec: '5× in-bike + 2× spare 48V 14Ah', why: 'Instant hot-swap, no charging wait for riders', src: 'Same as bike OEM' },
                      { item: 'Charging Cabinet', spec: '1× steel, lockable, 8-way + thermal cutoff', why: 'Secure overnight charging + Sixty60 overlap with fire safety', src: 'Local fabrication' },
                      { item: 'A-Frame Ground Rack', spec: '1× 8 bays, heavy-duty anchored', why: 'High visibility, anti-theft, modular expansion', src: 'City Roads approved' },
                      { item: 'CCTV & Solar Light', spec: '1× 4G camera + 30W solar floodlight', why: 'Autonomous operation, no trenching power cables needed', src: 'Reolink / Hikvision' },
                      { item: 'Tool Shadow Board', spec: '1× brake tools, hex set, pump only', why: 'Zero tube tools = visible proof of airless tire policy', src: 'Shadow board' },
                      { item: 'Signage & Branding', spec: '2× Alu dibond 600×900mm', why: 'Clear feeder connection: "OpenKM Hub - MyCiTi Feeder"', src: 'Local print shop' }
                    ].map((row) => (
                      <tr key={row.item} className="hover:bg-[#f8fafc]">
                        <td className="px-4 py-3 font-bold text-[#111827]">{row.item}</td>
                        <td className="px-4 py-3 font-mono text-[12px] text-[#005C99]">{row.spec}</td>
                        <td className="px-4 py-3 text-[#374151]">{row.why}</td>
                        <td className="px-4 py-3 text-[#64748b] text-[12px] font-mono">{row.src}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive Budget Simulator */}
            <div className="mb-8">
              <HubBudgetEstimator />
            </div>

            {/* Staffing & Location Criteria Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-[#e2e8f0] bg-[#f0f7fc] p-5">
                <h4 className="font-mono text-[11px] uppercase tracking-wide font-bold text-[#005C99] mb-3">
                  Staffing: Shared Operations
                </h4>
                <div className="space-y-2.5 text-[13px]">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#111827]">2× Security Guards</span>
                    <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-[#bfdbfe] text-[#005C99]">
                      Shared with Sixty60
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#111827]">1× Maintenance Tech</span>
                    <span className="text-[11px] text-[#64748b]">Brake check & battery swap</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#111827]">1× Time Controller</span>
                    <span className="text-[11px] text-[#64748b]">Logs trips & missing items</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#bfdbfe]/40 font-mono text-[10px] text-[#64748b]">
                  Zero new municipal hires if Checkers shifts cover 07:00–19:00 peak hours.
                </div>
              </div>

              <div className="rounded-xl border border-[#e2e8f0] bg-white p-5">
                <h4 className="font-mono text-[11px] uppercase tracking-wide font-bold text-[#475569] mb-3">
                  Capex Summary
                </h4>
                <div className="space-y-2 text-[13px] font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">5 Bikes + Airless:</span>
                    <span className="font-bold">~R 84,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Rack + Cabinet + CCTV:</span>
                    <span className="font-bold">~R 22,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Shared Security / mo:</span>
                    <span className="font-bold">~R 6,000</span>
                  </div>
                  <div className="pt-2 border-t font-bold flex justify-between text-[#005C99]">
                    <span>Total Initial Capex:</span>
                    <span>~R 106,500</span>
                  </div>
                </div>
                <div className="mt-3 text-[11px] text-[#64748b]">
                  40–50% cost savings realized by co-locating with Checkers Sixty60 anchor bays.
                </div>
              </div>

              <div className="rounded-xl bg-[#111827] text-white p-5">
                <h4 className="font-mono text-[11px] uppercase tracking-wide font-bold text-[#93c5fd] mb-3">
                  Pilot Location Criteria
                </h4>
                <ul className="space-y-1.5 text-[12px] leading-[1.6] text-[#d1d5db]">
                  <li>• Feeds both MyCiTi station & taxi rank (&le;400m each)</li>
                  <li>• 2–3km gap that trunk buses cannot serve economically</li>
                  <li>• High foot traffic with existing Sixty60 delivery activity</li>
                  <li>• Existing roof/shelter at rank (no new building needed)</li>
                  <li>• Side road patchable from shared savings fund</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 04: PARTNERSHIP LETTER */}
        <section id="sec-04" className="scroll-mt-20 mt-6 bg-white rounded-[20px] border border-[#e5e7eb] overflow-clip shadow-xs">
          <div className="px-6 md:px-10 py-8 md:py-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#f1f5f9] pb-6 mb-6">
              <div>
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9ca3af] mb-1.5">
                  Section 04 — Partnership Proposal
                </div>
                <h2 className="text-[24px] font-bold tracking-tight text-[#111827]">
                  Checkers Sixty60 Anchor Tenant Proposal
                </h2>
              </div>
              <span className="font-mono text-[11px] bg-[#fef3c7] text-[#92400e] px-3 py-1 rounded-full border border-[#fde68a] font-semibold">
                Editable Official Letter Template
              </span>
            </div>

            <p className="text-[14px] leading-[1.6] text-[#4b5563] max-w-[70ch] mb-6">
              Use this interactive letter to formalize the dual-use hub with Checkers Sixty60 Regional Operations. Customize the location, contact details, and monthly bay rent below.
            </p>

            <Sixty60LetterEditor />
          </div>
        </section>

        {/* SECTION 05: METRICS & MYCITI VALUE */}
        <section id="sec-05" className="scroll-mt-20 mt-6 bg-white rounded-[20px] border border-[#e5e7eb] overflow-clip shadow-xs">
          <div className="px-6 md:px-10 py-8 md:py-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#f1f5f9] pb-6 mb-6">
              <div>
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9ca3af] mb-1.5">
                  Section 05 — Metrics & Value
                </div>
                <h2 className="text-[24px] font-bold tracking-tight text-[#111827]">
                  Metrics Framework & MyCiTi Value Equation
                </h2>
              </div>
              <span className="font-mono text-[11px] bg-[#f0fdfa] text-[#0f766e] px-3 py-1 rounded-full border border-[#99f6e0] font-semibold">
                Anonymous & Auditable
              </span>
            </div>

            <p className="text-[14px] leading-[1.6] text-[#4b5563] max-w-[70ch] mb-6">
              Every metric collected by OpenKM is privacy-safe, verifiable, and directly maps to municipal cost savings, road rejuvenation, or MyCiTi farebox growth.
            </p>

            {/* Metrics Matrix Table */}
            <div className="rounded-xl border border-[#e2e8f0] overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left border-collapse text-[13px]">
                  <thead className="bg-[#f0f7fc] border-b border-[#bfdbfe] text-[10px] font-mono uppercase tracking-wider text-[#005C99]">
                    <tr>
                      <th className="px-4 py-3 font-bold w-[22%]">Metric Name</th>
                      <th className="px-4 py-3 font-bold w-[38%]">Measurement Methodology</th>
                      <th className="px-4 py-3 font-bold">Value to City & MyCiTi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    {[
                      { m: 'Feeder Km Tracked', how: 'Sum of anonymous GPS km from app (SQLite export), daily aggregate', val: 'Proof of feeder gap demand. Open dataset for municipal transport planning.' },
                      { m: 'Downtime Avoided', how: '0 punctures logged / operational hours. Tannus solid target: 0.', val: 'Validates operational cost model for scaling without tube inventory.' },
                      { m: 'Bike Circulation Rate', how: 'Moving hours / total unlocked hours from GPS heartbeat.', val: '>90% confirms active working asset, justifying shared infrastructure.' },
                      { m: 'MyCiTi Tap-On Uplift', how: 'Turnstile tap data at paired station: 14d baseline vs 30d pilot.', val: 'Direct farebox revenue. Proves feeder e-bike protects trunk transit.' },
                      { m: 'Side-Road Rejuvenation', how: 'Shared savings fund -> municipal patch log with photo + GPS.', val: 'Visible community co-benefit; patches 2-3km feeder streets directly.' },
                      { m: 'Sixty60 Battery Turnaround', how: 'Average minutes saved per hot swap (anchor tenant logs).', val: 'Anchor tenant ROI keeps hub staffed without municipal budget.' },
                      { m: 'Taxi Rank Multimodal Trips', how: '# trips logged as combined taxi + e-bike mode selector.', val: 'Demonstrates non-competing symbiosis with local taxi associations.' }
                    ].map((row) => (
                      <tr key={row.m} className="hover:bg-[#f8fafc]">
                        <td className="px-4 py-3 font-bold text-[#111827]">{row.m}</td>
                        <td className="px-4 py-3 text-[#374151]">{row.how}</td>
                        <td className="px-4 py-3 text-[#4b5563] text-[12px]">{row.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive Value Engine */}
            <div className="mb-8">
              <MyCiTiValueEngine />
            </div>

            {/* Pilot Gate Readiness Checklist */}
            <div>
              <PilotGateChecklist />
            </div>
          </div>
        </section>

        {/* WEEK 1 ROADMAP & QUICKSTART */}
        <section className="mt-6 rounded-[20px] bg-[#111827] text-white overflow-hidden border border-[#1f2937] shadow-md">
          <div className="px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9ca3af] mb-2">
                Action Plan — Week 1
              </div>
              <h3 className="text-[22px] font-bold tracking-tight text-white">
                Fork the Repo, Source Tires, and Approach Store Manager
              </h3>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { n: '1', t: 'Fork Repo & Run Expo', d: 'Clone openkm-cape, run npx expo start, and log your first 1km walk.' },
                  { n: '2', t: 'Source 5 Tannus Solid Tires', d: '20×2.0 solid airless — confirm South African supplier stock.' },
                  { n: '3', t: 'Approach Checkers Manager', d: 'Deliver Section 04 letter with photos of proposed rank location.' },
                  { n: '4', t: 'Log First 100 Feeder Km', d: 'Dogfood with team — export CSV and plot initial density tiles.' }
                ].map((step) => (
                  <div key={step.n} className="rounded-xl bg-[#1f2937] border border-[#374151] p-4">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#005C99] flex items-center justify-center text-[11px] font-bold flex-shrink-0 text-white">
                        {step.n}
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-white">{step.t}</div>
                        <div className="text-[12px] text-[#9ca3af] mt-1 leading-[1.5]">{step.d}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-[320px] space-y-4">
              <div className="rounded-xl bg-[#0b1220] border border-white/10 p-5">
                <div className="font-mono text-[10px] uppercase tracking-wide text-[#93c5fd] mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3" /> Quickstart Terminal
                </div>
                <pre className="font-mono text-[11px] leading-[1.8] text-[#d1d5db] whitespace-pre-wrap bg-[#111a2e] p-3 rounded border border-[#1e293b]">
{`git clone https://github.com/openkm/cape-feeder.git
cd cape-feeder
npm install
npx expo start`}
                </pre>
                <div className="mt-3 text-[10px] font-mono text-[#64748b]">
                  # Scan QR code with Expo Go to test offline GPS tracker
                </div>
              </div>

              <div className="font-mono text-[10px] leading-[1.6] text-[#9ca3af] p-3 bg-white/5 rounded-xl border border-white/5">
                OpenKM Cape Town • MIT Licensed • Zero-PII • Built as a non-competing protective feeder layer for MyCiTi & minibus taxis. Cape Blue <span className="text-[#93c5fd]">#005C99</span>.
              </div>
            </div>
          </div>

          <div className="px-6 md:px-10 py-3.5 bg-black/40 border-t border-white/10 flex flex-wrap justify-between items-center gap-2 font-mono text-[10px] text-[#6b7280]">
            <span>© OpenKM Standard — Government supported, not owned. Open mobility layer.</span>
            <span>openkm_spec.html • v0.1.0 • Offline Ready</span>
          </div>
        </section>
      </main>
    </div>
  );
}
