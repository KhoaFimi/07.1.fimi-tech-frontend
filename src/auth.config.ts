import { AxiosError } from 'axios'
import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { http } from '@/lib/http'

export const authConfig = {
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {}
			},
			authorize: async credentials => {
				try {
					const res = await http.post('/auth/sign-in', credentials)

					const resData = res.data

					const user = resData.data.user
					const accessToken = resData.data.accessToken
					const refreshToken = resData.data.refreshToken

					return {
						id: user.id,
						name: user.fullname,
						email: user.email,
						roles: user.roles,
						accessToken,
						refreshToken,
						image: user.profile ? user.profile.avatar.url : ''
					}
				} catch (error) {
					console.log('error in authorized', error)

					if (error instanceof AxiosError) {
						const errorData = error.response?.data

						throw new Error(errorData.statusCode)
					}
				}

				return null
			}
		})
	]
} satisfies NextAuthConfig
