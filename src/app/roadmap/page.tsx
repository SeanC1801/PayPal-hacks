'use client'

import { useState } from 'react'
import { StatusBadge } from '@/components/status-badge'

const weeks = [
  { week: 'Week 1', title: 'Clarify the business decision', status: 'In progress', due: 'Oct 10' },
  { week: 'Week 2', title: 'Prepare the budget and task plan', status: 'Not started', due: 'Oct 17' },
  { week: 'Week 3', title: 'Prepare the team workflow', status: 'Not started', due: 'Oct 24' },
  { week: 'Week 4', title: 'Review results and next steps', status: 'Not started', due: 'Oct 31' },
]

export default function RoadmapPage() {
  const [approved, setApproved] = useState(false)
  const [edited, setEdited] = useState(false)

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-blue-600">Roadmap</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Your four-week plan</h1>
          <p className="mt-2 text-sm text-slate-500">Edit a decision, review the impact, then approve the updated roadmap.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setEdited(true)} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">Edit decision</button>
          <button onClick={() => setApproved(true)} disabled={!edited} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300">Approve roadmap</button>
          <button onClick={() => window.print()} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">Print / Export PDF</button>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <StatusBadge tone={approved ? 'success' : 'warning'}>{approved ? 'Approved' : edited ? 'Needs approval' : 'Draft'}</StatusBadge>
        <span>{approved ? 'This roadmap is approved.' : edited ? 'Roadmap changed - approval is required again.' : 'Review the current plan before approving.'}</span>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {weeks.map((item) => (
          <article key={item.week} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-sm font-medium text-blue-600">{item.week}</p><h2 className="mt-1 font-semibold">{item.title}</h2></div>
              <StatusBadge>{item.status}</StatusBadge>
            </div>
            <div className="mt-5 flex justify-between border-t border-slate-100 pt-4 text-xs text-slate-500"><span>Due {item.due}</span><span>Depends on previous week</span></div>
          </article>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5"><p className="font-semibold">Airtable</p><p className="mt-2 text-sm text-slate-500">Placeholder only - not connected.</p></div>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5"><p className="font-semibold">Slack draft</p><p className="mt-2 text-sm text-slate-500">Placeholder only - not connected.</p></div>
      </div>
    </div>
  )
}
