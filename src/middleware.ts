import { NextResponse } from 'next/server'

import { auth as middleware } from '@/auth'
import {
	apiAuthPrefix,
	authRoutes,
	DEFAULT_LOGIN_REDIRECT,
	publicRoutesPrefix
} from '@/routes'

export default middleware(req => {
	const { nextUrl } = req
	const isLoggedIn = !!req.auth

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

		const enccodedCallbackUrl = encodeURIComponent(callbackUrl)

		return NextResponse.redirect(
			new URL(`/auth/login?callbackUrl=${enccodedCallbackUrl}`, nextUrl)
		)
	}

	return
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
