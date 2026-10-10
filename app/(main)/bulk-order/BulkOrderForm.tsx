'use client'

import { useEffect, useRef, useState, useTransition, type FormEvent } from 'react'
import { CATEGORY_LABELS, type MenuCategory } from '../../lib/types'
import { useClientValue } from '../../lib/useClientValue'
import CroissantIcon from '../../components/CroissantIcon'
import { sendBulkOrder } from './actions'

export type BulkItem = { _id: string; name: string; category: MenuCategory }

type Kind = 'business' | 'personal'

function todayLocal() {
  const t = new Date()
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
}

const REQUIRED = ['biz', 'contact', 'email', 'phone', 'date', 'area'] as const
type FieldName = (typeof REQUIRED)[number]

// No prices anywhere in here: the quote is worked out on the server and emailed to the bakery.
export default function BulkOrderForm({ items }: { items: BulkItem[] }) {
  const searchRef = useRef<HTMLInputElement>(null)
  const sentRef = useRef<HTMLDivElement>(null)
  const [kind, setKind] = useState<Kind>('business')
  const [qty, setQty] = useState<Record<string, number>>({})
  const [search, setSearch] = useState('')
  const [invalid, setInvalid] = useState<Partial<Record<FieldName, boolean>>>({})
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  // Read in the browser so the cached page never carries a stale "today".
  const minDate = useClientValue<string | undefined>(todayLocal, undefined)
  const [pending, startTransition] = useTransition()

  const personal = kind === 'personal'
  const labels: Record<FieldName, string> = {
    biz: personal ? "What's the occasion?" : 'Business name',
    contact: 'Your name',
    email: 'Email',
    phone: 'Phone',
    date: 'Needed by',
    area: 'Delivery area',
  }

  useEffect(() => {
    if (sent) sentRef.current?.scrollIntoView({ block: 'start' })
  }, [sent])

  const term = search.trim().toLowerCase()
  const visible = items.filter((item) => !term || item.name.toLowerCase().includes(term))
  const groups = (Object.keys(CATEGORY_LABELS) as MenuCategory[])
    .map((category) => ({ category, items: visible.filter((i) => i.category === category) }))
    .filter((g) => g.items.length)

  // Builds on the latest count, so quick repeated taps on + or − all register.
  function updateQty(id: string, next: (current: number) => number) {
    setQty((q) => {
      const n = next(q[id] ?? 0)
      return { ...q, [id]: Math.max(0, Math.min(999, Number.isFinite(n) ? n : 0)) }
    })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const value = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | null)?.value.trim() ?? ''

    const bad: Partial<Record<FieldName, boolean>> = {}
    for (const name of REQUIRED) {
      const field = form.elements.namedItem(name) as HTMLInputElement
      bad[name] = !field.value.trim() || !field.checkValidity()
    }
    setInvalid(bad)
    const missing = REQUIRED.filter((name) => bad[name])
    if (missing.length) {
      setError(`Please check: ${missing.map((n) => labels[n].toLowerCase().replace(/\?$/, '')).join(', ')}.`)
      ;(form.elements.namedItem(missing[0]) as HTMLInputElement).focus()
      return
    }

    const picked = Object.entries(qty)
      .filter(([, n]) => n > 0)
      .map(([id, n]) => ({ id, qty: n }))
    const notes = value('notes')
    if (!picked.length && !notes) {
      setError('Pick at least one item, or tell us what you need in "Anything else".')
      searchRef.current?.focus()
      return
    }
    setError(null)

    startTransition(async () => {
      try {
        const result = await sendBulkOrder({
          kind,
          biz: value('biz'),
          contact: value('contact'),
          email: value('email'),
          phone: value('phone'),
          date: value('date'),
          area: value('area'),
          notes,
          items: picked,
          website: value('website'),
        })
        if (result.ok) setSent(true)
        else setError(result.error)
      } catch {
        setError("Sorry, that didn't send. Please try again, or message us on WhatsApp.")
      }
    })
  }

  if (sent) {
    return (
      <div className="sent" ref={sentRef}>
        <h2 className="big">sent.</h2>
        <p className="lede">Thanks. We&apos;ll get back to you with a quote, delivery included.</p>
      </div>
    )
  }

  const field = (name: FieldName, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="field">
      <label htmlFor={`b-${name}`}>{labels[name]}</label>
      <input id={`b-${name}`} name={name} required aria-invalid={invalid[name] ? 'true' : 'false'} {...props} />
    </div>
  )

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend className="big">who&apos;s ordering?</legend>
        <div className="choice">
          <label className="pill">
            <input type="radio" name="kind" value="business" checked={!personal} onChange={() => setKind('business')} />
            <span>a business</span>
          </label>
          <label className="pill">
            <input type="radio" name="kind" value="personal" checked={personal} onChange={() => setKind('personal')} />
            <span>a personal event</span>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className="big">{personal ? 'your details.' : 'your business.'}</legend>
        <div className="two">
          {field('biz', {
            autoComplete: personal ? 'off' : 'organization',
            placeholder: personal ? 'e.g. birthday, wedding, family lunch' : undefined,
          })}
          {field('contact', { autoComplete: 'name' })}
        </div>
        <div className="two">
          {field('email', { type: 'email', autoComplete: 'email' })}
          {field('phone', { type: 'tel', autoComplete: 'tel' })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="big">choose your fillings.</legend>
        <div className="field">
          <label htmlFor="b-search">Search the menu</label>
          <input
            ref={searchRef}
            id="b-search"
            type="search"
            placeholder="e.g. chicken, nutella"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          {groups.map((group) => (
            <div key={group.category}>
              <p className="caps qgroup">{CATEGORY_LABELS[group.category]}</p>
              {group.items.map((item) => {
                const n = qty[item._id] ?? 0
                return (
                  <div className="qrow" key={item._id}>
                    <span className="dish" id={`bn-${item._id}`}>{item.name}</span>
                    <div className={`stepper${n > 0 ? ' has-qty' : ''}`}>
                      <button type="button" aria-label={`One fewer ${item.name}`} onClick={() => updateQty(item._id, (c) => c - 1)}>
                        −
                      </button>
                      <input
                        type="text"
                        inputMode="numeric"
                        aria-labelledby={`bn-${item._id}`}
                        value={String(n)}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => updateQty(item._id, () => parseInt(e.target.value.replace(/\D/g, ''), 10))}
                      />
                      <button type="button" aria-label={`One more ${item.name}`} onClick={() => updateQty(item._id, (c) => c + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        {!groups.length && <p className="desc">Nothing matches that. Add it in the box below instead.</p>}
        <div className="field">
          <label htmlFor="b-notes">Anything else</label>
          <textarea
            id="b-notes"
            name="notes"
            rows={3}
            maxLength={2000}
            placeholder="Something not on the list, dietary needs, packing, timing…"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className="big">delivery.</legend>
        <div className="two">
          {field('date', { type: 'date', min: minDate })}
          {field('area', { placeholder: 'e.g. Quatre Bornes' })}
        </div>
        <p className="field-note">Delivery is charged extra, depending on your area.</p>
      </fieldset>

      <div className="trap" aria-hidden="true">
        <label htmlFor="b-website">Leave this empty</label>
        <input id="b-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <div className="send-row">
        <p>We only use your details to reply about this order.</p>
        <button className="cbtn cbtn-solid" type="submit" disabled={pending}>
          <CroissantIcon className="cbtn-ico" />
          <span>{pending ? 'sending…' : 'send order request'}</span>
        </button>
      </div>
    </form>
  )
}
