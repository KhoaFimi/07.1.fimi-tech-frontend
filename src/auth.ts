import { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { AuthOptions, getServerSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { http } from '@/lib/http'
import { refreshAccessToken } from '@/lib/refresh-token'

const authOptions = {
	session: {
		strategy: 'jwt'
	},
	pages: {
		signIn: '/auth/login'
	},
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

					const userData = {
						success: true,
						id: user.id,
						code: user.code,
						name: user.fullname,
						email: user.email,
						roles: user.roles,
						accessToken,
						refreshToken,
						image: user.profile ? user.profile.avatar.url : ''
					}

					return userData
				} catch (error) {
					if (error instanceof AxiosError) {
						const errorData = error.response?.data

						return {
							success: false,
							...errorData
						}
					}
				}
			}
		})
	],
	callbacks: {
		jwt: async ({ token, account, user }) => {
			if (token.accessToken) {
				const decodedToken = jwtDecode(token.accessToken)

				token.accessTokenExpires = (decodedToken.exp as number) * 1000
			}

			if (account && user) {
				return {
					...token,
					code: user.code,
					accessToken: user.accessToken,
					refreshToken: user.refreshToken,
					user
				}
			}

			if (Date.now() < token.accessTokenExpires) {
				return token
			}

			return refreshAccessToken(token)
		},
		signIn: async ({ user }) => {
			if (!user.success) {
				throw new Error(JSON.stringify(user))
			}

			return true
		},
		session: async ({ session, token }) => {
			if (token) {
				session.user.id = token.sub as string
				session.user.name = token.name
				session.user.code = token.code
				session.user.accessToken = token.accessToken as string
			}

			return session
		}
	}
} satisfies AuthOptions

const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }
