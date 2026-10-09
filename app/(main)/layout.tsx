import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FloatingContactButtons from '../components/FloatingContactButtons'
import BusinessJsonLd from '../components/BusinessJsonLd'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BusinessJsonLd />
      <Nav />
      {children}
      <Footer />
      <FloatingContactButtons />
    </>
  )
}
