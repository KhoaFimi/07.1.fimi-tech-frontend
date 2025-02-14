'use client'

import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { logout } from '@/modules/auth/actions/logout'

interface LogoutButtonProps {
	label?: string
}

export const LogoutButton: FC<LogoutButtonProps> = ({
	label = 'Đăng xuất'
}) => {
	const router = useRouter()

	const { mutate, isPending } = useMutation({
		mutationFn: async () => await logout(),
		onSuccess: data => {
			if (data.success) {
				toast(data.message)
				router.push('/auth/login')
				return
			}

			toast(data.message)
		}
	})

	return (
		<Button
			onClick={() => mutate()}
			disabled={isPending}
			className='space-x-2'
		>
			{isPending && <Loader2 className='animate-spin' />}
			{label}
		</Button>
	)
}
