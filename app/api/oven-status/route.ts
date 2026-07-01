import { NextRequest, NextResponse } from 'next/server';

// TEMPORARY: in-memory storage for local/IoT pipeline testing only.
// This resets every time the dev server restarts.
// Replace with a real persistent store (e.g. Redis, DB) before production.
let ovenState: { current_amps: number; status: string } = {
  current_amps: 0,
  status: 'off',
};

export async function GET() {
  // Public-facing card should only show status, not the raw amp reading
  return NextResponse.json({ status: ovenState.status });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  ovenState = { current_amps: body.current_amps, status: body.status };
  return NextResponse.json({ ok: true, stored: ovenState });
}
