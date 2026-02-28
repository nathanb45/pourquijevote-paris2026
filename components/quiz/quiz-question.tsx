'use client'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type { QuizQuestion as QuizQuestionType, QuizAnswer } from '@/lib/types'

interface QuizQuestionProps {
  question: QuizQuestionType
  index: number
  total: number
  answer: QuizAnswer
  onAnswer: (value: -1 | 0 | 1) => void
  onTogglePriority: () => void
  onPrev: () => void
  onNext: () => void
  isFirst: boolean
  isLast: boolean
}

const answerOptions = [
  { value: 1 as const, label: "D'accord", icon: '✓', selectedClass: 'border-green bg-green/5 text-green', iconSelectedClass: 'bg-green text-white' },
  { value: 0 as const, label: 'Neutre', icon: '—', selectedClass: 'border-ink-light bg-black/5 text-ink-mid', iconSelectedClass: 'bg-ink-light text-white' },
  { value: -1 as const, label: "Pas d'accord", icon: '✕', selectedClass: 'border-red-accent bg-red-accent/5 text-red-accent', iconSelectedClass: 'bg-red-accent text-white' },
]

export function QuizQuestion({
  question,
  index,
  total,
  answer,
  onAnswer,
  onTogglePriority,
  onPrev,
  onNext,
  isFirst,
  isLast,
}: QuizQuestionProps) {
  const progress = (index / total) * 100

  return (
    <div className="mx-auto max-w-[700px] px-6 pb-20 pt-8">
      {/* Progress bar */}
      <Progress value={progress} className="mb-7 h-1 bg-beige-border [&>[role=progressbar]]:bg-red-accent" />

      {/* Meta */}
      <div className="mb-8 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-ink-light">
          Question {index + 1} / {total}
        </span>
        <span className="rounded-full bg-red-accent/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-red-accent">
          {question.theme}
        </span>
      </div>

      {/* Question */}
      <p className="mb-9 font-serif text-[26px] leading-[1.4] text-ink max-sm:text-[20px]">
        {question.text}
      </p>

      {/* Answer buttons */}
      <div className="mb-6 flex flex-col gap-3">
        {answerOptions.map((opt) => {
          const isSelected = answer.value === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onAnswer(opt.value)}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-5 py-4 text-left text-[15px] font-medium transition-all ${
                isSelected
                  ? opt.selectedClass
                  : 'border-beige-border bg-white text-ink hover:border-navy hover:bg-[#f0f0ec]'
              }`}
            >
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[16px] ${
                  isSelected ? opt.iconSelectedClass : 'bg-beige'
                }`}
              >
                {opt.icon}
              </span>
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* Priority checkbox */}
      <button
        onClick={onTogglePriority}
        className={`mb-7 flex w-full cursor-pointer select-none items-center gap-2.5 rounded-[10px] border-[1.5px] px-4 py-3.5 transition-all ${
          answer.priority
            ? 'border-analysis-border bg-analysis-bg'
            : 'border-beige-border bg-white hover:border-analysis-border'
        }`}
      >
        <span
          className={`flex size-5 shrink-0 items-center justify-center rounded text-[12px] transition-all ${
            answer.priority
              ? 'border-analysis-border bg-analysis-border text-white'
              : 'border-2 border-beige-border'
          }`}
        >
          {answer.priority && '✓'}
        </span>
        <span
          className={`text-[13.5px] ${
            answer.priority ? 'font-medium text-analysis-text' : 'text-ink-mid'
          }`}
        >
          ⭐ Ce sujet est important pour moi (poids ×2)
        </span>
      </button>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="cursor-pointer border-none bg-transparent py-2.5 text-[14px] text-ink-light transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-0"
        >
          ← Précédent
        </button>
        <Button
          onClick={onNext}
          disabled={answer.value === null}
          className="rounded-3xl bg-navy px-7 py-3 text-[14px] font-semibold text-white hover:bg-[#1a3560] disabled:cursor-not-allowed disabled:bg-beige-border disabled:text-ink-light"
        >
          {isLast ? 'Voir mes résultats →' : 'Suivant →'}
        </Button>
      </div>
    </div>
  )
}
