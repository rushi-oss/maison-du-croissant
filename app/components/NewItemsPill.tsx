'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CATEGORY_LABELS, type MenuItem } from '../lib/types';

const PILL_INTERVAL_MS = 2800;
const SLIDE_INTERVAL_MS = 4000;

// Pinned bottom-left on the homepage: cycles the names of the new items and opens a slideshow of them.
export default function NewItemsPill({ items }: { items: MenuItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [pillIndex, setPillIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  // Bumped on every manual move so the auto-advance timer starts over.
  const [moves, setMoves] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const count = items.length;
  // Stays tucked away until the hero's buttons have scrolled off, so it never covers them.
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const heroActions = document.querySelector('.hero-actions');
    if (!heroActions) return;
    const io = new IntersectionObserver(([entry]) => {
      setRevealed(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(heroActions);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (count < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let fadeTimer: ReturnType<typeof setTimeout>;
    const timer = setInterval(() => {
      setFading(true);
      fadeTimer = setTimeout(() => {
        setPillIndex((i) => (i + 1) % count);
        setFading(false);
      }, 250);
    }, PILL_INTERVAL_MS);
    return () => {
      clearInterval(timer);
      clearTimeout(fadeTimer);
    };
  }, [count]);

  useEffect(() => {
    if (!open || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setCurrent((i) => (i + 1) % count), SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [open, moves, count]);

  if (!count) return null;

  function go(i: number) {
    setCurrent((i + count) % count);
    setMoves((m) => m + 1);
  }

  function openShow() {
    setCurrent(pillIndex);
    dialogRef.current?.showModal();
    setOpen(true);
  }

  return (
    <>
      <button className={`new-pill${revealed ? '' : ' is-tucked'}`} type="button" aria-haspopup="dialog" aria-label="See the new items" onClick={openShow} tabIndex={revealed ? 0 : -1}>
        <span className="disc">new</span>
        <span className="text">
          <span className="label caps">
            {count} new {count === 1 ? 'item' : 'items'}
          </span>
          <span className={`name${fading ? ' fading' : ''}`}>{items[pillIndex].name}</span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="show"
        aria-labelledby="showTitle"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="show-head">
          <h2 className="big" id="showTitle">new.</h2>
          <button className="icon-btn" type="button" aria-label="Close" onClick={() => dialogRef.current?.close()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div
          className="viewport"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
            touchStartX.current = null;
          }}
        >
          <div className="track" style={{ transform: `translateX(${-100 * current}%)` }}>
            {items.map((item, i) => (
              <div key={item._id} className="slide" role="group" aria-label={`${i + 1} of ${count}`} aria-hidden={i !== current}>
                <div className="round">
                  {item.photoUrl ? (
                    <Image src={item.photoUrl} alt={item.name} fill sizes="260px" />
                  ) : (
                    <div className="placeholder">
                      <span className="initial">{item.name.charAt(0).toLowerCase()}</span>
                      <span className="caps">Photo to come</span>
                    </div>
                  )}
                </div>
                <span className="caps">{CATEGORY_LABELS[item.category]}</span>
                <span className="dish">{item.name}</span>
                {item.description && <p className="desc">{item.description}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="show-foot">
          <button className="icon-btn" type="button" aria-label="Previous item" onClick={() => go(current - 1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <div className="dots">
            {items.map((item, i) => (
              <button
                key={item._id}
                type="button"
                aria-label={`Show ${item.name}`}
                aria-current={i === current}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button className="icon-btn" type="button" aria-label="Next item" onClick={() => go(current + 1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </dialog>
    </>
  );
}
