'use client'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">AI Business Coach</h1>
        <p className="text-xl text-gray-600 mb-8">
          PayPal AI Hackathon — Week 1 Foundation
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-500">Fixtures Loaded</p>
            <p className="text-2xl font-bold">✓</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-500">tRPC Ready</p>
            <p className="text-2xl font-bold">✓</p>
          </div>
        </div>
      </div>
    </main>
  )
}
