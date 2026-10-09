
// Builds the bakery's copy of a bulk order: what was asked for, plus suggested prices.
// Customers never see any of this; it only goes to the bakery's Gmail.

export const DISCOUNT_OPTIONS = [0, 5, 7.5, 10, 12.5, 15]

export type OrderDetails = {
  personal: boolean
  biz: string
  contact: string
  email: string
  phone: string
  date: string // YYYY-MM-DD
  area: string
  notes: string
}

export type PricedLine = {
  name: string
  qty: number
  unit: number | null // null when no price is set in Studio
  usedMenuPriceForB2b: boolean
  menuPrice: number | null
}

const rs = (n: number) => `Rs ${Math.round(n).toLocaleString('en-US')}`

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

export function buildOrderEmail(o: OrderDetails, lines: PricedLine[]) {
  const needed = new Date(`${o.date}T00:00:00Z`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
  const pieces = lines.reduce((s, l) => s + l.qty, 0)
  const priced = lines.filter((l) => l.unit !== null)
  const unpriced = lines.filter((l) => l.unit === null)
  const total = priced.reduce((s, l) => s + l.qty * (l.unit as number), 0)
  const menuTotal = lines.reduce((s, l) => s + l.qty * (l.menuPrice ?? 0), 0)
  const fellBack = lines.filter((l) => l.usedMenuPriceForB2b)

  const subject = o.personal
    ? `New personal bulk order: ${o.biz} (${o.contact})`
    : `New B2B order: ${o.biz}`
  const intro = o.personal
    ? `${o.contact} (${o.biz}) needs this by ${needed}, ${pieces} pieces.`
    : `${o.biz} needs this by ${needed}, ${pieces} pieces.`

  const suggestions = DISCOUNT_OPTIONS.map((pct) => ({
    label: pct === 0 ? (o.personal ? 'Menu total' : 'B2B total') : `${pct}% off`,
    amount: rs(total * (1 - pct / 100)),
  }))

  const notes: string[] = []
  if (lines.length) {
    notes.push(
      o.personal
        ? 'Personal order, so menu prices added up, at each discount. Pick one or set your own. Packaging not included.'
        : `B2B prices added up, at each discount. Pick one or set your own. Packaging not included. At menu prices this would be ${rs(menuTotal)}.`
    )
  } else {
    notes.push('Nothing picked from the list. See their note below.')
  }
  if (fellBack.length) {
    notes.push(`No B2B price set yet for ${fellBack.map((l) => l.name).join(', ')}, so the menu price was used. Set it in Studio.`)
  }
  if (unpriced.length) {
    notes.push(`No price at all for ${unpriced.map((l) => l.name).join(', ')}, so it's left out of the totals.`)
  }
  notes.push(`Delivery to ${o.area} is not included. Price it by area.`)

  const contactRows: [string, string][] = [
    ['Name', o.contact],
    ['Email', o.email],
    ['Phone', o.phone],
  ]
  if (o.notes) contactRows.push(['Note', o.notes])

  // Plain text, for mail apps that don't show HTML.
  const text = [
    intro,
    '',
    ...lines.map((l) => `${l.qty} × ${l.name} @ ${l.unit === null ? 'no price' : rs(l.unit)} = ${l.unit === null ? '-' : rs(l.qty * l.unit)}`),
    ...(lines.length ? ['', 'Suggested prices', ...suggestions.map((s) => `${s.label}: ${s.amount}`)] : []),
    '',
    ...notes,
    '',
    ...contactRows.map(([k, v]) => `${k}: ${v}`),
  ].join('\n')

  const cell = 'padding:8px 6px 8px 0;border-bottom:1px solid #EFE4EC;'
  const head = 'text-align:left;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#7A5C70;font-weight:600;padding:0 6px 8px 0;border-bottom:1px solid #EFE4EC;'
  const right = 'text-align:right;white-space:nowrap;'

  const table = lines.length
    ? `<table style="width:100%;border-collapse:collapse;font-size:14px;margin:16px 0;">
        <tr><th style="${head}">Item</th><th style="${head}${right}">Qty</th><th style="${head}${right}">${o.personal ? 'Each' : 'B2B each'}</th><th style="${head}${right}">Line</th></tr>
        ${lines
          .map(
            (l) => `<tr><td style="${cell}">${escapeHtml(l.name)}</td><td style="${cell}${right}">${l.qty}</td><td style="${cell}${right}">${
              l.unit === null ? 'no price' : rs(l.unit)
            }</td><td style="${cell}${right}">${l.unit === null ? '-' : rs(l.qty * l.unit)}</td></tr>`
          )
          .join('')}
      </table>
      <p style="margin:16px 0 4px;font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#7A5C70;">Suggested prices</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;border-top:2px solid #540244;">
        ${suggestions
          .map((s) => `<tr><td style="padding:4px 0;">${s.label}</td><td style="padding:4px 0;${right}">${s.amount}</td></tr>`)
          .join('')}
      </table>`
    : ''

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#540244;max-width:640px;">
    <p style="font-size:15px;margin:0 0 8px;">${escapeHtml(intro)}</p>
    ${table}
    ${notes.map((n) => `<p style="font-size:13px;color:#7A5C70;margin:12px 0 0;">${escapeHtml(n)}</p>`).join('')}
    <table style="margin-top:20px;font-size:13px;border-collapse:collapse;">
      ${contactRows
        .map(
          ([k, v]) =>
            `<tr><td style="color:#7A5C70;padding:2px 12px 2px 0;vertical-align:top;">${k}</td><td style="padding:2px 0;white-space:pre-wrap;">${escapeHtml(v)}</td></tr>`
        )
        .join('')}
    </table>
  </div>`

  return { subject, text, html }
}
