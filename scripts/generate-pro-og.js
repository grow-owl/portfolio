import sharp from "sharp";
import path from "path";

async function generateProOG() {
  const logoPath = path.join(process.cwd(), "public", "images", "growowl-logo-white.webp");

  // Resize logo image for top-left container: height 36px
  const logoBuffer = await sharp(logoPath)
    .resize({ height: 36 })
    .png()
    .toBuffer();

  const logoMeta = await sharp(logoBuffer).metadata();

  // Render full SVG with IDE code editor layout
  const baseSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0a0c" />
        <stop offset="50%" stop-color="#121216" />
        <stop offset="100%" stop-color="#08080a" />
      </linearGradient>

      <radialGradient id="redGlow" cx="82%" cy="28%" r="65%">
        <stop offset="0%" stop-color="#c81d1e" stop-opacity="0.38" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>

      <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="24" stdDeviation="32" flood-color="rgba(0, 0, 0, 0.7)" />
      </filter>
      
      <filter id="redGlowBtn">
        <feDropShadow dx="0" dy="6" stdDeviation="14" flood-color="rgba(200, 29, 30, 0.45)" />
      </filter>

      <linearGradient id="redBtn" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#c81d1e" />
        <stop offset="100%" stop-color="#e62e2f" />
      </linearGradient>
    </defs>

    <!-- Canvas Background -->
    <rect width="1200" height="630" fill="url(#bgGrad)" />
    <rect width="1200" height="630" fill="url(#redGlow)" />

    <!-- Delicate Architectural Grid -->
    <g stroke="rgba(255, 255, 255, 0.035)" stroke-width="1">
      <line x1="0" y1="100" x2="1200" y2="100" />
      <line x1="0" y1="200" x2="1200" y2="200" />
      <line x1="0" y1="300" x2="1200" y2="300" />
      <line x1="0" y1="400" x2="1200" y2="400" />
      <line x1="0" y1="500" x2="1200" y2="500" />
      <line x1="150" y1="0" x2="150" y2="630" />
      <line x1="350" y1="0" x2="350" y2="630" />
      <line x1="550" y1="0" x2="550" y2="630" />
      <line x1="750" y1="0" x2="750" y2="630" />
      <line x1="950" y1="0" x2="950" y2="630" />
    </g>

    <!-- LEFT SIDE CONTENT -->
    <g transform="translate(70, 70)">
      <!-- Logo Container Box -->
      <rect x="0" y="0" width="${logoMeta.width + 36}" height="56" rx="12" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.14)" stroke-width="1" />

      <!-- Availability Badge -->
      <g transform="translate(0, 80)">
        <rect x="0" y="0" width="200" height="30" rx="15" fill="rgba(34, 197, 94, 0.12)" stroke="rgba(34, 197, 94, 0.3)" stroke-width="1" />
        <circle cx="15" cy="15" r="4" fill="#22c55e" />
        <text x="27" y="20" font-family="'Inter', -apple-system, sans-serif" font-size="11" font-weight="700" fill="#4ade80" letter-spacing="0.5">AVAILABLE FOR PROJECTS</text>
      </g>

      <!-- Headline -->
      <g transform="translate(0, 155)">
        <text font-family="'Inter', -apple-system, sans-serif" font-size="40" font-weight="800" fill="#ffffff" letter-spacing="-1.2">
          <tspan x="0" y="0">Full-Stack Web</tspan>
          <tspan x="0" y="50">Development &amp;</tspan>
          <tspan x="0" y="100" font-family="Georgia, serif" font-style="italic" fill="#ff4d4d">Bespoke Design</tspan>
        </text>
      </g>

      <!-- Subtitle Rating -->
      <text x="0" y="305" font-family="'Inter', sans-serif" font-size="15" fill="rgba(255,255,255,0.75)" font-weight="450">
        <tspan fill="#f59e0b">★★★★★</tspan> <tspan fill="#ffffff" font-weight="600">5.0/5 Rating</tspan> • Next.js &amp; SEO Agency
      </text>

      <!-- CTA Button -->
      <g transform="translate(0, 345)" filter="url(#redGlowBtn)">
        <rect x="0" y="0" width="190" height="46" rx="23" fill="url(#redBtn)" />
        <svg x="18" y="13" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <text x="48" y="29" font-family="'Inter', sans-serif" font-size="15" font-weight="700" fill="#ffffff">growowl.online</text>
      </g>
    </g>

    <!-- RIGHT SIDE: IDE CODE EDITOR MOCKUP -->
    <g transform="translate(590, 75)" filter="url(#dropShadow)">
      <!-- Outer Frame -->
      <rect x="0" y="0" width="540" height="480" rx="16" fill="#111116" stroke="rgba(255, 255, 255, 0.16)" stroke-width="1.5" />
      
      <!-- Window Titlebar -->
      <path d="M 0 16 Q 0 0 16 0 L 524 0 Q 540 0 540 16 L 540 42 L 0 42 Z" fill="#09090c" />
      <circle cx="20" cy="21" r="5" fill="#ef4444" />
      <circle cx="36" cy="21" r="5" fill="#f59e0b" />
      <circle cx="52" cy="21" r="5" fill="#10b981" />
      
      <!-- File Tab -->
      <g transform="translate(80, 10)">
        <rect x="0" y="0" width="165" height="32" rx="6" fill="#18181f" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <!-- JS Icon -->
        <text x="14" y="21" font-family="'Consolas', 'Courier New', monospace" font-weight="bold" font-size="12" fill="#f7df1e">JS</text>
        <text x="36" y="21" font-family="'Consolas', 'Courier New', monospace" font-size="12" fill="rgba(255, 255, 255, 0.85)">services.config.js</text>
      </g>

      <!-- Code Editor Body -->
      <g transform="translate(0, 42)">
        <rect x="0" y="0" width="540" height="438" fill="#0d0d12" rx="0" />

        <!-- Line Numbers Column -->
        <g font-family="'Consolas', 'Courier New', monospace" font-size="13" fill="rgba(255, 255, 255, 0.25)" text-anchor="end">
          <text x="32" y="32">1</text>
          <text x="32" y="58">2</text>
          <text x="32" y="84">3</text>
          <text x="32" y="110">4</text>
          <text x="32" y="136">5</text>
          <text x="32" y="162">6</text>
          <text x="32" y="188">7</text>
          <text x="32" y="214">8</text>
          <text x="32" y="240">9</text>
          <text x="32" y="266">10</text>
          <text x="32" y="292">11</text>
          <text x="32" y="318">12</text>
          <text x="32" y="344">13</text>
          <text x="32" y="370">14</text>
          <text x="32" y="396">15</text>
        </g>

        <!-- Vertical Separator -->
        <line x1="44" y1="0" x2="44" y2="438" stroke="rgba(255, 255, 255, 0.06)" stroke-width="1" />

        <!-- Syntax Highlighted Code Lines -->
        <g font-family="'Consolas', 'Fira Code', 'Courier New', monospace" font-size="13" font-weight="500">
          <!-- Line 1 -->
          <text x="56" y="32">
            <tspan fill="#c792ea">import</tspan> { <tspan fill="#ffcb6b">GrowOwlStudio</tspan> } <tspan fill="#c792ea">from</tspan> <tspan fill="#c3e88d">"@growowl/agency"</tspan>;
          </text>

          <!-- Line 2 -->
          <text x="56" y="58">
            <tspan fill="#546e7a" font-style="italic">// Our Core Service Capabilities</tspan>
          </text>

          <!-- Line 3 -->
          <text x="56" y="84">
            <tspan fill="#c792ea">export const</tspan> <tspan fill="#82aaff">agencyServices</tspan> = {
          </text>

          <!-- Line 4 -->
          <text x="56" y="110">
            <tspan fill="#7fdbca">  name</tspan>: <tspan fill="#c3e88d">"GrowOwl Studio"</tspan>,
          </text>

          <!-- Line 5 -->
          <text x="56" y="136">
            <tspan fill="#7fdbca">  services</tspan>: [
          </text>

          <!-- Line 6 -->
          <text x="56" y="162">
            <tspan fill="#c3e88d">    "Full-Stack Web Dev (Next.js &amp; React)"</tspan>,
          </text>

          <!-- Line 7 -->
          <text x="56" y="188">
            <tspan fill="#c3e88d">    "Bespoke Web Design &amp; UI/UX Studio"</tspan>,
          </text>

          <!-- Line 8 -->
          <text x="56" y="214">
            <tspan fill="#c3e88d">    "Technical &amp; On-Page SEO Services"</tspan>,
          </text>

          <!-- Line 9 -->
          <text x="56" y="240">
            <tspan fill="#c3e88d">    "Digital Marketing &amp; PPC Ads"</tspan>,
          </text>

          <!-- Line 10 -->
          <text x="56" y="266">
            ],
          </text>

          <!-- Line 11 -->
          <text x="56" y="292">
            <tspan fill="#7fdbca">  techStack</tspan>: [<tspan fill="#c3e88d">"Next.js"</tspan>, <tspan fill="#c3e88d">"React"</tspan>, <tspan fill="#c3e88d">"Node"</tspan>],
          </text>

          <!-- Line 12 -->
          <text x="56" y="318">
            <tspan fill="#7fdbca">  performance</tspan>: <tspan fill="#c3e88d">"Sub-Second Load Speed ⚡"</tspan>,
          </text>

          <!-- Line 13 -->
          <text x="56" y="344">
            <tspan fill="#7fdbca">  status</tspan>: <tspan fill="#c3e88d">"Ready for New Launch 🚀"</tspan>,
          </text>

          <!-- Line 14 -->
          <text x="56" y="370">
            };
          </text>

          <!-- Line 15 -->
          <text x="56" y="396">
            <tspan fill="#c792ea">export default</tspan> <tspan fill="#82aaff">GrowOwlStudio</tspan>;
          </text>
        </g>
      </g>
    </g>
  </svg>
  `;

  // Base background image buffer
  const baseBuffer = await sharp(Buffer.from(baseSvg)).png().toBuffer();

  // Composite Logo directly via sharp
  const outputPath = path.join(process.cwd(), "public", "images", "og-image.png");
  await sharp(baseBuffer)
    .composite([
      {
        input: logoBuffer,
        top: 80,
        left: 88,
      },
    ])
    .png()
    .toFile(outputPath);

  console.log("Successfully generated IDE Code Services OG Image!");
}

generateProOG().catch(console.error);
