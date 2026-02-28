import { Button } from '@/components/ui/button'

interface QuizIntroProps {
  onStart: () => void
}

export function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <div className="mx-auto max-w-[600px] px-6 py-16 text-center">
      <span className="mb-5 inline-block rounded-full bg-red-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-red-accent">
        Paris 2026
      </span>
      <h1 className="mb-4 font-serif text-[42px] leading-[1.15] text-ink max-sm:text-[30px]">
        Quel candidat
        <br />
        vous correspond ?
      </h1>
      <p className="mb-10 text-[17px] leading-relaxed text-ink-mid">
        Répondez à 18 affirmations sur les grands enjeux
        <br className="hidden sm:block" /> de Paris pour découvrir votre affinité avec chaque
        candidat.
      </p>
      <div className="mb-10 flex flex-wrap justify-center gap-6">
        <span className="flex items-center gap-1.5 text-[13px] text-ink-light">
          📋 18 affirmations
        </span>
        <span className="flex items-center gap-1.5 text-[13px] text-ink-light">
          ⏱ Environ 5 minutes
        </span>
        <span className="flex items-center gap-1.5 text-[13px] text-ink-light">
          🔒 Aucune donnée collectée
        </span>
      </div>
      <Button
        onClick={onStart}
        className="h-auto rounded-full bg-red-accent px-10 py-4 text-[16px] font-bold text-white hover:bg-[#e03333]"
      >
        Commencer le quiz →
      </Button>
      <p className="mt-6 text-[12px] text-ink-light">
        Outil neutre · Ne recommande aucun candidat · Basé sur les programmes publiés
      </p>
    </div>
  )
}
