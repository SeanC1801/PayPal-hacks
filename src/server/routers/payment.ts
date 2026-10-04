import { publicProcedure, router } from '@/server/trpc'
import { PaymentLine } from '@/contracts'

const fixtures = [
  {
    id: 'payment-1',
    owner_id: 'owner-1',
    amount_cents: 10000,
    frequency: 'WEEKLY' as const,
    next_payout_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    status: 'ACTIVE' as const,
    payout_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const paymentRouter = router({
  list: publicProcedure.query(async () => {
    return fixtures.map(p => PaymentLine.parse(p))
  }),
})
