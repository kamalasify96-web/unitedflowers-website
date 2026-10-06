"use client";

import { ReactNode, useEffect, useLayoutEffect, useRef } from "react";

// Auto-looping row that the visitor can take over:
//   • drifts on its own (about 45 px/s) in an endless loop
//   • stops while the pointer hovers it, while a finger is on it, while the
//     mouse drags it, and for a few seconds after any sideways scroll / swipe
//   • can be dragged with a mouse, swiped on touch, or scrolled with a trackpad
//   • cards stay normal links, so a tap or click opens the page
// It is a real scroll container with three copies of the cards: the visitor is
// always kept inside the middle copy, so wrapping is invisible.

const SPEED = 45; // px per second
const RESUME_MS = 2500;

export default function BrandMarquee({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLDivElement>(null);
  const second = useRef<HTMLDivElement>(null);
  const third = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = box.current;
    const a = first.current;
    const b = second.current;
    if (!el || !a || !b) return;
    // The visitor sits in the middle copy, so that one stays fully interactive. The
    // outer copies only exist to make the loop seamless: hide them from keyboard and
    // screen readers (but not from the mouse, in case a card is dragged into view).
    for (const copy of [a, third.current]) copy?.querySelectorAll("a").forEach((l) => l.setAttribute("tabindex", "-1"));
    el.scrollLeft = b.offsetLeft - a.offsetLeft; // start on the middle copy
  }, []);

  useEffect(() => {
    const el = box.current;
    const a = first.current;
    const b = second.current;
    if (!el || !a || !b) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const half = () => b.offsetLeft - a.offsetLeft; // width of one copy
    let pos = el.scrollLeft;
    let lastSet = pos;
    let lastInteract = 0;
    let hover = false;
    let touching = false;
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;
    let focusIn = false;

    const touch = () => {
      lastInteract = performance.now();
    };

    const wrap = (v: number) => {
      const h = half();
      if (h <= 0) return v;
      while (v >= 2 * h) v -= h;
      while (v < h) v += h;
      return v;
    };

    // The visitor scrolled: keep them in the middle copy and remember we were interrupted.
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - lastSet) <= 1.5) return; // our own movement
      touch();
      const w = wrap(el.scrollLeft);
      if (w !== el.scrollLeft) el.scrollLeft = w;
      pos = el.scrollLeft;
      lastSet = pos;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) touch();
    };
    const onTouchStart = () => {
      touching = true;
      touch();
    };
    const onTouchEnd = () => {
      touching = false;
      touch();
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hover = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        hover = false;
        touch();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      touch();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) moved = true;
      if (moved) {
        el.scrollLeft = startScroll - dx;
        touch();
      }
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      touch();
    };
    // A drag must not open the card that happened to be under the cursor.
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    const onFocusIn = () => {
      focusIn = true;
    };
    const onFocusOut = () => {
      focusIn = false;
      touch();
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);

    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - prev, 100);
      prev = now;
      const idle = now - lastInteract > RESUME_MS;
      if (!reduce && idle && !hover && !touching && !dragging && !focusIn && !document.hidden) {
        pos = wrap(pos + (SPEED * dt) / 1000);
        lastSet = pos;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft; // stay in sync while the visitor is in control
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return (
    <div
      ref={box}
      dir="ltr"
      className="flex cursor-grab select-none overflow-x-auto overscroll-x-contain px-0 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
    >
      <div ref={first} className="flex shrink-0 gap-5 pe-5" aria-hidden="true">
        {children}
      </div>
      <div ref={second} className="flex shrink-0 gap-5 pe-5">
        {children}
      </div>
      <div ref={third} className="flex shrink-0 gap-5 pe-5" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
