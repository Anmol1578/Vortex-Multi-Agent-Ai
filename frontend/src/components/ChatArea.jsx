// import React, { useEffect, useRef, useState } from "react";

// const AGENTS = [
//   {
//     id: "researcher",
//     label: "RESEARCHER",
//     code: "RE",
//     color: "#1E7A56",
//     role: "gathers context",
//   },
//   {
//     id: "coder",
//     label: "CODER",
//     code: "CO",
//     color: "#34506B",
//     role: "writes & tests",
//   },
//   {
//     id: "reviewer",
//     label: "REVIEWER",
//     code: "RV",
//     color: "#B3503F",
//     role: "checks output",
//   },
// ];

// const MODES = [
//   { id: "auto", label: "Auto" },
//   { id: "chat", label: "Chat" },
//   { id: "coding", label: "Coding" },
//   { id: "pdf", label: "PDF" },
//   { id: "ppt", label: "PPT" },
//   { id: "vision", label: "Vision" },
//   { id: "search", label: "Search" },
// ];

// const SUGGESTIONS = [
//   "Build a REST API with auth",
//   "Plan a RAG pipeline",
//   "Debug this stack trace",
// ];

// /* ---------------------------- icons ---------------------------- */

// function AttachIcon() {
//   return (
//     <svg
//       width="17"
//       height="17"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//     >
//       <path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.19 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
//     </svg>
//   );
// }
// function MicIcon() {
//   return (
//     <svg
//       width="17"
//       height="17"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//     >
//       <rect x="9" y="2" width="6" height="12" rx="3" />
//       <path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
//     </svg>
//   );
// }
// function SendIcon() {
//   return (
//     <svg
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="white"
//       strokeWidth="2.2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
//     </svg>
//   );
// }
// function CodeGlyphIcon() {
//   return (
//     <svg
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="#5B4FC7"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
//     </svg>
//   );
// }
// function ChevronIcon() {
//   return (
//     <svg
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M9 18l6-6-6-6" />
//     </svg>
//   );
// }

// /* ------------------------- artifact utils ------------------------- */

// function extractArtifact(content) {
//   const match = content.match(/```(\w+)?\n([\s\S]*?)```/);
//   if (!match) return { text: content, artifact: null };
//   const [full, lang, code] = match;
//   const text = content.replace(full, "").trim();
//   return {
//     text,
//     artifact: {
//       language: (lang || "text").toLowerCase(),
//       code: code.replace(/\n$/, ""),
//     },
//   };
// }

// function ArtifactCard({ artifact, onOpen }) {
//   const firstLine = artifact.code.split("\n")[0].slice(0, 46);
//   return (
//     <button
//       onClick={onOpen}
//       className="w-full text-left rounded-lg border border-black/[0.08] bg-white overflow-hidden group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_rgba(91,79,199,0.28)] hover:border-[#5B4FC7]/30"
//     >
//       <div className="flex items-center gap-2.5 px-4 py-3">
//         <span
//           className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
//           style={{ background: "rgba(91,79,199,0.1)" }}
//         >
//           <CodeGlyphIcon />
//         </span>
//         <div className="min-w-0 flex-1">
//           <p className="text-sm font-medium truncate">Code artifact</p>
//           <p className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/35 truncate">
//             {artifact.language} · {firstLine}
//             {artifact.code.split("\n")[0].length > 46 ? "…" : ""}
//           </p>
//         </div>
//         <span className="text-black/25 group-hover:text-[#5B4FC7] transition-colors shrink-0">
//           <ChevronIcon />
//         </span>
//       </div>
//     </button>
//   );
// }

// /* --------------------------- empty state --------------------------- */
// /* Same badge language as the sidebar logo: dark gradient + soft glow + V mark */

// function VortexBadge() {
//   return (
//     <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#14151A] to-[#0B2E22] flex items-center justify-center relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
//       <div className="absolute inset-0 bg-[#1E7A56]/25 blur-md rounded-full scale-75" />
//       <svg
//         width="26"
//         height="26"
//         viewBox="0 0 24 24"
//         fill="none"
//         className="relative z-10"
//       >
//         <defs>
//           <linearGradient id="vGradientEmpty" x1="0" y1="0" x2="24" y2="24">
//             <stop offset="0%" stopColor="#5EEAD4" />
//             <stop offset="100%" stopColor="#1E7A56" />
//           </linearGradient>
//         </defs>
//         <path
//           d="M3 4L12 20L21 4"
//           stroke="url(#vGradientEmpty)"
//           strokeWidth="2.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           fill="none"
//         />
//         <path
//           d="M7.5 4L12 12.5L16.5 4"
//           stroke="url(#vGradientEmpty)"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           fill="none"
//           opacity="0.5"
//         />
//       </svg>
//       <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#1E7A56] motion-safe:animate-[blink_2.2s_ease-in-out_infinite] ring-2 ring-white z-10" />
//     </div>
//   );
// }

