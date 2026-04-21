'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ResumeForm() {
  const [rawInput, setRawInput]           = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading]             = useState(false)
  const [error, setError]                 = useState('')
  const router = useRouter()

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawInput, jobDescription })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push(`/resume/${data.resume.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleGenerate} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Background *
        </label>
        <textarea
          value={rawInput}
          onChange={e => setRawInput(e.target.value)}
          placeholder="Paste your existing CV, LinkedIn profile, or describe your experience, skills, education, and contact info..."
          rows={10}
          className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Target Job Description (optional — improves ATS score)
        </label>
        <textarea
          value={jobDescription}
          onChange={e => setJobDescription(e.target.value)}
          placeholder="Paste the job description you're applying for..."
          rows={6}
          className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75"/>
            </svg>
            Generating your CV...
          </>
        ) : '✨ Generate CV'}
      </button>
    </form>
  )
}
