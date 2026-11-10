"use client";

import { useToday } from "@/hooks/useToday";
import { isUpcoming, type NewsItem } from "@/data/news";
import styles from "./UpcomingTag.module.scss";

/** A small "Upcoming" label for an event that has not happened yet. It shows
 *  nothing for news, for events already held, and in the server-rendered page
 *  (the day is only known in the browser). `className` places it. */
export default function UpcomingTag({
  item,
  className = "",
}: {
  item: Pick<NewsItem, "kind" | "date">;
  className?: string;
}) {
  const today = useToday();
  if (!isUpcoming(item, today)) return null;

  return <span className={`${styles.tag} ${className}`.trim()}>Upcoming</span>;
}
