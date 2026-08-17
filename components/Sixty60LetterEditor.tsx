'use client';

import React, { useState } from 'react';
import { Copy, Check, FileText, Download, Edit3, Send } from 'lucide-react';

export default function Sixty60LetterEditor() {
  const [hubLocation, setHubLocation] = useState<string>('Kuyasa MyCiTi Feeder / Makhaza Taxi Rank Side-Road');
  const [senderName, setSenderName] = useState<string>('OpenKM Mobility Working Group');
  const [senderPhone, setSenderPhone] = useState<string>('+27 (0)21 400 1111');
  const [pilotStartDate, setPilotStartDate] = useState<string>('1st April 2025');
  const [bayRentAmount, setBayRentAmount] = useState<string>('2,500');
  const [copied, setCopied] = useState<boolean>(false);

  const letterText = `Dear Sixty60 Regional Operations Manager,

We propose 1 pilot dual-use hub at ${hubLocation} where your riders get secure charging, hot battery swap, and safe lock-up between drops — reducing theft and battery damage vs. street parking.

In return, your existing maintenance presence keeps 5 commuter e-bikes operational for MyCiTi + taxi feeder trips. The City gets a staffed hub without bearing full cost. Commuters get reliable 2-3km transport that feeds trunk services.

Shared win breakdown:
• Airless tires = zero puncture downtime. Tannus 20×2.0 solid. No tubes, no roadside fixes, no delivery delays.
• Secure bays: 2 bays rented to Sixty60 (proposed R${bayRentAmount}/month), 6 bays for commuters. Shared CCTV + solar light + locked charging cabinet with fire cutoff.
• Shared savings: Reduced theft + battery damage funds side-road rejuvenation (patching meters logged openly).
• Open km tracking stays open source and anonymous. No customer data shared. Only aggregate km delivered.

Ask: 1 month pilot starting ${pilotStartDate}, 2 bays rented, shared security (your existing shift), data sharing on km delivered (aggregate only, no PII). We provide bikes, rack, cabinet, signage, and airless tires.

Success = your riders save ~12-18 min per charge cycle, commuter bikes circulate >90%, and MyCiTi sees measurable fare uplift from the hub catchment.

Win for City, Checkers, commuters, and MyCiTi additional revenue — with open infrastructure that anyone can replicate.

Sincerely,

${senderName}
OpenKM Cape Town • MIT Licensed
Contact: ${senderPhone}
Date: ${new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="rounded-[16px] border border-[#e5e7eb] bg-[#fcfcf9] overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="px-5 md:px-8 py-5 border-b bg-white flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#005C99]/10 text-[#005C99] flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-[#111827]">Partnership Letter Generator</h4>
            <p className="text-[11px] text-[#64748b]">Checkers Sixty60 Regional Operations Proposal</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#005C99] text-white text-[12px] font-medium hover:bg-[#004877] transition-all shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied to Clipboard' : 'Copy Full Letter'}
          </button>
        </div>
      </div>

      {/* Editable Fields in Accordion/Grid */}
      <div className="px-5 md:px-8 py-4 bg-[#f8fafc] border-b grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
        <div>
          <label className="block font-mono text-[#64748b] uppercase mb-1">Hub Location</label>
          <input
            type="text"
            value={hubLocation}
            onChange={(e) => setHubLocation(e.target.value)}
            className="w-full bg-white border border-[#cbd5e1] rounded px-2 py-1 text-[#111827] text-[12px]"
          />
        </div>
        <div>
          <label className="block font-mono text-[#64748b] uppercase mb-1">Sender Name / Group</label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full bg-white border border-[#cbd5e1] rounded px-2 py-1 text-[#111827] text-[12px]"
          />
        </div>
        <div>
          <label className="block font-mono text-[#64748b] uppercase mb-1">Contact Phone</label>
          <input
            type="text"
            value={senderPhone}
            onChange={(e) => setSenderPhone(e.target.value)}
            className="w-full bg-white border border-[#cbd5e1] rounded px-2 py-1 text-[#111827] text-[12px]"
          />
        </div>
        <div>
          <label className="block font-mono text-[#64748b] uppercase mb-1">Bay Rent (ZAR/mo)</label>
          <input
            type="text"
            value={bayRentAmount}
            onChange={(e) => setBayRentAmount(e.target.value)}
            className="w-full bg-white border border-[#cbd5e1] rounded px-2 py-1 text-[#111827] text-[12px]"
          />
        </div>
      </div>

      {/* Letter Preview */}
      <div className="px-6 md:px-8 py-6 text-[14px] leading-[1.8] text-[#1f2937] space-y-4">
        <p className="font-semibold text-[#334155]">Dear Sixty60 Regional Operations Manager,</p>

        <p>
          We propose <span className="font-semibold bg-[#fef3c7] px-1.5 py-0.5 rounded">1 pilot dual-use hub at {hubLocation}</span> where your riders get secure charging, hot battery swap, and safe lock-up between drops — reducing theft and battery damage vs. street parking.
        </p>

        <p>
          In return, your existing maintenance presence keeps 5 commuter e-bikes operational for MyCiTi + taxi feeder trips. The City gets a staffed hub without bearing full cost. Commuters get reliable 2-3km transport that feeds trunk services.
        </p>

        <div className="rounded-[12px] bg-white border border-[#e2e8f0] p-4 my-3 shadow-xs">
          <div className="font-mono text-[11px] uppercase tracking-wide text-[#005C99] font-bold mb-2">
            Shared Win Breakdown
          </div>
          <ul className="list-disc pl-5 space-y-1.5 text-[13px] text-[#334155]">
            <li>
              <b>Airless tires = zero puncture downtime:</b> Tannus 20×2.0 solid. No tubes, no roadside fixes, no delivery delays.
            </li>
            <li>
              <b>Secure bays:</b> 2 bays rented to Sixty60 (proposed R{bayRentAmount}/month), 6 bays for commuters. Shared CCTV + solar light + locked charging cabinet with fire cutoff.
            </li>
            <li>
              <b>Shared savings fund:</b> Reduced theft and battery damage funds local side-road rejuvenation (patching meters logged openly).
            </li>
            <li>
              <b>Open KM tracking:</b> Stays open-source and anonymous. No customer data shared. Only aggregate km delivered.
            </li>
          </ul>
        </div>

        <p>
          <span className="font-semibold text-[#111827]">Ask:</span> 1 month pilot starting {pilotStartDate}, 2 bays rented, shared security (your existing shift), data sharing on km delivered (aggregate only, no PII). We provide bikes, rack, cabinet, signage, and airless tires.
        </p>

        <p>
          Success = your riders save ~12-18 min per charge cycle, commuter bikes circulate &gt;90%, and MyCiTi sees measurable fare uplift from the hub catchment.
        </p>

        <p>
          Win for City, Checkers Sixty60, commuters, and MyCiTi additional revenue — with open infrastructure that anyone can replicate.
        </p>

        <div className="pt-4 mt-3 border-t border-[#e2e8f0]">
          <div className="text-[13px] text-[#64748b]">Sincerely,</div>
          <div className="mt-1 font-bold text-[#111827]">{senderName}</div>
          <div className="font-mono text-[12px] text-[#64748b]">
            OpenKM Cape Town • MIT Licensed • {senderPhone}
          </div>
        </div>
      </div>
    </div>
  );
}
