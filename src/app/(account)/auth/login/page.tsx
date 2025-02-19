import { FC } from 'react'

import { LoginForm } from '@/modules/auth/components/form/login-form'

type SearchParams = Promise<{
	callbackUrl?: string
}>

interface LoginPageProps {
	searchParams: SearchParams
}

const LoginPage: FC<LoginPageProps> = async ({ searchParams }) => {
	const { callbackUrl } = await searchParams

	return <LoginForm callbackUrl={callbackUrl} />
}

export default LoginPage
