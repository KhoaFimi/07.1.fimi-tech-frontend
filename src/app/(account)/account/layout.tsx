import { FC, PropsWithChildren } from 'react'

const AccountLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='flex h-screen w-full items-center justify-center'>
			{children}
		</div>
	)
}

export default AccountLayout
