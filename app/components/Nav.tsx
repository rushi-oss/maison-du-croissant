import Image from "next/image";
import Link from "next/link";

// Plain links, always visible, phones included: no hamburger.
const navLinks = [
  { label: "menu", href: "/menu" },
  { label: "pre-order", href: "/preorder" },
  { label: "bulk order", href: "/bulk-order" },
  { label: "visit", href: "/location" },
];

export default function Nav() {
  return (
    <div className="wrap">
      <nav className="nav" aria-label="Main">
        <Link className="brand" href="/" aria-label="Maison du Croissant, home">
          <Image src="/logo.png" alt="" width={84} height={84} priority />
        </Link>
        <div className="nav-links">
          {navLinks.map((item, i) => (
            <Link key={item.href} href={item.href} style={{ "--i": i } as React.CSSProperties}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
