'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/coach', label: 'Coach' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/simulation', label: 'Simulation' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/coach" className="text-lg font-bold tracking-tight text-slate-950">
            AI Business Coach
          </Link>
          <p className="text-xs text-slate-500">Week 1 fixture environment</p>
        </div>
        <nav aria-label="Main navigation" className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const active = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="border-t border-amber-100 bg-amber-50 px-6 py-2 text-center text-xs text-amber-800">
        Fixture data only - Airtable, Slack, AI, and PayPal integrations are not connected yet.
      </div>
    </header>
  )
}
