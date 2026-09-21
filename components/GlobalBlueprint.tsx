'use client';

import React, { useState } from 'react';
import {
  ArrowUpRight,
  Box,
  Cpu,
  DollarSign,
  FileCheck,
  Flame,
  Globe,
  Heart,
  Layers,
  Lock,
  Recycle,
  Route,
  Shield,
  Zap,
  CheckCircle,
  TrendingUp,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface CityNode {
  id: string;
  name: string;
  lat: number;
  lon: number;
  count: number;
  phase: string;
  country: string;
}

const GOLD_COLOR = '#D4AF37';
const BG_DARK = '#050505';

const GLOBAL_NODES: CityNode[] = [
  { id: 'ct', name: 'CAPE TOWN CORE', lat: -33.9249, lon: 18.4241, count: 8, phase: '0', country: 'ZA' },
  { id: 'jhb', name: 'JOHANNESBURG', lat: -26.2041, lon: 28.0473, count: 18, phase: '1', country: 'ZA' },
  { id: 'dbn', name: 'DURBAN', lat: -29.8587, lon: 31.0218, count: 12, phase: '1', country: 'ZA' },
  { id: 'const', name: 'CONSTANTIA', lat: -34.0045, lon: 18.4185, count: 12, phase: '1', country: 'ZA' },
  { id: 'nairobi', name: 'NAIROBI', lat: -1.2921, lon: 36.8219, count: 50, phase: '2', country: 'KE' },
  { id: 'lagos', name: 'LAGOS', lat: 6.5244, lon: 3.3792, count: 50, phase: '2', country: 'NG' },
  { id: 'jakarta', name: 'JAKARTA', lat: -6.2088, lon: 106.8456, count: 60, phase: '2', country: 'ID' },
  { id: 'bogota', name: 'BOGOTÁ', lat: 4.7110, lon: -74.0721, count: 45, phase: '2', country: 'CO' },
  { id: 'mexico', name: 'MEXICO CITY', lat: 19.4326, lon: -99.1332, count: 45, phase: '2', country: 'MX' },
  { id: 'lisbon', name: 'LISBON', lat: 38.7223, lon: -9.1393, count: 120, phase: '3', country: 'PT' },
  { id: 'barcelona', name: 'BARCELONA', lat: 41.3851, lon: 2.1734, count: 180, phase: '3', country: 'ES' },
  { id: 'marseille', name: 'MARSEILLE', lat: 43.2965, lon: 5.3698, count: 150, phase: '3', country: 'FR' },
  { id: 'nice', name: 'NICE', lat: 43.7102, lon: 7.2620, count: 130, phase: '3', country: 'FR' },
];

const projectCoord = (lat: number, lon: number) => {
  const x = ((lon + 180) / 360) * 1000;
  const y = ((90 - lat) / 180) * 500;
  return { x, y };
};

interface GlobalBlueprintProps {
  onNavigateTab?: (tabId: string) => void;
}

export default function GlobalBlueprint({ onNavigateTab }: GlobalBlueprintProps) {
  const [activePillar, setActivePillar] = useState<number | null>(0);
  const [selectedPhase, setSelectedPhase] = useState<string>('0');

  return (
    <div className="rounded-[24px] bg-[#050505] text-white antialiased selection:bg-[#D4AF37]/30 border border-white/[0.08] overflow-hidden shadow-2xl font-sans relative">
      {/* Background Grid Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(${GOLD_COLOR} 1px, transparent 1px), linear-gradient(90deg, ${GOLD_COLOR} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Gold Accent Bar */}
      <div className="h-[3px] w-full bg-[#D4AF37]" />

      {/* Header Bar */}
      <header className="relative z-10 border-b border-[#D4AF37]/20 bg-[#050505]/90 backdrop-blur-xl">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-[#D4AF37]" />
              <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-mono font-semibold">
                METAONECORE // SINGLE SOURCE OF TRUTH
              </p>
            </div>
            <h1 className="mt-3 text-[24px] md:text-[32px] font-black tracking-[-0.02em] leading-[0.9] uppercase">
              OPENKM GLOBAL BLUEPRINT
              <br />
              <span className="text-[#D4AF37] font-mono font-light tracking-[0.05em] text-[16px] md:text-[20px]">
                MetaOneCore Scale — From Cape Town 8 Hubs to 1000 Hubs Worldwide
              </span>
            </h1>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="px-3 py-1 border border-[#D4AF37] text-[10px] tracking-widest font-mono text-[#D4AF37] font-bold">
              LOW-DATA TRANSLATOR NOT FLEET
            </div>
            <div className="text-left md:text-right">
              <p className="font-mono text-[11px] text-white/60 tracking-widest font-semibold">
                COST PER OPEN KM
              </p>
              <p className="font-mono text-[10px] text-white/40">
                base × method × fuel — city pays only audited Open KM
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Executive Summary Grid */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 py-8">
        <div className="grid grid-cols-12 gap-[1px] bg-[#D4AF37]/20 border border-[#D4AF37]/20">
          <div className="col-span-12 md:col-span-5 bg-[#0A0A0A] p-6">
            <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-mono mb-3 font-bold uppercase">
              EXECUTIVE SUMMARY // CAPE TOWN CORE PROVEN
            </p>
            <div className="space-y-3">
              <p className="text-[13px] leading-[1.6] text-white/80 font-light">
                Cape Town CORE proven{' '}
                <span className="text-white font-mono bg-white/10 px-1 font-bold">R2.87/km</span> vs taxi R12.50{' '}
                <span className="text-[#D4AF37] font-bold">65-77% cheaper</span>, break-even 0.73 rides/bike/day vs{' '}
                <span className="text-[#D4AF37] font-bold">6.6 actual</span>, 24 jobs / 8 hubs, mSCOA MFMA S71 City compliant,{' '}
                <b className="text-white">Support Not Own</b>.
              </p>
              <p className="text-[11px] leading-[1.5] text-white/50 font-mono">
                Global Blueprint replicates{' '}
                <span className="text-white/80">translator standard not fleet</span>, hardware-agnostic, cash-inclusive, side-road funded by saved KM.
              </p>
            </div>
          </div>

          <div className="col-span-6 md:col-span-2 bg-[#0A0A0A] p-5 flex flex-col justify-between">
            <p className="text-[10px] font-mono text-white/40 uppercase font-semibold">COST COMPARISON</p>
            <div className="mt-4">
              <p className="text-[28px] font-black text-[#D4AF37] tracking-tight">
                R2.87<span className="text-[14px] text-white/40">/km</span>
              </p>
              <p className="text-[11px] font-mono text-white/50 line-through">Taxi R12.50/km</p>
              <div className="mt-2 h-[2px] w-full bg-white/10">
                <div className="h-full bg-[#D4AF37]" style={{ width: '23%' }} />
              </div>
            </div>
          </div>

          <div className="col-span-6 md:col-span-2 bg-[#0A0A0A] p-5 flex flex-col justify-between">
            <p className="text-[10px] font-mono text-white/40 uppercase font-semibold">UTILIZATION</p>
            <div className="mt-4">
              <p className="text-[28px] font-black text-white tracking-tight">
                6.6<span className="text-[14px] text-white/40">x</span>
              </p>
              <p className="text-[11px] font-mono text-[#D4AF37] font-bold">Break-even 0.73 rides</p>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className={`h-1 w-full ${i < 7 ? 'bg-[#D4AF37]' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 bg-[#0A0A0A] p-5">
            <p className="text-[10px] font-mono text-white/40 mb-3 uppercase font-semibold">
              FORMULA // AUDITED OPEN KM ONLY
            </p>
            <div className="border border-[#D4AF37]/30 p-3 font-mono text-[12px] bg-[#D4AF37]/5">
              <span className="text-white/50">Cost_per_OpenKM</span> ={' '}
              <span className="text-[#D4AF37] font-bold">base</span> ×{' '}
              <span className="text-[#D4AF37] font-bold">method</span> ×{' '}
              <span className="text-[#D4AF37] font-bold">fuel</span>
              <div className="mt-2 text-[10px] text-white/35 leading-tight">
                City pays only audited Open KM • Dual ledger IP65 sealed odometer + GPS • 100m privacy CSV
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* World Map Scale Section */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 pb-8">
        <div className="border border-[#D4AF37]/20 bg-[#080808] relative overflow-hidden">
          <div className="p-4 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] bg-[#050505]/80">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <p className="text-[10px] tracking-[0.3em] font-mono text-[#D4AF37] font-bold uppercase">
                WORLD MAP // 8 → 50 → 250 → 1000 HUBS
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              {[
                { k: '0', label: '8 HUBS CT PILOT STAR' },
                { k: '1', label: '50 HUBS SA' },
                { k: '2', label: '250 GLOBAL SOUTH' },
                { k: '3', label: '1000 GLOBAL STD' }
              ].map((phase) => (
                <button
                  key={phase.k}
                  onClick={() => setSelectedPhase(phase.k)}
                  className={`px-2.5 py-1 text-[9px] font-mono border tracking-widest cursor-pointer transition ${
                    selectedPhase === phase.k
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold'
                      : 'border-white/20 text-white/50 hover:border-[#D4AF37]/50'
                  }`}
                >
                  {phase.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative aspect-[2/1] md:aspect-[2.6/1] w-full bg-[#050505]">
            <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full">
              {/* Grid Lines */}
              <g opacity={0.07} stroke="#D4AF37" strokeWidth={0.5}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 100 + 100} y1={0} x2={i * 100 + 100} y2={500} />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                  <line key={`h${i}`} x1={0} y1={i * 100 + 50} x2={1000} y2={i * 100 + 50} />
                ))}
              </g>

              {/* World Continents Abstract */}
              <g fill="white" opacity={0.06}>
                <path d="M150 100 Q200 80 250 120 Q280 180 220 220 Q180 200 150 150 Z" />
                <path d="M400 80 Q500 70 550 120 Q520 200 420 180 Z" />
                <path d="M680 100 Q800 90 850 150 Q780 220 700 180 Z" />
                <path d="M200 280 Q300 260 350 320 Q280 400 200 350 Z" />
                <path d="M500 300 Q580 280 620 350 Q550 420 480 380 Z" />
              </g>

              {/* Network Connections */}
              {GLOBAL_NODES.filter((n) => n.id !== 'ct').map((node) => {
                const ct = projectCoord(GLOBAL_NODES[0].lat, GLOBAL_NODES[0].lon);
                const target = projectCoord(node.lat, node.lon);

                if (
                  !(
                    selectedPhase === '0' ||
                    node.phase === selectedPhase ||
                    (selectedPhase === '3' && ['1', '2', '3'].includes(node.phase)) ||
                    (selectedPhase === '2' && ['1', '2'].includes(node.phase)) ||
                    (selectedPhase === '1' && node.phase === '1')
                  ) &&
                  selectedPhase !== '0'
                ) {
                  return null;
                }

                return (
                  <g key={node.id}>
                    <path
                      d={`M ${ct.x} ${ct.y} Q ${(ct.x + target.x) / 2} ${Math.min(ct.y, target.y) - 30} ${target.x} ${target.y}`}
                      fill="none"
                      stroke={node.phase === selectedPhase || selectedPhase === '0' ? GOLD_COLOR : '#333'}
                      strokeWidth={node.phase === selectedPhase ? 1 : 0.5}
                      strokeDasharray={node.phase === '3' ? '4 4' : '0'}
                      opacity={node.phase === selectedPhase || selectedPhase === '0' ? 0.6 : 0.2}
                    />
                  </g>
                );
              })}

              {/* City Dots */}
              {GLOBAL_NODES.map((node) => {
                const { x, y } = projectCoord(node.lat, node.lon);
                const isCT = node.id === 'ct';
                return (
                  <g key={node.id}>
                    {isCT && (
                      <>
                        <circle cx={x} cy={y} r={18} fill="none" stroke={GOLD_COLOR} strokeWidth={0.5} opacity={0.5} />
                        <circle cx={x} cy={y} r={28} fill="none" stroke={GOLD_COLOR} strokeWidth={0.3} opacity={0.3} />
                      </>
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={isCT ? 6 : 4}
                      fill={isCT ? GOLD_COLOR : node.phase === selectedPhase ? '#fff' : '#555'}
                      stroke={BG_DARK}
                      strokeWidth={1}
                    />
                    <text
                      x={x + 8}
                      y={y - 8}
                      fontSize={8}
                      fontFamily="monospace"
                      fill={isCT ? GOLD_COLOR : '#aaa'}
                      fontWeight={isCT ? '700' : '400'}
                    >
                      {node.name} {node.count}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-wrap gap-2">
              <div className="bg-black/80 border border-[#D4AF37]/30 px-3 py-2 backdrop-blur">
                <p className="text-[9px] font-mono text-white/40 uppercase">CAPE TOWN PILOT STAR</p>
                <p className="text-[12px] font-mono text-[#D4AF37] font-bold">
                  8 hubs • 40 bikes • 24 jobs • Q3 2026
                </p>
              </div>

              <div className="bg-black/80 border border-white/10 px-3 py-2 backdrop-blur">
                <p className="text-[9px] font-mono text-white/40 uppercase">SCALED FOOTPRINT</p>
                <p className="text-[12px] font-mono text-white font-bold">
                  1000 hubs • 5000 bikes • 3000 jobs • 137,500 m² side-road Year 1
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Modular Scaling Pillars */}
      <section className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-[#D4AF37]" />
          <p className="text-[11px] tracking-[0.4em] font-mono text-[#D4AF37] font-bold uppercase">
            6 PILLARS SCALE // MODULAR BLUEPRINT
          </p>
        </div>

        <div className="grid grid-cols-12 gap-[1px] bg-[#D4AF37]/20 border border-[#D4AF37]/20">
          
          {/* Pillar 1 */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#0A0A0A]">
            <button
              onClick={() => setActivePillar(activePillar === 0 ? null : 0)}
              className="w-full text-left p-6 flex justify-between items-start hover:bg-white/[0.02] transition cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#D4AF37]" />
                  <p className="text-[11px] font-mono tracking-widest text-[#D4AF37] font-semibold">
                    PILLAR 1 // TRANSLATOR STANDARD GLOBAL
                  </p>
                </div>
                <h3 className="mt-2 text-[16px] font-bold leading-tight uppercase">
                  Hardware Agnostic, Cash-Inclusive, Side-Road Funded
                </h3>
              </div>
              <ArrowUpRight
                className={`w-4 h-4 text-white/20 transition ${activePillar === 0 ? 'rotate-45 text-[#D4AF37]' : ''}`}
              />
            </button>

            {activePillar === 0 && (
              <div className="px-6 pb-6 space-y-5 border-t border-[#D4AF37]/10 pt-5">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase font-bold">FORMULA</p>
                  <p className="text-[12px] font-mono text-white/70 leading-relaxed">
                    Cost per Open KM = base × method × fuel (city pays only audited Open KM)
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase font-bold">HARDWARE CORE</p>
                  <ul className="text-[11px] leading-[1.6] text-white/60 font-mono space-y-1 list-disc list-inside">
                    <li>ESP32-S3 + PN532 NFC 0.2s tap-to-unlock</li>
                    <li>SQLite + GPS cores offline sync at hub only</li>
                    <li>IP65 sealed odometer dual ledger, 100m privacy CSV</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { name: 'HillClimber', spec: '85Nm cargo 130kg 625Wh (15% grades), Tannus 26x2.0 100% airless 0 punctures, 180mm hydraulic' },
                    { name: 'CiTiDriver', spec: '65Nm flat feeder 500Wh 700x40c 110kg 160mm' },
                    { name: 'SleekSlider', spec: '45Nm belt tan-wall tourist wine crate' }
                  ].map((b) => (
                    <div key={b.name} className="border border-white/10 p-2.5 bg-black/50">
                      <p className="text-[10.5px] font-mono text-white font-bold">{b.name.toUpperCase()}</p>
                      <p className="text-[10px] font-mono text-white/45 leading-tight mt-1">{b.spec}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <p className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase font-bold">SAFETY INFRASTRUCTURE</p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-white/50">
                    <div className="flex gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Faraday Labyrinth 86x2mm double 90° bend + IR 2s wake only inside ferrite focus RF 30% inward anti-relay</span>
                    </div>
                    <div className="flex gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Charging Cabinet IP54 max 2/shelf, smoke &amp; CO2 sensors, grounded solar LED</span>
                    </div>
                    <div className="flex gap-1.5">
                      <Box className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Weight gate 150/110kg S/M/L, Tilt sensor 400 lumen brake cut-off 25km/h cap</span>
                    </div>
                    <div className="flex gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Belt Carbon Drive R900 vs chain R2400 (saves R1500 + 6h labour/yr)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-3">
                  <p className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase">INCLUSIVE FINAL LOCK</p>
                  <p className="text-[11px] font-mono text-white/70 mt-1 leading-snug">
                    TapCard R50 deposit, R80 keepsake Protea card. Last 10 trips &amp; balance cached on tablet not card. DropBox oak timber-clad steel Blockbuster Box with R50 refund green LED. 60% offline, cash-inclusive without smartphone requirement.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pillar 2 */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#0A0A0A]">
            <button
              onClick={() => setActivePillar(activePillar === 1 ? null : 1)}
              className="w-full text-left p-6 flex justify-between items-start hover:bg-white/[0.02] transition cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#D4AF37]" />
                  <p className="text-[11px] font-mono tracking-widest text-[#D4AF37] font-semibold">
                    PILLAR 2 // 3-TIER DECENTRALIZED ORG GLOBAL
                  </p>
                </div>
                <h3 className="mt-2 text-[16px] font-bold leading-tight uppercase">
                  Strategic Core → Regional Pilot → Ground Jobs
                </h3>
              </div>
              <ArrowUpRight
                className={`w-4 h-4 text-white/20 transition ${activePillar === 1 ? 'rotate-45 text-[#D4AF37]' : ''}`}
              />
            </button>

            {activePillar === 1 && (
              <div className="px-6 pb-6 space-y-4 border-t border-[#D4AF37]/10 pt-5">
                <div className="space-y-3">
                  {[
                    {
                      tier: 'Tier 1 — Strategic & Technical Core (HQ Aetherium)',
                      desc: 'Protocol + firmware + audit + 100m privacy standard. Hardware Integrity (ESP32-S3/IP65). Strategic Partnerships with City of Cape Town, Checkers Sixty60, MyCiTi. Owns standards only, zero fleet capital.'
                    },
                    {
                      tier: 'Tier 2 — Regional Pilot Lead',
                      desc: 'Pilot Coordinator 8-hub rollout per city. Logistics Battery 2nd Life (500 cycles solar micro-grid) + Tannus + Carbon Drive. Community Liaison Taxi Rank / Matatu / Colectivo feeder integration.'
                    },
                    {
                      tier: 'Tier 3 — Ground Operations (3 Jobs / Hub)',
                      desc: 'Time Controller (NFC onboarding float R19.6k/hub), Belt & Safety Curator (weekly QR hydraulic check), DropBox Guardian (labyrinth IR refund custody). 3 x 8 = 24 jobs pilot, 3 x 1000 = 3000 jobs global. Opex R11,900/yr/bike shared across 5 bikes/station.'
                    }
                  ].map((tItem) => (
                    <div key={tItem.tier} className="border-l-2 border-[#D4AF37]/50 pl-3 py-1.5 bg-black/30">
                      <p className="text-[10px] font-mono font-bold text-white uppercase">{tItem.tier}</p>
                      <p className="text-[11px] font-mono text-white/50 mt-1 leading-snug">{tItem.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-[1px] bg-white/10">
                  <div className="bg-black p-2.5 text-center">
                    <p className="text-[10px] font-mono text-white/40 uppercase">PILOT</p>
                    <p className="text-[18px] font-black text-[#D4AF37]">24</p>
                    <p className="text-[9px] font-mono text-white/30 uppercase">JOBS</p>
                  </div>
                  <div className="bg-black p-2.5 text-center">
                    <p className="text-[10px] font-mono text-white/40 uppercase">50 HUBS</p>
                    <p className="text-[18px] font-black text-white">150</p>
                    <p className="text-[9px] font-mono text-white/30 uppercase">JOBS</p>
                  </div>
                  <div className="bg-black p-2.5 text-center">
                    <p className="text-[10px] font-mono text-white/40 uppercase">1000 HUBS</p>
                    <p className="text-[18px] font-black text-[#D4AF37]">3000</p>
                    <p className="text-[9px] font-mono text-white/30 uppercase">JOBS</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pillar 3 */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#0A0A0A]">
            <button
              onClick={() => setActivePillar(activePillar === 2 ? null : 2)}
              className="w-full text-left p-6 flex justify-between items-start hover:bg-white/[0.02] transition cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                  <p className="text-[11px] font-mono tracking-widest text-[#D4AF37] font-semibold">
                    PILLAR 3 // FINANCIAL REPLICATION LEAN CAPEX
                  </p>
                </div>
                <h3 className="mt-2 text-[16px] font-bold leading-tight uppercase">
                  Cape Town CORE ~R199k / hub • Payback 15mo
                </h3>
              </div>
              <ArrowUpRight
                className={`w-4 h-4 text-white/20 transition ${activePillar === 2 ? 'rotate-45 text-[#D4AF37]' : ''}`}
              />
            </button>

            {activePillar === 2 && (
              <div className="px-6 pb-6 space-y-4 border-t border-[#D4AF37]/10 pt-5">
                <div className="bg-white/[0.03] border border-white/10 p-3 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-white/50">Capex R1.233M + WC R119k + Permits R60k + Mkt R40k + Cont R145k</span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-white font-bold">Ask R1.597M (8 hubs)</span>
                    <span className="text-[#D4AF37] font-bold">~R199k / hub</span>
                  </div>
                  <div className="mt-2 text-[10px] text-white/40">
                    Payback 15mo. Year 1 Net R1.2M after 20% side-road reserve (R280/m², 1,100 m² Year 1).
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase font-bold">
                    TRIPLE REVENUE MODEL ADAPTABLE
                  </p>
                  <ul className="mt-2 space-y-1.5 text-[11px] font-mono text-white/60">
                    <li className="flex justify-between">
                      <span>City Feeder Farebox</span>
                      <span className="text-white font-bold">R6.20 / km</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Delivery KM Share (Sixty60 / Rappi / Glovo)</span>
                      <span className="text-white font-bold">KM Share</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Tourist R450/day surplus (R145 = 2m² tar patch)</span>
                      <span className="text-[#D4AF37] font-bold">2m² / rental</span>
                    </li>
                    <li className="flex justify-between border-t border-white/10 pt-1 mt-1">
                      <span>Float R50x200 + R80x120 = R19.6k/hub</span>
                      <span className="text-[#D4AF37] font-bold">R19.6k</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                  <div className="border border-white/10 p-2">
                    <p className="text-white/40">50 hubs SA</p>
                    <p className="text-white font-bold mt-0.5">R9.9M • 150 jobs</p>
                  </div>
                  <div className="border border-white/10 p-2">
                    <p className="text-white/40">250 Global South</p>
                    <p className="text-white font-bold mt-0.5">R49M • 750 jobs</p>
                  </div>
                  <div className="border border-[#D4AF37]/30 p-2 bg-[#D4AF37]/10">
                    <p className="text-[#D4AF37] font-bold">1000 Global</p>
                    <p className="text-white font-bold mt-0.5">R199M • 3000 jobs</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pillar 4 */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#0A0A0A]">
            <button
              onClick={() => setActivePillar(activePillar === 3 ? null : 3)}
              className="w-full text-left p-6 flex justify-between items-start hover:bg-white/[0.02] transition cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#D4AF37]" />
                  <p className="text-[11px] font-mono tracking-widest text-[#D4AF37] font-semibold">
                    PILLAR 4 // CITY COMPLIANCE ADAPTER MODULAR
                  </p>
                </div>
                <h3 className="mt-2 text-[16px] font-bold leading-tight uppercase">
                  mSCOA MFMA S71 → GASB ESA SIAF IFMIS
                </h3>
              </div>
              <ArrowUpRight
                className={`w-4 h-4 text-white/20 transition ${activePillar === 3 ? 'rotate-45 text-[#D4AF37]' : ''}`}
              />
            </button>

            {activePillar === 3 && (
              <div className="px-6 pb-6 space-y-4 border-t border-[#D4AF37]/10 pt-5">
                <div className="space-y-3 font-mono text-[11px]">
                  <div className="border border-[#D4AF37]/20 p-3 bg-[#D4AF37]/5">
                    <p className="text-[#D4AF37] font-bold">SA Standard: mSCOA &amp; MFMA S71</p>
                    <p className="text-white/60 mt-1">
                      WBS CPX.0019482-F1 Vote 19050010 CITP NMT-04 Climate 3.2 Universal Access SANS 10400-S.
                    </p>
                    <p className="text-[10px] text-white/40 mt-2">
                      Quick Export CSV RFC 4180 UTF-8 City_of_Cape_Town_Hub_Budget_mSCOA_date.csv + MFMA S71 C1/C2/C5 Auto-Fill.
                    </p>
                  </div>

                  <div className="border border-white/10 p-3">
                    <p className="text-white font-bold">Global Compliance Adapters</p>
                    <p className="text-white/50 mt-1">
                      US GASB, EU ESA, LATAM SIAF, Africa IFMIS — mapped to same 9 standard mSCOA codes (CAP-INF-NMT-ROLL etc.) + VAT 15%, 100m privacy CSV, Dual Ledger IP65 odometer + GPS.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {['NMT Infrastructure', 'Climate Low Carbon', 'Universal Access SANS'].map((tag) => (
                    <span key={tag} className="text-[9px] font-mono border border-white/20 px-2 py-0.5 text-white/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pillar 5 */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-[#0A0A0A] lg:border-l border-[#D4AF37]/20">
            <button
              onClick={() => setActivePillar(activePillar === 4 ? null : 4)}
              className="w-full text-left p-6 flex justify-between items-start hover:bg-white/[0.02] transition cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Route className="w-4 h-4 text-[#D4AF37]" />
                  <p className="text-[11px] font-mono tracking-widest text-[#D4AF37] font-semibold">
                    PILLAR 5 // PHASED ROLLOUT ROADMAP
                  </p>
                </div>
                <h3 className="mt-2 text-[16px] font-bold leading-tight uppercase">
                  8 → 50 → 250 → 1000 Hubs 2026-2030
                </h3>
              </div>
              <ArrowUpRight
                className={`w-4 h-4 text-white/20 transition ${activePillar === 4 ? 'rotate-45 text-[#D4AF37]' : ''}`}
              />
            </button>

            {activePillar === 4 && (
              <div className="px-6 pb-6 space-y-3 border-t border-[#D4AF37]/10 pt-5">
                {[
                  {
                    phase: 'Phase 0',
                    title: 'Cape Town Pilot: 5 GB + 3 CT feeder/tourist (8 hubs, 40 bikes, 24 jobs, Q3 2026). Activate SA CTICC 25-27 Aug remote build.',
                    color: 'bg-[#D4AF37] text-black'
                  },
                  {
                    phase: 'Phase 1',
                    title: 'SA National: 50 hubs (Johannesburg Sandton taxi rank, Durban beachfront, Constantia Winelands) 250 bikes, 150 jobs (Q1-Q3 2027). Partnership Checkers / Pick n Pay / Shoprite solar & CCTV.',
                    color: 'bg-white text-black'
                  },
                  {
                    phase: 'Phase 2',
                    title: 'Global South: 250 hubs (Nairobi Matatu, Lagos Danfo, Jakarta Angkot, Bogotá TransMiTrans, Mexico City Pesero) 1,250 bikes, 750 jobs (2027-2028). Sixty60 equivalent Rappi / Glovo / Jumia.',
                    color: 'bg-white/10 text-white border border-white/20'
                  },
                  {
                    phase: 'Phase 3',
                    title: 'Global Standard: 1,000 hubs (Lisbon, Barcelona, Marseille, Nice coastal tourist + feeder) 5,000 bikes, 3,000 jobs (2028-2030). Climate fund + tourism surplus funds side-roads.',
                    color: 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                  }
                ].map((p) => (
                  <div key={p.phase} className="flex gap-3 items-start">
                    <div className={`px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest whitespace-nowrap ${p.color}`}>
                      {p.phase}
                    </div>
                    <p className="text-[11px] font-mono text-white/65 leading-snug">{p.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pillar 6 */}
          <div className="col-span-12 lg:col-span-4 bg-[#0A0A0A]">
            <button
              onClick={() => setActivePillar(activePillar === 5 ? null : 5)}
              className="w-full text-left p-6 flex justify-between items-start hover:bg-white/[0.02] transition cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#D4AF37]" />
                  <p className="text-[11px] font-mono tracking-widest text-[#D4AF37] font-semibold">
                    PILLAR 6 // SUPPORT NOT OWN + CLIMATE + INCLUSION
                  </p>
                </div>
                <h3 className="mt-2 text-[16px] font-bold leading-tight uppercase">
                  Partner Not Own • Side-Road Funded by Saved KM
                </h3>
              </div>
              <ArrowUpRight
                className={`w-4 h-4 text-white/20 transition ${activePillar === 5 ? 'rotate-45 text-[#D4AF37]' : ''}`}
              />
            </button>

            {activePillar === 5 && (
              <div className="px-6 pb-6 space-y-4 border-t border-[#D4AF37]/10 pt-5">
                <div className="grid grid-cols-1 gap-2.5 font-mono text-[11px]">
                  <div className="border border-white/10 p-3 bg-black/40">
                    <p className="text-[#D4AF37] text-[10px] tracking-widest font-bold uppercase">PARTNER NOT OWN</p>
                    <p className="text-white/60 mt-1">
                      Checkers solar/security/meter share, Sixty60 delivery km share battery swap, City pays per Open KM not asset.
                    </p>
                  </div>

                  <div className="border border-white/10 p-3 bg-black/40">
                    <p className="text-[#D4AF37] text-[10px] tracking-widest font-bold uppercase">CLIMATE</p>
                    <p className="text-white/60 mt-1">
                      Belt drive (-6h labour + R1500 saving/yr), Tannus 0 punctures (-25% downtime), Battery 2nd life solar micro-grid, 2m² tar patch per tourist rental (5% community fund).
                    </p>
                  </div>

                  <div className="border border-[#D4AF37]/20 p-3 bg-[#D4AF37]/5">
                    <p className="text-[#D4AF37] text-[10px] tracking-widest font-bold uppercase">INCLUSION</p>
                    <p className="text-white/70 mt-1">
                      Cash-inclusive TapCard (no NFC phone requirement), 60% offline capability, Protea keepsake card, 3 local jobs per hub.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 pt-1">
                  <Recycle className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Belt Carbon Drive R900 vs chain R2400 • Kinekt suspension • MIK HD 27kg</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Global Footer Summary */}
      <section className="relative z-10 border-t border-[#D4AF37]/20 bg-[#080808]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.4em] font-mono text-[#D4AF37] font-bold uppercase">
                KEY METRICS GLOBAL FOOTER // PROVEN AT CORE
              </p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[
                  { k: 'Break-even', v: '0.73 rides/bike/day', sub: 'Actual 6.6' },
                  { k: 'Uptime', v: '100% isolation', sub: 'SQLite + GPS offline' },
                  { k: 'Punctures', v: '0 Tannus', sub: '100% airless 26x2.0' },
                  { k: 'Fires', v: '0 SOP', sub: 'max 2 charging, 1m fireboard' },
                  { k: 'Jobs Global', v: '3000 @ 1000 hubs', sub: '3 jobs/hub local' }
                ].map((metric) => (
                  <div key={metric.k} className="border-l border-[#D4AF37]/30 pl-3">
                    <p className="text-[9px] font-mono text-white/40 tracking-widest uppercase">{metric.k}</p>
                    <p className="text-[13px] font-mono font-bold text-white mt-0.5">{metric.v}</p>
                    <p className="text-[10px] font-mono text-[#D4AF37]/80">{metric.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:text-right">
              <p className="text-[10px] font-mono text-white/40 uppercase">Side-road Year 1 @ 1000 hubs</p>
              <p className="text-[24px] font-black text-[#D4AF37] tracking-tight">137,500 m²</p>
              <p className="text-[10px] font-mono text-white/50">
                (1,100m² × 125) • 2m² tar patch per tourist rental • 5% community fund
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-12 gap-[1px] bg-white/10 border border-white/10">
            <div className="col-span-12 md:col-span-8 bg-[#050505] p-4 flex flex-wrap gap-2 items-center">
              <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase">
                DIRECT JUMPS // METAONECORE SINGLE SOURCE
              </span>
              {[
                { name: 'MetaOneCore Dashboard', tab: 'meta-one-core' },
                { name: 'Pitch v7 Checkers', tab: '04-checkers' },
                { name: 'HubBudget Estimator', tab: '03-bom' },
                { name: 'Project ROI Calculator', tab: 'roi' }
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => onNavigateTab ? onNavigateTab(link.tab) : undefined}
                  className="px-3 py-1 border border-[#D4AF37]/30 text-[10px] font-mono text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition cursor-pointer"
                >
                  {link.name} ↗
                </button>
              ))}
            </div>

            <div className="col-span-12 md:col-span-4 bg-[#D4AF37] p-4 flex justify-between items-center text-black">
              <div>
                <p className="text-[10px] font-mono font-bold tracking-widest text-black/70 uppercase">
                  COST PER OPEN KM
                </p>
                <p className="text-[13px] font-mono font-black text-black">
                  base × method × fuel = audited Open KM only
                </p>
              </div>
              <div className="w-8 h-8 border-2 border-black flex items-center justify-center font-bold">
                <Zap className="w-4 h-4 text-black" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row justify-between gap-2 text-[9px] font-mono text-white/30 tracking-widest">
            <span>
              OPENKM GLOBAL BLUEPRINT — METAONECORE SINGLE SOURCE OF TRUTH → WORLD STANDARD — LOW-DATA TRANSLATOR NOT FLEET
            </span>
            <span>© 2026 AETHERIUM ARCHITECT // #050505 #D4AF37 // IP65 SEALED • 100m PRIVACY • DUAL LEDGER</span>
          </div>
        </div>
      </section>
    </div>
  );
}
