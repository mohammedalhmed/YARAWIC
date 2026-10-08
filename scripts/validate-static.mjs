import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const publicRoot = path.resolve("client/public");
const htmlPath = path.resolve("client/index.html");
const feedPath = path.join(publicRoot, "instagram-feed.js");
const html = readFileSync(htmlPath, "utf8");
const failures = [];

if (!existsSync(feedPath)) failures.push(`Missing social feed script: ${feedPath}`);
if (html.includes("scrollIntoView")) failures.push("The page must not use scrollIntoView in embedded preview");

const productBlock = html.match(/const P = \[([\s\S]*?)\n  \];/);
if (!productBlock) failures.push("No catalog product block was detected");
const products = productBlock ? productBlock[1] : "";
const productIds = [...products.matchAll(/\bid:\s*'([^']+)'/g)].map((match) => match[1]);
const imageRefs = [...html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)].map((match) => match[1]);
const declaredImages = [...products.matchAll(/\bimg:\s*'([^']+)'/g)].map((match) => match[1]);

if (productIds.length === 0) failures.push("No catalog products were detected");
if (new Set(productIds).size !== productIds.length) failures.push("Catalog product ids must be unique");
for (const id of productIds) {
  if (!/^[a-z0-9-]+$/.test(id)) failures.push(`Unsafe product id: ${id}`);
}

const resolveAsset = (ref) => path.join(publicRoot, ref.replace(/^assets\//, ""));
for (const ref of imageRefs) {
  if (!existsSync(resolveAsset(ref))) failures.push(`Missing local page asset: ${resolveAsset(ref)}`);
}
for (const ref of declaredImages) {
  const localRef = ref.startsWith("social/") ? `assets/${ref}` : `assets/products/yarawic-reference-${ref}.jpg`;
  if (!existsSync(resolveAsset(localRef))) failures.push(`Missing catalog image: ${resolveAsset(localRef)}`);
}

const routesPath = path.join(publicRoot, "manus-routes.json");
if (!existsSync(routesPath)) failures.push("Missing manus-routes.json");
else {
  try {
    const routes = JSON.parse(readFileSync(routesPath, "utf8"));
    if (!Array.isArray(routes.routes) || !routes.routes.some((route) => route.path === "/")) {
      failures.push("manus-routes.json must declare the home route");
    }
  } catch {
    failures.push("manus-routes.json is not valid JSON");
  }
}

const socialManifest = path.join(publicRoot, "data/social-assets.json");
if (!existsSync(socialManifest)) failures.push("Missing social-assets.json");
else {
  try {
    const manifest = JSON.parse(readFileSync(socialManifest, "utf8"));
    for (const asset of manifest.assets ?? []) {
      if (asset.asset && !existsSync(path.resolve(asset.asset))) failures.push(`Missing social asset: ${asset.asset}`);
    }
  } catch {
    failures.push("social-assets.json is not valid JSON");
  }
}

if (failures.length) {
  console.error("Static catalog validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Static catalog validation passed: ${productIds.length} products, ${new Set(declaredImages).size} declared catalog images.`);
