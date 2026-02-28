import type { CandidateResponse } from '@/lib/types'

function Stars({ value, max = 5 }: { value: number; max?: number }) {
  const n = Math.min(max, Math.max(0, Math.round(value || 0)))
  return (
    <span className="text-[12px] tracking-wider">
      {'★'.repeat(n)}
      {'☆'.repeat(max - n)}
    </span>
  )
}

export function CandidateCard({ candidate }: { candidate: CandidateResponse }) {
  const score = Math.min(10, Math.max(0, candidate.score || 0))

  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)]">
      {/* Header */}
      <div
        className="flex items-center justify-between gap-2 px-4 py-3.5"
        style={{ backgroundColor: candidate.color || '#333' }}
      >
        <div>
          <div className="text-[13.5px] font-bold leading-tight text-white">
            {candidate.name}
          </div>
          <div className="text-[11px] font-medium text-white/75">{candidate.party}</div>
        </div>
        <div className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-white/20 text-[14px] font-bold text-white">
          {score}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        {candidate.highlight && (
          <span className="inline-block self-start rounded bg-beige px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-mid">
            {candidate.highlight}
          </span>
        )}
        <p className="text-[13px] leading-relaxed text-ink-mid">{candidate.position}</p>

        {/* Indicators */}
        <div className="mt-auto flex flex-col gap-1.5 pt-2.5">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-ink-light">
              <span>Concrète</span>
              <Stars value={candidate.concrete} />
            </div>
            {candidate.concrete_detail && (
              <p className="text-[11px] italic leading-snug text-ink-light">
                {candidate.concrete_detail}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-ink-light">
              <span>Réaliste</span>
              <Stars value={candidate.realiste} />
            </div>
            {candidate.realiste_detail && (
              <p className="text-[11px] italic leading-snug text-ink-light">
                {candidate.realiste_detail}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
