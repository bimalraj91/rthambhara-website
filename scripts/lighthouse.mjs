// Runs Lighthouse against a running production server and writes a summary.
//
//   npm run build && npm run start -- -p 3100   (in one terminal)
//   npm run lighthouse                          (in another)
//
// Options (environment variables):
//   LH_BASE_URL   site to test            (default http://localhost:3100)
//   LH_PRESET     mobile | desktop | both (default mobile)
//   CHROME_PATH   Chrome/Chromium binary  (default: Lighthouse finds Chrome)
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const base = (process.env.LH_BASE_URL ?? "http://localhost:3100").replace(/\/$/, "");
const preset = process.env.LH_PRESET ?? "mobile";
const presets = preset === "both" ? ["mobile", "desktop"] : [preset];

const pages = [
  ["Home", "/"],
  ["About us", "/about-us"],
  ["Programs", "/programs"],
  ["Gurus", "/gurus"],
  ["News & Events", "/news-events"],
  ["Event detail", "/news-events/nritya-sandhya"],
  ["Blogs", "/blogs"],
  ["Blog detail", "/blogs/the-timeless-beauty-of-bharatanatyam"],
  ["Gallery", "/gallery"],
  ["Contact us", "/contact-us"],
];

const outDir = "lighthouse-reports";
mkdirSync(outDir, { recursive: true });

const rows = [];

for (const mode of presets) {
  for (const [name, path] of pages) {
    const file = `${outDir}/${name.toLowerCase().replace(/[^a-z]+/g, "-")}-${mode}.json`;
    const args = [
      "--yes",
      "lighthouse@12",
      `${base}${path}`,
      "--quiet",
      "--output=json",
      `--output-path=${file}`,
      "--chrome-flags=--headless=new --no-sandbox",
      "--only-categories=performance,accessibility,best-practices,seo",
      ...(mode === "desktop" ? ["--preset=desktop"] : []),
    ];
    console.log(`Testing ${name} (${mode})...`);
    const result = spawnSync("npx", args, { stdio: "ignore", shell: true });
    if (result.status !== 0) {
      console.log(`  failed (exit ${result.status})`);
      continue;
    }
    const report = JSON.parse(readFileSync(file, "utf8"));
    const score = (id) => Math.round(report.categories[id].score * 100);
    const audit = (id) => report.audits[id].displayValue ?? "-";
    rows.push({
      mode,
      name,
      path,
      performance: score("performance"),
      accessibility: score("accessibility"),
      bestPractices: score("best-practices"),
      seo: score("seo"),
      lcp: audit("largest-contentful-paint"),
      tbt: audit("total-blocking-time"),
      cls: audit("cumulative-layout-shift"),
    });
  }
}

const lines = [
  "# Lighthouse scores",
  "",
  `Tested ${new Date().toISOString().slice(0, 10)} against ${base}.`,
  "",
];

for (const mode of presets) {
  lines.push(
    `## ${mode === "mobile" ? "Mobile (simulated slow 4G, 4x CPU)" : "Desktop"}`,
    "",
    "| Page | Perf | A11y | Best practices | SEO | LCP | TBT | CLS |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
  );
  for (const r of rows.filter((row) => row.mode === mode)) {
    lines.push(
      `| ${r.name} | ${r.performance} | ${r.accessibility} | ${r.bestPractices} | ${r.seo} | ${r.lcp} | ${r.tbt} | ${r.cls} |`,
    );
  }
  lines.push("");
}

writeFileSync(`${outDir}/SUMMARY.md`, lines.join("\n"));
console.log(`\nWrote ${outDir}/SUMMARY.md`);
