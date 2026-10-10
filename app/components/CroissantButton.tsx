import Link from 'next/link'
import CroissantIcon from './CroissantIcon'

type Props = {
  href: string
  children: React.ReactNode
  variant?: 'solid' | 'line'
}

// Chunky pressable pill with a croissant that puffs up on hover. External links open in a new tab.
export default function CroissantButton({ href, children, variant = 'solid' }: Props) {
  const className = `cbtn cbtn-${variant}`
  const inner = (
    <>
      <CroissantIcon className="cbtn-ico" />
      <span>{children}</span>
      <span className="cbtn-arrow" aria-hidden="true">→</span>
    </>
  )
  if (/^https?:/.test(href)) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    )
  }
  return (
    <Link className={className} href={href}>
      {inner}
    </Link>
  )
}
