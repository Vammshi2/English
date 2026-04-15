'use client';

import { Message } from '@/lib/types';
import { useSpeech } from '@/hooks/useSpeech';

interface Props {
  message: Message;
  onExplainSimpler: (content: string) => void;
}

function parseErrorCorrection(text: string) {
  const parts: { type: 'text' | 'correction'; content: string; wrong?: string; correct?: string; explanation?: string }[] = [];
  const correctionRegex = /❌\s*(?:Wrong|Your answer):\s*"([^"]+)"\s*\n\s*✅\s*(?:Correct|Better answer):\s*"([^"]+)"\s*\n\s*📘\s*(?:Explanation|Tip):\s*([^\n]+)/g;

  let lastIndex = 0;
  let match;

  while ((match = correctionRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    parts.push({
      type: 'correction',
      content: match[0],
      wrong: match[1],
      correct: match[2],
      explanation: match[3],
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: 'text' as const, content: text }];
}

function formatMarkdown(text: string) {
  let html = text
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-400 p-3 rounded-lg my-2 overflow-x-auto text-sm font-mono"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
  return html;
}

export default function MessageBubble({ message, onExplainSimpler }: Props) {
  const { speak, isSpeaking, stopSpeaking } = useSpeech();
  const isUser = message.role === 'user';
  const parts = isUser ? [{ type: 'text' as const, content: message.content }] : parseErrorCorrection(message.content);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 animate-fadeIn`}>
      <div className={`max-w-[85%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-blue-500 text-white rounded-br-md'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md shadow-sm border border-gray-100 dark:border-gray-700'
          }`}
        >
          {parts.map((part, i) =>
            part.type === 'correction' ? (
              <div key={i} className="my-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                <div className="bg-red-50 dark:bg-red-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-red-600 dark:text-red-400 font-medium">❌ Wrong: </span>
                  <span className="text-red-700 dark:text-red-300">&quot;{part.wrong}&quot;</span>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-green-600 dark:text-green-400 font-medium">✅ Correct: </span>
                  <span className="text-green-700 dark:text-green-300">&quot;{part.correct}&quot;</span>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 px-3 py-2">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">📘 </span>
                  <span className="text-blue-700 dark:text-blue-300">{part.explanation}</span>
                </div>
              </div>
            ) : (
              <div
                key={i}
                className="text-[15px] leading-relaxed whitespace-pre-wrap break-words"
                dangerouslySetInnerHTML={{ __html: isUser ? part.content : formatMarkdown(part.content) }}
              />
            )
          )}
        </div>

        {!isUser && message.content && (
          <div className="flex items-center gap-2 mt-1 px-1">
            <button
              onClick={() => (isSpeaking ? stopSpeaking() : speak(message.content))}
              className="text-gray-400 hover:text-blue-500 transition-colors text-xs flex items-center gap-1"
              title={isSpeaking ? 'Stop speaking' : 'Read aloud'}
            >
              {isSpeaking ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><rect x="5" y="4" width="3" height="12" rx="1" /><rect x="12" y="4" width="3" height="12" rx="1" /></svg>
                  Stop
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" /></svg>
                  Listen
                </>
              )}
            </button>
            <button
              onClick={() => onExplainSimpler(message.content)}
              className="text-gray-400 hover:text-orange-500 transition-colors text-xs flex items-center gap-1"
              title="Explain in Telugu + simpler English"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
              Explain Simpler
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
