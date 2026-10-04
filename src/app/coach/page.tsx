'use client'

import { useState } from 'react'
import { StatusBadge } from '@/components/status-badge'

export default function CoachPage() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { role: 'coach', text: 'Welcome back. What business decision would you like to explore?' },
  ])

  function sendMessage() {
    const trimmed = message.trim()
    if (!trimmed) return
    setMessages((current) => [
      ...current,
      { role: 'user', text: trimmed },
      { role: 'coach', text: 'Fixture response: I can help you compare the budget impact of that decision.' },
    ])
    setMessage('')
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[1fr_280px]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-600">Coach</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Think through your next move.</h1>
            <p className="mt-2 text-sm text-slate-500">Ask about a business decision and review the fixture response.</p>
          </div>
          <StatusBadge tone="warning">Fixture chat</StatusBadge>
        </div>
        <div className="space-y-3 rounded-xl bg-slate-50 p-4">
          {messages.map((item, index) => (
            <div key={`${item.role}-${index}`} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <p className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${item.role === 'user' ? 'bg-slate-950 text-white' : 'bg-white text-slate-700 shadow-sm'}`}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
            placeholder="Ask about a business decision..."
            className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
          <button onClick={sendMessage} className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800">Send</button>
        </div>
      </section>
      <aside className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Suggested prompts</h2>
          <div className="mt-3 space-y-2">
            {['Can I afford a part-time assistant?', 'What should I prioritize this month?'].map((prompt) => (
              <button key={prompt} onClick={() => setMessage(prompt)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-left text-sm text-slate-600 hover:border-blue-300 hover:bg-blue-50">{prompt}</button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5">
          <h2 className="font-semibold">Smart app integrations</h2>
          <p className="mt-2 text-sm text-slate-500">Prepare Airtable and Slack drafts here once the integration contracts are ready.</p>
          <div className="mt-4 flex gap-2">
            <button className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700">Prepare Airtable</button>
            <button className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700">Prepare Slack</button>
          </div>
        </div>
      </aside>
    </div>
  )
}
