# takeout-to-geojson

Converts Maps history from [Google Takeout](https://takeout.google.com) to valid [GeoJSON](https://geojson.org/).

### Example

You can import the file directly:
```ts
import { convert } from 'takeout-to-geojson'
import fileData from 'path/to/exported-file.json'

convert(fileData)
```

You can also view the [documentation](https://tgrowden.github.io/takeout-to-geojson/);
