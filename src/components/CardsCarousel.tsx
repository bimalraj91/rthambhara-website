"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import styles from "./CardsCarousel.module.scss";

const PHONE = "(max-width: 759px)";

type Props = {
  children: ReactNode;
  // The track: lays the cards out in a row on phones, and as the page's own
  // grid on larger screens (where this component adds nothing).
  className?: string;
  label: string;
};

/** On phones the cards form a swipeable carousel: one full card with the next
 *  one peeking in. Dragging follows the finger, flicks carry on a little, and
 *  the track always settles on a card with a soft spring. On larger screens
 *  the wrapper disappears and the cards keep their normal layout. */
export default function CardsCarousel({ children, className, label }: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [phone, setPhone] = useState(false);
  const [snaps, setSnaps] = useState<number[]>([0]);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const query = window.matchMedia(PHONE);
    const sync = () => setPhone(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Where each card needs the track to sit, measured from the real layout.
  useEffect(() => {
    const el = track.current;
    const box = viewport.current;
    if (!phone || !el || !box) {
      x.set(0);
      return;
    }

    const measure = () => {
      const max = Math.max(0, el.scrollWidth - box.clientWidth);
      const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      const cards = Array.from(el.children) as HTMLElement[];
      const next = cards.map((card) =>
        Math.round(-Math.min(Math.max(0, card.offsetLeft - pad), max)),
      );
      setSnaps(next);
      x.set(Math.max(-max, Math.min(0, x.get())));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    observer.observe(el);
    return () => observer.disconnect();
  }, [phone, x, count]);

  const nearest = useCallback(
    (value: number) => {
      let best = 0;
      snaps.forEach((snap, i) => {
        if (Math.abs(snap - value) < Math.abs(snaps[best] - value)) best = i;
      });
      return best;
    },
    [snaps],
  );

  useMotionValueEvent(x, "change", (value) => setActive(nearest(value)));

  const settle = useCallback(
    (index: number) => {
      const target = snaps[Math.max(0, Math.min(snaps.length - 1, index))] ?? 0;
      animate(
        x,
        target,
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 240, damping: 30, mass: 0.9 },
      );
    },
    [snaps, x, reduce],
  );

  const onDragEnd = (_: unknown, info: PanInfo) => {
    // Let a flick carry the track a little further, then land on the nearest card.
    settle(nearest(x.get() + info.velocity.x * 0.2));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!phone) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      settle(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      settle(active - 1);
    }
  };

  const max = Math.abs(snaps[snaps.length - 1] ?? 0);

  return (
    <>
      <div
        ref={viewport}
        className={styles.viewport}
        role={phone ? "group" : undefined}
        aria-roledescription={phone ? "carousel" : undefined}
        aria-label={phone ? label : undefined}
        tabIndex={phone ? 0 : undefined}
        onKeyDown={onKeyDown}
      >
        <motion.div
          ref={track}
          className={className}
          style={{ x }}
          drag={phone ? "x" : false}
          dragDirectionLock
          dragMomentum={false}
          dragElastic={0.14}
          dragConstraints={{ left: -max, right: 0 }}
          onDragEnd={onDragEnd}
        >
          {children}
        </motion.div>
      </div>

      <div className={styles.dots} aria-hidden={!phone}>
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
            aria-label={`Show card ${i + 1} of ${snaps.length}`}
            tabIndex={phone ? 0 : -1}
            onClick={() => settle(i)}
          />
        ))}
      </div>
    </>
  );
}
