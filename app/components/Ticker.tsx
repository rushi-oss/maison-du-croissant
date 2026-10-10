import CroissantIcon from './CroissantIcon'

// Red strip of menu names scrolling sideways. The list is printed twice so the loop is seamless.
export default function Ticker({ words }: { words: string[] }) {
  const row = (copy: number) => (
    <span className="ticker-row" key={copy}>
      {words.map((word, i) => (
        <span className="ticker-item" key={`${copy}-${i}`}>
          {word}
          <CroissantIcon />
        </span>
      ))}
    </span>
  )
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">{[0, 1].map(row)}</div>
    </div>
  )
}
