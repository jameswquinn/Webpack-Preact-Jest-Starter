const sharp = require('sharp');
const path = require('path');

async function hasTransparentBackground(imagePath) {
  try {
    const image = sharp(imagePath);
    const stats = await image.stats();
    return stats.channels[3]?.min !== stats.channels[3]?.max;
  } catch (error) {
    console.error('Error checking image transparency:', error);
    return false;
  }
}

async function processImage(imagePath, outputPath, sizes) {
  const isTransparent = await hasTransparentBackground(imagePath);
  const basename = path.basename(imagePath, path.extname(imagePath));
  
  const formats = isTransparent ? ['webp', 'png'] : ['webp', 'jpg'];
  
  const results = [];

  for (const format of formats) {
    for (const size of sizes) {
      const outputFilename = `${basename}-${size}.${format}`;
      const outputFilePath = path.join(outputPath, outputFilename);
      
      await sharp(imagePath)
        .resize(size)
        [format]({ quality: 80 })
        .toFile(outputFilePath);
      
      results.push({
        src: outputFilename,
        width: size,
        format: format
      });
    }
  }

  // Generate placeholder
  const placeholder = await sharp(imagePath)
    .resize(20)
    .blur()
    .toBuffer()
    .then(buffer => `data:image/png;base64,${buffer.toString('base64')}`);

  results[0].placeholder = placeholder;

  return results;
}

module.exports = { processImage, hasTransparentBackground };
