import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CANDIDATES } from '@/lib/data/candidates'

export const metadata: Metadata = {
  title: 'Les programmes · PourquoiVoter.fr',
  description: 'Consultez le programme de chaque candidat aux municipales de Paris 2026.',
}

export default function ProgrammesPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center bg-navy px-6 py-20">
      {/* Header */}
      <div className="mb-16 text-center">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
          Municipales · Paris 2026
        </p>
        <h1 className="mb-4 font-serif text-[40px] leading-[1.1] text-white lg:text-[56px]">
          Les programmes
        </h1>
        <p className="mx-auto max-w-[480px] text-[16px] leading-[1.7] text-white/50">
          Envie d&apos;en savoir plus sur le programme d&apos;un candidat en particulier ?
        </p>
      </div>

      {/* Candidates grid */}
      <div className="grid w-full max-w-[900px] grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
        {CANDIDATES.map((c) => (
          <div key={c.id} className="flex flex-col items-center gap-3">
            {/* Portrait */}
            <div
              className="size-20 overflow-hidden rounded-full ring-2 lg:size-24"
              style={{ '--tw-ring-color': c.color } as React.CSSProperties}
            >
              {c.photo ? (
                <Image
                  src={c.photo}
                  alt={c.name}
                  width={96}
                  height={96}
                  className="size-full object-cover object-top"
                />
              ) : (
                <div
                  className="flex size-full items-center justify-center text-lg font-bold text-white"
                  style={{ backgroundColor: c.color }}
                >
                  {c.name.split(' ').pop()?.[0]}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="text-center">
              <span
                className="mb-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white/70"
                style={{ backgroundColor: `${c.color}25` }}
              >
                {c.party}
              </span>
              <div className="mt-1">
                {c.programUrl ? (
                  <Link
                    href={c.programUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-white/80 hover:decoration-white/60"
                  >
                    {c.name}
                  </Link>
                ) : (
                  <span className="text-[14px] font-semibold text-white/40">{c.name}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="mt-16 text-[13px] text-white/30 underline underline-offset-4 transition-colors hover:text-white/60"
      >
        ← Retour au quiz
      </Link>
    </main>
  )
}
