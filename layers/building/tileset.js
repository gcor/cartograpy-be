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
  id: "building",
  queries: [
    {
      minzoom: 12,
      maxzoom: 20,
      sql: "SELECT id, tags, geom FROM osm_ways WHERE tags ? 'building'",
    },
    {
      minzoom: 12,
      maxzoom: 20,
      sql: "SELECT id, tags, geom FROM osm_relations WHERE tags ? 'building'",
    },
    {
      minzoom: 12,
      maxzoom: 20,
      sql: "SELECT id, tags || jsonb_build_object('building:height', (CASE WHEN tags ->> 'building:levels' ~ '^[0-9\\\\.]+$' THEN tags ->> 'building:levels' ELSE '1' END)::real * 3), geom FROM osm_ways WHERE tags ? 'building'",
    },
  ],
};
