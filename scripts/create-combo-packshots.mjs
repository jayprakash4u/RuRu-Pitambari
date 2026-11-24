import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const productsDir = path.resolve("src/assets/products");
const combosDir = path.resolve("src/assets/combos");

if (!fs.existsSync(combosDir)) {
  fs.mkdirSync(combosDir, { recursive: true });
}

async function createSideBySideCombo({
  leftPath,
  rightPath,
  outputPath,
  leftMax = 500,
  rightMax = 500,
  leftPos = { left: 40, top: 260 },
  rightPos = { left: 480, top: 260 },
}) {
  const leftResized = await sharp(leftPath)
    .resize(leftMax, leftMax, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();

  const rightResized = await sharp(rightPath)
    .resize(rightMax, rightMax, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
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
      { input: leftResized, top: leftPos.top, left: leftPos.left },
      { input: rightResized, top: rightPos.top, left: rightPos.left },
    ])
    .jpeg({ quality: 92 })
    .toFile(outputPath);

  console.log(`Created combo: ${outputPath}`);
}

async function createTrioCombo({ leftPath, centerPath, rightPath, outputPath }) {
  const itemSize = 420;

  const leftResized = await sharp(leftPath)
    .resize(itemSize, itemSize, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .toBuffer();

  const centerResized = await sharp(centerPath)
    .resize(itemSize + 40, itemSize + 40, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .toBuffer();

  const rightResized = await sharp(rightPath)
    .resize(itemSize, itemSize, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
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
      { input: leftResized, top: 320, left: 30 },
      { input: centerResized, top: 220, left: 280 },
      { input: rightResized, top: 320, left: 570 },
    ])
    .jpeg({ quality: 92 })
    .toFile(outputPath);

  console.log(`Created trio combo: ${outputPath}`);
}

async function main() {
  // 1. Kitchen Duo: Ruru Ease + Pitambari
  await createSideBySideCombo({
    leftPath: path.join(productsDir, "ruru-ease.jpg"),
    rightPath: path.join(productsDir, "product-01.png"),
    outputPath: path.join(combosDir, "combo-kitchen-duo.jpg"),
    leftMax: 540,
    rightMax: 460,
    leftPos: { left: 50, top: 240 },
    rightPos: { left: 500, top: 300 },
  });

  // 2. Floor & Surface Hygiene: White Phenyle + Pine Phenyle
  await createSideBySideCombo({
    leftPath: path.join(productsDir, "product-04.jpg"),
    rightPath: path.join(productsDir, "ruru-pine-phenyle.jpg"),
    outputPath: path.join(combosDir, "combo-floor-hygiene.jpg"),
    leftMax: 500,
    rightMax: 500,
    leftPos: { left: 40, top: 260 },
    rightPos: { left: 480, top: 260 },
  });

  // 3. Silver & Brass Shiner Duo: Silver Shine + Pitambari Paste
  await createSideBySideCombo({
    leftPath: path.join(productsDir, "ruru-silver-shine.jpg"),
    rightPath: path.join(productsDir, "ruru-pitambari-paste.jpg"),
    outputPath: path.join(combosDir, "combo-silver-brass.jpg"),
    leftMax: 500,
    rightMax: 500,
    leftPos: { left: 40, top: 260 },
    rightPos: { left: 480, top: 260 },
  });

  // 4. Complete Temple & Aarti Combo: Diya Oil + Camphor + Temple Incense
  await createTrioCombo({
    leftPath: path.join(productsDir, "ruru-pooja-diya-oil.jpg"),
    centerPath: path.join(productsDir, "ruru-pooja-camphor.jpg"),
    rightPath: path.join(productsDir, "ruru-temple-incense.jpg"),
    outputPath: path.join(combosDir, "combo-temple-aarti.jpg"),
  });

  // 5. Kitchen Sparkle Set: Dishwash Gel + Chimney Degreaser + Dishwash Bar
  await createTrioCombo({
    leftPath: path.join(productsDir, "ruru-dishwash-gel.jpg"),
    centerPath: path.join(productsDir, "ruru-chimney-cleaner.jpg"),
    rightPath: path.join(productsDir, "ruru-dishwash-bar.jpg"),
    outputPath: path.join(combosDir, "combo-sparkle-kitchen.jpg"),
  });

  // 6. Deep Surface Care: Tile Cleaner + Tap Descaler + Glass Cleaner
  await createTrioCombo({
    leftPath: path.join(productsDir, "ruru-tile-cleaner.jpg"),
    centerPath: path.join(productsDir, "ruru-tap-cleaner.jpg"),
    rightPath: path.join(productsDir, "ruru-glass-cleaner.jpg"),
    outputPath: path.join(combosDir, "combo-deep-cleaning.jpg"),
  });

  // 7. Household Mega Value Pack: 4 items (Phenyle + Ease + Pitambari + Dishwash Gel)
  const itemW = 380;
  const p1 = await sharp(path.join(productsDir, "product-04.jpg"))
    .resize(itemW, itemW, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();
  const p2 = await sharp(path.join(productsDir, "ruru-ease.jpg"))
    .resize(itemW, itemW, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();
  const p3 = await sharp(path.join(productsDir, "product-01.png"))
    .resize(itemW - 40, itemW - 40, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .toBuffer();
  const p4 = await sharp(path.join(productsDir, "ruru-dishwash-gel.jpg"))
    .resize(itemW, itemW, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
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
      { input: p1, top: 120, left: 100 },
      { input: p2, top: 120, left: 540 },
      { input: p3, top: 520, left: 120 },
      { input: p4, top: 500, left: 520 },
    ])
    .jpeg({ quality: 92 })
    .toFile(path.join(combosDir, "combo-household-mega.jpg"));
  console.log("Created household mega combo");
}

main().catch(console.error);
