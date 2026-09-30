import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  RefreshCw,
  Lightbulb,
  Leaf,
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const EcoAIChat: React.FC = () => {
  const { isEcoAIOpen, setIsEcoAIOpen, ecoAIMessages, sendEcoAIMessage, isEcoAILoading } =
    useCampus();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Why did energy consumption increase?',
    'Which building uses the most energy?',
    'How much water did we save?',
    'Which assets need maintenance?',
    'How can we improve our sustainability score?',
    "What are today's important alerts?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isEcoAIOpen) {
      scrollToBottom();
    }
  }, [ecoAIMessages, isEcoAIOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isEcoAILoading) return;
    const msg = input.trim();
    setInput('');
    sendEcoAIMessage(msg);
  };

  const handleSuggestedClick = (question: string) => {
    sendEcoAIMessage(question);
  };

  if (!isEcoAIOpen) {
    return (
      <button
        onClick={() => setIsEcoAIOpen(true)}
        className="fixed bottom-6 right-6 z-40 campusiq-ai-widget flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-900/30 hover:shadow-emerald-800/40 transition-all hover:scale-105 active:scale-95 group"
        aria-label="Open CampusIQ AI Assistant"
      >
        <Leaf className="w-5 h-5 text-emerald-300 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold tracking-wide">CampusIQ AI</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      </button>
    );
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-800 dark:bg-emerald-700 text-white flex items-center justify-center shadow-xs">
            <Leaf className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">CampusIQ AI</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                by ECONEX
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Campus Intelligence Assistant
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsEcoAIOpen(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close assistant"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {ecoAIMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs ${
                msg.sender === 'user'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-800 text-white rounded-tr-none'
                  : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-xs'
              }`}
            >
              {/* Render simple markdown formats */}
              <div className="prose dark:prose-invert prose-xs max-w-none space-y-1.5">
                {msg.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h4
                        key={pIdx}
                        className="font-bold text-slate-900 dark:text-white text-xs mt-1 mb-1"
                      >
                        {paragraph.replace('### ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                    const lines = paragraph.split('\n');
                    return (
                      <ul key={pIdx} className="list-disc pl-4 space-y-1 text-xs">
                        {lines.map((l, lIdx) => (
                          <li
                            key={lIdx}
                            dangerouslySetInnerHTML={{
                              __html: l
                                .replace(/^[-*]\s*/, '')
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                            }}
                          />
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p
                      key={pIdx}
                      className="text-xs"
                      dangerouslySetInnerHTML={{
                        __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                      }}
                    />
                  );
                })}
              </div>

              <div className="mt-2 text-[10px] opacity-60 text-right font-mono">
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isEcoAILoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 animate-bounce" />
            </div>
            <div className="bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl rounded-tl-none p-3 text-xs text-slate-500 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-700" />
              <span>Analyzing campus sensor streams with CampusIQ AI...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts strip */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2">
          <Lightbulb className="w-3 h-3 text-amber-500" />
          <span>Suggested Questions</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestedClick(q)}
              className="whitespace-nowrap px-2.5 py-1 text-[11px] font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input box */}
      <form
        onSubmit={handleSubmit}
        className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask CampusIQ AI about energy, water, air..."
          disabled={isEcoAILoading}
          className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
        />
        <button
          type="submit"
          disabled={!input.trim() || isEcoAILoading}
          className="p-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white transition-colors"
          aria-label="Send query"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
