import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'

const HomePage = async () => {
	const logout = async () => {
		'use server'
		await signOut({
			redirectTo: '/auth/login'
		})
	}

	return (
		<div>
			<form action={logout}>
				<Button>Logout</Button>
			</form>
		</div>
	)
}

export default HomePage
