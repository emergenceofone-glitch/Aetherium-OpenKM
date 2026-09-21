'use client';

import React, { useState } from 'react';
import {
  Battery,
  Box,
  Building2,
  Clipboard,
  Coins,
  Cpu,
  Droplet,
  ExternalLink,
  FileCheck,
  FileText,
  GitBranch,
  Hexagon,
  Layers,
  Link2,
  Lock,
  MapPin,
  Scale,
  Shield,
  Truck,
  Users,
  Weight,
  Zap,
  CheckCircle,
  Download,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';

interface MetaOneCoreProps {
  onNavigateTab?: (tabId: string) => void;
}

export default function MetaOneCore({ onNavigateTab }: MetaOneCoreProps) {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const artifacts = [
    {
      title: 'Pitch v7 16 slides CORE',
      sub: 'with 3-tier organizational model & lean capex',
      file: 'openkm_pitch',
      type: 'PITCH',
      tabTarget: '04-checkers'
    },
    {
      title: 'Financial Model CORE Excel',
      sub: 'OpenKM_Financial_Model_8_Hubs_CORE.xlsx (15mo payback)',
      file: 'OpenKM_Financial_Model_8_Hubs_CORE.xlsx',
      type: 'XLSX',
      tabTarget: 'roi'
    },
    {
      title: 'MOU GB1 CORE',
      sub: 'GB1 Beach Road • No fridge node • Faraday labyrinth',
      file: 'mou_gb1_core.html',
      type: 'MOU',
      tabTarget: '08-mous'
    },
    {
      title: '1-Pager CORE + Org Model',
      sub: 'Executive summary & 24 ground jobs breakdown',
      file: 'openkm_1pager.html',
      type: '1-PAGER',
      tabTarget: 'org-model'
    },
    {
      title: 'Org Model 3-Tier Diagram',
      sub: 'HQ Aetherium • Regional Pilot • Ground Hubs',
      file: 'openkm_org_model.html',
      type: 'DIAGRAM',
      tabTarget: 'org-model'
    },
    {
      title: 'HubBudgetEstimator City Reporting',
      sub: 'City of Cape Town mSCOA & MFMA Section 71 Export',
      file: 'hubbudgetestimator_cct.html',
      type: 'ESTIMATOR',
      tabTarget: '03-bom'
    },
    {
      title: 'MFMA S71 Auto-Fill Schedules',
      sub: 'C1 Summary, C2 Class, C5 Capital by Vote',
      file: 'mfma_s71_autofill.html',
      type: 'MFMA',
      tabTarget: '03-bom'
    },
    {
      title: 'Global Blueprint (8 → 1000 Hubs)',
      sub: 'Interactive world map & modular scaling roadmap',
      file: 'openkm_global_blueprint.html',
      type: 'GLOBAL',
      tabTarget: 'global-blueprint'
    },
    {
      title: 'Master Pack CORE Final',
      sub: 'Single Source of Truth compiled operations pack',
      file: 'master_pack_core.html',
      type: 'MASTER',
      tabTarget: '07-assessment'
    }
  ];

  return (
    <div className="rounded-[24px] bg-[#050505] text-white selection:bg-[#D4AF37]/30 selection:text-white border border-white/[0.08] overflow-hidden shadow-2xl font-sans">
      {/* Top Gold Accent Line */}
      <div className="h-[3px] w-full bg-[#D4AF37]" />

      {/* Header Bar */}
      <div className="border-b border-white/[0.08] bg-[#050505]/90 backdrop-blur-xl px-5 md:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-9 w-9 rounded-[8px] bg-[#D4AF37] text-black flex items-center justify-center font-bold text-[13px] tracking-[0.12em] font-mono shadow-xs">
            M1
          </div>
          <div className="leading-tight">
            <div className="font-mono text-[10px] tracking-[0.25em] text-[#D4AF37] font-semibold uppercase">
              METAONECORE // FINAL // CORE ONLY
            </div>
            <div className="font-bold tracking-tight text-[13px] md:text-[14px] text-white">
              OpenKM Cape Town — Low-Data Translator Standard
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[9.5px] tracking-[0.18em] px-2.5 py-1 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/10 font-medium">
            COST PER OPEN KM
          </span>
          <span className="font-mono text-[9.5px] tracking-[0.18em] px-2.5 py-1 rounded-full border border-white/10 text-white/60">
            SUPPORT NOT OWN
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-5 md:px-8 lg:px-10 pt-8 md:pt-12 pb-8 border-b border-white/[0.06] bg-gradient-to-b from-[#080808] to-[#050505]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="max-w-[860px]">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-10 bg-[#D4AF37]" />
              <span className="font-mono text-[11px] tracking-[0.22em] text-[#D4AF37] font-semibold">
                A41 // ALL FOR ONE — EMERGENCE
              </span>
            </div>

            <h1 className="text-[32px] md:text-[50px] lg:text-[58px] font-extrabold leading-[0.94] tracking-[-0.03em] font-serif">
              MetaOneCore<br />
              <span className="text-white/40 italic font-normal text-[28px] md:text-[44px]">OpenKM Cape Town CORE</span><br />
              <span className="text-[#D4AF37]">Single Source of Truth — Final</span>
            </h1>

            <div className="mt-5 flex flex-wrap gap-2">
              <div className="text-[12px] md:text-[12.5px] leading-[1.5] px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/80">
                Activate SA AI 2026 CTICC 25-27 Aug Remote Build | <span className="text-[#D4AF37] font-mono">@A41Z14A</span> <span className="text-white/40 font-mono">huggingface.co/obzrv</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-[10px]">
              {[
                { k: 'NO LOCALDATA', v: 'TRANSLATOR ONLY' },
                { k: 'PRIVACY', v: 'BIKE ID ONLY • POPIA' },
                { k: 'TCO', v: 'R4.40 / KM • 65% < TAXI' },
                { k: 'UPTIME', v: '100% ISOLATION' }
              ].map((item) => (
                <div key={item.k} className="rounded-[12px] bg-[#0A0A0A] border border-white/[0.07] px-3 py-2.5">
                  <div className="text-white/35 tracking-[0.16em] uppercase text-[9px] font-semibold">{item.k}</div>
                  <div className="text-white mt-1 tracking-[0.04em] font-bold">{item.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-[340px] shrink-0">
            <div className="rounded-[20px] bg-[#0A0A0A] border border-[#D4AF37]/25 p-5 relative overflow-hidden shadow-lg">
              <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#D4AF37]/15 blur-[28px]" />
              <div className="font-mono text-[9px] tracking-[0.25em] text-[#D4AF37] font-bold uppercase">
                MASTER DASHBOARD
              </div>
              <div className="mt-2.5 text-[12.5px] leading-[1.6] text-white/70">
                Dark <span className="font-mono text-white/90">#050505</span> • Gold <span className="font-mono text-[#D4AF37]">#D4AF37</span> • White. Single scroll. 6 Pillars. Links to all CORE artifacts. No mesh. No fridge node. No LocalData.
              </div>
              <div className="mt-4 h-[1px] bg-white/[0.08]" />
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-[24px] font-bold text-[#D4AF37] font-serif">6</div>
                  <div className="font-mono text-[8.5px] text-white/40 uppercase tracking-wider">PILLARS</div>
                </div>
                <div>
                  <div className="text-[24px] font-bold text-[#D4AF37] font-serif">8</div>
                  <div className="font-mono text-[8.5px] text-white/40 uppercase tracking-wider">HUBS</div>
                </div>
                <div>
                  <div className="text-[24px] font-bold text-[#D4AF37] font-serif">24</div>
                  <div className="font-mono text-[8.5px] text-white/40 uppercase tracking-wider">JOBS</div>
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-[14px] border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 flex items-center justify-between">
              <span className="font-mono text-[9.5px] tracking-[0.18em] text-white/50 uppercase">
                GB1 BEACH ROAD CORE
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9.5px] text-[#D4AF37] font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE NODE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Pillars Bento Grid */}
      <div className="px-5 md:px-8 lg:px-10 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 auto-rows-fr">
          
          {/* Pillar 01 */}
          <div className="rounded-[22px] bg-[#0A0A0A] border border-white/[0.08] overflow-hidden flex flex-col">
            <div className="h-[3px] w-full bg-[#D4AF37]" />
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between">
                <div className="h-9 w-9 rounded-[10px] bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <Cpu className="h-4 w-4 text-[#D4AF37]" />
                </div>
                <span className="font-mono text-[9px] tracking-[0.18em] px-2 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/20 font-semibold">
                  01 // CORE SYSTEM SPEC
                </span>
              </div>

              <h2 className="text-[22px] font-bold leading-[1.1] mt-4 font-serif">
                No LocalData — Triple Fleet
              </h2>
              <div className="font-mono text-[10px] tracking-[0.16em] text-white/40 mt-1 uppercase">
                LOW-DATA TRANSLATOR STANDARD
              </div>

              <div className="mt-5 space-y-2.5 flex-1">
                {[
                  { name: 'HillClimber', spec: '85Nm Cargo Tannus 26x2.0 130kg 625Wh (150kg rider)', icon: Truck },
                  { name: 'CiTiDriver', spec: '65Nm 500Wh 700x40c 110kg — Commuter Core', icon: Zap },
                  { name: 'SleekSlider', spec: '45Nm belt tan-wall tourist R450/day wine crate', icon: Box }
                ].map((bike) => (
                  <div key={bike.name} className="rounded-[12px] bg-[#111111] border border-white/[0.06] p-2.5 flex gap-3 items-center">
                    <div className="h-8 w-8 rounded-[8px] bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                      <bike.icon className="h-4 w-4 text-[#D4AF37]" />
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-white">{bike.name}</div>
                      <div className="font-mono text-[10px] text-white/50 leading-snug">{bike.spec}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-white/[0.06]">
                <div className="font-mono text-[9px] tracking-[0.2em] text-white/35 mb-2.5 uppercase font-semibold">
                  SAFETY &amp; HARDWARE SPECS
                </div>
                <div className="space-y-2 text-[11.5px] leading-relaxed text-white/70">
                  <div className="flex gap-2 items-start">
                    <Shield className="h-3.5 w-3.5 text-[#D4AF37] mt-[2px] shrink-0" />
                    <span><b className="text-white">Faraday Labyrinth 86x2mm double 90° bend</b> + IR 2s wake only inside + Last TapReceiver locked bin + ferrite focus RF 30% inward anti-relay</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Battery className="h-3.5 w-3.5 text-[#D4AF37] mt-[2px] shrink-0" />
                    <span>Charging Cabinet IP54 max 2/shelf, smoke/CO2 sensor, grounded, solar LED status</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Weight className="h-3.5 w-3.5 text-[#D4AF37] mt-[2px] shrink-0" />
                    <span>Weight gate S/M/L 150/110kg, Tannus 100% puncture-proof airless tires</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <Lock className="h-3.5 w-3.5 text-[#D4AF37] mt-[2px] shrink-0" />
                    <span>Inclusive TapCard R12 NTAG215 (R50 deposit, R80 keepsake Protea), DropBox R650 oak steel Blockbuster Box with R50 refund green LED</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[14px] bg-[#D4AF37]/[0.08] border border-[#D4AF37]/20 p-3.5">
                <div className="font-mono text-[9px] tracking-[0.2em] text-[#D4AF37] font-bold uppercase">
                  TCO ANALYSIS
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <div className="font-serif text-[18px] text-white font-bold">R4.40/km</div>
                    <div className="font-mono text-[8.5px] text-white/50">vs Taxi R12.50 (65% cheaper)</div>
                  </div>
                  <div>
                    <div className="font-serif text-[18px] text-[#D4AF37] font-bold">R2.87/km</div>
                    <div className="font-mono text-[8.5px] text-white/50">with hire offset (-35%)</div>
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-mono text-white/60 leading-normal">
                  Payback: 4.2mo per bike (R11.5k/bike 5yr). Break-even: 0.73 rides/bike/day (3.6 hub) vs actual 6.6.
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 02 */}
          <div className="rounded-[22px] bg-[#0A0A0A] border border-white/[0.08] overflow-hidden flex flex-col">
            <div className="h-[3px] w-full bg-white/20" />
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between">
                <div className="h-9 w-9 rounded-[10px] bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <span className="font-mono text-[9px] tracking-[0.18em] px-2 py-1 rounded-full bg-white/10 text-white/70 border border-white/10 font-semibold">
                  02 // ORG MODEL
                </span>
              </div>

              <h2 className="text-[22px] font-bold leading-[1.1] mt-4 font-serif">
                3-Tier Org Model — 24 Jobs
              </h2>
              <div className="font-mono text-[10px] tracking-[0.16em] text-white/40 mt-1 uppercase">
                SUPPORT NOT OWN
              </div>

              <div className="mt-5 space-y-3 flex-1">
                <div className="rounded-[14px] border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-3.5">
                  <div className="flex items-center gap-2">
                    <Hexagon className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span className="font-mono text-[10px] tracking-[0.18em] text-[#D4AF37] font-bold uppercase">
                      TIER 1 — HQ AETHERIUM
                    </span>
                  </div>
                  <div className="text-[11.5px] leading-relaxed text-white/70 mt-1.5">
                    Architect Protocol Cost per Open KM, Hardware Integrity (ESP32-S3/IP65 PN532), Data Audit (100m Privacy CSV), Partnerships (City of Cape Town / Checkers Sixty60).
                  </div>
                </div>

                <div className="rounded-[14px] border border-white/[0.08] bg-white/[0.03] p-3.5">
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-3.5 w-3.5 text-white/70" />
                    <span className="font-mono text-[10px] tracking-[0.18em] text-white/70 font-bold uppercase">
                      TIER 2 — REGIONAL PILOT
                    </span>
                  </div>
                  <div className="text-[11.5px] leading-relaxed text-white/70 mt-1.5">
                    Coordinator 8-Hub (5 GB + 3 CT Feeder), Logistics Battery 2nd Life (500 cycles solar micro-grid), Tannus Airless &amp; belt Carbon Drive, Liaison Taxi Rank Feeder.
                  </div>
                </div>

                <div className="rounded-[14px] border border-white/[0.08] bg-white/[0.03] p-3.5">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-white/70" />
                    <span className="font-mono text-[10px] tracking-[0.18em] text-white/70 font-bold uppercase">
                      TIER 3 — GROUND (24 JOBS)
                    </span>
                  </div>
                  <div className="text-[11.5px] leading-relaxed text-white/70 mt-1.5 space-y-1.5">
                    <div><b className="text-white">3 jobs / hub = 24 total:</b></div>
                    <div>• <b>Time Controller:</b> NFC onboarding, float management (R19.6k/hub)</div>
                    <div>• <b>Belt &amp; Safety Curator:</b> Weekly QR hydraulic check (180/160mm), tilt sensor, 400 lumen, brake cut-off (25km/h cap)</div>
                    <div>• <b>DropBox Guardian:</b> Labyrinth IR verification, R50 refund custody</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-[12px] bg-white/[0.04] border border-white/[0.06] px-3.5 py-2.5">
                <div className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-mono text-[9.5px] tracking-[0.12em] text-white/60">
                  OPEX R11,900/yr/bike shared across 5 bikes/station • 100% uptime isolation
                </span>
              </div>
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="rounded-[22px] bg-[#0A0A0A] border border-white/[0.08] overflow-hidden flex flex-col">
            <div className="h-[3px] w-full bg-[#D4AF37]" />
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between">
                <div className="h-9 w-9 rounded-[10px] bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <Coins className="h-4 w-4 text-[#D4AF37]" />
                </div>
                <span className="font-mono text-[9px] tracking-[0.18em] px-2 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/20 font-semibold">
                  03 // FINANCIALS CORE
                </span>
              </div>

              <h2 className="text-[22px] font-bold leading-[1.1] mt-4 font-serif">
                No Mesh — Lean Capex
              </h2>
              <div className="font-mono text-[10px] tracking-[0.16em] text-white/40 mt-1 uppercase">
                R1.597M ASK • 15MO PAYBACK
              </div>

              <div className="mt-5 rounded-[14px] bg-[#111111] border border-white/[0.06] p-3.5">
                <div className="font-mono text-[9px] tracking-[0.2em] text-white/35 mb-2 uppercase font-semibold">
                  CAPEX BREAKDOWN (8 HUBS)
                </div>
                {[
                  { label: 'Capex Rolling Stock & Docks', value: 'R1.233M', pct: 77 },
                  { label: 'Working Capital Reserve', value: 'R119k', pct: 12 },
                  { label: 'Permits, Legal & Insurance', value: 'R60k', pct: 6 },
                  { label: 'Community Marketing & Launch', value: 'R40k', pct: 4 },
                  { label: 'Contingency Allocation', value: 'R145k', pct: 9 }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                    <span className="text-[11px] text-white/60">{item.label}</span>
                    <span className="font-mono text-[11px] text-white font-semibold">{item.value}</span>
                  </div>
                ))}
                <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-[9.5px]">
                  <span className="text-white/40 line-through">Was R1.685M (R80k mesh dev removed)</span>
                  <span className="text-[#D4AF37] font-bold">NOW R1.597M</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <div className="rounded-[14px] bg-[#D4AF37] text-black p-3.5">
                  <div className="font-mono text-[9px] tracking-[0.16em] opacity-70 font-semibold uppercase">YEAR 1 NET</div>
                  <div className="font-serif text-[22px] font-bold mt-0.5">R1.2M</div>
                  <div className="font-mono text-[8.5px] opacity-80 mt-0.5">after side-road fund</div>
                </div>

                <div className="rounded-[14px] bg-white/[0.06] border border-white/[0.08] p-3.5">
                  <div className="font-mono text-[9px] tracking-[0.16em] text-white/40 font-semibold uppercase">SIDE-ROAD REPAIR</div>
                  <div className="font-serif text-[18px] font-bold mt-0.5 text-white">1,100 m²</div>
                  <div className="font-mono text-[8.5px] text-white/50 mt-0.5">20% fund • R280/m²</div>
                </div>
              </div>

              <div className="mt-4 rounded-[12px] border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="font-mono text-[9px] tracking-[0.18em] text-white/35 uppercase font-semibold">
                  TRIPLE REVENUE STREAMS
                </div>
                <div className="text-[11px] leading-relaxed text-white/70 mt-1">
                  City Feeder (R6.20/km) + Sixty60 Cargo Box Sublease + Tourist Day Rentals (R450/day).
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 04 */}
          <div className="rounded-[22px] bg-[#0A0A0A] border border-white/[0.08] overflow-hidden flex flex-col">
            <div className="h-[3px] w-full bg-white/20" />
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between">
                <div className="h-9 w-9 rounded-[10px] bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <FileCheck className="h-4 w-4 text-white" />
                </div>
                <span className="font-mono text-[9px] tracking-[0.18em] px-2 py-1 rounded-full bg-white/10 text-white/70 border border-white/10 font-semibold">
                  04 // CITY COMPLIANCE
                </span>
              </div>

              <h2 className="text-[22px] font-bold leading-[1.1] mt-4 font-serif">
                mSCOA MFMA S71
              </h2>
              <div className="font-mono text-[10px] tracking-[0.16em] text-white/40 mt-1 uppercase">
                CITY OF CAPE TOWN REPORTING
              </div>

              <div className="mt-5 rounded-[14px] bg-[#111111] border border-white/[0.06] p-3.5">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span className="font-mono text-[10.5px] text-white font-bold">WBS CPX.0019482-F1</span>
                </div>
                <div className="text-[11px] leading-relaxed text-white/60 mt-1.5">
                  Vote 19050010 Directorate Urban Mobility Transport Planning NMT, FY26/27. Nodes: GB1 (-34.1581, 18.8615), GB2, GB3, GB4, GB5 + 3 CT Feeder Nodes.
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {['CAP-INF-NMT-ROLL-001', 'CITP 2023-2028 NMT-04', 'Climate 3.2', 'SANS 10400-S'].map((tag) => (
                    <span key={tag} className="font-mono text-[8px] px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-1.5 flex-1">
                <div className="font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase font-semibold">
                  9 mSCOA CODES SCHEDULE
                </div>
                <div className="rounded-[12px] bg-[#0F0F0F] border border-white/[0.06] overflow-hidden text-[9.5px] font-mono">
                  <div className="grid grid-cols-[1.5fr_0.6fr_0.5fr] text-white/35 px-3 py-1.5 border-b border-white/[0.06] font-semibold">
                    <span>CODE</span>
                    <span>TYPE</span>
                    <span className="text-right">SRC</span>
                  </div>
                  {[
                    { c: 'CAP-INF-NMT-ROLL-001', t: 'Rollout', s: 'USDG' },
                    { c: 'CAP-INF-NMT-TIRE-002', t: 'Airless', s: 'CCT' },
                    { c: 'CAP-INF-NMT-BATT-003', t: 'Battery', s: 'CCT' },
                    { c: 'CAP-INF-NMT-CIVIL-004', t: 'DropBox', s: 'CPX' },
                    { c: 'OPEX-MAINT-FLEET-005', t: 'Tannus/Belt', s: 'Vote' },
                    { c: 'OPEX-SEC-SHARED-006', t: 'CCTV Solar', s: 'Shared' },
                    { c: 'REV-SUBLEASE-ANCHOR-007', t: 'Checkers', s: 'Offset' },
                    { c: 'REV-FAREBOX-FEEDER-008', t: 'MyCiTi', s: 'Farebox' },
                    { c: 'FUND-ROAD-REPAIR-009', t: '20% Tar', s: 'Fund' }
                  ].map((item) => (
                    <div key={item.c} className="grid grid-cols-[1.5fr_0.6fr_0.5fr] px-3 py-1 border-b border-white/[0.03] last:border-0 text-white/70">
                      <span className="truncate">{item.c}</span>
                      <span className="text-white/50">{item.t}</span>
                      <span className="text-[#D4AF37]/80 text-right">{item.s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-[12px] bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-3">
                <div className="font-mono text-[9px] tracking-[0.18em] text-[#D4AF37] font-bold uppercase">
                  QUICK EXPORT CSV • RFC 4180 UTF-8
                </div>
                <div className="text-[11px] leading-relaxed text-white/70 mt-1">
                  Download <span className="font-mono text-white/90 text-[10px]">City_of_Cape_Town_Hub_Budget_mSCOA_date.csv</span> with UTF-8 BOM, MFMA Section 71 Auto-Fill, and full VAT 15% schedules.
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 05 */}
          <div className="rounded-[22px] bg-[#0A0A0A] border border-white/[0.08] overflow-hidden flex flex-col">
            <div className="h-[3px] w-full bg-[#D4AF37]" />
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between">
                <div className="h-9 w-9 rounded-[10px] bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <Scale className="h-4 w-4 text-[#D4AF37]" />
                </div>
                <span className="font-mono text-[9px] tracking-[0.18em] px-2 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/20 font-semibold">
                  05 // LEGAL &amp; OPS
                </span>
              </div>

              <h2 className="text-[22px] font-bold leading-[1.1] mt-4 font-serif">
                MOU • RFQ • SOP
              </h2>
              <div className="font-mono text-[10px] tracking-[0.16em] text-white/40 mt-1 uppercase">
                POPIA BIKE ID ONLY
              </div>

              <div className="mt-5 space-y-3 flex-1">
                <div className="rounded-[14px] bg-[#111111] border border-white/[0.06] p-3.5">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span className="font-mono text-[10px] tracking-[0.15em] text-white font-bold">
                      MOU GB1 BEACH ROAD CORE
                    </span>
                  </div>
                  <div className="text-[11px] leading-relaxed text-white/60 mt-1.5">
                    No fridge node, no mesh. DropBox Faraday anti-relay + MIK HD 27kg + solar LED CCTV. 12mo term, 30-day termination, 5% community fund.
                  </div>
                </div>

                <div className="rounded-[14px] bg-[#111111] border border-white/[0.06] p-3.5">
                  <div className="flex items-center gap-2">
                    <Layers className="h-3.5 w-3.5 text-white/60" />
                    <span className="font-mono text-[10px] tracking-[0.15em] text-white/80 font-bold">
                      RFQ DROPBOX + CABINET
                    </span>
                  </div>
                  <div className="text-[11px] leading-relaxed text-white/60 mt-1.5">
                    8 Units target R13k/station. IP54 rating, max 2 batteries per shelf, smoke &amp; CO2 sensors, grounded solar power.
                  </div>
                </div>

                <div className="rounded-[14px] bg-[#111111] border border-white/[0.06] p-3.5">
                  <div className="flex items-center gap-2">
                    <Clipboard className="h-3.5 w-3.5 text-white/60" />
                    <span className="font-mono text-[10px] tracking-[0.15em] text-white/80 font-bold">
                      EQUIPMENT JOURNAL &amp; SOPS
                    </span>
                  </div>
                  <div className="text-[11px] leading-relaxed text-white/60 mt-1.5 space-y-1">
                    <div>• QR tagged inventory, S2S inventory min 3 bikes (guard &lt;30min SLA).</div>
                    <div>• SOP battery swap 06:00 &amp; 14:00, weight gate 60-second fit.</div>
                    <div className="flex items-center gap-1.5 text-white/40 font-mono text-[9px] pt-1">
                      <Droplet className="h-3 w-3 text-[#D4AF37]" /> Sea Point Protocol 8km/h pedestrian ROW compliant.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[9px]">
                <div className="rounded-[10px] bg-white/[0.04] border border-white/[0.06] px-3 py-2">
                  <div className="text-white/35 uppercase">CCTV RETENTION</div>
                  <div className="text-white mt-0.5 font-bold">12MO • SOLAR LED</div>
                </div>
                <div className="rounded-[10px] bg-white/[0.04] border border-white/[0.06] px-3 py-2">
                  <div className="text-white/35 uppercase">TERMINATION</div>
                  <div className="text-white mt-0.5 font-bold">30-DAY • 5% FUND</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 06 */}
          <div className="rounded-[22px] bg-[#0A0A0A] border border-[#D4AF37]/30 overflow-hidden flex flex-col xl:col-span-1 md:col-span-2">
            <div className="h-[3px] w-full bg-[#D4AF37]" />
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between">
                <div className="h-9 w-9 rounded-[10px] bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center">
                  <Link2 className="h-4 w-4 text-[#D4AF37]" />
                </div>
                <span className="font-mono text-[9px] tracking-[0.18em] px-2 py-1 rounded-full bg-[#D4AF37] text-black font-bold">
                  06 // ALL CORE ARTIFACTS
                </span>
              </div>

              <h2 className="text-[22px] font-bold leading-[1.1] mt-4 font-serif">
                Links — All CORE Artifacts
              </h2>
              <div className="font-mono text-[10px] tracking-[0.16em] text-[#D4AF37]/70 mt-1 uppercase font-semibold">
                SINGLE SOURCE OF TRUTH
              </div>

              <div className="mt-5 space-y-2 flex-1">
                {artifacts.map((art) => (
                  <button
                    key={art.file}
                    onClick={() => onNavigateTab ? onNavigateTab(art.tabTarget) : undefined}
                    className="w-full group flex items-center justify-between gap-3 rounded-[12px] bg-[#111111] border border-white/[0.06] hover:border-[#D4AF37]/40 hover:bg-[#161616] transition-all p-2.5 text-left cursor-pointer"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-white/[0.08] text-white/60 border border-white/[0.08] font-semibold">
                          {art.type}
                        </span>
                        <span className="text-[12px] font-bold text-white group-hover:text-[#D4AF37] transition-colors truncate">
                          {art.title}
                        </span>
                      </div>
                      <div className="font-mono text-[9px] text-white/35 truncate mt-0.5">
                        {art.sub}
                      </div>
                    </div>
                    <div className="h-7 w-7 rounded-full bg-white/[0.06] group-hover:bg-[#D4AF37] group-hover:text-black flex items-center justify-center shrink-0 transition-colors">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-[14px] bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-3.5">
                <div className="font-mono text-[9px] tracking-[0.2em] text-[#D4AF37] font-bold uppercase">
                  PROTOCOL COST PER OPEN KM
                </div>
                <div className="text-[11px] leading-relaxed text-white/70 mt-1">
                  Aetherium Architect Protocol • Hardware Integrity • Data Audit • Partnerships. Triple Revenue validation. Support Not Own.
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <div className="flex-1 rounded-[10px] bg-white text-black text-center py-2 font-mono text-[10px] font-bold tracking-[0.12em]">
                  CORE ONLY
                </div>
                <div className="flex-1 rounded-[10px] bg-white/[0.06] border border-white/[0.1] text-white/60 text-center py-2 font-mono text-[10px] tracking-[0.12em]">
                  NO MESH
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="rounded-[16px] bg-[#0A0A0A] border border-white/[0.06] px-5 py-3.5 flex items-center justify-between">
            <div className="font-mono text-[10px] tracking-[0.15em] text-white/40 uppercase font-semibold">WEIGHT GATE S/M/L</div>
            <div className="font-mono text-[11px] text-white font-bold">150 / 110 kg • Tannus 0 punctures • 25km/h cap</div>
          </div>
          <div className="rounded-[16px] bg-[#D4AF37] text-black px-5 py-3.5 flex items-center justify-between shadow-sm">
            <div className="font-mono text-[10px] tracking-[0.15em] opacity-70 uppercase font-semibold">BREAK-EVEN</div>
            <div className="text-[13px] font-bold">0.73 rides/bike/day • 3.6 hub vs actual 6.6</div>
          </div>
          <div className="rounded-[16px] bg-[#0A0A0A] border border-white/[0.06] px-5 py-3.5 flex items-center justify-between">
            <div className="font-mono text-[10px] tracking-[0.15em] text-white/40 uppercase font-semibold">PAYBACK</div>
            <div className="font-mono text-[11px] text-white font-bold">4.2mo bike • 15mo system • R11,500/bike 5yr</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.06] bg-[#080808] px-5 md:px-8 lg:px-10 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-[6px] bg-[#D4AF37] text-black flex items-center justify-center font-bold text-[11px] font-mono">
                M1
              </div>
              <span className="font-serif text-[18px] tracking-tight font-bold">MetaOneCore</span>
              <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 border border-white/10 px-2 py-0.5 rounded-full uppercase">
                SINGLE SOURCE OF TRUTH
              </span>
            </div>
            <div className="font-mono text-[10px] leading-relaxed text-white/40 mt-2.5 max-w-[640px]">
              MetaOneCore Single Source of Truth No LocalData CORE Only Support Not Own Aetherium HQ github.com/Vessels-of-the-Train/Aetherium_HQ Contact @A41Z14A.
            </div>
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-[9px]">
            <span className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60">
              NO LOCALDATA
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/20 text-[#D4AF37] font-semibold">
              CORE ONLY
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60">
              SUPPORT NOT OWN
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60">
              COST PER OPEN KM
            </span>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] tracking-[0.15em] text-white/25">
          <span>© 2026 A41 // ALL FOR ONE — EMERGENCE • Activate SA AI 2026 CTICC</span>
          <span>FINAL BUILD • metaonecore_final.html • DARK #050505 GOLD #D4AF37</span>
        </div>
      </div>
    </div>
  );
}
