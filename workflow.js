/**
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License
 is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 or implied. See the License for the specific language governing permissions and limitations under
 the License.
 **/
import config from "./config.js";

export default {
  steps: [
    {
      id: "openstreetmap-data",
      needs: [],
      tasks: [
        // {
        //   type: "DownloadUrl",
        //   url: config.osmPbfUrl,
        //   path: "data/data.osm.pbf",
        // },
        {
          type: "ImportOpenStreetMap",
          file: config.osmPbf,
          database: config.database,
          databaseSrid: 3857,
        },
      ],
    },
    {
      id: "openstreetmap-nodes",
      needs: ["openstreetmap-data"],
      tasks: [
        {
          type: "ExecuteSql",
          file: "queries/osm_nodes.sql",
          database: config.database,
          parallel: true,
        },
      ],
    },
    {
      id: "openstreetmap-ways",
      needs: ["openstreetmap-data"],
      tasks: [
        {
          type: "ExecuteSql",
          file: "queries/osm_ways.sql",
          database: config.database,
          parallel: true,
        },
      ],
    },
    {
      id: "openstreetmap-relations",
      needs: ["openstreetmap-data"],
      tasks: [
        {
          type: "ExecuteSql",
          file: "queries/osm_relations.sql",
          database: config.database,
          parallel: true,
        },
      ],
    },
    {
      id: "openstreetmap-member",
      needs: ["openstreetmap-data"],
      tasks: [
        {
          type: "ExecuteSql",
          file: "layers/member/prepare.sql",
          database: config.database,
        },
      ],
    },
    {
      id: "openstreetmap-point",
      needs: ["openstreetmap-nodes"],
      tasks: [
        {
          type: "ExecuteSql",
          file: "layers/point/clean.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/point/simplify.sql",
          database: config.database,
          parallel: true,
        },
        {
          type: "ExecuteSql",
          file: "layers/point/index.sql",
          database: config.database,
          parallel: true,
        },
      ],
    },
    {
      id: "openstreetmap-linestring",
      needs: ["openstreetmap-member"],
      tasks: [
        {
          type: "ExecuteSql",
          file: "layers/linestring/clean.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/linestring/prepare.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/linestring/index.sql",
          database: config.database,
        },
      ],
    },
    {
      id: "openstreetmap-polygon",
      needs: ["openstreetmap-member"],
      tasks: [
        {
          type: "ExecuteSql",
          file: "layers/polygon/clean.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/polygon/prepare.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/polygon/index.sql",
          database: config.database,
        },
      ],
    },
    {
      id: "openstreetmap-highway",
      needs: ["openstreetmap-linestring"],
      tasks: [
        {
          type: "ExecuteSql",
          file: "layers/highway/clean.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/highway/prepare.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/highway/simplify.sql",
          database: config.database,
          parallel: true,
        },
        {
          type: "ExecuteSql",
          file: "layers/highway/index.sql",
          database: config.database,
          parallel: true,
        },
      ],
    },
    {
      id: "openstreetmap-railway",
      needs: ["openstreetmap-linestring"],
      tasks: [
        {
          type: "ExecuteSql",
          file: "layers/railway/clean.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/railway/prepare.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/railway/simplify.sql",
          database: config.database,
          parallel: true,
        },
        {
          type: "ExecuteSql",
          file: "layers/railway/index.sql",
          database: config.database,
          parallel: true,
        },
      ],
    },
    {
      id: "openstreetmap-route",
      needs: ["openstreetmap-linestring"],
      tasks: [
        {
          type: "ExecuteSql",
          file: "layers/route/clean.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/route/prepare.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/route/simplify.sql",
          database: config.database,
          parallel: true,
        },
        {
          type: "ExecuteSql",
          file: "layers/route/index.sql",
          database: config.database,
          parallel: true,
        },
      ],
    },
    {
      id: "openstreetmap-natural",
      needs: ["openstreetmap-polygon"],
      tasks: [
        {
          type: "ExecuteSql",
          file: "layers/natural/clean.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/natural/prepare.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/natural/simplify.sql",
          database: config.database,
          parallel: true,
        },
        {
          type: "ExecuteSql",
          file: "layers/natural/index.sql",
          database: config.database,
          parallel: true,
        },
      ],
    },
    {
      id: "openstreetmap-landuse",
      needs: ["openstreetmap-polygon"],
      tasks: [
        {
          type: "ExecuteSql",
          file: "layers/landuse/clean.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/landuse/prepare.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/landuse/simplify.sql",
          database: config.database,
          parallel: true,
        },
        {
          type: "ExecuteSql",
          file: "layers/landuse/index.sql",
          database: config.database,
          parallel: true,
        },
      ],
    },
    {
      id: "openstreetmap-waterway",
      needs: ["openstreetmap-linestring"],
      tasks: [
        {
          type: "ExecuteSql",
          file: "layers/waterway/clean.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/waterway/prepare.sql",
          database: config.database,
        },
        {
          type: "ExecuteSql",
          file: "layers/waterway/simplify.sql",
          database: config.database,
          parallel: true,
        },
        {
          type: "ExecuteSql",
          file: "layers/waterway/index.sql",
          database: config.database,
          parallel: true,
        },
      ],
    },
  ],
};
