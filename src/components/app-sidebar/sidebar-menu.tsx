'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

type SidebarItem = {
	id: number
	label: string
	href: string
}

const sidebarItems = [
	{
		id: 0,
		label: 'Trang chủ',
		href: '/'
	},
	{
		id: 1,
		label: 'Chiến dịch',
		href: '/campaign'
	},
	{
		id: 2,
		label: 'Báo cáo',
		href: '/report'
	},
	{
		id: 3,
		label: 'Tin tức & Sự kiện',
		href: '/news'
	},
	{
		id: 4,
		label: 'Bảng xếp hạng',
		href: '/ranking'
	},
	{
		id: 5,
		label: 'Hướng dẫn',
		href: '/tutorial'
	},
	{
		id: 6,
		label: 'Liên hệ hỗ trợ',
		href: '/support-contact'
	}
] satisfies SidebarItem[]

export const AppSidebarMenu = () => {
	const pathname = usePathname()

	return (
		<SidebarGroup className='p-0'>
			<SidebarGroupContent>
				<SidebarMenu className='gap-y-2'>
					{sidebarItems.map(item => (
						<SidebarMenuItem key={item.id}>
							<SidebarMenuButton
								asChild
								isActive={pathname.split('/')[1] === item.href.substring(1)}
								className={cn(
									'h-12 rounded-none px-8 text-base font-medium',
									'data-[active=true]:bg-secondary data-[active=true]:text-white'
								)}
							>
								<Link href={item.href}>
									<span>{item.label}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
