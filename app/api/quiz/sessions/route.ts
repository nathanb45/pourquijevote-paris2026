import { db } from '@/lib/db'
import { quizSessions } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const userAgent = request.headers.get('user-agent')

  const [session] = await db
    .insert(quizSessions)
    .values({
      userAgent,
      questionCount: body.questionCount ?? null,
    })
    .returning({ id: quizSessions.id })

  return NextResponse.json({ sessionId: session.id })
}

export async function PATCH(request: NextRequest) {
  const body = await request.json()

  if (!body.sessionId) {
    return NextResponse.json({ error: 'sessionId required' }, { status: 400 })
  }

  await db
    .update(quizSessions)
    .set({ completedAt: new Date() })
    .where(eq(quizSessions.id, body.sessionId))

  return new NextResponse(null, { status: 204 })
}
