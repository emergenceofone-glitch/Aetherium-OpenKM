'use client';

import React, { useState } from 'react';
import { Wrench, Shield, Zap, Check, HelpCircle, TrendingUp, Coins, RotateCcw } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export default function HubBudgetEstimator() {
  const [bikeCount, setBikeCount] = useState<number>(5);
  const [useAirlessTires, setUseAirlessTires] = useState<boolean>(true);
  const [spareBatteryCount, setSpareBatteryCount] = useState<number>(2);
  const [sixty60BayRent, setSixty60BayRent] = useState<number>(2500); // R/month for 2 anchor bays
  const [sharedSecurityCost, setSharedSecurityCost] = useState<number>(6000); // R/month shared
  const [dailyTripsPerBike, setDailyTripsPerBike] = useState<number>(8); // feeder trips/day

  // Cost estimates (ZAR)
  const bikeUnitCost = 14500; // per 250W 20" cargo e-bike
  const airlessTireCostPerBike = useAirlessTires ? 2400 : 0; // Tannus solid 20x2.0 pair
  const spareBatteryCost = 4800; // per 48V 14Ah pack
  const rackCabinetSecurityCost = 22000; // rack, lock cabinet with fire cutoff, CCTV, solar flood, signage, toolboard

  const totalBikeCapex = bikeCount * (bikeUnitCost + airlessTireCostPerBike);
  const totalBatteryCapex = spareBatteryCount * spareBatteryCost;
  const totalCapex = totalBikeCapex + totalBatteryCapex + rackCabinetSecurityCost;

  // Monthly financials
  const monthlyRentalRevenue = sixty60BayRent; // Sixty60 rental for 2 dedicated charging bays
  const monthlyMaintenanceOpex = bikeCount * (useAirlessTires ? 350 : 850); // Airless cuts puncture tube repairs by ~60%
  const monthlySharedStaffingOpex = sharedSecurityCost;
  const monthlyTotalOpex = monthlySharedStaffingOpex + monthlyMaintenanceOpex;
  const netMonthlyCashflowBeforeFares = monthlyRentalRevenue - monthlyTotalOpex;

  // Feeder Fare Contribution (Estimated 2.3km @ R4.95 average)
  const monthlyFeederTrips = bikeCount * dailyTripsPerBike * 30;
  const monthlyFeederFareVolume = monthlyFeederTrips * 4.95;

  return (
    <div className="rounded-[16px] border border-[#e5e7eb] bg-white p-5 md:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f1f5f9] pb-4 mb-5">
        <div>
          <h3 className="text-[15px] font-bold text-[#111827] flex items-center gap-2">
            <Coins className="w-4 h-4 text-[#005C99]" /> Interactive Hub BOM & Pilot Capex Estimator
          </h3>
          <p className="text-[12px] text-[#64748b]">
            Financial model with Checkers Sixty60 anchor tenancy and zero-puncture airless savings
          </p>
        </div>
        <button
          onClick={() => {
            setBikeCount(5);
            setUseAirlessTires(true);
            setSpareBatteryCount(2);
            setSixty60BayRent(2500);
            setSharedSecurityCost(6000);
            setDailyTripsPerBike(8);
          }}
          className="inline-flex items-center gap-1 text-[11px] font-mono text-[#64748b] hover:text-[#005C99] px-2 py-1 rounded bg-[#f8fafc] border border-[#e2e8f0]"
        >
          <RotateCcw className="w-3 h-3" /> Reset Pilot Preset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Controls */}
        <div className="lg:col-span-6 space-y-4">
          {/* E-Bike Fleet Size */}
          <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[12px] font-semibold text-[#1f2937]">Commuter Fleet Size (250W Cargo)</span>
              <span className="font-mono font-bold text-[13px] text-[#005C99] bg-white px-2 py-0.5 rounded border border-[#bfdbfe]">
                {bikeCount} E-Bikes
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="1"
              value={bikeCount}
              onChange={(e) => setBikeCount(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#005C99]"
            />
            <div className="flex justify-between text-[9px] font-mono text-[#94a3b8] mt-1">
              <span>Pilot Baseline: 5 bikes</span>
              <span>Max Capacity for 1 Bay: 15 bikes</span>
            </div>
          </div>

          {/* Tannus Airless Toggle */}
          <div className="bg-[#f0fdfa] p-3.5 rounded-xl border border-[#99f6e0] flex items-center justify-between">
            <div>
              <div className="text-[12px] font-bold text-[#0f766e]">Tannus Airless 20×2.0 Solid Tires</div>
              <div className="text-[11px] text-[#134e4a]">100% puncture proof. Zero tube tools on shadow board.</div>
            </div>
            <button
              type="button"
              onClick={() => setUseAirlessTires(!useAirlessTires)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all ${
                useAirlessTires
                  ? 'bg-[#0f766e] text-white shadow-sm'
                  : 'bg-white border border-[#cbd5e1] text-[#64748b]'
              }`}
            >
              {useAirlessTires ? 'ENABLED (Zero Punctures)' : 'Standard Tubes'}
            </button>
          </div>

          {/* Spare Battery Packs */}
          <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[12px] font-semibold text-[#1f2937]">Hot-Swap Spare Battery Packs (48V 14Ah)</span>
              <span className="font-mono font-bold text-[13px] text-[#b45309] bg-white px-2 py-0.5 rounded border border-[#fde68a]">
                {spareBatteryCount} Packs
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              step="1"
              value={spareBatteryCount}
              onChange={(e) => setSpareBatteryCount(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#b45309]"
            />
          </div>

          {/* Sixty60 Anchor Tenant Bay Rent */}
          <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[12px] font-semibold text-[#1f2937]">Checkers Sixty60 Bay Sublease (2 bays)</span>
              <span className="font-mono font-bold text-[13px] text-[#10b981] bg-white px-2 py-0.5 rounded border border-[#a7f3d0]">
                R {formatNumber(sixty60BayRent)} / mo
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="5000"
              step="250"
              value={sixty60BayRent}
              onChange={(e) => setSixty60BayRent(parseInt(e.target.value))}
              className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#10b981]"
            />
          </div>
        </div>

        {/* Financial Summary & Breakdown */}
        <div className="lg:col-span-6 space-y-4">
          {/* Total Capex Card */}
          <div className="rounded-xl bg-[#0b1220] text-white p-5 border border-[#1e293b]">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#93c5fd]">
                  Total Initial Pilot Capex
                </div>
                <div className="text-[32px] font-black text-white font-mono mt-1">
                  ZAR {formatNumber(totalCapex)}
                </div>
              </div>
              <span className="text-[10px] font-mono bg-[#111a2e] text-[#38bdf8] border border-[#1e293b] px-2 py-1 rounded">
                1 Pilot Hub (Lean Re-use)
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1e293b] space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between text-[#94a3b8]">
                <span>E-Bikes + Tires ({bikeCount} units):</span>
                <span className="text-white">R {formatNumber(totalBikeCapex)}</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>Spare Hot-Swap Batteries ({spareBatteryCount} packs):</span>
                <span className="text-white">R {formatNumber(totalBatteryCapex)}</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>8-Bay Rack, Lock Cabinet, 4G CCTV & Signs:</span>
                <span className="text-white">R {formatNumber(rackCabinetSecurityCost)}</span>
              </div>
            </div>
          </div>

          {/* Monthly Operational Metrics */}
          <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wide text-[#475569] font-bold">
              Monthly Operational Economics
            </div>

            <div className="grid grid-cols-2 gap-3 text-[12px]">
              <div className="bg-white p-3 rounded-lg border border-[#e2e8f0]">
                <div className="text-[10px] font-mono text-[#64748b]">Anchor Sublease Income</div>
                <div className="font-bold text-[#10b981] font-mono text-[14px]">
                  +R {formatNumber(monthlyRentalRevenue)} / mo
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#e2e8f0]">
                <div className="text-[10px] font-mono text-[#64748b]">Shared Staff & Maint. Opex</div>
                <div className="font-bold text-[#dc2626] font-mono text-[14px]">
                  -R {formatNumber(monthlyTotalOpex)} / mo
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e2e8f0] flex justify-between items-center text-[12px]">
              <span className="text-[#475569]">Est. Monthly Feeder Volume:</span>
              <span className="font-mono font-bold text-[#005C99]">
                {formatNumber(monthlyFeederTrips)} trips (~R {formatNumber(monthlyFeederFareVolume)})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
