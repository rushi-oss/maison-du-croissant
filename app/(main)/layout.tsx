import Nav from '../components/Nav'
import Footer from '../components/Footer'
import StickyBar from '../components/StickyBar'
import FloatingContactButtons from '../components/FloatingContactButtons'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
      <StickyBar />
      <FloatingContactButtons />
    </>
  )
}
