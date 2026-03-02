import { db } from '@/lib/db'
import { quizAnswers } from '@/lib/db/schema'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  if (!body.sessionId || !body.questionId || body.value === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  await db
    .insert(quizAnswers)
    .values({
      sessionId: body.sessionId,
      questionId: body.questionId,
      value: body.value,
      priority: body.priority ?? false,
    })
    .onConflictDoUpdate({
      target: [quizAnswers.sessionId, quizAnswers.questionId],
      set: {
        value: body.value,
        priority: body.priority ?? false,
        answeredAt: new Date(),
      },
    })

  return new NextResponse(null, { status: 204 })
}
