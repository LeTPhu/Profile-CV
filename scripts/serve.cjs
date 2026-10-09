const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".pdf": "application/pdf", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };

function createServer() {
  return http.createServer((request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      const target = path.resolve(root, "." + pathname);
      const relative = path.relative(root, target);
      if (relative.startsWith("..") || path.isAbsolute(relative) || relative.split(path.sep).some(segment => segment.startsWith("."))) {
        response.writeHead(403).end("Forbidden");
        return;
      }
      let file = target;
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
      if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
        response.writeHead(404).end("Not found");
        return;
      }
      response.writeHead(200, { "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store" });
      const stream = fs.createReadStream(file);
      stream.on("error", () => response.destroy());
      stream.pipe(response);
    } catch {
      response.writeHead(400).end("Bad request");
    }
  });
}
module.exports = { createServer };
if (require.main === module) {
  const server = createServer();
  server.listen(8775, "127.0.0.1", () => console.log("Website: http://127.0.0.1:8775/github-public-cv/"));
}
