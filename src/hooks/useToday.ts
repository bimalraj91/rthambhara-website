"use client";

import { useSyncExternalStore } from "react";

// The date only changes at midnight, so there is nothing to subscribe to.
function subscribe() {
  return () => {};
}

// The visitor's local date as yyyy-mm-dd, the same shape as the dates in
// src/data/news.ts, so the two compare as plain strings.
function today() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/** Today's date, or `null` while the page is rendering on the server.
 *
 *  The server has no idea which day the visitor is looking at, and a page that
 *  is built ahead of time would freeze the answer on the day it was built. So
 *  "is this event still to come?" is decided in the browser, after the page
 *  loads, and the server-rendered page simply leaves those labels out. */
export function useToday(): string | null {
  return useSyncExternalStore(subscribe, today, () => null);
}
