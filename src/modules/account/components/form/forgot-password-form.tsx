'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormReponse } from '@/components/form-response'
import { FormWrapper } from '@/components/form-wrapper'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ErrorCode } from '@/constraint/code'
import { cn } from '@/lib/utils'
import { forgotPassword } from '@/modules/account/actions/forgot-pasword'
import {
	ForgotPasswordSchema,
	forgotPasswordSchema
} from '@/modules/account/schemas/forgot-password-schema'

export const ForgotPasswordForm = () => {
	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const form = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: ''
		}
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: ForgotPasswordSchema) =>
			await forgotPassword(values),
		onSuccess: (data, variables) => {
			if (!data?.success) {
				if (data?.statusCode === ErrorCode.VAL_ERROR) {
					data.error.validationError.foreach((err: any) =>
						form.setError(err.field, err.detail)
					)
					return
				}

				setError(data?.message)
			}

			if (data?.success) {
				setError(undefined)
				setSuccess(
					`Yêu cầu lấy lại mật khẩu thành công, email xác thực đã được gửi tới '${variables.email}'`
				)
			}
		}
	})

	const onSubmit = (values: ForgotPasswordSchema) => {
		mutate(values)
	}

	return (
		<FormWrapper
			header={{
				title: 'Quên mật khẩu',
				description: 'Hãy nhập Email đã đăng ký để xác thực và đặt lại mật khẩu'
			}}
			backButton={{
				text: 'Đăng nhập',
				href: '/auth/login'
			}}
		>
			<Form {...form}>
				<form
					className='space-y-2'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					{/* Email field */}
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-foreground/70 font-medium'>
									Email
								</FormLabel>
								<FormControl className='mt-2'>
									<Input
										className={cn(
											'text-sm',
											'transition-all duration-300 ease-in-out',
											'focus-visible:ring-primary placeholder:text-sm placeholder:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
										)}
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormReponse.error message={error} />
					<FormReponse.success message={success} />

					<Button
						type='submit'
						className='mt-2 w-full cursor-pointer font-medium'
						disabled={isPending}
					>
						Yêu cầu đặt lại mật khẩu
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}
