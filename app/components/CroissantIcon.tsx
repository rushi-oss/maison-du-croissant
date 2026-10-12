// A croissant fresh from the oven: a thick golden crescent with curved folds, a darker
// underside and a soft shine on top, plus three wisps of steam above it. The steam is
// hidden until CSS animates it (see .croissant .steam in globals.css) and takes the colour
// of the text around it, so it shows on plum and on white.
const BUN =
  'M4 27 C1 16 10 5 24 5 C38 5 47 16 44 27 C41 25.5 38 25 35 25.5 C32 21.5 28.5 20 24 20 C19.5 20 16 21.5 13 25.5 C10 25 7 25.5 4 27 Z'
const UNDERSIDE = 'M6 25 C9 23 12 23 13 25.5 C16 21.5 19.5 20 24 20 C28.5 20 32 21.5 35 25.5 C36 23 39 23 42 25'

export default function CroissantIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`croissant ${className}`} viewBox="0 -6 48 38" width="40" height="32" aria-hidden="true">
      <g className="steam" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M17 2 q-3 -3 0 -6" />
        <path d="M24 1 q3 -3 0 -6" />
        <path d="M31 2 q-3 -3 0 -6" />
      </g>
      <path className="bun" d={BUN} />
      <path className="underside" d={UNDERSIDE} fill="none" strokeWidth="2.5" strokeLinecap="round" />
      <g className="folds" fill="none" strokeWidth="2.2" strokeLinecap="round">
        <path d="M12 9.5 Q15.5 16 13 25" />
        <path d="M19.5 6 Q22 13 20.5 20.3" />
        <path d="M28.5 6 Q26 13 27.5 20.3" />
        <path d="M36 9.5 Q32.5 16 35 25" />
      </g>
      <path className="shine" d="M14 8.5 Q24 3.5 34 8.5" fill="none" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
