import { Suspense } from 'react'

import { LoginForm } from '@/modules/auth/components/form/login-form'

const LoginPage = () => {
	return (
		<Suspense>
			<LoginForm />
		</Suspense>
	)
}

export default LoginPage
