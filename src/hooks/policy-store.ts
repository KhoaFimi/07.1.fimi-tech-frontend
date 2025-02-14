import { create } from 'zustand'

interface IPolicyStore {
	open: boolean
	onOpen: () => void
	onClose: () => void
}

export const useTermPolicyStore = create<IPolicyStore>(set => ({
	open: false,
	onOpen: () => set(_state => ({ open: true })),
	onClose: () => set(_state => ({ open: false }))
}))

export const useSercurityPolicyStore = create<IPolicyStore>(set => ({
	open: false,
	onOpen: () => set(_state => ({ open: true })),
	onClose: () => set(_state => ({ open: false }))
}))

export const useUserPolicyStore = create<IPolicyStore>(set => ({
	open: false,
	onOpen: () => set(_state => ({ open: true })),
	onClose: () => set(_state => ({ open: false }))
}))
