import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { QuizPage } from '@/components/quiz/quiz-page'

export const metadata: Metadata = {
  title: 'PourquoiVoter.fr · Paris 2026',
  description:
    'Découvrez quel candidat aux municipales de Paris 2026 correspond le mieux à vos convictions.',
}

export default function Home() {
  return (
    <>
      <Header />
      <QuizPage />
    </>
  )
}
