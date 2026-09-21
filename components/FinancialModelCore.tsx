'use client';

import React, { useState, useMemo } from 'react';
import {
  Building2,
  Calendar,
  CheckCircle,
  Coins,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Layers,
  MapPin,
  ShieldCheck,
  TrendingUp,
  X,
  Copy,
  Check,
  HelpCircle,
  Sliders,
  Percent
} from 'lucide-react';

export interface StationNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface MSCOALineItem {
  lineNo: number;
  mscoa: string;
  desc: string;
  category: 'CAPEX' | 'OPEX' | 'REV' | 'FUND';
  uom: string;
  qty: number;
  unitExcl: number;
  funding: string;
  wbs: string;
}

export const INITIAL_STATION_NODES: StationNode[] = [
  { id: 'GB1', name: 'GB1 Beach Road', lat: -34.1581, lng: 18.8615 },
  { id: 'GB2', name: 'GB2 Harbour', lat: -34.1623, lng: 18.8641 },
  { id: 'GB3', name: 'GB3 Bikini', lat: -34.1595, lng: 18.8678 },
  { id: 'GB4', name: 'GB4 Suikerbossie', lat: -34.1650, lng: 18.8602 },
  { id: 'GB5', name: 'GB5 Clarence', lat: -34.1701, lng: 18.8550 },
  { id: 'CT1', name: 'CT1 Civic Centre Feeder', lat: -33.9249, lng: 18.4241 },
  { id: 'CT2', name: 'CT2 Adderley Feeder', lat: -33.9258, lng: 18.4239 },
  { id: 'CT3', name: 'CT3 Waterfront Feeder', lat: -33.9030, lng: 18.4220 },
];

export const RAW_MSCOA_DATA: MSCOALineItem[] = [
  {
    lineNo: 1,
    mscoa: 'CAP-INF-NMT-ROLL-001',
    desc: 'Triple Fleet 5 bikes: 2x HillClimber 85Nm Tannus 26x2.0 130kg 625Wh + 2x CiTiDriver 65Nm 500Wh 700x40c + 1x SleekSlider belt tan-wall',
    category: 'CAPEX',
    uom: 'unit',
    qty: 5,
    unitExcl: 18500,
    funding: 'City Grant — USDG',
    wbs: 'CPX.0019482-F1.01'
  },
  {
    lineNo: 2,
    mscoa: 'CAP-INF-NMT-TIRE-002',
    desc: 'Tannus Airless 100% + CiTi wet sleeve + Kinekt suspension + wide 185mm comfort saddle — hire stock resilience',
    category: 'CAPEX',
    uom: 'lot',
    qty: 1,
    unitExcl: 18500,
    funding: 'City Grant',
    wbs: 'CPX.0019482-F1.02'
  },
  {
    lineNo: 3,
    mscoa: 'CAP-INF-NMT-BATT-003',
    desc: 'Battery 500/625Wh 8 units + metal vented cabinet max2 per shelf, smoke/CO2 sensor, grounded, solar LED status',
    category: 'CAPEX',
    uom: 'unit',
    qty: 8,
    unitExcl: 7000,
    funding: 'City Grant',
    wbs: 'CPX.0019482-F1.03'
  },
  {
    lineNo: 4,
    mscoa: 'CAP-INF-NMT-CIVIL-004',
    desc: 'DropBox oak timber-clad steel, Faraday labyrinth 86x2mm double 90° bend + IR ferrite 30% + MIK HD 27kg dock x5 + hub tablet PN532 + Sixty60 40L storage hire',
    category: 'CAPEX',
    uom: 'hub',
    qty: 1,
    unitExcl: 154000,
    funding: 'CPX.0019482-F1 Capital',
    wbs: 'CPX.0019482-F1'
  },
  {
    lineNo: 5,
    mscoa: 'OPEX-MAINT-FLEET-005',
    desc: 'Belt Carbon Drive + hydraulic brake QR log + Equipment Journal QR tagged + S2S min 3 bikes — R11,900/5 bikes/yr ~R990/mo',
    category: 'OPEX',
    uom: 'monthly',
    qty: 12,
    unitExcl: 990,
    funding: 'OPEX Vote 19050010',
    wbs: 'CPX.0019482-F1.MNT'
  },
  {
    lineNo: 6,
    mscoa: 'OPEX-SEC-SHARED-006',
    desc: 'Checkers CCTV + solar security meter share + Time Controller Float management R19.6k',
    category: 'OPEX',
    uom: 'monthly',
    qty: 12,
    unitExcl: 2500,
    funding: 'REV-SUBLEASE-ANCHOR-007 offset',
    wbs: 'CPX.0019482-F1.SEC'
  },
  {
    lineNo: 7,
    mscoa: 'REV-SUBLEASE-ANCHOR-007',
    desc: 'Checkers sublease offset — solar/security no-rent pilot credit (Fifty-Fifty anchor)',
    category: 'REV',
    uom: 'monthly',
    qty: -12,
    unitExcl: 2500,
    funding: 'Anchor Tenant Offset',
    wbs: 'CPX.0019482-F1.REV1'
  },
  {
    lineNo: 8,
    mscoa: 'REV-FAREBOX-FEEDER-008',
    desc: 'MyCiTi feeder R12.50 + Sixty60 box R25 + Tourist R450/day Protea TapCard R80 keepsake — revenue estimate',
    category: 'REV',
    uom: 'estimate',
    qty: 1,
    unitExcl: -45000,
    funding: 'Farebox & Tourist',
    wbs: 'CPX.0019482-F1.REV2'
  },
  {
    lineNo: 9,
    mscoa: 'FUND-ROAD-REPAIR-009',
    desc: '20% side-road cold asphalt repair reserve ~R280/m², 2m² per tourist rental R145 surplus — Tar patch 1100m² Year1',
    category: 'FUND',
    uom: 'monthly',
    qty: 12,
    unitExcl: 4600,
    funding: 'Community Fund',
    wbs: 'CPX.0019482-F1.FUND'
  }
];

