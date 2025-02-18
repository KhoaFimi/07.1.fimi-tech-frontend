'use server'

import { redirect } from 'next/navigation'

import { auth, signOut } from '@/auth'
import { ErrorCode } from '@/constraint/code'
import { http } from '@/lib/http'

export const logout = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/login')
	}

	const res = await http.put(`/auth/sign-out/${session.user.id}`)

	const resData = res.data

	if (res.status === 200) {
		await signOut({
			redirect: false
		})

		return {
			success: true,
			statusCode: resData.statusCode,
			message: 'Đăng xuất thành công'
		}
	}

	return {
		success: false,
		statusCode: ErrorCode.WRONG_CREDENTIALS_ERROR,
		message: 'Đăng xuất thất bại, hãy thử lại sau'
	}
}
