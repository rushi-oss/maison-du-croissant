'use server'

import { client } from '../../../sanity/lib/client'
import { BULK_PRICES_QUERY } from '../../../sanity/lib/queries'
import { buildOrderEmail, type OrderDetails, type PricedLine } from './email'

export type BulkOrderInput = {
  kind: 'business' | 'personal'
  biz: string
  contact: string
  email: string
  phone: string
  date: string
  area: string
  notes: string
  items: { id: string; qty: number }[]
  website: string // spam trap: people never see it, bots fill it in
}

export type BulkOrderResult = { ok: true } | { ok: false; error: string }

type PriceRow = { _id: string; name: string; price?: number | null; b2bPrice?: number | null }

const FALLBACK_ERROR = "Sorry, that didn't send. Please try again, or message us on WhatsApp."

const clean = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

function todayInMauritius() {
  // en-CA formats as YYYY-MM-DD, which compares correctly as a string.
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Indian/Mauritius' }).format(new Date())
}

export async function sendBulkOrder(input: BulkOrderInput): Promise<BulkOrderResult> {
  // Bots get a fake success so they don't retry.
  if (clean(input?.website, 200)) return { ok: true }

  const order: OrderDetails = {
    personal: input?.kind === 'personal',
    biz: clean(input?.biz, 120),
    contact: clean(input?.contact, 120),
    email: clean(input?.email, 200),
    phone: clean(input?.phone, 40),
    date: clean(input?.date, 10),
    area: clean(input?.area, 120),
    notes: clean(input?.notes, 2000),
  }

  // The browser checks all of this too; this is the copy that can't be skipped.
  if (!order.biz || !order.contact || !order.phone || !order.area) {
    return { ok: false, error: 'Please fill in every field.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.email)) {
    return { ok: false, error: 'Please check your email address.' }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(order.date) || order.date < todayInMauritius()) {
    return { ok: false, error: 'Please pick a date from today onwards.' }
  }

  const wanted = new Map<string, number>()
  for (const item of Array.isArray(input?.items) ? input.items.slice(0, 100) : []) {
    const qty = Math.floor(Number(item?.qty))
    if (typeof item?.id === 'string' && qty > 0) wanted.set(item.id, Math.min(qty, 999))
  }
  if (!wanted.size && !order.notes) {
    return { ok: false, error: 'Pick at least one item, or tell us what you need in "Anything else".' }
  }

  // Prices come from Studio here on the server, never from the browser.
  let rows: PriceRow[] = []
  if (wanted.size) {
    const ids = [...wanted.keys()]
    rows = await client.withConfig({ useCdn: false }).fetch(BULK_PRICES_QUERY, { ids })
    // Same order as the form, which follows the menu.
    rows.sort((a, b) => ids.indexOf(a._id) - ids.indexOf(b._id))
  }
  const lines: PricedLine[] = rows.map((row) => {
    const menuPrice = row.price ?? null
    const b2b = row.b2bPrice ?? null
    const unit = order.personal ? menuPrice : (b2b ?? menuPrice)
    return {
      name: row.name,
      qty: wanted.get(row._id) ?? 0,
      unit,
      usedMenuPriceForB2b: !order.personal && b2b === null && menuPrice !== null,
      menuPrice,
    }
  })

  const { subject, text, html } = buildOrderEmail(order, lines)

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.BULK_ORDER_EMAIL_TO
  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== 'production') {
      // Local testing without email set up: print what would have been sent.
      console.info(`[bulk order] email not configured, would send:\nSubject: ${subject}\n\n${text}`)
      return { ok: true }
    }
    console.error('[bulk order] RESEND_API_KEY or BULK_ORDER_EMAIL_TO is missing')
    return { ok: false, error: FALLBACK_ERROR }
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.BULK_ORDER_EMAIL_FROM || 'Maison du Croissant <onboarding@resend.dev>',
      to: [to],
      reply_to: order.email,
      subject,
      text,
      html,
    }),
  })
  if (!res.ok) {
    console.error('[bulk order] Resend refused the email', res.status, await res.text())
    return { ok: false, error: FALLBACK_ERROR }
  }
  return { ok: true }
}
