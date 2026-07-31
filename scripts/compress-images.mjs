import fs from "fs";
import path from "path";
import sharp from "sharp";

const imagesDir = path.join(process.cwd(), "public", "images");

async function compressImages() {
  const files = fs.readdirSync(imagesDir);
  console.log(`Starting compression for ${files.length} images in ${imagesDir}...`);

  for (const file of files) {
    if (!file.endsWith(".webp")) continue;

    const filePath = path.join(imagesDir, file);
    const originalSize = fs.statSync(filePath).size;
    const tempPath = path.join(imagesDir, `temp_${file}`);

    try {
      const inputBuffer = fs.readFileSync(filePath);
      const outputBuffer = await sharp(inputBuffer)
        .webp({ quality: 82, effort: 6 })
        .toBuffer();

      const newSize = outputBuffer.length;

      if (newSize < originalSize) {
        fs.writeFileSync(filePath, outputBuffer);
        const savedPercent = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
        console.log(`[Compressed] ${file}: ${(originalSize / 1024).toFixed(1)} KB -> ${(newSize / 1024).toFixed(1)} KB (-${savedPercent}%)`);
      } else {
        console.log(`[Kept Original] ${file}: ${(originalSize / 1024).toFixed(1)} KB (already optimal)`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

compressImages();
