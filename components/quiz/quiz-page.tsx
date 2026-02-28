'use client'

import { useCallback, useState } from 'react'
import { CANDIDATES } from '@/lib/data/candidates'
import { QUESTIONS } from '@/lib/data/quiz-questions'
import { computeScores } from '@/lib/quiz-scoring'
import type { QuizAnswer } from '@/lib/types'
import { QuizIntro } from './quiz-intro'
import { QuizQuestion } from './quiz-question'
import { QuizResults } from './quiz-results'

type View = 'intro' | 'quiz' | 'results'

export function QuizPage() {
  const [view, setView] = useState<View>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, QuizAnswer>>({})

  const currentQuestion = QUESTIONS[currentIndex]
  const currentAnswer = answers[currentQuestion?.id] ?? { value: null, priority: false }

  const handleStart = useCallback(() => {
    setCurrentIndex(0)
    setAnswers({})
    setView('quiz')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleAnswer = useCallback(
    (value: -1 | 0 | 1) => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: { ...prev[currentQuestion.id], value, priority: prev[currentQuestion.id]?.priority ?? false },
      }))
    },
    [currentQuestion],
  )

  const handleTogglePriority = useCallback(() => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        value: prev[currentQuestion.id]?.value ?? null,
        priority: !prev[currentQuestion.id]?.priority,
      },
    }))
  }, [currentQuestion])

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentIndex])

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setView('results')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentIndex])

  const handleRestart = useCallback(() => {
    setView('intro')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const results = computeScores(CANDIDATES, QUESTIONS, answers)
  const answeredCount = Object.values(answers).filter((a) => a.value !== null).length
  const priorityCount = Object.values(answers).filter((a) => a.priority).length

  if (view === 'intro') {
    return <QuizIntro onStart={handleStart} />
  }

  if (view === 'results') {
    return (
      <QuizResults
        results={results}
        answeredCount={answeredCount}
        priorityCount={priorityCount}
        onRestart={handleRestart}
      />
    )
  }

  return (
    <QuizQuestion
      question={currentQuestion}
      index={currentIndex}
      total={QUESTIONS.length}
      answer={currentAnswer}
      onAnswer={handleAnswer}
      onTogglePriority={handleTogglePriority}
      onPrev={handlePrev}
      onNext={handleNext}
      isFirst={currentIndex === 0}
      isLast={currentIndex === QUESTIONS.length - 1}
    />
  )
}
