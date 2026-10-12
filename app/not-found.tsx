import type { Metadata } from 'next'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CroissantButton from './components/CroissantButton'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

// Shown for any address that doesn't exist, with the way back to the croissants.
export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="wrap pre">
        <header className="page-head">
          <span className="tag">404</span>
          <h1 className="big">this one&apos;s gone stale.</h1>
          <p className="lede">The page you followed isn&apos;t here any more. The croissants still are.</p>
        </header>
        <div className="cta-row">
          <CroissantButton href="/menu">see the menu</CroissantButton>
          <CroissantButton href="/" variant="line">homepage</CroissantButton>
        </div>
      </main>
      <Footer />
    </>
  )
}
