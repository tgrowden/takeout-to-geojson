import { convertCoordinate, convertTimestampMs } from './lib/converters'

export interface Feature {
	type: 'Feature'
	geometry: {
		type: 'Point'
		coordinates: number[]
	}
	id?: string | number
	properties: {
		[key: string]: any
	} | null
}

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

function convertLocation(location: TakeoutLocation): Feature {
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
}

export function convert(data: TakeoutLocationHistory): Feature[]
export function convert(data: TakeoutLocation[]): Feature[]
export function convert(date: TakeoutLocation): Feature
export function convert(
	data: TakeoutLocationHistory | TakeoutLocation[] | TakeoutLocation
) {
	if (Array.isArray(data)) {
		return data.map(convertLocation)
	}

	if ('locations' in data) {
		return data.locations.map(convertLocation)
	}

	return convertLocation(data)
}

export default convert

module.exports = convert
