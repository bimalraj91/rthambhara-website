"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { announcement, type Announcement } from "@/data/announcement";
import styles from "./AnnouncementModal.module.scss";

// idle    nothing yet (also the state on the server)
// armed   the page has loaded: the closed dialog is mounted and the lotus is
//         downloading, so it is ready the moment the dialog opens
// open    on screen
// leaving the exit animation is playing
// done    dismissed (or never needed)
type Phase = "idle" | "armed" | "open" | "leaving" | "done";

// Measured from the window "load" event. The stage curtain on the home page
// takes about 2.7s to part, so the dialog waits for it.
const ARM_AFTER = 600;
const OPEN_AFTER = 3200;
const OPEN_AFTER_CALM = 1200;
const LEAVE_MS = 280;

const storageKey = (id: string) => `rtambhara:announcement:${id}`;

function wasSeen(id: string) {
  try {
    return sessionStorage.getItem(storageKey(id)) === "1";
  } catch {
    // Storage can be blocked (private windows); just show the dialog.
    return false;
  }
}

function markSeen(id: string) {
  try {
    sessionStorage.setItem(storageKey(id), "1");
  } catch {
    // Ignore.
  }
}

function hasExpired(showUntil?: string) {
  if (!showUntil) return false;
  const end = new Date(`${showUntil}T23:59:59`).getTime();
  return Number.isFinite(end) && Date.now() > end;
}

/** A small card in the style of the hero's glass card, announcing the latest
 *  event or news when the home page opens. It is a native modal <dialog>:
 *  focus stays inside, Escape closes it and the page behind is inert. The page
 *  behind stays sharp and only lightly dimmed. Shown once per browser session. */
export default function AnnouncementModal() {
  return announcement ? <Popup data={announcement} /> : null;
}

function Popup({ data }: { data: Announcement }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pressedOnFrame = useRef(false);
  const titleId = useId();

  // Decide whether to show it, then open it once the page has loaded.
  useEffect(() => {
    if (hasExpired(data.showUntil) || wasSeen(data.id)) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const begin = () => {
      timers.push(window.setTimeout(() => setPhase("armed"), ARM_AFTER));
      timers.push(
        window.setTimeout(
          () => setPhase("open"),
          calm ? OPEN_AFTER_CALM : OPEN_AFTER,
        ),
      );
    };

    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    return () => {
      window.removeEventListener("load", begin);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [data.id, data.showUntil]);

  useEffect(() => {
    if (phase !== "open") return;
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    dialog.showModal();
    // Land on the title so a screen reader announces what this is.
    titleRef.current?.focus({ preventScroll: true });
    markSeen(data.id);
  }, [phase, data.id]);

  // Keep the page from scrolling behind the dialog without shifting it
  // sideways when the scrollbar disappears.
  const locked = phase === "open" || phase === "leaving";
  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    const before = {
      overflow: root.style.overflow,
      gutter: root.style.scrollbarGutter,
    };
    root.style.overflow = "hidden";
    root.style.scrollbarGutter = "stable";

    return () => {
      root.style.overflow = before.overflow;
      root.style.scrollbarGutter = before.gutter;
    };
  }, [locked]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = window.setTimeout(() => {
      dialogRef.current?.close();
      setPhase("done");
    }, LEAVE_MS);

    return () => window.clearTimeout(timer);
  }, [phase]);

  const close = useCallback(
    () => setPhase((current) => (current === "open" ? "leaving" : current)),
    [],
  );

  if (phase === "idle" || phase === "done") return null;

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${phase === "leaving" ? styles.leaving : ""}`}
      aria-labelledby={titleId}
      // Escape: play the exit animation. Where the browser will not let us
      // cancel it, it closes the dialog itself and onClose tidies up.
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={() => setPhase("done")}
      onPointerDown={(event) => {
        pressedOnFrame.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        const onFrame =
          event.target === event.currentTarget && pressedOnFrame.current;
        pressedOnFrame.current = false;
        // A click on the empty area around the card, or on a link inside it.
        if (onFrame || (event.target as Element).closest("a")) close();
      }}
    >
      <div className={styles.card}>
        <button
          type="button"
          className={styles.close}
          onClick={close}
          aria-label="Close announcement"
        >
          <span />
          <span />
        </button>

        <p className={styles.marker}>
          <span className={styles.markerLine} aria-hidden="true" />
          {data.eyebrow}
        </p>

        <h2 id={titleId} ref={titleRef} tabIndex={-1} className={styles.title}>
          {data.title}
        </h2>

        <p className={styles.dates}>{data.dates}</p>
        {data.venue && <p className={styles.venue}>{data.venue}</p>}

        <div className={styles.actions}>
          <Link href={data.cta.href} className={styles.cta}>
            <span>{data.cta.label}</span>
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <Image
          src="/assets/home/lotus.webp"
          alt=""
          width={324}
          height={250}
          sizes="300px"
          loading="eager"
          aria-hidden="true"
          className={styles.lotus}
        />
      </div>
    </dialog>
  );
}
