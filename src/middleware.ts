import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

import {
	apiAuthPrefix,
	authRoutes,
	DEFAULT_LOGIN_REDIRECT,
	publicRoutesPrefix
} from '@/routes'

export default async function middleware(req: NextRequest) {
	const isLoggedIn = await getToken({ req })
	const { nextUrl } = req

	const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix)
	const isPublicRoutes = publicRoutesPrefix.includes(
		nextUrl.pathname.split('/')[1]
	)
	const isAuthRoutes = authRoutes.includes(nextUrl.pathname)

	if (isApiAuthRoutes) {
		return
	}

	if (isAuthRoutes) {
		if (isLoggedIn) {
			return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
		}

		return
	}

	if (!isLoggedIn && !isPublicRoutes) {
		let callbackUrl = nextUrl.pathname

		if (nextUrl.search) {
			callbackUrl += nextUrl.search
		}

		const encodedCallbackUrl = encodeURIComponent(callbackUrl)

		return NextResponse.redirect(
			new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
		)
	}
}

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
