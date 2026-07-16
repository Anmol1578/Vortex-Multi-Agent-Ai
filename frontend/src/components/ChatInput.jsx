import React from "react";

function AttachIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.19 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}
function MicIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

const MODES = [
  { id: "auto", label: "Auto" },
  { id: "chat", label: "Chat" },
  { id: "coding", label: "Coding" },
  { id: "pdf", label: "PDF" },
  { id: "ppt", label: "PPT" },
  { id: "vision", label: "Vision" },
  { id: "search", label: "Search" },
];

function ChatInput({ input, setInput, mode, setMode, onSend }) {
  return (
    <div className="p-5 border-t border-black/[0.07] bg-white/25 backdrop-blur-xl z-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`shrink-0 text-xs font-[IBM_Plex_Mono,monospace] font-medium rounded-md px-3.5 py-1.5 border transition-all duration-300 ${
                mode === m.id
                  ? "bg-[#14151A] border-transparent text-white hover:bg-[#1E7A56]"
                  : "border-black/15 text-black/45 hover:text-[#1E7A56] hover:border-[#1E7A56]/40 hover:bg-[#1E7A56]/[0.05]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-black/[0.08] bg-white shadow-[0_4px_20px_rgba(20,21,26,0.05)] px-4 py-3 focus-within:border-[#1E7A56]/50 transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            placeholder="Tell Vortex what to do…"
            rows={1}
            className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-black/30 max-h-40"
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3 text-black/35">
              <button className="hover:text-[#1E7A56] transition-colors" aria-label="Attach file">
                <AttachIcon />
              </button>
              <button className="hover:text-[#1E7A56] transition-colors" aria-label="Voice input">
                <MicIcon />
              </button>
            </div>
            <button
              onClick={onSend}
              disabled={!input.trim()}
              className="rounded-md bg-[#14151A] p-2 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1E7A56] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(30,122,86,0.25)]"
              aria-label="Send"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;