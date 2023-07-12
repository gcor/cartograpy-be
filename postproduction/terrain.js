const gdal = require("gdal");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

function createMapboxTiles(hgtFilePath, outputDir) {
  const dataset = gdal.open(hgtFilePath);
  const width = dataset.rasterSize.x;
  const height = dataset.rasterSize.y;
  const tileSize = 256;

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (let y = 0; y < height; y += tileSize) {
    for (let x = 0; x < width; x += tileSize) {
      const tileX = Math.floor(x / tileSize);
      const tileY = Math.floor(y / tileSize);

      const buffer = new Buffer(tileSize * tileSize * 2);
      const band = dataset.bands.get(1);
      band.readRaster(
        x,
        y,
        tileSize,
        tileSize,
        tileSize,
        tileSize,
        buffer,
        "int16",
        0,
        tileSize
      );

      const tile = Buffer.from(buffer);

      const pngBuffer = sharp(tile, {
        raw: {
          width: tileSize,
          height: tileSize,
          channels: 1,
        },
      })
        .png()
        .toBuffer();

      const tilePath = path.join(outputDir, `${tileX}_${tileY}.png`);
      fs.writeFileSync(tilePath, pngBuffer);
    }
  }

  dataset.close();
}

const hgtFilePath = "../data/N56E060.hgt";
const outputDir = "../data/terrains";

createMapboxTiles(hgtFilePath, outputDir);
