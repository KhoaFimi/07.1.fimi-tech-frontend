'use client'

import { Session } from 'next-auth'
import { SessionProvider as NextAuthSessionPovider } from 'next-auth/react'
import { FC, PropsWithChildren } from 'react'

type SessionProviderProp = PropsWithChildren<{
	session: Session | null
}>

export const SessionProvider: FC<SessionProviderProp> = ({
	session,
	children
}) => {
	return (
		<NextAuthSessionPovider session={session}>
			{children}
		</NextAuthSessionPovider>
	)
}
