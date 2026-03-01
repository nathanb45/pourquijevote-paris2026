import { Button } from '@/components/ui/button'
import { CANDIDATES } from '@/lib/data/candidates'

interface QuizIntroProps {
  onStart: () => void
}

export function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center bg-navy px-6 py-16">
      <div className="w-full max-w-[640px]">
        {/* Eyebrow */}
        <span className="mb-8 inline-block rounded-full border border-white/15 px-4 py-1.5 text-[12px] font-medium text-white/50">
          Municipales Paris 2026
        </span>

        {/* Headline */}
        <h1 className="mb-5 font-serif italic text-[40px] leading-[1.2] text-white lg:text-[54px]">
          Vous ne savez pas
          <br />
          pour qui voter ?
        </h1>

        {/* Punch line */}
        <p className="mb-8 text-[20px] font-semibold leading-snug text-red-accent lg:text-[24px]">
          Vous êtes au bon endroit.
        </p>

        {/* Description */}
        <p className="mb-10 max-w-[480px] text-[16px] leading-[1.7] text-white/60">
          Répondez à ces 11 affirmations pour découvrir avec quel candidat vous avez le plus
          d&apos;affinité.
        </p>

        {/* Candidates */}
        <div className="mb-10 flex flex-wrap gap-2">
          {CANDIDATES.map((c) => (
            <span
              key={c.id}
              className="rounded-full px-3 py-1 text-[12px] font-medium text-white/90"
              style={{ backgroundColor: c.color }}
            >
              {c.name}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-start gap-4">
          <Button
            onClick={onStart}
            className="rounded-full bg-white px-10 py-4 text-[15px] font-bold text-navy hover:bg-white/90"
          >
            Commencer le quiz
          </Button>
          <div className="flex flex-wrap gap-2">
            {['3 minutes', 'Sans email', 'Résultat direct'].map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/20 px-3 py-1 text-[12px] font-medium text-white/70"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
