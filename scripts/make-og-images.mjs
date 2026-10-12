// Builds the link-preview cards WhatsApp, Facebook and Google show for each page:
// 1200x630, the logo on plum beside a round photo. Run: node scripts/make-og-images.mjs
import sharp from 'sharp'

const W = 1200
const H = 630
const PLUM = '#540244'
const PINK = '#F6C9DA'
const D = 500 // photo circle diameter

const CARDS = [
  { photo: 'public/hero2.jpeg', out: 'public/og.jpg' },
  { photo: 'public/hero.jpeg', out: 'public/og-menu.jpg' },
  { photo: 'public/board.jpg', out: 'public/og-visit.jpg' },
]

const circleMask = Buffer.from(`<svg width="${D}" height="${D}"><circle cx="${D / 2}" cy="${D / 2}" r="${D / 2}" fill="#fff"/></svg>`)
const ring = Buffer.from(
  `<svg width="${D + 28}" height="${D + 28}"><circle cx="${(D + 28) / 2}" cy="${(D + 28) / 2}" r="${(D + 28) / 2 - 2}" fill="${PINK}"/></svg>`
)

const logo = await sharp('public/logo.png').resize(300, 300).toBuffer()

for (const card of CARDS) {
  const photo = await sharp(card.photo)
    .resize(D, D, { fit: 'cover', position: 'attention' })
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer()

  await sharp({ create: { width: W, height: H, channels: 3, background: PLUM } })
    .composite([
      { input: logo, left: 130, top: (H - 300) / 2 },
      { input: ring, left: W - D - 90 - 14, top: (H - D) / 2 - 14 },
      { input: photo, left: W - D - 90, top: (H - D) / 2 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(card.out)
  console.log('wrote', card.out)
}
