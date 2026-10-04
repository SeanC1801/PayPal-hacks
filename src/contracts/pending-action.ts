import { z } from 'zod'

export const PendingAction = z.object({
  id: z.string(),
  owner_id: z.string(),
  action_type: z.enum(['SEND_PAYOUT', 'UPDATE_BUDGET', 'CHANGE_FREQUENCY']),
  payload: z.record(z.unknown()),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'EXECUTED']),
  created_at: z.string().datetime(),
  approved_at: z.string().datetime().nullable(),
  executed_at: z.string().datetime().nullable(),
})

export type PendingAction = z.infer<typeof PendingAction>
