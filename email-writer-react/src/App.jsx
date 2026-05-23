import { useState } from "react";
import axios from "axios";
import "./App.css";

const TONES = [
  { value: "professional", label: "Professional", emoji: "💼" },
  { value: "casual", label: "Casual", emoji: "😊" },
  { value: "friendly", label: "Friendly", emoji: "🤝" },
  { value: "formal", label: "Formal", emoji: "🎩" },
];

export default function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!emailContent.trim()) return;
    setLoading(true);
    setError("");
    setGeneratedReply("");
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone,
      });
      setGeneratedReply(
        typeof response.data === "string" ? response.data : JSON.stringify(response.data)
      );
    } catch (err) {
      setError("Failed to generate reply. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setEmailContent("");
    setTone("");
    setGeneratedReply("");
    setError("");
  };

  return (
    <div className="flex min-h-screen bg-[#0c0c14] text-slate-200 font-sans">

      {/* ── Sidebar ── */}
      <aside className="w-56 shrink-0 flex flex-col bg-[#111120] border-r border-white/5 px-4 py-6">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-lg shadow-lg shadow-indigo-500/30">
            ✉
          </div>
          <span className="text-white font-bold text-lg tracking-tight">MailAI</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {[
            { icon: "⚡", label: "Generate", active: true },
            
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 text-sm font-medium
                ${item.active
                  ? "bg-indigo-500/15 text-indigo-300 border-l-2 border-indigo-400"
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/5 pt-4 flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full w-fit">
            GEMINI AI
          </span>
          <span className="text-[11px] text-slate-700 px-1">v1.0.0</span>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col p-8 overflow-y-auto">

        {/* Top Bar */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Smart Email Assistant</h1>
            <p className="text-sm text-slate-500 mt-1">Generate professional email replies in seconds</p>
          </div>
          <div className="flex items-center gap-2 bg-[#111120] border border-white/5 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-medium text-emerald-400">AI Ready</span>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-2 gap-6 flex-1">

          {/* ── Left: Input ── */}
          <div className="flex flex-col gap-5 bg-[#111120] border border-white/5 rounded-2xl p-6">

            {/* Card Header */}
            <div className="flex items-center gap-2.5">
              <span className="text-xl">📨</span>
              <h2 className="text-sm font-semibold text-slate-300 tracking-wide">Original Email</h2>
            </div>

            {/* Textarea */}
            <div className="flex flex-col gap-1">
              <textarea
                rows={9}
                placeholder="Paste the email you want to reply to..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="w-full bg-[#0c0c14] border border-white/8 rounded-xl px-4 py-3 text-sm text-slate-300 placeholder-slate-600 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/60 transition-all duration-200 leading-relaxed"
              />
              <span className="text-[11px] text-slate-700 text-right">{emailContent.length} characters</span>
            </div>

            {/* Tone Selector */}
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold tracking-widest text-slate-600 uppercase">Reply Tone</p>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTone(tone === t.value ? "" : t.value)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150
                      ${tone === t.value
                        ? "bg-indigo-500/15 border-indigo-500/50 text-indigo-300"
                        : "bg-transparent border-white/8 text-slate-500 hover:bg-white/5 hover:text-slate-300 hover:border-white/15"
                      }`}
                  >
                    <span className="text-base">{t.emoji}</span>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm leading-relaxed">
                <span className="mt-0.5 shrink-0">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={handleSubmit}
                disabled={!emailContent.trim() || loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-150
                  bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20
                  hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/30
                  disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>✨ Generate Reply</>
                )}
              </button>

              {(emailContent || generatedReply) && (
                <button
                  onClick={handleClear}
                  className="px-4 py-3 rounded-xl border border-white/8 text-slate-500 text-sm font-medium hover:text-slate-300 hover:bg-white/5 hover:border-white/15 transition-all duration-150"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* ── Right: Output ── */}
          <div className="flex flex-col gap-5 bg-[#111120] border border-white/5 rounded-2xl p-6">

            {/* Card Header */}
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🤖</span>
              <h2 className="text-sm font-semibold text-slate-300 tracking-wide flex-1">Generated Reply</h2>
              {generatedReply && (
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ● Ready
                </span>
              )}
            </div>

            {/* Empty State */}
            {!generatedReply ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-[#0c0c14] rounded-xl border border-dashed border-white/8 py-16">
                <span className="text-4xl opacity-20">💬</span>
                <p className="text-sm font-medium text-slate-600">No reply generated yet</p>
                <p className="text-xs text-slate-700 text-center leading-relaxed px-6">
                  Paste your email on the left,<br />choose a tone and click Generate
                </p>
              </div>
            ) : (
              <>
                {/* Output Text */}
                <div className="flex-1 bg-[#0c0c14] border border-white/8 rounded-xl p-4 overflow-y-auto max-h-[420px]">
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{generatedReply}</p>
                </div>

                {/* Char count */}
                <span className="text-[11px] text-slate-700 text-right -mt-3">{generatedReply.length} characters</span>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={handleCopy}
                    className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-medium transition-all duration-150
                      ${copied
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "border-white/8 text-slate-500 hover:bg-white/5 hover:text-slate-300 hover:border-white/15"
                      }`}
                  >
                    {copied ? "✅ Copied!" : "📋 Copy"}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/8 text-xs font-medium text-slate-500 hover:bg-white/5 hover:text-slate-300 hover:border-white/15 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    🔄 Regenerate
                  </button>
                  <button
                    onClick={() => setGeneratedReply("")}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/8 text-xs font-medium text-slate-500 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all duration-150"
                  >
                    🗑 Discard
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-slate-700 mt-6 tracking-wide">
          Built with Spring Boot · Gemini AI · React
        </p>
      </main>
    </div>
  );
}