

// import React, { useState, useRef, useEffect } from "react";

// const AGENTS = [
//   { id: "researcher", label: "Researcher", color: "#6E6FEA", role: "gathers context" },
//   { id: "planner", label: "Planner", color: "#4FD1C5", role: "breaks down tasks" },
//   { id: "coder", label: "Coder", color: "#F0B45E", role: "writes & tests" },
//   { id: "reviewer", label: "Reviewer", color: "#F0729A", role: "checks output" },
// ];

// const MODES = [
//   { id: "auto", label: "Auto" },
//   { id: "chat", label: "Chat" },
//   { id: "coding", label: "Coding" },
//   { id: "pdf", label: "PDF" },
//   { id: "ppt", label: "PPT" },
//   { id: "image", label: "Image" },
//   { id: "search", label: "Search" },
// ];

// const SUGGESTIONS = [
//   "Build a REST API with auth",
//   "Plan a RAG pipeline",
//   "Debug this stack trace",
// ];

// const RECENT_SESSIONS = [
//   { id: 1, title: "Build a LangGraph agent", agent: "coder", time: "2h ago" },
//   { id: 2, title: "Summarize Q3 research", agent: "researcher", time: "1d ago" },
//   { id: 3, title: "Plan sprint breakdown", agent: "planner", time: "2d ago" },
// ];

// function Dashboard() {
//   const [mode, setMode] = useState("auto");
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [activeAgent, setActiveAgent] = useState(null);
//   const [thinking, setThinking] = useState(false);
//   const [activityLog, setActivityLog] = useState([]);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
//   }, [messages, thinking]);

//   const send = (text) => {
//     const content = (text ?? input).trim();
//     if (!content) return;

//     const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)];
//     setMessages((m) => [...m, { role: "user", content }]);
//     setInput("");
//     setThinking(true);
//     setActiveAgent(agent.id);
//     setActivityLog((log) => [
//       { id: Date.now(), agent, text: `Received task`, time: "now" },
//       ...log,
//     ].slice(0, 6));

//     setTimeout(() => {
//       setMessages((m) => [
//         ...m,
//         { role: "agent", agent, content: `Routed "${content}" to ${agent.label.toLowerCase()} — task complete.` },
//       ]);
//       setActivityLog((log) => [
//         { id: Date.now() + 1, agent, text: `Completed task`, time: "now" },
//         ...log,
//       ].slice(0, 6));
//       setThinking(false);
//       setActiveAgent(null);
//     }, 1400);
//   };

//   return (
//     <div className="h-screen flex bg-[#FAF9F6] text-[#1C1B1F] font-[Inter,sans-serif] overflow-hidden">
//       <style>{`
//         @keyframes pulse-dot { 0%,100% { opacity: 1; transform: scale(1);} 50% { opacity: .4; transform: scale(1.3);} }
//         @keyframes rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
//         .msg-in { animation: rise .35s ease both; }
//       `}</style>

//       {/* Icon rail */}
//       <aside className="w-16 shrink-0 border-r border-black/[0.06] bg-white/60 backdrop-blur-xl flex flex-col items-center py-5 gap-6">
//         <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6E6FEA] to-[#4FD1C5] flex items-center justify-center">
//           <span className="text-white text-xs font-[Space_Grotesk,sans-serif] font-bold">V</span>
//         </div>
//         <nav className="flex flex-col items-center gap-1 mt-4">
//           <RailIcon active label="Sessions"><ChatIcon /></RailIcon>
//           <RailIcon label="Agents"><AgentsIcon /></RailIcon>
//           <RailIcon label="Files"><FilesIcon /></RailIcon>
//           <RailIcon label="History"><HistoryIcon /></RailIcon>
//         </nav>
//         <div className="mt-auto flex flex-col items-center gap-3">
//           <RailIcon label="Settings"><SettingsIcon /></RailIcon>
//           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6E6FEA] to-[#4FD1C5]" />
//         </div>
//       </aside>

