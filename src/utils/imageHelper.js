const sharp = require('sharp');

async function processImage(content) {
  const metadata = await sharp(content).metadata();
  const isTransparent = metadata.hasAlpha;

  const webp = await sharp(content)
    .webp({ quality: 80 })
    .toBuffer();

  const fallback = isTransparent
    ? await sharp(content)
        .png({ compressionLevel: 9 })
        .toBuffer()
    : await sharp(content)
        .jpeg({ quality: 80 })
        .toBuffer();

  return {
    webp,
    fallback,
    isTransparent,
  };
}

module.exports = { processImage };
