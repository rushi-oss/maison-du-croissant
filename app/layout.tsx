import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_NAME, SITE_URL } from "./lib/site";
import { pageMetadata, SITE_DESCRIPTION } from "./lib/metadata";
import "./globals.css";

// Heavy lowercase headlines and uppercase dish names.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  ...pageMetadata({
    description: SITE_DESCRIPTION,
    path: "/",
  }),
  // Each page sets its own canonical; inheriting "/" would point every page at the homepage.
  alternates: null,
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · Filled Croissants in Sodnac, Mauritius`,
    template: `%s · ${SITE_NAME}`,
  },
};

// Runs before the page paints: marks that JavaScript is on (for scroll reveals) and
// skips the opening logo animation after the first page of a visit, or for anyone
// who has asked their device for less motion.
const BOOT_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('mdc-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('intro-seen')}else{sessionStorage.setItem('mdc-intro','1')}}catch(e){d.classList.add('intro-seen')}})()`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The boot script adds classes to <html> before React loads, hence suppressHydrationWarning.
    <html lang="en" className={`${bricolage.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
