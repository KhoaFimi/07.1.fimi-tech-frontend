import { Suspense } from 'react'

import { RegisterForm } from '@/modules/auth/components/form/register-form'

const RegisterPage = () => {
	return (
		<Suspense>
			<RegisterForm />
		</Suspense>
	)
}

export default RegisterPage
