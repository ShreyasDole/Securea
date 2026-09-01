"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ChevronRight, ArrowLeft, Shield, Zap } from "lucide-react";
import { firms } from "@/lib/mock-firms";
import { useFirm } from "@/lib/firm-context";
import type { Firm } from "@/lib/mock-firms";

type Step = "select-firm" | "credentials";

export default function LoginPage() {
  const router        = useRouter();
  const { login }     = useFirm();
  const [step, setStep]           = useState<Step>("select-firm");
  const [selectedFirm, setFirm]   = useState<Firm | null>(null);
  const [userIdx, setUserIdx]     = useState(0);
  const [password, setPassword]   = useState("demo");
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  function handleSelectFirm(firm: Firm) {
    setFirm(firm);
    setUserIdx(0);
    setPassword("demo");
    setError("");
    setStep("credentials");
  }

  function handleLogin() {
    if (!selectedFirm) return;
    const user = selectedFirm.demoUsers[userIdx];
    if (password !== user.password) {
      setError("Incorrect password. (hint: demo)");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login({
        firm: selectedFirm,
        user: { name: user.name, role: user.role, avatar: user.avatar },
      });
      router.push("/");
    }, 900);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Brand header */}
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neu-raised">
            <Shield size={16} className="text-white" />
          </div>
          <span className="text-[22px] font-bold gradient-text-primary tracking-tight">SECUREA</span>
        </div>
        <p className="text-[13px] text-n500">Financial Operating Platform · B2B</p>
      </div>

      <div className="w-full max-w-[480px]">

        {/* ── Step 1: Select firm ─────────────────────────────── */}
        {step === "select-firm" && (
          <div className="space-y-3 animate-[fadeIn_0.3s_ease-out]">
            <p className="text-[13px] text-n500 text-center mb-5">Select your organisation to continue</p>
            {firms.map((firm) => (
              <button
                key={firm.id}
                onClick={() => handleSelectFirm(firm)}
                className="w-full aether-card p-4 flex items-center gap-4 hover:border-white/[0.14] hover:translate-y-[-1px] transition-all duration-200 group text-left"
              >
                {/* Logo blob */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-[22px] shrink-0 neu-raised"
                  style={{ background: `${firm.color}18`, border: `1px solid ${firm.color}30` }}
                >
                  {firm.logo}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold text-n100">{firm.name}</p>
                  <p className="text-[12px] text-n500">{firm.tagline}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-n600">
                      {firm.overview.totalRelationships.toLocaleString("en-IN")} relationships
                    </span>
                    <span className="text-n700">·</span>
                    <span className="text-[11px] text-n600">
                      ₹{firm.overview.totalAumCr.toLocaleString("en-IN")} Cr AUM
                    </span>
                  </div>
                </div>

                <ChevronRight size={16} className="text-n600 group-hover:text-n300 transition-colors shrink-0" />
              </button>
            ))}

            <p className="text-center text-[11px] text-n700 mt-6">
              SECUREA is a B2B platform for financial institutions.<br />
              Individual investors are not the end users.
            </p>
          </div>
        )}

        {/* ── Step 2: Credentials ─────────────────────────────── */}
        {step === "credentials" && selectedFirm && (
          <div className="animate-[fadeIn_0.25s_ease-out]">
            {/* Back */}
            <button
              onClick={() => { setStep("select-firm"); setError(""); }}
              className="flex items-center gap-1.5 text-[12px] text-n500 hover:text-n300 transition-colors mb-6"
            >
              <ArrowLeft size={12} />Back
            </button>

            {/* Firm badge */}
            <div
              className="aether-card p-4 flex items-center gap-3 mb-6"
              style={{ borderColor: `${selectedFirm.color}25` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[18px] shrink-0"
                style={{ background: `${selectedFirm.color}18`, border: `1px solid ${selectedFirm.color}30` }}
              >
                {selectedFirm.logo}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-n100">{selectedFirm.name}</p>
                <p className="text-[11px] text-n500">{selectedFirm.tagline}</p>
              </div>
              <div
                className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                style={{ color: selectedFirm.color, borderColor: `${selectedFirm.color}40`, background: `${selectedFirm.color}10` }}
              >
                {selectedFirm.type.replace("-", " ").toUpperCase()}
              </div>
            </div>

            {/* User selector */}
            <div className="mb-4">
              <label className="text-[11px] font-semibold text-n500 uppercase tracking-widest mb-2 block">
                Sign in as
              </label>
              <div className="space-y-2">
                {selectedFirm.demoUsers.map((u, i) => (
                  <button
                    key={i}
                    onClick={() => setUserIdx(i)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                      userIdx === i
                        ? "border-primary/40 bg-primary/8"
                        : "border-white/[0.06] glass-subtle hover:border-white/[0.1]"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-bold shrink-0 ${
                      userIdx === i ? "bg-primary text-white" : "bg-n700/40 text-n400"
                    }`}>
                      {u.avatar}
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-n200">{u.name}</p>
                      <p className="text-[11px] text-n500">{u.role}</p>
                    </div>
                    {userIdx === i && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="text-[11px] font-semibold text-n500 uppercase tracking-widest mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl glass-subtle border border-white/[0.08] text-n200 text-[14px] outline-none focus:border-primary/40 focus:bg-primary/5 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-n600 hover:text-n400"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {error && <p className="text-error text-[12px] mt-1.5">{error}</p>}
              <p className="text-n700 text-[11px] mt-1">Demo password: <span className="text-n500 font-mono">demo</span></p>
            </div>

            {/* Login button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-[14px] text-white flex items-center justify-center gap-2 transition-all"
              style={{
                background: loading
                  ? "rgba(99,102,241,0.5)"
                  : `linear-gradient(135deg, ${selectedFirm.color}, #6366F1)`,
                boxShadow: loading ? "none" : "0 4px 24px rgba(99,102,241,0.25)",
              }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Zap size={15} />
                  Access SECUREA as {selectedFirm.demoUsers[userIdx].name.split(" ")[0]}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
