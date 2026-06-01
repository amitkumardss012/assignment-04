const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "frontend", "dist");
const destBackend = path.join(__dirname, "backend", "dist");
const destRoot = path.join(__dirname, "dist");

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(src)) {
  console.log(`Copying frontend build to backend/dist...`);
  copyDir(src, destBackend);
  console.log(`Copying frontend build to root/dist (for Vercel)...`);
  copyDir(src, destRoot);
  console.log("Copy completed.");
} else {
  console.log(
    `Frontend build not found at ${src}. Make sure the frontend builds correctly.`,
  );
}
