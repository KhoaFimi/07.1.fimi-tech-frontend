import 'next-auth'
import { type DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export type ExtendedUser = DefaultSession['user'] & {
	roles: number
	accessToken: string
	refreshToken: string
}

declare module 'next-auth' {
	interface User {
		roles: number
		accessToken: string
		refreshToken: string
	}
	interface Session {
		user: ExtendedUser
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken?: string
		accessTokenExpires: number
		refreshToken?: string
		roles?: number
	}
}
