import type { Candidate, QuizQuestion, QuizAnswer, QuizResult, ThemeScore } from '@/lib/types'

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
      score:
        scores[c.id].maxPoints > 0
          ? Math.round((scores[c.id].points / scores[c.id].maxPoints) * 100)
          : 0,
    }))
    .sort((a, b) => b.score - a.score)
}

function alignmentForTheme(
  questions: QuizQuestion[],
  answers: Record<number, QuizAnswer>,
  candidateId: string,
): number {
  let points = 0
  let maxPoints = 0

  questions.forEach((q) => {
    const answer = answers[q.id]
    if (!answer || answer.value === null) return
    const weight = answer.priority ? 2 : 1
    const diff = Math.abs(answer.value! - q.positions[candidateId])
    points += (2 - diff) * weight
    maxPoints += 2 * weight
  })

  return maxPoints > 0 ? Math.round((points / maxPoints) * 100) : 0
}

export function computeThemeScores(
  questions: QuizQuestion[],
  answers: Record<number, QuizAnswer>,
  candidateId1: string,
  candidateId2: string,
): ThemeScore[] {
  const themes = [...new Set(questions.map((q) => q.theme))]

  return themes.map((theme) => {
    const themeQuestions = questions.filter((q) => q.theme === theme)
    return {
      theme,
      candidate1: alignmentForTheme(themeQuestions, answers, candidateId1),
      candidate2: alignmentForTheme(themeQuestions, answers, candidateId2),
    }
  })
}
