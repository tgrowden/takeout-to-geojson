import { InvalidCoordinateError } from './errors'

export const CoordinateRanges = {
	latitude: 90,
	longitude: 180
}

type CoordinateTypes = keyof typeof CoordinateRanges

export function convertCoordinate(coord: number, type: CoordinateTypes) {
	if (typeof coord !== 'number') {
		throw new InvalidCoordinateError('Coordinate must be a number')
	}

	const res = coord / 1e7

	if (res < -CoordinateRanges[type] || res > CoordinateRanges[type]) {
		throw new InvalidCoordinateError(`${coord} is invalid as ${type}`)
	}

	return res
}

export function convertTimestampMs(ts: string) {
	return new Date(parseInt(ts, 10))
}