//       {/* Sessions panel */}
//       <aside className="w-64 shrink-0 border-r border-black/[0.06] bg-white/40 backdrop-blur-xl flex flex-col">
//         <div className="p-4">
//           <button
//             onClick={() => { setMessages([]); setInput(""); }}
//             className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1C1B1F] text-white text-sm font-medium py-2.5 hover:opacity-90 transition-opacity"
//           >
//             <PlusIcon /> New session
//           </button>
//         </div>
//         <div className="px-4 flex-1 overflow-y-auto">
//           <p className="text-[10px] font-[Space_Grotesk,sans-serif] font-semibold uppercase tracking-widest text-black/30 mb-2 mt-2">
//             Recent
//           </p>
//           <div className="space-y-1">
//             {RECENT_SESSIONS.map((s) => {
//               const agent = AGENTS.find((a) => a.id === s.agent);
//               return (
//                 <button
//                   key={s.id}
//                   className="w-full text-left rounded-lg px-3 py-2.5 hover:bg-white/70 transition-colors group"
//                 >
//                   <p className="text-sm text-black/80 truncate group-hover:text-black">{s.title}</p>
//                   <div className="flex items-center gap-1.5 mt-1">
//                     <span className="w-1 h-1 rounded-full" style={{ background: agent.color }} />
//                     <span className="text-[11px] text-black/35">{agent.label} · {s.time}</span>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//         <div className="p-4 border-t border-black/[0.06]">
//           <div className="rounded-xl border border-black/[0.06] bg-white/70 p-3.5">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-xs font-medium text-black/60">Free plan</span>
//               <span className="text-[10px] font-[Space_Grotesk,sans-serif] text-[#6E6FEA]">12/100</span>
//             </div>
//             <div className="h-1.5 rounded-full bg-black/[0.06] overflow-hidden">
//               <div className="h-full w-[12%] rounded-full bg-gradient-to-r from-[#6E6FEA] to-[#4FD1C5]" />
//             </div>
//             <button className="w-full text-xs font-medium rounded-lg bg-[#1C1B1F] text-white py-2 mt-3 hover:opacity-90 transition-opacity">
//               Upgrade
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="flex-1 flex flex-col min-w-0">
//         <div className="h-14 border-b border-black/[0.06] flex items-center gap-4 px-6 bg-white/40 backdrop-blur-xl">
//           <p className="text-sm font-medium">{messages.length ? "Active session" : "New session"}</p>
//           <span className="text-[11px] text-black/35">{messages.length} messages</span>
//         </div>

//         <div ref={scrollRef} className="flex-1 overflow-y-auto">
//           {messages.length === 0 ? (
//             <EmptyState onSuggest={send} />
//           ) : (
//             <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
//               {messages.map((m, i) => (
//                 <MessageBubble key={i} message={m} />
//               ))}
//               {thinking && <ThinkingBubble agentId={activeAgent} />}
//             </div>
//           )}
//         </div>

//         <div className="p-5 border-t border-black/[0.06] bg-white/30 backdrop-blur-xl">
//           <div className="max-w-2xl mx-auto">
//             <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar">
//               {MODES.map((m) => (
//                 <button
//                   key={m.id}
//                   onClick={() => setMode(m.id)}
//                   className={`shrink-0 text-xs font-medium rounded-full px-3.5 py-1.5 border transition-colors ${
//                     mode === m.id
//                       ? "bg-[#1C1B1F] border-transparent text-white"
//                       : "border-black/10 text-black/45 hover:text-black hover:border-black/25"
//                   }`}
//                 >
//                   {m.label}
//                 </button>
//               ))}
//             </div>

//             <div className="rounded-2xl border border-black/[0.08] bg-white shadow-[0_4px_20px_rgba(28,27,31,0.05)] px-4 py-3 focus-within:border-[#6E6FEA]/50 transition-colors">
//               <textarea
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" && !e.shiftKey) {
//                     e.preventDefault();
//                     send();
//                   }
//                 }}
//                 placeholder="Tell your agents what to do…"
//                 rows={1}
//                 className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-black/30 max-h-40"
//               />
//               <div className="flex items-center justify-between mt-2">
//                 <div className="flex items-center gap-3 text-black/35">
//                   <button className="hover:text-black/70 transition-colors" aria-label="Attach file"><AttachIcon /></button>
//                   <button className="hover:text-black/70 transition-colors" aria-label="Voice input"><MicIcon /></button>
//                 </div>
//                 <button
//                   onClick={() => send()}
//                   disabled={!input.trim()}
//                   className="rounded-full bg-gradient-to-r from-[#6E6FEA] to-[#4FD1C5] p-2 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#6E6FEA]/25 transition-shadow"
//                   aria-label="Send"
//                 >
//                   <SendIcon />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right: live agent panel */}
//       <aside className="w-80 shrink-0 border-l border-black/[0.06] bg-white/50 backdrop-blur-xl flex flex-col hidden lg:flex">
//         <div className="p-5 border-b border-black/[0.06]">
//           <h2 className="font-[Space_Grotesk,sans-serif] font-semibold text-sm">Agent roster</h2>
//           <p className="text-[11px] text-black/35 mt-0.5">Live status</p>
//         </div>

