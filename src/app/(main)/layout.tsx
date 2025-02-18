import { FC, PropsWithChildren, Suspense } from 'react'

import AppSidebar from '@/components/app-sidebar'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Suspense>
			<AppSidebar>{children}</AppSidebar>
		</Suspense>
	)
}

export default MainLayout
