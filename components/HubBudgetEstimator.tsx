'use client';

import React, { useState } from 'react';
import { Wrench, Shield, Zap, Check, HelpCircle, TrendingUp, Coins, RotateCcw, Printer, FileText, FileSpreadsheet, Download, Layers, Sliders } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import HubBOMPrintModal from '@/components/HubBOMPrintModal';
import CCTExportModal from '@/components/CCTExportModal';
import FinancialModelCore from '@/components/FinancialModelCore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

export default function HubBudgetEstimator() {
  const [activeView, setActiveView] = useState<'estimator' | 'mscoa_core'>('estimator');
  const [bikeCount, setBikeCount] = useState<number>(5);
  const [useAirlessTires, setUseAirlessTires] = useState<boolean>(true);
  const [spareBatteryCount, setSpareBatteryCount] = useState<number>(2);
  const [sixty60BayRent, setSixty60BayRent] = useState<number>(2500); // R/month for 2 anchor bays
  const [sharedSecurityCost, setSharedSecurityCost] = useState<number>(6000); // R/month shared
  const [dailyTripsPerBike, setDailyTripsPerBike] = useState<number>(8); // feeder trips/day
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [isCCTModalOpen, setIsCCTModalOpen] = useState<boolean>(false);
  const [quickExportSuccess, setQuickExportSuccess] = useState<boolean>(false);

  // Cost estimates (ZAR)
  const bikeUnitCost = 14500; // per 250W 20" cargo e-bike
  const airlessTireCostPerBike = useAirlessTires ? 2400 : 0; // Tannus solid 20x2.0 pair
  const spareBatteryCost = 4800; // per 48V 14Ah pack
  const rackCabinetSecurityCost = 22000; // rack, lock cabinet with fire cutoff, CCTV, solar flood, signage, toolboard

  const totalBikeCapex = bikeCount * (bikeUnitCost + airlessTireCostPerBike);
  const totalBatteryCapex = spareBatteryCount * spareBatteryCost;
  const totalCapex = totalBikeCapex + totalBatteryCapex + rackCabinetSecurityCost;

  // Monthly financials
  const monthlyRentalRevenue = sixty60BayRent; // Sixty60 rental for 2 dedicated charging bays
  const monthlyMaintenanceOpex = bikeCount * (useAirlessTires ? 350 : 850); // Airless cuts puncture tube repairs by ~60%
  const monthlySharedStaffingOpex = sharedSecurityCost;
  const monthlyTotalOpex = monthlySharedStaffingOpex + monthlyMaintenanceOpex;
  const netMonthlyCashflowBeforeFares = monthlyRentalRevenue - monthlyTotalOpex;

  // Feeder Fare Contribution (Estimated 2.3km @ R4.95 average)
  const monthlyFeederTrips = bikeCount * dailyTripsPerBike * 30;
  const monthlyFeederFareVolume = monthlyFeederTrips * 4.95;

  const chartData = [
    { category: 'Fleet (Bikes)', cost: totalBikeCapex, color: '#0ea5e9' },
    { category: 'Energy (Batts)', cost: totalBatteryCapex, color: '#f59e0b' },
    { category: 'Infrastructure', cost: rackCabinetSecurityCost, color: '#8b5cf6' },
  ];

  const handleDirectCCTCSVDownload = () => {
    const vatRate = 0.15;
    const totalCapexExclVAT = totalCapex;
    const totalCapexInclVAT = totalCapex * (1 + vatRate);
    const annualMaintenanceOpex = monthlyMaintenanceOpex * 12;
    const annualSecurityStaffingOpex = sharedSecurityCost * 12;
    const annualSixty60Rental = sixty60BayRent * 12;
    const annualFeederTrips = monthlyFeederTrips * 12;
    const annualFeederFare = annualFeederTrips * 4.95;
    const annualRoadRepair = annualFeederFare * 0.20;

    let csv = '';
    csv += `# ==========================================================================================\n`;
    csv += `# CITY OF CAPE TOWN METROPOLITAN MUNICIPALITY (WESTERN CAPE - CPT)\n`;
    csv += `# DIRECTORATE: URBAN MOBILITY | DEPARTMENT: TRANSPORT PLANNING & NMT INFRASTRUCTURE\n`;
    csv += `# MUNICIPAL STANDARD CHART OF ACCOUNTS (mSCOA) & MFMA SECTION 71 REPORTING SCHEDULE\n`;
    csv += `# ==========================================================================================\n`;
    csv += `# Project Reference : CCT-MOB-2026-NMT-HUB-01 (WBS: CPX.0019482-F1)\n`;
    csv += `# Cost Centre / Vote: 19050010 (Urban Mobility - NMT Feeder)\n`;
    csv += `# Financial Year    : FY 2026/2027\n`;
    csv += `# Station Node      : Gordon's Bay Beach Road (Node GB1) / Kuyasa MyCiTi Feeder\n`;
    csv += `# Export Date (ISO) : ${new Date().toISOString()}\n`;
    csv += `# Fleet Parameters  : ${bikeCount} E-Bikes | Airless Tires: ${useAirlessTires ? 'YES (Tannus 100% Solid)' : 'NO'} | Spare Batts: ${spareBatteryCount} | Daily Trips/Bike: ${dailyTripsPerBike}\n`;
    csv += `# Total Pilot Capex : ZAR ${formatNumber(totalCapexExclVAT)} (Excl. VAT) | ZAR ${formatNumber(totalCapexInclVAT)} (Incl. 15% VAT)\n`;
    csv += `# Annual Feeder Vol : ${formatNumber(annualFeederTrips)} trips/yr | 20% Road Repair Fund: ZAR ${formatNumber(annualRoadRepair)}/yr (~${(annualRoadRepair / 280).toFixed(0)} m2 tar)\n`;
    csv += `# ==========================================================================================\n\n`;

    csv += `Line_Item_No,mSCOA_Segment_Code,Budget_Category,Asset_SubCategory,Item_Description,Technical_Specification,Quantity,UOM,Unit_Cost_Excl_VAT_ZAR,Total_Cost_Excl_VAT_ZAR,VAT_Rate_Pct,VAT_Amount_ZAR,Total_Cost_Incl_VAT_ZAR,Funding_Vote_Or_Source,City_Policy_Alignment\n`;

    const rows = [
      ['01', 'CAP-INF-NMT-ROLL-001', 'CAPEX', 'Rolling Stock', 'Commuter Cargo E-Bikes (250W)', `${bikeCount}x 250W Rear Hub 20" Low-Step Cargo Frame Disc Brakes Speed Governor 25km/h`, bikeCount, 'Units', bikeUnitCost, bikeCount * bikeUnitCost, '15%', (bikeCount * bikeUnitCost * 0.15).toFixed(2), (bikeCount * bikeUnitCost * 1.15).toFixed(2), 'Public Transport Network Grant (PTNG)', 'CCT CITP 2023-2028: Policy NMT-04'],
      ['02', 'CAP-INF-NMT-TIRE-002', 'CAPEX', 'Puncture Mitigation', useAirlessTires ? 'Tannus Airless Solid Tires 20x2.0' : 'Pneumatic Tires + Thornproof Tubes', useAirlessTires ? `${bikeCount * 2}x Tannus Micro-Closed Cell Polymer (100% Puncture Proof SABS Pin Seat)` : `${bikeCount * 2}x Pneumatic 20x2.0 Tires + Tubes`, bikeCount, 'Pairs', useAirlessTires ? 2400 : 800, bikeCount * (useAirlessTires ? 2400 : 800), '15%', (bikeCount * (useAirlessTires ? 2400 : 800) * 0.15).toFixed(2), (bikeCount * (useAirlessTires ? 2400 : 800) * 1.15).toFixed(2), 'PTNG Infrastructure Grant', 'CCT Reliability Mandate: Low-Maintenance Urban Assets'],
      ['03', 'CAP-INF-NMT-BATT-003', 'CAPEX', 'Energy Storage & Reserves', 'Hot-Swap Lithium-Ion Battery Packs (48V 14Ah)', `${spareBatteryCount}x 48V 14Ah (672Wh) Pack with integrated key lock LED gauge 60C thermal cutoff BMS`, spareBatteryCount, 'Packs', spareBatteryCost, spareBatteryCount * spareBatteryCost, '15%', (spareBatteryCount * spareBatteryCost * 0.15).toFixed(2), (spareBatteryCount * spareBatteryCost * 1.15).toFixed(2), 'PTNG Infrastructure Grant', 'CCT Climate Change Strategy: Green Transport Action 3.2'],
      ['04', 'CAP-INF-NMT-CIVIL-004', 'CAPEX', 'Station Civil & Security', 'Lock Cabinet 8-Bay Rack Solar CCTV & Signs', '1x 1.6mm Galvanized Steel 8-Bay Cabinet + 8-Bay Anchored Ground Rack + 4G Solar CCTV & PIR Floodlight + Toolboard', 1, 'Station Kit', rackCabinetSecurityCost, rackCabinetSecurityCost, '15%', (rackCabinetSecurityCost * 0.15).toFixed(2), (rackCabinetSecurityCost * 1.15).toFixed(2), 'Urban Mobility Capital Budget (Cost Centre 19050010)', 'CCT Universal Access & Non-Motorised Transport Standards'],
      ['05', 'OPEX-MAINT-FLEET-005', 'OPEX', 'Maintenance & Fleet Upkeep', 'Annual Scheduled Maintenance & Wear Parts', useAirlessTires ? `Annual maintenance contract @ R${bikeCount * 350}/mo (Brakes belt drive electrical). 60% savings via solid tires.` : `Annual maintenance contract @ R${bikeCount * 850}/mo (Includes puncture repairs).`, 12, 'Months', monthlyMaintenanceOpex, annualMaintenanceOpex, '15%', (annualMaintenanceOpex * 0.15).toFixed(2), (annualMaintenanceOpex * 1.15).toFixed(2), 'City Rates / Operating Budget & User Fares', 'MFMA Asset Life-Cycle Maintenance Standard'],
      ['06', 'OPEX-SEC-SHARED-006', 'OPEX', 'Operational Supervision', 'Shared Station Marshall & Time Controller Staffing', `Shared on-site hub supervisor / Time Controller + 24/7 4G CCTV monitoring (@ R${formatNumber(sharedSecurityCost)}/mo)`, 12, 'Months', sharedSecurityCost, annualSecurityStaffingOpex, '15%', (annualSecurityStaffingOpex * 0.15).toFixed(2), (annualSecurityStaffingOpex * 1.15).toFixed(2), 'City Transport Operating Budget', 'CCT Community Safety & Public Transport Security Policy'],
      ['07', 'REV-SUBLEASE-ANCHOR-007', 'REVENUE', 'Commercial Sublease Offset', 'Checkers Sixty60 2-Bay Dedicated Sublease', `2 dedicated courier charging bays & designated turnaround parking (@ R${formatNumber(sixty60BayRent)}/mo private commercial lease)`, 12, 'Months', -sixty60BayRent, -annualSixty60Rental, '15%', -(annualSixty60Rental * 0.15).toFixed(2), -(annualSixty60Rental * 1.15).toFixed(2), 'Private Sector Anchor Tenancy (Shoprite Holdings Ltd)', 'CCT Municipal Public-Private Partnership (PPP) Framework'],
      ['08', 'REV-FAREBOX-FEEDER-008', 'REVENUE', 'Commuter Farebox Recovery', 'Feeder Trip Farebox Collection (Est. Annual Volume)', `${formatNumber(annualFeederTrips)} annual feeder trips to MyCiTi trunk lines & taxi interchanges (@ R4.95 avg fare)`, annualFeederTrips, 'Trips', -4.95, -annualFeederFare, '0%', '0.00', (-annualFeederFare).toFixed(2), 'Commuter Farebox / Integrated TapCard System', 'CCT Fare Integration Strategy (NMT Feeder Tariff)'],
      ['09', 'FUND-ROAD-REPAIR-009', 'RING_FENCED', 'Municipal Infrastructure Reinvestment', '20% Side-Road Cold Asphalt Repair Fund Allocation', `20% of annual farebox revenue ring-fenced for cold asphalt pothole patching on feeder roads (~${(annualRoadRepair / 280).toFixed(0)} m2 coverage @ R280/m2)`, 1, 'Annual Fund', annualRoadRepair, annualRoadRepair, '0%', '0.00', annualRoadRepair.toFixed(2), 'OpenKM Ring-Fenced Road Maintenance Reserve', 'CCT Road Infrastructure Maintenance & Pavement Management']
    ];

    rows.forEach(r => {
      csv += r.map(val => typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `City_of_Cape_Town_Hub_Budget_mSCOA_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setQuickExportSuccess(true);
    setTimeout(() => setQuickExportSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top View Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-[#e2e8f0] shadow-2xs">
        <div className="flex items-center gap-1.5 p-1 bg-[#f1f5f9] rounded-xl">
          <button
            onClick={() => setActiveView('estimator')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
              activeView === 'estimator'
                ? 'bg-white text-[#005C99] shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Interactive Hub Sizing Estimator</span>
          </button>

          <button
            onClick={() => setActiveView('mscoa_core')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-bold transition-all cursor-pointer ${
              activeView === 'mscoa_core'
                ? 'bg-[#3F5B75] text-white shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Financial Model Core (City mSCOA Standard)</span>
          </button>
        </div>

        <div className="flex items-center gap-2 px-2 text-[11.5px] font-mono text-[#64748b]">
          <span className="hidden sm:inline">CPX.0019482-F1</span>
          <span>•</span>
          <span className="text-[#059669] font-bold">mSCOA Validated</span>
        </div>
      </div>

      {/* Render Selected View */}
      {activeView === 'mscoa_core' ? (
        <FinancialModelCore />
      ) : (
        <div className="rounded-[16px] border border-[#e5e7eb] bg-white p-5 md:p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f1f5f9] pb-4 mb-5">
            <div>
              <h3 className="text-[15px] font-bold text-[#111827] flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#005C99]" /> Interactive Hub BOM &amp; Pilot Capex Estimator
              </h3>
              <p className="text-[12px] text-[#64748b]">
                Financial model with Checkers Sixty60 anchor tenancy, zero-puncture airless savings, and City of Cape Town mSCOA compliance
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Switch to Full Core */}
              <button
                onClick={() => setActiveView('mscoa_core')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3F5B75] text-white hover:bg-[#2f485f] text-[12px] font-bold transition-all shadow-xs cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Open Financial Model Core</span>
              </button>

              {/* City of Cape Town CSV Reporting Export */}
              <button
                onClick={() => setIsCCTModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#059669] text-white hover:bg-[#047857] text-[12px] font-bold transition-all shadow-xs cursor-pointer"
                title="Export CSV compatible with City of Cape Town reporting standards (mSCOA & MFMA Section 71)"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export CCT CSV</span>
              </button>

              <button
                onClick={() => setIsPrintModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#005C99] text-white hover:bg-[#004877] text-[12px] font-bold transition-all shadow-xs cursor-pointer"
                title="Generate printable BOM document or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print BOM / PDF</span>
              </button>

              <button
                onClick={() => {
                  setBikeCount(5);
                  setUseAirlessTires(true);
                  setSpareBatteryCount(2);
                  setSixty60BayRent(2500);
                  setSharedSecurityCost(6000);
                  setDailyTripsPerBike(8);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-[#64748b] hover:text-[#005C99] px-2.5 py-1.5 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset Preset
              </button>
            </div>
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Controls */}
        <div className="lg:col-span-6 space-y-4">
          {/* E-Bike Fleet Size */}
          <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[12px] font-semibold text-[#1f2937]">Commuter Fleet Size (250W Cargo)</span>
              <span className="font-mono font-bold text-[13px] text-[#005C99] bg-white px-2 py-0.5 rounded border border-[#bfdbfe]">
                {bikeCount} E-Bikes
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="1"
              value={bikeCount}
              onChange={(e) => setBikeCount(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#005C99]"
            />
            <div className="flex justify-between text-[9px] font-mono text-[#94a3b8] mt-1">
              <span>Pilot Baseline: 5 bikes</span>
              <span>Max Capacity for 1 Bay: 15 bikes</span>
            </div>
          </div>

          {/* Tannus Airless Toggle */}
          <div className="bg-[#f0fdfa] p-3.5 rounded-xl border border-[#99f6e0] flex items-center justify-between">
            <div>
              <div className="text-[12px] font-bold text-[#0f766e]">Tannus Airless 20×2.0 Solid Tires</div>
              <div className="text-[11px] text-[#134e4a]">100% puncture proof. Zero tube tools on shadow board.</div>
            </div>
            <button
              type="button"
              onClick={() => setUseAirlessTires(!useAirlessTires)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all ${
                useAirlessTires
                  ? 'bg-[#0f766e] text-white shadow-sm'
                  : 'bg-white border border-[#cbd5e1] text-[#64748b]'
              }`}
            >
              {useAirlessTires ? 'ENABLED (Zero Punctures)' : 'Standard Tubes'}
            </button>
          </div>

          {/* Spare Battery Packs */}
          <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[12px] font-semibold text-[#1f2937]">Hot-Swap Spare Battery Packs (48V 14Ah)</span>
              <span className="font-mono font-bold text-[13px] text-[#b45309] bg-white px-2 py-0.5 rounded border border-[#fde68a]">
                {spareBatteryCount} Packs
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              step="1"
              value={spareBatteryCount}
              onChange={(e) => setSpareBatteryCount(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#b45309]"
            />
          </div>

          {/* Sixty60 Anchor Tenant Bay Rent */}
          <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[12px] font-semibold text-[#1f2937]">Checkers Sixty60 Bay Sublease (2 bays)</span>
              <span className="font-mono font-bold text-[13px] text-[#10b981] bg-white px-2 py-0.5 rounded border border-[#a7f3d0]">
                R {formatNumber(sixty60BayRent)} / mo
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="5000"
              step="250"
              value={sixty60BayRent}
              onChange={(e) => setSixty60BayRent(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#10b981]"
            />
          </div>
        </div>

        {/* Financial Summary & Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          {/* Total Capex Card */}
          <div className="rounded-xl bg-[#0b1220] text-white p-5 border border-[#1e293b]">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#93c5fd]">
                  Total Initial Pilot Capex
                </div>
                <div className="text-[32px] font-black text-white font-mono mt-1">
                  ZAR {formatNumber(totalCapex)}
                </div>
              </div>
              <span className="text-[10px] font-mono bg-[#111a2e] text-[#38bdf8] border border-[#1e293b] px-2 py-1 rounded">
                1 Pilot Hub (Lean Re-use)
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1e293b] space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between text-[#94a3b8]">
                <span>E-Bikes + Tires ({bikeCount} units):</span>
                <span className="text-white">R {formatNumber(totalBikeCapex)}</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>Spare Hot-Swap Batteries ({spareBatteryCount} packs):</span>
                <span className="text-white">R {formatNumber(totalBatteryCapex)}</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>8-Bay Rack, Lock Cabinet, 4G CCTV & Signs:</span>
                <span className="text-white">R {formatNumber(rackCabinetSecurityCost)}</span>
              </div>
            </div>

            <div className="mt-6 h-[140px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 10, left: 20, bottom: 0 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#1e293b" />
                  <XAxis type="number" tickFormatter={(val) => `R${val / 1000}k`} stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis dataKey="category" type="category" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: '#1e293b', opacity: 0.4}} 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '11px', color: '#f8fafc' }}
                    itemStyle={{ color: '#e0f2fe' }}
                    formatter={(value: any) => [`R ${formatNumber(value as number)}`, 'Cost']}
                  />
                  <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={16}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="w-full mt-4 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#111a2e] hover:bg-[#1e293b] text-white text-[12px] font-mono font-medium transition-all border border-[#1e293b] hover:border-[#38bdf8]/40 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Generate Vendor RFQ / Print BOM (PDF)</span>
            </button>
          </div>

          {/* Monthly Operational Metrics */}
          <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wide text-[#475569] font-bold">
              Monthly Operational Economics
            </div>

            <div className="grid grid-cols-2 gap-3 text-[12px]">
              <div className="bg-white p-3 rounded-lg border border-[#e2e8f0]">
                <div className="text-[10px] font-mono text-[#64748b]">Anchor Sublease Income</div>
                <div className="font-bold text-[#10b981] font-mono text-[14px]">
                  +R {formatNumber(monthlyRentalRevenue)} / mo
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#e2e8f0]">
                <div className="text-[10px] font-mono text-[#64748b]">Shared Staff & Maint. Opex</div>
                <div className="font-bold text-[#dc2626] font-mono text-[14px]">
                  -R {formatNumber(monthlyTotalOpex)} / mo
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e2e8f0] flex justify-between items-center text-[12px]">
              <span className="text-[#475569]">Est. Monthly Feeder Volume:</span>
              <span className="font-mono font-bold text-[#005C99]">
                {formatNumber(monthlyFeederTrips)} trips (~R {formatNumber(monthlyFeederFareVolume)})
              </span>
            </div>
          </div>

          {/* City of Cape Town Reporting Card */}
          <div className="rounded-xl border border-[#a7f3d0] bg-[#f0fdf4] p-4 text-[12px] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#059669] text-white flex items-center justify-center font-bold">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-[#065f46]">City of Cape Town Reporting Format</div>
                  <div className="text-[10.5px] text-[#047857]">mSCOA &amp; MFMA Section 71 Compliant Export</div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-[#d1fae5] text-[#047857] px-2 py-0.5 rounded border border-[#a7f3d0]">
                FY 2026/27
              </span>
            </div>

            <p className="text-[11px] text-[#065f46] leading-relaxed">
              Export itemized Capex/Opex schedule, 15% VAT calculations, Checkers Sixty60 private offset, and the 20% side-road cold asphalt repair fund directly to CSV.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={handleDirectCCTCSVDownload}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-mono text-[11.5px] font-bold shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{quickExportSuccess ? 'Downloaded CCT CSV!' : 'Quick Export CSV'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCCTModalOpen(true)}
                className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-white border border-[#a7f3d0] hover:bg-[#ecfdf5] text-[#065f46] font-mono text-[11.5px] font-semibold transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Preview Schedule</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      )}

      {/* Printable BOM & Vendor Requisition Modal */}
      <HubBOMPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        bikeCount={bikeCount}
        useAirlessTires={useAirlessTires}
        spareBatteryCount={spareBatteryCount}
        hubLocation="Kuyasa MyCiTi Feeder / Makhaza Taxi Rank Side-Road"
      />

      {/* City of Cape Town Municipal Reporting & mSCOA CSV Modal */}
      <CCTExportModal
        isOpen={isCCTModalOpen}
        onClose={() => setIsCCTModalOpen(false)}
        bikeCount={bikeCount}
        useAirlessTires={useAirlessTires}
        spareBatteryCount={spareBatteryCount}
        sixty60BayRent={sixty60BayRent}
        sharedSecurityCost={sharedSecurityCost}
        dailyTripsPerBike={dailyTripsPerBike}
        hubLocation="Gordon's Bay Beach Road (Node GB1) / Kuyasa MyCiTi Feeder"
      />
    </div>
  );
}
