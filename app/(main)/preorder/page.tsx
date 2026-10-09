import type { Metadata } from 'next'
import Link from 'next/link'
import { pageMetadata } from '../../lib/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Pre-order',
  description:
    'Pre-ordering is coming soon: pick your croissants and a time, watch our oven, and pick them up warm. Until then, walk in any day from 9 am.',
  path: '/preorder',
})

// Honest "coming soon" until the oven hardware is in. Then step 2 becomes the live oven status.
const STEPS = [
  { title: 'Pick yours and a time', text: "Choose your croissants and when you'll come by." },
  { title: 'Watch the oven', text: 'The site shows when our oven is on, so you know yours is baking.' },
  { title: 'Pick up warm', text: 'Skip the counter queue and take them straight home.' },
]

export default function PreorderPage() {
  return (
    <main className="wrap pre">
      <header className="page-head">
        <span className="tag">coming soon</span>
        <h1 className="big">pre-order.</h1>
        <p className="lede">Reserve your croissants before you arrive, then pick them up warm. No queue.</p>
      </header>

      <ol className="steps">
        {STEPS.map((step, i) => (
          <li key={step.title}>
            <span className="step-n" aria-hidden="true">{i + 1}</span>
            <div>
              <h2 className="dish">{step.title}</h2>
              <p className="desc">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="pre-until">
        <p>Until then, walk in any day from 9 am.</p>
        <Link className="link" href="/bulk-order">ordering for a group? place a bulk order →</Link>
      </div>
    </main>
  )
}
