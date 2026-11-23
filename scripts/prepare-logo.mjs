import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import sharp from "sharp";

const source = resolve("src/assets/brand/logo-source.png");
const target = resolve("src/assets/brand/logo-transparent.png");

const { data, info } = await sharp(source)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const channels = info.channels;
let minX = info.width;
let minY = info.height;
let maxX = 0;
let maxY = 0;
let maximumDelta = 1;

for (let y = 0; y < info.height; y += 1) {
  for (let x = 0; x < info.width; x += 1) {
    const offset = (y * info.width + x) * channels;
    const delta = Math.max(255 - data[offset], 255 - data[offset + 1], 255 - data[offset + 2]);
    maximumDelta = Math.max(maximumDelta, delta);
    if (delta > 10) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
}

const artworkWidth = maxX - minX + 1;
const artworkHeight = maxY - minY + 1;
const artworkSide = Math.max(artworkWidth, artworkHeight);
const margin = Math.ceil(artworkSide * 0.06);
const canvasSide = artworkSide + margin * 2;
const output = Buffer.alloc(canvasSide * canvasSide * 4);
const offsetX = Math.floor((canvasSide - artworkWidth) / 2);
const offsetY = Math.floor((canvasSide - artworkHeight) / 2);

for (let y = minY; y <= maxY; y += 1) {
  for (let x = minX; x <= maxX; x += 1) {
    const sourceOffset = (y * info.width + x) * channels;
    const delta = Math.max(
      255 - data[sourceOffset],
      255 - data[sourceOffset + 1],
      255 - data[sourceOffset + 2],
    );
    if (delta <= 2) continue;

    const alpha = Math.min(1, delta / maximumDelta);
    const outputX = offsetX + x - minX;
    const outputY = offsetY + y - minY;
    const outputOffset = (outputY * canvasSide + outputX) * 4;

    for (let channel = 0; channel < 3; channel += 1) {
      const composited = data[sourceOffset + channel];
      output[outputOffset + channel] = Math.max(
        0,
        Math.min(255, Math.round((composited - 255 * (1 - alpha)) / alpha)),
      );
    }
    output[outputOffset + 3] = Math.round(alpha * 255);
  }
}

await mkdir(dirname(target), { recursive: true });
await sharp(output, { raw: { channels: 4, height: canvasSide, width: canvasSide } })
  .resize(1024, 1024, { fit: "fill", kernel: sharp.kernel.lanczos3 })
  .png({ compressionLevel: 9, palette: false })
  .toFile(target);

const metadata = await sharp(target).metadata();
console.log(
  `Prepared ${target} (${metadata.width}×${metadata.height}, ${metadata.channels} channels, ${metadata.format})`,
);