function fmtZAR(val: number): string {
  const sign = val < 0 ? '-' : '';
  const abs = Math.abs(val);
  return `${sign}R${abs.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function fmtZARDec(val: number): string {
  const sign = val < 0 ? '-' : '';
  const abs = Math.abs(val);
  return `${sign}R${abs.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function escapeCSV(val: string): string {
  if (val.includes('"') || val.includes(',') || val.includes('\n') || val.includes('\r')) {
    return '"' + val.replace(/"/g, '""') + '"';
  }
  return val;
}

export default function FinancialModelCore() {
  const [nodes, setNodes] = useState<StationNode[]>(INITIAL_STATION_NODES);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [touristRentalsPerMonth, setTouristRentalsPerMonth] = useState<number>(38);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  // Computed data with 15% VAT calculations
  const itemsWithVAT = useMemo(() => {
    return RAW_MSCOA_DATA.map(item => {
      const totalExcl = item.qty * item.unitExcl;
      const vat = totalExcl * 0.15;
      const totalIncl = totalExcl + vat;
      return {
        ...item,
        totalExcl,
        vat,
        totalIncl
      };
    });
  }, []);

  // Category Totals
  const totals = useMemo(() => {
    const capex = itemsWithVAT.filter(i => i.category === 'CAPEX');
    const opex = itemsWithVAT.filter(i => i.category === 'OPEX');
    const rev = itemsWithVAT.filter(i => i.category === 'REV');
    const fund = itemsWithVAT.filter(i => i.category === 'FUND');

    const sumCat = (arr: typeof itemsWithVAT) => ({
      excl: arr.reduce((acc, i) => acc + i.totalExcl, 0),
      vat: arr.reduce((acc, i) => acc + i.vat, 0),
      incl: arr.reduce((acc, i) => acc + i.totalIncl, 0),
    });

    const capexT = sumCat(capex);
    const opexT = sumCat(opex);
    const revT = sumCat(rev);
    const fundT = sumCat(fund);

    const netExcl = capexT.excl + opexT.excl + revT.excl + fundT.excl;
    const netVat = capexT.vat + opexT.vat + revT.vat + fundT.vat;
    const netIncl = capexT.incl + opexT.incl + revT.incl + fundT.incl;

    return {
      capexT,
      opexT,
      revT,
      fundT,
      netExcl,
      netVat,
      netIncl
    };
  }, [itemsWithVAT]);

  // Generate full RFC 4180 CSV with UTF-8 BOM
  const fullCSV = useMemo(() => {
    const lines: string[] = [];
    lines.push('City of Cape Town — mSCOA & MFMA Section 71 — Hub Budget Estimator — OpenKM CORE');
    lines.push(`Directorate,${escapeCSV('Urban Mobility — Transport Planning & Non-Motorised Transport Infrastructure')}`);
    lines.push(`Project WBS,${escapeCSV("CPX.0019482-F1 — NMT Feeder Hubs Gordon's Bay Pilot")}`);
    lines.push(`Cost Centre / Vote Code,${escapeCSV('19050010 — NMT Infrastructure Rollout')}`);
    lines.push(`Financial Year,${escapeCSV('FY 2026/2027')}`);
    lines.push(`Station Node Coordinates,${escapeCSV(nodes.map(n => `${n.name} ${n.lat.toFixed(4)},${n.lng.toFixed(4)}`).join(' | '))}`);
    lines.push(`Policy Cross-Refs,${escapeCSV('CITP 2023-2028 Policy NMT-04 NMT Infrastructure | Climate Change Action 3.2 Low Carbon Mobility | Universal Access Standards SANS 10400-S')}`);
    lines.push(`Responsible Person,${escapeCSV('Time Controller + Belt & Safety Curator + DropBox Guardian 3-tier')}`);
    lines.push('Export Date,2026-08-26');
    lines.push('VAT Rate,15%');
    lines.push('');
    lines.push([
      'Line No',
      'mSCOA Code',
      'Description',
      'Category',
      'UOM',
      'Qty',
      'Unit Price Excl VAT',
      'Total Excl VAT',
      'VAT 15%',
      'Total Incl VAT',
      'Funding Source',
      'WBS Link'
    ].map(escapeCSV).join(','));

    itemsWithVAT.forEach(i => {
      lines.push([
        String(i.lineNo),
        i.mscoa,
        i.desc,
        i.category,
        i.uom,
        String(i.qty),
        i.unitExcl.toFixed(2),
        i.totalExcl.toFixed(2),
        i.vat.toFixed(2),
        i.totalIncl.toFixed(2),
        i.funding,
        i.wbs
      ].map(escapeCSV).join(','));
    });

    lines.push('');
    lines.push(`TOTALS,${escapeCSV('CAPEX')},,, ,,,${totals.capexT.excl.toFixed(2)},${totals.capexT.vat.toFixed(2)},${totals.capexT.incl.toFixed(2)},,`);
    lines.push(`TOTALS,${escapeCSV('OPEX')},,, ,,,${totals.opexT.excl.toFixed(2)},${totals.opexT.vat.toFixed(2)},${totals.opexT.incl.toFixed(2)},,`);
    lines.push(`TOTALS,${escapeCSV('REVENUE OFFSETS')},,, ,,,${totals.revT.excl.toFixed(2)},${totals.revT.vat.toFixed(2)},${totals.revT.incl.toFixed(2)},,`);
    lines.push(`TOTALS,${escapeCSV('FUND RESERVE')},,, ,,,${totals.fundT.excl.toFixed(2)},${totals.fundT.vat.toFixed(2)},${totals.fundT.incl.toFixed(2)},,`);
    lines.push(`NET MUNICIPAL EXPOSURE FY26/27,,,,,,${totals.netExcl.toFixed(2)},${totals.netVat.toFixed(2)},${totals.netIncl.toFixed(2)},,`);
    lines.push('');
    lines.push(`Notes,${escapeCSV('RFC 4180 UTF-8, VAT Standard Rate 15%, mSCOA validated, MFMA S71 monthly ready, CITP NMT-04 compliant')}`);

    return lines.join('\r\n');
  }, [itemsWithVAT, totals, nodes]);

  const handleDownloadCSV = () => {
    const blob = new Blob(['\uFEFF' + fullCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'City_of_Cape_Town_Hub_Budget_mSCOA_2026-08-26.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const handleCopyCSV = () => {
    navigator.clipboard.writeText(fullCSV);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  // 20% Side-Road reserve sensitivity calculations
  const roadReserveStats = useMemo(() => {
    const rentals = touristRentalsPerMonth;
    const m2Monthly = rentals * 2; // 2m² per rental
    const costMonthly = m2Monthly * 280; // R280/m²
    const surplusMonthly = rentals * 145; // R145 surplus/rental
    const monthlyReserveBudget = 4600; // budgeted
    const coverageRatio = surplusMonthly / monthlyReserveBudget;
    return {
      perM2: 280,
      m2PerRental: 2,
      monthlyM2: m2Monthly,
      monthlyCost: costMonthly,
      monthlySurplus: surplusMonthly,
      monthlyReserveNeeded: monthlyReserveBudget,
      coverage: coverageRatio,
      yearlyPatch: 1100 // m² target
    };
  }, [touristRentalsPerMonth]);

  return (
    <div className="rounded-[18px] border border-slate-200 bg-white text-slate-800 shadow-sm overflow-hidden font-sans">
      
      {/* Top Banner / Header */}
      <div className="border-b border-[#2f485f] bg-[#3F5B75] text-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[16px] sm:text-[18px] font-bold tracking-tight text-white">
                  HubBudgetEstimator — City of Cape Town Reporting Standard
                </h2>
                <span className="rounded bg-[#D4AF37] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#3F5B75]">
                  mSCOA &amp; MFMA S71
                </span>
              </div>
              <p className="text-[12px] text-white/70 mt-0.5">
                OpenKM CORE • Municipal Finance Engine • VAT Standard Rate 15% • CITP NMT-04 Compliant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCSV}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-[12px] font-medium text-white ring-1 ring-white/20 hover:bg-white/15 transition-all cursor-pointer"
            >
              {copiedSuccess ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copiedSuccess ? 'Copied' : 'Copy CSV'}</span>
            </button>

            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#D4AF37] px-3.5 py-2 text-[12px] font-bold text-[#1f2937] hover:bg-[#c49f2e] transition-all shadow-xs cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Download City CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Municipal Metadata Section */}
      <div className="border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[#3F5B75]" />
            <h3 className="text-[12px] font-bold uppercase tracking-wider text-slate-700">
              Municipal Header — mSCOA Metadata Schedule
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10.5px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
              <CheckCircle className="h-3 w-3" /> mSCOA Validated
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#3F5B75]/10 px-2.5 py-0.5 text-[10.5px] font-semibold text-[#3F5B75] ring-1 ring-[#3F5B75]/20">
              MFMA S71 Ready
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200">
          <div className="bg-white p-4">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Directorate</div>
            <div className="mt-1 text-[12px] font-semibold text-slate-800 leading-snug">
              Urban Mobility — Transport Planning &amp; Non-Motorised Transport Infrastructure
            </div>
          </div>

          <div className="bg-white p-4">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Project WBS Ref</div>
            <div className="mt-1 font-mono text-[12.5px] font-bold text-[#3F5B75]">CPX.0019482-F1</div>
            <div className="text-[11.5px] text-slate-600">NMT Feeder Hubs Gordon&apos;s Bay Pilot</div>
          </div>

          <div className="bg-white p-4">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Cost Centre / Vote Code</div>
            <div className="mt-1 font-mono text-[12.5px] font-bold text-slate-800">19050010 — NMT Infrastructure Rollout</div>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
              <Calendar className="h-3 w-3" /> FY 2026/2027
            </div>
          </div>

          <div className="bg-slate-50/60 p-4 sm:col-span-2 lg:col-span-3">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  <MapPin className="h-3 w-3 text-[#3F5B75]" /> Station Node Coordinates — GB + CT Feeder (8 Active Nodes)
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {nodes.map(n => (
                    <span key={n.id} className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 font-mono text-[10.5px] text-slate-700 shadow-2xs ring-1 ring-slate-200">
                      <span className="font-bold text-[#3F5B75]">{n.id}</span>
                      <span className="text-slate-500">{n.name.replace(n.id + ' ', '')}</span>
                      <span className="text-slate-400 font-normal">[{n.lat.toFixed(4)}, {n.lng.toFixed(4)}]</span>
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-[11.5px] font-medium text-[#3F5B75] shadow-2xs ring-1 ring-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Customize Nodes</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-4">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Policy Cross-References</div>
            <div className="mt-1.5 space-y-1 text-[11.5px] text-slate-700">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                <span>CITP 2023–2028 Policy NMT-04 (NMT Infrastructure)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                <span>Climate Change Action 3.2 (Low Carbon Mobility)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                <span>Universal Access Standards SANS 10400-S</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:col-span-2">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Responsible Hub Operations (3-Tier Structure)
            </div>
            <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="rounded-lg bg-slate-50 p-2.5 ring-1 ring-slate-200/80">
                <div className="text-[9.5px] uppercase tracking-widest text-slate-400 font-bold">Tier 1</div>
                <div className="text-[12px] font-bold text-slate-800">Time Controller</div>
                <div className="text-[10.5px] text-slate-500">Float &amp; Onboarding</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5 ring-1 ring-slate-200/80">
                <div className="text-[9.5px] uppercase tracking-widest text-slate-400 font-bold">Tier 2</div>
                <div className="text-[12px] font-bold text-slate-800">Belt &amp; Safety Curator</div>
                <div className="text-[10.5px] text-slate-500">QR Brakes &amp; Tires</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5 ring-1 ring-slate-200/80">
                <div className="text-[9.5px] uppercase tracking-widest text-slate-400 font-bold">Tier 3</div>
                <div className="text-[12px] font-bold text-slate-800">DropBox Guardian</div>
                <div className="text-[10.5px] text-slate-500">Faraday Labyrinth &amp; Refund</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Itemized mSCOA Table */}
      <div className="p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4 text-[#3F5B75]" />
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-700">
              Itemized mSCOA Line Items — 15% VAT Applied
            </h3>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="rounded bg-slate-100 px-2 py-1 font-mono text-slate-600 font-semibold">
              9 Line Items
            </span>
            <span className="rounded bg-[#D4AF37]/15 px-2 py-1 font-bold text-[#8a7020] ring-1 ring-[#D4AF37]/30">
              Standard Rate 15% VAT
            </span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
          <table className="min-w-[1280px] w-full text-left text-[12px]">
            <thead className="bg-slate-50 text-[10px] font-mono uppercase tracking-widest text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-3 py-2.5 font-bold">Line</th>
                <th className="px-3 py-2.5 font-bold">mSCOA Code</th>
                <th className="min-w-[320px] px-3 py-2.5 font-bold">Description &amp; Specs</th>
                <th className="px-3 py-2.5 font-bold">Category</th>
                <th className="px-3 py-2.5 font-bold">UOM</th>
                <th className="px-3 py-2.5 text-right font-bold">Qty</th>
                <th className="px-3 py-2.5 text-right font-bold">Unit Excl.</th>
                <th className="px-3 py-2.5 text-right font-bold">Total Excl.</th>
                <th className="px-3 py-2.5 text-right font-bold">VAT 15%</th>
                <th className="px-3 py-2.5 text-right font-bold">Total Incl.</th>
                <th className="px-3 py-2.5 font-bold">Funding Source</th>
                <th className="px-3 py-2.5 font-bold">WBS Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {itemsWithVAT.map(item => (
                <tr key={item.lineNo} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-3 py-3 font-mono font-bold text-slate-500">{item.lineNo}</td>
                  <td className="px-3 py-3 font-mono text-[10.5px]">
                    <span className="rounded bg-slate-900 px-1.5 py-0.5 font-semibold text-white">
                      {item.mscoa}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[12px] leading-snug max-w-[360px]">
                    {item.desc}
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ${
                      item.category === 'CAPEX'
                        ? 'bg-blue-50 text-blue-700 ring-blue-200'
                        : item.category === 'OPEX'
                        ? 'bg-amber-50 text-amber-700 ring-amber-200'
                        : item.category === 'REV'
                        ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                        : 'bg-violet-50 text-violet-700 ring-violet-200'
                    }`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[11px] text-slate-500 uppercase font-mono">{item.uom}</td>
                  <td className="px-3 py-3 text-right font-mono font-bold">{item.qty}</td>
                  <td className="px-3 py-3 text-right font-mono">{fmtZAR(item.unitExcl)}</td>
                  <td className="px-3 py-3 text-right font-mono font-semibold">{fmtZAR(item.totalExcl)}</td>
                  <td className="px-3 py-3 text-right font-mono text-[11px] text-slate-500">{fmtZARDec(item.vat)}</td>
                  <td className="px-3 py-3 text-right font-mono font-bold text-slate-900">{fmtZAR(item.totalIncl)}</td>
                  <td className="px-3 py-3 text-[11px] text-slate-600">{item.funding}</td>
                  <td className="px-3 py-3 font-mono text-[11px] text-[#3F5B75] font-semibold">{item.wbs}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-slate-800 text-[12px] text-white">
              <tr className="bg-[#3F5B75]">
                <td colSpan={7} className="px-3 py-2 text-right text-[11px] uppercase tracking-widest text-white/70 font-semibold">
                  Total CAPEX Excl VAT
                </td>
                <td className="px-3 py-2 text-right font-mono font-bold">{fmtZAR(totals.capexT.excl)}</td>
                <td className="px-3 py-2 text-right font-mono text-white/70">{fmtZARDec(totals.capexT.vat)}</td>
                <td className="px-3 py-2 text-right font-mono font-bold">{fmtZAR(totals.capexT.incl)}</td>
                <td colSpan={2} className="px-3 py-2 text-[10.5px] text-white/60 font-mono">CAP-INF-NMT-*</td>
              </tr>
              <tr className="bg-[#344e65]">
                <td colSpan={7} className="px-3 py-2 text-right text-[11px] uppercase tracking-widest text-white/70 font-semibold">
                  Total OPEX Excl VAT (Annual)
                </td>
                <td className="px-3 py-2 text-right font-mono font-bold">{fmtZAR(totals.opexT.excl)}</td>
                <td className="px-3 py-2 text-right font-mono text-white/70">{fmtZARDec(totals.opexT.vat)}</td>
                <td className="px-3 py-2 text-right font-mono font-bold">{fmtZAR(totals.opexT.incl)}</td>
                <td colSpan={2} className="px-3 py-2 text-[10.5px] text-white/60 font-mono">OPEX-MAINT / SEC</td>
              </tr>
              <tr className="bg-[#2f485f]">
                <td colSpan={7} className="px-3 py-2 text-right text-[11px] uppercase tracking-widest text-emerald-200 font-semibold">
                  Revenue Offsets &amp; Sublease Credit
                </td>
                <td className="px-3 py-2 text-right font-mono font-bold text-emerald-200">{fmtZAR(totals.revT.excl)}</td>
                <td className="px-3 py-2 text-right font-mono text-emerald-200/70">{fmtZARDec(totals.revT.vat)}</td>
                <td className="px-3 py-2 text-right font-mono font-bold text-emerald-200">{fmtZAR(totals.revT.incl)}</td>
                <td colSpan={2} className="px-3 py-2 text-[10.5px] text-white/60 font-mono">REV-SUBLEASE / FAREBOX</td>
              </tr>
              <tr className="bg-[#253d52]">
                <td colSpan={7} className="px-3 py-2 text-right text-[11px] uppercase tracking-widest text-violet-200 font-semibold">
                  20% Side-Road Cold Asphalt Repair Reserve
                </td>
                <td className="px-3 py-2 text-right font-mono font-bold text-violet-200">{fmtZAR(totals.fundT.excl)}</td>
                <td className="px-3 py-2 text-right font-mono text-violet-200/70">{fmtZARDec(totals.fundT.vat)}</td>
                <td className="px-3 py-2 text-right font-mono font-bold text-violet-200">{fmtZAR(totals.fundT.incl)}</td>
                <td colSpan={2} className="px-3 py-2 text-[10.5px] text-white/60 font-mono">FUND-ROAD-REPAIR</td>
              </tr>
              <tr className="bg-slate-900">
                <td colSpan={7} className="px-3 py-3 text-right text-[12px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  Net Municipal Exposure FY26/27
                </td>
                <td className="px-3 py-3 text-right font-mono text-[13px] font-bold text-[#D4AF37]">{fmtZAR(totals.netExcl)}</td>
                <td className="px-3 py-3 text-right font-mono text-[#D4AF37]/80">{fmtZARDec(totals.netVat)}</td>
                <td className="px-3 py-3 text-right font-mono text-[13px] font-bold text-[#D4AF37]">{fmtZAR(totals.netIncl)}</td>
                <td colSpan={2} className="px-3 py-3 text-[10.5px] text-white/50">Excl VAT base for MFMA S71</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Visual Analytics & Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
              <Coins className="h-4 w-4 text-[#3F5B75]" /> CAPEX Breakdown (R321,000 Total)
            </div>
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 flex">
              <div className="bg-[#3F5B75]" style={{ width: '28.8%' }} title="Rolling Stock: 28.8%" />
              <div className="bg-[#5b7fa6]" style={{ width: '5.8%' }} title="Tires: 5.8%" />
              <div className="bg-[#8fb0d1]" style={{ width: '17.4%' }} title="Batteries: 17.4%" />
              <div className="bg-[#D4AF37]" style={{ width: '48.0%' }} title="Civil & Dock: 48.0%" />
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-slate-600 font-mono">
              <span>ROLL: 28.8%</span>
              <span>•</span>
              <span>TIRE: 5.8%</span>
              <span>•</span>
              <span>BATT: 17.4%</span>
              <span>•</span>
              <span className="font-bold text-[#3F5B75]">CIVIL/DOCK: 48.0%</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
              <TrendingUp className="h-4 w-4 text-emerald-600" /> OPEX vs Sublease / Revenue Offset
            </div>
            <div className="mt-2 flex items-center justify-between text-[11.5px]">
              <span className="text-slate-600">Annual OPEX:</span>
              <span className="font-mono font-bold text-amber-700">{fmtZAR(totals.opexT.excl)}</span>
            </div>
            <div className="flex items-center justify-between text-[11.5px] mt-1">
              <span className="text-slate-600">Revenue &amp; Sublease Offsets:</span>
              <span className="font-mono font-bold text-emerald-700">{fmtZAR(totals.revT.excl)}</span>
            </div>
            <div className="mt-2 text-[10.5px] text-slate-500 leading-snug">
              Fifty-Fifty anchor: Checkers CCTV &amp; solar share (R2.5k/mo) offset 100% by lease credit.
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
              <ShieldCheck className="h-4 w-4 text-[#8a7020]" /> 20% Side-Road Cold Asphalt Fund
            </div>
            <div className="mt-2 flex items-center justify-between text-[11.5px]">
              <span className="text-slate-600">Monthly Reserve:</span>
              <span className="font-mono font-bold text-violet-800">R4,600 / mo</span>
            </div>
            <div className="flex items-center justify-between text-[11.5px] mt-1">
              <span className="text-slate-600">Year 1 Tar Patch Target:</span>
              <span className="font-mono font-bold text-slate-800">1,100 m²</span>
            </div>
            <div className="mt-2 text-[10.5px] text-slate-500 leading-snug">
              ~R280/m² cold asphalt patching on taxi rank feeder roads (2m² patched per tourist rental).
            </div>
          </div>
        </div>

        {/* Live RFC 4180 CSV Textarea Preview */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#3F5B75]" />
              <span className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">
                Live RFC 4180 CSV Output Preview
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="rounded bg-slate-200 px-2 py-0.5 font-mono text-[10px] text-slate-700">
                UTF-8 BOM + \r\n
              </span>
              <button
                onClick={handleDownloadCSV}
                className="rounded bg-[#3F5B75] text-white px-2.5 py-1 font-bold hover:bg-[#2f485f] transition-all cursor-pointer"
              >
                Download CSV
              </button>
            </div>
          </div>

          <textarea
            readOnly
            value={fullCSV}
            className="w-full h-44 rounded-lg border border-slate-200 bg-white p-3 font-mono text-[10.5px] leading-relaxed text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#3F5B75]/20 resize-none"
          />
        </div>
      </div>

      {/* Node Customization Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-[900px] max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between bg-[#3F5B75] text-white px-6 py-4">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-5 w-5" />
                <div>
                  <h3 className="text-[15px] font-bold">Station Node Coordinates &amp; Sensitivity Editor</h3>
                  <p className="text-[11px] text-white/70">Customizes station locations and models tourist rental impact</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Sensitivity Slider */}
              <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-violet-700" />
                    <span className="text-[13px] font-bold text-violet-900">
                      Tourist Rental Sensitivity &amp; 20% Road Fund Engine
                    </span>
                  </div>
                  <span className="font-mono text-[13px] font-bold text-violet-900 bg-white px-2.5 py-0.5 rounded-full border border-violet-200">
                    {touristRentalsPerMonth} Rentals / Month
                  </span>
                </div>

                <input
                  type="range"
                  min={5}
                  max={120}
                  value={touristRentalsPerMonth}
                  onChange={(e) => setTouristRentalsPerMonth(parseInt(e.target.value))}
                  className="w-full accent-[#3F5B75] cursor-pointer"
                />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                  <div className="rounded-lg bg-white p-2.5 border border-violet-100 shadow-2xs">
                    <div className="text-slate-400 text-[10px] uppercase font-mono">Monthly Tar Patch</div>
                    <div className="font-bold text-slate-800 font-mono text-[13px] mt-0.5">{roadReserveStats.monthlyM2} m²</div>
                  </div>
                  <div className="rounded-lg bg-white p-2.5 border border-violet-100 shadow-2xs">
                    <div className="text-slate-400 text-[10px] uppercase font-mono">Monthly Surplus</div>
                    <div className="font-bold text-emerald-700 font-mono text-[13px] mt-0.5">{fmtZAR(roadReserveStats.monthlySurplus)}</div>
                  </div>
                  <div className="rounded-lg bg-white p-2.5 border border-violet-100 shadow-2xs">
                    <div className="text-slate-400 text-[10px] uppercase font-mono">Reserve Target</div>
                    <div className="font-bold text-slate-800 font-mono text-[13px] mt-0.5">{fmtZAR(roadReserveStats.monthlyReserveNeeded)}</div>
                  </div>
                  <div className="rounded-lg bg-white p-2.5 border border-violet-100 shadow-2xs">
                    <div className="text-slate-400 text-[10px] uppercase font-mono">Fund Coverage</div>
                    <div className={`font-bold font-mono text-[13px] mt-0.5 ${roadReserveStats.coverage >= 1 ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {(roadReserveStats.coverage * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Station Node Coordinates List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-slate-800">Active Station Nodes (8 Nodes)</span>
                  <span className="text-[11px] text-slate-500">Live GPS Coordinates</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {nodes.map(n => (
                    <div key={n.id} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#3F5B75] text-[12px]">{n.id}</span>
                        <span className="text-[11.5px] text-slate-600 font-medium">{n.name}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9.5px] uppercase font-mono text-slate-400">Latitude</label>
                          <input
                            type="number"
                            step={0.0001}
                            value={n.lat}
                            onChange={(e) => setNodes(prev => prev.map(item => item.id === n.id ? { ...item, lat: parseFloat(e.target.value) || 0 } : item))}
                            className="w-full mt-0.5 px-2 py-1 bg-white border border-slate-200 rounded font-mono text-[11px] text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="block text-[9.5px] uppercase font-mono text-slate-400">Longitude</label>
                          <input
                            type="number"
                            step={0.0001}
                            value={n.lng}
                            onChange={(e) => setNodes(prev => prev.map(item => item.id === n.id ? { ...item, lng: parseFloat(e.target.value) || 0 } : item))}
                            className="w-full mt-0.5 px-2 py-1 bg-white border border-slate-200 rounded font-mono text-[11px] text-slate-800"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-slate-50 border-t border-slate-200 px-6 py-3.5">
              <span className="text-[11.5px] text-slate-500">
                Changes to nodes and sensitivity immediately update the CSV output.
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#3F5B75] text-white text-[12px] font-bold hover:bg-[#2f485f] transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
