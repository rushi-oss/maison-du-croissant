'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MAPS_URL } from '../lib/site';
import { useClientValue } from '../lib/useClientValue';

// Real photos only. A slide with no src shows a labelled placeholder until its photo arrives.
const SLIDES: { src: string | null; alt: string }[] = [
  { src: '/hero2.jpeg', alt: 'Croissants on a deep purple surface' },
  { src: '/hero.jpeg', alt: 'Pizza Puffie on a pink backdrop' },
  { src: '/board.jpg', alt: 'The review board by the counter' },
  { src: null, alt: 'Seating · photo to come' },
];

const SLIDE_INTERVAL_MS = 3800;

// Rolled once per page load, so every visit gets a different note from the board.
let noteRoll: number | null = null;
const getNoteRoll = () => (noteRoll ??= Math.random());

export default function Hero({ notes }: { notes: string[] }) {
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

        {notes.length > 0 && (
          <figure className={`board-note${note ? '' : ' is-waiting'}`}>
            {note && (
              <Image src={note} alt="A customer note from the board by the counter" width={156} height={156} sizes="156px" />
            )}
            <figcaption className="caps">from the board</figcaption>
          </figure>
        )}

        <div className="hero-text">
          <h1 className="big">croissants, filled.</h1>
          <span className="caps">Sodnac · Mauritius · from 9 am</span>
          <div className="hero-actions">
            <a className="link" href="#menu">see the menu →</a>
            <a className="link" href={MAPS_URL} target="_blank" rel="noopener noreferrer">directions →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
