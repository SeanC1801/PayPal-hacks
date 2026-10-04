import { z } from 'zod'

export const Roadmap = z.object({
  id: z.string(),
  owner_id: z.string(),
  weeks: z.record(
    z.object({
      title: z.string(),
      planned_hours: z.number(),
      items: z.array(z.string()),
    })
  ),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

export type Roadmap = z.infer<typeof Roadmap>
