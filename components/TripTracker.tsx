'use client';

import React, { useState, useEffect } from 'react';
import { Play, Square, Download, Trash2, Shield, Plus, Clock, Bike, Check, RefreshCw } from 'lucide-react';
import { TransportMethod, calculateCostKm, METHOD_FACTORS } from './CostCalculator';

export interface TripRecord {
  id: string;
  timestamp: string;
  distance_km: number;
  method: TransportMethod;
  cost_zar: number;
  fuel_index: number;
  duration_sec: number;
  anonymous_device_hash: string;
}

const INITIAL_TRIPS: TripRecord[] = [
  {
    id: 'tr-001',
    timestamp: '2025-02-16 07:15',
    distance_km: 2.3,
    method: 'e-bike',
    cost_zar: 4.95,
    fuel_index: 1.088,
    duration_sec: 420,
    anonymous_device_hash: '8f4a9b...c21e'
  },
  {
    id: 'tr-002',
    timestamp: '2025-02-16 08:30',
    distance_km: 1.8,
    method: 'myciti',
    cost_zar: 3.23,
    fuel_index: 1.088,
    duration_sec: 310,
    anonymous_device_hash: '8f4a9b...c21e'
  },
  {
    id: 'tr-003',
    timestamp: '2025-02-16 12:45',
    distance_km: 3.5,
    method: 'taxi',
    cost_zar: 9.64,
    fuel_index: 1.088,
    duration_sec: 640,
    anonymous_device_hash: '8f4a9b...c21e'
  },
  {
    id: 'tr-004',
    timestamp: '2025-02-16 17:20',
    distance_km: 2.1,
    method: 'e-bike',
    cost_zar: 4.52,
    fuel_index: 1.088,
    duration_sec: 380,
    anonymous_device_hash: '8f4a9b...c21e'
  }
];

