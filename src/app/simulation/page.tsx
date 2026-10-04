import { StatusBadge } from '@/components/status-badge'

export default function SimulationPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div>
        <p className="text-sm font-medium text-blue-600">Simulation</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">See what the decision changes</h1>
        <p className="mt-2 text-sm text-slate-500">Review the initialized budget and proposed payments before applying changes.</p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          ['Monthly budget', '$5,000', 'Illustrative estimate'],
          ['Current monthly cost', '$2,400', 'Calculated from fixtures'],
          ['After decision', '$3,200', 'Illustrative estimate'],
        ].map(([label, value, note]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p><p className="mt-2 text-xs text-slate-500">{note}</p></div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between"><h2 className="font-semibold">Initialized decisions</h2><StatusBadge>Fixture data</StatusBadge></div>
          <div className="mt-4 divide-y divide-slate-100">
            {[['Part-time assistant', '$800 / month'], ['Weekly payment schedule', '$200 / week'], ['Marketing budget', '$400 / month']].map(([decision, amount]) => (
              <div key={decision} className="flex items-center justify-between py-4 text-sm"><span>{decision}</span><span className="font-medium text-slate-700">{amount}</span></div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-dashed border-slate-300 p-5 text-center text-sm text-slate-500">Before / after budget chart placeholder</div>
        </section>
        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Next step</h2>
          <p className="mt-2 text-sm text-slate-500">Apply changes will update the decision and require roadmap approval again.</p>
          <button className="mt-5 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800">Update simulation</button>
          <button className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700">Apply changes</button>
        </aside>
      </div>
    </div>
  )
}
