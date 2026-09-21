'use client';

import React, { useState } from 'react';
import { TrendingUp, DollarSign, Shield, ArrowUpRight, BarChart2, CheckCircle2, Clock } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export default function ProjectROICalculator() {
  const [hubCount, setHubCount] = useState<number>(8);
  const [bikesPerHub, setBikesPerHub] = useState<number>(5);
  const [dailyRidesPerBike, setDailyRidesPerBike] = useState<number>(3.5);
  const [farePerRide, setFarePerRide] = useState<number>(12.50);
  const [hireTakeRatePct, setHireTakeRatePct] = useState<number>(25); // % of rides with hire add-ons (R50 avg)
  const [avgHireAddonPrice, setAvgHireAddonPrice] = useState<number>(50);

  const totalBikes = hubCount * bikesPerHub;
  const capexPerHub = 154000;
  const totalCapex = hubCount * capexPerHub;

  // Annual Revenue calculation (300 active days/yr)
  const activeDays = 300;
  const annualRides = totalBikes * dailyRidesPerBike * activeDays;
  const annualFareRevenue = annualRides * farePerRide;
  const annualHireRevenue = annualRides * (hireTakeRatePct / 100) * avgHireAddonPrice;
  const totalAnnualRevenue = annualFareRevenue + annualHireRevenue;

  // Annual Operating Costs (TCO R2.87/km * avg 12km/bike/day * totalBikes * activeDays)
  const annualKmPerBike = 12 * activeDays;
  const totalAnnualKm = totalBikes * annualKmPerBike;
  const operatingCostPerKm = 2.87;
  const annualOperatingCost = totalAnnualKm * operatingCostPerKm;

  const annualNetProfit = totalAnnualRevenue - annualOperatingCost;
  const paybackMonths = annualNetProfit > 0 ? (totalCapex / (annualNetProfit / 12)) : 99;
  const roi5Year = ((annualNetProfit * 5 - totalCapex) / totalCapex) * 100;

  // 5-year projection data for chart
  const cashFlowData = [
    { year: 'Year 0', capex: -totalCapex, revenue: 0, net: -totalCapex },
    { year: 'Year 1', capex: 0, revenue: totalAnnualRevenue, net: annualNetProfit },
    { year: 'Year 2', capex: 0, revenue: totalAnnualRevenue * 1.15, net: annualNetProfit * 1.2 },
    { year: 'Year 3', capex: 0, revenue: totalAnnualRevenue * 1.3, net: annualNetProfit * 1.4 },
    { year: 'Year 4', capex: 0, revenue: totalAnnualRevenue * 1.45, net: annualNetProfit * 1.6 },
    { year: 'Year 5', capex: 0, revenue: totalAnnualRevenue * 1.6, net: annualNetProfit * 1.8 },
  ];

  return (
    <div className="w-full bg-white text-[#0f172a] font-sans rounded-2xl overflow-hidden shadow-sm border border-[#e2e8f0] p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f1f5f9] pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#005C99]/10 text-[#005C99] text-[11px] font-bold tracking-wide uppercase">Financial Modeling</span>
            <span className="text-[11px] text-[#64748b]">MyCiTi Value Metrics & CAPEX ROI</span>
          </div>
          <h2 className="text-[24px] md:text-[28px] font-bold tracking-tight text-[#0f172a]">Project ROI & Long-Term Financial Benefits</h2>
          <p className="text-[13px] text-[#64748b] mt-1">
            Calculate payback periods, net annual yield, and 5-year compounding cash flows based on {hubCount} deployed hubs ({totalBikes} total e-bikes).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#f8fafc] border border-[#e2e8f0] px-4 py-3 text-right">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#64748b]">Total CAPEX Ask</div>
            <div className="text-[20px] font-bold text-[#005C99]">R {formatNumber(totalCapex)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6 bg-[#f8fafc] p-6 rounded-xl border border-[#e2e8f0]">
          <h3 className="text-[15px] font-bold text-[#0f172a] mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#005C99]" /> Model Parameters
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[13px] mb-1.5 font-medium">
                <span>Active Hubs</span>
                <span className="font-bold text-[#005C99]">{hubCount} hubs</span>
              </div>
              <input 
                type="range" min="1" max="20" step="1" value={hubCount} 
                onChange={(e) => setHubCount(Number(e.target.value))}
                className="w-full accent-[#005C99]"
              />
              <div className="flex justify-between text-[10px] text-[#64748b] mt-1">
                <span>1 hub (Pilot)</span>
                <span>8 hubs (Scale)</span>
                <span>20 hubs</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[13px] mb-1.5 font-medium">
                <span>Bikes per Hub</span>
                <span className="font-bold text-[#005C99]">{bikesPerHub} bikes</span>
              </div>
              <input 
                type="range" min="2" max="10" step="1" value={bikesPerHub} 
                onChange={(e) => setBikesPerHub(Number(e.target.value))}
                className="w-full accent-[#005C99]"
              />
            </div>

            <div>
              <div className="flex justify-between text-[13px] mb-1.5 font-medium">
                <span>Daily Rides per Bike</span>
                <span className="font-bold text-[#005C99]">{dailyRidesPerBike} rides/day</span>
              </div>
              <input 
                type="range" min="1.0" max="8.0" step="0.5" value={dailyRidesPerBike} 
                onChange={(e) => setDailyRidesPerBike(Number(e.target.value))}
                className="w-full accent-[#005C99]"
              />
            </div>

            <div>
              <div className="flex justify-between text-[13px] mb-1.5 font-medium">
                <span>Feeder Fare / Ride</span>
                <span className="font-bold text-[#005C99]">R {farePerRide.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="5.00" max="30.00" step="0.50" value={farePerRide} 
                onChange={(e) => setFarePerRide(Number(e.target.value))}
                className="w-full accent-[#005C99]"
              />
            </div>

            <div>
              <div className="flex justify-between text-[13px] mb-1.5 font-medium">
                <span>Hire Add-on Take Rate</span>
                <span className="font-bold text-[#005C99]">{hireTakeRatePct}% (R{avgHireAddonPrice} avg)</span>
              </div>
              <input 
                type="range" min="5" max="50" step="5" value={hireTakeRatePct} 
                onChange={(e) => setHireTakeRatePct(Number(e.target.value))}
                className="w-full accent-[#005C99]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#e2e8f0] text-[12px] text-[#64748b] leading-relaxed">
            * Based on MyCiTi feeder integration standards, R2.87/km operational TCO, and 300 active operating days per year.
          </div>
        </div>

        {/* Results & Visualizations Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] p-4 rounded-xl">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#166534]">Payback Period</div>
              <div className="text-[24px] font-extrabold text-[#15803d] mt-1">{paybackMonths < 99 ? `${paybackMonths.toFixed(1)} months` : 'N/A'}</div>
              <div className="text-[11px] text-[#166534]/80 mt-0.5">Target: &lt;18 months</div>
            </div>

            <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-xl">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#64748b]">Annual Net Profit</div>
              <div className="text-[24px] font-extrabold text-[#0f172a] mt-1">R {formatNumber(Math.round(annualNetProfit))}</div>
              <div className="text-[11px] text-[#64748b] mt-0.5">After TCO deduction</div>
            </div>

            <div className="bg-[#eff6ff] border border-[#bfdbfe] p-4 rounded-xl col-span-2 md:col-span-1">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#1e40af]">5-Year ROI</div>
              <div className="text-[24px] font-extrabold text-[#1d4ed8] mt-1">+{roi5Year.toFixed(0)}%</div>
              <div className="text-[11px] text-[#1e40af]/80 mt-0.5">Compounded return</div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5">
            <h4 className="text-[13px] font-bold text-[#0f172a] mb-4">5-Year Cumulative Net Cash Flow (ZAR)</h4>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashFlowData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="year" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(v) => `R${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px', color: '#f8fafc' }}
                    formatter={(val: any) => [`R ${formatNumber(Number(val))}`, 'Net Cash Flow']}
                  />
                  <Bar dataKey="net" fill="#005C99" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#fefce8] border border-[#fef08a] rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#ca8a04] shrink-0 mt-0.5" />
            <div className="text-[12.5px] text-[#713f12] leading-relaxed">
              <b>MyCiTi Infrastructure Synergy:</b> At {dailyRidesPerBike} rides/bike/day, each hub generates approximately R{formatNumber(Math.round(totalAnnualRevenue / hubCount))} in annual revenue while displacing urban vehicle congestion and saving over 500kg CO₂ per bike annually.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
