'use server'

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

	await signIn('credentials', {
		email: validatedValues.data.email,
		password: validatedValues.data.password,
		redirectTo: callbackUrl
			? decodeURIComponent(callbackUrl)
			: DEFAULT_LOGIN_REDIRECT
	})
	// try {
	// } catch (error) {
	// 	if (error instanceof AuthError) {
	// 		switch (error.type) {
	// 			case 'CredentialsSignin':
	// 				return {
	// 					success: false,
	// 					statusCode: ErrorCode.WRONG_CREDENTIALS_ERROR,
	// 					message: 'Thông tin đăng nhập không chính xác'
	// 				}
	// 			default:
	// 				return {
	// 					success: false,
	// 					statusCode: ErrorCode.INTERNAL_SERVER_ERROR,
	// 					message: 'Hệ thống bị gián đoạn vui lòng thử lại sau'
	// 				}
	// 		}
	// 	}
	// }

	// redirect(
	// 	callbackUrl ? decodeURIComponent(callbackUrl) : DEFAULT_LOGIN_REDIRECT
	// )
}
