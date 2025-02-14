import { Suspense } from 'react'

import ResetPasswordForm from '@/modules/account/components/form/reset-password-form'

const ResetPasswordPage = () => {
	return (
		<Suspense>
			<ResetPasswordForm />
		</Suspense>
	)
}

export default ResetPasswordPage
