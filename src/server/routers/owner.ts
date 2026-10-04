import { publicProcedure, router } from '@/server/trpc'
import { OwnerProfile } from '@/contracts'

const fixtures = {
  owner: {
    id: 'owner-1',
    name: 'Sarah',
    email: 'sarah@sunnycafe.com',
    cafe_name: 'Sunrise Café',
    monthly_budget_cents: 50000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
}

export const ownerRouter = router({
  get: publicProcedure.query(async () => {
    return OwnerProfile.parse(fixtures.owner)
  }),

  list: publicProcedure.query(async () => {
    return [OwnerProfile.parse(fixtures.owner)]
  }),
})
