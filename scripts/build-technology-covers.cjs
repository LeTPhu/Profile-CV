const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");
const sharpArgument = process.argv.indexOf("--sharp-path");
const sharp = require(sharpArgument >= 0 ? process.argv[sharpArgument + 1] : "sharp");
const root = path.resolve(__dirname, "..");
const assets = path.join(root, "github-public-cv/assets");
const output = path.join(root, "output/technology-covers");
const plans = require("./technology-covers.json");
const sources = require("../github-public-cv/assets/technology-logos/sources.json").assets;
const portfolio = require("../github-public-cv/data/portfolio.json");
const esc = value => String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

function logoData(id) {
  const record = sources.find(asset => asset.id === id);
  if (!record) throw new Error("Missing sourced logo: " + id);
  let content = fs.readFileSync(path.join(assets, "technology-logos", record.file));
  const svg = record.file.endsWith(".svg");
  if (svg) {
    let markup = content.toString("utf8");
    if (record.hex) markup = markup.replace("<path ", `<path fill="#${record.hex}" `);
    // Freeze the upstream favicon's animation in the composed still image.
    markup = markup.replace(/<animate(?:Transform)?\b[\s\S]*?\/>/g, "");
    content = Buffer.from(markup);
  }
  return `data:${svg ? "image/svg+xml" : "image/png"};base64,${content.toString("base64")}`;
}

function symbol(name) {
  const drawings = {
    wave: '<path d="M2 24h7l4-14 7 28 7-34 7 34 6-20 5 6h9"/>',
    network: '<path d="M9 12h16l20 15-20 15H9M25 12v30M9 12v30"/><circle cx="9" cy="12" r="4"/><circle cx="9" cy="42" r="4"/><circle cx="25" cy="12" r="4"/><circle cx="25" cy="42" r="4"/><circle cx="45" cy="27" r="4"/>',
    vision: '<rect x="6" y="6" width="42" height="42" rx="8"/><path d="M12 35l9-11 8 8 8-15 5 18"/><circle cx="18" cy="16" r="3"/>',
    blocks: '<rect x="7" y="7" width="17" height="17" rx="3"/><rect x="30" y="7" width="17" height="17" rx="3"/><rect x="7" y="30" width="17" height="17" rx="3"/><rect x="30" y="30" width="17" height="17" rx="3" stroke-dasharray="3 4" opacity=".5"/>',
    gate: '<path d="M27 4 45 12v14c0 12-18 24-18 24S9 38 9 26V12Z"/><path d="m18 26 6 6 13-13"/>',
    clock: '<circle cx="27" cy="27" r="21"/><path d="M27 13v15l11 6"/>',
    document: '<path d="M12 4h22l10 10v36H12ZM34 4v11h10M20 24h16m-16 8h16m-16 8h11"/>',
    chat: '<path d="M8 9h38v30H22L10 48V39H8Z"/><path d="M16 19h22m-22 9h17"/>',
    video: '<rect x="4" y="8" width="46" height="38" rx="6"/><path d="m22 18 13 9-13 9ZM4 15h8M4 38h8m30-23h8m-8 23h8"/>',
  };
  return `<svg viewBox="0 0 54 54" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${drawings[name] || drawings.network}</svg>`;
}

function document(plan) {
  if (!portfolio.projects.some(project => project.id === plan.id)) throw new Error("Unknown project: " + plan.id);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
  *{box-sizing:border-box}html,body{margin:0;width:1200px;height:800px;overflow:hidden}
  body{font-family:"Bahnschrift","Segoe UI",sans-serif;color:#193a30;background:#f2f5ef}
  .cover{padding:40px;width:1200px;height:800px;--accent:${plan.accent};background:radial-gradient(ellipse at top right,#dce8e580,transparent 65%),#f2f5ef}
  .tiles{height:100%;display:grid;grid-template-columns:repeat(${plan.columns},minmax(0,1fr));grid-template-rows:repeat(${Math.ceil(plan.items.length / plan.columns)},minmax(0,1fr));gap:16px}
  .tile{min-width:0;border:1px solid #dbe3d6;border-radius:20px;background:#fff;padding:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center}
  .mark{width:160px;height:160px;flex-shrink:0;display:grid;place-items:center;color:var(--accent)}
  .mark img,.mark svg{display:block;width:100%;height:100%;object-fit:contain}
  h2{font-size:46px;font-weight:600;letter-spacing:-.6px;line-height:1.15;margin:0;max-width:100%;overflow-wrap:normal}
  .tile.text-only{background:#f8faf5;border-top:4px solid var(--accent);color:var(--accent)}
  .tile.generic .mark{width:104px;height:104px;border-radius:18px;background:#f1f5ef;padding:14px}
  .tiles:has(.tile:nth-child(9)) .mark{width:108px;height:108px}
  .tiles:has(.tile:nth-child(9)) h2{font-size:44px}
  </style></head><body><main class="cover" aria-label="${esc(plan.title)}"><div class="tiles">
  ${plan.items.map(item => `<article class="tile${item.textOnly ? " text-only" : item.logo ? "" : " generic"}">${item.textOnly ? "" : `<div class="mark">${item.logo ? `<img src="${logoData(item.logo)}" alt="${esc(item.name)}">` : symbol(item.symbol)}</div>`}<h2>${esc(item.name)}</h2></article>`).join("")}
  </div></main></body></html>`;
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 800 }, deviceScaleFactor: 1 });
    let total = 0;
    for (const [index, plan] of plans.entries()) {
      const html = document(plan, index);
      fs.writeFileSync(path.join(output, plan.id + ".html"), html);
      await page.setContent(html);
      await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(image => image.decode())); });
      const clipped = await page.locator(".tile").evaluateAll(tiles => tiles.some(tile => tile.scrollWidth > tile.clientWidth || tile.scrollHeight > tile.clientHeight));
      if (clipped) throw new Error("Technology tile content clipped: " + plan.id);
      const png = await page.screenshot({ type: "png", animations: "disabled" });
      fs.writeFileSync(path.join(output, plan.id + ".png"), png);
      const target = path.join(assets, "project-covers", plan.id + "-stack-v2.webp");
      await sharp(png).webp({ quality: 92, effort: 6 }).toFile(target);
      const size = fs.statSync(target).size; total += size;
      console.log(plan.id + ": " + Math.round(size / 1024) + " KB");
    }
    console.log("Seven technology collages: " + Math.round(total / 1024) + " KB");
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