//         <div className="p-4 space-y-2.5">
//           {AGENTS.map((a) => (
//             <div
//               key={a.id}
//               className="rounded-xl border border-black/[0.06] bg-white p-3.5 flex items-center gap-3"
//             >
//               <span
//                 className="w-2 h-2 rounded-full shrink-0"
//                 style={{
//                   background: a.color,
//                   animation: activeAgent === a.id ? "pulse-dot 1s ease-in-out infinite" : "none",
//                   opacity: activeAgent === a.id ? 1 : 0.35,
//                 }}
//               />
//               <div className="min-w-0">
//                 <p className="text-sm font-medium truncate">{a.label}</p>
//                 <p className="text-[11px] text-black/40 truncate">{a.role}</p>
//               </div>
//               <span className="ml-auto text-[10px] font-[Space_Grotesk,sans-serif] shrink-0" style={{ color: activeAgent === a.id ? a.color : "#00000040" }}>
//                 {activeAgent === a.id ? "active" : "idle"}
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="px-5 pt-2">
//           <h3 className="text-[10px] font-[Space_Grotesk,sans-serif] font-semibold uppercase tracking-widest text-black/30 mb-3">
//             Activity
//           </h3>
//         </div>
//         <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-3">
//           {activityLog.length === 0 ? (
//             <p className="text-[12px] text-black/30">No activity yet — send a task to see agents at work.</p>
//           ) : (
//             activityLog.map((e) => (
//               <div key={e.id} className="flex gap-2.5 msg-in">
//                 <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: e.agent.color }} />
//                 <div className="min-w-0">
//                   <p className="text-[12px] text-black/70">
//                     <span className="font-medium" style={{ color: e.agent.color }}>{e.agent.label}</span> — {e.text}
//                   </p>
//                   <p className="text-[10px] text-black/30">{e.time}</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </aside>
//     </div>
//   );
// }

// function EmptyState({ onSuggest }) {
//   return (
//     <div className="h-full flex flex-col items-center justify-center px-6">
//       <div className="relative w-32 h-32 mb-8">
//         <div className="absolute inset-0 rounded-full border border-black/[0.07]" />
//         <div className="absolute inset-3 rounded-full border border-black/[0.05]" />
//         <div
//           className="absolute inset-[36%] rounded-full bg-gradient-to-br from-[#6E6FEA] to-[#4FD1C5]"
//           style={{ boxShadow: "0 0 40px 6px rgba(110,111,234,0.25)" }}
//         />
//         {AGENTS.map((a, i) => {
//           const angle = (i / AGENTS.length) * 2 * Math.PI - Math.PI / 2;
//           const r = 58;
//           return (
//             <span
//               key={a.id}
//               className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
//               style={{
//                 background: a.color,
//                 transform: `translate(${Math.cos(angle) * r}px, ${Math.sin(angle) * r}px)`,
//               }}
//             />
//           );
//         })}
//       </div>

//       <h1 className="font-[Space_Grotesk,sans-serif] text-2xl font-semibold text-center">
//         Your agents are standing by.
//       </h1>
//       <p className="text-black/40 text-sm mt-2 text-center max-w-sm">
//         Describe an outcome — Vortex will route it to the right agent automatically.
//       </p>

//       <div className="flex flex-wrap gap-2.5 justify-center mt-8 max-w-lg">
//         {SUGGESTIONS.map((s) => (
//           <button
//             key={s}
//             onClick={() => onSuggest(s)}
//             className="text-sm text-black/60 rounded-full border border-black/10 bg-white px-4 py-2 hover:border-[#6E6FEA]/40 hover:text-black transition-colors"
//           >
//             {s}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MessageBubble({ message }) {
//   if (message.role === "user") {
//     return (
//       <div className="msg-in flex justify-end">
//         <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-[#1C1B1F] text-white text-sm px-4 py-3">
//           {message.content}
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="msg-in flex justify-start">
//       <div className="max-w-[75%]">
//         <div className="flex items-center gap-2 mb-1.5">
//           <span className="w-1.5 h-1.5 rounded-full" style={{ background: message.agent.color }} />
//           <span className="text-[11px] font-[Space_Grotesk,sans-serif] font-medium" style={{ color: message.agent.color }}>
//             {message.agent.label}
//           </span>
//         </div>
//         <div className="rounded-2xl rounded-tl-sm border border-black/[0.07] bg-white text-sm px-4 py-3 text-black/80 shadow-[0_2px_10px_rgba(28,27,31,0.04)]">
//           {message.content}
//         </div>
//       </div>
//     </div>
//   );
// }

