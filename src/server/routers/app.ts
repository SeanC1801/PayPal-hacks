import { router } from '@/server/trpc'
import { ownerRouter } from './owner'
import { decisionRouter } from './decision'
import { paymentRouter } from './payment'

export const appRouter = router({
  owner: ownerRouter,
  decision: decisionRouter,
  payment: paymentRouter,
})

export type AppRouter = typeof appRouter
