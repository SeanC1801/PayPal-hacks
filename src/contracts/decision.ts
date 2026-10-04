import { z } from 'zod'

export const Decision = z.object({
  id: z.string(),
  owner_id: z.string(),
  key: z.enum(['AI_PROVIDER', 'PAYMENT_METHOD', 'BUDGET_TIER', 'FREQUENCY']),
  value: z.string(),
  rationale: z.string().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

export type DecisionRecord = z.infer<typeof Decision>
