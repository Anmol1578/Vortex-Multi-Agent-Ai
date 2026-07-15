// import React, { useState, useRef, useEffect } from "react";

// const AGENTS = [
//   { id: "researcher", label: "RESEARCHER", code: "RE", color: "#1E7A56", role: "gathers context" },
//   { id: "coder", label: "CODER", code: "CO", color: "#34506B", role: "writes & tests" },
//   { id: "reviewer", label: "REVIEWER", code: "RV", color: "#B3503F", role: "checks output" },
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
//   { id: 3, title: "Review PR #482", agent: "reviewer", time: "2d ago" },
// ];

// /* ---------- shared engineering-theme primitives (match Login.jsx) ---------- */

// function TypeLine({ text, startDelay = 0, speed = 26, className = "", cursor = true }) {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     let interval;
//     setCount(0);
//     const timeout = setTimeout(() => {
//       let i = 0;
//       interval = setInterval(() => {
//         i += 1;
//         setCount(i);
//         if (i >= text.length) clearInterval(interval);
//       }, speed);
//     }, startDelay);
//     return () => {
//       clearTimeout(timeout);
//       clearInterval(interval);
//     };
//   }, [text, startDelay, speed]);
//   return (
//     <span className={className}>
//       {text.slice(0, count)}
//       {cursor && (
//         <span className="inline-block w-[6px] h-[11px] bg-current ml-0.5 align-middle motion-safe:animate-[blink_0.9s_step-end_infinite]" />
//       )}
//     </span>
//   );
// }

// function BinaryTicker({ className = "", bits = 6, interval = 700 }) {
//   const [val, setVal] = useState(() =>
//     Array.from({ length: bits }, () => (Math.random() > 0.5 ? 1 : 0)).join(""),
//   );
//   useEffect(() => {
//     const id = setInterval(() => {
//       setVal(Array.from({ length: bits }, () => (Math.random() > 0.5 ? 1 : 0)).join(""));
//     }, interval);
//     return () => clearInterval(id);
//   }, [bits, interval]);
//   return <span className={className}>{val}</span>;
// }

// function hexId() {
//   return Array.from(
//     { length: 8 },
//     () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)],
//   ).join("");
// }

// function BinaryColumn({ className }) {
//   const [rows, setRows] = useState(() =>
//     Array.from({ length: 24 }, () =>
//       Array.from({ length: 6 }, () => (Math.random() > 0.5 ? 1 : 0)).join(""),
//     ),
//   );
//   useEffect(() => {
//     const id = setInterval(() => {
//       setRows((prev) => {
//         const next = [...prev];
//         const i = Math.floor(Math.random() * next.length);
//         next[i] = Array.from({ length: 6 }, () => (Math.random() > 0.5 ? 1 : 0)).join("");
//         return next;
//       });
//     }, 900);
//     return () => clearInterval(id);
//   }, []);
//   return (
//     <div
//       aria-hidden="true"
//       className={`font-mono text-[10px] leading-[1.7] text-[#14151A] select-none pointer-events-none ${className}`}
//     >
//       {rows.map((r, i) => (
//         <div key={i}>{r}</div>
//       ))}
//     </div>
//   );
// }

// function BrandMark({ size = "text-lg" }) {
//   return (
//     <span className={`font-[Space_Grotesk,sans-serif] ${size} font-semibold tracking-tight flex items-center gap-2 shrink-0`}>
//       <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A56] motion-safe:animate-[blink_2.2s_ease-in-out_infinite]" />
//       VORTEX
//       <span className="text-black/35 font-mono text-xs font-normal tracking-normal">/ai</span>
//     </span>
//   );
// }

// /* ---------- agent checkpoint pipeline — the signature center animation ---------- */

// function CheckpointPipeline() {
//   return (
//     <div className="relative w-full max-w-md mx-auto motion-safe:animate-[riseIn_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
//       <svg viewBox="0 0 480 170" className="w-full h-auto overflow-visible">
//         <defs>
//           <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#1E7A56" />
//             <stop offset="50%" stopColor="#34506B" />
//             <stop offset="100%" stopColor="#B3503F" />
//           </linearGradient>
//           <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
//             <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
//             <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
//           </radialGradient>
//         </defs>

//         {/* static structural line */}
//         <line x1="70" y1="70" x2="410" y2="70" stroke="#14151A" strokeOpacity="0.08" strokeWidth="1.5" />

//         {/* animated data-flow line */}
//         <path
//           d="M70,70 L410,70"
//           fill="none"
//           stroke="url(#flowGradient)"
//           strokeWidth="1.5"
//           strokeDasharray="5 7"
//           strokeOpacity="0.55"
//         >
//           <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="2.4s" repeatCount="indefinite" />
//         </path>

//         {/* traveling checkpoint packet */}
//         <g>
//           <animateMotion
//             path="M70,70 L410,70"
//             keyPoints="0;0;0.5;0.5;1;1"
//             keyTimes="0;0.18;0.36;0.54;0.72;1"
//             dur="6s"
//             repeatCount="indefinite"
//             calcMode="linear"
//           />
//           <circle r="16" fill="url(#pulseGlow)" />
//           <circle r="4.5" fill="#14151A" />
//         </g>

//         {/* checkpoint nodes */}
//         {AGENTS.map((a, i) => {
//           const x = 70 + i * 170;
//           return (
//             <g key={a.id} className={`checkpoint-node checkpoint-node-${i}`} style={{ transformOrigin: `${x}px 70px` }}>
//               <circle cx={x} cy="70" r="26" fill="rgba(255,255,255,0.7)" stroke={a.color} strokeWidth="1.5" />
//               <circle cx={x} cy="70" r="26" fill="none" stroke={a.color} strokeWidth="1.5" className={`checkpoint-ring checkpoint-ring-${i}`} />
//               <text
//                 x={x}
//                 y="75"
//                 textAnchor="middle"
//                 fill={a.color}
//                 fontSize="12"
//                 fontWeight="600"
//                 style={{ fontFamily: "IBM Plex Mono, monospace" }}
//               >
//                 {a.code}
//               </text>
//               <text
//                 x={x}
//                 y="118"
//                 textAnchor="middle"
//                 fill="#14151A"
//                 fillOpacity="0.4"
//                 fontSize="10.5"
//                 letterSpacing="0.5"
//                 style={{ fontFamily: "IBM Plex Mono, monospace" }}
//               >
//                 {a.label}
//               </text>
//             </g>
//           );
//         })}
//       </svg>

