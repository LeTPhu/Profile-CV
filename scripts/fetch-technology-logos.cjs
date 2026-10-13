const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const destination = path.join(__dirname, "../github-public-cv/assets/technology-logos");
const simpleRevision = "4d29a35c954699b389a834aacc97dd6e7e74143c";
const simpleBase = `https://raw.githubusercontent.com/simple-icons/simple-icons/${simpleRevision}/`;
const brands = {
  vuedotjs: "Vue.js", typescript: "TypeScript", nodedotjs: "Node.js",
  fastify: "Fastify", prisma: "Prisma", postgresql: "PostgreSQL",
  socketdotio: "Socket.io", redis: "Redis", minio: "MinIO", docker: "Docker",
  ubuntu: "Ubuntu", fastapi: "FastAPI", sqlite: "SQLite",
  googlecolab: "Google Colab", deepseek: "DeepSeek",
};
const upstream = [
  { id: "openclaw", title: "OpenClaw", repository: "openclaw/openclaw", revision: "9354a2caad4f8c9ba87038f1c70ddc35304077f3", file: "ui/public/favicon.svg", license: "MIT" },
  { id: "9router", title: "9router", repository: "decolua/9router", revision: "ce4460ef79382bfddb4aa5fc0ff9f3cb0d5f95a8", file: "public/favicon.svg", license: "MIT" },
  { id: "sqlmodel", title: "SQLModel", repository: "fastapi/sqlmodel", revision: "5ce1a472488734363b2ab36f8ce2bcc773e4593e", file: "docs/img/icon.svg", license: "MIT" },
  { id: "paddleocr", title: "PaddleOCR", repository: "PaddlePaddle/PaddleOCR", revision: "dab3fe35379033fdcb2d0e9572fac0b36c9a9ebf", file: "README.md", embeddedPng: true, license: "Apache-2.0" },
];

async function download(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Download failed: ${response.status} ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

(async () => {
  fs.mkdirSync(destination, { recursive: true });
  const catalog = JSON.parse((await download(simpleBase + "data/simple-icons.json")).toString("utf8"));
  const sources = [];
  for (const [id, title] of Object.entries(brands)) {
    const metadata = catalog.find(icon => icon.title === title);
    if (!metadata) throw new Error("Unknown brand: " + title);
    const url = simpleBase + "icons/" + id + ".svg";
    const content = await download(url);
    fs.writeFileSync(path.join(destination, id + ".svg"), content);
    sources.push({ id, title, file: id + ".svg", hex: metadata.hex, source: metadata.source, download: url, revision: simpleRevision, collectionLicense: "CC0-1.0", upstreamLicense: metadata.license || null, guidelines: metadata.guidelines || null, sha256: crypto.createHash("sha256").update(content).digest("hex") });
  }
  fs.writeFileSync(path.join(destination, "LICENSE-simple-icons.txt"), await download(simpleBase + "LICENSE.md"));
  for (const asset of upstream) {
    const base = `https://raw.githubusercontent.com/${asset.repository}/${asset.revision}/`;
    const file = asset.id + (asset.embeddedPng ? ".png" : path.extname(asset.file));
    const downloaded = await download(base + asset.file);
    const encoded = asset.embeddedPng && downloaded.toString("utf8").match(/PaddleOCR-[^\n]*?logo=data:image\/png;base64,([A-Za-z0-9+/=]+)/)?.[1];
    if (asset.embeddedPng && !encoded) throw new Error("Missing upstream PaddleOCR mark");
    const content = asset.embeddedPng ? Buffer.from(encoded, "base64") : downloaded;
    fs.writeFileSync(path.join(destination, file), content);
    fs.writeFileSync(path.join(destination, "LICENSE-" + asset.id + ".txt"), await download(base + "LICENSE"));
    sources.push({ id: asset.id, title: asset.title, file, source: `https://github.com/${asset.repository}/blob/${asset.revision}/${asset.file}`, download: base + asset.file, revision: asset.revision, license: asset.license, sha256: crypto.createHash("sha256").update(content).digest("hex") });
  }
  fs.writeFileSync(path.join(destination, "sources.json"), JSON.stringify({ retrieved: "2026-10-13", note: "Third-party technology marks identify tools used or explored in the portfolio. Original files are preserved; methodology labels are not brand logos.", assets: sources }, null, 2) + "\n");
  console.log(`Saved ${sources.length} verified technology assets and source/license records.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
