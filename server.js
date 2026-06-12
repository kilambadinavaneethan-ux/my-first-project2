const http = require("http");
const path = require("path");
const fs = require("fs");

const buildDir = path.join(__dirname, "dist");
const port = process.env.PORT || 5000;

const mimeTypes = {
  html: "text/html",
  js: "application/javascript",
  css: "text/css",
  json: "application/json",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  svg: "image/svg+xml",
  ico: "image/x-icon",
  txt: "text/plain",
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let filePath = path.join(buildDir, url.pathname === "/" ? "index.html" : url.pathname);

  if (!path.resolve(filePath).startsWith(buildDir)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    return res.end("Forbidden");
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(buildDir, "index.html");
    }

    const ext = path.extname(filePath).slice(1);
    const contentType = mimeTypes[ext] || "application/octet-stream";

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Internal Server Error");
      }

      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    });
  });
});

server.listen(port, () => {
  console.log(`Local server is running at http://localhost:${port}`);
  console.log("Make sure you run \"npm run build\" before starting the local server.");
});