// function EmptyState({ onSuggest }) {
//   return (
//     <div className="h-full flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
//       {/* ambient glow, same signature as sidebar badge */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -top-24 -left-16 w-[380px] h-[380px] opacity-60 motion-safe:animate-[drift_12s_ease-in-out_infinite]"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(30,122,86,0.12), transparent 60%)",
//           filter: "blur(50px)",
//         }}
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-20 -right-16 w-[340px] h-[340px] opacity-60 motion-safe:animate-[drift_14s_ease-in-out_infinite_1.5s]"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(94,234,212,0.10), transparent 60%)",
//           filter: "blur(50px)",
//         }}
//       />

//       {/* faint background watermark text */}
//       <span
//         aria-hidden="true"
//         className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-[Space_Grotesk,sans-serif] font-bold text-[16vw] text-black/[0.025] tracking-tight"
//       >
//         VORTEX
//       </span>

//       <span className="inline-flex items-center gap-2 text-[11px] font-[IBM_Plex_Mono,monospace] tracking-wide uppercase text-[#1E7A56] bg-[#1E7A56]/[0.06] border border-[#1E7A56]/20 rounded-md px-3 py-1.5 mb-6 motion-safe:animate-[fadeUp_0.5s_ease-out_both]">
//         <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A56] motion-safe:animate-[blink_2.2s_ease-in-out_infinite]" />
//         Ready when you are
//       </span>

//       <div className="motion-safe:animate-[fadeUp_0.5s_ease-out_0.05s_both]">
//         <VortexBadge />
//       </div>

//       <h1 className="font-[Space_Grotesk,sans-serif] text-2xl font-semibold mt-6 motion-safe:animate-[fadeUp_0.5s_ease-out_0.1s_both]">
//         What are we building today?
//       </h1>
//       <p className="text-black/45 text-sm mt-2 max-w-sm motion-safe:animate-[fadeUp_0.5s_ease-out_0.15s_both]">
//         Describe an outcome — Vortex will handle research, code, and review as
//         needed.
//       </p>

//       <div className="flex flex-wrap gap-2.5 justify-center mt-8 max-w-lg motion-safe:animate-[fadeUp_0.5s_ease-out_0.2s_both]">
//         {SUGGESTIONS.map((s) => (
//           <button
//             key={s}
//             onClick={() => onSuggest(s)}
//             className="text-sm text-black/60 rounded-md border border-black/10 bg-white px-4 py-2 transition-all duration-200 hover:border-[#1E7A56]/40 hover:text-black hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(20,21,26,0.06)]"
//           >
//             {s}
//           </button>
//         ))}
//       </div>

//       {/* live status footer line */}
//       <div className="absolute bottom-6 inline-flex items-center gap-2 font-[IBM_Plex_Mono,monospace] text-[11px] text-black/30 motion-safe:animate-[fadeUp_0.5s_ease-out_0.25s_both]">
//         <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A56] motion-safe:animate-[blink_1.8s_ease-in-out_infinite]" />
//         6 agents online · core.vortex.ai
//       </div>
//     </div>
//   );
// }

// /* --------------------------- message bubble --------------------------- */

// function MessageBubble({ message, onOpenArtifact }) {
//   if (message.role === "user") {
//     return (
//       <div className="flex justify-end motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
//         <div className="max-w-[75%] rounded-lg rounded-tr-sm bg-[#14151A] text-white text-sm px-4 py-3">
//           {message.content}
//         </div>
//       </div>
//     );
//   }

//   const { text, artifact } = extractArtifact(message.content);
//   const agent = message.agent;

