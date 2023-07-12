const { Client, Pool } = require("pg");

const dbConfig = {
  user: "baremaps",
  host: "localhost",
  database: "baremaps",
  password: "baremaps",
  port: 5432,
};

async function insertBuildingAge(table) {
  const collection = require("../data/ekb_house.json");
  const pool = new Pool(dbConfig);
  const client = await pool.connect();

  try {
    // begin transaction
    // await client.query("BEGIN");

    let i = 0;
    for (let feature of collection.features) {
      const age = feature.properties?.r_year_int;

      if (age) {
        // const query = `
        // SELECT id, tags, geom
        // FROM osm_ways
        // WHERE tags ? 'building' AND
        //     ST_Intersects(
        //         ST_Buffer(geom, 0),
        //     ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON('${JSON.stringify(
        //       feature.geometry
        //     )}'), 4326), 3857)
        //     );
        // `;

        const query = `
            UPDATE ${table}
            SET tags = tags || ('{"building:year": ${age}}')::jsonb
            WHERE tags ? 'building' AND ST_Intersects(
                geom,
                ST_Transform(ST_SetSRID(ST_GeomFromGeoJSON('${JSON.stringify(
                  feature.geometry
                )}'), 4326), 3857)
            );
          `;

        // execute the update query
        try {
          const result = await client.query(query);
          // console.log(i++, result.rows);
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

// insertBuildingAge("osm_ways");
// insertBuildingAge("osm_relations");

async function removeDuplicates() {
  const client = new Client(dbConfig);

  await client.connect();

  const deleteDuplicatesQuery = `
  WITH cte AS (
    SELECT id, geom, tags,
      ROW_NUMBER() OVER(PARTITION BY geom, tags ORDER BY id) AS rn
    FROM osm_ways
  )
  DELETE FROM osm_ways
  WHERE id IN (SELECT id FROM cte WHERE rn > 1);
  `;

  try {
    const response = await client.query(deleteDuplicatesQuery);
    console.log("Duplicates deleted successfully", response.rows);
  } catch (err) {
    console.error("Error executing query", err.stack);
  }

  await client.end();
}

// removeDuplicates();
