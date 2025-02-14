import { z } from 'zod'

export const newOtpSchema = z.object({
	verificationKey: z.string()
})

export type NewOtpSchema = z.infer<typeof newOtpSchema>