//       {/* cycling stage badge */}
//       <div className="flex justify-center mt-2">
//         <div className="relative h-6 font-[IBM_Plex_Mono,monospace] text-[11px] tracking-wide">
//           {AGENTS.map((a, i) => (
//             <span
//               key={a.id}
//               className={`absolute inset-0 flex items-center justify-center whitespace-nowrap stage-label stage-label-${i}`}
//               style={{ color: a.color }}
//             >
//               stage: {a.label.toLowerCase()}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------------------------------------------------------------------- */

// function Dashboard() {
//   const [mode, setMode] = useState("auto");
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [activeAgent, setActiveAgent] = useState(null);
//   const [thinking, setThinking] = useState(false);
//   const [activityLog, setActivityLog] = useState([]);
//   const [clock, setClock] = useState("");
//   const [ids, setIds] = useState(() => AGENTS.map(() => hexId()));
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
//   }, [messages, thinking]);

//   useEffect(() => {
//     const tick = () =>
//       setClock(
//         new Date().toLocaleTimeString("en-US", {
//           hour12: false,
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//         }),
//       );
//     tick();
//     const clockId = setInterval(tick, 1000);
//     const idId = setInterval(() => {
//       setIds((prev) => {
//         const next = [...prev];
//         const i = Math.floor(Math.random() * next.length);
//         next[i] = hexId();
//         return next;
//       });
//     }, 1600);
//     return () => {
//       clearInterval(clockId);
//       clearInterval(idId);
//     };
//   }, []);

//   const send = (text) => {
//     const content = (text ?? input).trim();
//     if (!content) return;

//     const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)];
//     setMessages((m) => [...m, { role: "user", content }]);
//     setInput("");
//     setThinking(true);
//     setActiveAgent(agent.id);
//     setActivityLog((log) =>
//       [{ id: Date.now(), agent, text: `received task`, time: "now" }, ...log].slice(0, 6),
//     );

//     setTimeout(() => {
//       setMessages((m) => [
//         ...m,
//         { role: "agent", agent, content: `Routed "${content}" to ${agent.label.toLowerCase()} — task complete.` },
//       ]);
//       setActivityLog((log) =>
//         [{ id: Date.now() + 1, agent, text: `completed task`, time: "now" }, ...log].slice(0, 6),
//       );
//       setThinking(false);
//       setActiveAgent(null);
//     }, 1400);
//   };

//   return (
//     <div className="h-screen flex bg-[#F7F6F2] text-[#14151A] font-[Inter,sans-serif] antialiased overflow-hidden">
//       {/* Faint engineering grid, same as login */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none fixed inset-0 -z-10 opacity-[0.4]"
//         style={{
//           backgroundImage: "radial-gradient(rgba(20,21,26,0.09) 1px, transparent 1px)",
//           backgroundSize: "26px 26px",
//         }}
//       />

//       <style>{`
//         @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
//         @keyframes eq {
//           0%, 100% { transform: scaleY(0.3); }
//           50% { transform: scaleY(1); }
//         }
//         @keyframes riseIn {
//           from { opacity: 0; transform: translateY(18px) scale(0.985); }
//           to   { opacity: 1; transform: translateY(0) scale(1); }
//         }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(10px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes sheen {
//           0% { transform: translateX(-120%) skewX(-12deg); }
//           100% { transform: translateX(220%) skewX(-12deg); }
//         }
//         @keyframes pulseDot {
//           0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(30,122,86,0.25); }
//           50% { opacity: 0.5; transform: scale(1.25); box-shadow: 0 0 0 4px rgba(30,122,86,0); }
//         }
//         .glass-panel {
//           background: rgba(255,255,255,0.55);
//           backdrop-filter: blur(24px);
//           -webkit-backdrop-filter: blur(24px);
//         }
//         .glass-row { transition: background 0.35s ease, transform 0.35s ease; }
//         .glass-row:hover { background: rgba(255,255,255,0.5); transform: translateX(2px); }
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

//         /* checkpoint pipeline node pulses — timed to match the packet's arrival */
//         @keyframes ringPulse {
//           0% { r: 26; stroke-opacity: 0.9; stroke-width: 1.5; }
//           10% { r: 34; stroke-opacity: 0; stroke-width: 3; }
//           100% { r: 34; stroke-opacity: 0; stroke-width: 3; }
//         }
//         .checkpoint-ring { animation: ringPulse 6s ease-out infinite; }
//         .checkpoint-ring-0 { animation-delay: 0s; }
//         .checkpoint-ring-1 { animation-delay: 2.16s; }
//         .checkpoint-ring-2 { animation-delay: 4.32s; }

//         @keyframes nodeScale {
//           0% { transform: scale(1); }
//           8% { transform: scale(1.12); }
//           20% { transform: scale(1); }
//           100% { transform: scale(1); }
//         }
//         .checkpoint-node { animation: nodeScale 6s ease-out infinite; }
//         .checkpoint-node-0 { animation-delay: 0s; }
//         .checkpoint-node-1 { animation-delay: 2.16s; }
//         .checkpoint-node-2 { animation-delay: 4.32s; }

//         @keyframes stageFade0 {
//           0%, 15% { opacity: 1; }
//           20%, 100% { opacity: 0; }
//         }
//         @keyframes stageFade1 {
//           0%, 33% { opacity: 0; }
//           38%, 51% { opacity: 1; }
//           56%, 100% { opacity: 0; }
//         }
//         @keyframes stageFade2 {
//           0%, 69% { opacity: 0; }
//           74%, 100% { opacity: 1; }
//         }
//         .stage-label-0 { animation: stageFade0 6s ease-in-out infinite; }
//         .stage-label-1 { animation: stageFade1 6s ease-in-out infinite; }
//         .stage-label-2 { animation: stageFade2 6s ease-in-out infinite; }
//       `}</style>

