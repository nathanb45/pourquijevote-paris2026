'use client'

import { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

export function ScoringMethodology() {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="border-b border-beige-border bg-secondary">
        <CollapsibleTrigger className="mx-auto flex w-full max-w-[1100px] cursor-pointer items-center gap-2 px-6 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-ink-mid hover:text-ink">
          ℹ️ Comment sont calculés les scores ? <span>{open ? '▲' : '▼'}</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 px-6 pb-4 md:grid-cols-2">
            <div className="rounded-lg border border-beige-border bg-white p-4">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-mid">
                ★ Concrète (0-5) — critères objectifs
              </div>
              <ul className="flex flex-col gap-1">
                {[
                  'Contient un chiffre précis (montant, %, nombre)',
                  'Mentionne un délai ou une date',
                  'Nomme un projet, lieu ou mécanisme spécifique',
                  'Chiffre le coût ou le budget',
                  "S'appuie sur un cadre légal existant",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-1.5 text-[12px] leading-relaxed text-ink-mid"
                  >
                    <span className="shrink-0 font-bold text-ink-light">+1</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-beige-border bg-white p-4">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-mid">
                ★ Réaliste (0-5) — faits vérifiables
              </div>
              <ul className="flex flex-col gap-1">
                {[
                  "La mairie de Paris peut l'appliquer seule",
                  'Coût compatible avec le budget de Paris (~10Mds€/an)',
                  'Précédent dans une autre grande ville',
                  "Aucune institution n'a contesté ce type de mesure",
                  "Ne nécessite pas de négociation avec l'État",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-1.5 text-[12px] leading-relaxed text-ink-mid"
                  >
                    <span className="shrink-0 font-bold text-ink-light">+1</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
