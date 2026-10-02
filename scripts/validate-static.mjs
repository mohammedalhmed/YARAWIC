import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const appPath = "client/public/app.js";
const htmlPath = "client/index.html";
const app = readFileSync(appPath, "utf8");
const html = readFileSync(htmlPath, "utf8");
const failures = [];

const productIds = [...app.matchAll(/\bid:\s*'([^']+)'/g)].map((match) => match[1]);
const productImages = [...app.matchAll(/\bimage:\s*'([^']+)'/g)].map((match) => match[1]);

if (productIds.length === 0) failures.push("No catalog products were detected");
if (new Set(productIds).size !== productIds.length) failures.push("Catalog product ids must be unique");

for (const id of productIds) {
  if (!/^[a-z0-9-]+$/.test(id)) failures.push(`Unsafe product id: ${id}`);
}

for (const image of productImages) {
  if (!image.startsWith("./assets/")) {
    failures.push(`Product image must use a local ./assets path: ${image}`);
    continue;
  }
  const sourcePath = path.join("client/public", image.slice(2));
  if (!existsSync(sourcePath)) failures.push(`Missing product image: ${sourcePath}`);
}

const countMatch = html.match(/data-category="all"[\s\S]*?<span>(\d+)<\/span>/);
if (!countMatch) {
  failures.push("Unable to find the displayed all-products count");
} else if (Number(countMatch[1]) !== productIds.length) {
  failures.push(
    `Displayed catalog count ${countMatch[1]} does not match ${productIds.length} products`
  );
}

const localRefs = [
  ...html.matchAll(/(?:src|href)="\.\/([^"#?]+)"/g),
].map((match) => match[1]);

for (const reference of localRefs) {
  const sourcePath = path.join("client/public", reference);
  if (!existsSync(sourcePath)) failures.push(`Missing local page asset: ${sourcePath}`);
}

if (failures.length) {
  console.error("Static catalog validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Static catalog validation passed: ${productIds.length} products, ${new Set(productImages).size} unique product images.`
);
