import { FC } from 'react'

import { FormWrapper } from '@/components/form-wrapper'

interface SearchParams {
	email: string
}

interface RegisterSuccessPageProp {
	searchParams: Promise<SearchParams>
}

const RegisterSuccessPage: FC<RegisterSuccessPageProp> = async ({
	searchParams
}) => {
	const { email } = await searchParams

	return (
		<FormWrapper
			header={{
				title: 'Đăng ký tài khoản thành công'
			}}
		>
			<div className='flex w-full flex-col gap-2 p-4'>
				<p className='text-secondary text-center text-lg font-bold'>
					Chức mừng, Bạn đã đăng ký tài khoàn thành công, <br />
				</p>
				<p className='bg-secondary rounded-lg p-4 text-center font-semibold text-white'>
					{email}
				</p>
			</div>
		</FormWrapper>
	)
}

export default RegisterSuccessPage
