'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Wrench, 
  Clock, 
  Bike, 
  Battery, 
  Layers, 
  Cpu, 
  FileCheck, 
  Briefcase, 
  Radio, 
  Lock, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  Sparkles, 
  Coins, 
  TrendingUp, 
  FileText,
  Copy,
  Check,
  Printer,
  Scale,
  Sun
} from 'lucide-react';

export default function OrganizationalModel() {
  const [selectedLayer, setSelectedLayer] = useState<'all' | 'hq' | 'regional' | 'hub'>('all');
  const [selectedRole, setSelectedRole] = useState<string>('time-controller');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [rideSliderValue, setRideSliderValue] = useState<number>(6.6); // actual modeled rides/day/bike

  // Financial calculations based on ride volume
  const bikesPerHub = 5;
  const totalHubs = 8;
  const totalBikes = totalHubs * bikesPerHub; // 40 bikes
  const ridesPerHubPerDay = rideSliderValue * bikesPerHub;
  const isBreakEvenMet = rideSliderValue >= 0.73;

  // Blended revenue: Feeder (45% @ R12.50), Sixty60 (35% @ R25.00), Tourist (20% @ R450/day = ~R56.25/ride eq)
  const blendedRevPerRide = (0.45 * 12.50) + (0.35 * 25.00) + (0.20 * 56.25); // ~R25.63 avg
  const dailyNetworkRevenue = totalBikes * rideSliderValue * blendedRevPerRide;
  const annualNetworkRevenue = dailyNetworkRevenue * 365;
  const roadRepairFundAnnual = annualNetworkRevenue * 0.20; // 20% allocation

  const copyExecutiveSummary = () => {
    const text = `OPENKM CAPE TOWN — 3-TIER DECENTRALIZED ORGANIZATIONAL MODEL
Executive Summary:
• Priority Note: The 3-tier decentralized organizational model directly enforces the "Support, Not Own" mandate by isolating central architectural standards (auditing, firmware, protocols) from local hub operations, ensuring 100% operational uptime across the 8-hub network (5 Gordon's Bay + 3 Cape Town feeder/tourist hubs) without taking on fleet capital ownership overhead.
• Important Note: The on-the-ground 3-job hub model (Time Controller, Safety Curator, DropBox Guardian) maps directly to the operational specifications detailed in the OpenKM Gordon's Bay Pilot Package and OpenKM Financial Model, ensuring cash-inclusive accessibility, mechanical reliability, and secure offline-first transaction logging.

Structure:
1. Strategic & Technical Core (HQ): Aetherium Architect, Hardware Integrity Lead (ESP32-S3/IP65), Data & Audit Specialist (100m Privacy/CSV Subsidy), Strategic Partnerships (City/Checkers/Sixty60).
2. Regional Pilot Operations Lead: Pilot Coordinator (8-Hub Rollout), Logistics & Maintenance Lead (Battery 2nd Life / Tannus Airless), Community Liaison (Minibus Taxi Rank Feeder Integration).
3. On-the-Ground Hub Staffing (3 Jobs/Hub = 24 Jobs across 8 Hubs):
   - Time Controller: NFC Onboarding, R50 Deposit / R80 Keepsake, Float management.
   - Belt & Safety Curator: Weekly QR Hydraulic checks, Tannus tire wear, Wet Kit allocation.
   - DropBox & Faraday Guardian: Labyrinth 86x2mm drop custody, IR beam check, R50 deposit refund.

Key Metrics:
• Labor Scaling: 3 roles x 8 hubs = 24 direct community jobs.
• Opex per Bike: R11,900/year (labor shared across 5 bikes per station).
• Break-Even: 0.73 rides/day/bike (3.6 rides/day/hub). Actual modeled: 6.6 rides/day/bike.`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const hubStaffRoles = [
    {
      id: 'time-controller',
      title: 'Time Controller (Agent)',
      icon: Clock,
      tag: 'Customer Onboarding & Float',
      scope: 'Client onboarding, NFC NTAG215 issuance (R50 deposit / R80 souvenir sale), cash deposits/top-ups, rider training validation.',
      sop: 'Conducts 15-minute rider onboarding; verifies training flag for 15% grade unlocks; manages daily hub float (~R19,600 scale across network). Enforces weight gate S/M/L (150/110kg) and 60-second comfort fitting.',
      kpi: '≤ 15 min onboarding time; zero cash float discrepancy; 100% training flag accuracy for mountain descents.',
      badgeColor: 'bg-[#005C99]/10 text-[#005C99] border-[#005C99]/20'
    },
    {
      id: 'safety-curator',
      title: 'Belt & Safety Curator',
      icon: Wrench,
      tag: 'Mechanical Integrity & Weather',
      scope: 'Mechanical safety verification, weather response, comfort/storage accessory fitting, Tannus tire & belt maintenance.',
      sop: 'Conducts weekly QR-logged hydraulic brake checks (180mm/160mm); inspects Tannus airless tires; issues "Wet Kit" sleeves when rain probability exceeds 70%. Audits Gates Carbon Drive belt tension.',
      kpi: '0 roadside mechanical failures; 100% QR maintenance log completion; < 30 sec accessory fit-up.',
      badgeColor: 'bg-[#15803d]/10 text-[#15803d] border-[#15803d]/20'
    },
    {
      id: 'dropbox-guardian',
      title: 'DropBox & Faraday Guardian',
      icon: Lock,
      tag: 'Custody, Lock & Deposit Refunds',
      scope: 'Secure return processing, hardware custody, cash deposit refunds, anti-relay signal isolation enforcement.',
      sop: 'Supervises the grounded steel Faraday DropBox return (86×2mm labyrinth slot with IR beam NFC wake); verifies locked status and disburses R50 card refunds. Ensures zero unauthorised RF relay sniffing.',
      kpi: '0 unauthorized RF scans; 100% verified drop-and-lock rate; immediate < 60s refund turnaround.',
      badgeColor: 'bg-[#b45309]/10 text-[#b45309] border-[#b45309]/20'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Title Banner */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#e2e8f0] shadow-sm relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-gradient-to-br from-[#005C99]/10 to-[#16726E]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#005C99] text-white text-[11px] font-bold uppercase tracking-wider">
                Organizational Architecture
              </span>
              <span className="px-3 py-1 rounded-full bg-[#16726E]/10 text-[#16726E] text-[11px] font-semibold">
                3-Tier Decentralized Model
              </span>
              <span className="text-[12px] text-[#64748b] hidden sm:inline-block">
                • Support, Not Own Mandate
              </span>
            </div>
            <h1 className="text-[26px] md:text-[32px] font-black text-[#0f172a] tracking-tight">
              Organizational Alignment &amp; Layer Analysis
            </h1>
            <p className="text-[14px] text-[#64748b] mt-1.5 max-w-3xl leading-relaxed">
              Decentralized operational governance isolating central architectural standards (auditing, firmware, protocols) from local hub operations, delivering 100% uptime across 8 hubs without central fleet capital overhead.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={copyExecutiveSummary}
              className="px-4 py-2.5 rounded-xl border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] text-[13px] font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              {copiedSummary ? <Check className="w-4 h-4 text-[#15803d]" /> : <Copy className="w-4 h-4 text-[#64748b]" />}
              {copiedSummary ? 'Summary Copied!' : 'Copy Exec Summary'}
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-[#005C99] hover:bg-[#004b7d] text-white text-[13px] font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              Print Org Briefing
            </button>
          </div>
        </div>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-gradient-to-br from-[#005C99]/5 via-white to-white p-6 rounded-2xl border border-[#005C99]/20 shadow-sm relative">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#005C99] text-white flex items-center justify-center font-bold text-[13px]">
              <Shield className="w-4 h-4" />
            </div>
            <h2 className="text-[15px] font-bold text-[#005C99] uppercase tracking-wide">
              Priority Note — Support, Not Own
            </h2>
          </div>
          <p className="text-[13.5px] leading-relaxed text-[#334155]">
            The 3-tier decentralized organizational model directly enforces the <strong className="text-[#0f172a] font-bold">&quot;Support, Not Own&quot;</strong> mandate by isolating central architectural standards (auditing, firmware, protocols) from local hub operations. This guarantees <strong className="text-[#005C99]">100% operational uptime</strong> across the 8-hub network (5 Gordon&apos;s Bay + 3 Cape Town feeder/tourist hubs) without taking on fleet capital ownership overhead.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#16726E]/5 via-white to-white p-6 rounded-2xl border border-[#16726E]/20 shadow-sm relative">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#16726E] text-white flex items-center justify-center font-bold text-[13px]">
              <Users className="w-4 h-4" />
            </div>
            <h2 className="text-[15px] font-bold text-[#16726E] uppercase tracking-wide">
              Important Note — 3-Job Hub Deployment
            </h2>
          </div>
          <p className="text-[13.5px] leading-relaxed text-[#334155]">
            The on-the-ground 3-job hub model (<strong className="text-[#0f172a]">Time Controller, Safety Curator, DropBox Guardian</strong>) maps directly to the operational specifications detailed in the OpenKM Gordon&apos;s Bay Pilot Package and Financial Model, ensuring <strong className="text-[#16726E]">cash-inclusive accessibility</strong>, mechanical reliability, and secure offline-first transaction logging.
          </p>
        </div>
      </div>

      {/* 3-Tier Layer Visual Hierarchy & Interactive Navigator */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#e2e8f0] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e2e8f0]">
          <div>
            <h2 className="text-[20px] font-bold text-[#0f172a] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#005C99]" />
              3-Tier Layer Analysis &amp; Organizational Architecture
            </h2>
            <p className="text-[13px] text-[#64748b] mt-0.5">
              Click on each tier to inspect roles, technical interfaces, and operational deliverables.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#f1f5f9] rounded-xl border border-[#e2e8f0] self-start sm:self-auto">
            {(['all', 'hq', 'regional', 'hub'] as const).map((layer) => (
              <button
                key={layer}
                onClick={() => setSelectedLayer(layer)}
                className={`px-3 py-1.5 text-[12px] font-bold rounded-lg transition-all cursor-pointer ${
                  selectedLayer === layer
                    ? 'bg-white text-[#005C99] shadow-sm'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                {layer === 'all' && 'All Tiers'}
                {layer === 'hq' && '1. HQ Core'}
                {layer === 'regional' && '2. Regional Lead'}
                {layer === 'hub' && '3. Hub Staff'}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Architecture Flow Diagram */}
        <div className="py-8 space-y-6">
          {/* Layer 1: HQ Core */}
          {(selectedLayer === 'all' || selectedLayer === 'hq') && (
            <div className="rounded-2xl border-2 border-[#3F5B75]/30 bg-[#f8fafc] p-6 transition-all hover:border-[#3F5B75] relative">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3F5B75] text-white flex items-center justify-center font-bold text-[15px] shadow-sm">
                    1
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#3F5B75]">
                      Project Emergence Headquarters
                    </div>
                    <h3 className="text-[17px] font-bold text-[#0f172a]">
                      Layer 1: Strategic &amp; Technical Core (HQ)
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#3F5B75]/10 text-[#3F5B75] text-[11px] font-bold">
                  Central Architecture &amp; Firmware
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] space-y-2">
                  <div className="flex items-center gap-2 text-[#005C99] font-bold text-[13.5px]">
                    <Cpu className="w-4 h-4" />
                    <span>Aetherium Architect</span>
                  </div>
                  <p className="text-[12px] text-[#475569] leading-relaxed">
                    Maintains the core integration between generation engines (<strong className="text-[#0f172a]">Hephaestus</strong>) and immutable trip/telemetry logs (<strong className="text-[#0f172a]">Alexandria</strong>), ensuring firmware and data schemas remain synchronized.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] space-y-2">
                  <div className="flex items-center gap-2 text-[#16726E] font-bold text-[13.5px]">
                    <Radio className="w-4 h-4" />
                    <span>Hardware Integrity Lead</span>
                  </div>
                  <p className="text-[12px] text-[#475569] leading-relaxed">
                    Oversees ESP32-S3 + PN532 NFC system architecture, 0.2s tap-to-unlock response times, 3.5&quot; display units, and IP65-sealed dual-ledger hardware odometers resistant to False Bay marine salt spray.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] space-y-2">
                  <div className="flex items-center gap-2 text-[#b45309] font-bold text-[13.5px]">
                    <FileCheck className="w-4 h-4" />
                    <span>Data &amp; Audit Specialist</span>
                  </div>
                  <p className="text-[12px] text-[#475569] leading-relaxed">
                    Manages OpenKM translation algorithms (<code className="text-[11px] bg-[#f1f5f9] px-1 py-0.5 rounded text-[#0f172a]">Cost/km = base × method × fuel</code>), 100m privacy rounding for City of Cape Town compliance, and automated CSV reconciliation for feeder subsidies (R6.20/km).
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] space-y-2">
                  <div className="flex items-center gap-2 text-[#475569] font-bold text-[13.5px]">
                    <Building2 className="w-4 h-4" />
                    <span>Strategic Partnerships</span>
                  </div>
                  <p className="text-[12px] text-[#475569] leading-relaxed">
                    Directs enterprise agreements: City of Cape Town (20% side-road repair fund), Checkers / Shoprite (rooftop solar, LED, CCTV), and Sixty60 logistics (MIK HD 27kg cargo standard &amp; per-trip parcel routing).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Connection Line */}
          {selectedLayer === 'all' && (
            <div className="flex justify-center -my-2">
              <div className="w-0.5 h-6 bg-[#cbd5e1]" />
            </div>
          )}

          {/* Layer 2: Regional Operations Lead */}
          {(selectedLayer === 'all' || selectedLayer === 'regional') && (
            <div className="rounded-2xl border-2 border-[#16726E]/30 bg-[#f8fafc] p-6 transition-all hover:border-[#16726E] relative">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#16726E] text-white flex items-center justify-center font-bold text-[15px] shadow-sm">
                    2
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#16726E]">
                      Regional Operations Management
                    </div>
                    <h3 className="text-[17px] font-bold text-[#0f172a]">
                      Layer 2: Regional Pilot Operations Lead (GB &amp; Expanded Hubs)
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#16726E]/10 text-[#16726E] text-[11px] font-bold">
                  8-Station Network &amp; Logistics
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white p-5 rounded-xl border border-[#e2e8f0] space-y-2">
                  <div className="flex items-center gap-2 text-[#16726E] font-bold text-[14px]">
                    <Bike className="w-4 h-4" />
                    <span>Pilot Coordinator</span>
                  </div>
                  <p className="text-[12.5px] text-[#475569] leading-relaxed">
                    Oversees multi-site performance across the 8-station rollout (40 bikes total: <strong className="text-[#0f172a]">HillClimber, CiTiDriver, and SleekSlider</strong> units), maintaining SLA targets across all active hubs in Gordon&apos;s Bay and Constantia.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#e2e8f0] space-y-2">
                  <div className="flex items-center gap-2 text-[#005C99] font-bold text-[14px]">
                    <Battery className="w-4 h-4" />
                    <span>Logistics &amp; Maintenance Lead</span>
                  </div>
                  <p className="text-[12.5px] text-[#475569] leading-relaxed">
                    <strong className="text-[#0f172a]">Battery SOP:</strong> Enforces ventilated metal cabinet storage (max 2 active charging per 1m fireboard spacing) and manages end-of-lifecycle transition (500 cycles / ~2.5 years) to solar micro-grid storage. Manages Tannus 100% airless tires, Carbon belts, and hydraulic pads.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#e2e8f0] space-y-2">
                  <div className="flex items-center gap-2 text-[#b45309] font-bold text-[14px]">
                    <Users className="w-4 h-4" />
                    <span>Community Liaison</span>
                  </div>
                  <p className="text-[12.5px] text-[#475569] leading-relaxed">
                    Facilitates relationships with local minibus taxi associations to position hubs as complementary feeder connectors rather than competitors; manages the cash-to-digital bridge for unbanked commuters via TapCards.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Connection Line */}
          {selectedLayer === 'all' && (
            <div className="flex justify-center -my-2">
              <div className="w-0.5 h-6 bg-[#cbd5e1]" />
            </div>
          )}

          {/* Layer 3: Hub Staffing */}
          {(selectedLayer === 'all' || selectedLayer === 'hub') && (
            <div className="rounded-2xl border-2 border-[#D4AF37]/40 bg-[#f8fafc] p-6 transition-all hover:border-[#D4AF37] relative">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#b45309] text-white flex items-center justify-center font-bold text-[15px] shadow-sm">
                    3
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#b45309]">
                      Station-Level Execution (3 Jobs / Hub = 24 Direct Jobs)
                    </div>
                    <h3 className="text-[17px] font-bold text-[#0f172a]">
                      Layer 3: On-the-Ground Hub Staffing (3 Roles per Hub)
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#b45309]/10 text-[#b45309] text-[11px] font-bold">
                  Direct Community Employment
                </span>
              </div>

              {/* Hub Staff Table */}
              <div className="overflow-x-auto mt-4 rounded-xl border border-[#e2e8f0] bg-white">
                <table className="w-full text-left text-[13px] border-collapse">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                      <th className="p-3.5">Role</th>
                      <th className="p-3.5">Operational Scope</th>
                      <th className="p-3.5">Key Deliverables &amp; SOPs</th>
                      <th className="p-3.5">Primary KPI Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0] text-[#334155]">
                    {hubStaffRoles.map((role) => {
                      const Icon = role.icon;
                      return (
                        <tr 
                          key={role.id}
                          onClick={() => setSelectedRole(role.id)}
                          className={`hover:bg-[#f8fafc] cursor-pointer transition-colors ${selectedRole === role.id ? 'bg-[#005C99]/5 font-medium' : ''}`}
                        >
                          <td className="p-3.5 align-top whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className={`p-1.5 rounded-lg border ${role.badgeColor}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="font-bold text-[#0f172a]">{role.title}</div>
                                <div className="text-[11px] text-[#64748b]">{role.tag}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 align-top text-[12.5px] leading-relaxed max-w-[240px]">
                            {role.scope}
                          </td>
                          <td className="p-3.5 align-top text-[12.5px] leading-relaxed max-w-[320px]">
                            {role.sop}
                          </td>
                          <td className="p-3.5 align-top whitespace-nowrap">
                            <span className="inline-block px-2.5 py-1 rounded-md bg-[#f1f5f9] text-[#0f172a] font-mono text-[11px] border border-[#e2e8f0]">
                              {role.kpi}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Hub Economics & Labor Scaling Calculator */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#e2e8f0] shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e2e8f0]">
          <div>
            <div className="flex items-center gap-2 text-[#005C99] text-[11px] font-bold uppercase tracking-wider">
              <Coins className="w-4 h-4" />
              Pilot Financial &amp; Labor Metrics
            </div>
            <h2 className="text-[20px] font-bold text-[#0f172a]">
              Labor Scaling, Opex &amp; Break-Even Economics
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#15803d]/10 text-[#15803d] text-[12px] font-bold">
              24 Jobs Across 8 Hubs
            </span>
            <span className="px-3 py-1 rounded-full bg-[#005C99]/10 text-[#005C99] text-[12px] font-bold">
              R11,900 / Bike / Year Opex
            </span>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
              Labor Scaling
            </div>
            <div className="text-[24px] font-black text-[#0f172a] mt-1">
              24 Direct Jobs
            </div>
            <div className="text-[12px] text-[#64748b] mt-0.5">
              3 full-time roles × 8 pilot hubs
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
              Annual Opex / Bike
            </div>
            <div className="text-[24px] font-black text-[#005C99] mt-1">
              R11,900
            </div>
            <div className="text-[12px] text-[#64748b] mt-0.5">
              Shared staffing over 5 bikes/station
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
              Break-Even Threshold
            </div>
            <div className="text-[24px] font-black text-[#15803d] mt-1">
              0.73 <span className="text-[14px] font-normal text-[#64748b]">rides/day/bike</span>
            </div>
            <div className="text-[12px] text-[#64748b] mt-0.5">
              3.6 rides/day/hub network threshold
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
              Modeled Actual Volume
            </div>
            <div className="text-[24px] font-black text-[#b45309] mt-1">
              6.6 <span className="text-[14px] font-normal text-[#64748b]">rides/day/bike</span>
            </div>
            <div className="text-[12px] text-[#64748b] mt-0.5">
              9.0× safety buffer over break-even
            </div>
          </div>
        </div>

        {/* Interactive Ride Volume Simulator */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] border border-[#e2e8f0] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-[15px] font-bold text-[#0f172a]">
                Interactive Ride Volume &amp; Road Repair Simulator
              </h3>
              <p className="text-[12px] text-[#64748b]">
                Adjust daily rides per bike to simulate cash break-even and the 20% side-road cold asphalt repair fund.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[20px] font-black font-mono text-[#005C99]">
                {rideSliderValue.toFixed(1)}
              </span>
              <span className="text-[12px] text-[#64748b]"> rides/bike/day</span>
            </div>
          </div>

          <input
            type="range"
            min="0.5"
            max="12.0"
            step="0.1"
            value={rideSliderValue}
            onChange={(e) => setRideSliderValue(parseFloat(e.target.value))}
            className="w-full h-2 bg-[#cbd5e1] rounded-lg appearance-none cursor-pointer accent-[#005C99]"
          />

          <div className="flex justify-between text-[11px] font-mono text-[#64748b]">
            <span>0.5 (Sub-Critical)</span>
            <span className="text-[#15803d] font-bold">0.73 (Break-Even Target)</span>
            <span className="text-[#005C99] font-bold">6.6 (Modeled Base Case)</span>
            <span>12.0 (Peak Tourism)</span>
          </div>

          {/* Simulation Output Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-white rounded-lg border border-[#e2e8f0]">
              <div className="text-[11px] text-[#64748b]">Daily Network Revenue</div>
              <div className="text-[16px] font-bold text-[#0f172a] font-mono">
                R{dailyNetworkRevenue.toLocaleString('en-ZA', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[10.5px] text-[#64748b]">Across 40 bikes (8 hubs)</div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#e2e8f0]">
              <div className="text-[11px] text-[#64748b]">20% Road Repair Fund (Annual)</div>
              <div className="text-[16px] font-bold text-[#16726E] font-mono">
                R{roadRepairFundAnnual.toLocaleString('en-ZA', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[10.5px] text-[#16726E] font-semibold">~{(roadRepairFundAnnual / 280).toFixed(0)} m² cold asphalt</div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#e2e8f0]">
              <div className="text-[11px] text-[#64748b]">Operational Status</div>
              <div className={`text-[15px] font-bold flex items-center gap-1.5 ${isBreakEvenMet ? 'text-[#15803d]' : 'text-[#dc2626]'}`}>
                {isBreakEvenMet ? <CheckCircle2 className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                {isBreakEvenMet ? 'Cash Flow Positive' : 'Below Break-Even'}
              </div>
              <div className="text-[10.5px] text-[#64748b]">
                {isBreakEvenMet ? `${(rideSliderValue / 0.73).toFixed(1)}x required break-even` : 'Deficit subsidised by pilot grant'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
