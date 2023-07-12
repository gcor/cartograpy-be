const fs = require("fs");

const filePath = "../../__data/sverdlovskaia-oblast.geojson";
const outputFilePath = "../../__data/dtp.geojson";
const bound = {
  minX: 60.2768,
  maxX: 60.8812,
  minY: 56.6769,
  maxY: 56.9579,
};

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  try {
    const geojson = JSON.parse(data);
    const features = geojson.features.filter((feature) => {
      const { coordinates } = feature.geometry;
      const [longitude, latitude] = coordinates;

      return (
        coordinates &&
        coordinates.length === 2 &&
        longitude !== null &&
        latitude !== null &&
        longitude >= bound.minX &&
        longitude <= bound.maxX &&
        latitude >= bound.minY &&
        latitude <= bound.maxY
      );
    });
    geojson.features = features;

    const updatedData = JSON.stringify(geojson, null, 2);

    fs.writeFile(outputFilePath, updatedData, "utf8", (err) => {
      if (err) {
        console.error("Error writing the updated file:", err);
        return;
      }

      console.log("The file has been successfully updated!");
    });
  } catch (error) {
    console.error("Error parsing the GeoJSON:", error);
  }
});
