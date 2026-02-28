import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

let systemPrompt: string | null = null

function getSystemPrompt(): string {
  if (!systemPrompt) {
    const promptPath = path.join(process.cwd(), 'system_prompt.md')
    systemPrompt = fs.readFileSync(promptPath, 'utf-8')
  }
  return systemPrompt
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'messages array required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = client.messages.stream(
          {
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 4096,
            system: [
              {
                type: 'text',
                text: getSystemPrompt(),
                cache_control: { type: 'ephemeral' },
              },
            ],
            messages: [...messages, { role: 'assistant', content: '{' }],
          },
          { headers: { 'anthropic-beta': 'prompt-caching-2024-07-31' } },
        )

        for await (const event of anthropicStream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`),
            )
          }
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
