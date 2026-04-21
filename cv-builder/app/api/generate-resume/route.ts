import { NextRequest, NextResponse } from 'next/server'
import { claude, CV_SYSTEM_PROMPT } from '@/lib/claude'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  // Auth check
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { rawInput, jobDescription, resumeId } = await req.json()

  try {
    const message = await claude.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 2048,
      system: CV_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Generate an optimized CV based on this information:

USER INFO:
${rawInput}

${jobDescription ? `TARGET JOB DESCRIPTION:\n${jobDescription}` : ''}

Return ONLY the JSON object.`
        }
      ]
    })

    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response')

    const cvData = JSON.parse(content.text)

    // Save to Supabase
    const { data, error } = await supabase
      .from('resumes')
      .upsert({
        id: resumeId || undefined,
        user_id: user.id,
        title: cvData.name ? `${cvData.name} — ${cvData.title}` : 'New Resume',
        content: cvData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ resume: data, cvData })
  } catch (err: any) {
    console.error('Resume generation error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
