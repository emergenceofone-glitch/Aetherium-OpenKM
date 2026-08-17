'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Zap, Bike, Bus, Car, Footprints, Info, Sliders, ArrowRight, RotateCcw } from 'lucide-react';

export type TransportMethod = 'e-bike' | 'taxi' | 'myciti' | 'walk';

export interface CostParameters {
  distance_km: number;
  method: TransportMethod;
  current_diesel: number;
  availability: number;
}

export const BASE_RATE = 2.20; // ZAR per km - City baseline
export const BASELINE_DIESEL = 21.50; // ZAR/L - anchor for fuel_index
export const METHOD_FACTORS: Record<TransportMethod, { factor: number; label: string; desc: string; icon: string; color: string }> = {
  'e-bike': { factor: 0.9, label: 'E-Bike (OpenKM Feeder)', desc: '10% protective layer discount', icon: 'bike', color: '#005C99' },
  'taxi': { factor: 1.15, label: 'Minibus Taxi', desc: '15% demand / congestion surcharge', icon: 'car', color: '#f59e0b' },
  'myciti': { factor: 0.75, label: 'MyCiTi Feeder Link', desc: '25% trunk feeder integration incentive', icon: 'bus', color: '#00A6A6' },
  'walk': { factor: 0.0, label: 'Walking (Pedestrian)', desc: 'Always ZAR 0.00 zero-emission baseline', icon: 'footprints', color: '#10b981' }
};

export function calculateCostKm(opts: CostParameters): {
  totalCost: number;
  fuelIndex: number;
  methodFactor: number;
  baseCost: number;
  effectiveRatePerKm: number;
} {
  const fuelIndex = opts.current_diesel / BASELINE_DIESEL;
  const methodFactor = METHOD_FACTORS[opts.method].factor;
  const effectiveRatePerKm = BASE_RATE * methodFactor * fuelIndex * opts.availability;
  const totalCost = Math.round(opts.distance_km * effectiveRatePerKm * 100) / 100;
  const baseCost = Math.round(opts.distance_km * BASE_RATE * 100) / 100;

  return {
    totalCost,
    fuelIndex,
    methodFactor,
    baseCost,
    effectiveRatePerKm
  };
}

