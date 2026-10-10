import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FloatingContactButtons from '../components/FloatingContactButtons'
import BusinessJsonLd from '../components/BusinessJsonLd'
import Intro from '../components/Intro'
import ScrollReveal from '../components/ScrollReveal'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BusinessJsonLd />
      <Intro />
      <ScrollReveal />
      <Nav />
      {children}
      <Footer />
      <FloatingContactButtons />
    </>
  )
}
