'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { QuizResult, ThemeScore } from '@/lib/types'

interface QuizResultsProps {
  results: QuizResult[]
  themeScores: ThemeScore[]
  topCandidateNames: [string, string]
  answeredCount: number
  priorityCount: number
  onRestart: () => void
}

const MEDALS = ['🥇', '🥈', '🥉']

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function QuizResults({
  results,
  themeScores,
  topCandidateNames,
  answeredCount,
  priorityCount,
  onRestart,
}: QuizResultsProps) {
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

  const chartConfig = {
    candidate1: {
      label: topCandidateNames[0],
      color: '#0D1F3C',
    },
    candidate2: {
      label: topCandidateNames[1],
      color: '#7BA7D9',
    },
  } satisfies ChartConfig

  return (
    <div className="mx-auto max-w-[1100px] px-6 pb-20 pt-12">
      <div className="mb-6 rounded-lg border border-ink-light/20 bg-beige px-4 py-3">
        <p className="text-[14px] text-ink-mid">
          💡 Pensez à faire une capture d&apos;écran, vos données ne sont pas conservées.
        </p>
      </div>
      <h2 className="mb-2 font-sans text-[28px] font-black tracking-tight text-ink">
        Vos résultats
      </h2>
      <p className="mb-9 text-[14px] text-ink-light">{subtitle}</p>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_420px]">
        {/* Left column — candidate rankings */}
        <div>
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
                  className="size-10 shrink-0 overflow-hidden rounded-full ring-2"
                  style={{ '--tw-ring-color': c.color } as React.CSSProperties}
                >
                  {c.photo ? (
                    <Image
                      src={c.photo}
                      alt={c.name}
                      width={40}
                      height={40}
                      className="size-full object-cover object-top"
                    />
                  ) : (
                    <div
                      className="flex size-full items-center justify-center text-[12px] font-bold text-white"
                      style={{ backgroundColor: c.color }}
                    >
                      {initials(c.name)}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-bold text-ink">{c.name}</div>
                  <div className="text-[12px] text-ink-light">{c.party}</div>
                </div>
                <div className="min-w-0 flex-1 max-sm:hidden">
                  <div className="mb-1 text-right text-[13px] font-bold text-ink-mid">
                    {c.score}%
                  </div>
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
            <Link href="/programmes">
              <Button className="rounded-3xl bg-navy px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#1a3560]">
                Explorer les programmes →
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-[12px] leading-relaxed text-ink-light">
            Ces résultats reflètent l&apos;affinité entre vos réponses et les positions des
            candidats telles qu&apos;elles apparaissent dans leurs programmes publiés. Ils ne
            constituent pas une recommandation de vote.
          </p>
        </div>

        {/* Right column — radar chart */}
        <Card className="border-beige-border bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)] lg:sticky lg:top-8">
          <CardHeader className="items-center pb-2">
            <CardTitle className="font-sans text-[18px] font-bold text-ink">
              Votre alignement par theme
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-6 sm:px-6">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[360px] [&_.recharts-polar-angle-axis-tick-value]:text-[11px]!"
            >
              <RadarChart data={themeScores} outerRadius="68%">
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <PolarAngleAxis
                  dataKey="theme"
                  tick={({ x, y, textAnchor, index, ...props }) => (
                    <text
                      x={x}
                      y={index === 0 ? y - 10 : y}
                      textAnchor={textAnchor}
                      fontSize={12}
                      fontWeight={600}
                      fill="var(--color-ink-mid, #6B7280)"
                      {...props}
                    >
                      {themeScores[index]?.theme}
                    </text>
                  )}
                />
                <PolarGrid stroke="var(--color-beige-border, #E5E2DA)" />
                <Radar
                  dataKey="candidate1"
                  fill="var(--color-candidate1)"
                  fillOpacity={0.35}
                  stroke="var(--color-candidate1)"
                  strokeWidth={2}
                />
                <Radar
                  dataKey="candidate2"
                  fill="var(--color-candidate2)"
                  fillOpacity={0.2}
                  stroke="var(--color-candidate2)"
                  strokeWidth={2}
                />
              </RadarChart>
            </ChartContainer>
            <div className="mt-4 flex items-center justify-center gap-6 text-[13px]">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full" style={{ backgroundColor: '#0D1F3C' }} />
                <span className="font-semibold text-ink">{topCandidateNames[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full" style={{ backgroundColor: '#7BA7D9' }} />
                <span className="font-semibold text-ink-mid">{topCandidateNames[1]}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
