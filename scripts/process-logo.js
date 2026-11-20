const sharp = require('sharp');
const fs = require('fs');

async function processLogo() {
  const src = 'C:/Users/Windows Lite BR/.gemini/antigravity/brain/9ea004cb-efb4-4ae6-869f-558b61a4641f/.user_uploaded/media_1795208143202_b25a15b6.jpg';
  
  const { data, info } = await sharp(src)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const rgba = Buffer.alloc(width * height * 4);

  // Flood fill from all 4 corners
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height * 2);
  let head = 0;
  let tail = 0;

  function isOuterBlack(x, y) {
    const idx = (y * width + x) * channels;
    return data[idx] <= 15 && data[idx + 1] <= 15 && data[idx + 2] <= 15;
  }

  // Push boundary pixels
  for (let x = 0; x < width; x++) {
    if (isOuterBlack(x, 0)) {
      visited[x] = 1;
      queue[tail++] = x;
      queue[tail++] = 0;
    }
    if (isOuterBlack(x, height - 1)) {
      visited[(height - 1) * width + x] = 1;
      queue[tail++] = x;
      queue[tail++] = height - 1;
    }
  }
  for (let y = 0; y < height; y++) {
    if (isOuterBlack(0, y)) {
      if (!visited[y * width]) {
        visited[y * width] = 1;
        queue[tail++] = 0;
        queue[tail++] = y;
      }
    }
    if (isOuterBlack(width - 1, y)) {
      if (!visited[y * width + width - 1]) {
        visited[y * width + width - 1] = 1;
        queue[tail++] = width - 1;
        queue[tail++] = y;
      }
    }
  }

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  while (head < tail) {
    const cx = queue[head++];
    const cy = queue[head++];

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nPos = ny * width + nx;
        if (!visited[nPos] && isOuterBlack(nx, ny)) {
          visited[nPos] = 1;
          queue[tail++] = nx;
          queue[tail++] = ny;
        }
      }
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pPos = y * width + x;
      const srcIdx = pPos * channels;
      const dstIdx = pPos * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      rgba[dstIdx] = r;
      rgba[dstIdx + 1] = g;
      rgba[dstIdx + 2] = b;

      if (visited[pPos]) {
        rgba[dstIdx + 3] = 0;
      } else {
        // Feather edge
        let neighborIsBg = false;
        for (let i = 0; i < 4; i++) {
          const nx = x + dx[i];
          const ny = y + dy[i];
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            if (visited[ny * width + nx]) {
              neighborIsBg = true;
              break;
            }
          }
        }
        if (neighborIsBg && r < 35 && g < 35 && b < 35) {
          const brightness = Math.max(r, g, b);
          rgba[dstIdx + 3] = Math.min(255, Math.floor((brightness / 35) * 255));
        } else {
          rgba[dstIdx + 3] = 255;
        }
      }
    }
  }

  // Save full-res transparent PNG & WebP
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('public/images/mktech-logo.png');

  await sharp('public/images/mktech-logo.png')
    .webp({ quality: 95 })
    .toFile('public/images/mktech-logo.webp');

  // Next.js App Router App Icon (32x32, 192x192, 512x512)
  await sharp('public/images/mktech-logo.png')
    .resize(192, 192)
    .png()
    .toFile('src/app/icon.png');

  await sharp('public/images/mktech-logo.png')
    .resize(180, 180)
    .png()
    .toFile('src/app/apple-icon.png');

  await sharp('public/images/mktech-logo.png')
    .resize(64, 64)
    .png()
    .toFile('public/favicon.ico');

  // Also create a 32x32 favicon.png
  await sharp('public/images/mktech-logo.png')
    .resize(32, 32)
    .png()
    .toFile('public/favicon-32x32.png');

  console.log('Successfully generated all logo formats and favicons!');
}

processLogo().catch(console.error);
