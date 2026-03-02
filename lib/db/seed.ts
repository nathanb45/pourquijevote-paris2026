import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { QUESTIONS } from '../data/quiz-questions'
import { quizQuestions } from './schema'

async function seed() {
  const sql = neon(process.env.DATABASE_URL!)
  const db = drizzle({ client: sql })

  console.log('Seeding quiz questions...')

  for (const q of QUESTIONS) {
    await db
      .insert(quizQuestions)
      .values({
        id: q.id,
        theme: q.theme,
        text: q.text,
        positions: q.positions,
        context: q.context,
      })
      .onConflictDoUpdate({
        target: quizQuestions.id,
        set: {
          theme: q.theme,
          text: q.text,
          positions: q.positions,
          context: q.context,
          updatedAt: new Date(),
        },
      })
  }

  console.log(`Seeded ${QUESTIONS.length} questions.`)
}

seed().catch(console.error)
