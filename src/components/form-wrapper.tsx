import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'

type FormWrapperProps = PropsWithChildren<{
	header: {
		title: string
		description?: string
		isLogo?: boolean
	}
	backButton?: {
		text: string
		href: string
	}
}>

export const FormWrapper: FC<FormWrapperProps> = ({
	children,
	header: { isLogo = true, title, description },
	backButton
}) => {
	return (
		<Card className='w-[400px]'>
			<CardHeader className='text-center'>
				{isLogo ? (
					<Image
						src={'/logo.png'}
						width={400}
						height={200}
						alt='Logo'
						className='mx-auto mb-4 w-24'
					/>
				) : null}
				<CardTitle className='text-xl font-bold uppercase'>{title}</CardTitle>
				<CardDescription className='text-foreground/30 font-semibold'>
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col space-y-2 pb-6'>
				{children}
			</CardContent>
			<CardFooter>
				{backButton ? (
					<Link
						href={backButton.href}
						className='text-primary mx-auto flex items-center space-x-0.5 text-xs/tight font-medium'
					>
						<p className='underline-offset-0.5 decoration-[1.5px] transition-all duration-200 ease-in-out hover:underline'>
							{backButton.text}
						</p>
						<ArrowRight className='size-3' />
					</Link>
				) : null}
			</CardFooter>
		</Card>
	)
}
