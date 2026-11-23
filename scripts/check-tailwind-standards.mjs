import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../src", import.meta.url));
const violations = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if ([".tsx", ".jsx"].includes(extname(entry.name))) await inspect(path);
  }
}

async function inspect(path) {
  const source = await readFile(path, "utf8");
  const classAttributes = source.matchAll(/className\s*=\s*(?:"([^"]*)"|'([^']*)'|{`([^`]*)`})/gs);

  for (const match of classAttributes) {
    const value = match[1] ?? match[2] ?? match[3] ?? "";
    if (value.includes("[")) violations.push(`${path}: arbitrary Tailwind value in "${value}"`);
    if (value.trim().split(/\s+/).length > 12) {
      violations.push(
        `${path}: className exceeds 12 utilities; extract a component or utility pattern`,
      );
    }
  }
}

await walk(root);

if (violations.length) {
  console.error(violations.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Tailwind standards check passed.");
}