//   return (
//     <div className="flex justify-start motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
//       <div className="max-w-[75%] w-full">
//         <div className="flex items-center gap-2 mb-1.5">
//           <span
//             className="w-1.5 h-1.5 rounded-full"
//             style={{ background: agent?.color ?? "#1E7A56" }}
//           />
//           <span
//             className="text-[11px] font-[IBM_Plex_Mono,monospace] font-medium"
//             style={{ color: agent?.color ?? "#1E7A56" }}
//           >
//             {agent?.label ?? "VORTEX"}
//           </span>
//         </div>
//         <div className="rounded-lg rounded-tl-sm border border-black/[0.07] bg-white text-sm px-4 py-3 text-black/80 shadow-[0_2px_10px_rgba(20,21,26,0.04)] space-y-3">
//           {text && <p className="whitespace-pre-wrap">{text}</p>}
//           {artifact && (
//             <ArtifactCard
//               artifact={artifact}
//               onOpen={() => onOpenArtifact(artifact)}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* --------------------------- typing indicator --------------------------- */

// function TypingIndicator({ agentId }) {
//   const agent = AGENTS.find((a) => a.id === agentId) ?? AGENTS[0];
//   return (
//     <div className="flex justify-start motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
//       <div className="max-w-[75%]">
//         <div className="flex items-center gap-2 mb-1.5">
//           <span
//             className="w-1.5 h-1.5 rounded-full"
//             style={{
//               background: agent.color,
//               animation: "pulseDot 1s ease-in-out infinite",
//             }}
//           />
//           <span
//             className="text-[11px] font-[IBM_Plex_Mono,monospace] font-medium"
//             style={{ color: agent.color }}
//           >
//             {agent.label} · working
//           </span>
//         </div>
//         <div className="rounded-lg rounded-tl-sm border border-black/[0.07] bg-white px-4 py-3.5 flex items-center gap-1.5 shadow-[0_2px_10px_rgba(20,21,26,0.04)]">
//           {[0, 1, 2].map((i) => (
//             <span
//               key={i}
//               className="w-1.5 h-1.5 rounded-full bg-black/25"
//               style={{
//                 animation: `pulseDot 1s ease-in-out ${i * 0.15}s infinite`,
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* --------------------------- artifact panel --------------------------- */

// function ArtifactPanel({ artifact, onClose }) {
//   const [copied, setCopied] = useState(false);
//   const canPreview = ["html", "svg", "xml"].includes(artifact.language);
//   const [tab, setTab] = useState(canPreview ? "preview" : "code");

//   const copy = async () => {
//     try {
//       await navigator.clipboard.writeText(artifact.code);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1600);
//     } catch {
//       // clipboard unavailable — fail silently
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-30 flex justify-end">
//       <div
//         aria-hidden="true"
//         onClick={onClose}
//         className="absolute inset-0 bg-[#14151A]/10 backdrop-blur-[2px] motion-safe:animate-[fadeUp_0.25s_ease-out_both]"
//       />
//       <div className="relative w-full max-w-xl h-full bg-white border-l border-black/[0.08] shadow-[-24px_0_60px_-20px_rgba(20,21,26,0.25)] flex flex-col motion-safe:animate-[panelSlideIn_0.4s_cubic-bezier(0.16,1,0.3,1)_both]">
//         <div className="flex items-center gap-3 px-5 py-4 border-b border-black/[0.07]">
//           <span
//             className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
//             style={{ background: "rgba(91,79,199,0.1)" }}
//           >
//             <CodeGlyphIcon />
//           </span>
//           <div className="min-w-0 flex-1">
//             <p className="text-sm font-medium">Code artifact</p>
//             <p className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/35">
//               {artifact.language}
//             </p>
//           </div>
//           <button
//             onClick={copy}
//             className="text-xs font-medium rounded-md border border-black/10 px-3 py-1.5 transition-colors hover:border-[#5B4FC7]/40 hover:text-[#5B4FC7]"
//           >
//             {copied ? "Copied" : "Copy"}
//           </button>
//           <button
//             onClick={onClose}
//             aria-label="Close artifact"
//             className="w-7 h-7 rounded-md flex items-center justify-center text-black/40 hover:text-black hover:bg-black/[0.05] transition-colors shrink-0"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="flex items-center gap-1 px-5 pt-3">
//           <button
//             onClick={() => setTab("preview")}
//             className={`text-xs font-medium rounded-md px-3 py-1.5 transition-colors ${tab === "preview" ? "bg-[#14151A] text-white" : "text-black/45 hover:text-black"}`}
//           >
//             Preview
//           </button>
//           <button
//             onClick={() => setTab("code")}
//             className={`text-xs font-medium rounded-md px-3 py-1.5 transition-colors ${tab === "code" ? "bg-[#14151A] text-white" : "text-black/45 hover:text-black"}`}
//           >
//             Code
//           </button>
//         </div>

