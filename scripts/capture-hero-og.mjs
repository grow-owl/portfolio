import { spawn } from "child_process";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const chromePath = "C:\\Users\\amars\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe";
const userDataDir = path.join(process.cwd(), ".chrome-cdp-temp");

async function main() {
  console.log("Starting Chrome with remote debugging...");
  const chromeProc = spawn(chromePath, [
    "--remote-debugging-port=9222",
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--user-data-dir=${userDataDir}`,
    "about:blank"
  ]);

  // Wait for Chrome to start
  await new Promise((r) => setTimeout(r, 2000));

  try {
    const verRes = await fetch("http://127.0.0.1:9222/json/version");
    const verData = await verRes.json();
    console.log("Browser WebSocket URL:", verData.webSocketDebuggerUrl);

    const ws = new WebSocket(verData.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 1;
    function sendCommand(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === id) {
            ws.removeEventListener("message", handler);
            resolve(data.result);
          }
        };
        ws.addEventListener("message", handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    // Create page target
    const { targetId } = await sendCommand("Target.createTarget", { url: "http://localhost:3000/" });
    const { sessionId } = await sendCommand("Target.attachToTarget", { targetId, flatten: true });

    function sendPageCommand(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === id) {
            ws.removeEventListener("message", handler);
            resolve(data.result);
          }
        };
        ws.addEventListener("message", handler);
        ws.send(JSON.stringify({ id, method, params, sessionId }));
      });
    }

    await sendPageCommand("Page.enable");
    await sendPageCommand("Emulation.setDeviceMetricsOverride", {
      width: 1200,
      height: 630,
      deviceScaleFactor: 2,
      mobile: false,
      fitWindow: false
    });

    // Hide scrollbar for clean screenshot
    await sendPageCommand("Runtime.evaluate", {
      expression: `
        const style = document.createElement('style');
        style.innerHTML = '::-webkit-scrollbar { display: none !important; } * { scrollbar-width: none !important; } html, body { overflow: hidden !important; }';
        document.head.appendChild(style);
      `
    });

    // Wait for page to fully load and animations/fonts to settle
    await new Promise((r) => setTimeout(r, 4000));

    console.log("Capturing screenshot...");
    const screenshotResult = await sendPageCommand("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
      fromSurface: true
    });

    const buffer = Buffer.from(screenshotResult.data, "base64");
    console.log("Raw screenshot size:", buffer.length);

    // Optimize with Sharp to exactly 1200x630 PNG with crisp quality and optimized compression
    const ogPath = path.join(process.cwd(), "public", "images", "og-image.png");

    await sharp(buffer)
      .resize(1200, 630, {
        fit: "cover",
        position: "top",
        kernel: sharp.kernel.lanczos3
      })
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true,
        quality: 100
      })
      .toFile(ogPath);

    console.log("Successfully generated optimized og-image.png at:", ogPath);

    ws.close();
  } finally {
    chromeProc.kill();
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch {}
  }
}

main().catch(console.error);
