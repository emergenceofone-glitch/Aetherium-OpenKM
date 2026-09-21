'use client';

import React, { useState } from 'react';
import { Mail, Copy, CheckCircle2, Factory, Link, ArrowRight, ShieldCheck, Box, Drill, MonitorDown, Wrench } from 'lucide-react';

export default function RFQEmailTemplate() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const el = document.getElementById('rfq-content');
    if (!el) return;
    navigator.clipboard.writeText(el.innerText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#f6f5f1] text-zinc-900 antialiased rounded-2xl overflow-hidden shadow-sm border border-[#cbd5e1] font-sans">
      <div className="w-full border-b border-zinc-200 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-[860px] px-6 md:px-8 h-[52px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1">
              <div className="w-6 h-6 rounded bg-[#3F5B75] text-white flex items-center justify-center">
                <Factory className="w-3.5 h-3.5" />
              </div>
              <div className="w-6 h-6 rounded bg-[#16726E] text-white flex items-center justify-center shadow-[0_0_0_2px_#ffffff]">
                <Mail className="w-3.5 h-3.5" />
              </div>
            </div>
            <span className="font-semibold text-[13px] tracking-tight">Supplier RFQ Generator</span>
          </div>
          <button 
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-bold transition-all ${copied ? 'bg-[#16a34a] text-white' : 'bg-[#1e293b] text-white hover:bg-black'}`}
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied to Clipboard' : 'Copy Email Body'}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[860px] px-4 md:px-8 py-8 md:py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-[#3F5B75]/70 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16726E] animate-pulse"></span> Action Required • W3 Deadline
          </div>
          <h1 className="text-[28px] md:text-[36px] font-extrabold tracking-tight text-[#1e293b] leading-[1.1]">
            DropBox Fabricator RFQ
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-zinc-600 max-w-[600px]">
            Ready-to-send Request for Quotation for the 8 Gordon&apos;s Bay pilot hubs. Contains exact specs for Faraday labyrinth, IP54 charging cabinets, and timber cladding.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
          <div className="px-6 md:px-8 py-5 border-b border-zinc-100 bg-[#f8fafc]">
            <div className="grid grid-cols-[80px_1fr] gap-y-3 text-[13px]">
              <div className="font-semibold text-zinc-400">To:</div>
              <div className="font-medium text-zinc-800">[Fabricator Email Address]</div>
              <div className="font-semibold text-zinc-400">Subject:</div>
              <div className="font-bold text-[#1e293b]">RFQ: 8× e-Bike DropBoxes + IP54 Cabinets (OpenKM Cape Town)</div>
              <div className="font-semibold text-zinc-400">Attach:</div>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-600 text-[11px] font-medium"><Link className="w-3 h-3" /> dropbox_cad_v2.step</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-600 text-[11px] font-medium"><Link className="w-3 h-3" /> electrical_ip54.pdf</span>
              </div>
            </div>
          </div>
          
          <div id="rfq-content" className="px-6 md:px-8 py-8 text-[14px] leading-[1.6] text-zinc-700 font-serif">
            <p className="mb-6">Dear [Name / Sales Team],</p>
            
            <p className="mb-6">
              I am requesting a formal quotation for the fabrication of <b>eight (8) e-bike DropBoxes and integrated charging cabinets</b> for the OpenKM Gordon&apos;s Bay pilot, a community intranet and micro-mobility project.
            </p>

            <h3 className="font-bold text-zinc-900 font-sans tracking-tight mb-3 text-[15px] flex items-center gap-2">
              <Box className="w-4 h-4 text-[#3F5B75]" /> 1. DropBox Core (8 Units)
            </h3>
            <ul className="list-disc pl-5 mb-6 space-y-1.5 marker:text-zinc-400">
              <li><b>Faraday labyrinth design</b>: 86×2mm tube with 90° bend to prevent key fishing.</li>
              <li><b>Material</b>: 2mm mild steel, hot-dip galvanized, powder-coated Cape Blue (RAL 5011).</li>
              <li><b>Sensors</b>: Cut-outs required for internal IR beam + &apos;Last Tap Receiver&apos; RFID mount.</li>
              <li><b>Cladding</b>: Treated pine timber slatted exterior (anti-vandal, aesthetic for Checkers storefronts).</li>
            </ul>

            <h3 className="font-bold text-zinc-900 font-sans tracking-tight mb-3 text-[15px] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#16726E]" /> 2. Charging Cabinet (8 Units)
            </h3>
            <ul className="list-disc pl-5 mb-6 space-y-1.5 marker:text-zinc-400">
              <li><b>Rating</b>: Strict IP54 weatherproofing (will be placed outdoors under eaves).</li>
              <li><b>Capacity</b>: Max 2 e-bike batteries charging concurrently per cabinet.</li>
              <li><b>Safety</b>: Must include integrated smoke + CO₂ detector mounts and auto power-cutoff relay.</li>
              <li><b>Access</b>: Combination lock hatch for Time Controllers.</li>
            </ul>

            <h3 className="font-bold text-zinc-900 font-sans tracking-tight mb-3 text-[15px] flex items-center gap-2">
              <Wrench className="w-4 h-4 text-zinc-500" /> 3. Mounting & Assembly
            </h3>
            <ul className="list-disc pl-5 mb-6 space-y-1.5 marker:text-zinc-400">
              <li>Must mount securely to Checkers trolley bay railing (clamps) or rawlbolt to pavement.</li>
              <li>Include mounting points for 5× MIK HD dock receivers on the side rails.</li>
            </ul>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 text-[13.5px]">
              <p className="font-bold text-amber-900 mb-1 font-sans">Timeline & Budget Context</p>
              <p className="text-amber-800">
                We are operating on a 90-day pilot launch window. Required delivery of first unit for safety sign-off by Week 4, remaining 7 units by Week 6. Our total Equipment Journal capex per station is R154k, and fabrication must fit within a R18,000/hub budget.
              </p>
            </div>

            <p className="mb-2">Please provide a breakdown of:</p>
            <ol className="list-decimal pl-5 mb-6 space-y-1 marker:text-zinc-400">
              <li>Unit cost for DropBox + Cladding.</li>
              <li>Unit cost for IP54 Charging Cabinet.</li>
              <li>Lead time for prototype and production batch.</li>
            </ol>

            <p className="mb-6">Attached are the preliminary STEP files and electrical layout.</p>

            <p>Regards,<br /><br />
            <b>Adrian Moller</b><br />
            Founder, OpenKM<br />
            [Phone Number]<br />
            adrian@openkm.co.za</p>
          </div>
        </div>
      </div>
    </div>
  );
}
