'use client';

import React from 'react';
import { Target, Shield, Clock, FileText, CheckCircle, MapPin } from 'lucide-react';

export default function MOUTemplates() {
  const handleCopy = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    navigator.clipboard.writeText(el.innerText);
    alert('Document text copied to clipboard!');
  };

  return (
    <div className="w-full bg-[#EEF0EB] text-[#1E2A36] antialiased rounded-2xl overflow-hidden shadow-sm border border-[#cbd5e1] font-sans">
      <header className="bg-white/80 backdrop-blur border-b border-[#3F5B75]/10 px-6 md:px-8 h-[64px] flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#3F5B75] flex items-center justify-center text-white font-black tracking-tight text-[13px]">OKM</div>
          <div>
            <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#3F5B75]">OpenKM (Pty) Ltd</div>
            <div className="text-[13px] font-semibold leading-none mt-1 text-[#1A2B3C]">MOU Templates — Ready to Sign</div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-white border border-[#3F5B75]/15 text-[11px] font-medium tracking-wide">2 DOCUMENTS • A4 READY</div>
          <div className="px-2.5 py-1.5 rounded-full bg-[#16726E] text-white text-[11px] font-semibold">CAPE BLUE / ACCENT</div>
        </div>
      </header>

      <div className="px-4 md:px-8 py-8 md:py-10">
        <div className="mb-8 max-w-[800px]">
          <h1 className="text-[26px] md:text-[32px] font-extrabold tracking-tight leading-none text-[#2B3E53]">MOU 1-Pagers — Checkers Hub + City Partnership</h1>
          <p className="mt-3 text-[14px] leading-relaxed text-[#4A5C71]">
            Two execution-ready memorandums. Commercial host agreement for DropBox + charging at Checkers trolley bay, and City resilience partnership for 8 hubs as low-data translator. Both 12-month pilot, signature-ready.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Checkers MOU */}
          <article className="bg-white rounded-[20px] shadow-sm overflow-hidden flex flex-col border border-[#cbd5e1]">
            <div className="h-1.5 w-full bg-[#3F5B75]"></div>
            <div className="px-6 md:px-8 pt-6 pb-4 border-b border-[#EEF0EB]">
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-3">
                  <div className="w-[42px] h-[42px] rounded-xl bg-[#3F5B75] text-white flex items-center justify-center font-black text-[14px]">OKM</div>
                  <div className="leading-tight">
                    <div className="font-bold text-[14px] tracking-tight">OpenKM (Pty) Ltd</div>
                    <div className="text-[11px] text-[#6B7E93] mt-1">Reg No [2024/XXXXXX/07] • VAT [ ]</div>
                    <div className="text-[11px] text-[#6B7E93]">Gordon&apos;s Bay Hub Ops</div>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#16726E]">Commercial Host MOU</div>
                  <div className="text-[12px] font-mono text-[#3F5B75] mt-1">OKM-CHK-GB-001</div>
                </div>
              </div>
            </div>
            
            <div id="checkers-mou" className="px-6 md:px-8 pt-5 pb-6 flex-1 text-[#2E4055]">
              <h2 className="text-[16px] font-bold leading-tight text-[#2B3E53]">
                Memorandum of Understanding — e-Bike Hub Hosting at Checkers <span className="text-[#16726E]">[Branch: Gordon&apos;s Bay]</span>
              </h2>
              <div className="mt-4 h-0.5 w-full bg-gradient-to-r from-[#3F5B75] to-transparent"></div>
              
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F7F8F5] rounded-xl p-4 border border-[#3F5B75]/10">
                  <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#16726E] mb-2">Party A</div>
                  <div className="text-[13px] font-semibold leading-tight">OpenKM (Pty) Ltd</div>
                  <div className="text-[12px] leading-relaxed text-[#4A5C71] mt-1">Represented by Adrian Moller, Founder. Owner of DropBox, charging cabinet, fleet.</div>
                </div>
                <div className="bg-[#F7F8F5] rounded-xl p-4 border border-[#3F5B75]/10">
                  <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#16726E] mb-2">Party B</div>
                  <div className="text-[13px] font-semibold leading-tight">Checkers Sixty60 [Gordon&apos;s Bay]</div>
                  <div className="text-[12px] leading-relaxed text-[#4A5C71] mt-1">Represented by Store Manager. Trolley bay host + Sixty60 fulfilment.</div>
                </div>
              </div>
              <div className="mt-6 space-y-5">
                <div>
                  <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#3F5B75] mb-2">1. Purpose — Appliance-Anchored Node</div>
                  <ul className="text-[12.5px] leading-relaxed space-y-1.5 list-disc pl-4 marker:text-[#16726E]">
                    <li>Host <b>1× DropBox</b> timber-clad + <b>1× charging cabinet IP54</b> max 2 batteries concurrent + <b>5× MIK dock points</b> at Checkers trolley bay [4m²].</li>
                    <li>Use Checkers <b>fridge/freezer as appliance-anchored node</b> for community intranet mesh.</li>
                    <li>24/7 <b>solar LED</b> marker + <b>CCTV shared feed</b>. No customer battery handling.</li>
                  </ul>
                </div>
                
                <div className="flex gap-2 text-[12px] bg-[#3F5B75]/5 border border-[#3F5B75]/10 rounded-xl px-4 py-3">
                  <span className="font-bold text-[#3F5B75] uppercase text-[10px] tracking-widest shrink-0 mt-0.5">Term:</span>
                  <span className="leading-relaxed"><b>12 months pilot</b> renewable on same terms. Either party may terminate with <b>30-day written notice</b>.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#3F5B75] mb-2">2. Responsibilities — Checkers</div>
                    <ul className="text-[12px] leading-relaxed space-y-2">
                      <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-[#16726E] shrink-0 mt-0.5" /> <span>Provide <b>4m²</b> floor space near trolley bay.</span></li>
                      <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-[#16726E] shrink-0 mt-0.5" /> <span>Grounded <b>power socket</b> for cabinet + fridge power for mesh node.</span></li>
                      <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-[#16726E] shrink-0 mt-0.5" /> <span>CCTV oversight + allow Time Controller access <b>06:00–18:00</b>.</span></li>
                    </ul>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#3F5B75] mb-2">3. Responsibilities — OpenKM</div>
                    <ul className="text-[12px] leading-relaxed space-y-2">
                      <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-[#3F5B75] shrink-0 mt-0.5" /> <span>Provide DropBox Faraday + IR + <b>Last Tap Receiver</b>.</span></li>
                      <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-[#3F5B75] shrink-0 mt-0.5" /> <span>Charging cabinet <b>smoke+CO₂</b> auto-cutoff, insurance <b>PL R5M</b>.</span></li>
                      <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-[#3F5B75] shrink-0 mt-0.5" /> <span>Maintain fleet <b>Tannus Cargo 250kg</b>, daily logs.</span></li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-[#16726E]/20 bg-[#16726E]/5 p-4">
                    <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#16726E] mb-1.5">4. Commercials</div>
                    <div className="text-[12px] leading-relaxed">
                      <b>No rent</b> for pilot. <b>Revenue share 5%</b> of hub revenue to Checkers Store Community Fund. Sixty60 delivery cost saving shared.
                    </div>
                  </div>
                  <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                    <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-amber-800 mb-1.5">5. Safety Gate — Non-Negotiable</div>
                    <div className="text-[12px] leading-relaxed text-amber-900/80">
                      • Cabinet <b>max 2 charging</b><br/>
                      • Weight gate <b>150kg max</b><br/>
                      • Daily battery surface check
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-dashed border-[#3F5B75]/20 grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-[#8A99AB] mb-8">Date</div>
                  <div className="border-b border-[#2B3E53] h-px w-full"></div>
                  <div className="mt-1.5 text-[11px] text-[#8A99AB]">[ DD / MM / YYYY ]</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-[#8A99AB] mb-8">Store Manager (Checkers)</div>
                  <div className="border-b border-[#2B3E53] h-px w-full"></div>
                  <div className="mt-1.5 text-[11px] text-[#8A99AB]">Signature / Stamp</div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-[#8A99AB] mb-8">Adrian Moller (OpenKM)</div>
                  <div className="border-b border-[#2B3E53] h-px w-full"></div>
                  <div className="mt-1.5 text-[11px] text-[#8A99AB]">Founder / Signature</div>
                </div>
              </div>
            </div>
            <div className="px-6 md:px-8 py-4 bg-[#F7F8F5] border-t border-[#cbd5e1] flex items-center justify-between">
              <div className="text-[11px] text-[#6B7E93] font-medium">Annex: Insurance Cert PL R5M + Battery Fire SOP</div>
              <button onClick={() => handleCopy('checkers-mou')} className="text-[12px] font-bold text-[#3F5B75] hover:underline cursor-pointer">Copy Text</button>
            </div>
          </article>

          {/* City MOU */}
          <article className="bg-white rounded-[20px] shadow-sm overflow-hidden flex flex-col border border-[#cbd5e1]">
            <div className="h-1.5 w-full bg-[#16726E]"></div>
            <div className="px-6 md:px-8 pt-6 pb-4 border-b border-[#EEF0EB]">
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-3">
                  <div className="w-[42px] h-[42px] rounded-xl bg-[#16726E] text-white flex items-center justify-center font-black text-[14px]">OKM</div>
                  <div className="leading-tight">
                    <div className="font-bold text-[14px] tracking-tight">OpenKM × City of Cape Town</div>
                    <div className="text-[11px] text-[#6B7E93] mt-1">Transport Directorate + Resilience Dept</div>
                    <div className="text-[11px] text-[#6B7E93]">Proposal Ref OKM-CCT-08HUB</div>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#3F5B75]">City Partnership MOU</div>
                  <div className="text-[12px] font-mono text-[#16726E] mt-1">OKM-CCT-PROP-01</div>
                </div>
              </div>
            </div>
            
            <div id="city-mou" className="px-6 md:px-8 pt-5 pb-6 flex-1 text-[#2E4055]">
              <h2 className="text-[16px] font-bold leading-tight text-[#2B3E53]">
                Partnership Proposal — Low-Data Translator for Transport + Decentralized Resilience Intranet
              </h2>
              <div className="mt-4 h-0.5 w-full bg-gradient-to-r from-[#16726E] to-transparent"></div>
              
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F4F8F7] rounded-xl p-4 border border-[#16726E]/10">
                  <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#16726E] mb-2">Party A</div>
                  <div className="text-[13px] font-semibold leading-tight">OpenKM (Pty) Ltd</div>
                  <div className="text-[12px] leading-relaxed text-[#4A5C71] mt-1">Builder-operator of 8 e-bike hubs. Equipment Journal per station R154k capex QR tagged.</div>
                </div>
                <div className="bg-[#F4F8F7] rounded-xl p-4 border border-[#16726E]/10">
                  <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#16726E] mb-2">Party B</div>
                  <div className="text-[13px] font-semibold leading-tight">City of Cape Town</div>
                  <div className="text-[12px] leading-relaxed text-[#4A5C71] mt-1">Transport + Resilience Dept. Permit + fiber gateway + endorsement for BEE funding. No capex.</div>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#16726E] mb-2">1. Purpose — 8 Hubs as City Infrastructure</div>
                  <ul className="text-[12.5px] leading-relaxed space-y-1.5 list-disc pl-4 marker:text-[#3F5B75]">
                    <li>Pilot <b>8 hubs</b> (5 Gordon&apos;s Bay + 3 Constantia) as <b>low-data translator for transport</b>.</li>
                    <li>Bikes as <b>delay-tolerant data mules</b> carrying ledger + patch maps + <b>DFL model weights</b> without ISP — blackout-proof.</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-[#3F5B75]/15 bg-[#F7F8F5] p-4">
                    <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#3F5B75] mb-2">2. City Support Requested</div>
                    <ul className="text-[12px] leading-relaxed space-y-1.5">
                      <li>• <b>Pavement permit</b> for DropBox</li>
                      <li>• Use of <b>side-road patch log</b></li>
                      <li>• Access to <b>City fiber</b> at Checkers</li>
                      <li>• Endorsement letter for <b>BEE funding</b></li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[#16726E]/15 bg-white p-4 shadow-sm">
                    <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#16726E] mb-2">3. OpenKM Commitments</div>
                    <ul className="text-[12px] leading-relaxed space-y-1.5">
                      <li>• <b>Station2Station ledger</b> POPIA compliant</li>
                      <li>• <b>Equipment Journal R154k</b> capex tagged</li>
                      <li>• Monthly report: km saved + <b>CO₂ 500kg/yr</b></li>
                      <li>• TCO <b>R2.87/km</b> vs car R3.50/km</li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-[#16726E]/20 bg-[#16726E]/5 p-4">
                    <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#16726E] mb-2">4. Commercials (No Capex)</div>
                    <div className="text-[12px] leading-relaxed">
                      City receives <b>20% revenue as side-road fund in-kind</b> — patching at <b>R300/m²</b> vs City R500/m². Value uplift captured.
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#3F5B75]/20 bg-[#3F5B75]/5 p-4">
                    <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#3F5B75] mb-2">5. Pilot KPIs</div>
                    <div className="text-[12px] leading-relaxed">
                      Safety: 0 incidents • Asset loss &lt;2% • Rides: &gt;4/day/bike • Mesh uptime: &gt;95%. Scale to 20 hubs if met.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-dashed border-[#16726E]/20 grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-[#8A99AB] mb-8">Date</div>
                  <div className="border-b border-[#2B3E53] h-px w-full"></div>
                  <div className="mt-1.5 text-[11px] text-[#8A99AB]">[ DD / MM / YYYY ]</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-[#8A99AB] mb-8">City of Cape Town</div>
                  <div className="border-b border-[#2B3E53] h-px w-full"></div>
                  <div className="mt-1.5 text-[11px] text-[#8A99AB]">Director Signature</div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-[#8A99AB] mb-8">Adrian Moller (OpenKM)</div>
                  <div className="border-b border-[#2B3E53] h-px w-full"></div>
                  <div className="mt-1.5 text-[11px] text-[#8A99AB]">Founder / Signature</div>
                </div>
              </div>
            </div>
            <div className="px-6 md:px-8 py-4 bg-[#F4F8F7] border-t border-[#cbd5e1] flex items-center justify-between">
              <div className="text-[11px] text-[#6B7E93] font-medium">Annex: Equipment Journal QR • Mesh Uptime • TCO Model</div>
              <button onClick={() => handleCopy('city-mou')} className="text-[12px] font-bold text-[#16726E] hover:underline cursor-pointer">Copy Text</button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