//         <div className="flex-1 overflow-auto p-5">
//           {tab === "preview" && canPreview ? (
//             <div className="rounded-lg border border-black/[0.08] h-full overflow-hidden bg-[#F7F6F2]">
//               <iframe
//                 title="artifact-preview"
//                 sandbox=""
//                 srcDoc={artifact.code}
//                 className="w-full h-full min-h-[420px] bg-white"
//               />
//             </div>
//           ) : (
//             <div className="rounded-lg border border-black/[0.08] bg-[#FBFAF7] overflow-hidden">
//               <pre className="text-[12.5px] leading-[1.7] font-[IBM_Plex_Mono,monospace] p-4 overflow-x-auto">
//                 {artifact.code.split("\n").map((line, i) => (
//                   <div key={i} className="flex">
//                     <span className="select-none text-black/25 w-8 shrink-0 text-right pr-3">
//                       {i + 1}
//                     </span>
//                     <span className="whitespace-pre">{line}</span>
//                   </div>
//                 ))}
//               </pre>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* --------------------------- main component --------------------------- */

// function ChatArea() {
//   const [mode, setMode] = useState("auto");
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [activeAgent, setActiveAgent] = useState(null);
//   const [thinking, setThinking] = useState(false);
//   const [clock, setClock] = useState("");
//   const [activeArtifact, setActiveArtifact] = useState(null);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     scrollRef.current?.scrollTo({
//       top: scrollRef.current.scrollHeight,
//       behavior: "smooth",
//     });
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
//     const id = setInterval(tick, 1000);
//     return () => clearInterval(id);
//   }, []);

//   const send = (text) => {
//     const content = (text ?? input).trim();
//     if (!content) return;

//     const wantsCode =
//       mode === "coding" ||
//       /build|api|function|debug|code|endpoint/i.test(content);
//     const agent = wantsCode ? AGENTS.find((a) => a.id === "coder") : AGENTS[0];

//     setMessages((m) => [...m, { role: "user", content }]);
//     setInput("");
//     setThinking(true);
//     setActiveAgent(agent.id);

//     // TODO: replace with real API call to your backend
//     setTimeout(() => {
//       setMessages((m) => [
//         ...m,
//         { role: "agent", agent, content: `Handled: "${content}"` },
//       ]);
//       setThinking(false);
//       setActiveAgent(null);
//     }, 1200);
//   };

//   return (
//     <div className="flex-1 flex flex-col min-w-0 relative">
//       <style>{`
//         @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(10px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes sheen {
//           0% { transform: translateX(-120%) skewX(-12deg); }
//           100% { transform: translateX(220%) skewX(-12deg); }
//         }
//         @keyframes pulseDot {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(1.25); }
//         }
//         @keyframes panelSlideIn {
//           from { opacity: 0; transform: translateX(28px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       {/* Header */}
//       <div className="relative h-14 border-b border-black/[0.07] flex items-center gap-4 px-6 bg-white/35 backdrop-blur-xl z-10 overflow-hidden motion-safe:animate-[fadeUp_0.5s_ease-out_both]">
//         <p className="text-sm font-medium">
//           {messages.length ? "Active session" : "New session"}
//         </p>
//         {messages.length > 0 && (
//           <>
//             <span className="w-1 h-1 rounded-full bg-black/20" />
//             <span className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/35">
//               {messages.length} messages
//             </span>
//           </>
//         )}
//         <span className="ml-auto text-[11px] font-[IBM_Plex_Mono,monospace] text-black/30 tabular-nums hidden sm:inline">
//           {clock}
//         </span>
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 overflow-hidden"
//         >
//           <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent motion-safe:animate-[sheen_7s_ease-in-out_infinite]" />
//         </div>
//       </div>

//       {/* Messages */}
//       <div ref={scrollRef} className="flex-1 overflow-y-auto">
//         {messages.length === 0 ? (
//           <EmptyState onSuggest={send} />
//         ) : (
//           <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
//             {messages.map((m, i) => (
//               <MessageBubble
//                 key={i}
//                 message={m}
//                 onOpenArtifact={setActiveArtifact}
//               />
//             ))}
//             {thinking && <TypingIndicator agentId={activeAgent} />}
//           </div>
//         )}
//       </div>

