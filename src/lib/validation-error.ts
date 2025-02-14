import { ZodError } from 'zod'

export const parseValidationError = (error: ZodError) => {
	const errors = error.errors.map(err => ({
		field: err.path,
		detail: err.message
	}))

	return errors
}
