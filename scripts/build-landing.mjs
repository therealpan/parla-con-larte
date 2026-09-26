// Copies the static landing (HTML + images) into dist/ root after `vite build`.
// The React voice demo lives in dist/demo/ (vite base "/demo/"); the landing owns "/".
import { cp, access } from "fs/promises";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "landing");
const dist = path.join(root, "dist");

await access(dist).catch(() => {
  throw new Error("dist/ not found — run `vite build` before this script.");
});

await cp(src, dist, { recursive: true });
console.log("Landing copied into dist/ (index.html + images).");