//       {/* Icon rail */}
//       <aside className="w-16 shrink-0 border-r border-black/[0.07] bg-white/50 backdrop-blur-xl flex flex-col items-center py-5 gap-6 z-10">
//         <div className="w-9 h-9 rounded-md bg-[#14151A] flex items-center justify-center relative overflow-hidden">
//           <span className="text-white text-xs font-[Space_Grotesk,sans-serif] font-bold">V</span>
//           <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#1E7A56] motion-safe:animate-[blink_2.2s_ease-in-out_infinite] ring-2 ring-white" />
//         </div>
//         <nav className="flex flex-col items-center gap-1 mt-4">
//           <RailIcon active label="Sessions"><ChatIcon /></RailIcon>
//           <RailIcon label="Agents"><AgentsIcon /></RailIcon>
//           <RailIcon label="Files"><FilesIcon /></RailIcon>
//           <RailIcon label="History"><HistoryIcon /></RailIcon>
//         </nav>
//         <div className="mt-auto flex flex-col items-center gap-3">
//           <RailIcon label="Settings"><SettingsIcon /></RailIcon>
//           <div className="w-8 h-8 rounded-full bg-[#14151A] flex items-center justify-center text-white text-[10px] font-[IBM_Plex_Mono,monospace]">
//             0x
//           </div>
//         </div>
//       </aside>

//       {/* Sessions panel */}
//       <aside className="w-64 shrink-0 border-r border-black/[0.07] bg-white/35 backdrop-blur-xl flex flex-col z-10">
//         <div className="p-4">
//           <button
//             onClick={() => {
//               setMessages([]);
//               setInput("");
//             }}
//             className="w-full flex items-center justify-center gap-2 rounded-md bg-[#14151A] text-white text-sm font-medium py-2.5 transition-colors duration-300 hover:bg-[#1E7A56]"
//           >
//             <PlusIcon /> New session
//           </button>
//         </div>
//         <div className="px-4 flex-1 overflow-y-auto">
//           <p className="text-[10px] font-[IBM_Plex_Mono,monospace] font-medium uppercase tracking-widest text-black/30 mb-2 mt-2">
//             recent
//           </p>
//           <div className="space-y-1">
//             {RECENT_SESSIONS.map((s) => {
//               const agent = AGENTS.find((a) => a.id === s.agent);
//               return (
//                 <button
//                   key={s.id}
//                   className="w-full text-left rounded-md px-3 py-2.5 glass-row hover:bg-white/60 transition-colors group"
//                 >
//                   <p className="text-sm text-black/80 truncate group-hover:text-black">{s.title}</p>
//                   <div className="flex items-center gap-1.5 mt-1">
//                     <span className="w-1 h-1 rounded-full" style={{ background: agent.color }} />
//                     <span className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/35">
//                       {agent.label.toLowerCase()} · {s.time}
//                     </span>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//         <div className="p-4 border-t border-black/[0.07]">
//           <div className="rounded-md border border-black/[0.07] bg-white/70 p-3.5">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-xs font-medium text-black/60">Free plan</span>
//               <span className="text-[10px] font-[IBM_Plex_Mono,monospace] text-[#1E7A56] tabular-nums">
//                 12/100
//               </span>
//             </div>
//             <div className="h-1.5 rounded-full bg-black/[0.06] overflow-hidden">
//               <div className="h-full w-[12%] rounded-full bg-[#1E7A56]" />
//             </div>
//             <button className="w-full text-xs font-medium rounded-md bg-[#14151A] text-white py-2 mt-3 transition-colors duration-300 hover:bg-[#1E7A56]">
//               Upgrade
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="flex-1 flex flex-col min-w-0 relative">
//         <BinaryColumn className="hidden 2xl:block fixed top-24 left-[19rem] opacity-[0.045] -z-10" />

//         <div className="h-14 border-b border-black/[0.07] flex items-center gap-4 px-6 bg-white/35 backdrop-blur-xl z-10">
//           <BrandMark />
//           <span className="w-px h-4 bg-black/10" />
//           <p className="text-sm font-medium">{messages.length ? "Active session" : "New session"}</p>
//           <span className="w-1 h-1 rounded-full bg-black/20" />
//           <span className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/35">
//             {messages.length} messages
//           </span>
//           <span className="ml-auto text-[11px] font-[IBM_Plex_Mono,monospace] text-black/30 tabular-nums hidden sm:inline">
//             {clock}
//           </span>
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

//         <div className="p-5 border-t border-black/[0.07] bg-white/25 backdrop-blur-xl z-10">
//           <div className="max-w-2xl mx-auto">
//             <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar">
//               {MODES.map((m) => (
//                 <button
//                   key={m.id}
//                   onClick={() => setMode(m.id)}
//                   className={`shrink-0 text-xs font-[IBM_Plex_Mono,monospace] font-medium rounded-md px-3.5 py-1.5 border transition-colors ${
//                     mode === m.id
//                       ? "bg-[#14151A] border-transparent text-white"
//                       : "border-black/15 text-black/45 hover:text-black hover:border-black/30"
//                   }`}
//                 >
//                   {m.label}
//                 </button>
//               ))}
//             </div>

