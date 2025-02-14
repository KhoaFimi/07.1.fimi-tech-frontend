'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
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
import { resetPassword } from '@/modules/account/actions/reset-password'
import {
	ResetPasswordFormSchema,
	resetPasswordSchemaForm
} from '@/modules/auth/schemas/reset-password-schema'

const ResetPasswordForm = () => {
	const searchParams = useSearchParams()
	const router = useRouter()

	const [error, setError] = useState<string | undefined>(undefined)

	const credential = {
		key: searchParams.get('key') ?? '',
		token: searchParams.get('token') ?? ''
	}

	if (credential.key === '' || credential.token === '') {
		router.push('/auth/login')
	}

	const form = useForm<ResetPasswordFormSchema>({
		resolver: zodResolver(resetPasswordSchemaForm),
		defaultValues: {
			verificationKey: credential.key,
			token: credential.token,
			password: '',
			confirmPassword: ''
		}
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: ResetPasswordFormSchema) =>
			await resetPassword(values),
		onSuccess: data => {
			if (!data?.success) {
				if (data?.statusCode === ErrorCode.VAL_ERROR) {
					data.error.validationError.foreach((err: any) =>
						form.setError(err.field, err.details)
					)

					return
				}

				setError(data?.message)
			}

			if (data?.success) {
				router.push('/auth/login')
			}
		}
	})

	const onSubmit = (values: ResetPasswordFormSchema) => {
		mutate(values)
	}

	return (
		<FormWrapper
			header={{
				title: 'Đặt lại mật khẩu'
			}}
		>
			<Form {...form}>
				<form
					className='space-y-2'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					{/* Password field */}
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

					{/* Re Password field */}
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-foreground/70 font-medium'>
									Xác thực mật khẩu
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

					<FormReponse.error message={error} />

					<Button
						type='submit'
						className='mt-2 w-full cursor-pointer font-medium'
						disabled={isPending}
					>
						Đặt lại mật khẩu
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}

export default ResetPasswordForm
