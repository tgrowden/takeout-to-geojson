import { Feature, FeatureCollection } from 'geojson'
import { convertCoordinate, convertTimestampMs } from './lib/converters'

export interface TakeoutLocationHistory {
	locations: TakeoutLocation[]
}
interface TakeoutLocation {
	timestampMs: string
	latitudeE7: number
	longitudeE7: number
	accuracy: number
	activity?: TakeoutActivity[]
}
interface TakeoutActivity {
	timestampMs: string
	activity: TakeoutActivityMeta[]
}
interface TakeoutActivityMeta {
	type: string
	confidence: number
}

export function takeoutToGeoJSON(
	data: TakeoutLocationHistory
): FeatureCollection {
	const features: Feature[] = data.locations.map(location => {
		const { accuracy, activity } = location
		const coordinates = [
			convertCoordinate(location.longitudeE7, 'longitude'),
			convertCoordinate(location.latitudeE7, 'latitude')
		]

		return {
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates
			},
			properties: {
				date: convertTimestampMs(location.timestampMs),
				accuracy,
				activity
			}
		}
	})

	return {
		type: 'FeatureCollection',
		features
	}
}

export default takeoutToGeoJSON