//       {/* Input */}
//       <div className="p-5 border-t border-black/[0.07] bg-white/25 backdrop-blur-xl z-10">
//         <div className="max-w-2xl mx-auto">
//           <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar">
//             {MODES.map((m) => (
//               <button
//                 key={m.id}
//                 onClick={() => setMode(m.id)}
//                 className={`shrink-0 text-xs font-[IBM_Plex_Mono,monospace] font-medium rounded-md px-3.5 py-1.5 border transition-all duration-300 ${
//                   mode === m.id
//                     ? "bg-[#14151A] border-transparent text-white hover:bg-[#1E7A56]"
//                     : "border-black/15 text-black/45 hover:text-[#1E7A56] hover:border-[#1E7A56]/40 hover:bg-[#1E7A56]/[0.05]"
//                 }`}
//               >
//                 {m.label}
//               </button>
//             ))}
//           </div>

//           <div className="rounded-lg border border-black/[0.08] bg-white shadow-[0_4px_20px_rgba(20,21,26,0.05)] px-4 py-3 focus-within:border-[#1E7A56]/50 transition-colors">
//             <textarea
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   send();
//                 }
//               }}
//               placeholder="Tell Vortex what to do…"
//               rows={1}
//               className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-black/30 max-h-40"
//             />
//             <div className="flex items-center justify-between mt-2">
//               <div className="flex items-center gap-3 text-black/35">
//                 <button
//                   className="hover:text-[#1E7A56] transition-colors"
//                   aria-label="Attach file"
//                 >
//                   <AttachIcon />
//                 </button>
//                 <button
//                   className="hover:text-[#1E7A56] transition-colors"
//                   aria-label="Voice input"
//                 >
//                   <MicIcon />
//                 </button>
//               </div>
//               <button
//                 onClick={() => send()}
//                 disabled={!input.trim()}
//                 className="rounded-md bg-[#14151A] p-2 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1E7A56] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(30,122,86,0.25)]"
//                 aria-label="Send"
//               >
//                 <SendIcon />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {activeArtifact && (
//         <ArtifactPanel
//           artifact={activeArtifact}
//           onClose={() => setActiveArtifact(null)}
//         />
//       )}
//     </div>
//   );
// }

// export default ChatArea;

// import React, { useEffect, useRef, useState } from "react";
// import Nav from "./Nav";
// import MessageList from "./MessageList";
// import ChatInput from "./ChatInput";
// // import ArtifactPanel from "./artifact"; // your existing artifact component — untouched

// const AGENTS = [
//   { id: "chat", label: "CHAT", code: "CH", color: "#1E7A56", role: "general conversation" },
//   { id: "search", label: "SEARCH", code: "SE", color: "#C48A34", role: "web search" },
//   { id: "coding", label: "CODING", code: "CO", color: "#34506B", role: "writes & tests" },
//   { id: "pdf", label: "PDF", code: "PD", color: "#B3503F", role: "document analysis" },
//   { id: "ppt", label: "PPT", code: "PP", color: "#5B4FC7", role: "presentation builder" },
//   { id: "vision", label: "VISION", code: "VI", color: "#0F766E", role: "image understanding" },
// ];

// function ChatArea() {
//   const [mode, setMode] = useState("auto");
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [activeAgent, setActiveAgent] = useState(null);
//   const [thinking, setThinking] = useState(false);
//   const [clock, setClock] = useState("");
//   const [activeArtifact, setActiveArtifact] = useState(null);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
//   }, [messages, thinking]);

//   useEffect(() => {
//     const tick = () =>
//       setClock(
//         new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
//       );
//     tick();
//     const id = setInterval(tick, 1000);
//     return () => clearInterval(id);
//   }, []);

//   const send = (text) => {
//     const content = (text ?? input).trim();
//     if (!content) return;

//     // Placeholder routing — swap for real backend response later
//     const guessedId =
//       mode !== "auto"
//         ? mode
//         : /build|api|function|debug|code|endpoint/i.test(content)
//           ? "coding"
//           : "chat";
//     const agent = AGENTS.find((a) => a.id === guessedId) ?? AGENTS.find((a) => a.id === "chat");

//     setMessages((m) => [...m, { role: "user", content }]);
//     setInput("");
//     setThinking(true);
//     setActiveAgent(agent);

