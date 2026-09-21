'use client';

import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, AlertCircle, ArrowRight, Shield, Wrench, FileText, Check } from 'lucide-react';

export default function ProjectTimeline() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'inprogress' | 'upcoming'>('all');

  const milestones = [
    {
      phase: 'Phase 0',
      title: 'Bankable Pack & Pitch v5',
      timing: 'Completed (Day 0)',
      status: 'completed',
      desc: 'Finalized 17-slide pitch, 8-hub financial model (R1.68M Ask, 16mo payback), and pre-filled MOU templates.',
      deliverables: ['Pitch v5 Deck', 'Excel Financial Model', 'Checkers & City MOU templates']
    },
    {
      phase: 'Phase 1',
      title: 'GB1 MOU Sign-off & Insurance',
      timing: 'Day 1 - Day 2',
      status: 'inprogress',
      desc: 'Obtaining physical ink signature on Gordon\'s Bay Beach Road MOU and securing R5M liability insurance quotation.',
      deliverables: ['Signed GB1 MOU photo', 'R5M Liability Policy quote', 'Time Controller JD published']
    },
    {
      phase: 'Phase 2',
      title: 'Fabrication & RFQ Award',
      timing: 'Day 3 - Day 7',
      status: 'inprogress',
      desc: 'Reviewing RFQ submissions from cabinet and rack fabricators (Deadline 22 Aug). Issuing bike order list.',
      deliverables: ['Fabricator quote selection', 'Bike & battery order confirmed', 'DropBox & Cabinet site prep']
    },
    {
      phase: 'Phase 3',
      title: 'Hub Installation & Hardware Delivery',
      timing: 'Week 2 - Week 3',
      status: 'upcoming',
      desc: 'Physical deployment of secure cabinet, solar/grid charging racks, IoT telemetry locks, and initial e-bike fleet.',
      deliverables: ['GB1 Beach Road Hub active', 'NFC & App unlock testing', 'Staff onboarding & safety briefing']
    },
    {
      phase: 'Phase 4',
      title: 'Pilot Launch & Feeder Integration',
      timing: 'Month 1',
      status: 'upcoming',
      desc: 'Official launch of Gordon\'s Bay MyCiTi feeder service. Live ride tracking, Sixty60 synergy pilots, and daily metrics logging.',
      deliverables: ['First 500 paid rides', 'Time Controller operational review', 'Customer feedback loop']
    },
    {
      phase: 'Phase 5',
      title: 'Expansion to 8 Hubs (City-Wide Scale)',
      timing: 'Month 3 - Month 6',
      status: 'upcoming',
      desc: 'Rollout across remaining 7 nodes in the municipal metro network using validated Gordon\'s Bay pilot revenue metrics.',
      deliverables: ['8 Hub network active', 'R1.68M investment deployed', 'Full break-even (0.73 rides/bike)']
    }
  ];

  const filteredMilestones = milestones.filter(m => {
    if (activeFilter === 'all') return true;
    return m.status === activeFilter;
  });

  return (
    <div className="w-full bg-white text-[#0f172a] font-sans rounded-2xl overflow-hidden shadow-sm border border-[#e2e8f0] p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f1f5f9] pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#005C99]/10 text-[#005C99] text-[11px] font-bold tracking-wide uppercase">Deployment Roadmap</span>
            <span className="text-[11px] text-[#64748b]">Gordon&apos;s Bay &amp; Metro Scale</span>
          </div>
          <h2 className="text-[24px] md:text-[28px] font-bold tracking-tight text-[#0f172a]">Project Timeline & Milestone Tracker</h2>
          <p className="text-[13px] text-[#64748b] mt-1">
            End-to-end execution schedule from bankable pack completion to city-wide 8-hub scale.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-[#f8fafc] p-1.5 rounded-xl border border-[#e2e8f0]">
          {(['all', 'completed', 'inprogress', 'upcoming'] as const).map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 text-[12px] font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                activeFilter === f ? 'bg-[#005C99] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              {f === 'inprogress' ? 'In Progress' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="relative pl-6 md:pl-8 border-l-2 border-[#e2e8f0] space-y-10 my-4">
        {filteredMilestones.map((m, idx) => {
          const isCompleted = m.status === 'completed';
          const isInProgress = m.status === 'inprogress';
          
          return (
            <div key={idx} className="relative group">
              {/* Timeline marker dot */}
              <div className={`absolute -left-[31px] md:-left-[39px] top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                isCompleted ? 'bg-[#15803d] border-[#15803d] text-white' :
                isInProgress ? 'bg-[#d97706] border-[#d97706] text-white animate-pulse' :
                'bg-white border-[#cbd5e1] text-[#94a3b8]'
              }`}>
                {isCompleted ? <Check className="w-3.5 h-3.5" /> :
                 isInProgress ? <Clock className="w-3.5 h-3.5" /> :
                 <span className="w-2 h-2 rounded-full bg-[#cbd5e1]" />}
              </div>

              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5 hover:border-[#005C99]/40 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-mono font-bold text-[#005C99]">{m.phase}</span>
                    <span className="text-[12px] text-[#64748b]">•</span>
                    <span className="text-[12px] font-medium text-[#64748b]">{m.timing}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    isCompleted ? 'bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0]' :
                    isInProgress ? 'bg-[#fef3c7] text-[#d97706] border border-[#fde68a]' :
                    'bg-[#f1f5f9] text-[#64748b] border border-[#e2e8f0]'
                  }`}>
                    {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Upcoming'}
                  </span>
                </div>

                <h3 className="text-[16px] font-bold text-[#0f172a] mb-2">{m.title}</h3>
                <p className="text-[13px] text-[#64748b] leading-relaxed mb-4">{m.desc}</p>

                <div className="border-t border-[#e2e8f0] pt-3 flex flex-wrap gap-2">
                  {m.deliverables.map((del, dIdx) => (
                    <span key={dIdx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#e2e8f0] text-[11px] font-medium text-[#334155]">
                      <CheckCircle2 className="w-3 h-3 text-[#005C99]" /> {del}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
