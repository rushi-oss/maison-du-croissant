export default function Footer() {
  return (
    <footer className="bg-[#540244] mt-10 px-4 pt-8 pb-20 md:pb-8 text-center">
      <p className="font-serif text-[#FDF6EC] text-lg mb-3">
        Maison du Croissant
      </p>
      <p className="text-[#c9a88a] text-xs leading-7 mb-5">
        Ave Pelicans, Sodnac, Mauritius<br />
        Mon – Sat · 09:00 – 17:30<br />
        Sun · 09:00 – 13:00
      </p>

      {/* Social links */}
      <div className="flex items-center justify-center gap-5">

        {/* Location */}
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=-20.2684055,57.4870718&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get directions on Google Maps"
          className="text-[#c9a88a] hover:text-[#C4973B] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/maisonducroissant_?igsh=eHo3bGdrZjRsazY%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-[#c9a88a] hover:text-[#C4973B] transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
          </svg>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@maison.du.croissant?_r=1&_t=ZS-97dS7yX2kGz"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="text-[#c9a88a] hover:text-[#C4973B] transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07Z" />
          </svg>
        </a>

      </div>

      <p className="text-[#c9a88a] text-[10px] mt-5 tracking-wide">
        © {new Date().getFullYear()} Maison du Croissant
      </p>
    </footer>
  );
}