//     // TODO: replace with real API call to your backend
//     setTimeout(() => {
//       setMessages((m) => [...m, { role: "agent", agent, content: `Handled: "${content}"` }]);
//       setThinking(false);
//       setActiveAgent(null);
//     }, 1200);
//   };

//   return (
//     <div className="flex-1 flex flex-col min-w-0 relative">
//       <style>{`
//         @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(10px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes sheen {
//           0% { transform: translateX(-120%) skewX(-12deg); }
//           100% { transform: translateX(220%) skewX(-12deg); }
//         }
//         @keyframes pulseDot {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(1.25); }
//         }
//         @keyframes panelSlideIn {
//           from { opacity: 0; transform: translateX(28px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes drift {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           50% { transform: translate(18px, -14px) scale(1.05); }
//         }
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       <Nav messageCount={messages.length} clock={clock} />

//       <MessageList
//         messages={messages}
//         thinking={thinking}
//         activeAgent={activeAgent}
//         onSuggest={send}
//         onOpenArtifact={setActiveArtifact}
//         scrollRef={scrollRef}
//       />

//       <ChatInput input={input} setInput={setInput} mode={mode} setMode={setMode} onSend={() => send()} />

//       {activeArtifact && (
//         <ArtifactPanel artifact={activeArtifact} onClose={() => setActiveArtifact(null)} />
//       )}
//     </div>
//   );
// }

// export default ChatArea;






import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
// import ArtifactPanel from "./artifact";
import getMessages from "../features/getMessages"; // adjust path to match your features folder
import { setMessages } from "../redux/messageSlice"; // adjust path

const AGENTS = [
  /* ...unchanged... */
];

function ChatArea() {
  const dispatch = useDispatch();

  const { selectedConversation } = useSelector((state) => state.conversation);
  const messages = useSelector((state) => state.message.messages ?? []);

  const [mode, setMode] = useState("auto");
  const [input, setInput] = useState("");
  const [activeAgent, setActiveAgent] = useState(null);
  const [thinking, setThinking] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState(null);
  const scrollRef = useRef(null);

  // Fetch messages whenever the selected conversation changes
  useEffect(() => {
    if (!selectedConversation?._id) {
      dispatch(setMessages([])); // clear chat when nothing is selected / "new session"
      return;
    }

    //     const loadMessages = async () => {
    //   const data = await getMessages(selectedConversation._id);

    //   console.log("API Response:", data);

    //   dispatch(setMessages(data ?? []));
    // };

    // const loadMessages = async () => {
    //   const data = await getMessages(selectedConversation._id);
    //   dispatch(setMessages(data));
    // };

    const loadMessages = async () => {
  const data = await getMessages(selectedConversation._id);
  dispatch(setMessages(Array.isArray(data) ? data : []));
};

    loadMessages();
  }, [selectedConversation?._id, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, thinking]);

  const send = (text) => {
    const content = (text ?? input).trim();
    if (!content) return;

    const guessedId =
      mode !== "auto"
        ? mode
        : /build|api|function|debug|code|endpoint/i.test(content)
          ? "coding"
          : "chat";
    const agent =
      AGENTS.find((a) => a.id === guessedId) ??
      AGENTS.find((a) => a.id === "chat");

    dispatch(setMessages([...messages, { role: "user", content }]));
    setInput("");
    setThinking(true);
    setActiveAgent(agent);

    // TODO: replace with real API call to your backend
    setTimeout(() => {
      dispatch(
        setMessages([
          ...messages,
          { role: "user", content },
          { role: "agent", agent, content: `Handled: "${content}"` },
        ]),
      );
      setThinking(false);
      setActiveAgent(null);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 relative">
      {/* ...styles unchanged... */}


      <Nav messageCount={messages.length} />

      <MessageList
        messages={messages}
        thinking={thinking}
        activeAgent={activeAgent}
        onSuggest={send}
        onOpenArtifact={setActiveArtifact}
        scrollRef={scrollRef}
      />

      <ChatInput
        input={input}
        setInput={setInput}
        mode={mode}
        setMode={setMode}
        onSend={() => send()}
      />

      {activeArtifact && (
        <ArtifactPanel
          artifact={activeArtifact}
          onClose={() => setActiveArtifact(null)}
        />
      )}
    </div>
  );
}

export default ChatArea;