// function ThinkingBubble({ agentId }) {
//   const agent = AGENTS.find((a) => a.id === agentId) ?? AGENTS[0];
//   return (
//     <div className="msg-in flex justify-start">
//       <div className="max-w-[75%]">
//         <div className="flex items-center gap-2 mb-1.5">
//           <span className="w-1.5 h-1.5 rounded-full" style={{ background: agent.color, animation: "pulse-dot 1s ease-in-out infinite" }} />
//           <span className="text-[11px] font-[Space_Grotesk,sans-serif] font-medium" style={{ color: agent.color }}>
//             {agent.label} · working
//           </span>
//         </div>
//         <div className="rounded-2xl rounded-tl-sm border border-black/[0.07] bg-white px-4 py-3.5 flex gap-1.5 shadow-[0_2px_10px_rgba(28,27,31,0.04)]">
//           {[0, 1, 2].map((i) => (
//             <span
//               key={i}
//               className="w-1.5 h-1.5 rounded-full bg-black/25"
//               style={{ animation: `pulse-dot 1s ease-in-out ${i * 0.15}s infinite` }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function RailIcon({ children, label, active }) {
//   return (
//     <button
//       title={label}
//       className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
//         active ? "bg-[#6E6FEA]/10 text-[#6E6FEA]" : "text-black/35 hover:bg-black/[0.04] hover:text-black/70"
//       }`}
//     >
//       {children}
//     </button>
//   );
// }

// /* Icons */
// function PlusIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>; }
// function ChatIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>; }
// function AgentsIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M9.5 9.5L6.5 6.5M14.5 9.5l3-3M9.5 14.5l-3 3M14.5 14.5l3 3"/></svg>; }
// function FilesIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>; }
// function HistoryIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/></svg>; }
// function SettingsIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>; }
// function AttachIcon() { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.19 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>; }
// function MicIcon() { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 19v3"/></svg>; }
// function SendIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>; }

// export default Dashboard;









import React, { useState, useRef, useEffect } from "react";

const AGENTS = [
  { id: "researcher", label: "RESEARCHER", color: "#1E7A56", role: "gathers context" },
  { id: "planner", label: "PLANNER", color: "#C48A34", role: "breaks down tasks" },
  { id: "coder", label: "CODER", color: "#34506B", role: "writes & tests" },
  { id: "reviewer", label: "REVIEWER", color: "#B3503F", role: "checks output" },
];

const MODES = [
  { id: "auto", label: "Auto" },
  { id: "chat", label: "Chat" },
  { id: "coding", label: "Coding" },
  { id: "pdf", label: "PDF" },
  { id: "ppt", label: "PPT" },
  { id: "image", label: "Image" },
  { id: "search", label: "Search" },
];

const SUGGESTIONS = [
  "Build a REST API with auth",
  "Plan a RAG pipeline",
  "Debug this stack trace",
];

const RECENT_SESSIONS = [
  { id: 1, title: "Build a LangGraph agent", agent: "coder", time: "2h ago" },
  { id: 2, title: "Summarize Q3 research", agent: "researcher", time: "1d ago" },
  { id: 3, title: "Plan sprint breakdown", agent: "planner", time: "2d ago" },
];

/* ---------- shared engineering-theme primitives (match Login.jsx) ---------- */

function TypeLine({ text, startDelay = 0, speed = 26, className = "", cursor = true }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let interval;
    setCount(0);
    const timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, startDelay, speed]);
  return (
    <span className={className}>
      {text.slice(0, count)}
      {cursor && (
        <span className="inline-block w-[6px] h-[11px] bg-current ml-0.5 align-middle motion-safe:animate-[blink_0.9s_step-end_infinite]" />
      )}
    </span>
  );
}

