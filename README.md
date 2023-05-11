# Steps

TODO

TODO

TODO

TODO

1. Run local database

```bash
docker run \
  --name baremaps \
  --publish 5432:5432 \
  -e POSTGRES_DB=baremaps \
  -e POSTGRES_USER=baremaps \
  -e POSTGRES_PASSWORD=baremaps \
  -d postgis/postgis:latest

docker stop baremaps
docker start baremaps

```

2. Install baremaps

```bash
export PATH=$PATH:`pwd`/bin

baremaps workflow execute --file ./workflow.js

baremaps map dev \
  --database 'jdbc:postgresql://localhost:5432/baremaps?user=baremaps&password=baremaps' \
  --tileset 'tileset.js' \
  --style 'style.js'

baremaps map export \
  --database 'jdbc:postgresql://localhost:5432/baremaps?user=baremaps&password=baremaps' \
  --tileset 'export.json' \
  --repository 'tiles/'
```

npx serve -s -p 9001

--log-level DEBUG

ogr2ogr -f GeoJSON output.json input.gpkg
ogr2ogr -f GeoJSON ekb_house_age.geojson ekb_house_age.gpkg
