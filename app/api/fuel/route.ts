import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    current_diesel: 23.40,
    baseline_diesel: 21.50,
    fuel_index: 1.088,
    currency: 'ZAR',
    unit: 'ZAR/L',
    source: 'Department of Mineral Resources and Energy (DMRE) Cape Coastal Index',
    cached_for_seconds: 86400,
    updated_at: new Date().toISOString(),
  });
}
