const { Client, Pool } = require("pg");
const ekbHousesGeoJSON = require("./ekb_house.json");

const dbConfig = {
  user: "baremaps",
  host: "localhost",
  database: "baremaps",
  password: "baremaps",
  port: 5432,
};

const pool = new Pool(dbConfig);

async function insertBuildingAge(collection = ekbHousesGeoJSON) {
  const client = await pool.connect();

  try {
    // begin transaction
    // await client.query("BEGIN");

    let i = 0;
    for (let feature of collection.features) {
      const age = feature.properties?.r_year_int;

      if (age) {
        const query = `
        SELECT id, tags, geom
        FROM osm_ways
        WHERE tags ? 'building' AND
            ST_Intersects(
                ST_Buffer(geom, 0),
            ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON('${JSON.stringify(
              feature.geometry
            )}'), 4326), 3857)
            );
        `;

        // const query = `
        //     UPDATE osm_ways
        //     SET tags = tags || ('{"building:year": ${age}}')::jsonb
        //     WHERE tags ? 'building' AND ST_Intersects(
        //         geom,
        //         ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON('${JSON.stringify(
        //           feature.geometry
        //         )}'), 4326), 3857)
        //     );
        //   `;

        // execute the update query
        try {
          const result = await client.query(query);
          console.log(i++, result.rows);
        } catch (e) {
          console.log(e.message);
        }
        // console.log(result.rows, age);
      }
    }

    // if everything is successful, commit the transaction
    // await client.query("COMMIT");
    console.log("COMMIT");
  } catch (err) {
    // if any of the queries failed, perform a rollback
    // await client.query("ROLLBACK");
    // console.log("ROLLBACK");
    console.error(err);
  } finally {
    // whether successful or not, release the client back to the pool
    // client.release();
    console.log("done");
  }
}

insertBuildingAge();
// async function findMatchingBuildings() {
//   const client = new Client(dbConfig);
//   await client.connect();

//   const b2 = {
//     geometry: {
//       coordinates: [
//         [
//           [60.624378, 56.822634],
//           [60.624474, 56.822317],
//           [60.625248, 56.822387],
//           [60.625152, 56.822705],
//           [60.624378, 56.822634],
//         ],
//       ],
//       type: "Polygon",
//     },
//     properties: {},
//     type: "Feature",
//   };

//   try {
//     const query = `
//     SELECT id, tags, geom
//     FROM osm_ways
//     WHERE tags ? 'building' AND
//         ST_Intersects(
//         geom,
//         ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON('${JSON.stringify(
//           b2.geometry
//         )}'), 4326), 3857)
//         );
//     `;

//     // const query = `
//     // UPDATE osm_ways
//     // SET tags = tags || ('{"building:age": "${10}"}')::jsonb
//     // WHERE tags ? 'building' AND ST_Intersects(
//     //     geom,
//     //     ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON('${JSON.stringify(
//     //       b2.geometry
//     //     )}'), 4326), 3857)
//     // );
//     // `;

//     const osmWaysData = await client.query(query);
//     const osmWays = osmWaysData.rows;

//     console.log(osmWays);
//   } catch (error) {
//     console.error("Error:", error);
//   } finally {
//     await client.end();
//   }
// }

// findMatchingBuildings();

// const proj4 = require("proj4");
// const wkx = require("wkx");
// const turf = require("@turf/turf");

// function convertToGeoJSON(osmWays) {
//   return osmWays.map((o) => {
//     const geometry = wkx.Geometry.parse(new Buffer.from(o.geom, "hex"));

//     return {
//       type: "Feature",
//       properties: o.tags,
//       geometry: {
//         type: "Polygon",
//         coordinates: [
//           geometry.exteriorRing?.map((point) => {
//             console.log(geometry);
//             const [lon, lat] = proj4("EPSG:3857", "EPSG:4326", [
//               point.x,
//               point.y,
//             ]);
//             return [lon, lat];
//           }),
//         ],
//       },
//     };
//   });
// }

// async function findMatchingBuildings() {
//   const client = new Client(dbConfig);
//   await client.connect();

//   try {
//     const query = "SELECT id, tags, geom FROM osm_ways WHERE tags ? 'building'";
//     const osmWaysData = await client.query(query);
//     const osmWays = osmWaysData.rows;

//     const ageHousesData = geojson.features.filter(
//       (feature) => feature.properties?.r_year_int > 0
//     );

//     const osmHousesData = convertToGeoJSON(osmWays);

//     osmHousesData.map((osmHouse) => {
//       const ageHouse = ageHousesData.find((house) =>
//         turf.booleanOverlap(osmHouse.geometry, house.geometry)
//       );
//       if (ageHouse) {
//         console.log(osmHouse.geometry, ageHouse.geometry);
//       }
//     });
//   } catch (error) {
//     console.error("Error:", error);
//   } finally {
//     await client.end();
//   }
// }

// findMatchingBuildings();
