import { Suspense } from 'react'

import { NewVerificationForm } from '@/modules/account/components/form/new-verification-form'

const NewVerificationPage = () => {
	return (
		<Suspense>
			<NewVerificationForm />
		</Suspense>
	)
}

export default NewVerificationPage
