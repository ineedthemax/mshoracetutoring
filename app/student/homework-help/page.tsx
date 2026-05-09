"use client";
import { useState, useRef, useEffect } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, RotateCcw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTERS = [
  "How do I solve 2x + 5 = 13?",
  "What is slope and how do I find it?",
  "Can you explain how to factor x² + 5x + 6?",
  "How do I graph a linear equation?",
  "What's the difference between an expression and an equation?",
];

export default function HomeworkHelpPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text?: string) {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/student-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: assistantText };
          return updated;
        });
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="student" />
      <main className="md:ml-64 flex-1 flex flex-col pt-14 md:pt-0 pb-16 md:pb-0 h-screen">

        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">AI Homework Helper</h1>
              <p className="text-xs text-gray-400">Pre-Algebra & Algebra 1 · Available 24/7</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button onClick={() => setMessages([])} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600">
              <RotateCcw className="w-3.5 h-3.5" /> New chat
            </button>
          )}
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.length === 0 ? (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-violet-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Ask me anything about math!</h2>
                <p className="text-gray-500 text-sm">I can help you with Pre-Algebra and Algebra 1 problems step by step.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {STARTERS.map((s) => (
                  <button key={s} onClick={() => sendMessage(s)}
                    className="text-left p-4 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-violet-300 hover:bg-violet-50 transition-all">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <div className="w-7 h-7 bg-violet-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                      <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-violet-600 text-white rounded-br-sm"
                      : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm"
                  }`}>
                    {m.content || <span className="opacity-50">Thinking...</span>}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-100 px-4 py-4 flex-shrink-0">
          <div className="max-w-2xl mx-auto flex gap-3 items-end">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              placeholder="Ask a math question... (e.g. How do I solve 3x - 4 = 11?)"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none bg-gray-50"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
            <Button onClick={() => sendMessage()} disabled={loading || !input.trim()} size="sm" className="h-11 px-4">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">Press Enter to send · Shift+Enter for new line</p>
        </div>

      </main>
    </div>
  );
}
