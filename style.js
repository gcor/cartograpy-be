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

import background from "./layers/background/style.js";
import aeroway_line from "./layers/aeroway/line.js";
import aeroway_polygon from "./layers/aeroway/polygon.js";
import amenity_background from "./layers/amenity/background.js";
import amenity_fountain from "./layers/amenity/fountain.js";
import amenity_overlay from "./layers/amenity/overlay.js";
import landuse_background from "./layers/landuse/background.js";
import landuse_overlay from "./layers/landuse/overlay.js";
import natural_background from "./layers/natural/background.js";
import natural_overlay from "./layers/natural/overlay.js";
import natural_tree from "./layers/natural/tree.js";
import natural_trunk from "./layers/natural/trunk.js";
import power_background from "./layers/power/background.js";
import power_tower from "./layers/power/tower.js";
import power_cable from "./layers/power/cable.js";
import leisure_background from "./layers/leisure/background.js";
import leisure_overlay from "./layers/leisure/overlay.js";
import railway_tunnel from "./layers/railway/tunnel.js";
import railway_line from "./layers/railway/line.js";
import highway_line, {
  highway_line_paint,
} from "./layers/highway/highway_line.js";
import highway_outline from "./layers/highway/highway_outline.js";
import highway_dash from "./layers/highway/highway_dash.js";
import highway_tunnel_line from "./layers/highway/tunnel_line.js";
import highway_tunnel_outline from "./layers/highway/tunnel_outline.js";
import highway_pedestrian_area from "./layers/highway/pedestrian_area.js";
import highway_bridge_line from "./layers/highway/bridge_line.js";
import highway_bridge_outline from "./layers/highway/bridge_outline.js";
import highway_label from "./layers/highway/highway_label.js";
import route_line from "./layers/route/style.js";
import building_shape from "./layers/building/shape.js";
import building_number from "./layers/building/number.js";
import man_made_bridge from "./layers/man_made/bridge.js";
import man_made_pier_line from "./layers/man_made/pier_line.js";
import man_made_pier_label from "./layers/man_made/pier_label.js";
import waterway_line from "./layers/waterway/line.js";
import waterway_label from "./layers/waterway/label.js";
import waterway_tunnel_line from "./layers/waterway/tunnel_line.js";
import waterway_tunnel_casing from "./layers/waterway/tunnel_casing.js";
import icon from "./layers/point/icon.js";
import label from "./layers/point/label.js";

