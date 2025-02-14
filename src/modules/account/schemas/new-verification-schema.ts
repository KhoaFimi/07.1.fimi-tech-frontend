import { z } from 'zod'

export const newVerificationSchema = z.object({
	verificationKey: z.string(),
	token: z.string()
})

export type NewVerificationSchema = z.infer<typeof newVerificationSchema>
