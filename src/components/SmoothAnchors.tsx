"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const HEADER_OFFSET = 96;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function animateTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const start = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const end = Math.min(
    max,
    Math.max(0, el.getBoundingClientRect().top + start - HEADER_OFFSET),
  );
  const distance = end - start;
  if (reduce || Math.abs(distance) < 2) {
    window.scrollTo(0, end);
    return true;
  }
  const duration = Math.min(1600, Math.max(700, Math.abs(distance) * 0.45));
  const root = document.documentElement;
  root.style.scrollBehavior = "auto";
  const t0 = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / duration);
    window.scrollTo(0, start + distance * easeInOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
    else root.style.scrollBehavior = "";
  };
  requestAnimationFrame(step);
  return true;
}

/** Eased, distance-aware scrolling for every in-site "#section" link,
 *  including links that arrive from another page. */
export default function SmoothAnchors() {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<string | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.target === "_blank") return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!id) return;

      // Capture phase: take over before next/link navigates on its own.
      event.preventDefault();
      event.stopPropagation();
      if (url.pathname === window.location.pathname) {
        if (animateTo(id)) history.pushState(null, "", url.hash);
      } else {
        pending.current = id;
        router.push(url.pathname, { scroll: false });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    const id = pending.current;
    if (!id) return;
    pending.current = null;
    let tries = 0;
    const wait = () => {
      if (document.getElementById(id)) {
        requestAnimationFrame(() => {
          animateTo(id);
          history.replaceState(null, "", `${window.location.pathname}#${id}`);
        });
      } else if (tries++ < 60) {
        requestAnimationFrame(wait);
      }
    };
    wait();
  }, [pathname]);

  return null;
}