function BinaryTicker({ className = "", bits = 6, interval = 700 }) {
  const [val, setVal] = useState(() =>
    Array.from({ length: bits }, () => (Math.random() > 0.5 ? 1 : 0)).join(""),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setVal(Array.from({ length: bits }, () => (Math.random() > 0.5 ? 1 : 0)).join(""));
    }, interval);
    return () => clearInterval(id);
  }, [bits, interval]);
  return <span className={className}>{val}</span>;
}

function hexId() {
  return Array.from(
    { length: 8 },
    () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)],
  ).join("");
}

function BinaryColumn({ className }) {
  const [rows, setRows] = useState(() =>
    Array.from({ length: 24 }, () =>
      Array.from({ length: 6 }, () => (Math.random() > 0.5 ? 1 : 0)).join(""),
    ),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) => {
        const next = [...prev];
        const i = Math.floor(Math.random() * next.length);
        next[i] = Array.from({ length: 6 }, () => (Math.random() > 0.5 ? 1 : 0)).join("");
        return next;
      });
    }, 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      aria-hidden="true"
      className={`font-mono text-[10px] leading-[1.7] text-[#14151A] select-none pointer-events-none ${className}`}
    >
      {rows.map((r, i) => (
        <div key={i}>{r}</div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------- */

function Dashboard() {
  const [mode, setMode] = useState("auto");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeAgent, setActiveAgent] = useState(null);
  const [thinking, setThinking] = useState(false);
  const [activityLog, setActivityLog] = useState([]);
  const [clock, setClock] = useState("");
  const [ids, setIds] = useState(() => AGENTS.map(() => hexId()));
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    tick();
    const clockId = setInterval(tick, 1000);
    const idId = setInterval(() => {
      setIds((prev) => {
        const next = [...prev];
        const i = Math.floor(Math.random() * next.length);
        next[i] = hexId();
        return next;
      });
    }, 1600);
    return () => {
      clearInterval(clockId);
      clearInterval(idId);
    };
  }, []);

  const send = (text) => {
    const content = (text ?? input).trim();
    if (!content) return;

    const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)];
    setMessages((m) => [...m, { role: "user", content }]);
    setInput("");
    setThinking(true);
    setActiveAgent(agent.id);
    setActivityLog((log) =>
      [{ id: Date.now(), agent, text: `received task`, time: "now" }, ...log].slice(0, 6),
    );

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "agent", agent, content: `Routed "${content}" to ${agent.label.toLowerCase()} — task complete.` },
      ]);
      setActivityLog((log) =>
        [{ id: Date.now() + 1, agent, text: `completed task`, time: "now" }, ...log].slice(0, 6),
      );
      setThinking(false);
      setActiveAgent(null);
    }, 1400);
  };

  return (
    <div className="h-screen flex bg-[#F7F6F2] text-[#14151A] font-[Inter,sans-serif] antialiased overflow-hidden">
      {/* Faint engineering grid, same as login */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(rgba(20,21,26,0.09) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
        @keyframes eq {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(18px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sheen {
          0% { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(220%) skewX(-12deg); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(30,122,86,0.25); }
          50% { opacity: 0.5; transform: scale(1.25); box-shadow: 0 0 0 4px rgba(30,122,86,0); }
        }
        .glass-panel {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .glass-row { transition: background 0.35s ease, transform 0.35s ease; }
        .glass-row:hover { background: rgba(255,255,255,0.5); transform: translateX(2px); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Icon rail */}
      <aside className="w-16 shrink-0 border-r border-black/[0.07] bg-white/50 backdrop-blur-xl flex flex-col items-center py-5 gap-6 z-10">
        <div className="w-9 h-9 rounded-md bg-[#14151A] flex items-center justify-center relative overflow-hidden">
          <span className="text-white text-xs font-[Space_Grotesk,sans-serif] font-bold">V</span>
          <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#1E7A56] motion-safe:animate-[blink_2.2s_ease-in-out_infinite] ring-2 ring-white" />
        </div>
        <nav className="flex flex-col items-center gap-1 mt-4">
          <RailIcon active label="Sessions"><ChatIcon /></RailIcon>
          <RailIcon label="Agents"><AgentsIcon /></RailIcon>
          <RailIcon label="Files"><FilesIcon /></RailIcon>
          <RailIcon label="History"><HistoryIcon /></RailIcon>
        </nav>
        <div className="mt-auto flex flex-col items-center gap-3">
          <RailIcon label="Settings"><SettingsIcon /></RailIcon>
          <div className="w-8 h-8 rounded-full bg-[#14151A] flex items-center justify-center text-white text-[10px] font-[IBM_Plex_Mono,monospace]">
            0x
          </div>
        </div>
      </aside>

      {/* Sessions panel */}
      <aside className="w-64 shrink-0 border-r border-black/[0.07] bg-white/35 backdrop-blur-xl flex flex-col z-10">
        <div className="p-4">
          <button
            onClick={() => {
              setMessages([]);
              setInput("");
            }}
            className="w-full flex items-center justify-center gap-2 rounded-md bg-[#14151A] text-white text-sm font-medium py-2.5 transition-colors duration-300 hover:bg-[#1E7A56]"
          >
            <PlusIcon /> New session
          </button>
        </div>
        <div className="px-4 flex-1 overflow-y-auto">
          <p className="text-[10px] font-[IBM_Plex_Mono,monospace] font-medium uppercase tracking-widest text-black/30 mb-2 mt-2">
            recent
          </p>
          <div className="space-y-1">
            {RECENT_SESSIONS.map((s) => {
              const agent = AGENTS.find((a) => a.id === s.agent);
              return (
                <button
                  key={s.id}
                  className="w-full text-left rounded-md px-3 py-2.5 glass-row hover:bg-white/60 transition-colors group"
                >
                  <p className="text-sm text-black/80 truncate group-hover:text-black">{s.title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1 h-1 rounded-full" style={{ background: agent.color }} />
                    <span className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/35">
                      {agent.label.toLowerCase()} · {s.time}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="p-4 border-t border-black/[0.07]">
          <div className="rounded-md border border-black/[0.07] bg-white/70 p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-black/60">Free plan</span>
              <span className="text-[10px] font-[IBM_Plex_Mono,monospace] text-[#1E7A56] tabular-nums">
                12/100
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-black/[0.06] overflow-hidden">
              <div className="h-full w-[12%] rounded-full bg-[#1E7A56]" />
            </div>
            <button className="w-full text-xs font-medium rounded-md bg-[#14151A] text-white py-2 mt-3 transition-colors duration-300 hover:bg-[#1E7A56]">
              Upgrade
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <BinaryColumn className="hidden 2xl:block fixed top-24 left-[19rem] opacity-[0.045] -z-10" />

        <div className="h-14 border-b border-black/[0.07] flex items-center gap-4 px-6 bg-white/35 backdrop-blur-xl z-10">
          <p className="text-sm font-medium">{messages.length ? "Active session" : "New session"}</p>
          <span className="w-1 h-1 rounded-full bg-black/20" />
          <span className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/35">
            {messages.length} messages
          </span>
          <span className="ml-auto text-[11px] font-[IBM_Plex_Mono,monospace] text-black/30 tabular-nums hidden sm:inline">
            {clock}
          </span>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <EmptyState onSuggest={send} />
          ) : (
            <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
              {messages.map((m, i) => (
                <MessageBubble key={i} message={m} />
              ))}
              {thinking && <ThinkingBubble agentId={activeAgent} />}
            </div>
          )}
        </div>

        <div className="p-5 border-t border-black/[0.07] bg-white/25 backdrop-blur-xl z-10">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`shrink-0 text-xs font-[IBM_Plex_Mono,monospace] font-medium rounded-md px-3.5 py-1.5 border transition-colors ${
                    mode === m.id
                      ? "bg-[#14151A] border-transparent text-white"
                      : "border-black/15 text-black/45 hover:text-black hover:border-black/30"
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
                    send();
                  }
                }}
                placeholder="Tell your agents what to do…"
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
                  onClick={() => send()}
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
      </div>

      {/* Right: live agent panel — glassmorphic monitor, same signature as login hero */}
      <aside className="w-80 shrink-0 border-l border-black/[0.07] hidden lg:flex flex-col relative z-10">
        <div
          aria-hidden="true"
          className="absolute -inset-10 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 30% 10%, rgba(30,122,86,0.14), transparent 55%), radial-gradient(circle at 80% 90%, rgba(196,138,52,0.12), transparent 55%)",
            filter: "blur(40px)",
          }}
        />
        <div className="glass-panel h-full flex flex-col border-l border-white/70">
          <div className="relative flex items-center justify-between px-4 py-3.5 border-b border-white/50 bg-white/25 overflow-hidden">
            <div className="flex items-center gap-2 font-[IBM_Plex_Mono,monospace] text-xs text-black/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A56] motion-safe:animate-[blink_1.6s_ease-in-out_infinite]" />
              AGENT_ROSTER · LIVE
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent motion-safe:animate-[sheen_6s_ease-in-out_infinite]" />
            </div>
          </div>

          <div>
            {AGENTS.map((a, i) => {
              const isActive = activeAgent === a.id;
              return (
                <div
                  key={a.id}
                  className={`glass-row px-4 py-3.5 flex items-center gap-3 ${
                    i !== AGENTS.length - 1 ? "border-b border-white/40" : ""
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background: a.color,
                      opacity: isActive ? 1 : 0.3,
                      animation: isActive ? "pulseDot 1s ease-in-out infinite" : "none",
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <p className="font-[IBM_Plex_Mono,monospace] text-[12.5px] font-medium tracking-tight">
                        {a.label}
                      </p>
                      <span
                        className="font-[IBM_Plex_Mono,monospace] text-[10px]"
                        style={{ color: isActive ? a.color : "rgba(20,21,26,0.35)" }}
                      >
                        {isActive ? "ACTIVE" : "IDLE"}
                      </span>
                    </div>
                    <p className="text-black/40 text-[12.5px] truncate mt-0.5">{a.role}</p>
                  </div>

                  <div className="hidden sm:flex items-end gap-[3px] h-4 shrink-0">
                    {[0, 1, 2, 3].map((b) => (
                      <span
                        key={b}
                        className="w-[3px] h-full rounded-full origin-bottom"
                        style={{
                          background: isActive ? a.color : "#14151A22",
                          animation: isActive
                            ? `eq ${0.9 + b * 0.15}s ease-in-out infinite`
                            : "none",
                        }}
                      />
                    ))}
                  </div>

                  <span className="hidden sm:inline font-[IBM_Plex_Mono,monospace] text-[11px] text-black/30 tabular-nums w-16 text-right shrink-0">
                    0x{ids[i]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <h3 className="text-[10px] font-[IBM_Plex_Mono,monospace] font-medium uppercase tracking-widest text-black/30">
              activity
            </h3>
            <BinaryTicker className="font-[IBM_Plex_Mono,monospace] text-[10px] text-black/25 tabular-nums" />
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
            {activityLog.length === 0 ? (
              <p className="text-[12px] text-black/30 font-[IBM_Plex_Mono,monospace]">
                no activity yet — send a task to see agents at work.
              </p>
            ) : (
              activityLog.map((e) => (
                <div key={e.id} className="flex gap-2.5 motion-safe:animate-[fadeUp_0.4s_ease-out_both]">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ background: e.agent.color }}
                  />
                  <div className="min-w-0">
                    <p className="text-[12px] text-black/70">
                      <span
                        className="font-[IBM_Plex_Mono,monospace] font-medium"
                        style={{ color: e.agent.color }}
                      >
                        {e.agent.label}
                      </span>{" "}
                      — {e.text}
                    </p>
                    <p className="text-[10px] font-[IBM_Plex_Mono,monospace] text-black/30">{e.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="px-4 py-2.5 border-t border-white/50 bg-white/25 font-[IBM_Plex_Mono,monospace] text-[11px] text-black/35 flex items-center justify-between">
            <span>{AGENTS.length} processes · shared context bus</span>
            <span>core.vortex.ai</span>
          </div>
        </div>
      </aside>
    </div>
  );
}

function EmptyState({ onSuggest }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative">
      <BinaryColumn className="hidden xl:block absolute top-10 left-10 opacity-[0.05] -z-10" />
      <BinaryColumn className="hidden xl:block absolute top-10 right-10 opacity-[0.05] -z-10" />

      <span className="inline-flex items-center gap-2 text-[11px] font-[IBM_Plex_Mono,monospace] tracking-wide uppercase text-[#1E7A56] bg-[#1E7A56]/[0.06] border border-[#1E7A56]/20 rounded-md px-3 py-1.5 mb-8 motion-safe:animate-[fadeUp_0.5s_ease-out_both]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A56] motion-safe:animate-[blink_2.2s_ease-in-out_infinite]" />
        {AGENTS.length} agents standing by
      </span>

      <div className="relative w-32 h-32 mb-8 motion-safe:animate-[riseIn_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
        <div className="absolute inset-0 rounded-full border border-black/[0.09]" />
        <div className="absolute inset-3 rounded-full border border-black/[0.06]" />
        <div
          className="absolute inset-[36%] rounded-full bg-[#14151A] flex items-center justify-center"
          style={{ boxShadow: "0 0 40px 6px rgba(30,122,86,0.22)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A56] motion-safe:animate-[blink_2s_ease-in-out_infinite]" />
        </div>
        {AGENTS.map((a, i) => {
          const angle = (i / AGENTS.length) * 2 * Math.PI - Math.PI / 2;
          const r = 58;
          return (
            <span
              key={a.id}
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
              style={{
                background: a.color,
                transform: `translate(${Math.cos(angle) * r}px, ${Math.sin(angle) * r}px)`,
                animation: `blink ${2 + i * 0.3}s ease-in-out infinite`,
              }}
            />
          );
        })}
      </div>

      <h1 className="font-[Space_Grotesk,sans-serif] text-2xl font-semibold text-center">
        Your agents are standing by.
      </h1>
      <p className="text-black/45 text-sm mt-2 text-center max-w-sm">
        Describe an outcome — Vortex will route it to the right agent automatically.
      </p>

      <div className="inline-flex items-center gap-2 font-[IBM_Plex_Mono,monospace] text-xs text-black/45 bg-black/[0.025] border border-black/[0.08] rounded-md px-3 py-1.5 mt-6">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A56] motion-safe:animate-[blink_1.6s_ease-in-out_infinite]" />
        <TypeLine text="vortex init --session" startDelay={200} className="text-black/55" />
      </div>

      <div className="flex flex-wrap gap-2.5 justify-center mt-8 max-w-lg">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSuggest(s)}
            className="text-sm text-black/60 rounded-md border border-black/10 bg-white px-4 py-2 transition-colors hover:border-[#1E7A56]/40 hover:text-black"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ message }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
        <div className="max-w-[75%] rounded-lg rounded-tr-sm bg-[#14151A] text-white text-sm px-4 py-3">
          {message.content}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
      <div className="max-w-[75%]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: message.agent.color }} />
          <span
            className="text-[11px] font-[IBM_Plex_Mono,monospace] font-medium"
            style={{ color: message.agent.color }}
          >
            {message.agent.label}
          </span>
          <span className="text-[10px] font-[IBM_Plex_Mono,monospace] text-black/25">
            0x{hexId()}
          </span>
        </div>
        <div className="rounded-lg rounded-tl-sm border border-black/[0.07] bg-white text-sm px-4 py-3 text-black/80 shadow-[0_2px_10px_rgba(20,21,26,0.04)]">
          {message.content}
        </div>
      </div>
    </div>
  );
}

function ThinkingBubble({ agentId }) {
  const agent = AGENTS.find((a) => a.id === agentId) ?? AGENTS[0];
  return (
    <div className="flex justify-start motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
      <div className="max-w-[75%]">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: agent.color, animation: "pulseDot 1s ease-in-out infinite" }}
          />
          <span
            className="text-[11px] font-[IBM_Plex_Mono,monospace] font-medium"
            style={{ color: agent.color }}
          >
            {agent.label} · working
          </span>
        </div>
        <div className="rounded-lg rounded-tl-sm border border-black/[0.07] bg-white px-4 py-3.5 flex items-center gap-3 shadow-[0_2px_10px_rgba(20,21,26,0.04)]">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-black/25"
                style={{ animation: `pulseDot 1s ease-in-out ${i * 0.15}s infinite` }}
              />
            ))}
          </div>
          <BinaryTicker className="font-[IBM_Plex_Mono,monospace] text-[10px] text-black/25 tabular-nums" bits={5} interval={450} />
        </div>
      </div>
    </div>
  );
}

function RailIcon({ children, label, active }) {
  return (
    <button
      title={label}
      className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
        active ? "bg-[#1E7A56]/10 text-[#1E7A56]" : "text-black/35 hover:bg-black/[0.04] hover:text-black/70"
      }`}
    >
      {children}
    </button>
  );
}

/* Icons */
function PlusIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>; }
function ChatIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>; }
function AgentsIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M9.5 9.5L6.5 6.5M14.5 9.5l3-3M9.5 14.5l-3 3M14.5 14.5l3 3"/></svg>; }
function FilesIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>; }
function HistoryIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l4 2"/></svg>; }
function SettingsIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>; }
function AttachIcon() { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.19 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>; }
function MicIcon() { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 19v3"/></svg>; }
function SendIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>; }

export default Dashboard;