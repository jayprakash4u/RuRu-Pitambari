import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const productsDir = path.resolve("src/assets/products");
const combosDir = path.resolve("src/assets/combos");
const categoriesDir = path.resolve("src/assets/categories");

if (!fs.existsSync(combosDir)) {
  fs.mkdirSync(combosDir, { recursive: true });
}

// Function to create twin packs that look like genuine studio photographs
async function createTwinPack(srcPath, outputPath) {
  const itemW = 560;
  const itemH = 560;

  const itemFront = await sharp(srcPath)
    .resize(itemW, itemH, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();

  const itemBack = await sharp(srcPath)
    .resize(Math.round(itemW * 0.93), Math.round(itemH * 0.93), {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .modulate({ brightness: 0.98 })
    .toBuffer();

  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([
      { input: itemBack, top: 200, left: 160 },
      { input: itemFront, top: 260, left: 340 },
    ])
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log(`Created twin pack: ${outputPath}`);
}

async function main() {
  // 1. Kitchen Degreaser Twin Pack (Ruru Ease)
  await createTwinPack(
    path.join(productsDir, "ruru-ease.jpg"),
    path.join(combosDir, "combo-kitchen-duo.jpg"),
  );

  // 2. Pine Herbal Phenyle Twin Pack
  await createTwinPack(
    path.join(productsDir, "ruru-pine-phenyle.jpg"),
    path.join(combosDir, "combo-floor-hygiene.jpg"),
  );

  // 3. Bhimseni Pure Camphor Twin Pack
  await createTwinPack(
    path.join(productsDir, "ruru-pooja-camphor.jpg"),
    path.join(combosDir, "combo-camphor-twin.jpg"),
  );

  // 4. Temple Incense Twin Pack
  await createTwinPack(
    path.join(productsDir, "ruru-temple-incense.jpg"),
    path.join(combosDir, "combo-temple-incense-twin.jpg"),
  );

  // 5. Active Lime Dishwash Gel Twin Pack
  await createTwinPack(
    path.join(productsDir, "ruru-dishwash-gel.jpg"),
    path.join(combosDir, "combo-dishwash-twin.jpg"),
  );

  // 6. Copy Category 3D Studio Renders directly as curated combo packs:
  const copyMap = [
    {
      src: path.join(categoriesDir, "kitchen-care.png"),
      dest: path.join(combosDir, "combo-kitchen-care.png"),
    },
    {
      src: path.join(categoriesDir, "floor-care.png"),
      dest: path.join(combosDir, "combo-floor-care.png"),
    },
    {
      src: path.join(categoriesDir, "household-care.png"),
      dest: path.join(combosDir, "combo-household-mega.png"),
    },
    {
      src: path.join(categoriesDir, "metal-care.png"),
      dest: path.join(combosDir, "combo-metal-care.png"),
    },
  ];

  for (const { src, dest } of copyMap) {
    if (fs.existsSync(src)) {
      // Convert to high quality jpg or keep png
      await sharp(src)
        .resize(1024, 1024, { fit: "contain", background: { r: 255, g: 255, b: 255 } })
        .jpeg({ quality: 95 })
        .toFile(dest.replace(/\.png$/, ".jpg"));
      console.log(`Prepared studio combo: ${dest}`);
    }
  }
}

main().catch(console.error);
