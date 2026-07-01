export default function FollowUsPage() {
  return (
    <main className="min-h-screen bg-[#FDF6EC] pt-36 pb-24 px-4 max-w-lg mx-auto">

      <p className="text-[#C4973B] text-sm font-semibold tracking-widest uppercase mb-2">
        Stay connected
      </p>
      <h1 className="font-serif text-4xl text-[#540244] mb-2">Follow Us</h1>
      <div className="w-10 h-0.5 bg-[#C4973B] mb-10" />

      <div className="flex flex-col gap-4">

        {/* Instagram */}
        <a
          href="https://www.instagram.com/maisonducroissant_?igsh=eHo3bGdrZjRsazY%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 rounded-2xl border border-[#e0d5c5] hover:border-[#C4973B] transition-colors group"
        >
          <div className="w-12 h-12 rounded-full bg-[#540244] flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-[#FDF6EC]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-[#540244] group-hover:text-[#C4973B] transition-colors">Instagram</p>
            <p className="text-sm text-[#c9a88a]">@maisonducroissant_</p>
          </div>
          <svg className="w-4 h-4 text-[#c9a88a] ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@maison.du.croissant?_r=1&_t=ZS-97dS7yX2kGz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 rounded-2xl border border-[#e0d5c5] hover:border-[#C4973B] transition-colors group"
        >
          <div className="w-12 h-12 rounded-full bg-[#540244] flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-[#FDF6EC]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07Z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-[#540244] group-hover:text-[#C4973B] transition-colors">TikTok</p>
            <p className="text-sm text-[#c9a88a]">@maison.du.croissant</p>
          </div>
          <svg className="w-4 h-4 text-[#c9a88a] ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>

      </div>

    </main>
  );
}
