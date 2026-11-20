const sharp = require('sharp');
const fs = require('fs');

async function processImage() {
  const { data, info } = await sharp('public/images/mktech-character.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  // create RGBA buffer
  const rgba = Buffer.alloc(width * height * 4);
  
  // Flood fill / BFS from boundary to find all connected background pixels
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height * 2);
  let head = 0;
  let tail = 0;

  function isBackgroundCandidate(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Black or near black background
    return r <= 15 && g <= 15 && b <= 15;
  }

  // Push all border pixels that are candidate background
  for (let x = 0; x < width; x++) {
    if (isBackgroundCandidate(x, 0)) {
      visited[x] = 1;
      queue[tail++] = x;
      queue[tail++] = 0;
    }
    if (isBackgroundCandidate(x, height - 1)) {
      visited[(height - 1) * width + x] = 1;
      queue[tail++] = x;
      queue[tail++] = height - 1;
    }
  }
  for (let y = 0; y < height; y++) {
    if (isBackgroundCandidate(0, y)) {
      if (!visited[y * width]) {
        visited[y * width] = 1;
        queue[tail++] = 0;
        queue[tail++] = y;
      }
    }
    if (isBackgroundCandidate(width - 1, y)) {
      if (!visited[y * width + width - 1]) {
        visited[y * width + width - 1] = 1;
        queue[tail++] = width - 1;
        queue[tail++] = y;
      }
    }
  }

  // BFS
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
        if (!visited[nPos] && isBackgroundCandidate(nx, ny)) {
          visited[nPos] = 1;
          queue[tail++] = nx;
          queue[tail++] = ny;
        }
      }
    }
  }

  // Now fill RGBA
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
        // purely transparent
        rgba[dstIdx + 3] = 0;
      } else {
        // Check if neighboring a visited pixel to smooth / antialias
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
        if (neighborIsBg && r < 30 && g < 30 && b < 30) {
          // edge feather
          const brightness = Math.max(r, g, b);
          rgba[dstIdx + 3] = Math.min(255, Math.floor((brightness / 30) * 255));
        } else {
          rgba[dstIdx + 3] = 255;
        }
      }
    }
  }

  await sharp(rgba, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png()
    .toFile('public/images/mktech-character.png');

  console.log('Successfully generated public/images/mktech-character.png');
}

processImage().catch(console.error);
