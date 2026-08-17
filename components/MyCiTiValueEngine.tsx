'use client';

import React, { useState } from 'react';
import { TrendingUp, Bus, Shield, Check, AlertCircle, ArrowUpRight, RotateCcw } from 'lucide-react';

export default function MyCiTiValueEngine() {
  const [baselineDailyTaps, setBaselineDailyTaps] = useState<number>(1420); // station taps before pilot
  const [upliftPercent, setUpliftPercent] = useState<number>(6.5); // % tap increase from feeder catchment
  const [avgMyCiTiFare, setAvgMyCiTiFare] = useState<number>(14.50); // ZAR average trunk fare
  const [monthlyHubSubsidy, setMonthlyHubSubsidy] = useState<number>(3500); // Municipal subsidy after Sixty60 rent

  const dailyBaselineTaps = baselineDailyTaps;
  const newDailyTaps = Math.round(dailyBaselineTaps * (1 + upliftPercent / 100));
  const dailyNewTaps = newDailyTaps - dailyBaselineTaps;
  const monthlyNewTaps = dailyNewTaps * 30;

  const monthlyUpliftRevenue = monthlyNewTaps * avgMyCiTiFare;
  const monthlyProtectiveValue = monthlyUpliftRevenue - monthlyHubSubsidy;
  const annualProtectiveValue = monthlyProtectiveValue * 12;
  const isViable = monthlyProtectiveValue > 0;

  return (
    <div className="rounded-[16px] border border-[#e5e7eb] bg-white p-5 md:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f1f5f9] pb-4 mb-5">
        <div>
          <h3 className="text-[15px] font-bold text-[#111827] flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#005C99]" /> MyCiTi Trunk Protection & Value Calculator
          </h3>
          <p className="text-[12px] text-[#64748b]">
            Equation: protective_value = (new_taps - baseline_taps) * avg_fare - hub_subsidy
          </p>
        </div>
        <button
          onClick={() => {
            setBaselineDailyTaps(1420);
            setUpliftPercent(6.5);
            setAvgMyCiTiFare(14.50);
            setMonthlyHubSubsidy(3500);
          }}
          className="inline-flex items-center gap-1 text-[11px] font-mono text-[#64748b] hover:text-[#005C99] px-2 py-1 rounded bg-[#f8fafc] border border-[#e2e8f0]"
        >
          <RotateCcw className="w-3 h-3" /> Default Station Model
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[12px] font-semibold text-[#1f2937]">Baseline Daily Station Tap-Ons</span>
              <span className="font-mono font-bold text-[13px] text-[#005C99] bg-white px-2 py-0.5 rounded border border-[#bfdbfe]">
                {baselineDailyTaps.toLocaleString()} taps / day
              </span>
            </div>
            <input
              type="range"
              min="300"
              max="5000"
              step="50"
              value={baselineDailyTaps}
              onChange={(e) => setBaselineDailyTaps(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#005C99]"
            />
            <div className="flex justify-between text-[9px] font-mono text-[#94a3b8] mt-1">
              <span>Feeder stop (300)</span>
              <span>Kuyasa Hub (1,420)</span>
              <span>Major Terminal (5,000)</span>
            </div>
          </div>

          <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[12px] font-semibold text-[#1f2937]">Feeder Catchment Tap Uplift</span>
              <span className="font-mono font-bold text-[13px] text-[#10b981] bg-white px-2 py-0.5 rounded border border-[#a7f3d0]">
                +{upliftPercent.toFixed(1)}% ({dailyNewTaps} new taps/day)
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="20.0"
              step="0.5"
              value={upliftPercent}
              onChange={(e) => setUpliftPercent(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#10b981]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-semibold text-[#334155]">Average Trunk Fare</span>
                <span className="font-mono text-[12px] font-bold text-[#005C99]">R {avgMyCiTiFare.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="8.00"
                max="25.00"
                step="0.50"
                value={avgMyCiTiFare}
                onChange={(e) => setAvgMyCiTiFare(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#005C99]"
              />
            </div>

            <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-semibold text-[#334155]">Net Hub Subsidy</span>
                <span className="font-mono text-[12px] font-bold text-[#b45309]">R {monthlyHubSubsidy.toLocaleString()}/mo</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={monthlyHubSubsidy}
                onChange={(e) => setMonthlyHubSubsidy(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#b45309]"
              />
            </div>
          </div>
        </div>

        {/* Value Dashboard */}
        <div className="lg:col-span-6 space-y-4">
          <div className={`rounded-xl p-5 border text-white ${isViable ? 'bg-[#0b1220] border-[#1e293b]' : 'bg-[#450a0a] border-[#7f1d1d]'}`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#93c5fd]">
                  Net Monthly Protective Value
                </div>
                <div className="text-[32px] font-black text-white font-mono mt-1">
                  ZAR {Math.round(monthlyProtectiveValue).toLocaleString()} <span className="text-[13px] font-normal text-[#94a3b8]">/ month</span>
                </div>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-1 rounded border uppercase font-bold ${
                  isViable
                    ? 'bg-[#064e3b] text-[#6ee7b7] border-[#047857]'
                    : 'bg-[#7f1d1d] text-[#fca5a5] border-[#991b1b]'
                }`}
              >
                {isViable ? '✓ GREEN LIGHT FOR HUB 2' : '! SUBSIDY DEFICIT'}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between text-[#94a3b8]">
                <span>New Monthly Tap-On Volume:</span>
                <span className="text-white">+{monthlyNewTaps.toLocaleString()} taps</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>Gross Additional Fare Revenue:</span>
                <span className="text-[#34d399] font-bold">+R {Math.round(monthlyUpliftRevenue).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>Net Municipal Hub Cost Subsidy:</span>
                <span className="text-[#f87171]">-R {monthlyHubSubsidy.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#94a3b8] pt-1 border-t border-white/10">
                <span>Annualized Value Contribution:</span>
                <span className="text-[#93c5fd] font-bold">R {Math.round(annualProtectiveValue).toLocaleString()} / year</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f0fdfa] rounded-xl border border-[#99f6e0] p-4 text-[12px] leading-[1.6]">
            <div className="font-mono text-[11px] uppercase font-bold text-[#0f766e] mb-1">
              Feeder Protection Insight
            </div>
            <p className="text-[#134e4a]">
              Because the e-bike hub bridges the dangerous 2–3km walking gap to the MyCiTi station, it converts lost private jitney trips into high-capacity MyCiTi trunk passengers. The hub pays for itself in additional farebox capture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
