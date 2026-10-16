import CroissantButton from './CroissantButton'
import { BAKE_SALE_POST_URL } from '../lib/site'

// The MauRevive / NAFCO bake sale. A section on the homepage, and its own page at /giving-back
// (the link used in B2B emails), where it also points on to a bulk order.
export default function GivingBack({ asPage = false }: { asPage?: boolean }) {
  const Heading = asPage ? 'h1' : 'h2'
  return (
    <section className={`giving${asPage ? ' is-page' : ''}`} id="giving-back">
      <div className="giving-text">
        <Heading className="big" data-reveal="left">giving back.</Heading>
        <div className="story-text" data-reveal>
          <p>
            Last year we baked for MauRevive&apos;s Bake Sale fundraiser, alongside NAFCO: two non-profits bringing
            light and support into the lives of children with special needs. Every pastry helped them get a little
            closer to their goal.
          </p>
          <p>
            We also got to teach a group of young volunteers to bake. They picked it up fast and worked brilliantly as
            a team.
          </p>
        </div>
        <div className="cta-row">
          {asPage && <CroissantButton href="/bulk-order">plan a bulk order</CroissantButton>}
          <CroissantButton href={BAKE_SALE_POST_URL} variant="line">see it on Instagram</CroissantButton>
        </div>
      </div>
    </section>
  )
}
