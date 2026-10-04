import { z } from 'zod'

export const OwnerProfile = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  cafe_name: z.string(),
  monthly_budget_cents: z.number().int(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

export type Owner = z.infer<typeof OwnerProfile>
