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

function document(plan, index) {
  const project = portfolio.projects.find(item => item.id === plan.id);
  if (!project) throw new Error("Unknown project: " + plan.id);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
  *{box-sizing:border-box}html,body{margin:0;width:1200px;height:800px;overflow:hidden}
  body{font-family:"Bahnschrift","Segoe UI",sans-serif;color:#193a30;background:#f4f5ef}
  .cover{padding:48px 58px 34px;width:1200px;height:800px;position:relative;display:flex;flex-direction:column;--accent:${plan.accent};background:radial-gradient(ellipse at 100% 0%,#dce8e580,transparent 50%),linear-gradient(125deg,#fbfbf7,#eef2ec)}
  .cover:before{content:"";position:absolute;width:160px;height:160px;right:-40px;top:-75px;border:30px solid var(--accent);border-radius:50%;opacity:.10}
  .eyebrow{display:flex;align-items:center;justify-content:space-between;font-size:18px;letter-spacing:2px;color:#60726a;font-weight:600;margin-bottom:12px}
  .eyebrow b{font-size:17px;color:var(--accent);letter-spacing:1px}
  h1{font-size:54px;letter-spacing:-1.5px;line-height:1.1;margin:0;font-weight:650;color:#193a30}
  .subtitle{font-size:23px;line-height:1.4;margin:10px 0 23px;color:#596c64}
  .tiles{display:grid;grid-template-columns:repeat(${plan.columns},minmax(0,1fr));grid-template-rows:repeat(${Math.ceil(plan.items.length / plan.columns)},minmax(0,1fr));gap:16px;flex:1;min-height:0}
  .tile{min-width:0;border:1px solid #dce3db;border-radius:17px;background:#fff;box-shadow:0 5px 0 #dbe3d420;padding:15px 20px;display:flex;align-items:center;gap:18px}
  .mark{width:64px;height:64px;flex-shrink:0;display:grid;place-items:center;color:var(--accent)}
  .mark img,.mark svg{display:block;max-width:100%;max-height:100%;width:100%;height:100%;object-fit:contain}
  .tile h2{font-size:27px;font-weight:600;letter-spacing:-.5px;line-height:1.2;margin:0;overflow-wrap:normal}
  .tile p{font-size:17px;color:#6a7971;margin:8px 0 0;line-height:1.25}
  .tile.text-only{background:#f8faf5;border-left:4px solid var(--accent)}
  .tile.text-only h2{font-size:31px;color:var(--accent)}
  .tile.generic .mark{background:#f1f5ef;border-radius:14px;padding:10px}
  .footer{font-size:19px;line-height:1.3;margin:23px 0 0;padding-top:17px;border-top:1px solid #d5ded3;color:#617469}
  .models .tile,.methods .tile,.pipeline .tile,.mixed .tile{padding:22px 24px}
  .models .tile h2{font-size:29px}.methods .tile h2{font-size:32px}
  .models .mark,.methods .mark,.pipeline .mark,.mixed .mark{width:76px;height:76px}
  .mixed .tile h2,.pipeline .tile h2{font-size:38px}
  .logos .tiles:has(.tile:nth-child(9)) .tile{gap:13px;padding:14px 18px}
  .logos .tiles:has(.tile:nth-child(9)) .mark{width:57px;height:57px}
  .logos .tiles:has(.tile:nth-child(9)) .tile h2{font-size:25px}
  .tile:has(img){flex-direction:column;justify-content:center;gap:12px;text-align:center}
  .tile:has(img) .mark{width:104px;height:104px}
  .tile:has(img) h2{font-size:31px}
  .tile:has(img) p{display:none}
  .logos .tiles:has(.tile:nth-child(9)) .tile{padding:12px;gap:8px}
  .logos .tiles:has(.tile:nth-child(9)) .mark{width:76px;height:76px}
  .logos .tiles:has(.tile:nth-child(9)) .tile h2{font-size:28px}
  .models .tile:has(img) .mark,.mixed .tile:has(img) .mark{width:104px;height:104px}
  </style></head><body><main class="cover ${esc(plan.mode)}">
  <div class="eyebrow"><span>TECHNOLOGY / ${String(index + 1).padStart(2, "0")}</span><b>${esc(plan.mode === "methods" || plan.mode === "pipeline" ? "MODELS & METHODS" : "TOOLS & TECHNOLOGIES")}</b></div>
  <h1>${esc(plan.title)}</h1><p class="subtitle">${esc(plan.subtitle)}</p><div class="tiles">
  ${plan.items.map(item => `<article class="tile${item.textOnly ? " text-only" : item.logo ? "" : " generic"}">${item.textOnly ? "" : `<div class="mark">${item.logo ? `<img src="${logoData(item.logo)}" alt="${esc(item.name)}">` : symbol(item.symbol)}</div>`}<div><h2>${esc(item.name)}</h2><p>${esc(item.role)}</p></div></article>`).join("")}
  </div><p class="footer">${esc(plan.footer)}</p></main></body></html>`;
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
      const target = path.join(assets, "project-covers", plan.id + "-stack-v1.webp");
      await sharp(png).webp({ quality: 92, effort: 6 }).toFile(target);
      const size = fs.statSync(target).size; total += size;
      console.log(plan.id + ": " + Math.round(size / 1024) + " KB");
    }
    console.log("Seven technology collages: " + Math.round(total / 1024) + " KB");
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
