'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, ShieldCheck } from 'lucide-react';

interface GateItem {
  id: string;
  title: string;
  target: string;
  current: string;
  status: 'passed' | 'in_progress' | 'pending';
  why: string;
}

const INITIAL_GATES: GateItem[] = [
  {
    id: 'g-1',
    title: 'Zero Punctures Downtime',
    target: '0 punctures over 30 days',
    current: '0 logged across 5 bikes (100% solid airless)',
    status: 'passed',
    why: 'Tannus Airless 20×2.0 installed. Shadow board has 0 tube tools.'
  },
  {
    id: 'g-2',
    title: 'Bike Fleet Circulation',
    target: '> 90% available hours in motion',
    current: '92.4% average weekday circulation',
    status: 'passed',
    why: 'Shared Sixty60 daytime charging + commuter peak turnover.'
  },
  {
    id: 'g-3',
    title: 'MyCiTi Feeder Uplift',
    target: 'Measurable tap-on increase (>4%) at paired station',
    current: '+6.5% vs 14-day pre-pilot baseline',
    status: 'passed',
    why: 'Direct feeder catchment capture within 500m of trunk rank.'
  },
  {
    id: 'g-4',
    title: 'Checkers Sixty60 Uptime & Theft',
    target: 'Zero battery theft incidents; <18 min battery turnaround',
    current: '0 incidents, 14 min avg swap cycle',
    status: 'passed',
    why: 'Locked steel cabinet with thermal cutoff and 4G CCTV.'
  },
  {
    id: 'g-5',
    title: 'Side-Road Rejuvenation Fund',
    target: 'First 50m of potholes patched from shared savings',
    current: '62m patched & GPS logged on municipal portal',
    status: 'passed',
    why: 'Local community visibility and municipal co-benefit.'
  }
];

export default function PilotGateChecklist() {
  const [gates, setGates] = useState<GateItem[]>(INITIAL_GATES);

  const toggleStatus = (id: string) => {
    setGates((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const nextStatus = g.status === 'passed' ? 'in_progress' : g.status === 'in_progress' ? 'pending' : 'passed';
        return { ...g, status: nextStatus };
      })
    );
  };

  const passedCount = gates.filter((g) => g.status === 'passed').length;

  return (
    <div className="rounded-[16px] border border-[#e5e7eb] bg-white p-5 md:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f1f5f9] pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0f766e]" />
            <h3 className="text-[15px] font-bold text-[#111827]">Pilot Gate & Go/No-Go Evaluation (MVP)</h3>
          </div>
          <p className="text-[12px] text-[#64748b]">
            Strict criteria required to unlock rollout to Hubs 2 & 3
          </p>
        </div>
        <div className="font-mono text-[11px] bg-[#f0fdfa] text-[#0f766e] px-2.5 py-1 rounded-full border border-[#99f6e0] font-bold">
          {passedCount}/{gates.length} CRITERIA PASSED
        </div>
      </div>

      <div className="space-y-3">
        {gates.map((g) => (
          <div
            key={g.id}
            onClick={() => toggleStatus(g.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer select-none ${
              g.status === 'passed'
                ? 'bg-[#f0fdfa] border-[#ccfbf1]'
                : g.status === 'in_progress'
                ? 'bg-[#fffbeb] border-[#fde68a]'
                : 'bg-[#f8fafc] border-[#e2e8f0]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {g.status === 'passed' ? (
                    <CheckCircle2 className="w-5 h-5 text-[#0f766e] fill-[#ccfbf1]" />
                  ) : g.status === 'in_progress' ? (
                    <Circle className="w-5 h-5 text-[#b45309] fill-[#fef3c7]" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#94a3b8]" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-[#111827]">{g.title}</span>
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                        g.status === 'passed'
                          ? 'bg-[#0f766e] text-white'
                          : g.status === 'in_progress'
                          ? 'bg-[#b45309] text-white'
                          : 'bg-[#64748b] text-white'
                      }`}
                    >
                      {g.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#334155] mt-1">
                    <span className="font-semibold text-[#005C99]">Target:</span> {g.target}
                  </div>
                  <div className="text-[11px] text-[#64748b] mt-0.5">
                    <span className="font-semibold">Observation:</span> {g.current}
                  </div>
                  <div className="text-[11px] text-[#0f766e] font-mono mt-1 bg-white/60 px-2 py-0.5 rounded inline-block">
                    {g.why}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
