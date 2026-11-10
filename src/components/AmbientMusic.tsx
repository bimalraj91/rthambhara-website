"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./AmbientMusic.module.scss";

const SRC = "/assets/music/intro-music.mp3";
const VOLUME = 0.4;
const FADE_MS = 2500;
const STORE_KEY = "rtambhara-music-muted";

export default function AmbientMusic() {
  const audio = useRef<HTMLAudioElement>(null);
  const fadeTimer = useRef(0);
  const mutedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);

  const fadeTo = useCallback((to: number, ms: number, done?: () => void) => {
    const el = audio.current;
    if (!el) return;
    window.clearInterval(fadeTimer.current);
    const from = el.volume;
    const began = performance.now();
    fadeTimer.current = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - began) / ms);
      el.volume = from + (to - from) * t;
      if (t === 1) {
        window.clearInterval(fadeTimer.current);
        done?.();
      }
    }, 50);
  }, []);

  const start = useCallback(async () => {
    const el = audio.current;
    if (!el) return false;
    try {
      el.muted = false;
      if (el.paused) {
        el.volume = 0;
        await el.play();
      } else {
        el.volume = 0;
      }
    } catch {
      return false; // blocked until the visitor interacts
    }
    fadeTo(VOLUME, FADE_MS);
    setPlaying(true);
    return true;
  }, [fadeTo]);

  const stop = useCallback(() => {
    setPlaying(false);
    fadeTo(0, 700, () => audio.current?.pause());
  }, [fadeTo]);

  useEffect(() => {
    try {
      mutedByUser.current = localStorage.getItem(STORE_KEY) === "1";
    } catch {}
    if (mutedByUser.current) return;

    // Browsers only allow sound after a gesture, so the music starts on the
    // visitor's first tap, key press or scroll. The 3MB track is not fetched
    // until then (preload="none"), which keeps the first paint fast.
    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    const cleanup = () =>
      events.forEach((ev) => window.removeEventListener(ev, onGesture));
    const onGesture = async () => {
      if (mutedByUser.current) return cleanup();
      if (await start()) cleanup();
    };
    events.forEach((ev) =>
      window.addEventListener(ev, onGesture, { passive: true }),
    );
    const el = audio.current;

    return () => {
      cleanup();
      window.clearInterval(fadeTimer.current);
      el?.pause();
    };
  }, [start]);

  // Pause while the tab is hidden.
  useEffect(() => {
    const onVisibility = () => {
      const el = audio.current;
      if (!el) return;
      if (document.hidden) el.pause();
      else if (playing) el.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [playing]);

  const toggle = async () => {
    if (playing) {
      mutedByUser.current = true;
      try {
        localStorage.setItem(STORE_KEY, "1");
      } catch {}
      stop();
    } else {
      mutedByUser.current = false;
      try {
        localStorage.removeItem(STORE_KEY);
      } catch {}
      await start();
    }
  };

  return (
    <>
      <audio ref={audio} src={SRC} loop preload="none" />
      <button
        type="button"
        className={`${styles.toggle} ${playing ? styles.on : ""}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Mute background music" : "Play background music"}
        title={playing ? "Mute music" : "Play music"}
      >
        {/* Both icons sit in the same spot and cross-fade: the speaker with
            sound waves while the music plays, the speaker with a cross when it
            is muted. */}
        <svg
          className={`${styles.icon} ${styles.iconOn}`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
          <path className={styles.waveNear} d="M15.2 9.2a4 4 0 0 1 0 5.6" />
          <path className={styles.waveFar} d="M18.2 6.4a8 8 0 0 1 0 11.2" />
        </svg>
        <svg
          className={`${styles.icon} ${styles.iconOff}`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
          <path d="m16 9.5 5 5" />
          <path d="m21 9.5-5 5" />
        </svg>
      </button>
    </>
  );
}
