import { z } from 'zod'

export const registerSchema = z
	.object({
		fullname: z.string().min(1, { message: 'Vui lòng nhập họ và tên' }),
		email: z
			.string()
			.min(1, { message: 'Vui lòng nhập email' })
			.email({ message: 'Email không đúng đinh dạng' }),
		phone: z
			.string()
			.min(10, { message: 'Số điện thoại phải có 10 số ' })
			.refine(val => /^\d+$/.test(val), {
				message: 'Số điện thoại chỉ chứa số'
			}),
		password: z
			.string()
			.min(8, { message: 'Mật khẩu phải có tối thiểu 8 ký tự' })
			.max(64, { message: 'Mật khẩu không quá 64 ký tự' })
			.refine(password => /[A-Z]/.test(password), {
				message: 'Mật khẩu phải có tối thiểu 1 ký tự in hoa'
			})
			.refine(password => /[a-z]/.test(password), {
				message: 'Mật khẩu phải có tối thiểu 1 ký tự in thường'
			})
			.refine(password => /[0-9]/.test(password), {
				message: 'Mật khẩu phải có 1 chữ số'
			}),
		confirmPassword: z.string({ required_error: 'Vui lòng nhập lại mật khẩu' }),
		tnc: z.boolean().default(false),
		ref: z.string().optional()
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: 'Vui lòng nhập chính xác mật khẩu đã đặt',
		path: ['confirmPassword']
	})

export type RegisterSchema = z.infer<typeof registerSchema>
