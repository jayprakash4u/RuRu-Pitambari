import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const productsDir = path.resolve("src/assets/products");
const combosDir = path.resolve("src/assets/combos");

if (!fs.existsSync(combosDir)) {
  fs.mkdirSync(combosDir, { recursive: true });
}

// SVG Golden Ribbon with center bow knot (matching Card 2, 6, 8 in screenshot)
function createGoldenRibbonSvg(width) {
  return Buffer.from(`
    <svg width="${width}" height="120" viewBox="0 0 ${width} 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b27d14"/>
          <stop offset="25%" stop-color="#ffd54f"/>
          <stop offset="50%" stop-color="#fff9c4"/>
          <stop offset="75%" stop-color="#ffd54f"/>
          <stop offset="100%" stop-color="#b27d14"/>
        </linearGradient>
        <linearGradient id="goldKnot" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffe082"/>
          <stop offset="100%" stop-color="#d49b1a"/>
        </linearGradient>
        <filter id="ribbonShadow" x="-10%" y="-20%" width="120%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.32"/>
        </filter>
      </defs>
      <!-- Horizontal Satin Ribbon Band -->
      <rect x="0" y="44" width="${width}" height="24" fill="url(#goldGrad)" filter="url(#ribbonShadow)"/>
      <rect x="0" y="46" width="${width}" height="3" fill="#ffffff" opacity="0.45"/>
      <rect x="0" y="65" width="${width}" height="3" fill="#8d5f0b" opacity="0.35"/>
      
      <!-- Center Ribbon Bow -->
      <g filter="url(#ribbonShadow)">
        <!-- Left Loop -->
        <ellipse cx="${width / 2 - 38}" cy="56" rx="34" ry="18" fill="url(#goldGrad)" transform="rotate(-8, ${width / 2 - 38}, 56)"/>
        <!-- Right Loop -->
        <ellipse cx="${width / 2 + 38}" cy="56" rx="34" ry="18" fill="url(#goldGrad)" transform="rotate(8, ${width / 2 + 38}, 56)"/>
        <!-- Ribbon Tails -->
        <path d="M ${width / 2 - 12} 64 Q ${width / 2 - 28} 85 ${width / 2 - 40} 102 L ${width / 2 - 26} 98 L ${width / 2 - 16} 104 Z" fill="url(#goldKnot)"/>
        <path d="M ${width / 2 + 12} 64 Q ${width / 2 + 28} 85 ${width / 2 + 40} 102 L ${width / 2 + 26} 98 L ${width / 2 + 16} 104 Z" fill="url(#goldKnot)"/>
        <!-- Center Knot -->
        <ellipse cx="${width / 2}" cy="56" rx="14" ry="12" fill="url(#goldKnot)"/>
        <ellipse cx="${width / 2 - 2}" cy="53" rx="6" ry="4" fill="#fff9c4" opacity="0.6"/>
      </g>
    </svg>
  `);
}

// SVG "BUY 2 GET 1 FREE" badge (matching Card 8 in screenshot)
function createBuy2Get1Badge() {
  return Buffer.from(`
    <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="badgeShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.3"/>
        </filter>
      </defs>
      <g filter="url(#badgeShadow)">
        <rect x="10" y="10" width="160" height="160" rx="14" fill="#d71920" stroke="#ffffff" stroke-width="4"/>
        <text x="90" y="55" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">BUY</text>
        <text x="90" y="105" font-family="system-ui, sans-serif" font-size="52" font-weight="900" fill="#f5be18" text-anchor="middle" letter-spacing="-1">2+1</text>
        <text x="90" y="148" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">FREE</text>
      </g>
    </svg>
  `);
}

// 1. Two Bottles Side-by-Side (Deepshakti Diya Oil style, Card 5)
async function createTwinBottles({ srcPath, outputPath, bottleW = 390, bottleH = 750, gap = 40 }) {
  const bottleBuffer = await sharp(srcPath)
    .resize(bottleW, bottleH, { fit: "contain", background: { r: 255, g: 255, b: 255 } })
    .toBuffer();

  const left1 = Math.round((1024 - (bottleW * 2 + gap)) / 2);
  const left2 = left1 + bottleW + gap;
  const topY = 160;

  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([
      { input: bottleBuffer, top: topY, left: left1 },
      { input: bottleBuffer, top: topY, left: left2 },
    ])
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log(`Created twin bottles: ${outputPath}`);
}

// 2. Twin Boxes with Golden Ribbon (Devbhakti Agarbatti style, Card 2 & 6)
async function createTwinBoxesWithRibbon({ srcPath, outputPath }) {
  const boxW = 440;
  const boxH = 580;

  const boxBuffer = await sharp(srcPath)
    .resize(boxW, boxH, { fit: "contain", background: { r: 255, g: 255, b: 255 } })
    .toBuffer();

  const totalW = boxW + 280; // overlapping boxes
  const ribbonSvg = createGoldenRibbonSvg(totalW, 60);
  const ribbonPng = await sharp(ribbonSvg).png().toBuffer();

  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([
      // Back box
      { input: boxBuffer, top: 180, left: 160 },
      // Front box
      { input: boxBuffer, top: 250, left: 380 },
      // Golden Ribbon wrapped across both boxes
      { input: ribbonPng, top: 480, left: 180 },
    ])
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log(`Created ribbon bundle: ${outputPath}`);
}

