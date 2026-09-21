'use client';

import React, { useState } from 'react';
import CostCalculator from '@/components/CostCalculator';
import TripTracker from '@/components/TripTracker';
import Sixty60LetterEditor from '@/components/Sixty60LetterEditor';
import HubBudgetEstimator from '@/components/HubBudgetEstimator';
import MyCiTiValueEngine from '@/components/MyCiTiValueEngine';
import PilotGateChecklist from '@/components/PilotGateChecklist';
import HeaderAuthButton from '@/components/HeaderAuthButton';

import ImplementationPlan from '@/components/ImplementationPlan';
import GapAnalysisDashboard from '@/components/GapAnalysisDashboard';
import MOUTemplates from '@/components/MOUTemplates';
import RFQEmailTemplate from '@/components/RFQEmailTemplate';
import OverallAssessment from '@/components/OverallAssessment';
import ProjectROICalculator from '@/components/ProjectROICalculator';
import ProjectTimeline from '@/components/ProjectTimeline';
import Day1ExecutionTracker from '@/components/Day1ExecutionTracker';
import ActivateSA from '@/components/ActivateSA';
import OrganizationalModel from '@/components/OrganizationalModel';
import MetaOneCore from '@/components/MetaOneCore';
import GlobalBlueprint from '@/components/GlobalBlueprint';

import { Menu, X } from 'lucide-react';

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('meta-one-core');

  const tabs = [
    { id: 'meta-one-core', name: '01. MetaOneCore' },
    { id: 'global-blueprint', name: '02. Global Blueprint' },
    { id: 'activate-sa', name: '03. Activate SA AI' },
    { id: 'org-model', name: '04. Org Alignment' },
    { id: '07-assessment', name: '05. Assessment' },
    { id: '05-gap', name: '06. Gap Analysis' },
    { id: '06-implementation', name: '07. Implementation' },
    { id: '01-safety', name: '08. Safety Gates' },
    { id: '02-operations', name: '09. Operations' },
    { id: '03-bom', name: '10. BOM / Capex' },
    { id: 'roi', name: '11. Project ROI' },
    { id: 'timeline', name: '12. Timeline' },
    { id: 'day1', name: '13. Day 1 Tracker' },
    { id: '08-mous', name: '14. MOUs' },
    { id: '09-rfq', name: '15. RFQ' },
    { id: '04-checkers', name: '16. Checkers Pitch' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-[#005C99]/20">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e2e8f0] print:hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[64px]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#005C99] text-white flex items-center justify-center font-bold text-[13px]">
                OKM
              </div>
              <div className="hidden sm:block text-[15px] font-bold text-[#111827] tracking-tight">
                OpenKM <span className="text-[#64748b] font-normal">Cape Town</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4 overflow-x-auto flex-1 justify-center px-4">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-[12px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id ? 'text-[#005C99] border-b-2 border-[#005C99] py-5' : 'text-[#64748b] hover:text-[#111827] py-5 border-b-2 border-transparent'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <HeaderAuthButton />
              <button
                className="lg:hidden p-2 text-[#64748b] cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#e2e8f0] bg-white p-4 space-y-2 max-h-[70vh] overflow-y-auto">
             {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-3 text-[13px] font-semibold rounded-lg cursor-pointer ${
                    activeTab === tab.id ? 'bg-[#f1f5f9] text-[#005C99]' : 'text-[#64748b]'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
          </div>
        )}
      </header>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {activeTab === 'meta-one-core' && (
          <section id="sec-meta-one-core" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <MetaOneCore onNavigateTab={(tabId) => setActiveTab(tabId)} />
          </section>
        )}

        {activeTab === 'global-blueprint' && (
          <section id="sec-global-blueprint" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <GlobalBlueprint onNavigateTab={(tabId) => setActiveTab(tabId)} />
          </section>
        )}

        {activeTab === 'activate-sa' && (
          <section id="sec-activate-sa" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ActivateSA />
          </section>
        )}

        {activeTab === 'org-model' && (
          <section id="sec-org-model" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <OrganizationalModel />
          </section>
        )}

        {activeTab === '07-assessment' && (
          <section id="sec-07" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <OverallAssessment />
          </section>
        )}

        {activeTab === '05-gap' && (
          <section id="sec-05" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <GapAnalysisDashboard />
          </section>
        )}

        {activeTab === '06-implementation' && (
          <section id="sec-06" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ImplementationPlan />
          </section>
        )}

        {activeTab === '01-safety' && (
          <section id="sec-01" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PilotGateChecklist />
          </section>
        )}

        {activeTab === '02-operations' && (
          <section id="sec-02" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CostCalculator />
            <TripTracker />
            <MyCiTiValueEngine />
          </section>
        )}

        {activeTab === '03-bom' && (
          <section id="sec-03" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <HubBudgetEstimator />
          </section>
        )}

        {activeTab === 'roi' && (
          <section id="sec-roi" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProjectROICalculator />
          </section>
        )}

        {activeTab === 'timeline' && (
          <section id="sec-timeline" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProjectTimeline />
          </section>
        )}

        {activeTab === 'day1' && (
          <section id="sec-day1" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Day1ExecutionTracker />
          </section>
        )}

        {activeTab === '08-mous' && (
          <section id="sec-08" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <MOUTemplates />
          </section>
        )}

        {activeTab === '09-rfq' && (
          <section id="sec-09" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <RFQEmailTemplate />
          </section>
        )}

        {activeTab === '04-checkers' && (
          <section id="sec-04" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Sixty60LetterEditor />
          </section>
        )}
      </main>
    </div>
  );
}
