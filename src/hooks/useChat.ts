'use client';

import { useState, useCallback, useRef } from 'react';
import { Message, LearningMode } from '@/lib/types';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<LearningMode>('chat');
  const [techTopic, setTechTopic] = useState<string | undefined>();
  const [subTopic, setSubTopic] = useState<string | undefined>();
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: content.trim(),
        mode,
        techTopic,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '',
        mode,
        techTopic,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      try {
        abortRef.current = new AbortController();

        const chatMessages = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: chatMessages,
            mode,
            techTopic,
            subTopic,
          }),
          signal: abortRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get response');
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response stream');

        const decoder = new TextDecoder();
        let fullContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter((line) => line.startsWith('data: '));

          for (const line of lines) {
            const data = line.slice(6);
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullContent += parsed.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessage.id ? { ...m, content: fullContent } : m
                  )
                );
              }
              if (parsed.error) {
                throw new Error(parsed.error);
              }
            } catch (e) {
              if (e instanceof SyntaxError) continue;
              throw e;
            }
          }
        }

        // Update points
        fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'increment_points', data: { points: 1 } }),
        }).catch(() => {});

      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') return;
        const errorMsg = error instanceof Error ? error.message : 'Something went wrong';
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? { ...m, content: `Error: ${errorMsg}. Please try again.` }
              : m
          )
        );
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [messages, isLoading, mode, techTopic, subTopic]
  );

  const clearChat = useCallback(() => {
    if (abortRef.current) abortRef.current.abort();
    setMessages([]);
    setIsLoading(false);
  }, []);

  const changeMode = useCallback(
    (newMode: LearningMode) => {
      if (newMode !== mode) {
        clearChat();
        setMode(newMode);
        if (newMode !== 'tech') {
          setTechTopic(undefined);
          setSubTopic(undefined);
        }
      }
    },
    [mode, clearChat]
  );

  const selectTechTopic = useCallback(
    (topic: string, sub?: string) => {
      clearChat();
      setTechTopic(topic);
      setSubTopic(sub);
    },
    [clearChat]
  );

  return {
    messages,
    isLoading,
    mode,
    techTopic,
    subTopic,
    sendMessage,
    clearChat,
    changeMode,
    selectTechTopic,
  };
}
