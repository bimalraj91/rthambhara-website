// The announcement shown in the pop-up when a visitor first opens the home
// page (see src/components/AnnouncementModal.tsx).
//
// To feature a new event or news item, update the fields below. Changing `id`
// shows the pop-up again to people who dismissed the previous one. Set
// `announcement` to `null` to switch the pop-up off.

export type Announcement = {
  // Remembered per browser session; change it for every new announcement.
  id: string;
  // Small label above the title, e.g. "Upcoming festival" or "Latest news".
  eyebrow: string;
  title: string;
  // Free text, shown as-is: "13 – 15 November 2026".
  dates: string;
  venue?: string;
  cta: { label: string; href: string };
  // ISO date (yyyy-mm-dd). The pop-up stops appearing the day after.
  showUntil?: string;
};

export const announcement: Announcement | null = {
  id: "dasabdi-mahothsavam-2026",
  eyebrow: "Upcoming festival",
  title: "Dasābdi Mahōthsavam",
  dates: "13 – 15 November 2026",
  venue: "TDM Hall, Ernakulam",
  cta: { label: "Explore events", href: "/news-events" },
  showUntil: "2026-11-15",
};
