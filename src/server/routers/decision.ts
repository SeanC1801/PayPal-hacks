import { publicProcedure, router } from '@/server/trpc'
import { Decision } from '@/contracts'

const fixtures = [
  {
    id: 'decision-1',
    owner_id: 'owner-1',
    key: 'AI_PROVIDER' as const,
    value: 'Google Gemini',
    rationale: 'Good structured output support and budget-friendly',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'decision-2',
    owner_id: 'owner-1',
    key: 'PAYMENT_METHOD' as const,
    value: 'PayPal Payouts',
    rationale: 'Instant disbursement, low fee',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const decisionRouter = router({
  byOwner: publicProcedure.query(async () => {
    return fixtures.map(d => Decision.parse(d))
  }),
})
