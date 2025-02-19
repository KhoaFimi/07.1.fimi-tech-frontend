'use client'

import { useMutation } from '@tanstack/react-query'
import { ChevronsUpDown, LogOut, User, User2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuItem
} from '@/components/ui/sidebar'
import { http } from '@/lib/http'

export const AppSidebarFooter = () => {
	const { data: session } = useSession()

	const { mutate } = useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			await http.put(`/auth/sign-out/${id}`)
		},
		onSuccess: async () => await signOut({ callbackUrl: '/auth/login' })
	})

	if (!session) return null

	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className='flex cursor-pointer items-center justify-between gap-x-1 rounded-lg bg-neutral-200/40 p-2 transition-all duration-200 ease-out select-none hover:bg-neutral-200/60'>
								<div className='flex items-center gap-x-2'>
									{session.user.image ? (
										<Image
											src={session.user.image}
											alt='Avatar'
											width={100}
											height={100}
											className='w-10 rounded-full'
										/>
									) : (
										<div className='bg-primary flex size-10 items-center justify-center rounded-full text-white'>
											<User2 className='size-7' />
										</div>
									)}
									<div>
										<p className='font-semibold'>{session.user.name}</p>
										<p className='text-xs font-medium'>{session.user.code}</p>
									</div>
								</div>

								<ChevronsUpDown className='size-5' />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side='right'
							align='end'
							className='w-[200px]'
						>
							<DropdownMenuItem
								asChild
								className='flex cursor-pointer items-center gap-x-2'
							>
								<Link href='/account/info-managment'>
									<User />
									<span>Tài khoản</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								className='flex cursor-pointer items-center gap-x-2'
								onClick={() => mutate({ id: session.user.id })}
							>
								<LogOut />
								<span>Đăng xuất</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	)
}
