"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./AmbientMusic.module.scss";

// A calm, synthesised Bharatanatyam ambience: a tanpura drone, a soft
// mridangam, temple bells and a flute-like melody in raga
// Mayamalavagowla. Everything is generated with the Web Audio API, so no
// audio file is needed.
const SA = 146.83; // D3
const STRINGS = [SA * 1.5, SA * 2, SA * 2, SA / 2];
const PLUCK_GAP = 1.05; // seconds between drone plucks
const STEP = 0.27; // one sixteenth note (a beat is four steps)
const CYCLE = 32; // Adi tala: 8 beats x 4 steps
const STORE_KEY = "rtambhara-music-muted";

// Mridangam strokes, one character per step: D dhin, t ta, k ki, n na.
const MRIDANGAM = "D.......k.......D.......k.t.....";

// Raga Mayamalavagowla: S r G m P d N S'.
const R = {
  S: 1,
  r: 16 / 15,
  G: 5 / 4,
  m: 4 / 3,
  P: 3 / 2,
  d: 8 / 5,
  N: 15 / 8,
  H: 2,
};
type Note = [step: number, degree: keyof typeof R, length: number];
const PHRASES: Note[][] = [
  [
    [0, "S", 4],
    [4, "r", 2],
    [6, "G", 2],
    [8, "m", 4],
    [12, "G", 2],
    [14, "r", 2],
    [16, "G", 2],
    [18, "m", 2],
    [20, "P", 4],
    [24, "m", 2],
    [26, "G", 2],
    [28, "r", 2],
    [30, "S", 2],
  ],
  [
    [0, "P", 4],
    [4, "d", 2],
    [6, "P", 2],
    [8, "H", 4],
    [12, "N", 2],
    [14, "d", 2],
    [16, "P", 2],
    [18, "m", 2],
    [20, "G", 4],
    [24, "m", 2],
    [26, "G", 2],
    [28, "r", 2],
    [30, "S", 2],
  ],
];

type Engine = { ctx: AudioContext; master: GainNode; timer: number };

function createEngine(): Engine {
  const ctx = new AudioContext();

  const master = ctx.createGain();
  master.gain.value = 0;

  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 2400;

  // A soft echo gives the instruments some room.
  const delay = ctx.createDelay(1);
  delay.delayTime.value = 0.42;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.5;
  const wet = ctx.createGain();
  wet.gain.value = 0.5;
  delay.connect(feedback).connect(delay);
  delay.connect(wet).connect(master);

  const drums = ctx.createGain();
  drums.gain.value = 0.32;
  drums.connect(master);
  drums.connect(delay);

  tone.connect(master);
  tone.connect(delay);
  master.connect(ctx.destination);

  // Bright, buzzing harmonics, like the jivari bridge of a tanpura.
  const real = new Float32Array(28);
  const imag = new Float32Array(28);
  for (let n = 1; n < 28; n += 1) imag[n] = 1 / n ** 0.85;
  const wave = ctx.createPeriodicWave(real, imag);

  const noise = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
  const nd = noise.getChannelData(0);
  for (let i = 0; i < nd.length; i += 1) nd[i] = Math.random() * 2 - 1;

  const pluck = (freq: number, at: number) => {
    const osc = ctx.createOscillator();
    osc.setPeriodicWave(wave);
    osc.frequency.value = freq;
    osc.detune.value = (Math.random() - 0.5) * 6;
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, at);
    env.gain.exponentialRampToValueAtTime(0.4, at + 0.02);
    env.gain.exponentialRampToValueAtTime(0.0001, at + 5.5);
    osc.connect(env).connect(tone);
    osc.start(at);
    osc.stop(at + 5.6);
  };

  // Drum strokes: a pitched body that drops quickly plus a short slap.
  const stroke = (kind: string, at: number) => {
    const spec: Record<string, [number, number, number]> = {
      D: [92, 0.55, 0.7],
      t: [190, 0.2, 0.5],
      k: [330, 0.09, 0.4],
      n: [250, 0.14, 0.45],
    };
    const [f, len, vol] = spec[kind];
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(f * 1.7, at);
    osc.frequency.exponentialRampToValueAtTime(f, at + 0.05);
    const env = ctx.createGain();
    env.gain.setValueAtTime(vol, at);
    env.gain.exponentialRampToValueAtTime(0.0001, at + len);
    osc.connect(env).connect(drums);
    osc.start(at);
    osc.stop(at + len + 0.05);

    const src = ctx.createBufferSource();
    src.buffer = noise;
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = kind === "D" ? 400 : 1800;
    const nEnv = ctx.createGain();
    nEnv.gain.setValueAtTime(vol * 0.35, at);
    nEnv.gain.exponentialRampToValueAtTime(0.0001, at + 0.04);
    src.connect(band).connect(nEnv).connect(drums);
    src.start(at);
  };

  // The thalam: a metallic tick on every beat, firmer on the first.
  const tick = (at: number, accent: boolean) => {
    if (!accent) return;
    for (const [mult, vol] of [
      [1, 0.06],
      [2.76, 0.03],
    ] as const) {
      const osc = ctx.createOscillator();
      osc.frequency.value = 1046 * mult;
      const env = ctx.createGain();
      env.gain.setValueAtTime(vol, at);
      env.gain.exponentialRampToValueAtTime(0.0001, at + 3.2);
      osc.connect(env).connect(drums);
      osc.start(at);
      osc.stop(at + 3.3);
    }
  };

  // Flute-like melody: a breathy note that glides in from the previous one.
  let last = SA * 2;
  const melody = (ratio: number, at: number, len: number) => {
    const freq = SA * 2 * ratio;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(last, at);
    osc.frequency.exponentialRampToValueAtTime(freq, at + 0.18);
    last = freq;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 5.2;
    const depth = ctx.createGain();
    depth.gain.value = 9;
    lfo.connect(depth).connect(osc.detune);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(1800, at);
    lp.frequency.exponentialRampToValueAtTime(1100, at + len);
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, at);
    env.gain.exponentialRampToValueAtTime(0.16, at + 0.12);
    env.gain.setValueAtTime(0.16, at + len * 0.7);
    env.gain.exponentialRampToValueAtTime(0.0001, at + len + 0.6);
    osc.connect(lp).connect(env).connect(tone);
    osc.start(at);
    lfo.start(at);
    osc.stop(at + len + 0.7);
    lfo.stop(at + len + 0.7);
  };

  let nextStep = ctx.currentTime + 0.15;
  let stepIndex = 0;
  let nextPluck = ctx.currentTime + 0.1;
  let pluckIndex = 0;

  const timer = window.setInterval(() => {
    while (nextPluck < ctx.currentTime + 0.6) {
      pluck(STRINGS[pluckIndex % STRINGS.length], nextPluck);
      nextPluck += PLUCK_GAP + (pluckIndex % STRINGS.length === 3 ? 0.55 : 0);
      pluckIndex += 1;
    }

    while (nextStep < ctx.currentTime + 0.6) {
      const inCycle = stepIndex % CYCLE;
      const cycle = Math.floor(stepIndex / CYCLE);

      if (inCycle % 4 === 0) tick(nextStep, inCycle === 0);

      const hit = MRIDANGAM[inCycle];
      if (hit && hit !== ".") stroke(hit, nextStep);

      // The melody enters after the first cycle of rhythm alone.
      if (cycle >= 1) {
        const phrase = PHRASES[(cycle - 1) % PHRASES.length];
        for (const [at, degree, len] of phrase) {
          if (at === inCycle) melody(R[degree], nextStep, len * STEP * 1.4);
        }
      }

      nextStep += STEP;
      stepIndex += 1;
    }
  }, 100);

  return { ctx, master, timer };
}

