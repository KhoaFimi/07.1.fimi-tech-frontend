import { FC, PropsWithChildren } from 'react'

import { Policies } from '@/components/policies'

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='flex h-screen w-full items-center justify-center'>
			{children}
			<Policies />
		</div>
	)
}

export default AuthLayout
