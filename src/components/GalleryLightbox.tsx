"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import type { GalleryItem } from "@/data/gallery";
import styles from "./GalleryLightbox.module.scss";

type Props = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SWIPE = 70;

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 90, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -90, scale: 0.97 }),
};

export default function GalleryLightbox({
  items,
  index,
  onClose,
  onChange,
}: Props) {
  const open = index !== null;
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbsRef = useRef<HTMLUListElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const [direction, setDirection] = useState(1);
  // False on the server and during hydration, true afterwards.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const total = items.length;
  const current = index !== null ? items[index] : null;

  const go = useCallback(
    (next: number, dir?: number) => {
      if (total === 0) return;
      const target = (next + total) % total;
      setDirection(dir ?? (next >= (index ?? 0) ? 1 : -1));
      onChange(target);
    },
    [index, onChange, total],
  );

  // Lock the page behind the viewer and remember where focus was.
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previous;
      lastFocus.current?.focus?.();
    };
  }, [open]);

  // Keyboard: arrows, Home/End, Escape, and a Tab trap inside the dialog.
  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        go((index ?? 0) + 1, 1);
      } else if (event.key === "ArrowLeft") {
        go((index ?? 0) - 1, -1);
      } else if (event.key === "Home") {
        go(0, -1);
      } else if (event.key === "End") {
        go(total - 1, 1);
      } else if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href]",
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, onClose, open, total]);

  // Warm the neighbours so next/previous feels instant.
  useEffect(() => {
    if (index === null) return;
    [index + 1, index - 1].forEach((i) => {
      const item = items[(i + total) % total];
      if (item) {
        const img = new window.Image();
        img.src = item.src;
      }
    });
  }, [index, items, total]);

  // Keep the active thumbnail in view.
  useEffect(() => {
    if (index === null) return;
    const el = thumbsRef.current?.children[index] as HTMLElement | undefined;
    el?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [index]);

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE) go((index ?? 0) + 1, 1);
    else if (info.offset.x > SWIPE) go((index ?? 0) - 1, -1);
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          key="lightbox"
          ref={dialogRef}
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title}, photo ${(index ?? 0) + 1} of ${total}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <button
            type="button"
            className={styles.backdrop}
            aria-label="Close preview"
            tabIndex={-1}
            onClick={onClose}
          />

          <header className={styles.top}>
            <p className={styles.counter} aria-live="polite">
              <b>{String((index ?? 0) + 1).padStart(2, "0")}</b>
              <span aria-hidden="true">/</span>
              <i>{String(total).padStart(2, "0")}</i>
            </p>
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={onClose}
              aria-label="Close preview"
            >
              <span aria-hidden="true" />
            </button>
          </header>

          <div className={styles.stage}>
            <button
              type="button"
              className={`${styles.arrow} ${styles.prev}`}
              onClick={() => go((index ?? 0) - 1, -1)}
              aria-label="Previous photo"
            >
              <span aria-hidden="true" />
            </button>

            <div className={styles.viewer}>
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.figure
                  key={current.id}
                  className={styles.figure}
                  custom={direction}
                  variants={shouldReduceMotion ? undefined : slide}
                  initial={shouldReduceMotion ? { opacity: 0 } : "enter"}
                  animate={shouldReduceMotion ? { opacity: 1 } : "center"}
                  exit={shouldReduceMotion ? { opacity: 0 } : "exit"}
                  transition={{ duration: 0.5, ease: EASE }}
                  drag={shouldReduceMotion ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.35}
                  onDragEnd={onDragEnd}
                >
                  <div className={styles.frame}>
                    <Image
                      src={current.src}
                      alt={current.alt}
                      fill
                      priority
                      sizes="(max-width: 900px) 94vw, 62vw"
                      className={styles.image}
                      draggable={false}
                    />
                  </div>

                  <figcaption className={styles.details}>
                    <span className={styles.category}>{current.category}</span>
                    <h2>{current.title}</h2>
                    <p>{current.caption}</p>
                    <dl>
                      <div>
                        <dt>Date</dt>
                        <dd>{current.date}</dd>
                      </div>
                      <div>
                        <dt>Venue</dt>
                        <dd>{current.venue}</dd>
                      </div>
                    </dl>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <button
              type="button"
              className={`${styles.arrow} ${styles.next}`}
              onClick={() => go((index ?? 0) + 1, 1)}
              aria-label="Next photo"
            >
              <span aria-hidden="true" />
            </button>
          </div>

          <ul ref={thumbsRef} className={styles.thumbs} aria-label="All photos">
            {items.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={i === index ? styles.thumbActive : undefined}
                  onClick={() => go(i, i > (index ?? 0) ? 1 : -1)}
                  aria-label={`Show ${item.title}`}
                  aria-current={i === index ? "true" : undefined}
                >
                  <Image src={item.src} alt="" fill sizes="64px" />
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
