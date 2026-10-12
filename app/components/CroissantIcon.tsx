// A croissant fresh from the oven: golden roll, darker folds, and three wisps of steam
// above it. The steam is hidden until CSS animates it (see .croissant .steam in globals.css),
// and takes the colour of the text around it, so it shows on plum and on white.
const BUN =
  'M3 26 C1 15 11 7 24 7 C37 7 47 15 45 26 C41 23 37 22 33 23 C30 19 27 18 24 18 C21 18 18 19 15 23 C11 22 7 23 3 26Z'

export default function CroissantIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`croissant ${className}`} viewBox="0 0 48 40" width="40" height="33" aria-hidden="true">
      <g className="steam" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M17 8 q-3 -3 0 -6" />
        <path d="M24 7 q3 -3 0 -6" />
        <path d="M31 8 q-3 -3 0 -6" />
      </g>
      <g transform="translate(0 8) scale(1 0.8)">
        <path className="bun" d={BUN} />
        <g className="folds" fill="none" strokeWidth="2.4" strokeLinecap="round">
          <path d="M13.5 10 Q16.5 16 15 23" />
          <path d="M24 7.5 Q26.5 13 24 18" />
          <path d="M34.5 10 Q31.5 16 33 23" />
        </g>
      </g>
    </svg>
  )
}
