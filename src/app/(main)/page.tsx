import Image from 'next/image'

import { auth } from '@/auth'
import { LogoutButton } from '@/modules/auth/components/logout-button'

const HomePage = async () => {
	const session = await auth()

	return (
		<div>
			<Image
				src={session?.user.image as string}
				alt='avatar'
				width={100}
				height={100}
			/>
			<LogoutButton />
		</div>
	)
}

export default HomePage
