import Link from 'next/link'
import { CANDIDATES } from '@/lib/data/candidates'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-navy">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            {/* Eiffel Tower */}
            <svg
              width="16"
              height="30"
              viewBox="0 0 80 150"
              fill="currentColor"
              className="shrink-0 text-red-accent"
            >
              {/* tip ball */}
              <circle cx="40" cy="2.5" r="2.5" />
              {/* spire */}
              <rect x="39" y="5" width="2" height="15" />
              {/* upper section */}
              <path d="M37 20 L29 54 L51 54 L43 20 Z" />
              {/* 1st platform */}
              <rect x="26" y="54" width="28" height="7" rx="1" />
              {/* middle section */}
              <path d="M28 61 L16 80 L64 80 L52 61 Z" />
              {/* 2nd platform */}
              <rect x="12" y="80" width="56" height="8" rx="1" />
              {/* left leg — curved arch */}
              <path d="M12 88 C2 110,0 132,4 150 L28 150 C26 132,30 110,38 88 Z" />
              {/* right leg — curved arch */}
              <path d="M68 88 C78 110,80 132,76 150 L52 150 C54 132,50 110,42 88 Z" />
            </svg>
            {/* Text stack */}
            <div className="leading-none">
              <div className="font-sans text-[10px] font-medium text-white/40">pour qui</div>
              <div className="font-sans text-[26px] font-black leading-none tracking-tight text-white">
                Paris
              </div>
            </div>
          </Link>
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
