import Link from 'next/link'
import { CANDIDATES } from '@/lib/data/candidates'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-navy">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-serif text-[22px] text-white no-underline">
            Pourquoi<span className="text-red-accent">Voter</span>.fr
          </Link>
          <span className="text-[11px] font-normal uppercase tracking-wider text-white/40">
            Paris 2026
          </span>
        </div>

        <div className="hidden flex-wrap justify-end gap-1.5 md:flex">
          {CANDIDATES.map((c) => (
            <span
              key={c.id}
              className="rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white opacity-90"
              style={{ backgroundColor: c.color }}
            >
              {c.name.split(' ').pop()}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
