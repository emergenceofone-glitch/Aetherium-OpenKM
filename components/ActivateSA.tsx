'use client';

import React, { useState } from 'react';
import { 
  Printer, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  Compass, 
  Bike, 
  Cpu, 
  Layers, 
  Coins, 
  MapPin, 
  Sparkles, 
  FileText, 
  Radio, 
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lock,
  Hammer
} from 'lucide-react';
import { formatNumber, formatDecimal } from '@/lib/utils';

export default function ActivateSA() {
  const [activeSubTab, setActiveSubTab] = useState<'1pager' | 'translator' | 'dropbox' | 'economics' | 'challenges'>('1pager');
  const [copied, setCopied] = useState(false);
  const [seaPointMode, setSeaPointMode] = useState(false);
  const [touristRentalsPerDay, setTouristRentalsPerDay] = useState<number>(12);

  // Tourism to Road Repair calculations
  const touristDailyPrice = 450;
  const touristTcoCost = 305;
  const surplusPerRental = touristDailyPrice - touristTcoCost; // R145
  const tarPatchCostPerM2 = 72.50; // R145 / 2m² = R72.50 per m²
  const tarM2PerRental = surplusPerRental / tarPatchCostPerM2; // 2.0 m²
  const annualTarM2Repaired = touristRentalsPerDay * tarM2PerRental * 300; // 300 operating days

  const copyPitchSummary = () => {
    const text = `# OpenKM — Low-Data Translator for Transport
Live at Activate SA AI 2026 • CTICC Cape Town • 25-27 Aug
Remote Build: A41 // ALL FOR ONE — EMERGENCE

## Executive Summary
- The Gap: Taxi walk R12.50/km, MyCiTi feeder gap R18.00/km, 25% puncture downtime, 60% commuters without NFC phones.
- Solution: Low-Data Translator Standard (Cost per Open KM = base × method × fuel).
- Dual Fleet: HillClimber 85Nm (15% grades, Tannus Airless) + CiTiDriver 65Nm (Flat feeder).
- Inclusive Lock: R12 TapCard (NTAG215) + R650 Steel Faraday DropBox with IR wake.
- Business Model: R4.40/km TCO (vs R12.50 taxi). Tourist rentals (R450/day) generate R145 surplus = 2m² road tar repair per rental.
- 24 Local Jobs: Across 8 pilot hubs in Gordon's Bay in partnership with Checkers Sixty60.
- Grand Challenges: Mapped to Project Hephaestus, Alexandria & Chimera.

GitHub: github.com/emergenceofone-glitch/Aetherium-OpenKM
HuggingFace: huggingface.co/obzrv`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="activate-sa-container" className="w-full space-y-6">
      {/* Top Header & Actions Bar */}
      <div className="bg-[#0A0A0A] text-white rounded-2xl p-5 md:p-6 border-2 border-[#D4AF37]/40 shadow-lg print:hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] md:text-[11px] font-mono font-black tracking-widest uppercase">
                Activate SA AI 2026 • CTICC
              </span>
              <span className="text-[11px] text-white/50 font-mono">
                25-27 Aug 2026 • Remote Build Showcase
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                Live Specification
              </span>
            </div>
            <h1 className="text-[22px] md:text-[26px] font-black text-white tracking-tight flex items-center gap-2.5">
              <span>OpenKM Translator Standard</span>
              <span className="text-[#D4AF37] font-normal text-[18px]">/ Project Emergence</span>
            </h1>
            <p className="text-[12.5px] md:text-[13px] text-white/70 mt-1 max-w-3xl">
              Low-data, hardware-agnostic translator bridging informal minibus transport, e-bikes, and City of Cape Town infrastructure. Establishing the <strong className="text-white">&quot;Cost per Open KM&quot;</strong> standard to fund side-road repairs via tourist &amp; feeder efficiency.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold text-[12px] transition-all shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print A4 1-Pager
            </button>
            <button
              onClick={copyPitchSummary}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium text-[12px] transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied Pitch' : 'Copy Summary'}
            </button>
            <a
              href="https://github.com/emergenceofone-glitch/Aetherium-OpenKM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white font-mono text-[11px] transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" /> Repo
            </a>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
          {[
            { id: '1pager', label: '1-Pager (A4 Print Artifact)', icon: FileText },
            { id: 'translator', label: 'Translator & Dual Fleet', icon: Bike },
            { id: 'dropbox', label: 'DropBox & TapCard Lock', icon: Lock },
            { id: 'economics', label: 'Road Tar Repair & TCO', icon: TrendingUp },
            { id: 'challenges', label: 'Aetherium Challenges', icon: Compass },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37] text-black shadow-sm font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#D4AF37]'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-tab Content */}

      {/* TAB 1: 1-PAGER PRINT ARTIFACT (High Fidelity Matching Activate SA 1-Pager) */}
      {activeSubTab === '1pager' && (
        <div className="w-full flex justify-center py-2">
          <div className="w-full max-w-[960px] bg-[#0A0A0A] text-white border-[2px] border-[#D4AF37] rounded-[18px] overflow-hidden shadow-[0_0_0_1px_rgba(212,175,55,0.15),0_40px_120px_rgba(0,0,0,0.8)]">
            <div className="px-6 md:px-10 pt-6 md:pt-8 pb-6">
              {/* Header row */}
              <div className="flex justify-between items-start gap-4 border-b border-white/10 pb-4">
                <div className="text-[10px] md:text-[11px] tracking-[0.22em] font-bold text-white/70 uppercase font-mono">
                  A41 // ALL FOR ONE — EMERGENCE
                </div>
                <div className="text-[10px] md:text-[11px] tracking-[0.14em] font-bold text-[#D4AF37] uppercase text-right font-mono">
                  ACTIVATE SA • 25-27 AUG 2026 • REMOTE BUILD
                </div>
              </div>

              {/* Title Header */}
              <div className="pt-6 pb-5">
                <h1 className="text-[24px] md:text-[28px] leading-[1.1] font-black tracking-[-0.02em] text-white">
                  OpenKM — <span className="text-[#D4AF37]">Low-Data Translator</span> for Transport
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] md:text-[14px] text-white/60">
                  <span>Independent Public Transport Support System</span>
                  <span className="hidden md:inline w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-white/90 font-mono text-[11px] md:text-[12px] bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-full">
                    github.com/emergenceofone-glitch/Aetherium-OpenKM
                  </span>
                </div>
              </div>

              {/* 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {/* Column 1 */}
                <div className="flex flex-col gap-4">
                  {/* Block 1: The Gap */}
                  <div className="rounded-[14px] border border-white/10 bg-white/[0.03] p-4 md:p-[18px]">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-[28px] h-[28px] rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[14px]">
                        ◐
                      </div>
                      <h2 className="text-[13px] md:text-[14px] font-black tracking-[0.12em] uppercase text-[#D4AF37]">
                        1. The Gap in Cape Town
                      </h2>
                    </div>
                    <p className="text-[11.5px] leading-[1.5] text-white/80">
                      Taxi rank walk <span className="text-white font-bold">R12.50/km</span>, MyCiTi feeder gap <span className="text-white font-bold">R18.00/km</span>, 25% downtime from punctures, 15% gradients, 60% without NFC phones. Sea Point Promenade protocol (8 km/h, pedestrian right-of-way) shows need for compliant low-power translators.
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="rounded-[8px] bg-black border border-white/10 px-2 py-2 text-center">
                        <div className="text-[16px] font-black text-white">25%</div>
                        <div className="text-[9px] uppercase tracking-widest text-white/50">Puncture DT</div>
                      </div>
                      <div className="rounded-[8px] bg-black border border-white/10 px-2 py-2 text-center">
                        <div className="text-[16px] font-black text-white">15%</div>
                        <div className="text-[9px] uppercase tracking-widest text-white/50">Gradients</div>
                      </div>
                      <div className="rounded-[8px] bg-black border border-white/10 px-2 py-2 text-center">
                        <div className="text-[16px] font-black text-white">60%</div>
                        <div className="text-[9px] uppercase tracking-widest text-white/50">No NFC</div>
                      </div>
                    </div>
                  </div>

                  {/* Block 2: Solution */}
                  <div className="rounded-[14px] border border-[#D4AF37]/20 bg-[#D4AF37]/[0.04] p-4 md:p-[18px]">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-[28px] h-[28px] rounded-full bg-[#D4AF37] text-black flex items-center justify-center text-[12px] font-black">
                        2
                      </div>
                      <h2 className="text-[13px] md:text-[14px] font-black tracking-[0.12em] uppercase text-[#D4AF37]">
                        2. Solution: Translator, Not Fleet
                      </h2>
                    </div>
                    <div className="text-[11.5px] leading-[1.5] text-white/85 space-y-2.5">
                      <div className="font-mono text-[11px] bg-black border border-[#D4AF37]/20 rounded-[8px] px-3 py-2 text-[#D4AF37]">
                        Cost per Open KM = <span className="text-white">base × method × fuel</span>
                      </div>
                      <p>
                        <span className="text-white font-semibold">Dual fleet:</span> HillClimber 85Nm 15% grades + CiTiDriver 65Nm flat feeder. Tannus airless 0 punctures, belt drive saves R1500 vs chain, offline-first SQLite + ESP32-S3 + PN532 0.2s tap-to-unlock.
                      </p>
                      <p className="text-white/70">
                        <span className="text-white">Dual ledger:</span> sealed IP65 hardware odometer + GPS Open KM logs for City audit.
                      </p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <span className="text-[9px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full bg-white text-black font-black">
                        HillClimber 85Nm
                      </span>
                      <span className="text-[9px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border border-white/20 text-white/70">
                        CiTiDriver 65Nm
                      </span>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-4">
                  {/* Block 3: Inclusive Final Lock */}
                  <div className="rounded-[14px] border border-white/10 bg-white/[0.03] p-4 md:p-[18px]">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-[28px] h-[28px] rounded-full bg-white text-black flex items-center justify-center text-[12px] font-black">
                          3
                        </div>
                        <h2 className="text-[13px] md:text-[14px] font-black tracking-[0.12em] uppercase text-[#D4AF37]">
                          3. Inclusive Final Lock
                        </h2>
                      </div>
                      <span className="text-[9px] tracking-widest uppercase bg-[#D4AF37] text-black px-2 py-0.5 rounded-full font-black">
                        Cash-Inclusive
                      </span>
                    </div>
                    <div className="text-[11px] leading-[1.5] text-white/80 space-y-2">
                      <p>
                        <span className="text-white font-bold">TapCard R12 NTAG215</span> - last 10 trips, training flag, helmet size, balance on tablet not card. Deposit R50 / Buy R80.
                      </p>
                      <p>
                        <span className="text-white font-bold">DropBox R650</span> steel Faraday cage grounded, 86x2mm labyrinth 90° bend, IR beam wakes NFC 2s only inside, ferrite focus. Closes trust loop: Card → green LED → R50 refund at controller desk. <span className="text-[#D4AF37]">Blockbuster Box flow.</span>
                      </p>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="rounded-[10px] bg-black border border-white/10 p-2.5 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-[8px] bg-white/10 border border-white/10 flex items-center justify-center text-[14px]">
                          💳
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-white leading-none">TapCard</div>
                          <div className="text-[9px] text-white/50 mt-0.5">R12 • NTAG215</div>
                        </div>
                      </div>
                      <div className="rounded-[10px] bg-black border border-[#D4AF37]/20 p-2.5 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-[8px] bg-[#D4AF37]/15 border border-[#D4AF37]/20 flex items-center justify-center text-[14px]">
                          📦
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-white leading-none">DropBox</div>
                          <div className="text-[9px] text-white/50 mt-0.5">R650 • Faraday</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Block 4: Business Model */}
                  <div className="rounded-[14px] border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/[0.07] to-transparent p-4 md:p-[18px]">
                    <h2 className="text-[13px] md:text-[14px] font-black tracking-[0.12em] uppercase text-[#D4AF37] mb-3">
                      4. Business Model — Side Roads Funded by Saved KM + Tourist
                    </h2>
                    <div className="space-y-2.5 text-[11px] leading-[1.5] text-white/80">
                      <div className="flex gap-2">
                        <span className="text-[#D4AF37]">•</span>
                        <span>
                          <span className="text-white font-bold">TCO: R21,595 over 5yr = R4.40/km</span> vs taxi R12.50 (65% cheaper). With hire add-ons: R2.87/km (-35%)
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[#D4AF37]">•</span>
                        <span>
                          <span className="text-white font-bold">Revenue triple:</span> City R6.2/feeder km + Sixty60 km share + Tourist R450/day (R145 surplus = 2m² tar patch)
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[#D4AF37]">•</span>
                        <span>Tourist surplus funds infrastructure. Inventory payback 4.2 months. Protea keepsake marketing.</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[#D4AF37]">•</span>
                        <span>
                          <span className="text-white font-bold">Battery SOP zero fire:</span> metal vented cabinet max 2 charging 1m spacing fireboard, R2.50/charge, 500 cycles retire to solar lighting micro-grid 2nd life.
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="rounded-[8px] bg-[#D4AF37] text-black px-2 py-2 text-center">
                        <div className="text-[11px] font-black leading-none">R4.40/km</div>
                        <div className="text-[8px] uppercase tracking-widest mt-1 opacity-70">vs R12.50</div>
                      </div>
                      <div className="rounded-[8px] bg-black border border-[#D4AF37]/30 px-2 py-2 text-center">
                        <div className="text-[11px] font-black text-white leading-none">R145</div>
                        <div className="text-[8px] uppercase tracking-widest mt-1 text-white/50">Surplus / day</div>
                      </div>
                      <div className="rounded-[8px] bg-black border border-white/10 px-2 py-2 text-center">
                        <div className="text-[11px] font-black text-white leading-none">4.2mo</div>
                        <div className="text-[8px] uppercase tracking-widest mt-1 text-white/50">Payback</div>
                      </div>
                    </div>
                  </div>

                  {/* Block 5: Jobs & Impact */}
                  <div className="rounded-[14px] border border-white/10 bg-white/[0.03] p-4 md:p-[18px]">
                    <h2 className="text-[13px] md:text-[14px] font-black tracking-[0.12em] uppercase text-[#D4AF37] mb-2">
                      5. Jobs &amp; Impact
                    </h2>
                    <p className="text-[11px] leading-[1.5] text-white/80">
                      <span className="text-white font-bold">Support not own</span> - Time Controller + TapCard + belt care + oak DropBox curator. <span className="text-white font-bold">3 jobs x 8 hubs = 24 pilot jobs in Gordon&apos;s Bay.</span> Partnering with Checkers solar/security/CCTV. Checkers Sixty60 integration.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {["Time Controller", "TapCard Admin", "Belt Care", "DropBox Curator", "Gordon's Bay x8", "Checkers Sixty60"].map((item) => (
                        <span key={item} className="text-[9px] tracking-wide uppercase px-2 py-1 rounded-full bg-white/10 border border-white/10 text-white/70">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer 3-Column Grid */}
              <div className="mt-5 pt-4 border-t border-[#D4AF37]/20 grid grid-cols-1 md:grid-cols-[1.2fr_1.6fr_0.9fr] gap-5">
                <div className="space-y-2">
                  <div className="text-[10px] font-black tracking-[0.16em] uppercase text-[#D4AF37]">
                    Links
                  </div>
                  <div className="text-[10px] leading-[1.6] font-mono text-white/60 break-all">
                    <div>GitHub: <span className="text-white">github.com/emergenceofone-glitch/Aetherium-OpenKM</span></div>
                    <div className="mt-1">HuggingFace: <span className="text-white">huggingface.co/obzrv</span></div>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-black tracking-[0.16em] uppercase text-[#D4AF37] mb-2">
                    Aetherium Grand Challenges
                  </div>
                  <div className="text-[10px] leading-[1.55] text-white/70">
                    <span className="text-white font-bold">Hephaestus</span> [Primary] ACE, <span className="text-white font-bold">Alexandria</span> [Primary] Library, <span className="text-white font-bold">Chimera</span> [Strategic] Dyslexia/Gaia/Equilibrium/Sovereign, Anthropos, Kosmos, Psychohistory
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2 text-[11px]">
                    <span>⚒️ Hephaestus</span>
                    <span>📚 Alexandria</span>
                    <span>🧬 Chimera</span>
                    <span>🏛️ Anthropos</span>
                    <span>🌌 Kosmos</span>
                    <span>🧠 Psychohistory</span>
                  </div>
                </div>

                <div className="flex gap-3 items-start md:justify-end">
                  {/* Geometric QR Representation */}
                  <div className="w-[72px] h-[72px] rounded-[10px] bg-white border-[2px] border-[#D4AF37] flex items-center justify-center relative overflow-hidden shrink-0">
                    <div className="grid grid-cols-7 gap-[2px] w-[56px] h-[56px]">
                      {Array.from({ length: 49 }).map((_, idx) => {
                        const isCorner = (idx % 7 < 2 && Math.floor(idx / 7) < 2) ||
                                         (idx % 7 > 4 && Math.floor(idx / 7) < 2) ||
                                         (idx % 7 < 2 && Math.floor(idx / 7) > 4);
                        const isPattern = (idx * 13) % 7 > 3;
                        return (
                          <div
                            key={idx}
                            className={`rounded-[1px] ${isCorner || isPattern ? 'bg-black' : 'bg-white'}`}
                          />
                        );
                      })}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-[3px] bg-[#D4AF37] flex items-center justify-center text-[10px] font-black text-black">
                        A
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] leading-[1.4] text-white/70">
                    <div className="text-[#D4AF37] font-mono font-bold text-[11px]">@A41Z14A</div>
                    <div>Cape Town</div>
                    <div className="text-white font-bold uppercase tracking-widest text-[10px] mt-1">All For One</div>
                    <div className="mt-2 text-[8px] uppercase tracking-widest text-white/30">QR • Activate SA</div>
                  </div>
                </div>
              </div>

              {/* Seeking Callout */}
              <div className="mt-5 rounded-[12px] border border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] px-4 py-3 flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-[#D4AF37] text-black flex items-center justify-center text-[12px] font-black shrink-0 mt-0.5">
                  !
                </div>
                <p className="text-[10.5px] leading-[1.5] text-white/80">
                  <span className="text-[#D4AF37] font-black uppercase tracking-widest">Seeking:</span> City approval for 5 Gordon&apos;s Bay hubs + DEDAT / WCAIC partnership for township economy &amp; education use-cases. <span className="text-white font-semibold">Citizen implementation for Responsible AI.</span>
                </p>
              </div>

              {/* Sub-footer metadata */}
              <div className="mt-4 flex justify-between items-center border-t border-white/5 pt-3">
                <div className="text-[8px] tracking-[0.2em] uppercase text-white/30 font-mono">
                  Aetherium • OpenKM • Print Ready • A4 • v2026.08
                </div>
                <div className="text-[8px] tracking-[0.2em] uppercase text-white/30 font-mono">
                  CTICC • ACTIVATE SA AI
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRANSLATOR & DUAL FLEET SPEC */}
      {activeSubTab === 'translator' && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#e2e8f0] shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#005C99]/10 text-[#005C99] text-[11px] font-bold tracking-wide uppercase">
                Translator Standard Spec
              </span>
              <span className="text-[11px] text-[#64748b]">Hardware-Agnostic Low-Data Layer</span>
            </div>
            <h2 className="text-[22px] font-bold text-[#0f172a]">The OpenKM Formula &amp; Dual Fleet Architecture</h2>
            <p className="text-[13px] text-[#64748b] mt-1">
              Establishing a common calculation engine so minibus taxis, e-bikes, and bus trunk lines interface seamlessly without expensive proprietary trackers.
            </p>
          </div>

          {/* Formula Box */}
          <div className="bg-[#0f172a] text-white p-6 rounded-2xl border border-[#334155] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="text-[12px] font-mono text-[#D4AF37] font-bold uppercase tracking-wider">
                Universal Cost Translator
              </div>
              <div className="text-[11px] text-white/60 font-mono">ESP32-S3 / SQLite Embedded</div>
            </div>

            <div className="text-[20px] md:text-[24px] font-mono font-bold text-center py-3 text-white">
              Cost per Open KM = <span className="text-[#38bdf8]">base</span> × <span className="text-[#f59e0b]">method</span> × <span className="text-[#34d399]">fuel</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px] pt-2">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[#38bdf8] font-bold block mb-1">1. Base (Terrain / Road Surface)</span>
                <span className="text-white/70">Flat asphalt (1.00) vs Mountainside 15% grade (1.45) vs Gravel side-road (1.30).</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[#f59e0b] font-bold block mb-1">2. Method (Vehicle Efficiency)</span>
                <span className="text-white/70">CiTiDriver E-Bike (0.85) vs Minibus Taxi (1.80) vs Private ICE Vehicle (3.20).</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[#34d399] font-bold block mb-1">3. Fuel (Energy Pricing)</span>
                <span className="text-white/70">Solar Micro-Grid @ R2.50/charge (0.75) vs Municipal Grid (1.00) vs Petrol (2.40).</span>
              </div>
            </div>
          </div>

          {/* Sea Point Promenade Compliance Switch */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#005C99]" />
                <h3 className="text-[15px] font-bold text-[#0f172a]">Sea Point Promenade Protocol (Aug 2026)</h3>
              </div>
              <p className="text-[12px] text-[#64748b] mt-1">
                Enforces strict 8 km/h max speed cap with pedestrian right-of-way telemetry within shared coastal zones.
              </p>
            </div>
            <button
              onClick={() => setSeaPointMode(!seaPointMode)}
              className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                seaPointMode 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-white border border-[#cbd5e1] text-[#334155] hover:bg-[#f1f5f9]'
              }`}
            >
              {seaPointMode ? '✓ 8 km/h Governor ACTIVE' : 'Toggle Sea Point 8 km/h Mode'}
            </button>
          </div>

          {/* Dual Fleet Comparison Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* HillClimber */}
            <div className="bg-[#f8fafc] border-2 border-[#005C99]/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#005C99] text-white text-[11px] font-bold uppercase tracking-wider">
                  HillClimber (Mountainside)
                </span>
                <span className="text-[12px] font-mono font-bold text-[#005C99]">85 Nm Mid-Drive</span>
              </div>
              <p className="text-[13px] text-[#475569]">
                Designed specifically for Gordon&apos;s Bay and Simon&apos;s Town 15% steep coastal gradients and mountain ascents.
              </p>
              <div className="space-y-2.5 text-[12.5px] border-t border-[#e2e8f0] pt-4 text-[#1e293b]">
                <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Thermal Management:</span>
                  <span className="font-semibold">Auto-derates at 80°C</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Braking System:</span>
                  <span className="font-semibold">180mm Hydraulic Disc (Weight-back)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Tire Specification:</span>
                  <span className="font-semibold text-emerald-700">Tannus 100% Airless (0 Punctures)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Safety &amp; Visibility:</span>
                  <span className="font-semibold">Tilt Sensor + 400 Lumen Strobe</span>
                </div>
              </div>
            </div>

            {/* CiTiDriver */}
            <div className="bg-[#f8fafc] border-2 border-emerald-500/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider">
                  CiTiDriver (Flat Feeder)
                </span>
                <span className="text-[12px] font-mono font-bold text-emerald-700">65 Nm Efficient Cruise</span>
              </div>
              <p className="text-[13px] text-[#475569]">
                Optimized for 0.8km - 2.5km MyCiTi trunk bus station feeder connections on flat urban corridors.
              </p>
              <div className="space-y-2.5 text-[12.5px] border-t border-[#e2e8f0] pt-4 text-[#1e293b]">
                <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Drive System:</span>
                  <span className="font-semibold">Carbon Belt (Saves R1,500 vs Chain)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Braking System:</span>
                  <span className="font-semibold">160mm Hydraulic (Weekly QR Log)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Tire Specification:</span>
                  <span className="font-semibold text-emerald-700">Tannus + CiTi Wet Sleeve</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Speed Governor:</span>
                  <span className="font-semibold">{seaPointMode ? '8 km/h (Sea Point Mode)' : '25 km/h Standard Cap'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DROPBOX & TAPCARD LOCK */}
      {activeSubTab === 'dropbox' && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#e2e8f0] shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[11px] font-bold tracking-wide uppercase">
                Hardware Engineering
              </span>
              <span className="text-[11px] text-[#64748b]">Cash-Inclusive Security &amp; Anti-Tamper</span>
            </div>
            <h2 className="text-[22px] font-bold text-[#0f172a]">The DropBox &amp; TapCard Anti-Theft Architecture</h2>
            <p className="text-[13px] text-[#64748b] mt-1">
              How the steel Faraday DropBox and NTAG215 TapCard solve the 60% non-smartphone commuter barrier and eliminate remote skimming.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: DropBox Breakdown */}
            <div className="lg:col-span-7 bg-[#0f172a] text-white p-6 rounded-2xl border border-[#334155] space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-[16px] font-bold text-[#D4AF37] flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#D4AF37]" /> The DropBox (R650 Fabricated Unit)
                </h3>
                <span className="text-[11px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/80">
                  Blockbuster Box Loop
                </span>
              </div>

              <div className="space-y-3.5 text-[12.5px] text-white/80">
                <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="text-white block">Grounded Steel Faraday Cage:</strong>
                    Prevents rogue external readers or RFID sniffers from reading cards outside the designated slot.
                  </div>
                </div>

                <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="text-white block">86 × 2mm Labyrinth with 90° Bend:</strong>
                    Prevents fishing, wire probing, or card retrieval after insertion. Card drops straight into the locked internal safe.
                  </div>
                </div>

                <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="text-white block">IR Optical Beam Trigger:</strong>
                    Wakes the PN532 NFC reader for exactly 2.0 seconds only when a physical card breaks the beam inside the chamber.
                  </div>
                </div>

                <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <strong className="text-white block">Instant Green LED Verification:</strong>
                    Green strobe illuminates, signaling to the commuter that their R50 cash deposit is ready for collection at the Time Controller desk.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: TapCard Token */}
            <div className="lg:col-span-5 bg-[#f8fafc] p-6 rounded-2xl border border-[#e2e8f0] space-y-4">
              <h3 className="text-[16px] font-bold text-[#0f172a] flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#005C99]" /> TapCard (NTAG215 - R12 Unit)
              </h3>
              <p className="text-[12.5px] text-[#64748b]">
                Designed for the 60% of commuters without modern NFC smartphones. Allows cash-first riders to use the entire e-bike network effortlessly.
              </p>

              <div className="space-y-2.5 text-[12px] bg-white p-4 rounded-xl border border-[#e2e8f0]">
                <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Production Cost:</span>
                  <span className="font-bold text-[#0f172a]">R 12.00 / card</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Rider Deposit (Refundable):</span>
                  <span className="font-bold text-emerald-700">R 50.00 cash</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Permanent Purchase:</span>
                  <span className="font-bold text-[#0f172a]">R 80.00 (Keepsake)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">On-Chip Memory:</span>
                  <span className="font-medium text-[#0f172a]">Last 10 trips + helmet size</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#64748b]">Financial Ledger:</span>
                  <span className="font-medium text-[#005C99]">Stored on hub tablet, not on card</span>
                </div>
              </div>

              <div className="bg-[#f0fdf4] border border-[#bbf7d0] p-3.5 rounded-xl text-[11.5px] text-[#166534] leading-relaxed">
                <strong>Zero Financial Risk:</strong> Storing rider balance on the controller tablet rather than the raw RFID tag prevents clone attacks and balance manipulation.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ROAD TAR REPAIR & TCO ECONOMICS */}
      {activeSubTab === 'economics' && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#e2e8f0] shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-800 text-[11px] font-bold tracking-wide uppercase">
                Infrastructure Economics
              </span>
              <span className="text-[11px] text-[#64748b]">Tourist Cross-Subsidization Engine</span>
            </div>
            <h2 className="text-[22px] font-bold text-[#0f172a]">Funding City Road Repairs via Tourist E-Bike Surplus</h2>
            <p className="text-[13px] text-[#64748b] mt-1">
              Every tourist hiring an OpenKM e-bike at R450/day directly funds 2.0 square meters of side-road asphalt repairs in the local municipal ward.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 bg-[#f8fafc] p-6 rounded-2xl border border-[#e2e8f0] space-y-5">
              <h3 className="text-[15px] font-bold text-[#0f172a] flex items-center gap-2">
                <Hammer className="w-4 h-4 text-[#005C99]" /> Road Repair Simulator
              </h3>

              <div>
                <div className="flex justify-between text-[13px] mb-1.5 font-medium">
                  <span>Daily Tourist Rentals Across 8 Hubs</span>
                  <span className="font-bold text-[#005C99]">{touristRentalsPerDay} rentals / day</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="40"
                  step="1"
                  value={touristRentalsPerDay}
                  onChange={(e) => setTouristRentalsPerDay(Number(e.target.value))}
                  className="w-full accent-[#005C99]"
                />
                <div className="flex justify-between text-[10px] text-[#64748b] mt-1">
                  <span>2 rentals</span>
                  <span>12 (Target Baseline)</span>
                  <span>40 rentals</span>
                </div>
              </div>

              <div className="space-y-2 text-[12px] bg-white p-4 rounded-xl border border-[#e2e8f0]">
                <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Tourist Rental Price:</span>
                  <span className="font-bold text-[#0f172a]">R {touristDailyPrice}.00 / day</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                  <span className="text-[#64748b]">Full Operating TCO (Insurance, Battery, Staff):</span>
                  <span className="text-[#64748b]">R {touristTcoCost}.00 / day</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                  <span className="text-[#005C99] font-bold">Net Infrastructure Surplus:</span>
                  <span className="font-black text-[#15803d]">R {surplusPerRental}.00 / rental</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#64748b]">Tar Road Repair Yield:</span>
                  <span className="font-bold text-amber-700">2.0 m² of asphalt patch / rental</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="bg-[#f0fdf4] border border-[#bbf7d0] p-5 rounded-2xl text-center">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#166534]">Annual Road Repair</div>
                <div className="text-[28px] md:text-[32px] font-extrabold text-[#15803d] mt-1">
                  {formatNumber(annualTarM2Repaired)} m²
                </div>
                <div className="text-[11.5px] text-[#166534]/80 mt-1">
                  of side-road tar repaired annually
                </div>
              </div>

              <div className="bg-[#eff6ff] border border-[#bfdbfe] p-5 rounded-2xl text-center">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#1e40af]">Annual Tar Budget</div>
                <div className="text-[28px] md:text-[32px] font-extrabold text-[#1d4ed8] mt-1">
                  R {formatNumber(touristRentalsPerDay * surplusPerRental * 300)}
                </div>
                <div className="text-[11.5px] text-[#1e40af]/80 mt-1">
                  dedicated road fund generated
                </div>
              </div>

              <div className="col-span-2 bg-[#0f172a] text-white p-5 rounded-2xl border border-[#334155] space-y-2">
                <div className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
                  Zero-Fire Battery SOP
                </div>
                <p className="text-[12px] text-white/80 leading-relaxed">
                  Fireboard-lined metal cabinet with max 2 batteries charging simultaneously with 1m spacing. 500 charge cycles before transitioning to 2nd-life solar lighting microgrids.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AETHERIUM GRAND CHALLENGES */}
      {activeSubTab === 'challenges' && (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#e2e8f0] shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 text-[11px] font-bold tracking-wide uppercase">
                Aetherium Ecosystem
              </span>
              <span className="text-[11px] text-[#64748b]">Grand Challenges Mapping</span>
            </div>
            <h2 className="text-[22px] font-bold text-[#0f172a]">Grand Challenge Integration &amp; System Architecture</h2>
            <p className="text-[13px] text-[#64748b] mt-1">
              How Project Emergence interfaces with the broader Aetherium Grand Challenge framework and repositories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#f8fafc] border border-[#e2e8f0] p-5 rounded-xl space-y-2">
              <div className="text-[20px]">⚒️</div>
              <h3 className="text-[15px] font-bold text-[#0f172a]">Project Hephaestus</h3>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#005C99] font-bold">[Primary]</div>
              <p className="text-[12px] text-[#64748b] leading-relaxed">
                ACE Creation Engine (World Forge / Logic Forge). Generates physical hardware specs and embedded firmware for the ESP32-S3 telemetry unit.
              </p>
            </div>

            <div className="bg-[#f8fafc] border border-[#e2e8f0] p-5 rounded-xl space-y-2">
              <div className="text-[20px]">📚</div>
              <h3 className="text-[15px] font-bold text-[#0f172a]">Project Alexandria</h3>
              <div className="text-[10px] font-mono uppercase tracking-wider text-purple-700 font-bold">[Primary]</div>
              <p className="text-[12px] text-[#64748b] leading-relaxed">
                Great Library logging &amp; dual ledger validation. Secures tamper-proof odometer records for City of Cape Town transit subsidy audits.
              </p>
            </div>

            <div className="bg-[#f8fafc] border border-[#e2e8f0] p-5 rounded-xl space-y-2">
              <div className="text-[20px]">🧬</div>
              <h3 className="text-[15px] font-bold text-[#0f172a]">Project Chimera</h3>
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold">[Strategic]</div>
              <p className="text-[12px] text-[#64748b] leading-relaxed">
                Gaia Imperative + Equilibrium Engine + Sovereign Mandate. Balancing carbon displacement with equitable township transport access.
              </p>
            </div>
          </div>

          <div className="bg-[#f8fafc] border border-[#e2e8f0] p-5 rounded-xl flex flex-wrap items-center justify-between gap-4">
            <div className="text-[12.5px] text-[#334155]">
              Active tracked in Aetherium HQ: <strong className="font-mono text-[#0f172a]">github.com/Vessels-of-the-Train/Aetherium_HQ</strong>
            </div>
            <div className="flex gap-2">
              <a
                href="https://huggingface.co/obzrv"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white border border-[#cbd5e1] text-[12px] font-mono font-medium hover:border-[#005C99] transition-all"
              >
                huggingface.co/obzrv
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
