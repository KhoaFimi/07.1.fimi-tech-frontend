import {
	Loader2,
	LucideBan,
	LucideCheckCircle,
	TriangleAlert
} from 'lucide-react'
import { FC } from 'react'

interface FormResponseProps {
	message?: string
}

export const FormReponse: Record<string, FC<FormResponseProps>> = {
	success: ({ message }) => {
		if (!message) return null

		return (
			<div className='flex items-center gap-x-1.5 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500'>
				<LucideCheckCircle className='size-4' />
				<p className='tracking-tight'>{message}</p>
			</div>
		)
	},
	error: ({ message }) => {
		if (!message) return null

		return (
			<div className='bg-destructive/15 text-destructive flex items-start gap-x-1.5 rounded-md p-3 text-sm'>
				<LucideBan className='size-4' />
				<p className='tracking-tight'>{message}</p>
			</div>
		)
	},
	warning: ({ message }) => {
		if (!message) return null

		return (
			<div className='flex items-start gap-x-1.5 rounded-md bg-orange-500/15 p-3 text-sm text-orange-500'>
				<TriangleAlert className='size-4' />
				<p className='tracking-tight'>{message}</p>
			</div>
		)
	},
	pending: ({ message }) => {
		return (
			<div className='bg-foreground/15 text-foreground/50 flex items-start gap-x-1.5 rounded-md p-3 text-sm'>
				<Loader2 className='size-4 animate-spin' />
				<p className='tracking-tight'>{message}</p>
			</div>
		)
	}
}
