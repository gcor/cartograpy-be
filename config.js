/**
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License
 is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 or implied. See the License for the specific language governing permissions and limitations under
 the License.
 **/
export default {
  host: "http://localhost:9000",
  database:
    "jdbc:postgresql://localhost:5432/baremaps?&user=baremaps&password=baremaps",
  osmPbf: "data/ekb.osm.pbf",
  center: [60.6099, 56.83898],
  // "bounds": [60.2768, 56.6769, 60.8812, 56.9579],
  zoom: 14,
  minZoom: 10,
  maxZoom: 16,
};
