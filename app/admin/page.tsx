import { getDb } from '@/lib/db'
import { quizAnswers, quizQuestions, quizSessions } from '@/lib/db/schema'
import { count, sql } from 'drizzle-orm'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getStats() {
  const [sessionStats] = await getDb()
    .select({
      total: count(),
      completed: count(quizSessions.completedAt),
    })
    .from(quizSessions)

  const questions = await getDb().select().from(quizQuestions).orderBy(quizQuestions.id)

  const answerDistribution = await getDb()
    .select({
      questionId: quizAnswers.questionId,
      value: quizAnswers.value,
      count: count(),
    })
    .from(quizAnswers)
    .groupBy(quizAnswers.questionId, quizAnswers.value)
    .orderBy(quizAnswers.questionId, quizAnswers.value)

  const dropOff = await getDb().execute<{ last_question: number; sessions: number }>(sql`
    SELECT last_question, COUNT(*)::int AS sessions
    FROM (
      SELECT qa.session_id, MAX(qa.question_id) AS last_question
      FROM quiz_answers qa
      INNER JOIN quiz_sessions qs ON qs.id = qa.session_id
      WHERE qs.completed_at IS NULL
      GROUP BY qa.session_id
    ) sub
    GROUP BY last_question
    ORDER BY last_question
  `)

  return { sessionStats, questions, answerDistribution, dropOff }
}

export default async function AdminPage() {
  const { sessionStats, questions, answerDistribution, dropOff } = await getStats()
  const completionRate =
    sessionStats.total > 0 ? Math.round((sessionStats.completed / sessionStats.total) * 100) : 0

  const distMap: Record<number, Record<number, number>> = {}
  for (const row of answerDistribution) {
    if (!distMap[row.questionId]) distMap[row.questionId] = {}
    distMap[row.questionId][row.value] = row.count
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-8">
      <h1 className="font-serif text-3xl font-bold text-navy">Admin — Analytics Quiz</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-ink-mid">Sessions totales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{sessionStats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-ink-mid">Completees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{sessionStats.completed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-ink-mid">Taux de completion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{completionRate}%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distribution des reponses par question</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Question</TableHead>
                <TableHead className="w-24 text-center">Contre</TableHead>
                <TableHead className="w-24 text-center">Neutre</TableHead>
                <TableHead className="w-24 text-center">Pour</TableHead>
                <TableHead className="w-24 text-center">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((q) => {
                const d = distMap[q.id] ?? {}
                const contre = d[-1] ?? 0
                const neutre = d[0] ?? 0
                const pour = d[1] ?? 0
                const total = contre + neutre + pour
                return (
                  <TableRow key={q.id}>
                    <TableCell className="font-mono">{q.id}</TableCell>
                    <TableCell className="max-w-md truncate text-sm">{q.text}</TableCell>
                    <TableCell className="text-center font-mono text-red-accent">
                      {contre}
                    </TableCell>
                    <TableCell className="text-center font-mono text-ink-mid">{neutre}</TableCell>
                    <TableCell className="text-center font-mono text-green">{pour}</TableCell>
                    <TableCell className="text-center font-mono font-bold">{total}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {Array.isArray(dropOff) && dropOff.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Drop-off (sessions non completees)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Derniere question repondue</TableHead>
                  <TableHead className="w-32 text-center">Sessions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(dropOff as { last_question: number; sessions: number }[]).map((row) => {
                  const q = questions.find((q) => q.id === Number(row.last_question))
                  return (
                    <TableRow key={row.last_question}>
                      <TableCell>
                        <span className="font-mono">Q{row.last_question}</span>
                        {q && (
                          <span className="ml-2 text-sm text-ink-mid">
                            — {q.text.slice(0, 60)}...
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-center font-mono font-bold">
                        {row.sessions}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
