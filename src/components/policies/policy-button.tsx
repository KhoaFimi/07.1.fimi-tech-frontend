import { FC, PropsWithChildren } from 'react'

type PolicyButtonProps = PropsWithChildren<{
	onOpen: () => void
}>

export const PolicyButton: FC<PolicyButtonProps> = ({ children, onOpen }) => {
	return (
		<span
			className='text-primary transition-all duration-300 ease-out hover:underline'
			onClick={e => {
				e.preventDefault()
				onOpen()
			}}
		>
			{children}
		</span>
	)
}
