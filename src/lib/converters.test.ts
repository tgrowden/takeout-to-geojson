/* eslint-env jest */
import { convertCoordinate, CoordinateRanges } from './converters'
import { InvalidCoordinateError } from './errors'

describe('convertCoordinate()', () => {
	it('Should properly convert the coordinate', () => {
		expect(convertCoordinate(407580000, 'latitude')).toEqual(40.758)

		expect(convertCoordinate(739855000, 'longitude')).toEqual(73.9855)
	})

	it('Should throw an InvalidCoordinateError for out-of-range coords', () => {
		expect(() => {
			convertCoordinate(CoordinateRanges.latitude * 1e7 + 1, 'latitude')
		}).toThrow(InvalidCoordinateError)
		expect(() => {
			convertCoordinate(-CoordinateRanges.latitude * 1e7 - 1, 'latitude')
		}).toThrow(InvalidCoordinateError)

		expect(() => {
			convertCoordinate(CoordinateRanges.longitude * 1e7 + 1, 'longitude')
		}).toThrow(InvalidCoordinateError)
		expect(() => {
			convertCoordinate(-CoordinateRanges.longitude * 1e7 - 1, 'longitude')
		}).toThrow(InvalidCoordinateError)
	})

	it('Should throw an InvalidCoordinateError for non-numeric values', () => {
		expect(() => {
			// @ts-ignore
			convertCoordinate('407580000', 'latitude')
		}).toThrow(InvalidCoordinateError)

		expect(() => {
			// @ts-ignore
			convertCoordinate(undefined, 'longitude')
		}).toThrow(InvalidCoordinateError)

		expect(() => {
			// @ts-ignore
			convertCoordinate(null, 'latitude')
		}).toThrow(InvalidCoordinateError)

		expect(() => {
			// @ts-ignore
			convertCoordinate({}, 'longitude')
		}).toThrow(InvalidCoordinateError)

		expect(() => {
			// @ts-ignore
			convertCoordinate(Symbol(987), 'latitude')
		}).toThrow(InvalidCoordinateError)

		expect(() => {
			// @ts-ignore
			convertCoordinate([], 'longitude')
		}).toThrow(InvalidCoordinateError)

		expect(() => {
			// @ts-ignore
			convertCoordinate(new Error(), 'longitude')
		}).toThrow(InvalidCoordinateError)
	})
})
