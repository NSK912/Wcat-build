import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceImage = 'assets/Wcat seek.png';
const sizes = [16, 24, 32, 48, 64, 128, 256, 512];

async function generate() {
  console.log('Generating icons from:', sourceImage);

  // Ensure directories exist
  fs.mkdirSync('build/icons', { recursive: true });
  fs.mkdirSync('public', { recursive: true });

  // Base 512x512 icon for electron-builder
  await sharp(sourceImage)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile('build/icon.png');

  await sharp(sourceImage)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile('public/icon.png');

  // Generate all icon sizes in build/icons/
  for (const size of sizes) {
    const iconPath = path.join('build/icons', `${size}x${size}.png`);
    await sharp(sourceImage)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(iconPath);
    console.log(`Generated: ${iconPath}`);
  }

  console.log('Icons generated successfully!');
}

generate().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
