'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ComponentProps, FC } from 'react'

export const ThemeProvider: FC<ComponentProps<typeof NextThemeProvider>> = ({
	children,
	...props
}) => {
	return (
		<NextThemeProvider
			attribute='class'
			defaultTheme='light'
			disableTransitionOnChange
			enableSystem
			{...props}
		>
			{children}
		</NextThemeProvider>
	)
}
