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

import aerialway from "./layers/aerialway/tileset.js";
import aeroway from "./layers/aeroway/tileset.js";
import amenity from "./layers/amenity/tileset.js";
import attraction from "./layers/attraction/tileset.js";
import barrier from "./layers/barrier/tileset.js";
import building from "./layers/building/tileset.js";
import highway from "./layers/highway/tileset.js";
import natural from "./layers/natural/tileset.js";
import leisure from "./layers/leisure/tileset.js";
import landuse from "./layers/landuse/tileset.js";
import railway from "./layers/railway/tileset.js";
import route from "./layers/route/tileset.js";
import man_made from "./layers/man_made/tileset.js";
import power from "./layers/power/tileset.js";
import point from "./layers/point/tileset.js";
import waterway from "./layers/waterway/tileset.js";

export default {
  tilejson: "2.2.0",
  center: [...config.center, config.zoom],
  minzoom: config.minZoom,
  maxzoom: config.maxZoom,
  bounds: [60.2768, 56.6769, 60.8812, 56.9579],
  tiles: [`${config.host}/tiles/{z}/{x}/{y}.mvt`],
  attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> ',
  vector_layers: [
    aerialway,
    aeroway,
    amenity,
    attraction,
    barrier,
    building,
    highway,
    landuse,
    leisure,
    man_made,
    natural,
    point,
    power,
    railway,
    route,
    waterway,
  ],
};

// background
// member
// labels
// linestring
// tourism
// polygon
// "public_transport"
// "geological"
// "craft"
// "emergency"
// "historic"
// "military"
// "natural"
// "office"
// "place"
// "shop"
// "sport"
// "telecom"
// "tourism"
