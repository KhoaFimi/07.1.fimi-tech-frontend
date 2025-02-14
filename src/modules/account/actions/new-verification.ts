'use client'

import { AxiosError } from 'axios'
import { ValidationError } from 'next/dist/compiled/amphtml-validator'

import { ErrorCode } from '@/constraint/code'
import { http } from '@/lib/http'
import {
	NewVerificationSchema,
	newVerificationSchema
} from '@/modules/account/schemas/new-verification-schema'

export const newVerification = async (values: NewVerificationSchema) => {
	const validatedValues = newVerificationSchema.safeParse(values)

	if (!validatedValues.success)
		return {
			success: false,
			statusCode: ErrorCode.VAL_ERROR,
			message: 'Request body không hợp lệ',
			error: {
				validationError: validatedValues.error.errors.map<ValidationError>(
					err => ({
						field: err.path,
						detail: err.message
					})
				)
			}
		}

	try {
		const res = await http.post('/accounts/new-verification', {
			...validatedValues.data
		})

		const resData = res.data

		return {
			success: true,
			statusCode: resData.statusCode,
			message: resData.message
		}
	} catch (error) {
		if (error instanceof AxiosError) {
			const errorData = error.response?.data

			return {
				success: false,
				statusCode: errorData.statusCode,
				message: errorData.message,
				error: errorData.error
			}
		}
	}
}
