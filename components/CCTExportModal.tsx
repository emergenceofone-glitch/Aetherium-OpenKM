'use client';

import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  X,
  Building,
  MapPin,
  Calendar,
  Shield,
  FileCheck,
  Layers,
  Coins,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';
import { formatNumber, formatDecimal } from '@/lib/utils';

export interface CCTExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  bikeCount: number;
  useAirlessTires: boolean;
  spareBatteryCount: number;
  sixty60BayRent: number;
  sharedSecurityCost: number;
  dailyTripsPerBike: number;
  hubLocation?: string;
}

export interface CCTReportRow {
  lineItem: string;
  mSCOACode: string;
  category: 'CAPEX' | 'OPEX' | 'REVENUE' | 'RING_FENCED';
  subCategory: string;
  description: string;
  specification: string;
  qty: number;
  uom: string;
  unitCostExclVAT: number;
  totalExclVAT: number;
  vatRatePct: number;
  vatAmount: number;
  totalInclVAT: number;
  fundingSource: string;
  policyAlignment: string;
}

export default function CCTExportModal({
  isOpen,
  onClose,
  bikeCount,
  useAirlessTires,
  spareBatteryCount,
  sixty60BayRent,
  sharedSecurityCost,
  dailyTripsPerBike,
  hubLocation = "Gordon's Bay Beach Road (Node GB1) / Kuyasa MyCiTi Feeder"
}: CCTExportModalProps) {
  // Customization fields for City of Cape Town reporting
  const [stationNode, setStationNode] = useState<string>(hubLocation);
  const [costCentre, setCostCentre] = useState<string>('19050010 (Urban Mobility - NMT Feeder)');
  const [financialYear, setFinancialYear] = useState<string>('2026/2027');
  const [projectWBS, setProjectWBS] = useState<string>('CPX.0019482-F1');
  const [preparedBy, setPreparedBy] = useState<string>('OpenKM Cape Town Mobility Taskforce');
  const [copiedCsv, setCopiedCsv] = useState<boolean>(false);

  if (!isOpen) return null;

  // Cost constants
  const bikeUnitCost = 14500;
  const tirePairCost = useAirlessTires ? 2400 : 800;
  const batteryUnitCost = 4800;
  const rackCabinetSecurityCost = 22000;
  const vatRate = 0.15;

  // Calculated totals
  const totalBikeCapex = bikeCount * bikeUnitCost;
  const totalTireCapex = bikeCount * tirePairCost;
  const totalBatteryCapex = spareBatteryCount * batteryUnitCost;
  const totalCapexExclVAT = totalBikeCapex + totalTireCapex + totalBatteryCapex + rackCabinetSecurityCost;
  const totalCapexInclVAT = totalCapexExclVAT * (1 + vatRate);

  // Operational metrics (Annualized = 12 months)
  const monthlyMaintenanceOpex = bikeCount * (useAirlessTires ? 350 : 850);
  const annualMaintenanceOpex = monthlyMaintenanceOpex * 12;
  const annualSecurityStaffingOpex = sharedSecurityCost * 12;
  const totalAnnualOpex = annualMaintenanceOpex + annualSecurityStaffingOpex;

  // Revenue & Offsets (Annualized)
  const annualSixty60RentalRevenue = sixty60BayRent * 12;
  const monthlyFeederTrips = bikeCount * dailyTripsPerBike * 30;
  const annualFeederTrips = monthlyFeederTrips * 12;
  const avgFeederFare = 4.95;
  const annualFeederFareVolume = annualFeederTrips * avgFeederFare;
  const annualRoadRepairFund = annualFeederFareVolume * 0.20; // 20% side-road maintenance

  // City of Cape Town mSCOA standard structured rows
  const reportRows: CCTReportRow[] = [
    {
      lineItem: '01',
      mSCOACode: 'CAP-INF-NMT-ROLL-001',
      category: 'CAPEX',
      subCategory: 'Rolling Stock',
      description: 'Commuter Cargo E-Bikes (250W)',
      specification: `${bikeCount}× 250W Rear Hub, 20" Low-Step Cargo Frame, Hydraulic Disc Brakes, 25km/h Speed Governor (SANS 4210-2)`,
      qty: bikeCount,
      uom: 'Units',
      unitCostExclVAT: bikeUnitCost,
      totalExclVAT: totalBikeCapex,
      vatRatePct: 15,
      vatAmount: totalBikeCapex * vatRate,
      totalInclVAT: totalBikeCapex * (1 + vatRate),
      fundingSource: 'Public Transport Network Grant (PTNG)',
      policyAlignment: 'CCT CITP 2023-2028: Policy NMT-04 (First-Mile Micro-Mobility)'
    },
    {
      lineItem: '02',
      mSCOACode: 'CAP-INF-NMT-TIRE-002',
      category: 'CAPEX',
      subCategory: 'Puncture Mitigation',
      description: useAirlessTires ? 'Tannus Airless Solid Tires 20×2.0' : 'Pneumatic Tires + Thornproof Tubes',
      specification: useAirlessTires
        ? `${bikeCount * 2}× Tannus Micro-Closed Cell Polymer (100% Puncture Proof, 0 Roadside Downtime, SABS Pin Seat)`
        : `${bikeCount * 2}× 20×2.0 Pneumatics with Thornproof Inner Tubes`,
      qty: bikeCount,
      uom: 'Pairs',
      unitCostExclVAT: tirePairCost,
      totalExclVAT: totalTireCapex,
      vatRatePct: 15,
      vatAmount: totalTireCapex * vatRate,
      totalInclVAT: totalTireCapex * (1 + vatRate),
      fundingSource: 'PTNG Infrastructure Grant',
      policyAlignment: 'CCT Reliability Mandate: Low-Maintenance Urban Assets'
    },
    {
      lineItem: '03',
      mSCOACode: 'CAP-INF-NMT-BATT-003',
      category: 'CAPEX',
      subCategory: 'Energy Storage & Reserves',
      description: 'Hot-Swap Lithium-Ion Battery Packs (48V 14Ah)',
      specification: `${spareBatteryCount}× 48V 14Ah (672Wh) Pack with integrated key lock, LED fuel gauge & 60°C thermal cutoff BMS`,
      qty: spareBatteryCount,
      uom: 'Packs',
      unitCostExclVAT: batteryUnitCost,
      totalExclVAT: totalBatteryCapex,
      vatRatePct: 15,
      vatAmount: totalBatteryCapex * vatRate,
      totalInclVAT: totalBatteryCapex * (1 + vatRate),
      fundingSource: 'PTNG Infrastructure Grant',
      policyAlignment: 'CCT Climate Change Strategy: Green Transport Action 3.2'
    },
    {
      lineItem: '04',
      mSCOACode: 'CAP-INF-NMT-CIVIL-004',
      category: 'CAPEX',
      subCategory: 'Station Civil & Security Infrastructure',
      description: 'Lock Cabinet, 8-Bay Rack, Solar CCTV & Signs',
      specification: '1× 1.6mm Galvanized Steel 8-Bay Cabinet + 8-Bay M12 Anchored Ground Rack + 4G Solar CCTV & PIR Floodlight + Toolboard & Signage',
      qty: 1,
      uom: 'Station Kit',
      unitCostExclVAT: rackCabinetSecurityCost,
      totalExclVAT: rackCabinetSecurityCost,
      vatRatePct: 15,
      vatAmount: rackCabinetSecurityCost * vatRate,
      totalInclVAT: rackCabinetSecurityCost * (1 + vatRate),
      fundingSource: 'Urban Mobility Capital Budget (Cost Centre 19050010)',
      policyAlignment: 'CCT Universal Access & Non-Motorised Transport Standards'
    },
    {
      lineItem: '05',
      mSCOACode: 'OPEX-MAINT-FLEET-005',
      category: 'OPEX',
      subCategory: 'Maintenance & Fleet Upkeep',
      description: 'Annual Scheduled Maintenance & Wear Parts',
      specification: useAirlessTires
        ? `Annual maintenance contract @ R${bikeCount * 350}/mo (Brakes, belt drive, electrical). 60% savings via solid tires.`
        : `Annual maintenance contract @ R${bikeCount * 850}/mo (Includes tube puncture repairs and replacements).`,
      qty: 12,
      uom: 'Months',
      unitCostExclVAT: monthlyMaintenanceOpex,
      totalExclVAT: annualMaintenanceOpex,
      vatRatePct: 15,
      vatAmount: annualMaintenanceOpex * vatRate,
      totalInclVAT: annualMaintenanceOpex * (1 + vatRate),
      fundingSource: 'City Rates / Operating Budget & User Fares',
      policyAlignment: 'MFMA Asset Life-Cycle Maintenance Standard'
    },
    {
      lineItem: '06',
      mSCOACode: 'OPEX-SEC-SHARED-006',
      category: 'OPEX',
      subCategory: 'Operational Supervision & Security',
      description: 'Shared Station Marshall & Time Controller Staffing',
      specification: `Shared on-site hub supervisor / Time Controller + 24/7 4G CCTV monitoring co-located at rank (@ R${formatNumber(sharedSecurityCost)}/mo)`,
      qty: 12,
      uom: 'Months',
      unitCostExclVAT: sharedSecurityCost,
      totalExclVAT: annualSecurityStaffingOpex,
      vatRatePct: 15,
      vatAmount: annualSecurityStaffingOpex * vatRate,
      totalInclVAT: annualSecurityStaffingOpex * (1 + vatRate),
      fundingSource: 'City Transport Operating Budget',
      policyAlignment: 'CCT Community Safety & Public Transport Security Policy'
    },
    {
      lineItem: '07',
      mSCOACode: 'REV-SUBLEASE-ANCHOR-007',
      category: 'REVENUE',
      subCategory: 'Commercial Sublease Revenue Offset',
      description: 'Checkers Sixty60 2-Bay Dedicated Sublease',
      specification: `2 dedicated courier charging bays & designated turnaround parking (@ R${formatNumber(sixty60BayRent)}/mo private commercial lease)`,
      qty: 12,
      uom: 'Months',
      unitCostExclVAT: -sixty60BayRent,
      totalExclVAT: -annualSixty60RentalRevenue,
      vatRatePct: 15,
      vatAmount: -(annualSixty60RentalRevenue * vatRate),
      totalInclVAT: -(annualSixty60RentalRevenue * (1 + vatRate)),
      fundingSource: 'Private Sector Anchor Tenancy (Shoprite Holdings Ltd)',
      policyAlignment: 'CCT Municipal Public-Private Partnership (PPP) Framework'
    },
    {
      lineItem: '08',
      mSCOACode: 'REV-FAREBOX-FEEDER-008',
      category: 'REVENUE',
      subCategory: 'Commuter Farebox Revenue',
      description: 'Feeder Trip Farebox Collection (Est. Annual Volume)',
      specification: `${formatNumber(annualFeederTrips)} annual first/last-mile feeder trips to MyCiTi trunk lines & taxi interchanges (@ R${formatDecimal(avgFeederFare)} avg fare)`,
      qty: annualFeederTrips,
      uom: 'Trips',
      unitCostExclVAT: -avgFeederFare,
      totalExclVAT: -annualFeederFareVolume,
      vatRatePct: 0,
      vatAmount: 0,
      totalInclVAT: -annualFeederFareVolume,
      fundingSource: 'Commuter Farebox / Integrated TapCard System',
      policyAlignment: 'CCT Fare Integration Strategy (NMT Feeder Tariff)'
    },
    {
      lineItem: '09',
      mSCOACode: 'FUND-ROAD-REPAIR-009',
      category: 'RING_FENCED',
      subCategory: 'Municipal Infrastructure Reinvestment',
      description: '20% Side-Road Cold Asphalt Repair Fund Allocation',
      specification: `20% of annual farebox revenue ring-fenced for cold asphalt pothole patching on taxi rank and feeder side-roads (~${(annualRoadRepairFund / 280).toFixed(0)} m² coverage @ R280/m²)`,
      qty: 1,
      uom: 'Annual Fund',
      unitCostExclVAT: annualRoadRepairFund,
      totalExclVAT: annualRoadRepairFund,
      vatRatePct: 0,
      vatAmount: 0,
      totalInclVAT: annualRoadRepairFund,
      fundingSource: 'OpenKM Ring-Fenced Road Maintenance Reserve',
      policyAlignment: 'CCT Road Infrastructure Maintenance & Pavement Management System'
    }
  ];

  const generateCityOfCapeTownCSV = (): string => {
    let csv = '';
    
    // City of Cape Town Municipal Reporting Header Metadata
    csv += `# ==========================================================================================\n`;
    csv += `# CITY OF CAPE TOWN METROPOLITAN MUNICIPALITY (WESTERN CAPE - CPT)\n`;
    csv += `# DIRECTORATE: URBAN MOBILITY | DEPARTMENT: TRANSPORT PLANNING & NMT INFRASTRUCTURE\n`;
    csv += `# MUNICIPAL STANDARD CHART OF ACCOUNTS (mSCOA) & MFMA SECTION 71 REPORTING SCHEDULE\n`;
    csv += `# ==========================================================================================\n`;
    csv += `# Report Title       : Non-Motorised Transport (NMT) Feeder Hub Configuration & Budget Schedule\n`;
    csv += `# Project WBS Ref    : ${projectWBS}\n`;
    csv += `# Cost Centre / Vote : ${costCentre}\n`;
    csv += `# Financial Year     : FY ${financialYear}\n`;
    csv += `# Station Node Location: ${stationNode}\n`;
    csv += `# Prepared By        : ${preparedBy}\n`;
    csv += `# Export Date (ISO)  : ${new Date().toISOString()}\n`;
    csv += `# Fleet Parameters   : ${bikeCount} E-Bikes | Airless Tires: ${useAirlessTires ? 'YES (Tannus 100% Solid)' : 'NO (Pneumatic)'} | Spare Batteries: ${spareBatteryCount} | Daily Trips/Bike: ${dailyTripsPerBike}\n`;
    csv += `# Sixty60 Sublease   : R ${formatNumber(sixty60BayRent)}/month | Shared Security Opex: R ${formatNumber(sharedSecurityCost)}/month\n`;
    csv += `# Net Initial Capex  : ZAR ${formatNumber(totalCapexExclVAT)} (Excl. VAT) | ZAR ${formatNumber(totalCapexInclVAT)} (Incl. 15% VAT)\n`;
    csv += `# Annual Feeder Vol  : ${formatNumber(annualFeederTrips)} trips/yr | 20% Road Repair Fund: ZAR ${formatNumber(annualRoadRepairFund)}/yr (~${(annualRoadRepairFund / 280).toFixed(0)} m2 tar)\n`;
    csv += `# ==========================================================================================\n`;
    csv += `\n`;

    // CSV Header Line
    const headers = [
      'Line_Item_No',
      'mSCOA_Segment_Code',
      'Budget_Category',
      'Asset_SubCategory',
      'Item_Description',
      'Technical_Specification',
      'Quantity',
      'UOM',
      'Unit_Cost_Excl_VAT_ZAR',
      'Total_Cost_Excl_VAT_ZAR',
      'VAT_Rate_Pct',
      'VAT_Amount_ZAR',
      'Total_Cost_Incl_VAT_ZAR',
      'Funding_Vote_Or_Source',
      'City_Policy_Alignment'
    ];
    csv += headers.join(',') + '\n';

    // Data rows
    reportRows.forEach((row) => {
      const csvRow = [
        `"${row.lineItem}"`,
        `"${row.mSCOACode}"`,
        `"${row.category}"`,
        `"${row.subCategory}"`,
        `"${row.description.replace(/"/g, '""')}"`,
        `"${row.specification.replace(/"/g, '""')}"`,
        row.qty,
        `"${row.uom}"`,
        row.unitCostExclVAT.toFixed(2),
        row.totalExclVAT.toFixed(2),
        `${row.vatRatePct}%`,
        row.vatAmount.toFixed(2),
        row.totalInclVAT.toFixed(2),
        `"${row.fundingSource.replace(/"/g, '""')}"`,
        `"${row.policyAlignment.replace(/"/g, '""')}"`
      ];
      csv += csvRow.join(',') + '\n';
    });

    return csv;
  };

  const handleDownloadCSV = () => {
    const csvContent = generateCityOfCapeTownCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute('download', `City_of_Cape_Town_Hub_Budget_mSCOA_${financialYear.replace('/', '-')}_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2500);
  };

  const handleCopyCSV = () => {
    navigator.clipboard.writeText(generateCityOfCapeTownCSV());
    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-[1100px] max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-[#cbd5e1] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#0f172a] text-white border-b border-[#1e293b]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#005C99] flex items-center justify-center text-white font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase bg-[#38bdf8]/10 text-[#38bdf8] px-2 py-0.5 rounded border border-[#38bdf8]/20 font-bold">
                  City of Cape Town • mSCOA Export
                </span>
                <span className="text-[11px] text-[#94a3b8] hidden sm:inline">
                  Urban Mobility Directorate Schedule
                </span>
              </div>
              <h2 className="text-[16px] font-bold text-white tracking-tight mt-0.5">
                Municipal Hub Budget &amp; Configuration Export (CSV)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#334155] bg-[#1e293b] text-white text-[12px] font-medium hover:bg-[#334155] transition-all cursor-pointer"
              title="Copy CSV to clipboard"
            >
              {copiedCsv ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCsv ? 'Copied' : 'Copy CSV'}</span>
            </button>

            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#005C99] text-white text-[12px] font-bold hover:bg-[#004877] transition-all shadow-sm cursor-pointer"
              title="Download CSV for Excel or Municipal Financial System"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download City CSV</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#94a3b8] hover:bg-[#1e293b] hover:text-white transition-all cursor-pointer ml-1"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Municipal Metadata Customization Bar */}
        <div className="bg-[#f8fafc] border-b border-[#e2e8f0] px-6 py-3.5 text-[12px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#64748b] font-bold mb-1">
                Station Node / Location
              </label>
              <input
                type="text"
                value={stationNode}
                onChange={(e) => setStationNode(e.target.value)}
                className="w-full px-2.5 py-1 text-[12px] rounded border border-[#cbd5e1] bg-white text-[#0f172a]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-[#64748b] font-bold mb-1">
                Cost Centre / Vote Code
              </label>
              <input
                type="text"
                value={costCentre}
                onChange={(e) => setCostCentre(e.target.value)}
                className="w-full px-2.5 py-1 text-[12px] rounded border border-[#cbd5e1] bg-white font-mono text-[#0f172a]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-[#64748b] font-bold mb-1">
                Financial Year (FY)
              </label>
              <select
                value={financialYear}
                onChange={(e) => setFinancialYear(e.target.value)}
                className="w-full px-2.5 py-1 text-[12px] rounded border border-[#cbd5e1] bg-white font-mono text-[#0f172a]"
              >
                <option value="2025/2026">FY 2025/2026</option>
                <option value="2026/2027">FY 2026/2027 (Active Pilot)</option>
                <option value="2027/2028">FY 2027/2028 (Phase 2 Scale)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-[#64748b] font-bold mb-1">
                Project WBS Number
              </label>
              <input
                type="text"
                value={projectWBS}
                onChange={(e) => setProjectWBS(e.target.value)}
                className="w-full px-2.5 py-1 text-[12px] rounded border border-[#cbd5e1] bg-white font-mono text-[#0f172a]"
              />
            </div>
          </div>
        </div>

        {/* Live Summary Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-6 py-3 bg-[#f1f5f9]/70 border-b border-[#e2e8f0] text-[11.5px]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white rounded-md border border-[#e2e8f0] text-[#005C99]">
              <Coins className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] text-[#64748b] uppercase font-mono">Total Capex (Incl. VAT)</div>
              <div className="font-bold font-mono text-[#0f172a]">ZAR {formatNumber(totalCapexInclVAT)}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white rounded-md border border-[#e2e8f0] text-[#dc2626]">
              <TrendingDown className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] text-[#64748b] uppercase font-mono">Annual OPEX</div>
              <div className="font-bold font-mono text-[#dc2626]">ZAR {formatNumber(totalAnnualOpex)} / yr</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white rounded-md border border-[#e2e8f0] text-[#10b981]">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] text-[#64748b] uppercase font-mono">Sixty60 Sublease Offset</div>
              <div className="font-bold font-mono text-[#10b981]">ZAR {formatNumber(annualSixty60RentalRevenue)} / yr</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white rounded-md border border-[#e2e8f0] text-[#059669]">
              <FileCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] text-[#64748b] uppercase font-mono">20% Road Repair Reserve</div>
              <div className="font-bold font-mono text-[#059669]">ZAR {formatNumber(annualRoadRepairFund)} / yr</div>
            </div>
          </div>
        </div>

        {/* CSV Preview Table */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-[#0f172a]">City of Cape Town mSCOA Reporting Schedule</span>
              <span className="text-[11px] font-mono text-[#64748b]">({reportRows.length} Line Items)</span>
            </div>
            <span className="text-[11px] font-mono text-[#005C99] bg-[#005C99]/10 px-2 py-0.5 rounded">
              Standard Rate VAT 15% Applied
            </span>
          </div>

          <div className="border border-[#e2e8f0] rounded-xl overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead className="bg-[#f8fafc] text-[10px] font-mono uppercase text-[#475569] border-b border-[#e2e8f0]">
                <tr>
                  <th className="py-2.5 px-3">Item</th>
                  <th className="py-2.5 px-3">mSCOA Code</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Description &amp; Specification</th>
                  <th className="py-2.5 px-2 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Excl. VAT (ZAR)</th>
                  <th className="py-2.5 px-2 text-center">VAT</th>
                  <th className="py-2.5 px-3 text-right">Incl. VAT (ZAR)</th>
                  <th className="py-2.5 px-3">Funding / Policy Alignment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0] text-[#334155]">
                {reportRows.map((row) => (
                  <tr key={row.lineItem} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-[#005C99]">{row.lineItem}</td>
                    <td className="py-2.5 px-3 font-mono text-[10px] text-[#64748b]">{row.mSCOACode}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[9.5px] font-mono font-bold ${
                        row.category === 'CAPEX'
                          ? 'bg-[#005C99]/10 text-[#005C99]'
                          : row.category === 'OPEX'
                          ? 'bg-[#dc2626]/10 text-[#dc2626]'
                          : row.category === 'REVENUE'
                          ? 'bg-[#10b981]/10 text-[#10b981]'
                          : 'bg-[#b45309]/10 text-[#b45309]'
                      }`}>
                        {row.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 max-w-[260px]">
                      <div className="font-semibold text-[#0f172a]">{row.description}</div>
                      <div className="text-[10px] text-[#64748b] line-clamp-2 mt-0.5">{row.specification}</div>
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono font-bold text-[#0f172a]">
                      {row.qty} <span className="text-[9.5px] font-normal text-[#64748b]">{row.uom}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium">
                      R {formatNumber(Math.abs(row.totalExclVAT))} {row.totalExclVAT < 0 ? '(Credit)' : ''}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono text-[10px] text-[#64748b]">
                      {row.vatRatePct}%
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-[#0f172a]">
                      R {formatNumber(Math.abs(row.totalInclVAT))} {row.totalInclVAT < 0 ? '(Credit)' : ''}
                    </td>
                    <td className="py-2.5 px-3 text-[10px] text-[#64748b] max-w-[200px]">
                      <div className="font-medium text-[#0f172a] truncate">{row.fundingSource}</div>
                      <div className="truncate text-[#94a3b8]">{row.policyAlignment}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Compliance & Audit Notes */}
          <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 text-[11.5px] text-[#475569] leading-relaxed space-y-1.5">
            <div className="font-bold text-[#0f172a] flex items-center gap-1.5 text-[12px]">
              <Shield className="w-3.5 h-3.5 text-[#005C99]" />
              City of Cape Town Compliance Notice (MFMA / mSCOA Section 71)
            </div>
            <p>
              This CSV dataset is generated to conform with the <strong>City of Cape Town Urban Mobility Directorate Reporting Standards</strong>, 
              the <strong>Comprehensive Integrated Transport Plan (CITP 2023–2028)</strong>, and the National Treasury 
              Municipal Standard Chart of Accounts (mSCOA). Puncture mitigation via Tannus solid tires reduces required municipal maintenance 
              contingencies by ~60%, and 20% of feeder revenue is ring-fenced for cold asphalt side-road restoration.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 bg-[#f8fafc] border-t border-[#e2e8f0] text-[11px] text-[#64748b]">
          <div className="flex items-center gap-2">
            <span>Format: UTF-8 CSV with standard RFC 4180 escaping</span>
            <span>•</span>
            <span>Delimiter: Comma (,)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadCSV}
              className="px-4 py-2 rounded-lg bg-[#005C99] hover:bg-[#004877] text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .CSV File</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