//             <div className="rounded-lg border border-black/[0.08] bg-white shadow-[0_4px_20px_rgba(20,21,26,0.05)] px-4 py-3 focus-within:border-[#1E7A56]/50 transition-colors">
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
//                   <button className="hover:text-[#1E7A56] transition-colors" aria-label="Attach file">
//                     <AttachIcon />
//                   </button>
//                   <button className="hover:text-[#1E7A56] transition-colors" aria-label="Voice input">
//                     <MicIcon />
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => send()}
//                   disabled={!input.trim()}
//                   className="rounded-md bg-[#14151A] p-2 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1E7A56] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(30,122,86,0.25)]"
//                   aria-label="Send"
//                 >
//                   <SendIcon />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right: live agent panel — glassmorphic monitor, same signature as login hero */}
//       <aside className="w-80 shrink-0 border-l border-black/[0.07] hidden lg:flex flex-col relative z-10">
//         <div
//           aria-hidden="true"
//           className="absolute -inset-10 -z-10 opacity-70"
//           style={{
//             background:
//               "radial-gradient(circle at 30% 10%, rgba(30,122,86,0.14), transparent 55%), radial-gradient(circle at 80% 90%, rgba(196,138,52,0.12), transparent 55%)",
//             filter: "blur(40px)",
//           }}
//         />
//         <div className="glass-panel h-full flex flex-col border-l border-white/70">
//           <div className="relative flex items-center justify-between px-4 py-3.5 border-b border-white/50 bg-white/25 overflow-hidden">
//             <div className="flex items-center gap-2 font-[IBM_Plex_Mono,monospace] text-xs text-black/50">
//               <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A56] motion-safe:animate-[blink_1.6s_ease-in-out_infinite]" />
//               AGENT_ROSTER · LIVE
//             </div>
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute inset-0 overflow-hidden"
//             >
//               <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent motion-safe:animate-[sheen_6s_ease-in-out_infinite]" />
//             </div>
//           </div>

//           <div>
//             {AGENTS.map((a, i) => {
//               const isActive = activeAgent === a.id;
//               return (
//                 <div
//                   key={a.id}
//                   className={`glass-row px-4 py-3.5 flex items-center gap-3 ${
//                     i !== AGENTS.length - 1 ? "border-b border-white/40" : ""
//                   }`}
//                 >
//                   <span
//                     className="w-1.5 h-1.5 rounded-full shrink-0"
//                     style={{
//                       background: a.color,
//                       opacity: isActive ? 1 : 0.3,
//                       animation: isActive ? "pulseDot 1s ease-in-out infinite" : "none",
//                     }}
//                   />
//                   <div className="min-w-0 flex-1">
//                     <div className="flex items-baseline gap-2">
//                       <p className="font-[IBM_Plex_Mono,monospace] text-[12.5px] font-medium tracking-tight">
//                         {a.label}
//                       </p>
//                       <span
//                         className="font-[IBM_Plex_Mono,monospace] text-[10px]"
//                         style={{ color: isActive ? a.color : "rgba(20,21,26,0.35)" }}
//                       >
//                         {isActive ? "ACTIVE" : "IDLE"}
//                       </span>
//                     </div>
//                     <p className="text-black/40 text-[12.5px] truncate mt-0.5">{a.role}</p>
//                   </div>

//                   <div className="hidden sm:flex items-end gap-[3px] h-4 shrink-0">
//                     {[0, 1, 2, 3].map((b) => (
//                       <span
//                         key={b}
//                         className="w-[3px] h-full rounded-full origin-bottom"
//                         style={{
//                           background: isActive ? a.color : "#14151A22",
//                           animation: isActive
//                             ? `eq ${0.9 + b * 0.15}s ease-in-out infinite`
//                             : "none",
//                         }}
//                       />
//                     ))}
//                   </div>

//                   <span className="hidden sm:inline font-[IBM_Plex_Mono,monospace] text-[11px] text-black/30 tabular-nums w-16 text-right shrink-0">
//                     0x{ids[i]}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="px-4 pt-4 pb-2 flex items-center justify-between">
//             <h3 className="text-[10px] font-[IBM_Plex_Mono,monospace] font-medium uppercase tracking-widest text-black/30">
//               activity
//             </h3>
//             <BinaryTicker className="font-[IBM_Plex_Mono,monospace] text-[10px] text-black/25 tabular-nums" />
//           </div>
//           <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
//             {activityLog.length === 0 ? (
//               <p className="text-[12px] text-black/30 font-[IBM_Plex_Mono,monospace]">
//                 no activity yet — send a task to see agents at work.
//               </p>
//             ) : (
//               activityLog.map((e) => (
//                 <div key={e.id} className="flex gap-2.5 motion-safe:animate-[fadeUp_0.4s_ease-out_both]">
//                   <span
//                     className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
//                     style={{ background: e.agent.color }}
//                   />
//                   <div className="min-w-0">
//                     <p className="text-[12px] text-black/70">
//                       <span
//                         className="font-[IBM_Plex_Mono,monospace] font-medium"
//                         style={{ color: e.agent.color }}
//                       >
//                         {e.agent.label}
//                       </span>{" "}
//                       — {e.text}
//                     </p>
//                     <p className="text-[10px] font-[IBM_Plex_Mono,monospace] text-black/30">{e.time}</p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           <div className="px-4 py-2.5 border-t border-white/50 bg-white/25 font-[IBM_Plex_Mono,monospace] text-[11px] text-black/35 flex items-center justify-between">
//             <span>{AGENTS.length} processes · shared context bus</span>
//             <span>core.vortex.ai</span>
//           </div>
//         </div>
//       </aside>
//     </div>
//   );
// }

// function EmptyState({ onSuggest }) {
//   return (
//     <div className="h-full flex flex-col items-center justify-center px-6 relative">
//       <BinaryColumn className="hidden xl:block absolute top-10 left-10 opacity-[0.05] -z-10" />
//       <BinaryColumn className="hidden xl:block absolute top-10 right-10 opacity-[0.05] -z-10" />

//       <span className="inline-flex items-center gap-2 text-[11px] font-[IBM_Plex_Mono,monospace] tracking-wide uppercase text-[#1E7A56] bg-[#1E7A56]/[0.06] border border-[#1E7A56]/20 rounded-md px-3 py-1.5 mb-8 motion-safe:animate-[fadeUp_0.5s_ease-out_both]">
//         <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A56] motion-safe:animate-[blink_2.2s_ease-in-out_infinite]" />
//         {AGENTS.length} agents standing by
//       </span>

