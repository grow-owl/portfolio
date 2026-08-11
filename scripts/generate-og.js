import sharp from "sharp";
import fs from "fs";
import path from "path";

async function generateOG() {
  const logoPath = path.join(process.cwd(), "public", "images", "growowl-logo.webp");
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = `data:image/webp;base64,${logoBuffer.toString("base64")}`;

  const svg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Subtle Radial Accent Glows -->
      <radialGradient id="redGlowTop" cx="85%" cy="15%" r="60%" fx="85%" fy="15%">
        <stop offset="0%" stop-color="#c81d1e" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#ebe8e4" stop-opacity="0" />
      </radialGradient>
      
      <radialGradient id="redGlowBottom" cx="15%" cy="85%" r="50%" fx="15%" fy="85%">
        <stop offset="0%" stop-color="#c81d1e" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#ebe8e4" stop-opacity="0" />
      </radialGradient>

      <!-- Soft Grid Pattern -->
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(30, 30, 30, 0.035)" stroke-width="1" />
      </pattern>

      <!-- Glass Card Filter Shadow -->
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="rgba(30, 30, 30, 0.06)" />
      </filter>

      <!-- Red Button Gradient -->
      <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#c81d1e" />
        <stop offset="100%" stop-color="#b01819" />
      </linearGradient>
    </defs>

    <!-- Base Canvas Background -->
    <rect width="1200" height="630" fill="#ebe8e4" />
    
    <!-- Background Ambient Glows -->
    <rect width="1200" height="630" fill="url(#redGlowTop)" />
    <rect width="1200" height="630" fill="url(#redGlowBottom)" />

    <!-- Delicate Architectural Grid Lines -->
    <rect width="1200" height="630" fill="url(#grid)" />

    <!-- Corner Decorative Accents -->
    <text x="60" y="80" font-family="Georgia, serif" font-style="italic" font-size="20" fill="#c81d1e" font-weight="500">/001/</text>
    <text x="1080" y="80" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="rgba(30,30,30,0.4)" letter-spacing="3">DIGITAL STUDIO</text>

    <!-- Main Glass Card Container -->
    <rect x="50" y="110" width="1100" height="470" rx="28" fill="rgba(255, 255, 255, 0.75)" stroke="rgba(30, 30, 30, 0.12)" stroke-width="1.5" filter="url(#shadow)" />

    <!-- Top Header inside Card -->
    <g transform="translate(90, 145)">
      <!-- Logo Image -->
      <image href="${logoBase64}" x="0" y="0" height="42" width="165" />
      
      <!-- Availability Badge -->
      <g transform="translate(730, 4)">
        <rect x="0" y="0" width="190" height="34" rx="17" fill="rgba(30,30,30,0.05)" stroke="rgba(30,30,30,0.1)" stroke-width="1" />
        <circle cx="20" cy="17" r="4" fill="#22c55e" />
        <text x="32" y="22" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#1e1e1e">Available for projects</text>
      </g>
    </g>

    <!-- Main Headline Text -->
    <g transform="translate(90, 260)">
      <text x="0" y="0" font-family="'Inter', sans-serif" font-size="44" font-weight="800" fill="#1e1e1e" letter-spacing="-1.5">
        Full-Stack Web Development,
      </text>
      <text x="0" y="56" font-family="'Inter', sans-serif" font-size="44" font-weight="800" fill="#1e1e1e" letter-spacing="-1.5">
        Bespoke <tspan font-family="Georgia, serif" font-style="italic" font-weight="500" fill="#c81d1e">Web Design</tspan> &amp; SEO
      </text>
    </g>

    <!-- Subtitle / Value Statement -->
    <text x="90" y="405" font-family="'Inter', sans-serif" font-size="20" font-weight="450" fill="rgba(30,30,30,0.75)">
      We engineer high-speed Next.js digital experiences &amp; lead generation campaigns.
    </text>

    <!-- Divider Line -->
    <line x1="90" y1="450" x2="1010" y2="450" stroke="rgba(30, 30, 30, 0.08)" stroke-width="1" />

    <!-- Bottom Metadata Bar -->
    <g transform="translate(90, 485)">
      <!-- Domain Pill -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="180" height="42" rx="21" fill="url(#btnGrad)" />
        <!-- Globe Icon -->
        <svg x="16" y="11" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <text x="46" y="26" font-family="'Inter', sans-serif" font-size="14" font-weight="700" fill="#ffffff">growowl.online</text>
      </g>

      <!-- Tech Stack Badges -->
      <g transform="translate(620, 10)">
        <text x="0" y="18" font-family="'Inter', sans-serif" font-size="14" font-weight="600" fill="rgba(30,30,30,0.7)">
          Next.js <tspan fill="#c81d1e">•</tspan> React <tspan fill="#c81d1e">•</tspan> SEO <tspan fill="#c81d1e">•</tspan> UI/UX Studio
        </text>
      </g>
    </g>
  </svg>
  `;

  const outputPath = path.join(process.cwd(), "public", "images", "og-image.png");
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  console.log("Successfully generated OG image at:", outputPath);
}

generateOG().catch(console.error);
