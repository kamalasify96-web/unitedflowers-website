"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import CatalogueButton from "@/components/ui/CatalogueButton";
import { asset } from "@/lib/assets";

// Scroll-scrubbed hero (the Al Taimi / Quick Route technique). The film is a
// Higgsfield animation of the brand-book Sunflower Drop mark: the drop leaves
// the flower, falls and splashes into a growing pool of oil. The model cut to
// full gold too abruptly, so the clip stops at the splash and the site draws
// the final gold fill itself, growing from the splash point.
//   0.00–0.04  rest on the first frame
//   0.04–0.80  video scrubs 0 → end (desktop). iOS Safari cannot scrub a
//              <video> by scroll, so phones draw a 128-frame image sequence
//              (public/video/seq) to a canvas instead.
//   0.00–0.16  hero copy fades out
//   0.76–0.96  gold circle grows from the splash until it covers the screen
//   0.86–0.98  story headline fades in on the gold

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// Source geometry: where the flower and the splash sit inside each source.
// The phone sequence is a 1200×1080 crop (x 720–1920) of the 1920×1080 film.
const SRCS = {
  video: { w: 1600, h: 900, markX: 0.698, splashX: 0.7, splashY: 0.97 },
  seq: { w: 720, h: 648, markX: 0.517, splashX: 0.52, splashY: 0.97 },
};
const DESKTOP_POS = 0.72; // object-position on wide screens (mark right, copy left)
const FRAMES = 128;
const frameUrl = (i: number) => asset(`/video/seq/f${String(i + 1).padStart(3, "0")}.webp`);
const BG = "#FEF4E0"; // the film's background cream

type Props = {
  eyebrow: string;
  title: string;
  sub: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  catalogueView: string;
  catalogueDownload: string;
  scrollLabel: string;
  outroTitle: string;
  outroSub: string;
  /** Arabic: mirror the film so the flower sits on the left, away from the right-aligned copy. */
  rtl?: boolean;
};

const SRC = {
  desktop: asset("/video/hero-drop-1600.mp4"),
  poster: asset("/video/hero-drop-poster.webp"),
};

function Copy({ eyebrow, title, sub, primary, secondary, catalogueView, catalogueDownload }: Props) {
  return (
    <>
      <div className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[.22em] text-grove">
        <span className="h-px w-10 bg-grove/50" />
        {eyebrow}
      </div>
      <h1 className="font-display text-[clamp(3rem,8vw,7.25rem)] font-extrabold leading-[.92] tracking-[-0.045em] text-deep">{title}</h1>
      <p className="mt-6 max-w-md text-[17px] leading-relaxed text-deep/75 sm:text-lg">{sub}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={primary.href}
          className="group inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3.5 text-[15px] font-semibold text-cream transition-colors hover:bg-grove"
        >
          {primary.label}
          <span className="inline-block transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">→</span>
        </Link>
        <Link
          href={secondary.href}
          className="inline-flex items-center rounded-full border-[1.5px] border-deep/80 px-6 py-3.5 text-[15px] font-semibold text-deep transition-colors hover:bg-deep hover:text-cream"
        >
          {secondary.label}
        </Link>
      </div>
      <div className="mt-4">
        <CatalogueButton view={catalogueView} download={catalogueDownload} />
      </div>
    </>
  );
}

