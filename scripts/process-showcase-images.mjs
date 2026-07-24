import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'assets', 'showcase');

const files = [
  { input: 'draftmydocu-raw.png', output: 'draftmydocu.webp', topRatio: 0.07, bottomRatio: 0.11 },
  { input: 'getbizora-raw.png', output: 'getbizora.webp', topRatio: 0.07, bottomRatio: 0.11 },
  { input: 'sj-clothing-raw.png', output: 'sj-clothing.webp', topRatio: 0.06, bottomRatio: 0.1 },
];

for (const file of files) {
  const inputPath = path.join(root, file.input);
  const outputPath = path.join(root, file.output);
  const meta = await sharp(inputPath).metadata();
  const top = Math.round(meta.height * file.topRatio);
  const bottom = Math.round(meta.height * file.bottomRatio);
  const height = meta.height - top - bottom;

  await sharp(inputPath)
    .extract({ left: 0, top, width: meta.width, height })
    .resize(1800, null, { withoutEnlargement: false, fit: 'inside' })
    .webp({ quality: 90, effort: 6 })
    .toFile(outputPath);

  console.log(`Processed ${file.output} (${meta.width}x${meta.height} -> cropped)`);
}
