'use client';

import React, { useState } from 'react';
import {
  Printer,
  FileDown,
  FileText,
  Check,
  Copy,
  X,
  MapPin,
  Calendar,
  Building,
  Sliders,
  Layers,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export interface BOMItem {
  id: string;
  category: string;
  item: string;
  spec: string;
  qty: number;
  unit: string;
  unitCost: number;
  rationale: string;
  procurement: string;
  technicalNotes?: string;
}

interface HubBOMPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  bikeCount?: number;
  useAirlessTires?: boolean;
  spareBatteryCount?: number;
  hubLocation?: string;
}

export default function HubBOMPrintModal({
  isOpen,
  onClose,
  bikeCount = 5,
  useAirlessTires = true,
  spareBatteryCount = 2,
  hubLocation = 'Kuyasa MyCiTi Feeder / Makhaza Taxi Rank Side-Road',
}: HubBOMPrintModalProps) {
  // Configurable fields for vendor document
  const [siteLocation, setSiteLocation] = useState<string>(hubLocation);
  const [rfqRef, setRfqRef] = useState<string>('RFQ-OKM-2025-HUB01');
  const [vendorName, setVendorName] = useState<string>('Mobility Hardware & Fabrication Vendor');
  const [preparedBy, setPreparedBy] = useState<string>('OpenKM Cape Town Pilot Team');
  const [documentDate, setDocumentDate] = useState<string>('17 February 2025');
  const [bikes, setBikes] = useState<number>(bikeCount);
  const [airless, setAirless] = useState<boolean>(useAirlessTires);
  const [spareBatteries, setSpareBatteries] = useState<number>(spareBatteryCount);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [copiedCsv, setCopiedCsv] = useState<boolean>(false);

  if (!isOpen) return null;

  // Pricing constants (ZAR)
  const bikeUnitCost = 14500;
  const tirePairCost = airless ? 2400 : 800;
  const batteryUnitCost = 4800;
  const cabinetCost = 8500;
  const rackCost = 5500;
  const cctvSolarCost = 4800;
  const toolboardCost = 1800;
  const signageCost = 1400;

  const bomItems: BOMItem[] = [
    {
      id: 'BOM-01',
      category: 'Rolling Stock',
      item: 'Commuter Cargo E-Bikes',
      spec: `${bikes}× 250W Rear Hub, 20" Low-Step Cargo Frame, Disc Brakes, Front/Rear Racks`,
      qty: bikes,
      unit: 'Units',
      unitCost: bikeUnitCost,
      rationale: 'Low center of gravity, commuter-friendly step-through, courier parcel cargo compatible',
      procurement: 'Local E-Bike OEM / Certified Refurb',
      technicalNotes: 'Speed governor capped at 25 km/h. Standard 20" rims compatible with Tannus solid fitment.'
    },
    {
      id: 'BOM-02',
      category: 'Rolling Stock',
      item: airless ? 'Tannus Airless Solid Tires (Puncture-Proof)' : 'Standard Pneumatic Tires + Heavy Tubes',
      spec: airless ? `${bikes * 2}× (pair) Tannus Airless 20×2.0 Micro-Closed Cell Polymer` : `${bikes * 2}× 20×2.0 Pneumatic + Thornproof Tubes`,
      qty: bikes,
      unit: 'Pairs',
      unitCost: tirePairCost,
      rationale: airless ? '100% puncture proof. Zero roadside downtime; eliminates tube repair tools from hub.' : 'Standard pneumatic setup (requires daily pump and patch tools).',
      procurement: airless ? 'Tannus South Africa / Direct' : 'Local Bike Distributor',
      technicalNotes: airless ? 'Must be installed with manufacturer locking pins matched to rim internal width (19-21mm).' : 'Include 2 spare tubes per bike.'
    },
    {
      id: 'BOM-03',
      category: 'Power & Energy',
      item: 'Hot-Swap Lithium-Ion Battery Packs',
      spec: `${bikes + spareBatteries}× 48V 14Ah (672Wh) Pack with integrated key lock & LED fuel gauge`,
      qty: bikes + spareBatteries,
      unit: 'Packs',
      unitCost: batteryUnitCost,
      rationale: `${bikes} in-bike + ${spareBatteries} spare hot-swap packs. Allows under 30s swap without vehicle downtime.`,
      procurement: 'OEM Battery Manufacturer',
      technicalNotes: 'BMS must support 3A standard charge with over-voltage, short circuit & low-temp thermal cutoff.'
    },
    {
      id: 'BOM-04',
      category: 'Hub Infrastructure',
      item: 'Lockable Steel Battery & Charging Cabinet',
      spec: '1× 1.6mm Galvanized Powder-Coated Steel, 8 isolated bays, thermal breaker (60°C cutoff)',
      qty: 1,
      unit: 'Cabinet',
      unitCost: cabinetCost,
      rationale: 'Secure fire-safe overnight/daytime charging. Shared access for Sixty60 courier overlap.',
      procurement: 'Local Sheet Metal Fabricator',
      technicalNotes: 'Pre-wired with 8× SABS 3-pin sockets, master isolator switch, and filtered ventilation louvers.'
    },
    {
      id: 'BOM-05',
      category: 'Hub Infrastructure',
      item: 'Anchored 8-Bay A-Frame Ground Rack',
      spec: '1× 8-bay Heavy-Duty Galvanized Steel Rack with concrete M12 anchor bolts & locking loops',
      qty: 1,
      unit: 'Rack',
      unitCost: rackCost,
      rationale: 'Sturdy anti-theft locking for 8 bikes. Modular footprint fits under existing rank shelters.',
      procurement: 'Local Steel Fabricator / City Approved',
      technicalNotes: 'Anchored to concrete pad using 4× M12 chemical anchors (min 15kN pull-out resistance).'
    },
    {
      id: 'BOM-06',
      category: 'Security & Monitoring',
      item: 'Autonomous 4G CCTV & Solar Floodlight',
      spec: '1× 2K 4G-LTE Solar Camera + 30W Monocrystalline Solar Panel & 5000K PIR Floodlight',
      qty: 1,
      unit: 'Kit',
      unitCost: cctvSolarCost,
      rationale: '100% off-grid security deterrence. No trenching or external municipal AC hookup required.',
      procurement: 'Reolink / Hikvision SA',
      technicalNotes: 'Cloud SIM recording on motion detection + local 128GB high-endurance SD buffer.'
    },
    {
      id: 'BOM-07',
      category: 'Maintenance',
      item: 'Pre-Flight Tool Shadow Board',
      spec: '1× Rigid PVC Shadow Board + Hex Keys (3-8mm), Torx T25, Pedal Wrench, Chain Gauge, Digital Pressure Meter',
      qty: 1,
      unit: 'Board',
      unitCost: toolboardCost,
      rationale: 'Zero tube tools on display. Visible proof of airless tire policy for station controllers.',
      procurement: 'Hardware Supplier / Custom Board',
      technicalNotes: 'Tools tethered with vinyl-coated aircraft cables and tamper-proof swages.'
    },
    {
      id: 'BOM-08',
      category: 'Wayfinding & Signage',
      item: 'High-Visibility Aluminium Dibond Signage',
      spec: '2× 600×900mm 3mm Alu-Dibond UV-laminated signs with MyCiTi feeder map & OpenKM QR',
      qty: 2,
      unit: 'Signs',
      unitCost: signageCost / 2,
      rationale: 'Directs commuters from MyCiTi station & taxi rank directly to feeder hub.',
      procurement: 'Local Signage & Print Shop',
      technicalNotes: 'Class 1 retroreflective white vinyl background for night visibility under hub floodlight.'
    }
  ];

  const totalCapex = bomItems.reduce((acc, item) => acc + item.qty * item.unitCost, 0);

  const handlePrint = () => {
    window.print();
  };

  const generatePlainTextBOM = (): string => {
    let text = `================================================================================\n`;
    text += `OPENKM CAPE TOWN • HUB BILL OF MATERIALS (BOM) & VENDOR REQUISITION\n`;
    text += `================================================================================\n`;
    text += `Document Ref : ${rfqRef}\n`;
    text += `Date         : ${documentDate}\n`;
    text += `Target Site  : ${siteLocation}\n`;
    text += `Target Vendor: ${vendorName}\n`;
    text += `Prepared By  : ${preparedBy}\n`;
    text += `Fleet Size   : ${bikes} E-Bikes | Tires: ${airless ? 'Tannus Solid Airless (Zero Punctures)' : 'Standard Pneumatic'} | Batteries: ${bikes + spareBatteries} Total\n`;
    text += `--------------------------------------------------------------------------------\n\n`;
    text += `ITEMIZED BILL OF MATERIALS:\n\n`;

    bomItems.forEach((b, i) => {
      text += `[${i + 1}] ${b.item.toUpperCase()} (Ref: ${b.id})\n`;
      text += `    Category    : ${b.category}\n`;
      text += `    Quantity    : ${b.qty} ${b.unit}\n`;
      text += `    Est. Unit   : ZAR ${formatNumber(b.unitCost)}\n`;
      text += `    Est. Total  : ZAR ${formatNumber(b.qty * b.unitCost)}\n`;
      text += `    Spec        : ${b.spec}\n`;
      text += `    Rationale   : ${b.rationale}\n`;
      text += `    Procurement : ${b.procurement}\n`;
      if (b.technicalNotes) {
        text += `    Tech Notes  : ${b.technicalNotes}\n`;
      }
      text += `\n`;
    });

    text += `--------------------------------------------------------------------------------\n`;
    text += `TOTAL ESTIMATED PILOT CAPEX : ZAR ${formatNumber(totalCapex)}\n`;
    text += `================================================================================\n\n`;
    text += `MANDATORY CONTRACTOR & INSTALLATION REQUIREMENTS:\n`;
    text += `1. All steel structures must be hot-dip galvanized (min 65 microns) or zinc-primed epoxy powder coated.\n`;
    text += `2. If airless solid tires are specified, vendor must use Tannus locking pin tools matched to rim channel width.\n`;
    text += `3. The charging cabinet must include an automatic thermal fuse (cutoff at 60°C) with SABS compliance.\n`;
    text += `4. Ground rack must be anchored with chemical anchors to existing concrete pad at the rank side-road.\n\n`;
    text += `QUOTATION SUBMISSION & VENDOR SIGN-OFF:\n`;
    text += `Vendor Representative : __________________________________________\n`;
    text += `Company Reg / VAT No. : __________________________________________\n`;
    text += `Quoted Total (ZAR)   : R ___________________ (Excl / Incl VAT)\n`;
    text += `Quotation Validity   : _____ Days\n`;
    text += `Authorized Signature : __________________________ Date: __________\n`;
    return text;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatePlainTextBOM());
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleDownloadCSV = () => {
    let csv = `Item_ID,Category,Item_Name,Specification,Quantity,Unit,Unit_Cost_ZAR,Total_Cost_ZAR,Procurement_Channel,Rationale,Technical_Notes\n`;
    bomItems.forEach((b) => {
      const row = [
        `"${b.id}"`,
        `"${b.category}"`,
        `"${b.item}"`,
        `"${b.spec.replace(/"/g, '""')}"`,
        b.qty,
        `"${b.unit}"`,
        b.unitCost,
        b.qty * b.unitCost,
        `"${b.procurement}"`,
        `"${b.rationale.replace(/"/g, '""')}"`,
        `"${(b.technicalNotes || '').replace(/"/g, '""')}"`
      ];
      csv += row.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `OpenKM_Hub_BOM_${rfqRef}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
      {/* Modal Container */}
      <div className="relative w-full max-w-[1000px] max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-[#cbd5e1] flex flex-col overflow-hidden print:max-h-none print:h-auto print:border-none print:shadow-none print:rounded-none print:w-full">
        
        {/* Modal Toolbar (Hidden during print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#f8fafc] border-b border-[#e2e8f0] print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#005C99] text-white flex items-center justify-center font-bold text-[13px]">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-[#111827] flex items-center gap-2">
                Hub Bill of Materials — Vendor Specification & Requisition
              </h3>
              <p className="text-[11px] text-[#64748b]">
                Generate clean printouts, PDF quotations, or CSV spreadsheets for contractors & suppliers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#cbd5e1] bg-white text-[#334155] text-[12px] font-medium hover:bg-[#f1f5f9] transition-all shadow-xs cursor-pointer"
              title="Copy plain text BOM for email or WhatsApp RFQ"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedText ? 'Copied' : 'Copy Text'}
            </button>

            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#cbd5e1] bg-white text-[#334155] text-[12px] font-medium hover:bg-[#f1f5f9] transition-all shadow-xs cursor-pointer"
              title="Export BOM to CSV for Excel / Google Sheets"
            >
              {copiedCsv ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <FileSpreadsheet className="w-3.5 h-3.5 text-[#059669]" />}
              {copiedCsv ? 'Exported CSV' : 'Export CSV'}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#005C99] text-white text-[12px] font-bold hover:bg-[#004877] transition-all shadow-sm cursor-pointer"
              title="Print document or Save as PDF in browser"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#111827] transition-all cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customization Drawer (Hidden during print) */}
        <div className="bg-[#f1f5f9]/70 border-b border-[#e2e8f0] px-5 py-3 text-[12px] print:hidden">
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#475569] uppercase font-mono mb-2">
            <Sliders className="w-3 h-3 text-[#005C99]" />
            <span>Customize Requisition Metadata & Equipment Scope</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-[10px] font-mono text-[#64748b] uppercase mb-0.5">Document / RFQ Ref</label>
              <input
                type="text"
                value={rfqRef}
                onChange={(e) => setRfqRef(e.target.value)}
                className="w-full px-2.5 py-1 text-[12px] rounded border border-[#cbd5e1] bg-white font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-[#64748b] uppercase mb-0.5">Pilot Hub Site</label>
              <input
                type="text"
                value={siteLocation}
                onChange={(e) => setSiteLocation(e.target.value)}
                className="w-full px-2.5 py-1 text-[12px] rounded border border-[#cbd5e1] bg-white text-[12px]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-[#64748b] uppercase mb-0.5">Target Vendor / Fabricator</label>
              <input
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                className="w-full px-2.5 py-1 text-[12px] rounded border border-[#cbd5e1] bg-white text-[12px]"
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-[10px] font-mono text-[#64748b] uppercase mb-0.5">Fleet Size</label>
                <select
                  value={bikes}
                  onChange={(e) => setBikes(parseInt(e.target.value))}
                  className="w-full px-2 py-1 text-[12px] rounded border border-[#cbd5e1] bg-white font-mono"
                >
                  {[3, 4, 5, 6, 8, 10, 12, 15].map((n) => (
                    <option key={n} value={n}>{n} Bikes</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => setAirless(!airless)}
                className={`px-2 py-1 rounded text-[11px] font-mono font-bold border ${
                  airless ? 'bg-[#0f766e] text-white border-[#0f766e]' : 'bg-white text-[#64748b] border-[#cbd5e1]'
                }`}
                title="Toggle Tannus Airless Puncture-Proof Solid Tires"
              >
                {airless ? 'Airless: ON' : 'Airless: OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white text-[#111827] print:overflow-visible print:p-0">
          
          {/* Document Header */}
          <div className="border-b-2 border-[#111827] pb-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#005C99] font-bold">
                  OpenKM Cape Town Mobility Infrastructure Standard
                </div>
                <h1 className="text-[20px] md:text-[22px] font-black text-[#111827] mt-0.5 uppercase tracking-tight">
                  Hub Equipment Requisition & Bill of Materials (BOM)
                </h1>
                <div className="text-[12px] text-[#475569] mt-1 font-medium">
                  Modular Non-Motorized Transport Feeder Hub • 1 Pilot Unit (Lean Re-Use Model)
                </div>
              </div>
              <div className="text-right font-mono text-[11px]">
                <div className="bg-[#f1f5f9] px-2.5 py-1 rounded border border-[#cbd5e1] font-bold text-[#005C99] inline-block">
                  {rfqRef}
                </div>
                <div className="text-[#64748b] text-[10px] mt-1">Date: {documentDate}</div>
              </div>
            </div>

            {/* Metadata Summary Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-[#e2e8f0] text-[11px]">
              <div>
                <span className="font-mono text-[#64748b] block text-[9px] uppercase">Pilot Hub Location</span>
                <span className="font-semibold text-[#111827] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#005C99] print:hidden" />
                  {siteLocation}
                </span>
              </div>
              <div>
                <span className="font-mono text-[#64748b] block text-[9px] uppercase">Prepared For (Vendor)</span>
                <span className="font-semibold text-[#111827] flex items-center gap-1">
                  <Building className="w-3 h-3 text-[#005C99] print:hidden" />
                  {vendorName}
                </span>
              </div>
              <div>
                <span className="font-mono text-[#64748b] block text-[9px] uppercase">Fleet & Tire Configuration</span>
                <span className="font-semibold text-[#111827]">
                  {bikes} Bikes • {airless ? 'Tannus Solid Airless' : 'Pneumatic Tubes'}
                </span>
              </div>
              <div>
                <span className="font-mono text-[#64748b] block text-[9px] uppercase">Estimated Capex (ZAR)</span>
                <span className="font-mono font-bold text-[#005C99] text-[13px]">
                  R {formatNumber(totalCapex)}
                </span>
              </div>
            </div>
          </div>

          {/* Scope Note */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-lg mb-5 text-[11px] leading-[1.5] text-[#334155]">
            <p>
              <b>Project Intent:</b> This Bill of Materials specifies hardware for 1 pilot dual-use feeder hub co-located at an existing side-road rank shelter. It accommodates {bikes} shared commuter e-bikes and Checkers Sixty60 courier charging bays. All components must withstand heavy daily urban use and 24/7 coastal weather conditions.
            </p>
          </div>

          {/* Main BOM Table */}
          <div className="border border-[#cbd5e1] rounded-lg overflow-hidden mb-6">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead className="bg-[#0f172a] text-white text-[9.5px] font-mono uppercase tracking-wider">
                <tr>
                  <th className="py-2 px-3 w-[8%] font-bold">Item #</th>
                  <th className="py-2 px-3 w-[24%] font-bold">Component & Description</th>
                  <th className="py-2 px-3 w-[30%] font-bold">Technical Specifications & Standards</th>
                  <th className="py-2 px-2.5 w-[8%] text-center font-bold">Qty</th>
                  <th className="py-2 px-3 w-[15%] text-right font-bold">Est. Unit (ZAR)</th>
                  <th className="py-2 px-3 w-[15%] text-right font-bold">Est. Total (ZAR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {bomItems.map((item, idx) => (
                  <tr key={item.id} className={idx % 2 === 1 ? 'bg-[#fcfcfc]' : 'bg-white'}>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#005C99]">{item.id}</td>
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-[#111827]">{item.item}</div>
                      <div className="text-[10px] text-[#64748b]">{item.category} • {item.procurement}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="text-[#334155] font-mono text-[10.5px]">{item.spec}</div>
                      {item.technicalNotes && (
                        <div className="text-[9.5px] text-[#64748b] mt-0.5 italic">
                          Note: {item.technicalNotes}
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 px-2.5 text-center font-mono font-bold text-[#111827]">
                      {item.qty} {item.unit}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-[#475569]">
                      R {formatNumber(item.unitCost)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-[#111827]">
                      R {formatNumber(item.qty * item.unitCost)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-[#f8fafc] border-t-2 border-[#111827] font-mono">
                <tr>
                  <td colSpan={4} className="py-3 px-3 font-bold text-[12px] text-[#111827] text-right uppercase">
                    Total Estimated Pilot Hardware Capex:
                  </td>
                  <td colSpan={2} className="py-3 px-3 font-bold text-[15px] text-[#005C99] text-right">
                    ZAR {formatNumber(totalCapex)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Technical Specifications & Safety Mandates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-[10.5px] leading-[1.5]">
            <div className="border border-[#e2e8f0] rounded-lg p-3 bg-[#fafafa]">
              <div className="font-mono uppercase font-bold text-[#005C99] text-[10px] mb-1">
                Mandatory Quality & Fitter Guidelines
              </div>
              <ul className="space-y-1 text-[#334155] list-disc list-inside">
                <li><b>Corrosion Resistance:</b> All steel members must be hot-dip galvanized or zinc-primed epoxy powder coated.</li>
                <li><b>Airless Tire Fitment:</b> Tannus tires must be seated using manufacturer locking pins matched to internal rim width (19–21mm).</li>
                <li><b>Electrical Isolation:</b> Charging cabinet must feature a dedicated 60°C thermal cutoff breaker and individual circuit protection.</li>
                <li><b>Anchoring Specs:</b> Ground rack must be chemically anchored to concrete base using M12 studs rated for ≥15kN shear.</li>
              </ul>
            </div>

            <div className="border border-[#e2e8f0] rounded-lg p-3 bg-[#fafafa]">
              <div className="font-mono uppercase font-bold text-[#005C99] text-[10px] mb-1">
                Procurement & Delivery Instructions
              </div>
              <ul className="space-y-1 text-[#334155] list-disc list-inside">
                <li><b>Deliverables:</b> All items must be delivered fully assembled or pre-fabricated for on-site bolting within 4 hours.</li>
                <li><b>Spare Parts:</b> 2 spare hot-swap batteries and 1 spare tire set must be delivered in sealed protective transit cases.</li>
                <li><b>Warranty:</b> 12-month structural warranty on racks/cabinets and 12-month/500-cycle warranty on battery cells required.</li>
                <li><b>Delivery Coordination:</b> Coordinate delivery with the site rank marshall and MyCiTi station supervisor.</li>
              </ul>
            </div>
          </div>

          {/* Vendor Quotation Acceptance & Sign-off Block */}
          <div className="border-2 border-dashed border-[#94a3b8] rounded-xl p-4 bg-[#fcfcfc] page-break-inside-avoid">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#475569] font-bold mb-2">
              Official Vendor Quotation Submission & Sign-off
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-[11px]">
              <div>
                <span className="text-[#64748b] text-[9.5px] uppercase font-mono block">Vendor Company Name</span>
                <div className="border-b border-[#cbd5e1] pb-1 pt-1 font-semibold text-[#111827]">
                  {vendorName}
                </div>
              </div>
              <div>
                <span className="text-[#64748b] text-[9.5px] uppercase font-mono block">Company Reg / Tax ID</span>
                <div className="border-b border-[#cbd5e1] pb-1 pt-1 text-[#94a3b8] font-mono">
                  ___________________________
                </div>
              </div>
              <div>
                <span className="text-[#64748b] text-[9.5px] uppercase font-mono block">Total Quotation Value (ZAR)</span>
                <div className="border-b border-[#cbd5e1] pb-1 pt-1 font-mono font-bold text-[#005C99]">
                  R _________________ (Excl. VAT)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-[11px] mt-4 pt-3 border-t border-[#e2e8f0]">
              <div>
                <span className="text-[#64748b] text-[9.5px] uppercase font-mono block">Authorized Representative</span>
                <div className="border-b border-[#cbd5e1] pb-1 pt-1 text-[#94a3b8]">
                  ___________________________
                </div>
              </div>
              <div>
                <span className="text-[#64748b] text-[9.5px] uppercase font-mono block">Signature & Company Stamp</span>
                <div className="border-b border-[#cbd5e1] pb-1 pt-1 text-[#94a3b8]">
                  ___________________________
                </div>
              </div>
              <div>
                <span className="text-[#64748b] text-[9.5px] uppercase font-mono block">Quotation Validity & Date</span>
                <div className="border-b border-[#cbd5e1] pb-1 pt-1 font-mono text-[#475569]">
                  30 Days • Date: ____________
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-3 border-t border-[#e2e8f0] flex justify-between items-center text-[9px] font-mono text-[#94a3b8]">
            <span>OpenKM Cape Town • Open Mobility Standard • MIT License</span>
            <span>Generated: {documentDate} • Reference: {rfqRef}</span>
          </div>

        </div>
      </div>
    </div>
  );
}
