'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MAPS_URL } from '../lib/site';
import { useClientValue } from '../lib/useClientValue';
import CroissantButton from './CroissantButton';
import Promo, { type PromoData } from './Promo';

// Real photos only. A slide with no src shows a labelled placeholder until its photo arrives.
const SLIDES: { src: string | null; alt: string }[] = [
  { src: '/hero2.jpeg', alt: 'Croissants on a deep purple surface' },
  { src: '/slides/croissant-spread.jpg', alt: 'Strawberry, Nutella and Oreo croissants laid out in paper boats' },
  { src: '/slides/pista-bliss.jpg', alt: 'Pista Bliss: pistachio cream and chocolate drizzle with gold leaf' },
  { src: '/hero.jpeg', alt: 'Pizza Puffie on a pink backdrop' },
  { src: '/slides/cookie-cloud.jpg', alt: 'Cookie Cloud: chocolate cream and Oreo crumbs in a takeaway box' },
  { src: '/board.jpg', alt: 'The review board by the counter' },
  // The seating-area photo goes here once it's taken.
];

const SLIDE_INTERVAL_MS = 3800;

// Rolled once per page load, so every visit gets a different note from the board.
let noteRoll: number | null = null;
const getNoteRoll = () => (noteRoll ??= Math.random());

export default function Hero({ notes, promo }: { notes: string[]; promo?: PromoData | null }) {
  const [active, setActive] = useState(0);
  // Tapping restarts the timer, so the next auto-advance never lands right after a tap.
  const [tapCount, setTapCount] = useState(0);
  const roll = useClientValue<number | null>(getNoteRoll, null);
  const note = roll === null || !notes.length ? null : notes[Math.floor(roll * notes.length)];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [tapCount]);

  function next() {
    setActive((current) => (current + 1) % SLIDES.length);
    setTapCount((n) => n + 1);
  }

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <button className="hero-photo round" type="button" onClick={next} aria-label="Show the next photo">
          {SLIDES.map((slide, i) =>
            slide.src ? (
              <Image
                key={slide.src}
                className={`hslide${i === active ? ' is-on' : ''}`}
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 860px) 520px, 80vw"
              />
            ) : (
              <span key={slide.alt} className={`hslide placeholder${i === active ? ' is-on' : ''}`}>
                <span className="caps">{slide.alt}</span>
              </span>
            )
          )}
        </button>

        {promo ? (
          <Promo promo={promo} variant="hero" />
        ) : notes.length > 0 && (
          <figure className={`board-note${note ? '' : ' is-waiting'}`}>
            {note && (
              <Image src={note} alt="A customer note from the board by the counter" width={156} height={156} sizes="156px" />
            )}
            <figcaption className="caps">from the board</figcaption>
          </figure>
        )}

        <div className="hero-text">
          {/* Each line slides up out of its own mask, one after the other. */}
          <h1 className="big">
            {['croissants,', 'filled.'].map((line, i) => (
              <span className="rise-line" key={line}>
                <span style={{ '--i': i } as React.CSSProperties}>{line}</span>{' '}
              </span>
            ))}
          </h1>
          <span className="caps hero-sub">Sodnac · Mauritius · from 9 am</span>
          <div className="hero-actions">
            <CroissantButton href="/menu">see the menu</CroissantButton>
            <CroissantButton href={MAPS_URL} variant="line">directions</CroissantButton>
          </div>
        </div>
      </div>
    </section>
  );
}
