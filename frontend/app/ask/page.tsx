"use client";

import { useState, useRef, useEffect } from "react";
import { Send, ArrowRight, Bot, User } from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/shared/GlassCard";
import { initialMessages, suggestedQuestions } from "@/lib/mock-data";
import type { ChatMessage } from "@/types";

const MOCK_RESPONSES: Record<string, Omit<ChatMessage, "id" | "createdAt" | "role">> = {
  default: {
    content:
      "I found material changes across your book. Would you like me to walk you through the most critical ones?",
    linkedData: { type: "overview", cta: "View overview", href: "/" },
  },
  portfolio: {
    content:
      "127 portfolios require attention. 8 are high priority — primarily concentration and duration risk. The most critical is ₹842 Cr exposure in HNI equity portfolios.",
    linkedData: { type: "portfolios", count: 127, cta: "View in Monitor", href: "/monitor" },
  },
  liquidity: {
    content:
      "Three correlated signals drive the HNI liquidity increase: equity market volatility (Q3), reduced RM interaction frequency, and absence of structured product offering for this segment. Confidence: 91%.",
    linkedData: { type: "pattern", cta: "View intelligence", href: "/intelligence" },
  },
  concentration: {
    content:
      "I prepared three options: (1) Phased rebalancing over 30 days, (2) Sector cap enforcement with policy override, (3) RM-led manual review for top 500 exposures. Decision DEC-2026-001 has the full plan.",
    linkedData: { type: "decision", cta: "Review decision", href: "/decisions" },
  },
  compliance: {
    content:
      "1 compliance decision due this week: KYC renewal for 2,140 accounts. Deadline: 30 September 2026. 30 days to act. CRM campaign draft is ready for your approval.",
    linkedData: { type: "compliance", count: 1, cta: "Review decision", href: "/decisions" },
  },
  opportunity: {
    content:
      "Highest opportunity right now: HNI liquidity cohort (₹312 Cr, 48,231 relationships) and young professional SIP growth (₹28 Cr incremental AUM, 8,412 relationships). Both require product action.",
    linkedData: { type: "intelligence", cta: "View intelligence", href: "/intelligence" },
  },
};

function getResponse(q: string): Omit<ChatMessage, "id" | "createdAt" | "role"> {
  const lower = q.toLowerCase();
  if (lower.includes("portfolio") || lower.includes("attention")) return MOCK_RESPONSES.portfolio;
  if (lower.includes("liquidity") || lower.includes("hni"))        return MOCK_RESPONSES.liquidity;
  if (lower.includes("concentration"))                             return MOCK_RESPONSES.concentration;
  if (lower.includes("compliance") || lower.includes("kyc"))       return MOCK_RESPONSES.compliance;
  if (lower.includes("opportunity") || lower.includes("segment"))  return MOCK_RESPONSES.opportunity;
  return MOCK_RESPONSES.default;
}

export default function AskPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      content: text.trim(),
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const response = getResponse(text);
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: "assistant",
        ...response,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setLoading(false);
    }, 900);
  }

  return (
    <div className="max-w-[800px] mx-auto flex flex-col h-[calc(100vh-120px)] animate-[fadeIn_0.3s_ease-out]">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mb-4">
        <h1 className="text-[24px] font-semibold text-n100 tracking-tight">Ask SECUREA</h1>
        <p className="text-n500 text-[13px] mt-1">
          Ask anything about your book. SECUREA will find the answer.
        </p>
      </div>

      {/* ── Messages ───────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 pb-4 pr-1">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* ── Suggested questions (only if no user messages yet) ── */}
      {messages.filter((m) => m.role === "user").length === 0 && (
        <div className="py-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-n600 mb-3">
            Try asking
          </p>
          <div className="grid grid-cols-2 gap-2">
            {suggestedQuestions.slice(0, 4).map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="aether-card-sm px-4 py-3 text-left text-[13px] text-n400 hover:text-n200 transition-colors text-wrap"
              >
                &ldquo;{q}&rdquo;
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Input ──────────────────────────────────────────────── */}
      <div className="mt-2">
        <div className="flex items-end gap-3 glass-strong rounded-xl p-3 border border-white/[0.08]">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ask SECUREA..."
            className="flex-1 bg-transparent text-[14px] text-n200 placeholder:text-n600 resize-none focus:outline-none max-h-32 scrollbar-thin"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="btn-primary py-2 px-3 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={14} />
          </button>
        </div>
        <p className="text-[11px] text-n700 text-center mt-2">
          SECUREA uses synthetic data in demo mode. Real data requires institution integration.
        </p>
      </div>

    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
          isUser
            ? "bg-gradient-to-br from-primary to-secondary"
            : "bg-n800 border border-white/[0.08]"
        }`}
      >
        {isUser ? (
          <User size={13} className="text-white" />
        ) : (
          <Bot size={13} className="text-secondary" />
        )}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-2`}>
        <div
          className={`px-4 py-3 rounded-xl text-[14px] leading-relaxed ${
            isUser
              ? "bg-primary/20 border border-primary/25 text-n100 rounded-tr-sm"
              : "glass border border-white/[0.08] text-n200 rounded-tl-sm"
          }`}
        >
          {message.content}
        </div>

        {/* Linked data action */}
        {message.linkedData && (
          <Link
            href={message.linkedData.href || "/"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-subtle border border-white/[0.06] text-[12px] text-primary hover:text-primary/80 transition-colors"
          >
            {message.linkedData.cta}
            <ArrowRight size={11} />
          </Link>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-7 h-7 rounded-full bg-n800 border border-white/[0.08] flex items-center justify-center shrink-0">
        <Bot size={13} className="text-secondary" />
      </div>
      <div className="glass border border-white/[0.08] px-4 py-3 rounded-xl rounded-tl-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-n500 animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
