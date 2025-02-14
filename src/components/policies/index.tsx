'use client'

import DialogWrapper from '@/components/dialog-wrapper'
import SecurityPolicy from '@/components/policies/security-policy'
import TermPolicy from '@/components/policies/term-policy'
import UserPolicy from '@/components/policies/user-policy'
import {
	useSercurityPolicyStore,
	useTermPolicyStore,
	useUserPolicyStore
} from '@/hooks/policy-store'

export const Policies = () => {
	const { open: openSecurityPolicy, onClose: onCloseSecurityPolicy } =
		useSercurityPolicyStore()
	const { open: openTermPolicy, onClose: onCloseTermPolicy } =
		useTermPolicyStore()
	const { open: openUserPolicy, onClose: onCloseUserPolicy } =
		useUserPolicyStore()

	return (
		<>
			<DialogWrapper
				title='THÔNG BÁO BẢO MẬT'
				open={openSecurityPolicy}
				onOpenChange={onCloseSecurityPolicy}
			>
				<SecurityPolicy />
			</DialogWrapper>
			<DialogWrapper
				title='NỘI DUNG CHÍNH SÁCH VỀ BẢO VỆ DỮ LIỆU CÁ NHÂN CHÍNH SÁCH BẢO VỆ DỮ LIỆU CÁ NHÂN ĐỐI VỚI KHÁCH HÀNG'
				open={openUserPolicy}
				onOpenChange={onCloseUserPolicy}
			>
				<UserPolicy />
			</DialogWrapper>
			<DialogWrapper
				title='ĐIỀU KHOẢN SỬ DỤNG'
				open={openTermPolicy}
				onOpenChange={onCloseTermPolicy}
			>
				<TermPolicy />
			</DialogWrapper>
		</>
	)
}
