'use server'

import { AxiosError } from 'axios'

import { ErrorCode } from '@/constraint/code'
import { http } from '@/lib/http'
import {
	NewOtpSchema,
	newOtpSchema
} from '@/modules/account/schemas/new-otp-schema'
import { ValidationError } from '@/types'

export const newOtp = async (values: NewOtpSchema) => {
	const validatedValues = newOtpSchema.safeParse(values)

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