export default {
  version: 8,
  name: "OpenStreetMapVecto",
  center: config.center,
  zoom: config.zoom,
  sources: {
    baremaps: {
      type: "vector",
      url: `${config.host}/tiles.json`,
    },
  },
  sprite: `https://tiles.baremaps.com/sprites/osm/sprite`,
  glyphs: "https://cartography-zeta.vercel.app/fonts/{fontstack}/{range}.pbf",
  layers: [
    {
      ...background,
      paint: {
        "background-color": "#010508",
      },
    },
    // power_background,
    // landuse_background,
    {
      ...natural_background,
      paint: {
        "fill-color": [
          "case",
          // ["==", ["get", "natural"], "glacier"],
          // "rgb(221, 236, 236)",
          ["==", ["get", "natural"], "wood"],
          "#001e0a",
          // ["==", ["get", "natural"], "heath"],
          // "rgb(214, 217, 159)",
          ["==", ["get", "natural"], "grassland"],
          "#001e0a",
          // ["==", ["get", "natural"], "bare_rock"],
          // "rgb(217, 212, 206)",
          // ["==", ["get", "natural"], "scree"],
          // "rgb(232, 223, 216)",
          // ["==", ["get", "natural"], "shingle"],
          // "rgb(232, 223, 216)",
          // [
          //   "all",
          //   ["==", ["get", "natural"], "water"],
          //   ["==", ["get", "water"], "lake"],
          // ],
          // "rgb(170, 211, 223)",
          "rgba(0, 0, 0, 0)",
        ],
        "fill-antialias": true,
      },
    },
    // amenity_background,
    { ...leisure_background, paint: { "fill-color": "#001e0a" } },
    { ...landuse_overlay, paint: { "fill-color": "#001e0a" } },
    {
      ...natural_overlay,
      paint: {
        "fill-color": [
          "case",
          // ["==", ["get", "natural"], "beach"],
          // "rgb(255, 241, 186)",
          // ["==", ["get", "natural"], "sand"],
          // "rgb(240, 229, 196)",
          // ["==", ["get", "natural"], "scrub"],
          // "rgb(201, 216, 173)",
          [
            "all",
            ["==", ["get", "natural"], "water"],
            ["!=", ["get", "water"], "lake"],
          ],
          "#083245",
          // ["==", ["get", "natural"], "wetland"],
          // "rgb(213, 231, 211)",
          "rgba(0, 0, 0, 0)",
        ],
        "fill-antialias": true,
      },
    },
    // amenity_overlay,
    // leisure_overlay,
    {
      ...waterway_line,
      paint: { ...waterway_line.paint, "line-color": "#083245" },
    },
    // waterway_tunnel_casing,
    // waterway_tunnel_line,
    // man_made_bridge,
    {
      ...amenity_fountain,
      paint: { "fill-color": "#083245" },
    },
    // highway_tunnel_outline,
    // highway_tunnel_line,
    // railway_tunnel,
    // {
    //   ...highway_outline,
    //   paint: { ...highway_outline.paint, "line-color": "#171930" },
    // },
    {
      ...highway_line,
      paint: highway_line_paint,
    },
    {
      ...highway_dash,
      paint: {
        ...highway_dash.paint,
        "line-color": "#000",
        "line-dasharray": [2, 2],
        "line-opacity": 0.5,
      },
    },
    // {
    //   ...highway_pedestrian_area,
    //   paint: { "fill-color": "#001e0a" },
    // },
    {
      ...railway_line,
      paint: {
        ...railway_line.paint,
        "line-color": "#171930",
        "line-dasharray": [0.1, 2],
      },
    },
    {
      ...highway_bridge_outline,
      paint: { ...highway_bridge_outline.paint, "line-color": "#171930" },
    },
    {
      ...highway_bridge_line,
      minzoom: 0,
      paint: { ...highway_bridge_line.paint, "line-color": "#171930" },
    },
    {
      ...highway_label,
      // layout: {
      //   ...highway_label.layout,
      //   "text-field": ["upcase", ["get", "name"]],
      // },
      layout: {
        ...highway_label.layout,
        "text-transform": "uppercase",
        "text-letter-spacing": 0.1,
        "icon-size": 1,
      },
      paint: {
        "text-color": "rgba(255, 255, 255, .3)",
        "text-halo-color": "rgba(0, 0, 0, 0.8)",
        "text-halo-width": 1,
        "text-opacity": 1,
      },
    },
    // aeroway_line,
    // aeroway_polygon,
    // route_line,
    // power_cable,
    // power_tower,
    // man_made_pier_line,
    // man_made_pier_label,
    // natural_tree,
    // natural_trunk,
    {
      ...waterway_label,
      layout: {
        ...waterway_label.layout,
        "symbol-placement": "line",
        "text-letter-spacing": 0.2,
        "text-transform": "uppercase",
      },
      paint: {
        "text-color": "rgba(10, 120, 160, 1)",
        "text-halo-color": "rgba(0, 0, 0, 0)",
        "text-halo-width": 1,
      },
    },
    // {
    //   ...icon,
    //   paint: {
    //     "icon-translate-anchor": "map",
    //     "icon-halo-color": "rgba(255, 255, 255, 0.8)",
    //     "icon-color": "rgb(0, 146, 219)",
    //     "text-color": "rgb(0, 146, 219)",
    //   },
    //   layout: {
    //     ...icon.layout,
    //     "text-font": ["Iset Sans Regular"],
    //   },
    // },
    // {
    //   ...label,
    //   // layout: {
    //   //   ...label.layout,
    //   //   "text-field": ["upcase", ["get", "name"]],
    //   // },
    //   layout: {
    //     ...label.layout,
    //     "text-font": ["Iset Sans Regular"],
    //   },
    //   paint: {
    //     ...label.paint,
    //     "text-color": "rgba(255, 255, 255, 0.8)",
    //     "text-halo-color": "rgba(0, 0, 0, 0.8)",
    //     "text-halo-width": 1,
    //   },
    // },
    {
      ...building_shape,
      type: "fill-extrusion",
      paint: {
        // "fill-color": "#0c1021",
        // "fill-antialias": true,
        "fill-extrusion-color": "#0c1021",
        "fill-extrusion-height": ["get", "building:height"],
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": {
          stops: [
            [10, 0],
            [15, 1],
          ],
        },
      },
    },
    {
      ...building_number,
      paint: {
        "text-color": "rgba(255, 255, 255, 0.1)",
        "text-halo-color": "rgba(0,0,0,0.8)",
        "text-halo-width": 0,
        "text-opacity": {
          stops: [
            [10, 0],
            [15, 1],
          ],
        },
      },
    },
  ],
};
