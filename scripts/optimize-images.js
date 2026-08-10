import sharp from "sharp";
import fs from "fs";
import path from "path";

const imagesDir = path.join(process.cwd(), "public", "images");
const files = fs.readdirSync(imagesDir);

async function optimize() {
  for (const file of files) {
    if (!file.endsWith(".webp")) continue;
    const filePath = path.join(imagesDir, file);
    const statsBefore = fs.statSync(filePath);
    const tempPath = filePath + ".tmp";

    try {
      await sharp(filePath)
        .webp({ quality: 80, effort: 6 })
        .toFile(tempPath);

      const statsAfter = fs.statSync(tempPath);
      if (statsAfter.size < statsBefore.size) {
        fs.renameSync(tempPath, filePath);
        console.log(`Optimized ${file}: ${statsBefore.size} -> ${statsAfter.size} bytes (${Math.round((1 - statsAfter.size / statsBefore.size) * 100)}% smaller)`);
      } else {
        fs.unlinkSync(tempPath);
        console.log(`Kept original ${file}: ${statsBefore.size} bytes`);
      }
    } catch (err) {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      console.error(`Error optimizing ${file}:`, err);
    }
  }
}

optimize();
