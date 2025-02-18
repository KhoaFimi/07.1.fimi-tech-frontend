'use server'

import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { AuthError } from 'next-auth'

import { signIn } from '@/auth'
import { ErrorCode } from '@/constraint/code'
import { LoginSchema, loginSchema } from '@/modules/auth/schemas/login-schema'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { ValidationError } from '@/types'

export const login = async (
	values: LoginSchema,
	callbackUrl?: string | null
) => {
	const validatedValues = loginSchema.safeParse(values)

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
		await signIn('credentials', {
			email: validatedValues.data.email,
			password: validatedValues.data.password,
			redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
		})
	} catch (error) {
		if (isRedirectError(error)) {
			throw error
		}

		if (error instanceof AuthError) {
			if (error.type === 'CallbackRouteError') {
				const statusCode = error.cause?.err?.message

				switch (statusCode) {
					case ErrorCode.WRONG_CREDENTIALS_ERROR:
						return {
							success: false,
							statusCode: ErrorCode.WRONG_CREDENTIALS_ERROR,
							message: 'Thông tin đăng nhập không chính xác'
						}
					case ErrorCode.NOT_VERIFIED:
						return {
							success: false,
							statusCode: ErrorCode.NOT_VERIFIED,
							message: `Tài khoản chưa được xác thực. Email xác thực đã được gửi đển '${validatedValues.data.email}'`
						}
					default:
						return {
							success: false,
							statusCode: ErrorCode.INTERNAL_SERVER_ERROR,
							message: 'Hệ thống gián đoạn, vui lòng thử lại sau'
						}
				}
			}

			if (error.type === 'CredentialsSignin') {
				console.log('error in signin server action', error.message)
			}
		}
	}
}
