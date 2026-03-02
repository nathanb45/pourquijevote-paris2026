import React from 'react'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Vote,
  MapPin,
  ChevronDown,
  Users,
  Landmark,
  Scale,
  BarChart3,
} from 'lucide-react'

export default function Test() {
  return (
    <div>
      This is a test page to test design components or functions without affecting the main app.
      when adding something never delete this div and just replace everything with the tests just
      not this div and its content
      {/* ═══════════════════════════════════════════════════
          HERO 1 — Editorial Split
          Left-aligned text on navy, large serif headline
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] overflow-hidden bg-navy px-6 py-20">
        <div
          className="mx-auto flex max-w-[1100px] flex-col justify-end"
          style={{ minHeight: '70vh' }}
        >
          <span className="mb-6 inline-block w-fit rounded-full border border-white/15 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">
            Municipales Paris 2026
          </span>
          <h1 className="mb-6 max-w-[700px] font-serif text-[56px] leading-[1.1] text-white lg:text-[80px]">
            <span className="italic">Trouvez</span> votre
            <br />
            candidat
          </h1>
          <p className="mb-10 max-w-[440px] text-[17px] leading-[1.7] text-white/50">
            Un quiz politique non partisan pour les élections municipales de Paris. Découvrez en 3
            minutes quel candidat correspond à vos convictions.
          </p>
          <div className="flex items-center gap-4">
            <Button className="rounded-full bg-red-accent px-8 py-5 text-[15px] font-bold text-white hover:bg-red-accent/90">
              Commencer
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <span className="text-[13px] text-white/30">3 min. Sans inscription.</span>
          </div>
        </div>
        {/* Decorative vertical line */}
        <div className="absolute right-[20%] top-0 h-full w-px bg-white/5" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent" />
        <p className="mt-16 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/20">
          Hero 1 — Editorial Split
        </p>
      </section>
      {/* ═══════════════════════════════════════════════════
          HERO 2 — Centered Monumental
          Centered large headline, beige bg, strong vertical rhythm
      ═══════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center bg-beige px-6 py-20">
        <div className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-ink-light">
          <MapPin className="size-3.5" />
          Paris 2026
        </div>
        <h1 className="mb-6 max-w-[800px] text-center font-serif text-[48px] leading-[1.15] text-navy lg:text-[72px]">
          Pour qui
          <br />
          <span className="italic text-red-accent">allez-vous</span> voter ?
        </h1>
        <p className="mb-10 max-w-[480px] text-center text-[16px] leading-[1.7] text-ink-mid">
          Répondez à 11 questions sur les enjeux parisiens et découvrez quel candidat partage vos
          priorités.
        </p>
        <Button className="rounded-full bg-navy px-10 py-5 text-[15px] font-bold text-white hover:bg-navy/90">
          Faire le quiz
        </Button>
        <div className="mt-6 flex gap-3">
          {['Logement', 'Transport', 'Sécurité', 'Écologie'].map((t) => (
            <span
              key={t}
              className="rounded-full border border-beige-border px-3 py-1 text-[11px] font-medium text-ink-light"
            >
              {t}
            </span>
          ))}
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-1 text-ink-light/40">
          <span className="text-[10px] uppercase tracking-widest">Défiler</span>
          <ChevronDown className="size-4 animate-bounce" />
        </div>
        <p className="absolute bottom-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-light/30">
          Hero 2 — Centered Monumental
        </p>
      </section>
      {/* ═══════════════════════════════════════════════════
          HERO 3 — Bold Statement
          Full-bleed red accent band, punchy one-liner
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] bg-ink px-6 py-20">
        <div
          className="mx-auto flex max-w-[1100px] flex-col items-start justify-center"
          style={{ minHeight: '70vh' }}
        >
          <div className="mb-10 h-1 w-16 bg-red-accent" />
          <h1 className="mb-4 font-serif text-[52px] leading-[1.1] text-white lg:text-[76px]">
            Votez en
            <br />
            <span className="text-red-accent">conscience.</span>
          </h1>
          <p className="mb-10 max-w-[380px] text-[15px] leading-[1.7] text-white/40">
            Comparez objectivement les positions de 6 candidats sur les enjeux qui comptent pour
            vous.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-full bg-white px-8 py-5 text-[15px] font-bold text-ink hover:bg-white/90">
              Commencer le quiz
            </Button>
            <Button
              variant="ghost"
              className="rounded-full border border-white/15 px-8 py-5 text-[15px] font-medium text-white/60 hover:bg-white/5 hover:text-white"
            >
              En savoir plus
            </Button>
          </div>
        </div>
        {/* Large decorative number */}
        <div className="absolute right-8 top-12 font-serif text-[200px] leading-none text-white/[0.03] lg:text-[400px]">
          ?
        </div>
        <p className="mt-8 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/15">
          Hero 3 — Bold Statement
        </p>
      </section>
      {/* ═══════════════════════════════════════════════════
          HERO 4 — Card Grid Overview
          Beige bg, headline + 3 feature cards
      ═══════════════════════════════════════════════════ */}
      <section className="min-h-[90vh] bg-beige px-6 py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-16 max-w-[560px]">
            <span className="mb-4 inline-block text-[12px] font-semibold uppercase tracking-[0.15em] text-red-accent">
              Elections municipales
            </span>
            <h1 className="mb-5 font-serif text-[44px] leading-[1.15] text-navy lg:text-[56px]">
              Votre vote, <span className="italic">éclairé</span>
            </h1>
            <p className="text-[16px] leading-[1.7] text-ink-mid">
              Un outil citoyen pour comprendre les positions de chaque candidat et voter en toute
              connaissance de cause.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Scale,
                title: 'Comparez',
                desc: '11 affirmations politiques. Indiquez votre position et comparez avec les candidats.',
              },
              {
                icon: BarChart3,
                title: 'Analysez',
                desc: "Un score d'affinité pondéré selon vos priorités, transparent et non partisan.",
              },
              {
                icon: Users,
                title: 'Décidez',
                desc: '6 candidats, leurs propositions concrètes. Faites votre choix en connaissance de cause.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group rounded-xl border border-beige-border bg-white p-8 transition-all hover:border-navy/10 hover:shadow-sm"
              >
                <card.icon className="mb-5 size-6 text-red-accent" />
                <h3 className="mb-2 text-[18px] font-bold text-navy">{card.title}</h3>
                <p className="text-[14px] leading-[1.6] text-ink-mid">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button className="rounded-full bg-navy px-10 py-5 text-[15px] font-bold text-white hover:bg-navy/90">
              Lancer le quiz
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
        <p className="mt-16 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-ink-light/30">
          Hero 4 — Card Grid Overview
        </p>
      </section>
      {/* ═══════════════════════════════════════════════════
          HERO 5 — Asymmetric Two-Column
          Left column text, right column large decorative element
      ═══════════════════════════════════════════════════ */}
      <section className="min-h-[90vh] bg-navy px-6 py-20">
        <div
          className="mx-auto grid max-w-[1100px] items-center gap-12 md:grid-cols-2"
          style={{ minHeight: '70vh' }}
        >
          <div>
            <div className="mb-6 flex items-center gap-2">
              <div className="h-px w-8 bg-red-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-red-accent">
                Quiz politique
              </span>
            </div>
            <h1 className="mb-6 font-serif text-[44px] leading-[1.12] text-white lg:text-[60px]">
              Paris mérite
              <br />
              un choix <span className="italic text-red-accent">informé</span>
            </h1>
            <p className="mb-8 max-w-[400px] text-[15px] leading-[1.7] text-white/50">
              En 3 minutes, découvrez quel candidat aux municipales 2026 correspond le mieux à vos
              valeurs.
            </p>
            <Button className="rounded-full bg-white px-8 py-5 text-[15px] font-bold text-navy hover:bg-white/90">
              Démarrer
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>

          {/* Right decorative column */}
          <div className="relative flex items-center justify-center">
            <div className="relative flex h-[400px] w-full items-center justify-center rounded-2xl border border-white/5 bg-white/2">
              <Vote className="size-32 text-white/6" />
              {/* Floating badges */}
              <div className="absolute left-6 top-8 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[13px] text-white/70 backdrop-blur-sm">
                Logement
              </div>
              <div className="absolute bottom-12 right-6 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[13px] text-white/70 backdrop-blur-sm">
                Transport
              </div>
              <div className="absolute right-12 top-20 rounded-lg border border-red-accent/20 bg-red-accent/10 px-4 py-2 text-[13px] text-red-accent/80 backdrop-blur-sm">
                Sécurité
              </div>
              <div className="absolute bottom-24 left-10 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[13px] text-white/70 backdrop-blur-sm">
                Écologie
              </div>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/15">
          Hero 5 — Asymmetric Two-Column
        </p>
      </section>
      {/* ═══════════════════════════════════════════════════
          HERO 6 — Newspaper / Masthead
          Editorial newspaper-style with columns and rules
      ═══════════════════════════════════════════════════ */}
      <section className="min-h-[90vh] bg-beige px-6 py-20">
        <div className="mx-auto max-w-[900px]">
          {/* Masthead */}
          <div className="mb-4 border-b-2 border-navy pb-2 text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-ink-light">
              Edition spéciale
            </span>
          </div>
          <div className="mb-4 border-b border-beige-border pb-4 text-center">
            <h1 className="font-serif text-[52px] leading-[1.1] text-navy lg:text-[72px]">
              Pour qui <span className="italic">voter</span> ?
            </h1>
          </div>
          <div className="mb-8 flex items-center justify-center gap-4 border-b border-beige-border pb-4 text-[12px] text-ink-light">
            <span>Paris</span>
            <span className="text-beige-border">|</span>
            <span>Mars 2026</span>
            <span className="text-beige-border">|</span>
            <span className="font-semibold text-red-accent">Municipales</span>
          </div>

          {/* Two-column content */}
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-[18px] font-semibold leading-snug text-navy">
                Six candidats, onze questions, un résultat personnalisé.
              </p>
              <p className="text-[15px] leading-[1.8] text-ink-mid">
                Les élections municipales de Paris approchent. Plutôt que de vous fier aux sondages
                ou aux réseaux sociaux, prenez 3 minutes pour comparer objectivement les positions
                de chaque candidat sur les sujets qui comptent pour vous.
              </p>
            </div>
            <div>
              <p className="mb-4 text-[15px] leading-[1.8] text-ink-mid">
                Logement, transport, sécurité, écologie, culture, urbanisme... Notre quiz non
                partisan analyse vos réponses et calcule un score d&apos;affinité pondéré avec
                chacun des 6 candidats.
              </p>
              <div className="mt-6">
                <Button className="w-full rounded-lg bg-navy px-8 py-5 text-[15px] font-bold text-white hover:bg-navy/90">
                  Faire le quiz
                </Button>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-16 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-ink-light/30">
          Hero 6 — Newspaper Masthead
        </p>
      </section>
      {/* ═══════════════════════════════════════════════════
          HERO 7 — Stacked Typographic
          Full navy, stacked words with different weights/sizes
      ═══════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-navy px-6 py-20">
        {/* Background decorative text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
          <span className="whitespace-nowrap font-serif text-[300px] text-white lg:text-[500px]">
            PARIS
          </span>
        </div>

        <div className="absolute left-0 right-0 top-[22%] flex items-center gap-6 px-6">
          <div className="h-px flex-1 bg-white/10" />
          <p className="text-[14px] font-light tracking-[0.3em] text-white/30">MUNICIPALES</p>
          <div className="h-px flex-1 bg-white/10" />
        </div>

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

        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4">
          <Button className="rounded-full bg-red-accent px-10 py-5 text-[15px] font-bold text-white hover:bg-red-accent/90">
            Découvrir mon candidat
          </Button>
          <span className="text-[12px] text-white/25">
            11 questions. 3 minutes. Sans inscription.
          </span>
        </div>
      </section>
      {/* ═══════════════════════════════════════════════════
          HERO 8 — Minimal Horizontal
          Thin, wide layout with horizontal emphasis
      ═══════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[90vh] items-center bg-white px-6 py-20">
        <div className="mx-auto w-full max-w-[1100px]">
          {/* Top line */}
          <div className="mb-16 flex items-center gap-4">
            <div className="h-px flex-1 bg-beige-border" />
            <Landmark className="size-5 text-navy/30" />
            <div className="h-px flex-1 bg-beige-border" />
          </div>

          <div className="flex flex-col items-center">
            <span className="mb-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-ink-light">
              Élections municipales de Paris
            </span>
            <h1 className="mb-4 text-center font-serif text-[44px] leading-[1.15] text-navy lg:text-[64px]">
              Quel candidat pour <span className="italic text-red-accent">votre</span> Paris ?
            </h1>
            <div className="mx-auto mb-10 h-0.5 w-12 bg-red-accent" />
            <p className="mb-10 max-w-[500px] text-center text-[16px] leading-[1.7] text-ink-mid">
              Un quiz citoyen, gratuit et non partisan. Comparez vos convictions avec les 6
              candidats en lice.
            </p>

            <div className="flex items-center gap-6">
              <Button className="rounded-full bg-navy px-10 py-5 text-[15px] font-bold text-white hover:bg-navy/90">
                Commencer
              </Button>
              <span className="hidden text-[13px] text-ink-light md:block">
                Résultat immédiat, aucune donnée collectée
              </span>
            </div>
          </div>

          {/* Bottom line */}
          <div className="mt-16 flex items-center gap-4">
            <div className="h-px flex-1 bg-beige-border" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-ink-light/30">
              Mars 2026
            </span>
            <div className="h-px flex-1 bg-beige-border" />
          </div>
        </div>
        <p className="absolute left-0 right-0 bottom-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-ink-light/30">
          Hero 8 — Minimal Horizontal
        </p>
      </section>
    </div>
  )
}
