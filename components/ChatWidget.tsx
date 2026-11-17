"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Loader2, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ParsedMessage {
  text: string;
  cta: { label: string; href: string } | null;
  showLeadCapture: boolean;
  showHandoff: boolean;
}

function parseMessage(raw: string): ParsedMessage {
  let text = raw;
  let cta: { label: string; href: string } | null = null;
  let showLeadCapture = false;
  let showHandoff = false;

  // Extract CTA marker: [[CTA:Label|/path]]
  const ctaMatch = text.match(/\[\[CTA:([^\|]+)\|([^\]]+)\]\]/);
  if (ctaMatch) {
    cta = { label: ctaMatch[1].trim(), href: ctaMatch[2].trim() };
    text = text.replace(ctaMatch[0], "").trim();
  }

  // Extract LEAD_CAPTURE marker
  if (text.includes("[[LEAD_CAPTURE]]")) {
    showLeadCapture = true;
    text = text.replace("[[LEAD_CAPTURE]]", "").trim();
  }

  // Extract HANDOFF marker
  if (text.includes("[[HANDOFF]]")) {
    showHandoff = true;
    text = text.replace("[[HANDOFF]]", "").trim();
  }

  return { text, cta, showLeadCapture, showHandoff };
}

const QUICK_REPLIES = [
  "What does tutoring cost?",
  "How do I book a session?",
  "Tell me about group classes",
  "Do you offer a free consultation?",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Ms. Horace's Math Assistant. I can answer questions about tutoring, pricing, and even help with Pre-Algebra or Algebra 1 math. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadShown, setLeadShown] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadDone, setLeadDone] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  async function sendMessage(text?: string) {
    const msgText = (text ?? input).trim();
    if (!msgText || isLoading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: msgText },
    ];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setMessages((prev: Message[]) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch");
      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "Sorry, I ran into an issue. Please try again or visit our contact page!",
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function submitLead() {
    if (!leadEmail.trim()) return;
    setLeadSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName || "Chat visitor",
          email: leadEmail,
          source: "chat-widget",
          subject: "Chat inquiry",
        }),
      });
      setLeadDone(true);
      setLeadCaptured(true);
    } catch {
      setLeadDone(true);
    } finally {
      setLeadSubmitting(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const showQuickReplies = messages.length === 1 && !isLoading;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div
          className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          style={{ height: "520px" }}
        >
          {/* Header */}
          <div className="bg-violet-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none">
                  Math Assistant
                </p>
                <p className="text-violet-200 text-xs mt-0.5">
                  MsHorace Tutoring
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => {
              const isLast = i === messages.length - 1;
              const isStreaming = isLast && isLoading && msg.role === "assistant";
              const parsed =
                msg.role === "assistant" ? parseMessage(msg.content) : null;

              // Show lead capture after the message that triggers it (only once)
              const showCapture =
                parsed?.showLeadCapture && !leadShown && !leadCaptured;
              if (showCapture && !leadShown) {
                // mark shown on next tick
                setTimeout(() => setLeadShown(true), 0);
              }

              return (
                <div key={i}>
                  <div
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-violet-600 text-white rounded-br-sm"
                          : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm"
                      }`}
                    >
                      {msg.role === "assistant" && parsed ? (
                        parsed.text || (
                          isStreaming ? (
                            <span className="flex items-center gap-1 text-gray-400">
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Thinking...</span>
                            </span>
                          ) : null
                        )
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>

                  {/* Inline CTA button */}
                  {msg.role === "assistant" && parsed?.cta && !isStreaming && (
                    <div className="flex justify-start mt-1.5 ml-0">
                      <Link
                        href={parsed.cta.href}
                        className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors"
                      >
                        {parsed.cta.label}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}

                  {/* Handoff card */}
                  {msg.role === "assistant" && parsed?.showHandoff && !isStreaming && (
                    <div className="mt-2 bg-violet-50 border border-violet-100 rounded-xl p-3 text-xs text-violet-800">
                      <p className="font-semibold mb-1.5">Connect with Ms. Horace directly</p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1 bg-violet-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-violet-700 transition-colors"
                      >
                        Open Contact Form
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}

                  {/* Lead capture form */}
                  {msg.role === "assistant" && showCapture && !leadDone && (
                    <div className="mt-2 bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Mail className="w-3.5 h-3.5 text-violet-500" />
                        <p className="text-xs font-semibold text-gray-800">
                          Get updates from Ms. Horace
                        </p>
                      </div>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 mb-1.5 outline-none focus:border-violet-400"
                      />
                      <input
                        type="email"
                        placeholder="Your email address"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && submitLead()}
                        className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 mb-2 outline-none focus:border-violet-400"
                      />
                      <button
                        onClick={submitLead}
                        disabled={!leadEmail.trim() || leadSubmitting}
                        className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white text-xs font-semibold py-1.5 rounded-lg transition-colors"
                      >
                        {leadSubmitting ? "Saving..." : "Stay in the loop"}
                      </button>
                    </div>
                  )}

                  {msg.role === "assistant" && showCapture && leadDone && (
                    <div className="mt-2 bg-green-50 border border-green-100 rounded-xl p-2.5 text-xs text-green-700 font-medium">
                      You're on the list! Ms. Horace will be in touch soon.
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quick reply chips */}
            {showQuickReplies && (
              <div className="flex flex-col gap-1.5 pt-1">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left text-xs bg-white border border-violet-200 hover:border-violet-400 hover:bg-violet-50 text-violet-700 font-medium px-3 py-2 rounded-xl transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white flex-shrink-0">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-violet-700 transition-colors flex-shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-1.5">
              Powered by AI · MsHorace Tutoring
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
