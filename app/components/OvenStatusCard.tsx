'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type OvenState = {
  status: string;
};

export default function OvenStatusCard() {
  const [oven, setOven] = useState<OvenState | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch('/api/oven-status', { cache: 'no-store' });
        const data: OvenState = await res.json();
        setOven(data);
      } catch {
        // silently ignore fetch errors — stale data stays displayed
      }
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 10_000);
    return () => clearInterval(interval);
  }, []);

  const isBaking = oven?.status === 'on';

  return (
    <div className="relative bg-[#540244] rounded-2xl p-6">
      <span className="absolute top-3 right-3 bg-[#C4973B] text-[#540244] text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded-full">
        Coming soon
      </span>
      <p className="text-[#C4973B] text-sm font-semibold tracking-widest uppercase mb-1">
        Live oven status
      </p>
      <p className="text-[#c9a88a] text-sm mb-3">
        Watch our oven in real time and pre-order accordingly
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: isBaking ? '#C4973B' : '#6b5044' }}
        />
        <div>
          <p className="text-[#FDF6EC] font-serif italic text-xl">
            {oven === null
              ? 'Checking oven…'
              : isBaking
              ? 'Fresh croissants will be available soon'
              : 'Fresh croissants available'}
          </p>
          <p className="text-[#c9a88a] text-sm mt-1">
            {oven === null
              ? ''
              : isBaking
              ? 'Ready in approximately — mins' // TODO: replace with real countdown when pre-order logic is built
              : <>
                  Come pick yours now or{' '}
                  <Link href="/preorder" className="underline text-[#FDF6EC]">
                    pre-order now
                  </Link>
                </>}
          </p>
        </div>
      </div>
    </div>
  );
}
