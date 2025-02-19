'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { FC, useState } from 'react'
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
import { login } from '@/modules/auth/actions/login'
import { LoginSchema, loginSchema } from '@/modules/auth/schemas/login-schema'

interface LoginFormProps {
	callbackUrl?: string
}

export const LoginForm: FC<LoginFormProps> = ({ callbackUrl }) => {
	const [error, setError] = useState<string | undefined>(undefined)
	const [warning, setWarning] = useState<string | undefined>(undefined)

	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: LoginSchema) => await login(values, callbackUrl),
		onSuccess: data => {
			if (!data?.success) {
				if (data?.statusCode === ErrorCode.VAL_ERROR) {
					data.error?.validationError.forEach((err: any) =>
						form.setError(err.field, err.detail)
					)

					return
				}

				if (data?.statusCode === ErrorCode.NOT_VERIFIED) {
					setError(undefined)
					setWarning(data.message)

					return
				}

				setError(data?.message)
			}
		}
	})

	const onSubmit = (values: LoginSchema) => {
		mutate(values)
	}

	return (
		<FormWrapper
			header={{
				title: 'Đăng nhập',
				description: 'Chào mừng bạn đã trở lại'
			}}
			backButton={{
				text: 'Bạn chưa có tài khoản, đăng ký ngay',
				href: '/auth/register'
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

					{/* Re Password field */}
					<div className='flex flex-col gap-2'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-foreground/70 font-medium'>
										Mật khẩu
									</FormLabel>
									<FormControl className='mt-2'>
										<Input
											className={cn(
												'text-sm',
												'transition-all duration-300 ease-in-out',
												'focus-visible:ring-primary placeholder:text-sm placeholder:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
											)}
											disabled={isPending}
											type='password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Link
							href='/account/forgot-password'
							className='text-secondary ml-auto w-fit text-sm font-medium transition-all duration-300 ease-out hover:underline'
						>
							Quên mật khẩu
						</Link>
					</div>

					<FormReponse.error message={error} />
					<FormReponse.warning message={warning} />

					<Button
						type='submit'
						className='mt-2 w-full cursor-pointer font-medium'
						disabled={isPending}
					>
						Đăng nhập
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}
