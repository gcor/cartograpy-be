# Steps

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

https://www.dwtkns.com/srtm30m/

tippecanoe -e output_folder -zg -f ekb_house.json

tippecanoe -e dtp -z16 -Z10 -f dtp.geojson
https://gis.stackexchange.com/questions/415806/how-to-generate-a-mapbox-vector-tile-correctly

<!--  -->

gdal_translate -of GTiff -co "TILED=YES" N56E060.hgt terrain.tif

gdal_polygonize.py terrain.tif -f "GeoJSON" terrain.json

tippecanoe -o terrain.mbtiles -zg --drop-densest-as-needed terrain.json
tippecanoe -e terrain_pbf -z16 -Z10 --drop-densest-as-needed terrain.json

gdal_translate -of PNG -ot Byte -scale -co "WORLDFILE=YES" terrain.tif output.png
