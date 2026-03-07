import { getDb } from '@/lib/db'
import { quizSessions } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userAgent = request.headers.get('user-agent')

    const [session] = await getDb()
      .insert(quizSessions)
      .values({
        userAgent,
        questionCount: body.questionCount ?? null,
      })
      .returning({ id: quizSessions.id })

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    console.error('[quiz/sessions POST]', err)
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.sessionId) {
      return NextResponse.json({ error: 'sessionId required' }, { status: 400 })
    }

    await getDb()
      .update(quizSessions)
      .set({ completedAt: new Date() })
      .where(eq(quizSessions.id, body.sessionId))

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error('[quiz/sessions PATCH]', err)
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 })
  }
}
