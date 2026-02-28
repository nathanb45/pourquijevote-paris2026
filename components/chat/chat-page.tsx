'use client'

import { useCallback, useRef, useState } from 'react'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { Message, MessageContent } from '@/components/ai-elements/message'
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SuggestedQuestions } from './suggested-questions'
import { CandidateCard } from './candidate-card'
import { AnalysisBox } from './analysis-box'
import { FollowUpQuestions } from './follow-up-questions'
import { LoadingDots } from './loading-dots'
import type { AssistantResponse, ChatMessage } from '@/lib/types'

interface DisplayMessage {
  role: 'user' | 'assistant'
  content: string
  parsed?: AssistantResponse | null
}

function parseJSON(text: string): AssistantResponse | null {
  try {
    const clean = text
      .replace(/^```json\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim()
    return JSON.parse(clean)
  } catch {
    const match = text.match(/\{[\s\S]*\}/)
    if (match) {
      try {
        return JSON.parse(match[0])
      } catch {
        return null
      }
    }
    return null
  }
}

export function ChatPage() {
  const [messages, setMessages] = useState<DisplayMessage[]>([])
  const [apiMessages, setApiMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggested, setShowSuggested] = useState(true)
  const abortRef = useRef<AbortController | null>(null)

  const submit = useCallback(
    async (text: string) => {
      if (isLoading || !text.trim()) return
      setShowSuggested(false)

      const userMsg: ChatMessage = { role: 'user', content: text }
      const newApiMessages = [...apiMessages, userMsg]
      setApiMessages(newApiMessages)
      setMessages((prev) => [...prev, { role: 'user', content: text }])

      setIsLoading(true)
      abortRef.current = new AbortController()

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newApiMessages }),
          signal: abortRef.current.signal,
        })

        if (!response.ok) throw new Error('HTTP ' + response.status)

        const reader = response.body!.getReader()
        const decoder = new TextDecoder()
        let fullText = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          for (const line of chunk.split('\n')) {
            if (!line.startsWith('data: ')) continue
            const data = line.slice(6).trim()
            if (data === '[DONE]') break
            try {
              const parsed = JSON.parse(data)
              if (parsed.text) fullText += parsed.text
              if (parsed.error) throw new Error(parsed.error)
            } catch {
              // skip malformed chunks
            }
          }
        }

        const jsonData = parseJSON('{' + fullText)
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: '{' + fullText, parsed: jsonData },
        ])
        setApiMessages((prev) => [...prev, { role: 'assistant', content: '{' + fullText }])
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: '', parsed: null },
          ])
        }
      } finally {
        setIsLoading(false)
        abortRef.current = null
      }
    },
    [isLoading, apiMessages],
  )

  const handleStop = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  return (
    <TooltipProvider>
      <div className="flex h-[calc(100vh-57px)] flex-col">
        <Conversation className="flex-1">
          <ConversationContent className="mx-auto max-w-[1100px] gap-10 px-6 pb-4 pt-7">
            {showSuggested && <SuggestedQuestions onSelect={submit} />}

            {messages.map((msg, i) => {
              if (msg.role === 'user') {
                return (
                  <Message key={i} from="user" className="animate-fade-up">
                    <MessageContent className="rounded-[20px_20px_4px_20px] bg-navy px-5 py-3 text-[15px] leading-relaxed text-white">
                      {msg.content}
                    </MessageContent>
                  </Message>
                )
              }

              if (!msg.parsed) {
                return (
                  <Message key={i} from="assistant" className="animate-fade-up">
                    <MessageContent>
                      <p className="text-[14px] text-red-accent">
                        ⚠️ Une erreur est survenue. Réessayez.
                      </p>
                    </MessageContent>
                  </Message>
                )
              }

              const data = msg.parsed
              return (
                <Message key={i} from="assistant" className="animate-fade-up max-w-full">
                  <MessageContent className="max-w-full">
                    {data.intro && (
                      <p className="mb-5 max-w-[700px] font-serif text-[18px] leading-relaxed text-ink">
                        {data.intro}
                      </p>
                    )}

                    {data.candidates?.length > 0 && (
                      <div className="mb-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
                        {data.candidates.map((c) => (
                          <CandidateCard key={c.name} candidate={c} />
                        ))}
                      </div>
                    )}

                    {data.analysis && <AnalysisBox text={data.analysis} />}

                    {data.followup?.length > 0 && (
                      <div className="mt-3.5">
                        <FollowUpQuestions questions={data.followup} onSelect={submit} />
                      </div>
                    )}
                  </MessageContent>
                </Message>
              )
            })}

            {isLoading && (
              <Message from="assistant">
                <MessageContent>
                  <LoadingDots />
                </MessageContent>
              </Message>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Input bar */}
        <div className="border-t border-beige-border bg-beige/95 px-6 pb-4 pt-3.5 backdrop-blur-sm">
          <div className="mx-auto max-w-[1100px]">
            <PromptInput
              onSubmit={({ text }) => submit(text)}
              className="rounded-3xl border-[1.5px] border-beige-border bg-white"
            >
              <PromptInputTextarea
                placeholder="Posez votre question sur les programmes…"
                className="min-h-12 rounded-3xl border-0 px-5 py-3 text-[15px] shadow-none focus-visible:ring-0"
              />
              <PromptInputFooter className="px-3 pb-2">
                <div />
                <PromptInputSubmit
                  status={isLoading ? 'streaming' : 'ready'}
                  onStop={handleStop}
                  className="bg-red-accent text-white hover:bg-[#e03333]"
                />
              </PromptInputFooter>
            </PromptInput>
            <p className="mt-2 text-center text-[11px] text-ink-light">
              Outil neutre · Ne recommande aucun candidat · Basé sur les programmes publiés
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
