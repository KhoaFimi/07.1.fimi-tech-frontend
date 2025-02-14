import { FC, PropsWithChildren } from 'react'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type DialogWrapperProps = PropsWithChildren<{
	title: string
	description?: string
	open: boolean
	onOpenChange: () => void
}>

const DialogWrapper: FC<DialogWrapperProps> = ({
	title,
	description,
	children,
	open,
	onOpenChange
}) => {
	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className='max-h-[600px] overflow-y-scroll'>
				<DialogHeader>
					<DialogTitle className='px-4 text-center uppercase'>
						{title}
					</DialogTitle>
					<DialogDescription className={cn({ ['hidden']: !description })}>
						{description}
					</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	)
}

export default DialogWrapper
