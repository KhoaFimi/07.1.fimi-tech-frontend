import Image from 'next/image'
import { FC, PropsWithChildren } from 'react'

import { AppSidebarMenu } from '@/components/app-sidebar/sidebar-menu'
import { AppSidebarTrigger } from '@/components/app-sidebar/sidebar-trigger'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarProvider
} from '@/components/ui/sidebar'

const AppSidebar: FC<PropsWithChildren> = ({ children }) => {
	return (
		<SidebarProvider>
			<Sidebar
				variant='inset'
				className='border-none p-0 shadow-none'
			>
				<SidebarHeader className='p-2'>
					<Image
						src={'/logo.png'}
						width={400}
						height={200}
						alt='Logo'
						className='mx-auto h-[44px] w-[102px] px-2 select-none'
					/>
				</SidebarHeader>
				<SidebarContent className='mt-8'>
					<AppSidebarMenu />
				</SidebarContent>
				<SidebarFooter />
			</Sidebar>
			<main className='bg-foreground/5 h-screen w-full'>
				<AppSidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	)
}

export default AppSidebar
