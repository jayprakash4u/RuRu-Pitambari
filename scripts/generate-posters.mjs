import sharp from "sharp";

const WIDTH = 1600;
const HEIGHT = 640;

async function generatePosters() {
  console.log("Generating 5 promotional posters...");

  // -------------------------------------------------------------
  // POSTER 1: GHAR KE HEROES AUR SAFAI KE PROS!
  // -------------------------------------------------------------
  {
    console.log("1. Generating poster-safai-heroes.jpg...");
    const bgSvg = `
      <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="60%" stop-color="#fdfbf7" />
            <stop offset="100%" stop-color="#f2ebe0" />
          </linearGradient>
          <linearGradient id="counterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#d6b896" />
            <stop offset="15%" stop-color="#c9a781" />
            <stop offset="100%" stop-color="#8a6136" />
          </linearGradient>
          <linearGradient id="blueRibbon" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1d4ed8" />
            <stop offset="60%" stop-color="#1e3a8a" />
            <stop offset="100%" stop-color="#172554" />
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.3" />
          </filter>
        </defs>

        <!-- Kitchen Background Wall -->
        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#wallGrad)" />

        <!-- Countertop Surface -->
        <rect x="0" y="480" width="${WIDTH}" height="160" fill="url(#counterGrad)" />
        <rect x="0" y="480" width="${WIDTH}" height="4" fill="#efdcbe" opacity="0.8" />

        <!-- Blue Angled Banner on Left -->
        <polygon points="0,0 640,0 470,640 0,640" fill="url(#blueRibbon)" filter="url(#shadow)" />

        <!-- Sparkles on Blue -->
        <path d="M 520,110 L 526,128 L 544,134 L 526,140 L 520,158 L 514,140 L 496,134 L 514,128 Z" fill="#93c5fd" opacity="0.85" />
        <path d="M 80,480 L 84,494 L 98,498 L 84,502 L 80,516 L 76,502 L 62,498 L 76,494 Z" fill="#60a5fa" opacity="0.7" />

        <!-- Typography -->
        <text x="65" y="160" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="62" fill="#ffffff" letter-spacing="-0.02em">
          GHAR KE
        </text>
        <text x="65" y="240" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="70" fill="#ffffff" letter-spacing="-0.02em">
          HEROES AUR
        </text>
        <text x="65" y="325" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="70" fill="#ffffff" letter-spacing="-0.02em">
          SAFAI KE PROS!
        </text>
        <text x="65" y="380" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="22" fill="#bfdbfe" letter-spacing="0.04em">
          ALL-IN-ONE HOME &amp; KITCHEN HYGIENE
        </text>

        <!-- CTA Button -->
        <rect x="65" y="420" width="310" height="60" rx="8" fill="#2563eb" stroke="#60a5fa" stroke-width="2" />
        <text x="105" y="458" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="19" fill="#ffffff" letter-spacing="0.05em">
          CLICK HERE TO GET OFFERS
        </text>
        <!-- Click Pointer Finger Icon -->
        <path d="M 335,455 L 340,465 L 345,462 L 350,472 L 353,470 L 348,460 L 354,458 Z" fill="#ffffff" />
      </svg>
    `;

    const pPouch = await sharp("src/assets/products/ruru-pitambari.png")
      .resize({
        width: 310,
        height: 390,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    const pGel = await sharp("src/assets/products/ruru-dishwash-gel.jpg")
      .resize({
        width: 230,
        height: 350,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    const pPine = await sharp("src/assets/products/ruru-pine-phenyle.jpg")
      .resize({
        width: 220,
        height: 370,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    const pBar = await sharp("src/assets/products/ruru-dishwash-bar.jpg")
      .resize({
        width: 240,
        height: 160,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    const pSilver = await sharp("src/assets/products/ruru-silver-shine.jpg")
      .resize({
        width: 170,
        height: 280,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    await sharp(Buffer.from(bgSvg))
      .composite([
        { input: pPouch, left: 630, top: 120 },
        { input: pPine, left: 910, top: 130 },
        { input: pGel, left: 1110, top: 150 },
        { input: pSilver, left: 1320, top: 220 },
        { input: pBar, left: 740, top: 380 },
      ])
      .jpeg({ quality: 92 })
      .toFile("src/assets/banners/poster-safai-heroes.jpg");
  }

  // -------------------------------------------------------------
  // POSTER 2: POOJA ESSENTIALS TO LIGHT UP YOUR RITUALS!
  // -------------------------------------------------------------
  {
    console.log("2. Generating poster-pooja-essentials.jpg...");
    const bgSvg = `
      <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="poojaBg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#ea580c" />
            <stop offset="50%" stop-color="#f97316" />
            <stop offset="100%" stop-color="#fb923c" />
          </linearGradient>
          <linearGradient id="greenBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2e7d32" />
            <stop offset="100%" stop-color="#1b5e20" />
          </linearGradient>
          <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.25" />
          </filter>
        </defs>

        <!-- Saffron Orange Canvas -->
        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#poojaBg)" />

        <!-- Green Lawn Base -->
        <rect x="0" y="490" width="${WIDTH}" height="150" fill="url(#greenBase)" />
        <rect x="0" y="490" width="${WIDTH}" height="4" fill="#a5d6a7" opacity="0.8" />

        <!-- Traditional Mandala Art Motif -->
        <circle cx="280" cy="280" r="230" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.12" stroke-dasharray="8 6" />
        <circle cx="280" cy="280" r="170" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.15" />
        <circle cx="280" cy="280" r="100" fill="none" stroke="#ffffff" stroke-width="2" stroke-opacity="0.18" />

        <!-- Floral Marigold Dots -->
        <circle cx="750" cy="465" r="16" fill="#facc15" stroke="#ea580c" stroke-width="3" />
        <circle cx="795" cy="475" r="12" fill="#fb923c" stroke="#facc15" stroke-width="2" />
        <circle cx="890" cy="505" r="10" fill="#facc15" stroke="#ea580c" stroke-width="2" />

        <!-- Typography (Right Side) -->
        <g filter="url(#textGlow)">
          <text x="760" y="180" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="62" fill="#ffffff" letter-spacing="-0.02em">
            POOJA ESSENTIALS
          </text>
          <text x="760" y="260" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="52" fill="#ffffff" letter-spacing="-0.01em">
            TO LIGHT UP
          </text>
          <text x="760" y="348" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="74" fill="#ffffff" letter-spacing="-0.02em">
            YOUR RITUALS!
          </text>
        </g>
        <text x="760" y="405" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="22" fill="#fef08a" letter-spacing="0.04em">
          PURE SESAME DIYA OIL &amp; SACRED TEMPLE INCENSE
        </text>

        <!-- CTA Button -->
        <rect x="760" y="445" width="310" height="60" rx="8" fill="#ea580c" stroke="#ffffff" stroke-width="2" />
        <text x="800" y="483" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="19" fill="#ffffff" letter-spacing="0.05em">
          CLICK HERE TO GET OFFERS
        </text>
        <!-- Click Pointer -->
        <path d="M 1030,480 L 1035,490 L 1040,487 L 1045,497 L 1048,495 L 1043,485 L 1049,483 Z" fill="#ffffff" />
      </svg>
    `;

    const pOil = await sharp("src/assets/products/ruru-pooja-diya-oil.jpg")
      .resize({
        width: 260,
        height: 440,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    const pIncense = await sharp("src/assets/products/ruru-temple-incense.jpg")
      .resize({
        width: 230,
        height: 390,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    const pGhee = await sharp("src/assets/combos/combo-ghee-diya.jpg")
      .resize({
        width: 220,
        height: 260,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    const pCamphor = await sharp("src/assets/products/ruru-pooja-camphor.jpg")
      .resize({
        width: 170,
        height: 180,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    await sharp(Buffer.from(bgSvg))
      .composite([
        { input: pIncense, left: 70, top: 120 },
        { input: pOil, left: 260, top: 75 },
        { input: pGhee, left: 480, top: 250 },
        { input: pCamphor, left: 200, top: 350 },
      ])
      .jpeg({ quality: 92 })
      .toFile("src/assets/banners/poster-pooja-essentials.jpg");
  }

  // -------------------------------------------------------------
  // POSTER 3: HERITAGE SHINE FOR SACRED METALS!
  // -------------------------------------------------------------
  {
    console.log("3. Generating poster-heritage-shine.jpg...");
    const bgSvg = `
      <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="heritageBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#7f1d1d" />
            <stop offset="50%" stop-color="#8c1d24" />
            <stop offset="100%" stop-color="#581116" />
          </linearGradient>
          <linearGradient id="goldPlate" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#f59e0b" />
            <stop offset="50%" stop-color="#fbbf24" />
            <stop offset="100%" stop-color="#d97706" />
          </linearGradient>
        </defs>

        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#heritageBg)" />

        <!-- Gold Radial Aura on Right Side behind products -->
        <radialGradient id="goldAura" cx="75%" cy="50%" r="45%">
          <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.35" />
          <stop offset="70%" stop-color="#f59e0b" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#7f1d1d" stop-opacity="0" />
        </radialGradient>
        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#goldAura)" />

        <!-- Subtle Polished Base Table -->
        <rect x="0" y="490" width="${WIDTH}" height="150" fill="#450a0a" />
        <rect x="0" y="490" width="${WIDTH}" height="3" fill="#f59e0b" opacity="0.6" />

        <!-- Sparkles -->
        <path d="M 690,140 L 696,158 L 714,164 L 696,170 L 690,188 L 684,170 L 666,164 L 684,158 Z" fill="#fbbf24" />
        <path d="M 1320,110 L 1324,124 L 1338,128 L 1324,132 L 1320,146 L 1316,132 L 1302,128 L 1316,124 Z" fill="#fde68a" />

        <!-- Typography on Left -->
        <text x="70" y="170" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="58" fill="#ffffff" letter-spacing="-0.02em">
          ORIGINAL SHINE FOR
        </text>
        <text x="70" y="250" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="68" fill="#fbbf24" letter-spacing="-0.02em">
          SACRED METALS!
        </text>
        <text x="70" y="325" font-family="'Noto Sans Devanagari', sans-serif" font-weight="700" font-size="34" fill="#fef08a">
          तामा, पित्तल र चाँदीको चम्किलो चमक
        </text>
        <text x="70" y="380" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="21" fill="#fca5a5" letter-spacing="0.03em">
          NEPAL&apos;S NO. 1 TRUSTED COPPER &amp; BRASS CARE FORMULA
        </text>

        <!-- CTA Button -->
        <rect x="70" y="425" width="310" height="60" rx="8" fill="url(#goldPlate)" />
        <text x="110" y="463" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="19" fill="#171612" letter-spacing="0.05em">
          CLICK HERE TO GET OFFERS
        </text>
        <path d="M 340,460 L 345,470 L 350,467 L 355,477 L 358,475 L 353,465 L 359,463 Z" fill="#171612" />
      </svg>
    `;

    const pPouch = await sharp("src/assets/products/ruru-pitambari.png")
      .resize({
        width: 330,
        height: 420,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    const pPaste = await sharp("src/assets/products/ruru-pitambari-paste.jpg")
      .resize({
        width: 280,
        height: 350,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    const pSilver = await sharp("src/assets/products/ruru-silver-shine.jpg")
      .resize({
        width: 220,
        height: 360,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    await sharp(Buffer.from(bgSvg))
      .composite([
        { input: pPouch, left: 740, top: 100 },
        { input: pPaste, left: 1040, top: 170 },
        { input: pSilver, left: 1300, top: 155 },
      ])
      .jpeg({ quality: 92 })
      .toFile("src/assets/banners/poster-heritage-shine.jpg");
  }

  // -------------------------------------------------------------
  // POSTER 4: NATURAL PINE HYGIENE & GERM PROTECTION
  // -------------------------------------------------------------
  {
    console.log("4. Generating poster-pine-hygiene.jpg...");
    const bgSvg = `
      <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pineBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#065f46" />
            <stop offset="60%" stop-color="#047857" />
            <stop offset="100%" stop-color="#0f766e" />
          </linearGradient>
          <linearGradient id="yellowSlash" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#eab308" />
            <stop offset="100%" stop-color="#ca8a04" />
          </linearGradient>
          <pattern id="crossGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 15 10 L 15 20 M 10 15 L 20 15" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.1" />
          </pattern>
        </defs>

        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#pineBg)" />
        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#crossGrid)" />

        <!-- Countertop -->
        <rect x="0" y="480" width="${WIDTH}" height="160" fill="#064e3b" />
        <rect x="0" y="480" width="${WIDTH}" height="3" fill="#6ee7b7" opacity="0.6" />

        <!-- Right Side Typography -->
        <text x="730" y="170" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="56" fill="#ffffff" letter-spacing="-0.02em">
          NATURAL PINE HYGIENE
        </text>
        <text x="730" y="250" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="68" fill="#facc15" letter-spacing="-0.02em">
          99.9% GERM PROTECTION!
        </text>
        <text x="730" y="325" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="30" fill="#d1fae5">
          Pure Himalayan Mountain Pine Floor Cleaner
        </text>
        <text x="730" y="380" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="21" fill="#a7f3d0" letter-spacing="0.03em">
          LONG-LASTING FOREST FRESHNESS FOR SPARKLE TILES
        </text>

        <!-- CTA Button -->
        <rect x="730" y="425" width="310" height="60" rx="8" fill="#047857" stroke="#ffffff" stroke-width="2" />
        <text x="770" y="463" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="19" fill="#ffffff" letter-spacing="0.05em">
          CLICK HERE TO GET OFFERS
        </text>
        <path d="M 1000,460 L 1005,470 L 1010,467 L 1015,477 L 1018,475 L 1013,465 L 1019,463 Z" fill="#ffffff" />
      </svg>
    `;

    const pPine = await sharp("src/assets/products/ruru-pine-phenyle.jpg")
      .resize({
        width: 260,
        height: 440,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    const pTile = await sharp("src/assets/products/ruru-tile-cleaner.jpg")
      .resize({
        width: 220,
        height: 380,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    const pTap = await sharp("src/assets/products/ruru-tap-cleaner.jpg")
      .resize({
        width: 210,
        height: 340,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    await sharp(Buffer.from(bgSvg))
      .composite([
        { input: pTile, left: 80, top: 130 },
        { input: pPine, left: 260, top: 75 },
        { input: pTap, left: 480, top: 170 },
      ])
      .jpeg({ quality: 92 })
      .toFile("src/assets/banners/poster-pine-hygiene.jpg");
  }

  // -------------------------------------------------------------
  // POSTER 5: SPECIAL VALUE PACKS & COMBO SAVINGS
  // -------------------------------------------------------------
  {
    console.log("5. Generating poster-combo-savings.jpg...");
    const bgSvg = `
      <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="comboBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#991b1b" />
            <stop offset="60%" stop-color="#7f1d1d" />
            <stop offset="100%" stop-color="#450a0a" />
          </linearGradient>
          <linearGradient id="goldRibbon" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#fbbf24" />
            <stop offset="50%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#d97706" />
          </linearGradient>
        </defs>

        <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#comboBg)" />

        <!-- Festive Celebration Confetti / Circles -->
        <circle cx="200" cy="90" r="12" fill="#fbbf24" opacity="0.3" />
        <circle cx="480" cy="140" r="8" fill="#f87171" opacity="0.4" />
        <circle cx="120" cy="380" r="16" fill="#fbbf24" opacity="0.25" />
        <circle cx="680" cy="220" r="10" fill="#fde047" opacity="0.35" />

        <!-- Base Shelf -->
        <rect x="0" y="490" width="${WIDTH}" height="150" fill="#360505" />
        <rect x="0" y="490" width="${WIDTH}" height="4" fill="url(#goldRibbon)" />

        <!-- Typography Left Side -->
        <text x="70" y="170" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="58" fill="#ffffff" letter-spacing="-0.02em">
          SPECIAL VALUE PACKS
        </text>
        <text x="70" y="250" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="70" fill="#fbbf24" letter-spacing="-0.02em">
          SAVE UP TO 33%!
        </text>
        <text x="70" y="325" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="32" fill="#fee2e2">
          Buy 2 Get 1 Free &amp; Bundled Care Packages
        </text>
        <text x="70" y="380" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="21" fill="#fca5a5" letter-spacing="0.03em">
          BEST VALUE COMBOS FOR EVERY NEPALI HOUSEHOLD
        </text>

        <!-- CTA Button -->
        <rect x="70" y="425" width="310" height="60" rx="8" fill="url(#goldRibbon)" />
        <text x="110" y="463" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="19" fill="#171612" letter-spacing="0.05em">
          CLICK HERE TO GET OFFERS
        </text>
        <path d="M 340,460 L 345,470 L 350,467 L 355,477 L 358,475 L 353,465 L 359,463 Z" fill="#171612" />
      </svg>
    `;

    const pB2G1 = await sharp("src/assets/combos/combo-pitambari-b2g1.jpg")
      .resize({
        width: 310,
        height: 390,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    const pOilTwin = await sharp("src/assets/combos/combo-diya-oil-twin.jpg")
      .resize({
        width: 280,
        height: 410,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    const pEaseTwin = await sharp("src/assets/combos/combo-ease-twin.jpg")
      .resize({
        width: 270,
        height: 390,
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .toBuffer();

    await sharp(Buffer.from(bgSvg))
      .composite([
        { input: pB2G1, left: 710, top: 125 },
        { input: pOilTwin, left: 990, top: 105 },
        { input: pEaseTwin, left: 1240, top: 120 },
      ])
      .jpeg({ quality: 92 })
      .toFile("src/assets/banners/poster-combo-savings.jpg");
  }

  console.log("All 5 posters generated successfully!");
}

generatePosters().catch((err) => {
  console.error("Error generating posters:", err);
  process.exit(1);
});
