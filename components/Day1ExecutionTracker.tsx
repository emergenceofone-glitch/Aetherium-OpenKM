'use client';

import React, { useState } from 'react';
import { CheckCircle2, Upload, FileText, Printer, CheckSquare, Square, Download, Send, AlertCircle, RefreshCw } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export default function Day1ExecutionTracker() {
  const [gb1Signed, setGb1Signed] = useState<boolean>(false);
  const [fabricatorQuote, setFabricatorQuote] = useState<number>(42500);
  const [insuranceQuoteObtained, setInsuranceQuoteObtained] = useState<boolean>(false);
  const [rfqTargetPrice, setRfqTargetPrice] = useState<number>(1680000);
  const [signedPhotoName, setSignedPhotoName] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'checklist' | 'bikeOrder' | 'jd'>('checklist');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSignedPhotoName(e.target.files[0].name);
      setGb1Signed(true);
    }
  };

  return (
    <div className="w-full bg-white text-[#0f172a] font-sans rounded-2xl overflow-hidden shadow-sm border border-[#e2e8f0] p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f1f5f9] pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#15803d]/10 text-[#15803d] text-[11px] font-bold tracking-wide uppercase">Day 1 Execution</span>
            <span className="text-[11px] text-[#64748b]">Gordon&apos;s Bay Pilot Control Center</span>
          </div>
          <h2 className="text-[24px] md:text-[28px] font-bold tracking-tight text-[#0f172a]">Day 1-3 Tick Log &amp; Order Generator</h2>
          <p className="text-[13px] text-[#64748b] mt-1">
            Track MOU signatures, fabricator quote pricing, insurance quotes, and auto-generate bike order lists &amp; Time Controller JD.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#f8fafc] p-1.5 rounded-xl border border-[#e2e8f0]">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3 py-1.5 text-[12px] font-semibold rounded-lg transition-colors cursor-pointer ${activeTab === 'checklist' ? 'bg-[#005C99] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'}`}
          >
            Tick Log &amp; Status
          </button>
          <button
            onClick={() => setActiveTab('bikeOrder')}
            className={`px-3 py-1.5 text-[12px] font-semibold rounded-lg transition-colors cursor-pointer ${activeTab === 'bikeOrder' ? 'bg-[#005C99] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'}`}
          >
            Bike Order List
          </button>
          <button
            onClick={() => setActiveTab('jd')}
            className={`px-3 py-1.5 text-[12px] font-semibold rounded-lg transition-colors cursor-pointer ${activeTab === 'jd' ? 'bg-[#005C99] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'}`}
          >
            Time Controller JD
          </button>
        </div>
      </div>

      {activeTab === 'checklist' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Task 1 */}
            <div className={`p-5 rounded-xl border transition-all ${gb1Signed ? 'bg-[#f0fdf4] border-[#bbf7d0]' : 'bg-[#fef2f2] border-[#fecaca]'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748b]">Day 1 Sign-off</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${gb1Signed ? 'bg-[#15803d] text-white' : 'bg-[#dc2626] text-white'}`}>
                  {gb1Signed ? 'Signed & Verified' : 'Pending Ink'}
                </span>
              </div>
              <h3 className="text-[15px] font-bold text-[#0f172a] mb-1">GB1 MOU Beach Road</h3>
              <p className="text-[12px] text-[#64748b] mb-4">Upload photo or confirm physical signature received from Gordon&apos;s Bay partner.</p>
              
              {signedPhotoName ? (
                <div className="text-[12px] font-medium text-[#15803d] flex items-center gap-1.5 bg-white p-2.5 rounded-lg border border-[#bbf7d0]">
                  <CheckCircle2 className="w-4 h-4 text-[#15803d]" /> {signedPhotoName}
                </div>
              ) : (
                <label className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-white hover:bg-[#f8fafc] text-[#0f172a] text-[12px] font-medium border border-[#cbd5e1] cursor-pointer transition-all shadow-sm">
                  <Upload className="w-4 h-4 text-[#005C99]" /> Upload Signed MOU Photo
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              )}
            </div>

            {/* Task 2 */}
            <div className="p-5 rounded-xl border bg-[#f8fafc] border-[#e2e8f0]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748b]">Day 2-3 Fab</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d97706] text-white">Quote Active</span>
              </div>
              <h3 className="text-[15px] font-bold text-[#0f172a] mb-1">Fabricator Quote Price</h3>
              <p className="text-[12px] text-[#64748b] mb-3">Cabinet &amp; solar rack RFQ response.</p>
              
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-[#334155]">Quote Total (ZAR)</label>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-[#64748b]">R</span>
                  <input 
                    type="number" 
                    value={fabricatorQuote} 
                    onChange={(e) => setFabricatorQuote(Number(e.target.value))}
                    className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-1.5 text-[13px] font-bold text-[#0f172a] focus:outline-none focus:border-[#005C99]" 
                  />
                </div>
              </div>
            </div>

            {/* Task 3 */}
            <div className={`p-5 rounded-xl border transition-all ${insuranceQuoteObtained ? 'bg-[#f0fdf4] border-[#bbf7d0]' : 'bg-[#fffbeb] border-[#fde68a]'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#64748b]">Day 1 Insurance</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${insuranceQuoteObtained ? 'bg-[#15803d] text-white' : 'bg-[#d97706] text-white'}`}>
                  {insuranceQuoteObtained ? 'Secured' : 'Pending Quote'}
                </span>
              </div>
              <h3 className="text-[15px] font-bold text-[#0f172a] mb-1">R5M Liability Policy</h3>
              <p className="text-[12px] text-[#64748b] mb-4">Underwriting check for public liability on e-bike feeder fleet.</p>
              
              <button
                onClick={() => setInsuranceQuoteObtained(!insuranceQuoteObtained)}
                className={`w-full py-2 px-3 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${insuranceQuoteObtained ? 'bg-[#15803d] text-white' : 'bg-white text-[#0f172a] border border-[#cbd5e1] hover:bg-[#f8fafc]'}`}
              >
                {insuranceQuoteObtained ? '✓ R5M Policy Verified' : 'Mark R5M Quote Received'}
              </button>
            </div>
          </div>

          <div className="bg-[#f8fafc] border border-[#e2e8f0] p-6 rounded-xl space-y-4">
            <h3 className="text-[15px] font-bold text-[#0f172a] flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#005C99]" /> RFQ Price Target &amp; Ask Alignment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <label className="text-[12px] font-semibold text-[#334155] block mb-1">Total Project Ask (ZAR)</label>
                <input 
                  type="number" 
                  value={rfqTargetPrice} 
                  onChange={(e) => setRfqTargetPrice(Number(e.target.value))}
                  className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-[14px] font-bold text-[#0f172a] focus:outline-none focus:border-[#005C99]" 
                />
                <p className="text-[11px] text-[#64748b] mt-1">Current baseline: R 1,680,000 (8 hubs, 16mo payback)</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">Variance from Baseline</div>
                <div className={`text-[18px] font-bold ${rfqTargetPrice <= 1680000 ? 'text-[#15803d]' : 'text-[#dc2626]'}`}>
                  {rfqTargetPrice <= 1680000 ? `R ${formatNumber(1680000 - rfqTargetPrice)} Under Budget` : `+R ${formatNumber(rfqTargetPrice - 1680000)} Above Target`}
                </div>
                <div className="text-[11px] text-[#64748b]">Fabricator quote impact: R {formatNumber(fabricatorQuote)} included.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bikeOrder' && (
        <div className="space-y-6 bg-[#f8fafc] p-6 rounded-xl border border-[#e2e8f0]">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
            <div>
              <h3 className="text-[16px] font-bold text-[#0f172a]">Auto-Generated E-Bike &amp; Hardware Order List</h3>
              <p className="text-[12px] text-[#64748b]">Generated based on Gordon&apos;s Bay pilot specifications (5 e-bikes, 1 solar cabinet, 10 batteries).</p>
            </div>
            <button 
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#005C99] text-white text-[12px] font-medium hover:bg-[#004a7c] cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" /> Print Order List
            </button>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl border border-[#e2e8f0]">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#f1f5f9] text-[#475569] font-semibold border-b border-[#e2e8f0]">
                <tr>
                  <th className="p-3">Item Description</th>
                  <th className="p-3">SKU / Spec</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Unit Price (ZAR)</th>
                  <th className="p-3">Total (ZAR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0] text-[#0f172a]">
                <tr>
                  <td className="p-3 font-medium">OpenKM Heavy-Duty Cargo E-Bike</td>
                  <td className="p-3 text-[11px] font-mono text-[#64748b]">OKM-EB-250W-HD</td>
                  <td className="p-3">5</td>
                  <td className="p-3">R 24,000</td>
                  <td className="p-3 font-bold">R 120,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Interchangeable LiFePO4 Batteries</td>
                  <td className="p-3 text-[11px] font-mono text-[#64748b]">OKM-BATT-48V-20AH</td>
                  <td className="p-3">10</td>
                  <td className="p-3">R 6,500</td>
                  <td className="p-3 font-bold">R 65,000</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Solar Charging Cabinet &amp; Smart Racks</td>
                  <td className="p-3 text-[11px] font-mono text-[#64748b]">OKM-CAB-SOLAR-5BAY</td>
                  <td className="p-3">1</td>
                  <td className="p-3 font-bold">R {formatNumber(fabricatorQuote)}</td>
                  <td className="p-3 font-bold">R {formatNumber(fabricatorQuote)}</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">IoT Smart Lock &amp; GPS Telemetry Unit</td>
                  <td className="p-3 text-[11px] font-mono text-[#64748b]">OKM-IOT-GPS-LTE</td>
                  <td className="p-3">5</td>
                  <td className="p-3">R 2,200</td>
                  <td className="p-3 font-bold">R 11,000</td>
                </tr>
              </tbody>
              <tfoot className="bg-[#f8fafc] font-bold text-[#0f172a] border-t border-[#e2e8f0]">
                <tr>
                  <td colSpan={4} className="p-3 text-right">Total Estimated Hardware Cost:</td>
                  <td className="p-3 text-[#005C99]">R {formatNumber(120000 + 65000 + fabricatorQuote + 11000)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'jd' && (
        <div className="space-y-6 bg-[#f8fafc] p-6 rounded-xl border border-[#e2e8f0]">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-4">
            <div>
              <h3 className="text-[16px] font-bold text-[#0f172a]">Time Controller Job Description (JD)</h3>
              <p className="text-[12px] text-[#64748b]">Standard operating role for Gordon&apos;s Bay hub supervision and MyCiTi feeder synchronisation.</p>
            </div>
            <button 
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#005C99] text-white text-[12px] font-medium hover:bg-[#004a7c] cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" /> Print JD
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#e2e8f0] space-y-4 text-[13px] text-[#334155] leading-relaxed">
            <div>
              <h4 className="font-bold text-[#0f172a] text-[15px]">Position: Hub Time Controller &amp; Fleet Supervisor</h4>
              <p className="text-[12px] text-[#64748b]">Location: Gordon&apos;s Bay Beach Road Hub (Station Node GB1)</p>
            </div>

            <div>
              <h5 className="font-bold text-[#0f172a] mb-1">Core Responsibilities:</h5>
              <ul className="list-disc pl-5 space-y-1.5 text-[13px]">
                <li><b>MyCiTi Feeder Synchronization:</b> Ensure e-bike fleet availability aligned with scheduled MyCiTi trunk bus arrivals at Gordon&apos;s Bay station intervals.</li>
                <li><b>Battery Swapping &amp; Charging Management:</b> Monitor solar charging cabinet levels, execute safe battery swaps, and perform daily pre-trip checks (brakes, tires, IoT lock telemetry).</li>
                <li><b>Customer Assistance &amp; Hire Management:</b> Assist commuters with app unlocking, QR code scans, helmet distribution, and Sixty60 courier integration pickups.</li>
                <li><b>Daily Incident &amp; Trip Logging:</b> Record daily ride counts, maintenance requirements, and safety compliance reports via the OpenKM dashboard.</li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-[#0f172a] mb-1">Key Requirements:</h5>
              <ul className="list-disc pl-5 space-y-1.5 text-[13px]">
                <li>Valid PDP (Professional Driving Permit) or cycling fleet operations experience.</li>
                <li>Strong local community ties in Gordon&apos;s Bay / Strand area.</li>
                <li>Basic smartphone proficiency for IoT app telemetry monitoring.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
