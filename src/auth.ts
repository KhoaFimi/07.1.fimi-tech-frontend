import { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'
import NextAuth from 'next-auth'

import { authConfig } from '@/auth.config'
import { http } from '@/lib/http'

const refreshAccessToken = async (token: any) => {
	try {
		const res = await http.get('/auth/refresh-token', {
			headers: {
				'X-REFRESH-TOKEN': token.refreshToken
			}
		})

		const resData = res.data

		return {
			...token,
			accessToken: resData.data.accessToken,
			refreshToken: resData.data.refreshToken ?? token.refreshToken
		}
	} catch (error) {
		if (error instanceof AxiosError) {
			return {
				...token,
				error: 'Refresh Access Token Error'
			}
		}
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	pages: {
		signIn: '/auth/login'
	},
	callbacks: {
		jwt: async ({ token, account, user }) => {
			if (token.accessToken) {
				const decodedToken = jwtDecode(token.accessToken)

				token.accessTokenExpires = (decodedToken.exp as number) * 1000
			}

			if (account && user) {
				return {
					...token,
					accessToken: user.accessToken,
					refreshToken: user.refreshToken,
					user
				}
			}

			// Return previous token if the access token has not expired yet
			if (Date.now() < token.accessTokenExpires) {
				return token
			}

			// Access token has expired, try to update it
			return refreshAccessToken(token)
		},
		session: async ({ session, token }) => {
			console.log('In Session created', {
				session,
				token
			})

			if (token) {
				session.userId = token.sub as string
				session.user.id = token.sub as string
				session.user.name = token.name
				session.user.accessToken = token.accessToken as string
			}

			return session
		}
	}
})