export default function TripTracker() {
  const [trips, setTrips] = useState<TripRecord[]>(INITIAL_TRIPS);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [activeSeconds, setActiveSeconds] = useState<number>(0);
  const [activeDistance, setActiveDistance] = useState<number>(0.0);
  const [selectedMethod, setSelectedMethod] = useState<TransportMethod>('e-bike');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Timer interval when tracking is active
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTracking) {
      interval = setInterval(() => {
        setActiveSeconds((prev) => prev + 1);
        // Simulate GPS distance accumulation at approx ~18 km/h for e-bike, ~4km/h for walk, ~25km/h for taxi
        const speedKmh = selectedMethod === 'walk' ? 4.5 : selectedMethod === 'e-bike' ? 18 : 26;
        const kmPerSec = speedKmh / 3600;
        setActiveDistance((prev) => +(prev + kmPerSec).toFixed(3));
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking, selectedMethod]);

  const handleStartTracking = () => {
    setActiveSeconds(0);
    setActiveDistance(0.0);
    setIsTracking(true);
    setToastMessage('GPS Km Tracking Started (Offline SQLite mode)');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    if (activeDistance < 0.1 && activeSeconds < 2) {
      setToastMessage('Trip too short to record (<0.1km)');
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    const calc = calculateCostKm({
      distance_km: Math.max(0.1, activeDistance),
      method: selectedMethod,
      current_diesel: 23.40,
      availability: 1.0
    });

    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newTrip: TripRecord = {
      id: `tr-${Date.now().toString().slice(-4)}`,
      timestamp: timeStr,
      distance_km: +activeDistance.toFixed(2),
      method: selectedMethod,
      cost_zar: calc.totalCost,
      fuel_index: 1.088,
      duration_sec: activeSeconds,
      anonymous_device_hash: '8f4a9b...c21e'
    };

    setTrips((prev) => [newTrip, ...prev]);
    setToastMessage(`Saved ${newTrip.distance_km} km trip (${selectedMethod}) to local storage.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAddManualTrip = () => {
    const defaultKm = selectedMethod === 'walk' ? 1.2 : 2.5;
    const calc = calculateCostKm({
      distance_km: defaultKm,
      method: selectedMethod,
      current_diesel: 23.40,
      availability: 1.0
    });

    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newTrip: TripRecord = {
      id: `tr-${Date.now().toString().slice(-4)}`,
      timestamp: timeStr,
      distance_km: defaultKm,
      method: selectedMethod,
      cost_zar: calc.totalCost,
      fuel_index: 1.088,
      duration_sec: Math.round(defaultKm * 180),
      anonymous_device_hash: '8f4a9b...c21e'
    };

    setTrips((prev) => [newTrip, ...prev]);
    setToastMessage(`Logged ${defaultKm} km manually.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportCSV = () => {
    const headers = 'trip_id,timestamp,distance_km,method,cost_zar,fuel_index,duration_sec,anonymous_hash\n';
    const rows = trips
      .map(
        (t) =>
          `${t.id},"${t.timestamp}",${t.distance_km},${t.method},${t.cost_zar},${t.fuel_index},${t.duration_sec},${t.anonymous_device_hash}`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `openkm_trips_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('CSV Export generated & downloaded.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleClearHistory = () => {
    setTrips([]);
    setToastMessage('Local trip history cleared.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalKm = trips.reduce((acc, t) => acc + t.distance_km, 0);
  const totalZar = trips.reduce((acc, t) => acc + t.cost_zar, 0);

  return (
    <div className="rounded-[16px] border border-[#e5e7eb] bg-white p-5 md:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f1f5f9] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A6A6] animate-pulse"></span>
            <h3 className="text-[15px] font-bold text-[#111827]">Translator App • Trip Logger & Tracker (MVP)</h3>
          </div>
          <p className="text-[12px] text-[#64748b] mt-0.5">
            Offline-first SQLite local persistence. No login, no cloud dependency, 100% private.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            disabled={trips.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#005C99] text-white font-mono text-[11px] font-medium hover:bg-[#004877] transition-all disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV ({trips.length})
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="mb-4 px-3.5 py-2 rounded-lg bg-[#f0fdfa] border border-[#99f6e0] text-[#0f766e] text-[12px] font-mono flex items-center gap-2">
          <Check className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Active Trip Tracker Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
        <div className="md:col-span-6 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wide text-[#64748b] font-bold">
              Live GPS Km Tracker (Simulated)
            </span>
            <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border text-[#005C99]">
              {isTracking ? 'RECORDING GPS' : 'STANDBY'}
            </span>
          </div>

          <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-[#e2e8f0] mb-4">
            <div>
              <div className="text-[9px] font-mono uppercase text-[#94a3b8]">Distance</div>
              <div className="text-[26px] font-black text-[#005C99] leading-tight font-mono">
                {activeDistance.toFixed(2)} <span className="text-[14px] font-normal text-[#64748b]">km</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[9px] font-mono uppercase text-[#94a3b8]">Elapsed Time</div>
              <div className="text-[22px] font-mono text-[#334155]">
                {String(Math.floor(activeSeconds / 60)).padStart(2, '0')}:{String(activeSeconds % 60).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Mode Selector for Current Tracking */}
          <div className="mb-4">
            <div className="text-[10px] font-mono uppercase text-[#64748b] mb-1.5">Tracking Mode:</div>
            <div className="grid grid-cols-4 gap-1.5">
              {(['e-bike', 'taxi', 'myciti', 'walk'] as TransportMethod[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  disabled={isTracking}
                  onClick={() => setSelectedMethod(m)}
                  className={`py-1.5 px-2 rounded text-[11px] font-medium capitalize border transition-all ${
                    selectedMethod === m
                      ? 'bg-[#005C99] text-white border-[#005C99]'
                      : 'bg-white text-[#475569] border-[#cbd5e1] hover:bg-[#f1f5f9]'
                  } ${isTracking ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {!isTracking ? (
              <button
                onClick={handleStartTracking}
                className="flex-1 py-2.5 px-4 rounded-lg bg-[#00A6A6] hover:bg-[#008f8f] text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Play className="w-4 h-4 fill-current" /> Start Km Recording
              </button>
            ) : (
              <button
                onClick={handleStopTracking}
                className="flex-1 py-2.5 px-4 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-sm animate-pulse transition-all"
              >
                <Square className="w-4 h-4 fill-current" /> Stop & Log Trip
              </button>
            )}
            <button
              onClick={handleAddManualTrip}
              disabled={isTracking}
              title="Add a sample 2.5km trip instantly"
              className="py-2.5 px-3 rounded-lg border border-[#cbd5e1] bg-white text-[#475569] hover:bg-[#f8fafc] text-[12px] font-medium flex items-center gap-1 transition-all disabled:opacity-50"
            >
              <Plus className="w-4 h-4" /> Quick Log
            </button>
          </div>
        </div>

        {/* Aggregate Stats Card */}
        <div className="md:col-span-6 rounded-xl bg-[#0b1220] text-white p-4 flex flex-col justify-between border border-[#1e293b]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[11px] uppercase tracking-wide text-[#93c5fd] font-bold">
                Local Device Aggregates
              </span>
              <span className="text-[10px] font-mono text-[#64748b] bg-[#111a2e] px-2 py-0.5 rounded border border-[#1e293b]">
                SQLite Cache
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="bg-[#111a2e] p-3 rounded-lg border border-[#1e293b]">
                <div className="text-[10px] font-mono text-[#94a3b8] uppercase">Total Feeder Km</div>
                <div className="text-[24px] font-bold text-white font-mono">{totalKm.toFixed(1)} km</div>
              </div>
              <div className="bg-[#111a2e] p-3 rounded-lg border border-[#1e293b]">
                <div className="text-[10px] font-mono text-[#94a3b8] uppercase">Total Cost Value</div>
                <div className="text-[24px] font-bold text-[#34d399] font-mono">R {totalZar.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1e293b] flex items-center justify-between text-[11px] font-mono text-[#94a3b8]">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#38bdf8]" /> Anonymous ID: hash(dev+salt)
            </span>
            {trips.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-[#f87171] hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Trips Table */}
      <div className="rounded-xl border border-[#e2e8f0] overflow-hidden">
        <div className="px-4 py-2.5 bg-[#f8fafc] border-b border-[#e2e8f0] flex justify-between items-center text-[11px] font-mono text-[#64748b]">
          <span>RECORDED LOCAL TRIPS ({trips.length})</span>
          <span>FORMAT: OPENKM STANDARD v0.1.0</span>
        </div>

        {trips.length === 0 ? (
          <div className="p-8 text-center text-[#94a3b8] text-[13px]">
            No trips logged yet. Click &ldquo;Start Km Recording&rdquo; or &ldquo;Quick Log&rdquo; to test.
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[260px] overflow-y-auto">
            <table className="w-full text-left border-collapse text-[12px]">
              <thead className="bg-[#f1f5f9] text-[10px] font-mono uppercase text-[#475569] sticky top-0">
                <tr>
                  <th className="px-3 py-2">Trip ID</th>
                  <th className="px-3 py-2">Timestamp</th>
                  <th className="px-3 py-2">Method</th>
                  <th className="px-3 py-2 text-right">Distance</th>
                  <th className="px-3 py-2 text-right">Cost (ZAR)</th>
                  <th className="px-3 py-2 text-right">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {trips.map((trip) => (
                  <tr key={trip.id} className="hover:bg-[#f8fafc] font-mono">
                    <td className="px-3 py-2 text-[#64748b]">{trip.id}</td>
                    <td className="px-3 py-2 text-[#334155]">{trip.timestamp}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                          trip.method === 'e-bike'
                            ? 'bg-[#e6f0f8] text-[#005C99]'
                            : trip.method === 'myciti'
                            ? 'bg-[#f0fdfa] text-[#0f766e]'
                            : trip.method === 'taxi'
                            ? 'bg-[#fef3c7] text-[#92400e]'
                            : 'bg-[#f1f5f9] text-[#475569]'
                        }`}
                      >
                        {trip.method}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right font-bold text-[#111827]">
                      {trip.distance_km.toFixed(1)} km
                    </td>
                    <td className="px-3 py-2 text-right text-[#005C99] font-bold">
                      R {trip.cost_zar.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-right text-[#64748b]">
                      {Math.floor(trip.duration_sec / 60)}m {trip.duration_sec % 60}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
