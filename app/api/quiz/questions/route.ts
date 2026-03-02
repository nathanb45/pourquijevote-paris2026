import { getDb } from '@/lib/db'
import { quizQuestions } from '@/lib/db/schema'
import { asc } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function GET() {
  const questions = await getDb().select().from(quizQuestions).orderBy(asc(quizQuestions.id))

  return NextResponse.json(
    questions.map((q) => ({
      id: q.id,
      theme: q.theme,
      text: q.text,
      positions: q.positions,
      context: q.context,
    })),
  )
}
