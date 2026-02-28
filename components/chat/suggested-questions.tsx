import { SUGGESTED_QUESTIONS } from '@/lib/data/suggested-questions'

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void
}

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="mb-8">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-light">
        Questions fréquentes
      </div>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            className="cursor-pointer rounded-3xl border-[1.5px] border-beige-border bg-white px-4 py-2 text-[13.5px] text-ink transition-all hover:-translate-y-px hover:border-navy hover:bg-navy hover:text-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  )
}
