import { useId } from 'react'

// A croissant: a crescent cut into five puffy pieces. Each piece is its own group
// so CSS can puff them one after another (see .seg in globals.css).
const CRESCENT = 'M3 22 C1 10 9 3 20 3 C31 3 39 10 37 22 C34 18 29 13 20 13 C11 13 6 18 3 22Z'

// Bands that slice the crescent, angled like the folds of a real croissant,
// each with the point it puffs up from.
const PIECES = [
  { points: '-5,-5 1.5,-5 19,30 -5,30', origin: '6px 16px' },
  { points: '1.5,-5 10.75,-5 19.5,30 19,30', origin: '11.5px 9px' },
  { points: '10.75,-5 29.25,-5 20.5,30 19.5,30', origin: '20px 8px' },
  { points: '29.25,-5 38.5,-5 21,30 20.5,30', origin: '28.5px 9px' },
  { points: '38.5,-5 45,-5 45,30 21,30', origin: '34px 16px' },
]

export default function CroissantIcon({ className = '' }: { className?: string }) {
  const clipId = `crescent-${useId().replace(/:/g, '')}`
  return (
    <svg className={`croissant ${className}`} viewBox="0 0 40 24" width="40" height="24" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path d={CRESCENT} />
        </clipPath>
      </defs>
      {PIECES.map((piece, i) => (
        <g key={i} className="seg" style={{ '--s': i, transformOrigin: piece.origin } as React.CSSProperties}>
          <polygon
            points={piece.points}
            fill="currentColor"
            stroke="var(--btn-bg, #fff)"
            strokeWidth="1.6"
            clipPath={`url(#${clipId})`}
          />
        </g>
      ))}
    </svg>
  )
}
