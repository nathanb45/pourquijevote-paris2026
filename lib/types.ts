export interface Candidate {
  id: string
  name: string
  party: string
  color: string
}

export interface QuizQuestion {
  id: number
  theme: string
  text: string
  positions: Record<string, -1 | 0 | 1>
}

export interface QuizAnswer {
  value: -1 | 0 | 1 | null
  priority: boolean
}

export interface QuizResult extends Candidate {
  score: number
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface CandidateResponse {
  name: string
  party: string
  color: string
  score: number
  highlight?: string
  position: string
  concrete: number
  concrete_detail?: string
  realiste: number
  realiste_detail?: string
}

export interface AssistantResponse {
  intro: string
  candidates: CandidateResponse[]
  analysis: string
  followup: string[]
}
