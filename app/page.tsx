import { Header } from '@/components/header'
import { ScoringMethodology } from '@/components/chat/scoring-methodology'
import { ChatPage } from '@/components/chat/chat-page'

export default function Home() {
  return (
    <>
      <Header />
      <ScoringMethodology />
      <ChatPage />
    </>
  )
}
