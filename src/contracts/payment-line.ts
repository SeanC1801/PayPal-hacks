import { z } from 'zod'

export const PaymentLine = z.object({
  id: z.string(),
  owner_id: z.string(),
  amount_cents: z.number().int(),
  frequency: z.enum(['WEEKLY', 'BIWEEKLY', 'MONTHLY']),
  next_payout_date: z.string().date(),
  status: z.enum(['ACTIVE', 'PAUSED', 'COMPLETED']),
  payout_count: z.number().int().default(0),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

export type PaymentLine = z.infer<typeof PaymentLine>