// 3. Buy 2 Get 1 Free Bundle (Drain cleaner style, Card 8)
async function createBuy2Get1Bundle({ srcPath, outputPath }) {
  const packW = 380;
  const packH = 500;

  const packBuffer = await sharp(srcPath)
    .resize(packW, packH, { fit: "contain", background: { r: 255, g: 255, b: 255 } })
    .toBuffer();

  const ribbonSvg = createGoldenRibbonSvg(520, 60);
  const ribbonPng = await sharp(ribbonSvg).png().toBuffer();

  const badgeSvg = createBuy2Get1Badge();
  const badgePng = await sharp(badgeSvg).png().toBuffer();

  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([
      // Pack 1 (back left)
      { input: packBuffer, top: 160, left: 140 },
      // Pack 2 (back right)
      { input: packBuffer, top: 160, left: 340 },
      // Ribbon across the first two packs
      { input: ribbonPng, top: 380, left: 160 },
      // Pack 3 (front right, loose free pack)
      { input: packBuffer, top: 290, left: 520 },
      // "BUY 2 GET 1 FREE" badge (bottom left)
      { input: badgePng, top: 620, left: 80 },
    ])
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log(`Created Buy 2 Get 1 bundle: ${outputPath}`);
}

// 4. Buy X Get Y Free Bundle (Card 7 style: Main bottle + Free item)
async function createBuyXGetYFree({ mainPath, freePath, outputPath }) {
  const mainBuffer = await sharp(mainPath)
    .resize(440, 720, { fit: "contain", background: { r: 255, g: 255, b: 255 } })
    .toBuffer();

  const freeBuffer = await sharp(freePath)
    .resize(360, 560, { fit: "contain", background: { r: 255, g: 255, b: 255 } })
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
      { input: mainBuffer, top: 170, left: 140 },
      { input: freeBuffer, top: 270, left: 510 },
    ])
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log(`Created Buy X Get Y bundle: ${outputPath}`);
}

// 5. Single Round Tub on Pure White (Card 4 style: Pitambari Ghee Diya)
async function createRoundTub({ srcPath, outputPath }) {
  const tubBuffer = await sharp(srcPath)
    .resize(680, 680, { fit: "contain", background: { r: 255, g: 255, b: 255 } })
    .toBuffer();

  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([{ input: tubBuffer, top: 172, left: 172 }])
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log(`Created tub packshot: ${outputPath}`);
}

async function main() {
  // 1. Diya / Lamp Oil - Pack of 2 (Deepshakti style, Card 5)
  await createTwinBottles({
    srcPath: path.join(productsDir, "ruru-pooja-diya-oil.jpg"),
    outputPath: path.join(combosDir, "combo-diya-oil-twin.jpg"),
    bottleW: 380,
    bottleH: 740,
    gap: 30,
  });

  // 2. Devbhakti Temple Agarbatti - Pack of 2 with Golden Ribbon (Card 2 & 6 style)
  await createTwinBoxesWithRibbon({
    srcPath: path.join(productsDir, "ruru-temple-incense.jpg"),
    outputPath: path.join(combosDir, "combo-temple-incense-twin.jpg"),
  });

  // 3. Pitambari Powder - Buy 2 Get 1 Free with Ribbon & Badge (Card 8 style)
  await createBuy2Get1Bundle({
    srcPath: path.join(productsDir, "ruru-pitambari-paste.jpg"),
    outputPath: path.join(combosDir, "combo-pitambari-b2g1.jpg"),
  });

  // 4. Pitambari Ghee Diya / Bhimseni Camphor - 35 Wicks Tub (Card 4 style)
  await createRoundTub({
    srcPath: path.join(productsDir, "ruru-pooja-camphor.jpg"),
    outputPath: path.join(combosDir, "combo-ghee-diya.jpg"),
  });

  // 5. Ruru Ease Kitchen Degreaser - Pack of 2 (Card 3 style)
  await createTwinBottles({
    srcPath: path.join(productsDir, "ruru-ease.jpg"),
    outputPath: path.join(combosDir, "combo-ease-twin.jpg"),
    bottleW: 360,
    bottleH: 700,
    gap: 40,
  });

  // 6. Pine Herbal Floor Phenyle - Pack of 2
  await createTwinBottles({
    srcPath: path.join(productsDir, "ruru-pine-phenyle.jpg"),
    outputPath: path.join(combosDir, "combo-pine-twin.jpg"),
    bottleW: 360,
    bottleH: 700,
    gap: 40,
  });

  // 7. Active Lime Dishwash Gel - Pack of 2
  await createTwinBottles({
    srcPath: path.join(productsDir, "ruru-dishwash-gel.jpg"),
    outputPath: path.join(combosDir, "combo-dishwash-twin.jpg"),
    bottleW: 360,
    bottleH: 700,
    gap: 40,
  });

  // 8. Silver Shine Polish + Pitambari Paste (Buy X Get Y Free style, Card 7)
  await createBuyXGetYFree({
    mainPath: path.join(productsDir, "ruru-silver-shine.jpg"),
    freePath: path.join(productsDir, "ruru-pitambari-paste.jpg"),
    outputPath: path.join(combosDir, "combo-silver-brass-duo.jpg"),
  });
}

main().catch(console.error);
