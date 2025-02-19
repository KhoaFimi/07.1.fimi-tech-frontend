import 'next-auth'
import { type DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export type ExtendedUser = DefaultSession['user'] & {
	id: string
	roles: number
	code: string
	accessToken: string
	refreshToken: string
}

declare module 'next-auth' {
	interface User {
		success: boolean
		code: string
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
		code: string
	}
}
