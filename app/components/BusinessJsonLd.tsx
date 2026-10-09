import { GEO, INSTAGRAM_URL, PHONE_DISPLAY, SITE_NAME, SITE_URL, TIKTOK_URL } from "../lib/site";

// Tells Google this is a bakery, where it is and when it's open (the "Bakery" LocalBusiness type).
const data = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "@id": `${SITE_URL}/#bakery`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: [`${SITE_URL}/hero2.jpeg`, `${SITE_URL}/hero.jpeg`],
  telephone: PHONE_DISPLAY,
  servesCuisine: ["Croissants", "Pastries", "Coffee"],
  hasMenu: `${SITE_URL}/menu`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ave Pelicans",
    addressLocality: "Sodnac",
    addressCountry: "MU",
  },
  geo: { "@type": "GeoCoordinates", latitude: GEO.lat, longitude: GEO.lng },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "17:30",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "13:00" },
  ],
  sameAs: [INSTAGRAM_URL, TIKTOK_URL],
};

export default function BusinessJsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
