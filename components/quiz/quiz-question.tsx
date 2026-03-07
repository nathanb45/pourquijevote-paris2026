'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Progress } from '@/components/ui/progress'
import type { QuizQuestion as QuizQuestionType, QuizAnswer } from '@/lib/types'

const TRUNCATE_AT = 180

interface QuizQuestionProps {
  question: QuizQuestionType
  index: number
  total: number
  answer: QuizAnswer
  onAnswer: (value: -1 | 0 | 1) => void
  onTogglePriority: () => void
  onPrev: () => void
  onNext: () => void
  onBackToMenu: () => void
  isFirst: boolean
  isLast: boolean
}

const answerOptions = [
  {
    value: 1 as const,
    label: "D'accord",
    selectedClass: 'border-navy bg-navy/8 text-navy',
  },
  {
    value: 0 as const,
    label: 'Neutre',
    selectedClass: 'border-ink-light bg-black/5 text-ink-mid',
  },
  {
    value: -1 as const,
    label: "Pas d'accord",
    selectedClass: 'border-navy bg-navy/8 text-navy',
  },
]

function ContextSection({ question }: { question: QuizQuestionType }) {
  const [expanded, setExpanded] = useState(false)
  const desc = question.context.description

  return (
    <div className="mb-7 rounded-xl bg-beige px-5 py-5">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-light">
        Contexte
      </p>
      <p className="text-[13.5px] leading-[1.6] text-ink-mid">
        {expanded ? (
          desc
        ) : (
          <>
            {desc.slice(0, TRUNCATE_AT).trimEnd()}
            {'... '}
            <button
              onClick={() => setExpanded(true)}
              className="font-semibold text-navy hover:opacity-70"
            >
              voir plus
            </button>
          </>
        )}
      </p>
      {expanded && (
        <>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-green">
                Pour
              </p>
              <ul className="space-y-2">
                {question.context.pour.map((item, i) => (
                  <li key={i} className="flex gap-2 text-[12.5px] leading-[1.5] text-ink">
                    <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-red-accent">
                Contre
              </p>
              <ul className="space-y-2">
                {question.context.contre.map((item, i) => (
                  <li key={i} className="flex gap-2 text-[12.5px] leading-[1.5] text-ink">
                    <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-red-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            onClick={() => setExpanded(false)}
            className="mt-4 text-[12.5px] font-semibold text-ink-light hover:text-ink"
          >
            voir moins
          </button>
        </>
      )}
    </div>
  )
}

export function QuizQuestion({
  question,
  index,
  total,
  answer,
  onAnswer,
  onTogglePriority,
  onPrev,
  onNext,
  onBackToMenu,
  isFirst,
  isLast,
}: QuizQuestionProps) {
  const progress = ((index + 1) / total) * 100

  function handleNext() {
    window.scrollTo({ top: 0, behavior: 'instant' })
    onNext()
  }

  return (
    <div className="flex min-h-dvh flex-col items-center bg-navy px-4 pb-16 pt-10">
      {/* Back to menu */}
      <div className="mb-6 w-full max-w-[760px]">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex cursor-pointer items-center gap-1.5 text-[13px] text-white/50 transition-colors hover:text-white/80">
              <ArrowLeft className="size-3.5" />
              Retour au menu
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Quitter le quiz ?</AlertDialogTitle>
              <AlertDialogDescription>
                Vos réponses en cours seront perdues et le quiz reprendra depuis le début.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Continuer le quiz</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={onBackToMenu}>
                Quitter
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="font-sans text-[30px] font-black tracking-tight text-white lg:text-[40px]">
          Pour qui je vote ?
        </h1>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
          Paris · Municipales 2026
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-4 w-full max-w-[760px]">
        <Progress
          value={progress}
          className="h-[3px] bg-white/15 [&>[role=progressbar]]:bg-white/70"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-[760px] rounded-2xl bg-white shadow-2xl">
        <div className="p-7 lg:p-10">
          {/* Counter + theme */}
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[13px] font-bold text-ink-light">
              {index + 1}/{total}
            </span>
            <span className="rounded-full bg-navy/10 px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-navy">
              {question.theme}
            </span>
          </div>

          {/* Question */}
          <p className="mb-7 font-serif text-[24px] leading-[1.4] text-ink lg:text-[28px]">
            {question.text}
          </p>

          {/* Context — always visible, inside the card */}
          <ContextSection key={index} question={question} />

          {/* Answer buttons — horizontal */}
          <div className="mb-5 flex gap-2.5 max-sm:flex-col sm:gap-3">
            {answerOptions.map((opt) => {
              const isSelected = answer.value === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => onAnswer(opt.value)}
                  className={`flex-1 cursor-pointer rounded-xl border-2 py-3.5 text-center text-[14px] font-semibold transition-all max-sm:py-3 ${
                    isSelected
                      ? opt.selectedClass
                      : 'border-beige-border bg-white text-ink hover:border-navy hover:bg-[#f0f0ec]'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>

          {/* Priority */}
          <div className="relative mb-6">
            {answer.priority && (
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                aria-hidden
              >
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  rx="10"
                  ry="10"
                  fill="none"
                  stroke="#0D1F3C"
                  strokeWidth="2"
                  strokeOpacity="0.35"
                  pathLength="1"
                  strokeDasharray="1"
                  style={{ animation: 'draw-border 0.6s ease-out forwards' }}
                />
              </svg>
            )}
            <button
              onClick={onTogglePriority}
              className={`flex w-full cursor-pointer select-none items-center gap-2.5 rounded-[10px] border-[1.5px] px-4 py-3 transition-all duration-200 ${
                answer.priority
                  ? 'border-navy/30 bg-navy/5'
                  : 'border-beige-border bg-white hover:border-navy/20'
              }`}
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded text-[11px] transition-all ${
                  answer.priority ? 'bg-navy text-white' : 'border-2 border-beige-border'
                }`}
              >
                {answer.priority && '✓'}
              </span>
              <span
                className={`text-[13px] ${
                  answer.priority ? 'font-semibold text-navy' : 'text-ink-mid'
                }`}
              >
                Ce sujet est important pour moi (poids x2)
              </span>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={onPrev}
              disabled={isFirst}
              className="cursor-pointer border-none bg-transparent py-2 text-[13px] text-ink-light transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-0"
            >
              ← Précédent
            </button>
            <div className="flex items-center gap-4">
              {!isLast && (
                <button
                  onClick={handleNext}
                  className="cursor-pointer border-none bg-transparent py-2 text-[13px] text-ink-light transition-colors hover:text-ink"
                >
                  Passer →
                </button>
              )}
              <Button
                onClick={handleNext}
                className="rounded-3xl bg-navy px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-[#1a3560]"
              >
                {isLast ? 'Voir mes résultats →' : 'Suivant →'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
