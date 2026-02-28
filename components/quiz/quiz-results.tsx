'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { QuizResult } from '@/lib/types'

interface QuizResultsProps {
  results: QuizResult[]
  answeredCount: number
  priorityCount: number
  onRestart: () => void
}

const MEDALS = ['🥇', '🥈', '🥉']

export function QuizResults({ results, answeredCount, priorityCount, onRestart }: QuizResultsProps) {
  const [animated, setAnimated] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const subtitle = `Basé sur ${answeredCount} réponses${
    priorityCount > 0
      ? ` · ${priorityCount} sujet${priorityCount > 1 ? 's' : ''} prioritaire${priorityCount > 1 ? 's' : ''}`
      : ''
  }`

  return (
    <div className="mx-auto max-w-[700px] px-6 pb-20 pt-12">
      <h2 className="mb-2 font-serif text-[32px] text-ink">Vos résultats</h2>
      <p className="mb-9 text-[14px] text-ink-light">{subtitle}</p>

      <div ref={listRef} className="flex flex-col gap-3">
        {results.map((c, i) => (
          <div
            key={c.id}
            className="flex animate-fade-up items-center gap-4 rounded-xl bg-white px-5 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.07)] transition-transform hover:-translate-y-px"
            style={{ animationDelay: `${i * 0.07}s`, animationFillMode: 'both' }}
          >
            <div
              className={`w-9 shrink-0 text-center text-[22px] font-bold ${
                i < 3 ? 'text-ink' : 'text-ink-light'
              }`}
            >
              {MEDALS[i] || i + 1}
            </div>
            <div
              className="size-3.5 shrink-0 rounded-full"
              style={{ backgroundColor: c.color }}
            />
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-bold text-ink">{c.name}</div>
              <div className="text-[12px] text-ink-light">{c.party}</div>
            </div>
            <div className="min-w-0 flex-1 max-sm:hidden">
              <div className="mb-1 text-right text-[13px] font-bold text-ink-mid">{c.score}%</div>
              <div className="h-2 overflow-hidden rounded-full bg-beige-border">
                <div
                  className="h-full rounded-full transition-[width] duration-1000"
                  style={{
                    backgroundColor: c.color,
                    width: animated ? `${c.score}%` : '0%',
                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                />
              </div>
            </div>
            <div className="text-[13px] font-bold text-ink-mid sm:hidden">{c.score}%</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          onClick={onRestart}
          variant="outline"
          className="rounded-3xl border-2 border-beige-border px-6 py-3 text-[14px] font-semibold text-ink-mid hover:border-ink hover:text-ink"
        >
          ↺ Refaire le quiz
        </Button>
        <Link href="/">
          <Button className="rounded-3xl bg-navy px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#1a3560]">
            Explorer les programmes →
          </Button>
        </Link>
      </div>

      <p className="mt-6 text-[12px] leading-relaxed text-ink-light">
        Ces résultats reflètent l&apos;affinité entre vos réponses et les positions des candidats
        telles qu&apos;elles apparaissent dans leurs programmes publiés. Ils ne constituent pas une
        recommandation de vote.
      </p>
    </div>
  )
}
