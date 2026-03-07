import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const dmSerif = DM_Serif_Display({
  variable: '--font-dm-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pourquiparis.fr'),
  title: 'Qui pour Paris ? · Municipales 2026',
  description:
    'Sarah Knafo, Emmanuel Grégoire ou encore Pierre-Yves Bournazel... Vous ne savez pas pour qui voter ? Répondez à ces 11 questions et trouvez le candidat qui vous ressemble.',
  openGraph: {
    title: 'Qui pour Paris ? · Municipales 2026',
    description:
      'Sarah Knafo, Emmanuel Grégoire ou encore Pierre-Yves Bournazel... Vous ne savez pas pour qui voter ? Répondez à ces 11 questions et trouvez le candidat qui vous ressemble.',
    url: 'https://pourquiparis.fr',
    siteName: 'Pour qui Paris ?',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qui pour Paris ? · Municipales 2026',
    description:
      'Sarah Knafo, Emmanuel Grégoire ou encore Pierre-Yves Bournazel... Vous ne savez pas pour qui voter ? Répondez à ces 11 questions et trouvez le candidat qui vous ressemble.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${dmSans.variable} ${dmSerif.variable} antialiased`}>{children}</body>
      <Analytics />
    </html>
  )
}
