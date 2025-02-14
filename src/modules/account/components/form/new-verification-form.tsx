'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormReponse } from '@/components/form-response'
import { FormWrapper } from '@/components/form-wrapper'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { ErrorCode } from '@/constraint/code'
import { cn } from '@/lib/utils'
import { newOtp } from '@/modules/account/actions/new-otp'
import { newVerification } from '@/modules/account/actions/new-verification'
import {
	NewOtpSchema,
	newOtpSchema
} from '@/modules/account/schemas/new-otp-schema'

export const NewVerificationForm = () => {
	const searchParams = useSearchParams()
	const router = useRouter()

	const [error, setError] = useState<string | undefined>(undefined)
	const [success, setSuccess] = useState<string | undefined>(undefined)

	const credential = {
		key: searchParams.get('key') ?? '',
		token: searchParams.get('token') ?? ''
	}

	if (credential.key === '' || credential.token === '')
		router.push('/auth/login')

	const form = useForm<NewOtpSchema>({
		resolver: zodResolver(newOtpSchema),
		defaultValues: {
			verificationKey: credential.key
		}
	})

	const { data, status } = useQuery({
		queryKey: ['verification', credential.key],
		queryFn: async () =>
			await newVerification({
				verificationKey: credential.key,
				token: credential.token
			}),
		enabled: credential.key !== '' && credential.token !== ''
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: NewOtpSchema) => await newOtp(values),
		onSuccess: data => {
			if (!data?.success) {
				if (
					data?.statusCode === ErrorCode.DUPLICATED_ERROR ||
					data?.statusCode === ErrorCode.VAL_ERROR
				) {
					router.push('/auth/login')
				}

				setError(data?.message)
				return
			}

			setError(undefined)
			setSuccess(
				`Yêu cầu xác thực thành công, vui lòng kiểm tra email đã đăng ký để xác thực tài khoản`
			)
		}
	})

	const onSubmit = (values: NewOtpSchema) => {
		mutate(values)
	}

	return (
		<FormWrapper
			header={{
				title: 'Xác thực tài khoản'
			}}
		>
			<div className='flex w-full flex-col gap-y-4'>
				<FormReponse.success message={success} />
				<FormReponse.error message={error} />
				{status === 'pending' && (
					<div className='flex items-center justify-center gap-x-2'>
						<p className='text-lg font-medium'>Đang xác thực</p>
						<Loader2 className='animate-spin' />
					</div>
				)}

				{status === 'success' && data?.success && (
					<>
						<FormReponse.success message={'Xác thực tài khoản thành công'} />
						<Button asChild>
							<Link href='/auth/login'>Đăng nhập ngay</Link>
						</Button>
					</>
				)}
				{status === 'success' && !data?.success && (
					<>
						{!success && (
							<FormReponse.error message={'Phiên xác thực không hợp lệ'} />
						)}
						<Form {...form}>
							<form
								className='w-full'
								onSubmit={form.handleSubmit(onSubmit)}
							>
								<Button
									className={cn('w-full', { ['hidden']: success })}
									type='submit'
									disabled={isPending}
								>
									{isPending && <Loader2 className='size-4 animate-spin' />} Yêu
									cầu xác thực lại
								</Button>
							</form>
						</Form>
					</>
				)}
			</div>
		</FormWrapper>
	)
}
