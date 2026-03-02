'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { CANDIDATES } from '@/lib/data/candidates'
import { QUESTIONS } from '@/lib/data/quiz-questions'
import { computeScores, computeThemeScores } from '@/lib/quiz-scoring'
import type { QuizAnswer, QuizQuestion as QuizQuestionType } from '@/lib/types'
import { QuizIntro } from './quiz-intro'
import { QuizQuestion } from './quiz-question'
import { QuizResults } from './quiz-results'

type View = 'intro' | 'quiz' | 'results'

function trackAnswer(
  sessionId: string | null,
  questionId: number,
  value: number,
  priority: boolean,
) {
  if (!sessionId) return
  fetch('/api/quiz/answers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, questionId, value, priority }),
  }).catch(() => {})
}

export function QuizPage() {
  const [view, setView] = useState<View>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, QuizAnswer>>({})
  const [questions, setQuestions] = useState<QuizQuestionType[]>(QUESTIONS)
  const sessionIdRef = useRef<string | null>(null)

  useEffect(() => {
    fetch('/api/quiz/questions')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setQuestions(data)
      })
      .catch(() => {})
  }, [])

  const currentQuestion = questions[currentIndex]
  const currentAnswer = answers[currentQuestion?.id] ?? { value: null, priority: false }

  const handleStart = useCallback(() => {
    setCurrentIndex(0)
    setAnswers({})
    setView('quiz')
    window.scrollTo({ top: 0, behavior: 'smooth' })

    fetch('/api/quiz/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionCount: questions.length }),
    })
      .then((r) => r.json())
      .then((d) => {
        sessionIdRef.current = d.sessionId
      })
      .catch(() => {})
  }, [questions])

  const handleAnswer = useCallback(
    (value: -1 | 0 | 1) => {
      const priority = answers[currentQuestion.id]?.priority ?? false
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          ...prev[currentQuestion.id],
          value,
          priority,
        },
      }))
      trackAnswer(sessionIdRef.current, currentQuestion.id, value, priority)
    },
    [currentQuestion, answers],
  )

  const handleTogglePriority = useCallback(() => {
    setAnswers((prev) => {
      const current = prev[currentQuestion.id]
      const newPriority = !current?.priority
      const value = current?.value ?? null
      if (value !== null) {
        trackAnswer(sessionIdRef.current, currentQuestion.id, value, newPriority)
      }
      return {
        ...prev,
        [currentQuestion.id]: { value, priority: newPriority },
      }
    })
  }, [currentQuestion])

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentIndex])

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setView('results')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (sessionIdRef.current) {
        fetch('/api/quiz/sessions', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sessionIdRef.current }),
        }).catch(() => {})
      }
    }
  }, [currentIndex, questions.length])

  const handleBackToMenu = useCallback(() => {
    setAnswers({})
    setCurrentIndex(0)
    setView('intro')
    sessionIdRef.current = null
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleRestart = useCallback(() => {
    setView('intro')
    sessionIdRef.current = null
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const results = computeScores(CANDIDATES, questions, answers)
  const top1 = results[0]
  const top2 = results[1]
  const themeScores = computeThemeScores(questions, answers, top1?.id ?? '', top2?.id ?? '')
  const answeredCount = Object.values(answers).filter((a) => a.value !== null).length
  const priorityCount = Object.values(answers).filter((a) => a.priority).length

  if (view === 'intro') {
    return <QuizIntro onStart={handleStart} />
  }

  if (view === 'results') {
    return (
      <QuizResults
        results={results}
        themeScores={themeScores}
        topCandidateNames={[top1?.name ?? '', top2?.name ?? '']}
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
      total={questions.length}
      answer={currentAnswer}
      onAnswer={handleAnswer}
      onTogglePriority={handleTogglePriority}
      onPrev={handlePrev}
      onNext={handleNext}
      onBackToMenu={handleBackToMenu}
      isFirst={currentIndex === 0}
      isLast={currentIndex === questions.length - 1}
    />
  )
}