//       <CheckpointPipeline />

//       <h1 className="font-[Space_Grotesk,sans-serif] text-2xl font-semibold text-center mt-8">
//         Your agents are standing by.
//       </h1>
//       <p className="text-black/45 text-sm mt-2 text-center max-w-sm">
//         Describe an outcome — Vortex will route it through research, code, and review automatically.
//       </p>

//       <div className="inline-flex items-center gap-2 font-[IBM_Plex_Mono,monospace] text-xs text-black/45 bg-black/[0.025] border border-black/[0.08] rounded-md px-3 py-1.5 mt-6">
//         <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A56] motion-safe:animate-[blink_1.6s_ease-in-out_infinite]" />
//         <TypeLine text="vortex init --session" startDelay={200} className="text-black/55" />
//       </div>

//       <div className="flex flex-wrap gap-2.5 justify-center mt-8 max-w-lg">
//         {SUGGESTIONS.map((s) => (
//           <button
//             key={s}
//             onClick={() => onSuggest(s)}
//             className="text-sm text-black/60 rounded-md border border-black/10 bg-white px-4 py-2 transition-colors hover:border-[#1E7A56]/40 hover:text-black"
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
//       <div className="flex justify-end motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
//         <div className="max-w-[75%] rounded-lg rounded-tr-sm bg-[#14151A] text-white text-sm px-4 py-3">
//           {message.content}
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="flex justify-start motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
//       <div className="max-w-[75%]">
//         <div className="flex items-center gap-2 mb-1.5">
//           <span className="w-1.5 h-1.5 rounded-full" style={{ background: message.agent.color }} />
//           <span
//             className="text-[11px] font-[IBM_Plex_Mono,monospace] font-medium"
//             style={{ color: message.agent.color }}
//           >
//             {message.agent.label}
//           </span>
//           <span className="text-[10px] font-[IBM_Plex_Mono,monospace] text-black/25">
//             0x{hexId()}
//           </span>
//         </div>
//         <div className="rounded-lg rounded-tl-sm border border-black/[0.07] bg-white text-sm px-4 py-3 text-black/80 shadow-[0_2px_10px_rgba(20,21,26,0.04)]">
//           {message.content}
//         </div>
//       </div>
//     </div>
//   );
// }

// function ThinkingBubble({ agentId }) {
//   const agent = AGENTS.find((a) => a.id === agentId) ?? AGENTS[0];
//   return (
//     <div className="flex justify-start motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
//       <div className="max-w-[75%]">
//         <div className="flex items-center gap-2 mb-1.5">
//           <span
//             className="w-1.5 h-1.5 rounded-full"
//             style={{ background: agent.color, animation: "pulseDot 1s ease-in-out infinite" }}
//           />
//           <span
//             className="text-[11px] font-[IBM_Plex_Mono,monospace] font-medium"
//             style={{ color: agent.color }}
//           >
//             {agent.label} · working
//           </span>
//         </div>
//         <div className="rounded-lg rounded-tl-sm border border-black/[0.07] bg-white px-4 py-3.5 flex items-center gap-3 shadow-[0_2px_10px_rgba(20,21,26,0.04)]">
//           <div className="flex gap-1.5">
//             {[0, 1, 2].map((i) => (
//               <span
//                 key={i}
//                 className="w-1.5 h-1.5 rounded-full bg-black/25"
//                 style={{ animation: `pulseDot 1s ease-in-out ${i * 0.15}s infinite` }}
//               />
//             ))}
//           </div>
//           <BinaryTicker className="font-[IBM_Plex_Mono,monospace] text-[10px] text-black/25 tabular-nums" bits={5} interval={450} />
//         </div>
//       </div>
//     </div>
//   );
// }

// function RailIcon({ children, label, active }) {
//   return (
//     <button
//       title={label}
//       className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
//         active ? "bg-[#1E7A56]/10 text-[#1E7A56]" : "text-black/35 hover:bg-black/[0.04] hover:text-black/70"
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
  { id: "researcher", label: "RESEARCHER", code: "RE", color: "#1E7A56", role: "gathers context" },
  { id: "coder", label: "CODER", code: "CO", color: "#34506B", role: "writes & tests" },
  { id: "reviewer", label: "REVIEWER", code: "RV", color: "#B3503F", role: "checks output" },
];

const ARTIFACT_ACCENT = "#5B4FC7";

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
  { id: 3, title: "Review PR #482", agent: "reviewer", time: "2d ago" },
];

