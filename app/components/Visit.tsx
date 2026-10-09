import { HOURS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL } from '../lib/site'

// Address, phone, directions and hours. A section on the homepage, the main heading on /location.
export default function Visit({ asPage = false }: { asPage?: boolean }) {
  const Heading = asPage ? 'h1' : 'h2'
  return (
    <section className={`visit${asPage ? ' is-page' : ''}`} id="visit">
      <div className="visit-place">
        <Heading className="big">ave pelicans, sodnac.</Heading>
        <a className="phone" href={PHONE_TEL}>{PHONE_DISPLAY}</a>
        <a className="link" href={MAPS_URL} target="_blank" rel="noopener noreferrer">directions →</a>
      </div>
      <div className="hours">
        {HOURS.map((row) => (
          <div key={row.days}>
            <span>{row.days}</span>
            <span>{row.time}</span>
          </div>
        ))}
        <div>
          <span>Parking</span>
          <span>Free</span>
        </div>
      </div>
    </section>
  )
}