export default function VideoHero(props: Props) {
  const reduce = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [mobile, setMobile] = useState(false);
  const geo = useRef({ x: 0, y: 0, reach: 1 });
  const [splash, setSplash] = useState<{ x: number; y: number } | null>(null);
  const [pos, setPos] = useState(DESKTOP_POS);
  const { scrollYProgress: p } = useScroll({ target: container, offset: ["start start", "end end"] });

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const src = mobile ? SRCS.seq : SRCS.video;

  // Map the splash point from source space to screen space (object-fit: cover).
  useLayoutEffect(() => {
    if (reduce) return;
    const measure = () => {
      const el = stage.current;
      const fr = frame.current;
      if (!el || !fr) return;
      // The video box is the full stage on desktop and the top half on phones.
      const W = el.clientWidth;
      const H = el.clientHeight;
      const fw = fr.clientWidth;
      const fh = fr.clientHeight;
      const s = Math.max(fw / src.w, fh / src.h);
      const rw = src.w * s;
      const rh = src.h * s;
      // Wide screens keep the mark on the right; on tall (phone) screens centre it.
      const px = fw / fh < 1 && rw > fw ? Math.min(1, Math.max(0, (fw / 2 - src.markX * rw) / (fw - rw))) : DESKTOP_POS;
      setPos(px);
      // Mirrored (Arabic, wide screens): the splash point flips with the picture.
      const inFrame = (fw - rw) * px + rw * src.splashX;
      const x = fr.offsetLeft + (props.rtl && !mobile ? fw - inFrame : inFrame);
      const y = fr.offsetTop + (fh - rh) * 0.5 + rh * src.splashY;
      geo.current = { x, y, reach: (Math.hypot(Math.max(x, W - x), Math.max(y, H - y)) * 2) / 100 + 1 };
      setSplash({ x, y });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stage.current) ro.observe(stage.current);
    if (frame.current) ro.observe(frame.current);
    return () => ro.disconnect();
  }, [reduce, src]);

  // Function transforms on purpose: framer-motion 12 hands range-mapped
  // opacity to a native ScrollTimeline that ignores the target offsets.
  const copyOpacity = useTransform(p, (v) => 1 - clamp(v / 0.16));
  const copyY = useTransform(p, (v) => -clamp(v / 0.16) * 60);
  const hint = useTransform(p, (v) => 1 - clamp(v / 0.05));
  const fill = useTransform(p, (v) => easeInOut(clamp((v - 0.76) / 0.2)) * geo.current.reach);
  const outroOpacity = useTransform(p, (v) => clamp((v - 0.86) / 0.12));
  const outroY = useTransform(p, (v) => (1 - clamp((v - 0.86) / 0.12)) * 40);

  // Scrub: ease currentTime toward the scroll target each frame so fast
  // scrolling still looks smooth (the all-intra encode makes seeks cheap).
  useEffect(() => {
    const v = video.current;
    if (!v || reduce || mobile) return;
    let raf = 0;
    let current = 0;
    const tick = () => {
      if (v.duration) {
        const target = clamp((p.get() - 0.04) / 0.76) * (v.duration - 0.04);
        current += (target - current) * 0.2;
        if (Math.abs(target - current) < 0.002) current = target;
        if (Math.abs(v.currentTime - current) > 0.001) v.currentTime = current;
      }
      raf = requestAnimationFrame(tick);
    };
    v.pause();
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [p, reduce, mobile]);

  // Phones: draw the frame sequence to a canvas, easing toward the scroll
  // position. Frames load in order so the first one paints immediately.
  useEffect(() => {
    const cv = canvas.current;
    const fr = frame.current;
    if (!cv || !fr || reduce || !mobile) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAMES; i++) {
      const im = new Image();
      im.decoding = "async";
      im.src = frameUrl(i);
      imgs.push(im);
    }
    let raf = 0;
    let current = 0;
    let drawn = -1;
    let size = "";
    const draw = (force: boolean) => {
      const fw = fr.clientWidth;
      const fh = fr.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      const key = `${fw}x${fh}x${dpr}`;
      if (key !== size) {
        size = key;
        cv.width = Math.round(fw * dpr);
        cv.height = Math.round(fh * dpr);
        force = true;
      }
      const want = Math.round(current);
      // fall back to the nearest earlier frame that has finished loading
      let i = want;
      while (i > 0 && !(imgs[i].complete && imgs[i].naturalWidth)) i--;
      if (!force && i === drawn) return;
      const im = imgs[i];
      if (!(im.complete && im.naturalWidth)) return;
      drawn = i;
      const s = Math.max(fw / SRCS.seq.w, fh / SRCS.seq.h);
      const rw = SRCS.seq.w * s;
      const rh = SRCS.seq.h * s;
      const px = rw > fw ? Math.min(1, Math.max(0, (fw / 2 - SRCS.seq.markX * rw) / (fw - rw))) : 0.5;
      ctx.drawImage(im, (fw - rw) * px * dpr, (fh - rh) * 0.5 * dpr, rw * dpr, rh * dpr);
    };
    const tick = () => {
      const target = clamp((p.get() - 0.04) / 0.76) * (FRAMES - 1);
      current += (target - current) * 0.25;
      if (Math.abs(target - current) < 0.05) current = target;
      draw(false);
      raf = requestAnimationFrame(tick);
    };
    imgs[0].onload = () => draw(true);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [p, reduce, mobile]);

  if (reduce) {
    return (
      <section className="relative overflow-hidden" style={{ background: BG }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SRC.poster} alt="" className={`absolute inset-0 h-full w-full object-cover object-[72%_50%] ${props.rtl ? "-scale-x-100" : ""}`} />
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-36">
          <div className="max-w-xl">
            <Copy {...props} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Phones: the copy scrolls normally, and the animation pins below it */}
      <div className="px-5 pb-10 pt-8 md:hidden" style={{ background: BG }}>
        <Copy {...props} />
      </div>
    <div ref={container} className="relative h-[320vh]">
      <div ref={stage} className="sticky top-[76px] h-[calc(100svh-76px)] overflow-hidden" style={{ background: BG }}>
        <div ref={frame} className="absolute inset-0">
          {mobile ? (
            <canvas ref={canvas} className="h-full w-full" aria-hidden="true" />
          ) : (
            <video
              ref={video}
              className="h-full w-full object-cover"
              style={{ objectPosition: `${pos * 100}% 50%`, transform: props.rtl ? "scaleX(-1)" : undefined }}
              poster={SRC.poster}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source src={SRC.desktop} type="video/mp4" />
            </video>
          )}
        </div>

        <motion.div style={{ opacity: copyOpacity, y: copyY }} className="relative mx-auto hidden h-full max-w-7xl items-center px-5 md:flex lg:px-8">
          <div className="max-w-xl">
            <Copy {...props} />
          </div>
        </motion.div>

        {/* gold fill growing from the splash point */}
        {splash && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute h-[100px] w-[100px] rounded-full bg-gold"
            style={{ left: splash.x - 50, top: splash.y - 50, scale: fill }}
          />
        )}

        <motion.div
          style={{ opacity: outroOpacity, y: outroY }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
        >
          <h2 className="max-w-5xl font-display text-[clamp(2.4rem,6.5vw,5.5rem)] font-extrabold leading-[.95] tracking-[-0.04em] text-deep">
            {props.outroTitle}
          </h2>
          <p className="mt-6 text-lg font-medium text-deep/80">{props.outroSub}</p>
        </motion.div>

        <motion.div
          style={{ opacity: hint }}
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[.25em] text-deep/50 lg:flex"
        >
          {props.scrollLabel}
          <span className="h-10 w-px animate-pulse bg-deep/30" />
        </motion.div>
      </div>
    </div>
    </>
  );
}