// Canned code artifacts so the coder agent has something real to hand off.
const CODE_DEMOS = [
  {
    language: "javascript",
    filename: "auth.controller.js",
    code: `export const login = async (req, res) => {
  const { token } = req.body;
  const decoded = await verifyGoogleToken(token);

  const user = await User.findOneAndUpdate(
    { email: decoded.email },
    { $setOnInsert: { email: decoded.email, name: decoded.name } },
    { upsert: true, new: true }
  );

  const session = await createSession(user._id);
  res.json({ user, session });
};`,
  },
  {
    language: "html",
    filename: "preview.html",
    code: `<!doctype html>
<html>
  <body style="font-family: Inter, sans-serif; background: #F7F6F2; padding: 40px;">
    <div style="max-width: 360px; margin: 0 auto; border-radius: 12px; border: 1px solid rgba(20,21,26,0.08); background: white; padding: 24px;">
      <h2 style="margin: 0 0 8px; font-size: 18px;">Session created</h2>
      <p style="margin: 0; color: rgba(20,21,26,0.5); font-size: 14px;">
        Redirecting to your dashboard…
      </p>
    </div>
  </body>
</html>`,
  },
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

function BrandMark({ size = "text-lg" }) {
  return (
    <span className={`font-[Space_Grotesk,sans-serif] ${size} font-semibold tracking-tight flex items-center gap-2 shrink-0`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A56] motion-safe:animate-[blink_2.2s_ease-in-out_infinite]" />
      VORTEX
      <span className="text-black/35 font-mono text-xs font-normal tracking-normal">/ai</span>
    </span>
  );
}

/* ---------- agent checkpoint pipeline — the signature center animation ---------- */

const CHECKPOINT_POS = [
  { x: 60, y: 50 },   // researcher — top left
  { x: 240, y: 168 }, // coder — the V's vertex
  { x: 420, y: 50 },  // reviewer — top right
];
const V_PATH = `M${CHECKPOINT_POS[0].x},${CHECKPOINT_POS[0].y} L${CHECKPOINT_POS[1].x},${CHECKPOINT_POS[1].y} L${CHECKPOINT_POS[2].x},${CHECKPOINT_POS[2].y}`;

function CheckpointPipeline() {
  return (
    <div className="relative w-full max-w-md mx-auto motion-safe:animate-[riseIn_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
      <svg viewBox="0 0 480 230" className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E7A56" />
            <stop offset="50%" stopColor="#34506B" />
            <stop offset="100%" stopColor="#B3503F" />
          </linearGradient>
          <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* static structural V */}
        <path d={V_PATH} fill="none" stroke="#14151A" strokeOpacity="0.08" strokeWidth="1.5" />

        {/* animated data-flow V */}
        <path
          d={V_PATH}
          fill="none"
          stroke="url(#flowGradient)"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          strokeOpacity="0.55"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="2.4s" repeatCount="indefinite" />
        </path>

        {/* traveling checkpoint packet — descends then climbs, tracing the V */}
        <g>
          <animateMotion
            path={V_PATH}
            keyPoints="0;0;0.5;0.5;1;1"
            keyTimes="0;0.18;0.36;0.54;0.72;1"
            dur="6s"
            repeatCount="indefinite"
            calcMode="linear"
          />
          <circle r="16" fill="url(#pulseGlow)" />
          <circle r="4.5" fill="#14151A" />
        </g>

        {/* checkpoint nodes */}
        {AGENTS.map((a, i) => {
          const { x, y } = CHECKPOINT_POS[i];
          const labelY = y > 120 ? y + 44 : y - 36;
          return (
            <g key={a.id} className={`checkpoint-node checkpoint-node-${i}`} style={{ transformOrigin: `${x}px ${y}px` }}>
              <circle cx={x} cy={y} r="26" fill="rgba(255,255,255,0.7)" stroke={a.color} strokeWidth="1.5" />
              <circle cx={x} cy={y} r="26" fill="none" stroke={a.color} strokeWidth="1.5" className={`checkpoint-ring checkpoint-ring-${i}`} />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fill={a.color}
                fontSize="12"
                fontWeight="600"
                style={{ fontFamily: "IBM Plex Mono, monospace" }}
              >
                {a.code}
              </text>
              <text
                x={x}
                y={labelY}
                textAnchor="middle"
                fill="#14151A"
                fillOpacity="0.4"
                fontSize="10.5"
                letterSpacing="0.5"
                style={{ fontFamily: "IBM Plex Mono, monospace" }}
              >
                {a.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* cycling stage badge */}
      <div className="flex justify-center mt-2">
        <div className="relative h-6 font-[IBM_Plex_Mono,monospace] text-[11px] tracking-wide">
          {AGENTS.map((a, i) => (
            <span
              key={a.id}
              className={`absolute inset-0 flex items-center justify-center whitespace-nowrap stage-label stage-label-${i}`}
              style={{ color: a.color }}
            >
              stage: {a.label.toLowerCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- code artifact utilities ---------- */

// Pulls the first fenced code block out of a message, returning the
// surrounding text plus the extracted language/code, Claude-artifact style.
function extractArtifact(content) {
  const match = content.match(/```(\w+)?\n([\s\S]*?)```/);
  if (!match) return { text: content, artifact: null };
  const [full, lang, code] = match;
  const text = content.replace(full, "").trim();
  return {
    text,
    artifact: {
      language: (lang || "text").toLowerCase(),
      code: code.replace(/\n$/, ""),
    },
  };
}

// Small dependency-free syntax tinting — not a full highlighter, just enough
// to make the panel feel intentional rather than a flat wall of text.
function highlightLine(line, language) {
  const isMarkup = language === "html" || language === "xml" || language === "svg";
  const tokens = [];
  const pattern = isMarkup
    ? /(<\/?[a-zA-Z][\w-]*|\/?>|"[^"]*")/g
    : /(\/\/.*$|#.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b(const|let|var|function|return|async|await|import|export|from|default|if|else|for|while|new|class|extends|try|catch|=>)\b)/g;

  let lastIndex = 0;
  let m;
  let key = 0;
  while ((m = pattern.exec(line))) {
    if (m.index > lastIndex) tokens.push(<span key={key++}>{line.slice(lastIndex, m.index)}</span>);
    const t = m[0];
    let color = "#14151A";
    if (isMarkup) {
      color = t.startsWith("<") ? "#34506B" : t.startsWith('"') ? "#1E7A56" : "#14151A66";
    } else if (t.startsWith("//") || t.startsWith("#")) {
      color = "#14151A55";
    } else if (t.startsWith('"') || t.startsWith("'") || t.startsWith("`")) {
      color = "#1E7A56";
    } else {
      color = "#5B4FC7";
    }
    tokens.push(
      <span key={key++} style={{ color }}>
        {t}
      </span>,
    );
    lastIndex = m.index + t.length;
  }
  tokens.push(<span key={key++}>{line.slice(lastIndex)}</span>);
  return tokens;
}

function ArtifactCard({ artifact, onOpen }) {
  const firstLine = artifact.code.split("\n")[0].slice(0, 46);
  return (
    <button
      onClick={onOpen}
      className="w-full text-left rounded-lg border border-black/[0.08] bg-white overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_rgba(91,79,199,0.28)] hover:border-[#5B4FC7]/30"
    >
      <div className="flex items-center gap-2.5 px-4 py-3">
        <span
          className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
          style={{ background: "rgba(91,79,199,0.1)" }}
        >
          <CodeGlyphIcon />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate">Code artifact</p>
          <p className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/35 truncate">
            {artifact.language} · {firstLine}
            {artifact.code.split("\n")[0].length > 46 ? "…" : ""}
          </p>
        </div>
        <span className="text-black/25 group-hover:text-[#5B4FC7] transition-colors shrink-0">
          <ChevronIcon />
        </span>
      </div>
    </button>
  );
}

function ArtifactPanel({ artifact, onClose }) {
  const [tab, setTab] = useState("preview");
  const [copied, setCopied] = useState(false);
  const canPreview = ["html", "svg", "xml"].includes(artifact.language);

  useEffect(() => {
    setTab(canPreview ? "preview" : "code");
    setCopied(false);
  }, [artifact]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(artifact.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard API unavailable — fail silently, button just won't confirm
    }
  };

  const lines = artifact.code.split("\n");

  return (
    <div className="fixed inset-0 z-30 flex justify-end">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[#14151A]/10 backdrop-blur-[2px] motion-safe:animate-[fadeUp_0.25s_ease-out_both]"
      />
      <div className="relative w-full max-w-xl h-full bg-white border-l border-black/[0.08] shadow-[-24px_0_60px_-20px_rgba(20,21,26,0.25)] flex flex-col motion-safe:animate-[panelSlideIn_0.4s_cubic-bezier(0.16,1,0.3,1)_both]">
        {/* header */}
        <div className="relative flex items-center gap-3 px-5 py-4 border-b border-black/[0.07] overflow-hidden">
          <span
            className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
            style={{ background: "rgba(91,79,199,0.1)" }}
          >
            <CodeGlyphIcon />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Code artifact</p>
            <p className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/35">
              {artifact.language}
            </p>
          </div>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 text-xs font-medium rounded-md border border-black/10 px-3 py-1.5 transition-colors hover:border-[#5B4FC7]/40 hover:text-[#5B4FC7]"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={onClose}
            aria-label="Close artifact"
            className="w-7 h-7 rounded-md flex items-center justify-center text-black/40 hover:text-black hover:bg-black/[0.05] transition-colors shrink-0"
          >
            <XIcon />
          </button>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#5B4FC7]/[0.06] to-transparent motion-safe:animate-[sheen_5s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* tabs */}
        <div className="flex items-center gap-1 px-5 pt-3">
          <button
            onClick={() => setTab("preview")}
            className={`text-xs font-medium rounded-md px-3 py-1.5 transition-colors ${
              tab === "preview" ? "bg-[#14151A] text-white" : "text-black/45 hover:text-black"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setTab("code")}
            className={`text-xs font-medium rounded-md px-3 py-1.5 transition-colors ${
              tab === "code" ? "bg-[#14151A] text-white" : "text-black/45 hover:text-black"
            }`}
          >
            Code
          </button>
        </div>

        {/* body */}
        <div className="flex-1 overflow-auto p-5">
          {tab === "preview" ? (
            canPreview ? (
              <div className="rounded-lg border border-black/[0.08] h-full overflow-hidden bg-[#F7F6F2]">
                <iframe
                  title="artifact-preview"
                  sandbox=""
                  srcDoc={artifact.code}
                  className="w-full h-full min-h-[420px] bg-white"
                />
              </div>
            ) : (
              <div className="h-full min-h-[300px] rounded-lg border border-dashed border-black/[0.12] flex flex-col items-center justify-center gap-3 text-center px-8">
                <span
                  className="w-10 h-10 rounded-md flex items-center justify-center"
                  style={{ background: "rgba(91,79,199,0.08)" }}
                >
                  <CodeGlyphIcon />
                </span>
                <p className="text-sm text-black/55">
                  No visual preview for <span className="font-[IBM_Plex_Mono,monospace]">.{artifact.language}</span> — showing code instead.
                </p>
                <button
                  onClick={() => setTab("code")}
                  className="text-xs font-medium rounded-md bg-[#14151A] text-white px-3.5 py-1.5 hover:bg-[#5B4FC7] transition-colors"
                >
                  View code
                </button>
              </div>
            )
          ) : (
            <div className="rounded-lg border border-black/[0.08] bg-[#FBFAF7] overflow-hidden">
              <pre className="text-[12.5px] leading-[1.7] font-[IBM_Plex_Mono,monospace] p-4 overflow-x-auto">
                {lines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="select-none text-black/25 w-8 shrink-0 text-right pr-3">
                      {i + 1}
                    </span>
                    <span className="whitespace-pre">{highlightLine(line, artifact.language)}</span>
                  </div>
                ))}
              </pre>
            </div>
          )}
        </div>
      </div>
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
  const [activeArtifact, setActiveArtifact] = useState(null);
  const scrollRef = useRef(null);
  const demoIndex = useRef(0);

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

    const wantsCode = mode === "coding" || /build|api|function|debug|code|endpoint/i.test(content);
    const agent = wantsCode
      ? AGENTS.find((a) => a.id === "coder")
      : AGENTS[Math.floor(Math.random() * AGENTS.length)];

    setMessages((m) => [...m, { role: "user", content }]);
    setInput("");
    setThinking(true);
    setActiveAgent(agent.id);
    setActivityLog((log) =>
      [{ id: Date.now(), agent, text: `received task`, time: "now" }, ...log].slice(0, 6),
    );

    setTimeout(() => {
      let responseContent;
      if (agent.id === "coder") {
        const demo = CODE_DEMOS[demoIndex.current % CODE_DEMOS.length];
        demoIndex.current += 1;
        responseContent = `Here's a working pass at "${content}":\n\n\`\`\`${demo.language}\n${demo.code}\n\`\`\`\n\nTests pass locally — open the artifact to copy it or preview the output.`;
      } else {
        responseContent = `Routed "${content}" to ${agent.label.toLowerCase()} — task complete.`;
      }

      setMessages((m) => [...m, { role: "agent", agent, content: responseContent }]);
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
      {/* Ambient drifting glow, same signature as login hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-32 -left-20 w-[420px] h-[420px] -z-10 opacity-60 motion-safe:animate-[drift_11s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(circle, rgba(30,122,86,0.14), transparent 60%)",
          filter: "blur(50px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -bottom-24 right-10 w-[380px] h-[380px] -z-10 opacity-60 motion-safe:animate-[drift_13s_ease-in-out_infinite_1.5s]"
        style={{
          background: "radial-gradient(circle, rgba(91,79,199,0.10), transparent 60%)",
          filter: "blur(50px)",
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
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(18px, -14px) scale(1.05); }
        }
        @keyframes sheen {
          0% { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(220%) skewX(-12deg); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(30,122,86,0.25); }
          50% { opacity: 0.5; transform: scale(1.25); box-shadow: 0 0 0 4px rgba(30,122,86,0); }
        }
        @keyframes panelSlideIn {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
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

        /* checkpoint pipeline node pulses — timed to match the packet's arrival */
        @keyframes ringPulse {
          0% { r: 26; stroke-opacity: 0.9; stroke-width: 1.5; }
          10% { r: 34; stroke-opacity: 0; stroke-width: 3; }
          100% { r: 34; stroke-opacity: 0; stroke-width: 3; }
        }
        .checkpoint-ring { animation: ringPulse 6s ease-out infinite; }
        .checkpoint-ring-0 { animation-delay: 0s; }
        .checkpoint-ring-1 { animation-delay: 2.16s; }
        .checkpoint-ring-2 { animation-delay: 4.32s; }

        @keyframes nodeScale {
          0% { transform: scale(1); }
          8% { transform: scale(1.12); }
          20% { transform: scale(1); }
          100% { transform: scale(1); }
        }
        .checkpoint-node { animation: nodeScale 6s ease-out infinite; }
        .checkpoint-node-0 { animation-delay: 0s; }
        .checkpoint-node-1 { animation-delay: 2.16s; }
        .checkpoint-node-2 { animation-delay: 4.32s; }

        @keyframes stageFade0 {
          0%, 15% { opacity: 1; }
          20%, 100% { opacity: 0; }
        }
        @keyframes stageFade1 {
          0%, 33% { opacity: 0; }
          38%, 51% { opacity: 1; }
          56%, 100% { opacity: 0; }
        }
        @keyframes stageFade2 {
          0%, 69% { opacity: 0; }
          74%, 100% { opacity: 1; }
        }
        .stage-label-0 { animation: stageFade0 6s ease-in-out infinite; }
        .stage-label-1 { animation: stageFade1 6s ease-in-out infinite; }
        .stage-label-2 { animation: stageFade2 6s ease-in-out infinite; }
      `}</style>

      {/* Icon rail */}
      <aside className="w-16 shrink-0 border-r border-black/[0.07] bg-white/50 backdrop-blur-xl flex flex-col items-center py-5 gap-6 z-10 motion-safe:animate-[fadeUp_0.5s_ease-out_both]">
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
      <aside className="w-64 shrink-0 border-r border-black/[0.07] bg-white/35 backdrop-blur-xl flex flex-col z-10 motion-safe:animate-[fadeUp_0.55s_ease-out_0.05s_both]">
        <div className="p-4">
          <button
            onClick={() => {
              setMessages([]);
              setInput("");
              setActiveArtifact(null);
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

        <div className="relative h-14 border-b border-black/[0.07] flex items-center gap-4 px-6 bg-white/35 backdrop-blur-xl z-10 overflow-hidden motion-safe:animate-[fadeUp_0.5s_ease-out_both]">
          <BrandMark />
          <span className="w-px h-4 bg-black/10" />
          <p className="text-sm font-medium">{messages.length ? "Active session" : "New session"}</p>
          <span className="w-1 h-1 rounded-full bg-black/20" />
          <span className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/35">
            {messages.length} messages
          </span>
          <span className="ml-auto text-[11px] font-[IBM_Plex_Mono,monospace] text-black/30 tabular-nums hidden sm:inline">
            {clock}
          </span>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent motion-safe:animate-[sheen_7s_ease-in-out_infinite]" />
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <EmptyState onSuggest={send} />
          ) : (
            <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
              {messages.map((m, i) => (
                <MessageBubble key={i} message={m} onOpenArtifact={setActiveArtifact} />
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
      <aside className="w-80 shrink-0 border-l border-black/[0.07] hidden lg:flex flex-col relative z-10 motion-safe:animate-[fadeUp_0.55s_ease-out_0.1s_both]">
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

      {activeArtifact && (
        <ArtifactPanel artifact={activeArtifact} onClose={() => setActiveArtifact(null)} />
      )}
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

      <CheckpointPipeline />

      <h1 className="font-[Space_Grotesk,sans-serif] text-2xl font-semibold text-center mt-8">
        Your agents are standing by.
      </h1>
      <p className="text-black/45 text-sm mt-2 text-center max-w-sm">
        Describe an outcome — Vortex will route it through research, code, and review automatically.
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

function MessageBubble({ message, onOpenArtifact }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
        <div className="max-w-[75%] rounded-lg rounded-tr-sm bg-[#14151A] text-white text-sm px-4 py-3">
          {message.content}
        </div>
      </div>
    );
  }

  const { text, artifact } = extractArtifact(message.content);

  return (
    <div className="flex justify-start motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
      <div className="max-w-[75%] w-full">
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
        <div className="rounded-lg rounded-tl-sm border border-black/[0.07] bg-white text-sm px-4 py-3 text-black/80 shadow-[0_2px_10px_rgba(20,21,26,0.04)] space-y-3">
          {text && <p className="whitespace-pre-wrap">{text}</p>}
          {artifact && <ArtifactCard artifact={artifact} onOpen={() => onOpenArtifact(artifact)} />}
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
function CodeGlyphIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B4FC7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>; }
function ChevronIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>; }
function CopyIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>; }
function CheckIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E7A56" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>; }
function XIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>; }

export default Dashboard;
