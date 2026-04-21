import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: resumes } = await supabase
    .from('resumes')
    .select('id, title, created_at, updated_at')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-teal-700">CV Builder</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user.email}</span>
          <form action="/api/auth/signout" method="POST">
            <button className="text-sm text-gray-500 hover:text-red-500 transition">Logout</button>
          </form>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Resumes</h2>
            <p className="text-gray-500 text-sm mt-1">{resumes?.length || 0} resume{resumes?.length !== 1 ? 's' : ''}</p>
          </div>
          <Link
            href="/resume/new"
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-lg transition"
          >
            + New Resume
          </Link>
        </div>

        {/* Resume Grid */}
        {resumes && resumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map(resume => (
              <Link
                key={resume.id}
                href={`/resume/${resume.id}`}
                className="bg-white rounded-xl border hover:shadow-md transition p-5 group"
              >
                <div className="flex items-start justify-between">
                  <div className="text-3xl">📄</div>
                  <span className="text-xs text-gray-400">
                    {new Date(resume.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mt-3 group-hover:text-teal-600 transition line-clamp-2">
                  {resume.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Created {new Date(resume.created_at).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-700">No resumes yet</h3>
            <p className="text-gray-400 mt-2 mb-6">Generate your first AI-powered CV in seconds</p>
            <Link
              href="/resume/new"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              ✨ Create Your First CV
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
