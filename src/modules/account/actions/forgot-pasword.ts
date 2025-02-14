'use server'

import { AxiosError } from 'axios'

import { ErrorCode } from '@/constraint/code'
import { http } from '@/lib/http'
import {
	ForgotPasswordSchema,
	forgotPasswordSchema
} from '@/modules/account/schemas/forgot-password-schema'
import { ValidationError } from '@/types'

export const forgotPassword = async (values: ForgotPasswordSchema) => {
	const validatedValues = forgotPasswordSchema.safeParse(values)

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
		const res = await http.post('/accounts/forgot-password', {
			...validatedValues.data
		})

		const resData = res.data

		return {
			success: true,
			statusCode: resData.statusCode,
			message: resData.message,
			data: {
				verificationKey: res.data.verificationKey
			}
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
