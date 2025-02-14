'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormReponse } from '@/components/form-response'
import { FormWrapper } from '@/components/form-wrapper'
import { PolicyButton } from '@/components/policies/policy-button'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ErrorCode } from '@/constraint/code'
import {
	useSercurityPolicyStore,
	useTermPolicyStore,
	useUserPolicyStore
} from '@/hooks/policy-store'
import { cn } from '@/lib/utils'
import { register } from '@/modules/auth/actions/register'
import {
	RegisterSchema,
	registerSchema
} from '@/modules/auth/schemas/register-schema'

export const RegisterForm = () => {
	const search = useSearchParams()

	const ref = search.get('ref') ?? ''

	const { onOpen: onOpenSercutiryPolicy } = useSercurityPolicyStore()
	const { onOpen: onOpenTermPolicy } = useTermPolicyStore()
	const { onOpen: onOpenUserPolicy } = useUserPolicyStore()

	const [error, setError] = useState<string | undefined>(undefined)

	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			fullname: '',
			email: '',
			phone: '',
			password: '',
			confirmPassword: '',
			ref,
			tnc: false
		}
	})

	const router = useRouter()

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: RegisterSchema) => await register(values),
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
				router.push(`/auth/register-success?email=${variables.email}`)
			}
		}
	})

	const onSubmit = (values: RegisterSchema) => {
		mutate(values)
	}

	return (
		<FormWrapper
			header={{
				title: 'Đăng Ký',
				description: 'Chào mừng bạn đến với FIMI'
			}}
			backButton={{
				text: 'Bạn đã có tài khoản, đăng nhập',
				href: '/auth/login'
			}}
		>
			<Form {...form}>
				<form
					className='space-y-2'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					{/* Fullname field */}
					<FormField
						control={form.control}
						name='fullname'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-foreground/70 font-medium'>
									Họ và tên
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

					{/* Phone field */}
					<FormField
						control={form.control}
						name='phone'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-foreground/70 font-medium'>
									Số điện thoại
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

					{/* Tnc field */}
					<FormField
						name='tnc'
						control={form.control}
						render={({ field }) => (
							<FormItem className='border-primary bg-background mt-6 flex flex-row items-start space-y-0 space-x-3 rounded-md border p-2 shadow'>
								<FormControl>
									<Checkbox
										checked={field.value}
										className='cursor-pointer'
										disabled={isPending}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='space-y-1 leading-3 select-none'>
									<FormDescription className='cursor-pointer text-justify text-xs font-medium'>
										Bằng việc cung cấp thông tin, bạn đã đồng ý với{' '}
										<PolicyButton onOpen={onOpenSercutiryPolicy}>
											Điều khoản sử dụng dịch vụ FIMI
										</PolicyButton>
										,{' '}
										<PolicyButton onOpen={onOpenTermPolicy}>
											Chính sách bảo vệ dữ liệu cá nhân
										</PolicyButton>{' '}
										và{' '}
										<PolicyButton onOpen={onOpenUserPolicy}>
											Thông báo bảo mật của chúng tôi
										</PolicyButton>
										.
									</FormDescription>
								</div>
							</FormItem>
						)}
					/>

					<FormReponse.error message={error} />

					<Button
						type='submit'
						className='mt-2 w-full cursor-pointer font-medium'
						disabled={isPending || !form.getFieldState('tnc').isDirty}
					>
						Đăng ký
					</Button>
				</form>
			</Form>
		</FormWrapper>
	)
}
