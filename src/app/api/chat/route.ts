import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIClient } from '@/lib/openai';
import { getSystemPrompt } from '@/lib/prompts';
import { ChatRequest, LearningMode } from '@/lib/types';

const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const WINDOW_MS = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body: ChatRequest = await req.json();
    const { messages, mode, techTopic, subTopic } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const validModes: LearningMode[] = ['chat', 'story', 'practice', 'tech', 'interview', 'communication'];
    if (!validModes.includes(mode)) {
      return NextResponse.json({ error: 'Invalid mode' }, { status: 400 });
    }

    const openai = getOpenAIClient();
    const systemPrompt = getSystemPrompt(mode, techTopic, subTopic);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (err) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: 'Stream error' })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error: unknown) {
    console.error('Chat API error:', error);
    let message = 'Internal server error';
    let status = 500;

    if (error instanceof Error) {
      message = error.message;
      if (message.includes('insufficient_quota') || message.includes('exceeded your current quota')) {
        message = 'OpenAI API quota exceeded. Please add billing at platform.openai.com or use a different API key.';
        status = 402;
      } else if (message.includes('does not have access to model')) {
        message = 'Model access restricted. Please check your OpenAI project settings.';
        status = 403;
      } else if (message.includes('Incorrect API key')) {
        message = 'Invalid OpenAI API key. Please check your .env.local file.';
        status = 401;
      }
    }

    return NextResponse.json({ error: message }, { status });
  }
}
