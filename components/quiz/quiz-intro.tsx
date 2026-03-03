import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CANDIDATES } from '@/lib/data/candidates'

interface QuizIntroProps {
  onStart: () => void
}

export function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <section className="relative flex min-h-[calc(100dvh-110px)] flex-col items-center justify-center overflow-hidden bg-navy px-6 py-20">
      {/* Background decorative text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
        <span className="whitespace-nowrap font-serif text-[38vw] text-white lg:text-[500px]">
          PARIS
        </span>
      </div>

      {/* Candidate portraits strip */}
      <div className="absolute inset-x-0 top-10 flex items-end justify-center gap-4 opacity-90">
        {CANDIDATES.map((c) => (
          <div key={c.id} className="flex flex-col items-center gap-1">
            <div
              className="size-9 overflow-hidden rounded-full ring-1"
              style={{ '--tw-ring-color': c.color } as React.CSSProperties}
            >
              {c.photo ? (
                <Image
                  src={c.photo}
                  alt={c.name}
                  width={36}
                  height={36}
                  className="size-full object-cover object-top"
                />
              ) : (
                <div
                  className="flex size-full items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: c.color }}
                >
                  {c.name.split(' ').pop()?.[0]}
                </div>
              )}
            </div>
            <span className="text-[9px] tracking-wide text-white/60">
              {c.name.split(' ').pop()}
            </span>
          </div>
        ))}
      </div>

      {/* Municipales line — full width */}
      <div className="absolute left-0 right-0 top-[22%] flex items-center gap-6 px-6">
        <div className="h-px flex-1 bg-white/10" />
        <p className="text-[14px] font-light tracking-[0.3em] text-white/30">MUNICIPALES</p>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Stacked headline */}
      <div className="relative text-center">
        <h1 className="mb-2 font-serif text-[64px] leading-[0.95] text-white lg:text-[100px]">
          Pour qui
        </h1>
        <h1 className="mb-2 font-sans text-[28px] font-extralight uppercase tracking-[0.4em] text-red-accent lg:text-[40px]">
          allez-vous
        </h1>
        <h1 className="font-serif text-[64px] italic leading-[0.95] text-white lg:text-[100px]">
          voter ?
        </h1>
      </div>

      {/* CTA */}
      <div className="relative mt-12 flex flex-col items-center gap-4">
        <Button
          onClick={onStart}
          className="rounded-full bg-red-accent px-10 py-5 text-[15px] font-bold text-white hover:bg-red-accent/90"
        >
          Découvrir mon candidat
        </Button>
        <span className="text-[12px] text-white/25">
          11 questions. 3 minutes. Sans inscription.
        </span>
      </div>
    </section>
  )
}
