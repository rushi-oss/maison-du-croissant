export default function LocationPage() {
  return (
    <main className="min-h-screen bg-[#FDF6EC] pt-36 pb-24 px-4 max-w-lg mx-auto">

      {/* Page header */}
      <p className="text-[#C4973B] text-sm font-semibold tracking-widest uppercase mb-2">
        Come see us
      </p>
      <h1 className="font-serif text-4xl text-[#540244] mb-2">Location</h1>
      <div className="w-10 h-0.5 bg-[#C4973B] mb-10" />

      {/* Info rows */}
      <div className="flex flex-col gap-6 mb-10">

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#540244] flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-[#FDF6EC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C4973B] mb-1">Address</p>
            <p className="text-[#540244] font-medium">Ave Pelicans, Sodnac</p>
            <p className="text-[#c9a88a] text-sm">Mauritius</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#540244] flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-[#FDF6EC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C4973B] mb-1">Phone</p>
            <a
              href="tel:+23057807934"
              className="text-[#540244] font-medium hover:text-[#C4973B] transition-colors"
            >
              +230 5780 7934
            </a>
          </div>
        </div>

        {/* Opening hours */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#540244] flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-[#FDF6EC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C4973B] mb-1">Opening Hours</p>
            <p className="text-[#540244] font-medium">Monday – Sunday</p>
            <p className="text-[#c9a88a] text-sm">09:00 – 17:30</p>
          </div>
        </div>

        {/* Parking */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#540244] flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-[#FDF6EC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#C4973B] mb-1">Parking</p>
            <p className="text-[#540244] font-medium">Free parking available</p>
          </div>
        </div>

      </div>

      {/* Get Directions CTA */}
      <a
        href="https://www.google.com/maps/dir/?api=1&destination=-20.2684055,57.4870718&hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-[#540244] text-[#FDF6EC] text-center py-4 rounded-full font-semibold text-sm tracking-wide"
      >
        Get Directions
      </a>

    </main>
  );
}
