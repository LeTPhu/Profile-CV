const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const directory = path.join(__dirname, "../github-public-cv/assets/fonts/be-vietnam-pro");
const source = "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap";
const agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";
const license = "https://raw.githubusercontent.com/google/fonts/main/ofl/bevietnampro/OFL.txt";

async function download(url) {
  const response = await fetch(url, { headers: { "User-Agent": agent }, signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Font request failed: ${response.status} ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

(async () => {
  fs.mkdirSync(directory, { recursive: true });
  const css = (await download(source)).toString("utf8");
  const faces = [...css.matchAll(/\/\*\s*([a-z-]+)\s*\*\/\s*(@font-face\s*\{[\s\S]*?\})/g)];
  if (faces.length !== 12) throw new Error("Expected four weights across three character subsets");
  const records = [];
  const blocks = [];
  for (const [, subset, face] of faces) {
    const weight = face.match(/font-weight:\s*(\d+)/)?.[1];
    const url = face.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/)?.[1];
    if (!weight || !url) throw new Error("Unexpected font-face structure");
    const file = `be-vietnam-pro-${weight}-${subset}.woff2`;
    const font = await download(url);
    fs.writeFileSync(path.join(directory, file), font);
    blocks.push(`/* ${subset} */\n` + face.replace(url, "./" + file));
    records.push({ file, weight: Number(weight), subset, url, sha256: crypto.createHash("sha256").update(font).digest("hex"), bytes: font.length });
  }
  fs.writeFileSync(path.join(directory, "fonts.css"), blocks.join("\n\n") + "\n");
  fs.writeFileSync(path.join(directory, "OFL.txt"), await download(license));
  fs.writeFileSync(path.join(directory, "sources.json"), JSON.stringify({ family: "Be Vietnam Pro", retrieved: "2026-10-13", source, license, files: records }, null, 2) + "\n");
  console.log(`Saved ${records.length} WOFF2 fonts: ${Math.round(records.reduce((sum, file) => sum + file.bytes, 0) / 1024)} KB total.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