export default function AmbientMusic() {
  const engine = useRef<Engine | null>(null);
  const [playing, setPlaying] = useState(false);
  const mutedByUser = useRef(false);

  const fade = useCallback((to: number, seconds: number) => {
    const e = engine.current;
    if (!e) return;
    const now = e.ctx.currentTime;
    e.master.gain.cancelScheduledValues(now);
    e.master.gain.setValueAtTime(e.master.gain.value, now);
    e.master.gain.linearRampToValueAtTime(to, now + seconds);
  }, []);

  const start = useCallback(async () => {
    if (!engine.current) engine.current = createEngine();
    const { ctx } = engine.current;
    if (ctx.state !== "running") {
      try {
        await ctx.resume();
      } catch {
        return false;
      }
    }
    if (ctx.state !== "running") return false;
    fade(0.28, 3);
    setPlaying(true);
    return true;
  }, [fade]);

  const stop = useCallback(() => {
    fade(0, 0.8);
    setPlaying(false);
  }, [fade]);

  useEffect(() => {
    try {
      mutedByUser.current = localStorage.getItem(STORE_KEY) === "1";
    } catch {}
    if (mutedByUser.current) return;

    // Browsers only allow sound after a gesture, so try straight away and fall
    // back to the visitor's first tap, key press or scroll.
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
    start().then((ok) => ok && cleanup());

    return cleanup;
  }, [start]);

  useEffect(
    () => () => {
      const e = engine.current;
      if (!e) return;
      window.clearInterval(e.timer);
      e.ctx.close().catch(() => {});
      engine.current = null;
    },
    [],
  );

  // Stop the drone when the tab is hidden.
  useEffect(() => {
    const onVisibility = () => {
      const e = engine.current;
      if (!e) return;
      if (document.hidden) e.ctx.suspend();
      else if (playing) e.ctx.resume();
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
    <button
      type="button"
      className={`${styles.toggle} ${playing ? styles.on : ""}`}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Mute background music" : "Play background music"}
      title={playing ? "Mute music" : "Play music"}
    >
      <span className={styles.bars} aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}
