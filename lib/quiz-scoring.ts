import type { Candidate, QuizQuestion, QuizAnswer, QuizResult } from '@/lib/types'

export function computeScores(
  candidates: Candidate[],
  questions: QuizQuestion[],
  answers: Record<number, QuizAnswer>,
): QuizResult[] {
  const scores: Record<string, { points: number; maxPoints: number }> = {}
  candidates.forEach((c) => (scores[c.id] = { points: 0, maxPoints: 0 }))

  questions.forEach((q) => {
    const answer = answers[q.id]
    if (!answer || answer.value === null) return

    const weight = answer.priority ? 2 : 1

    candidates.forEach((c) => {
      const candidatePos = q.positions[c.id]
      const diff = Math.abs(answer.value! - candidatePos)
      const points = (2 - diff) * weight
      scores[c.id].points += points
      scores[c.id].maxPoints += 2 * weight
    })
  })

  return candidates
    .map((c) => ({
      ...c,
      score: scores[c.id].maxPoints > 0
        ? Math.round((scores[c.id].points / scores[c.id].maxPoints) * 100)
        : 0,
    }))
    .sort((a, b) => b.score - a.score)
}
