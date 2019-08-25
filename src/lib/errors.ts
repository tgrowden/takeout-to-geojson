export class InvalidCoordinateError extends Error {
	public constructor(m: string = 'Invalid coordinate') {
		super(m)

		Object.setPrototypeOf(this, InvalidCoordinateError.prototype)

		this.name = 'InvalidCoordinateError'
	}
}
