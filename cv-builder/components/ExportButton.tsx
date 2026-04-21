'use client'
import { renderToStaticMarkup } from 'react-dom/server'
import CVTemplate from './CVTemplate'

export default function ExportButton({ cvData }: { cvData: any }) {
  async function handleExport() {
    // Render the CV template to an HTML string
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8"/>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>${renderToStaticMarkup(<CVTemplate data={cvData} />)}</body>
      </html>
    `

    const res = await fetch('/api/export-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html })
    })

    if (!res.ok) { alert('PDF export failed'); return }

    const blob = await res.blob()
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = 'my-cv.pdf'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExport}
      className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg transition"
    >
      ⬇ Download PDF
    </button>
  )
}