export default function CostCalculator() {
  const [distance, setDistance] = useState<number>(2.4);
  const [method, setMethod] = useState<TransportMethod>('e-bike');
  const [currentDiesel, setCurrentDiesel] = useState<number>(23.40);
  const [availability, setAvailability] = useState<number>(1.0);
  const [loadingFuel, setLoadingFuel] = useState<boolean>(false);
  const [fuelSourceInfo, setFuelSourceInfo] = useState<string>('DMRE Weekly Index');

  useEffect(() => {
    async function fetchFuel() {
      try {
        setLoadingFuel(true);
        const res = await fetch('/api/fuel');
        if (res.ok) {
          const data = await res.json();
          if (data.current_diesel) {
            setCurrentDiesel(data.current_diesel);
            setFuelSourceInfo(data.source || 'Live DMRE API');
          }
        }
      } catch {
        // Fallback to default
      } finally {
        setLoadingFuel(false);
      }
    }
    fetchFuel();
  }, []);

  const result = calculateCostKm({
    distance_km: distance,
    method,
    current_diesel: currentDiesel,
    availability
  });

  const comparison = (['e-bike', 'taxi', 'myciti', 'walk'] as TransportMethod[]).map((m) => {
    const res = calculateCostKm({
      distance_km: distance,
      method: m,
      current_diesel: currentDiesel,
      availability
    });
    return {
      method: m,
      meta: METHOD_FACTORS[m],
      cost: res.totalCost,
      ratePerKm: res.effectiveRatePerKm
    };
  });

  return (
    <div className="rounded-[16px] border border-[#e5e7eb] bg-white p-5 md:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f1f5f9] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#005C99]/10 text-[#005C99] flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-[#111827] leading-tight">Interactive Cost & Formula Simulator</h3>
            <p className="text-[12px] text-[#64748b]">Real-time open standard valuation engine based on distance and fuel index</p>
          </div>
        </div>
        <button
          onClick={() => {
            setDistance(2.4);
            setMethod('e-bike');
            setCurrentDiesel(23.40);
            setAvailability(1.0);
          }}
          className="inline-flex items-center gap-1 text-[11px] font-mono text-[#64748b] hover:text-[#005C99] px-2 py-1 rounded bg-[#f8fafc] border border-[#e2e8f0]"
        >
          <RotateCcw className="w-3 h-3" /> Reset Defaults
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-4">
          {/* Method selector */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#475569] font-bold mb-2">
              1. Transport Method Mode
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['e-bike', 'taxi', 'myciti', 'walk'] as TransportMethod[]).map((m) => {
                const isSelected = method === m;
                const info = METHOD_FACTORS[m];
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`p-3 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? 'border-[#005C99] bg-[#f0f7fc] ring-1 ring-[#005C99]'
                        : 'border-[#e2e8f0] bg-[#f8fafc] hover:bg-white hover:border-[#cbd5e1]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-bold capitalize text-[#111827]">{m}</span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#005C99]"></span>}
                    </div>
                    <div className="font-mono text-[10px] text-[#005C99] font-semibold">{info.factor}x mult</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Distance Slider */}
          <div className="bg-[#f8fafc] p-4 rounded-xl border border-[#e2e8f0]">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[12px] font-semibold text-[#1f2937]">Distance (Feeder / Short Gap)</label>
              <span className="font-mono font-bold text-[14px] text-[#005C99] bg-white px-2.5 py-0.5 rounded border border-[#bfdbfe]">
                {distance.toFixed(1)} km
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="15.0"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#005C99]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#94a3b8] mt-1">
              <span>0.5 km (Rank feeder)</span>
              <span>2.5 km (Typical side-road)</span>
              <span>15.0 km (Max feeder range)</span>
            </div>
          </div>

          {/* Fuel & Availability controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-semibold text-[#334155]">Current Diesel Price</span>
                <span className="font-mono text-[12px] font-bold text-[#b45309]">R {currentDiesel.toFixed(2)} /L</span>
              </div>
              <input
                type="range"
                min="18.00"
                max="30.00"
                step="0.10"
                value={currentDiesel}
                onChange={(e) => setCurrentDiesel(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#b45309]"
              />
              <div className="flex justify-between text-[9px] font-mono text-[#94a3b8] mt-1">
                <span>Baseline: R21.50</span>
                <span>Index: {(currentDiesel / BASELINE_DIESEL).toFixed(3)}x</span>
              </div>
            </div>

            <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-semibold text-[#334155]">Availability Factor</span>
                <span className="font-mono text-[12px] font-bold text-[#005C99]">{availability.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.80"
                max="1.30"
                step="0.05"
                value={availability}
                onChange={(e) => setAvailability(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#005C99]"
              />
              <div className="flex justify-between text-[9px] font-mono text-[#94a3b8] mt-1">
                <span>0.8x (Surplus bikes)</span>
                <span>1.3x (Peak demand)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Output & Formula Column */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="rounded-xl bg-[#0b1220] p-5 text-white border border-[#1e293b] shadow-inner">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#93c5fd] mb-1">Computed Trip Cost</div>
            <div className="flex items-baseline gap-2">
              <span className="text-[34px] font-black tracking-tight text-white">
                ZAR {result.totalCost.toFixed(2)}
              </span>
              <span className="text-[12px] font-mono text-[#94a3b8]">for {distance.toFixed(1)} km</span>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1e293b] space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between text-[#94a3b8]">
                <span>Base City Baseline (R2.20/km):</span>
                <span className="text-white">R {result.baseCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>Method Factor ({method}):</span>
                <span className="text-[#93c5fd]">{result.methodFactor}x</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>Fuel Index (R{currentDiesel.toFixed(2)} / R21.50):</span>
                <span className="text-[#fde68a]">{result.fuelIndex.toFixed(3)}x</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>Effective Rate:</span>
                <span className="text-[#34d399] font-bold">R {result.effectiveRatePerKm.toFixed(2)} / km</span>
              </div>
            </div>
          </div>

          {/* Quick Mode Comparisons */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wide text-[#64748b] font-bold">
              Mode Comparison for {distance.toFixed(1)} km
            </div>
            <div className="grid grid-cols-2 gap-2">
              {comparison.map((item) => (
                <div
                  key={item.method}
                  className={`p-2.5 rounded-lg border text-[12px] flex items-center justify-between ${
                    item.method === method
                      ? 'border-[#005C99] bg-[#f0f7fc]'
                      : 'border-[#e2e8f0] bg-white'
                  }`}
                >
                  <span className="capitalize font-medium text-[#334155]">{item.method}</span>
                  <span className="font-mono font-bold text-[#111827]">
                    {item.cost === 0 ? 'Free' : `R ${item.cost.toFixed(2)}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
