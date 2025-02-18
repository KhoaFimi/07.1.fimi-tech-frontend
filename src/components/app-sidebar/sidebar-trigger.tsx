'use client'

import { AlignJustify } from 'lucide-react'

import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export const AppSidebarTrigger = () => {
	const { toggleSidebar, isMobile } = useSidebar()

	return (
		<button
			onClick={toggleSidebar}
			className={cn('m-4 cursor-pointer', { ['hidden']: !isMobile })}
		>
			<AlignJustify
				className='text-primary size-7'
				strokeWidth={3}
			/>
		</button>
	)
}
