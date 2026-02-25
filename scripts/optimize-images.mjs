import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const INPUT_DIR = './public/images';
const OUTPUT_DIR = './public/images'; // We will save alongside original for now, with .webp extension

async function getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

async function optimize() {
  const files = await getFiles(INPUT_DIR);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.avif') {
      const stats = await fs.stat(file);
      const sizeMB = stats.size / (1024 * 1024);

      const fileName = path.basename(file, ext);
      const dirName = path.dirname(file);
      const outputPath = path.join(dirName, `${fileName}.webp`);

      console.log(`Processing ${path.basename(file)} (${sizeMB.toFixed(2)} MB)...`);

      let pipeline = sharp(file);
      const metadata = await pipeline.metadata();

      // Resize if too large
      if (metadata.width > 2000) {
        console.log(`  Resizing from ${metadata.width}px to 1920px (Hero size)`);
        pipeline = pipeline.resize(1920);
      } else if (metadata.width > 1000 && !fileName.includes('hero')) {
        console.log(`  Resizing from ${metadata.width}px to 1000px (Content size)`);
        pipeline = pipeline.resize(1000);
      }

      await pipeline
        .webp({ quality: 80 })
        .toFile(outputPath);

      const newStats = await fs.stat(outputPath);
      const newSizeKB = newStats.size / 1024;
      console.log(`  Done! New size: ${newSizeKB.toFixed(2)} KB (${((1 - (newStats.size / stats.size)) * 100).toFixed(1)}% reduction)`);
    }
  }
}

optimize().catch(console.error);
