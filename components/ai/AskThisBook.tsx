"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AIMessage, Book } from "@/types";

interface AskThisBookProps {
  book: Book;
  isPremium?: boolean;
  className?: string;
}

const STARTER_PROMPTS = [
  "What are the core ideas?",
  "How can I apply this?",
  "What should I read next?",
  "Give me a summary",
];

export default function AskThisBook({ book, isPremium = false, className }: AskThisBookProps) {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi! I've read "${book.title}" by ${book.author}. Ask me anything about it — themes, ideas, how to apply it, or what to read next.`,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(text?: string) {
    const content = text ?? input.trim();
    if (!content || loading) return;

    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulated AI response
    setTimeout(() => {
      const aiMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Great question about "${content.slice(0, 40)}...". This is a simulated AI response for the MVP. In production, this connects to your backend AI service.`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1200);
  }

  if (!isPremium) {
    return (
      <div
        className={cn(
          "bg-gradient-to-br from-brand-50 to-sage-50 rounded-2xl p-5 text-center border border-brand-50",
          className
        )}
      >
        <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-3">
          <Lock size={20} className="text-brand-600" />
        </div>
        <h3 className="text-[15px] font-semibold text-ink-700">Ask This Book</h3>
        <p className="text-xs text-ink-500 mt-1 leading-relaxed">
          Chat with an AI that has read this book. Get insights, summaries, and next-read
          recommendations.
        </p>
        <button className="mt-4 w-full py-3 rounded-2xl bg-brand-600 text-white text-sm font-semibold shadow-float">
          Upgrade to Premium
        </button>
      </div>
    );
  }

  return (
    <div className={cn("bg-white rounded-2xl shadow-card overflow-hidden flex flex-col", className)}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-sage-200 bg-gradient-to-r from-brand-50 to-transparent">
        <div className="w-7 h-7 rounded-xl bg-brand-600 flex items-center justify-center">
          <Sparkles size={14} className="text-white" />
        </div>
        <div>
          <h3 className="text-[13px] font-semibold text-ink-700">Ask This Book</h3>
          <p className="text-[10px] text-ink-400">AI-powered reading companion</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                msg.role === "user"
                  ? "bg-brand-600 text-white rounded-br-sm"
                  : "bg-sage-100 text-ink-700 rounded-bl-sm"
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-sage-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
              {[0, 0.15, 0.3].map((delay, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-ink-400 animate-bounce"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Starter prompts */}
      {messages.length < 3 && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
          {STARTER_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="shrink-0 text-xs px-3 py-1.5 rounded-xl bg-brand-50 text-brand-600 font-medium border border-brand-50 active:bg-brand-100"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t border-sage-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask something..."
          className="flex-1 text-sm bg-sage-100 rounded-2xl px-4 py-2.5 outline-none placeholder:text-ink-400 focus:ring-2 ring-brand-300"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="w-9 h-9 rounded-2xl bg-brand-600 text-white flex items-center justify-center disabled:opacity-40 active:scale-95 transition-transform"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
