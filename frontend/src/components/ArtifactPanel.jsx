
// import React, { useMemo, useState } from "react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { X, Copy, Check, Download, Code2, Eye, FileCode2 } from "lucide-react";

// const EXT_BY_LANGUAGE = {
//   javascript: "js",
//   jsx: "jsx",
//   typescript: "ts",
//   tsx: "tsx",
//   python: "py",
//   bash: "sh",
//   shell: "sh",
//   sh: "sh",
//   css: "css",
//   html: "html",
//   markup: "html",
//   json: "json",
//   markdown: "md",
// };

// const LANGUAGE_BY_EXT = {
//   js: "javascript",
//   jsx: "jsx",
//   ts: "typescript",
//   tsx: "tsx",
//   py: "python",
//   css: "css",
//   html: "markup",
//   json: "json",
//   md: "markdown",
//   sh: "bash",
//   c: "c",
//   h: "c",
//   cpp: "cpp",
//   cc: "cpp",
//   hpp: "cpp",
//   java: "java",
//   go: "go",
//   rs: "rust",
//   rb: "ruby",
//   php: "php",
//   cs: "csharp",
//   sql: "sql",
//   yml: "yaml",
//   yaml: "yaml",
//   xml: "markup",
// };

// function getFileIcon(name) {
//   if (/\.(html?)$/i.test(name)) return "🌐";
//   if (/\.(css)$/i.test(name)) return "🎨";
//   if (/\.(js|jsx|ts|tsx)$/i.test(name)) return "⚡";
//   if (/\.(py)$/i.test(name)) return "🐍";
//   if (/\.(sh)$/i.test(name)) return "💻";
//   if (/\.(json)$/i.test(name)) return "{ }";
//   return "📄";
// }

// function getLanguage(file) {
//   if (file?.language) return file.language;
//   const ext = file?.path?.split(".").pop()?.toLowerCase();
//   return LANGUAGE_BY_EXT[ext] || "text";
// }

// // Handles both artifact shapes:
// // - new structured shape: { files: [{ path, language, content }] }
// // - old single-snippet fallback: { type: "markdown", language, code }
// // Also handles files that only have `name` (no `path`) — e.g. a fresh
// // agent response before it's round-tripped through the DB normalizer —
// // by deriving `path` from `name` so language detection still works.
// function normalizeArtifact(artifact) {
//   if (!artifact) return [];

//   if (Array.isArray(artifact.files) && artifact.files.length > 0) {
//     return artifact.files.map((file) => {
//       const path = file.path || file.name || "file.txt";
//       return {
//         ...file,
//         path,
//         name: file.name || path.split("/").pop(),
//       };
//     });
//   }

//   if (artifact.code) {
//     const lang = (artifact.language || "text").toLowerCase();
//     const ext = EXT_BY_LANGUAGE[lang] || "txt";
//     const name = `snippet.${ext}`;
//     return [
//       {
//         path: name,
//         name,
//         language: lang,
//         content: artifact.code,
//       },
//     ];
//   }

//   return [];
// }

// function buildPreviewDoc(files) {
//   const html = files.find((f) => /\.html?$/i.test(f.path));
//   const css = files.find((f) => /\.css$/i.test(f.path));
//   const js = files.find((f) => /\.(js|jsx)$/i.test(f.path));

//   if (!html) return null;

//   let doc = html.content;

//   if (css) {
//     doc = doc.includes("</head>")
//       ? doc.replace("</head>", `<style>${css.content}</style></head>`)
//       : `<style>${css.content}</style>${doc}`;
//   }

//   if (js) {
//     doc = doc.includes("</body>")
//       ? doc.replace("</body>", `<script>${js.content}</script></body>`)
//       : `${doc}<script>${js.content}</script>`;
//   }

//   return doc;
// }

// function ArtifactPanel({ artifact, onClose }) {
//   const files = useMemo(() => normalizeArtifact(artifact), [artifact]);
//   const [activeFileIdx, setActiveFileIdx] = useState(0);
//   const [view, setView] = useState("code");
//   const [copied, setCopied] = useState(false);

//   const activeFile = files[activeFileIdx];

//   const previewDoc = useMemo(() => buildPreviewDoc(files), [files]);
//   const canPreview = Boolean(previewDoc);

//   const handleCopy = async () => {
//     if (!activeFile) return;
//     try {
//       await navigator.clipboard.writeText(activeFile.content);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     } catch (err) {
//       console.error("copy failed", err);
//     }
//   };

//   const handleDownload = () => {
//     if (!activeFile) return;
//     const blob = new Blob([activeFile.content], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download =
//       activeFile.name || activeFile.path?.split("/").pop() || "download.txt";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   if (!artifact || files.length === 0) return null;

//   return (
//     <aside className="relative h-full w-full sm:w-[50%] min-w-[360px] border-l border-black/[0.07] bg-white/70 backdrop-blur-xl flex flex-col z-20 motion-safe:animate-[fadeUp_0.3s_ease-out_both] shadow-[-8px_0_24px_rgba(0,0,0,0.04)]">
//       <div className="flex items-center gap-3 px-4 h-14 border-b border-black/[0.07] bg-white/35 backdrop-blur-xl shrink-0">
//         <div
//           className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
//           style={{ background: "rgba(30,122,86,0.1)" }}
//         >
//           <FileCode2 size={15} className="text-[#1E7A56]" />
//         </div>

//         <div className="min-w-0 flex-1">
//           <p className="text-sm font-medium text-black/85 truncate">
//             {artifact.title || "Artifact"}
//           </p>
//           <p className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/40 truncate">
//             {artifact.description ||
//               `${files.length} file${files.length > 1 ? "s" : ""}`}
//           </p>
//         </div>

//         <button
//           onClick={onClose}
//           title="Close"
//           className="w-8 h-8 shrink-0 rounded-md flex items-center justify-center text-black/40 hover:text-black hover:bg-black/[0.06] transition-colors"
//         >
//           <X size={16} />
//         </button>
//       </div>

//       {files.length > 1 && (
//         <div className="flex items-center gap-1 px-3 pt-3 overflow-x-auto shrink-0">
//           {files.map((file, idx) => {
//             const isActive = idx === activeFileIdx;
//             return (
//               <button
//                 key={file.path + idx}
//                 onClick={() => setActiveFileIdx(idx)}
//                 className={`shrink-0 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-[IBM_Plex_Mono,monospace] transition-colors ${
//                   isActive
//                     ? "bg-[#1E7A56]/10 text-[#1E7A56] border border-[#1E7A56]/30"
//                     : "text-black/45 hover:bg-black/[0.04] hover:text-black/70 border border-transparent"
//                 }`}
//               >
//                 <span>{getFileIcon(file.path)}</span>
//                 <span className="truncate max-w-[150px]">
//                   {file.path.split("/").pop()}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       )}

//       <div className="flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
//         <div className="flex items-center gap-1 bg-black/[0.04] rounded-md p-0.5">
//           <button
//             onClick={() => setView("code")}
//             className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
//               view === "code"
//                 ? "bg-white text-black/80 shadow-sm"
//                 : "text-black/40 hover:text-black/70"
//             }`}
//           >
//             <Code2 size={13} /> Code
//           </button>

//           {canPreview && (
//             <button
//               onClick={() => setView("preview")}
//               className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
//                 view === "preview"
//                   ? "bg-white text-black/80 shadow-sm"
//                   : "text-black/40 hover:text-black/70"
//               }`}
//             >
//               <Eye size={13} /> Preview
//             </button>
//           )}
//         </div>

//         {view === "code" && (
//           <div className="flex items-center gap-1">
//             <button
//               onClick={handleCopy}
//               title="Copy file"
//               className="w-7 h-7 rounded-md flex items-center justify-center text-black/40 hover:text-[#1E7A56] hover:bg-black/[0.06] transition-colors"
//             >
//               {copied ? (
//                 <Check size={14} className="text-[#1E7A56]" />
//               ) : (
//                 <Copy size={14} />
//               )}
//             </button>
//             <button
//               onClick={handleDownload}
//               title="Download file"
//               className="w-7 h-7 rounded-md flex items-center justify-center text-black/40 hover:text-[#1E7A56] hover:bg-black/[0.06] transition-colors"
//             >
//               <Download size={14} />
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="flex-1 overflow-hidden px-4 pb-4">
//         {view === "code" ? (
//           <div className="h-full rounded-lg border border-black/[0.07] overflow-auto bg-[#1e1e1e]">
//             <SyntaxHighlighter
//               language={getLanguage(activeFile)}
//               style={vscDarkPlus}
//               showLineNumbers
//               customStyle={{
//                 margin: 0,
//                 padding: "14px",
//                 fontSize: "12.5px",
//                 lineHeight: 1.6,
//                 background: "transparent",
//                 minHeight: "100%",
//               }}
//               lineNumberStyle={{
//                 color: "rgba(255,255,255,0.25)",
//                 minWidth: "2.2em",
//               }}
//             >
//               {activeFile?.content || ""}
//             </SyntaxHighlighter>
//           </div>
//         ) : (
//           <div className="h-full rounded-lg border border-black/[0.07] overflow-hidden bg-white">
//             <iframe
//               title="artifact-preview"
//               srcDoc={previewDoc}
//               sandbox="allow-scripts"
//               className="w-full h-full"
//             />
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// }

// export default ArtifactPanel;













// import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
// import {
//   X,
//   Copy,
//   Check,
//   Download,
//   Code2,
//   Eye,
//   FileCode2,
//   ChevronLeft,
//   Files,
// } from "lucide-react";

// const EXT_BY_LANGUAGE = {
//   javascript: "js",
//   jsx: "jsx",
//   typescript: "ts",
//   tsx: "tsx",
//   python: "py",
//   bash: "sh",
//   shell: "sh",
//   sh: "sh",
//   css: "css",
//   html: "html",
//   markup: "html",
//   json: "json",
//   markdown: "md",
// };

// const LANGUAGE_BY_EXT = {
//   js: "javascript",
//   jsx: "jsx",
//   ts: "typescript",
//   tsx: "tsx",
//   py: "python",
//   css: "css",
//   html: "markup",
//   json: "json",
//   md: "markdown",
//   sh: "bash",
//   c: "c",
//   h: "c",
//   cpp: "cpp",
//   cc: "cpp",
//   hpp: "cpp",
//   java: "java",
//   go: "go",
//   rs: "rust",
//   rb: "ruby",
//   php: "php",
//   cs: "csharp",
//   sql: "sql",
//   yml: "yaml",
//   yaml: "yaml",
//   xml: "markup",
// };

// // Small per-extension accent used for the file-tab dot / list glyph — gives
// // files a bit of visual identity without leaning on a dark editor chrome.
// const ACCENT_BY_EXT = {
//   js: "#F2C94C",
//   jsx: "#61DAFB",
//   ts: "#3178C6",
//   tsx: "#3178C6",
//   py: "#3776AB",
//   css: "#5B9DD9",
//   html: "#E36C3F",
//   json: "#B0A03C",
//   md: "#6B7280",
//   sh: "#7C8B99",
//   yml: "#CB171E",
//   yaml: "#CB171E",
// };

// function getExt(name = "") {
//   return name.split(".").pop()?.toLowerCase() || "";
// }

// function getAccent(name) {
//   return ACCENT_BY_EXT[getExt(name)] || "#1E7A56";
// }

// function getLanguage(file) {
//   if (file?.language) return file.language;
//   const ext = file?.path?.split(".").pop()?.toLowerCase();
//   return LANGUAGE_BY_EXT[ext] || "text";
// }

// // Handles both artifact shapes:
// // - new structured shape: { files: [{ path, language, content }] }
// // - old single-snippet fallback: { type: "markdown", language, code }
// // Also handles files that only have `name` (no `path`).
// function normalizeArtifact(artifact) {
//   if (!artifact) return [];

//   if (Array.isArray(artifact.files) && artifact.files.length > 0) {
//     return artifact.files.map((file) => {
//       const path = file.path || file.name || "file.txt";
//       return {
//         ...file,
//         path,
//         name: file.name || path.split("/").pop(),
//       };
//     });
//   }

//   if (artifact.code) {
//     const lang = (artifact.language || "text").toLowerCase();
//     const ext = EXT_BY_LANGUAGE[lang] || "txt";
//     const name = `snippet.${ext}`;
//     return [
//       {
//         path: name,
//         name,
//         language: lang,
//         content: artifact.code,
//       },
//     ];
//   }

//   return [];
// }

// function buildPreviewDoc(files) {
//   const html = files.find((f) => /\.html?$/i.test(f.path));
//   const css = files.find((f) => /\.css$/i.test(f.path));
//   const js = files.find((f) => /\.(js|jsx)$/i.test(f.path));

//   if (!html) return null;

//   let doc = html.content;

//   if (css) {
//     doc = doc.includes("</head>")
//       ? doc.replace("</head>", `<style>${css.content}</style></head>`)
//       : `<style>${css.content}</style>${doc}`;
//   }

//   if (js) {
//     doc = doc.includes("</body>")
//       ? doc.replace("</body>", `<script>${js.content}</script></body>`)
//       : `${doc}<script>${js.content}</script>`;
//   }

//   return doc;
// }

// function relativeTime(date) {
//   if (!date) return null;
//   const d = new Date(date);
//   if (Number.isNaN(d.getTime())) return null;
//   const diffMs = Date.now() - d.getTime();
//   const mins = Math.round(diffMs / 60000);
//   if (mins < 1) return "just now";
//   if (mins < 60) return `${mins}m ago`;
//   const hrs = Math.round(mins / 60);
//   if (hrs < 24) return `${hrs}h ago`;
//   const days = Math.round(hrs / 24);
//   return `${days}d ago`;
// }

// /* ------------------------------ list view ------------------------------ */

// function ArtifactListRow({ entry, onOpen }) {
//   const files = useMemo(() => normalizeArtifact(entry.artifact), [entry.artifact]);
//   const primary = files[0];
//   const accent = getAccent(primary?.path || primary?.name);
//   const title = entry.artifact.title || primary?.name || "Artifact";
//   const when = relativeTime(entry.createdAt);

//   return (
//     <button
//       onClick={onOpen}
//       className="w-full text-left rounded-xl border border-black/[0.07] bg-white px-3.5 py-3 flex items-center gap-3 transition-all duration-150 hover:border-black/[0.14] hover:shadow-[0_4px_14px_rgba(20,21,26,0.06)] active:scale-[0.99]"
//     >
//       <span
//         className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
//         style={{ background: `${accent}14` }}
//       >
//         <FileCode2 size={15} style={{ color: accent }} />
//       </span>
//       <div className="min-w-0 flex-1">
//         <p className="text-[13.5px] font-medium text-black/85 truncate">{title}</p>
//         <p className="text-[11.5px] font-[IBM_Plex_Mono,monospace] text-black/40 truncate">
//           {files.length} file{files.length !== 1 ? "s" : ""}
//           {entry.agent?.label ? ` · ${entry.agent.label}` : ""}
//           {when ? ` · ${when}` : ""}
//         </p>
//       </div>
//       <ChevronLeft size={15} className="rotate-180 text-black/25 shrink-0" />
//     </button>
//   );
// }

// function ArtifactListView({ entries, onOpen }) {
//   return (
//     <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
//       {entries.length === 0 ? (
//         <div className="h-full flex flex-col items-center justify-center text-center px-6 py-16">
//           <span
//             className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
//             style={{ background: "rgba(30,122,86,0.08)" }}
//           >
//             <Files size={17} className="text-[#1E7A56]" />
//           </span>
//           <p className="text-[13.5px] font-medium text-black/70">No artifacts yet</p>
//           <p className="text-[12px] text-black/40 mt-1 max-w-[220px]">
//             Files Vortex generates in this conversation will show up here.
//           </p>
//         </div>
//       ) : (
//         entries.map((entry) => (
//           <ArtifactListRow key={entry.id} entry={entry} onOpen={() => onOpen(entry.id)} />
//         ))
//       )}
//     </div>
//   );
// }

// /* ----------------------------- detail view ------------------------------ */

// function ArtifactDetailView({ entry, onBack, showBack }) {
//   const files = useMemo(() => normalizeArtifact(entry.artifact), [entry.artifact]);
//   const [activeFileIdx, setActiveFileIdx] = useState(0);
//   const [view, setView] = useState("code");
//   const [copied, setCopied] = useState(false);

//   // Reset to the first file whenever a different artifact is opened.
//   useLayoutEffect(() => {
//     setActiveFileIdx(0);
//     setView("code");
//   }, [entry.id]);

//   const activeFile = files[activeFileIdx];
//   const previewDoc = useMemo(() => buildPreviewDoc(files), [files]);
//   const canPreview = Boolean(previewDoc);

//   const tabRefs = useRef([]);
//   const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 });

//   useLayoutEffect(() => {
//     const el = tabRefs.current[activeFileIdx];
//     if (el) setTabIndicator({ left: el.offsetLeft, width: el.offsetWidth });
//   }, [activeFileIdx, files.length]);

//   const segCount = canPreview ? 2 : 1;
//   const segIndex = view === "code" ? 0 : 1;

//   const lineCount = activeFile?.content
//     ? activeFile.content.replace(/\n$/, "").split("\n").length
//     : 0;

//   const accent = getAccent(activeFile?.path || activeFile?.name);

//   const handleCopy = async () => {
//     if (!activeFile) return;
//     try {
//       await navigator.clipboard.writeText(activeFile.content);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     } catch (err) {
//       console.error("copy failed", err);
//     }
//   };

//   const handleDownload = () => {
//     if (!activeFile) return;
//     const blob = new Blob([activeFile.content], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = activeFile.name || activeFile.path?.split("/").pop() || "download.txt";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   if (!activeFile) return null;

//   return (
//     <>
//       {/* File tabs */}
//       {files.length > 1 && (
//         <div className="relative flex items-center gap-1 px-3 pt-3 overflow-x-auto shrink-0">
//           {files.map((file, idx) => {
//             const isActive = idx === activeFileIdx;
//             const tabAccent = getAccent(file.path);
//             return (
//               <button
//                 key={file.path + idx}
//                 ref={(el) => (tabRefs.current[idx] = el)}
//                 onClick={() => setActiveFileIdx(idx)}
//                 className={`relative shrink-0 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-[IBM_Plex_Mono,monospace] transition-colors duration-200 ${
//                   isActive ? "text-black/85" : "text-black/40 hover:text-black/70 hover:bg-black/[0.03]"
//                 }`}
//               >
//                 <span
//                   className="w-1.5 h-1.5 rounded-full shrink-0"
//                   style={{ background: isActive ? tabAccent : "rgba(0,0,0,0.18)" }}
//                 />
//                 <span className="truncate max-w-[140px]">{file.path.split("/").pop()}</span>
//               </button>
//             );
//           })}
//           <span
//             className="absolute bottom-0 h-[2px] rounded-full transition-all duration-300 ease-out"
//             style={{
//               left: tabIndicator.left,
//               width: tabIndicator.width,
//               background: `linear-gradient(90deg, ${accent}, #5EEAD4)`,
//             }}
//           />
//           <span className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]" />
//         </div>
//       )}

//       {/* Toolbar */}
//       <div className="flex items-center justify-between px-4 pt-3 pb-2.5 shrink-0">
//         {canPreview ? (
//           <div className="relative flex items-center bg-black/[0.04] rounded-md p-0.5">
//             <span
//               className="absolute top-0.5 bottom-0.5 rounded bg-white shadow-sm transition-transform duration-250 ease-out"
//               style={{
//                 width: `calc(${100 / segCount}% - 2px)`,
//                 transform: `translateX(${segIndex * 100}%)`,
//               }}
//             />
//             <button
//               onClick={() => setView("code")}
//               className={`relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors duration-200 ${
//                 view === "code" ? "text-black/80" : "text-black/40 hover:text-black/60"
//               }`}
//             >
//               <Code2 size={13} /> Code
//             </button>
//             <button
//               onClick={() => setView("preview")}
//               className={`relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors duration-200 ${
//                 view === "preview" ? "text-black/80" : "text-black/40 hover:text-black/60"
//               }`}
//             >
//               <Eye size={13} /> Preview
//             </button>
//           </div>
//         ) : (
//           <span className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-black/50">
//             <Code2 size={13} /> Code
//           </span>
//         )}

//         <div className="flex items-center gap-2">
//           {view === "code" && (
//             <span className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/30 hidden sm:inline">
//               {lineCount} line{lineCount !== 1 ? "s" : ""}
//             </span>
//           )}
//           {view === "code" && (
//             <div className="flex items-center gap-1">
//               <button
//                 onClick={handleCopy}
//                 title="Copy file"
//                 className="w-7 h-7 rounded-md flex items-center justify-center text-black/40 hover:text-[#1E7A56] hover:bg-black/[0.06] active:scale-90 transition-all duration-150"
//               >
//                 <span className="relative w-3.5 h-3.5 inline-flex items-center justify-center">
//                   <Copy
//                     size={14}
//                     className={`absolute transition-all duration-200 ${copied ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}
//                   />
//                   <Check
//                     size={14}
//                     className={`absolute text-[#1E7A56] transition-all duration-200 ${copied ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
//                   />
//                 </span>
//               </button>
//               <button
//                 onClick={handleDownload}
//                 title="Download file"
//                 className="w-7 h-7 rounded-md flex items-center justify-center text-black/40 hover:text-[#1E7A56] hover:bg-black/[0.06] active:scale-90 transition-all duration-150"
//               >
//                 <Download size={14} />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex-1 overflow-hidden px-4 pb-4">
//         <div key={view + activeFileIdx} className="h-full motion-safe:animate-[fadeUp_0.2s_ease-out_both]">
//           {view === "code" ? (
//             <div className="h-full rounded-xl border border-black/[0.07] overflow-auto bg-white">
//               <SyntaxHighlighter
//                 language={getLanguage(activeFile)}
//                 style={oneLight}
//                 showLineNumbers
//                 customStyle={{
//                   margin: 0,
//                   padding: "14px",
//                   fontSize: "12.5px",
//                   lineHeight: 1.65,
//                   background: "#ffffff",
//                   minHeight: "100%",
//                 }}
//                 codeTagProps={{ style: { background: "transparent" } }}
//                 lineNumberStyle={{ color: "rgba(0,0,0,0.22)", minWidth: "2.2em" }}
//               >
//                 {activeFile?.content || ""}
//               </SyntaxHighlighter>
//             </div>
//           ) : (
//             <div className="h-full rounded-xl border border-black/[0.07] overflow-hidden bg-white">
//               <iframe
//                 title="artifact-preview"
//                 srcDoc={previewDoc}
//                 sandbox="allow-scripts"
//                 className="w-full h-full"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// /* -------------------------------- panel --------------------------------- */

// /**
//  * Props:
//  * - artifacts: [{ id, artifact, agent?, createdAt? }]  (every artifact in the conversation)
//  * - selectedId: id of the artifact currently open, or null to show the list
//  * - onSelect(id | null): open a specific artifact, or null to go back to the list
//  * - onClose(): close the panel entirely
//  */
// function ArtifactPanel({ artifacts = [], selectedId = null, onSelect, onClose }) {
//   const selectedEntry = artifacts.find((e) => e.id === selectedId) || null;
//   const isList = !selectedEntry;

//   const headerTitle = isList
//     ? "Artifacts"
//     : selectedEntry.artifact.title ||
//       normalizeArtifact(selectedEntry.artifact)[0]?.name ||
//       "Artifact";

//   const headerSubtitle = isList
//     ? `${artifacts.length} file${artifacts.length !== 1 ? "s" : ""} in this conversation`
//     : selectedEntry.artifact.description ||
//       `${normalizeArtifact(selectedEntry.artifact).length} file${
//         normalizeArtifact(selectedEntry.artifact).length !== 1 ? "s" : ""
//       }`;

//   return (
//     <aside className="h-full w-[92vw] sm:w-[440px] border-l border-black/[0.07] bg-white flex flex-col">
//       {/* Header */}
//       <div className="flex items-center gap-3 px-4 h-16 border-b border-black/[0.06] shrink-0 bg-white">
//         {!isList && artifacts.length > 1 ? (
//           <button
//             onClick={() => onSelect(null)}
//             title="All artifacts"
//             className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-black/40 hover:text-black hover:bg-black/[0.06] transition-colors duration-150"
//           >
//             <ChevronLeft size={17} />
//           </button>
//         ) : (
//           <div
//             className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
//             style={{ background: "rgba(30,122,86,0.1)" }}
//           >
//             <FileCode2 size={16} className="text-[#1E7A56]" />
//           </div>
//         )}

//         <div className="min-w-0 flex-1">
//           <p className="text-[13.5px] font-semibold text-black/85 truncate font-[Space_Grotesk,sans-serif]">
//             {headerTitle}
//           </p>
//           <p className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/40 truncate">
//             {headerSubtitle}
//           </p>
//         </div>

//         <button
//           onClick={onClose}
//           title="Close"
//           className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-black/35 hover:text-black hover:bg-black/[0.06] active:scale-90 transition-all duration-150"
//         >
//           <X size={16} />
//         </button>
//       </div>

//       {isList ? (
//         <ArtifactListView entries={artifacts} onOpen={onSelect} />
//       ) : (
//         <ArtifactDetailView
//           key={selectedEntry.id}
//           entry={selectedEntry}
//           onBack={() => onSelect(null)}
//           showBack={artifacts.length > 1}
//         />
//       )}
//     </aside>
//   );
// }

// export default ArtifactPanel;




import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  X,
  Copy,
  Check,
  Download,
  Code2,
  Eye,
  FileCode2,
  ChevronLeft,
  Files,
} from "lucide-react";

const EXT_BY_LANGUAGE = {
  javascript: "js",
  jsx: "jsx",
  typescript: "ts",
  tsx: "tsx",
  python: "py",
  bash: "sh",
  shell: "sh",
  sh: "sh",
  css: "css",
  html: "html",
  markup: "html",
  json: "json",
  markdown: "md",
};

const LANGUAGE_BY_EXT = {
  js: "javascript",
  jsx: "jsx",
  ts: "typescript",
  tsx: "tsx",
  py: "python",
  css: "css",
  html: "markup",
  json: "json",
  md: "markdown",
  sh: "bash",
  c: "c",
  h: "c",
  cpp: "cpp",
  cc: "cpp",
  hpp: "cpp",
  java: "java",
  go: "go",
  rs: "rust",
  rb: "ruby",
  php: "php",
  cs: "csharp",
  sql: "sql",
  yml: "yaml",
  yaml: "yaml",
  xml: "markup",
};

// Small per-extension accent used for the file-tab dot / list glyph — gives
// files a bit of visual identity without leaning on a dark editor chrome.
const ACCENT_BY_EXT = {
  js: "#F2C94C",
  jsx: "#61DAFB",
  ts: "#3178C6",
  tsx: "#3178C6",
  py: "#3776AB",
  css: "#5B9DD9",
  html: "#E36C3F",
  json: "#B0A03C",
  md: "#6B7280",
  sh: "#7C8B99",
  yml: "#CB171E",
  yaml: "#CB171E",
};

function getExt(name = "") {
  return name.split(".").pop()?.toLowerCase() || "";
}

function getAccent(name) {
  return ACCENT_BY_EXT[getExt(name)] || "#1E7A56";
}

function getLanguage(file) {
  if (file?.language) return file.language;
  const ext = file?.path?.split(".").pop()?.toLowerCase();
  return LANGUAGE_BY_EXT[ext] || "text";
}

// Handles both artifact shapes:
// - new structured shape: { files: [{ path, language, content }] }
// - old single-snippet fallback: { type: "markdown", language, code }
// Also handles files that only have `name` (no `path`).
function normalizeArtifact(artifact) {
  if (!artifact) return [];

  if (Array.isArray(artifact.files) && artifact.files.length > 0) {
    return artifact.files.map((file) => {
      const path = file.path || file.name || "file.txt";
      return {
        ...file,
        path,
        name: file.name || path.split("/").pop(),
      };
    });
  }

  if (artifact.code) {
    const lang = (artifact.language || "text").toLowerCase();
    const ext = EXT_BY_LANGUAGE[lang] || "txt";
    const name = `snippet.${ext}`;
    return [
      {
        path: name,
        name,
        language: lang,
        content: artifact.code,
      },
    ];
  }

  return [];
}

function buildPreviewDoc(files) {
  const html = files.find((f) => /\.html?$/i.test(f.path));
  const css = files.find((f) => /\.css$/i.test(f.path));
  const js = files.find((f) => /\.(js|jsx)$/i.test(f.path));

  if (!html) return null;

  let doc = html.content;

  if (css) {
    doc = doc.includes("</head>")
      ? doc.replace("</head>", `<style>${css.content}</style></head>`)
      : `<style>${css.content}</style>${doc}`;
  }

  if (js) {
    doc = doc.includes("</body>")
      ? doc.replace("</body>", `<script>${js.content}</script></body>`)
      : `${doc}<script>${js.content}</script>`;
  }

  return doc;
}

function relativeTime(date) {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  const diffMs = Date.now() - d.getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
}

/* ------------------------------ list view ------------------------------ */

function ArtifactListRow({ entry, onOpen }) {
  const files = useMemo(() => normalizeArtifact(entry.artifact), [entry.artifact]);
  const primary = files[0];
  const accent = getAccent(primary?.path || primary?.name);
  // const title = entry.artifact.title || primary?.name || "Artifact";
  const title = primary?.name || entry.artifact.title || "Artifact";
  const when = relativeTime(entry.createdAt);

  return (
    <button
      onClick={onOpen}
      className="w-full text-left rounded-xl border border-black/[0.07] bg-white px-3.5 py-3 flex items-center gap-3 transition-all duration-150 hover:border-black/[0.14] hover:shadow-[0_4px_14px_rgba(20,21,26,0.06)] active:scale-[0.99]"
    >
      <span
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${accent}14` }}
      >
        <FileCode2 size={15} style={{ color: accent }} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-medium text-black/85 truncate">{title}</p>
        <p className="text-[11.5px] font-[IBM_Plex_Mono,monospace] text-black/40 truncate">
          {files.length} file{files.length !== 1 ? "s" : ""}
          {entry.agent?.label ? ` · ${entry.agent.label}` : ""}
          {when ? ` · ${when}` : ""}
        </p>
      </div>
      <ChevronLeft size={15} className="rotate-180 text-black/25 shrink-0" />
    </button>
  );
}

function ArtifactListView({ entries, onOpen }) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-2">
      {entries.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center px-6 py-16">
          <span
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
            style={{ background: "rgba(30,122,86,0.08)" }}
          >
            <Files size={17} className="text-[#1E7A56]" />
          </span>
          <p className="text-[13.5px] font-medium text-black/70">No artifacts yet</p>
          <p className="text-[12px] text-black/40 mt-1 max-w-[220px]">
            Files Vortex generates in this conversation will show up here.
          </p>
        </div>
      ) : (
        entries.map((entry) => (
          <ArtifactListRow key={entry.id} entry={entry} onOpen={() => onOpen(entry.id)} />
        ))
      )}
    </div>
  );
}

/* ----------------------------- detail view ------------------------------ */

function ArtifactDetailView({ entry, onBack, showBack, onWidthChange }) {
  const files = useMemo(() => normalizeArtifact(entry.artifact), [entry.artifact]);
  const [activeFileIdx, setActiveFileIdx] = useState(0);
  const [view, setView] = useState("code");
  const [copied, setCopied] = useState(false);
  const codeWrapRef = useRef(null);

  // Reset to the first file whenever a different artifact is opened.
  useLayoutEffect(() => {
    setActiveFileIdx(0);
    setView("code");
  }, [entry.id]);

  const activeFile = files[activeFileIdx];
  const previewDoc = useMemo(() => buildPreviewDoc(files), [files]);
  const canPreview = Boolean(previewDoc);

  // Measure the code's true (unwrapped) width so the panel itself can grow
  // to fit a long line, instead of only scrolling inside a fixed box.
  useLayoutEffect(() => {
    if (!onWidthChange) return;
    if (view !== "code" || !codeWrapRef.current) {
      onWidthChange(null);
      return;
    }
    // scrollWidth reflects the code's real content width regardless of how
    // narrow the panel currently is, since the <pre> inside is width: max-content.
    const contentWidth = codeWrapRef.current.scrollWidth;
    // + outer content padding (16px each side) and a little breathing room
    onWidthChange(contentWidth + 32 + 24);
  }, [activeFileIdx, view, activeFile?.content, onWidthChange]);

  const tabRefs = useRef([]);
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = tabRefs.current[activeFileIdx];
    if (el) setTabIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeFileIdx, files.length]);

  const segCount = canPreview ? 2 : 1;
  const segIndex = view === "code" ? 0 : 1;

  const lineCount = activeFile?.content
    ? activeFile.content.replace(/\n$/, "").split("\n").length
    : 0;

  const accent = getAccent(activeFile?.path || activeFile?.name);

  const handleCopy = async () => {
    if (!activeFile) return;
    try {
      await navigator.clipboard.writeText(activeFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("copy failed", err);
    }
  };

  const handleDownload = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeFile.name || activeFile.path?.split("/").pop() || "download.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!activeFile) return null;

  return (
    <>
      {/* File tabs */}
      {files.length > 1 && (
        <div className="relative flex items-center gap-1 px-3 pt-3 overflow-x-auto shrink-0">
          {files.map((file, idx) => {
            const isActive = idx === activeFileIdx;
            const tabAccent = getAccent(file.path);
            return (
              <button
                key={file.path + idx}
                ref={(el) => (tabRefs.current[idx] = el)}
                onClick={() => setActiveFileIdx(idx)}
                className={`relative shrink-0 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-[IBM_Plex_Mono,monospace] transition-colors duration-200 ${
                  isActive ? "text-black/85" : "text-black/40 hover:text-black/70 hover:bg-black/[0.03]"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: isActive ? tabAccent : "rgba(0,0,0,0.18)" }}
                />
                <span className="truncate max-w-[140px]">{file.path.split("/").pop()}</span>
              </button>
            );
          })}
          <span
            className="absolute bottom-0 h-[2px] rounded-full transition-all duration-300 ease-out"
            style={{
              left: tabIndicator.left,
              width: tabIndicator.width,
              background: `linear-gradient(90deg, ${accent}, #5EEAD4)`,
            }}
          />
          <span className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]" />
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2.5 shrink-0">
        {canPreview ? (
          <div className="relative flex items-center bg-black/[0.04] rounded-md p-0.5">
            <span
              className="absolute top-0.5 bottom-0.5 rounded bg-white shadow-sm transition-transform duration-250 ease-out"
              style={{
                width: `calc(${100 / segCount}% - 2px)`,
                transform: `translateX(${segIndex * 100}%)`,
              }}
            />
            <button
              onClick={() => setView("code")}
              className={`relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors duration-200 ${
                view === "code" ? "text-black/80" : "text-black/40 hover:text-black/60"
              }`}
            >
              <Code2 size={13} /> Code
            </button>
            <button
              onClick={() => setView("preview")}
              className={`relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors duration-200 ${
                view === "preview" ? "text-black/80" : "text-black/40 hover:text-black/60"
              }`}
            >
              <Eye size={13} /> Preview
            </button>
          </div>
        ) : (
          <span className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-black/50">
            <Code2 size={13} /> Code
          </span>
        )}

        <div className="flex items-center gap-2">
          {view === "code" && (
            <span className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/30 hidden sm:inline">
              {lineCount} line{lineCount !== 1 ? "s" : ""}
            </span>
          )}
          {view === "code" && (
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                title="Copy file"
                className="w-7 h-7 rounded-md flex items-center justify-center text-black/40 hover:text-[#1E7A56] hover:bg-black/[0.06] active:scale-90 transition-all duration-150"
              >
                <span className="relative w-3.5 h-3.5 inline-flex items-center justify-center">
                  <Copy
                    size={14}
                    className={`absolute transition-all duration-200 ${copied ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}
                  />
                  <Check
                    size={14}
                    className={`absolute text-[#1E7A56] transition-all duration-200 ${copied ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                  />
                </span>
              </button>
              <button
                onClick={handleDownload}
                title="Download file"
                className="w-7 h-7 rounded-md flex items-center justify-center text-black/40 hover:text-[#1E7A56] hover:bg-black/[0.06] active:scale-90 transition-all duration-150"
              >
                <Download size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4">
        <div key={view + activeFileIdx} className="motion-safe:animate-[fadeUp_0.2s_ease-out_both]">
          {view === "code" ? (
            <div ref={codeWrapRef} className="rounded-xl border border-black/[0.07] bg-white overflow-x-auto">
              <SyntaxHighlighter
                language={getLanguage(activeFile)}
                style={oneLight}
                showLineNumbers
                customStyle={{
                  margin: 0,
                  padding: "14px",
                  fontSize: "12.5px",
                  lineHeight: 1.65,
                  background: "#ffffff",
                  width: "max-content",
                  minWidth: "100%",
                }}
                codeTagProps={{ style: { background: "transparent" } }}
                lineNumberStyle={{ color: "rgba(0,0,0,0.22)", minWidth: "2.2em" }}
              >
                {activeFile?.content || ""}
              </SyntaxHighlighter>
            </div>
          ) : (
            <div className="h-[calc(100vh-220px)] rounded-xl border border-black/[0.07] overflow-hidden bg-white">
              <iframe
                title="artifact-preview"
                srcDoc={previewDoc}
                sandbox="allow-scripts"
                className="w-full h-full"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* -------------------------------- panel --------------------------------- */

/**
 * Props:
 * - artifacts: [{ id, artifact, agent?, createdAt? }]  (every artifact in the conversation)
 * - selectedId: id of the artifact currently open, or null to show the list
 * - onSelect(id | null): open a specific artifact, or null to go back to the list
 * - onClose(): close the panel entirely
 */
function ArtifactPanel({ artifacts = [], selectedId = null, onSelect, onClose, onWidthChange }) {
  const selectedEntry = artifacts.find((e) => e.id === selectedId) || null;
  const isList = !selectedEntry;

  useLayoutEffect(() => {
    if (isList) onWidthChange?.(null);
  }, [isList, onWidthChange]);


  const headerTitle = isList
  ? "Artifacts"
  : normalizeArtifact(selectedEntry.artifact)[0]?.name ||
    selectedEntry.artifact.title ||
    "Artifact";

  const headerSubtitle = isList
    ? `${artifacts.length} file${artifacts.length !== 1 ? "s" : ""} in this conversation`
    : selectedEntry.artifact.description ||
      `${normalizeArtifact(selectedEntry.artifact).length} file${
        normalizeArtifact(selectedEntry.artifact).length !== 1 ? "s" : ""
      }`;

  return (
    <aside className="h-full min-h-0 w-full border-l border-black/[0.07] bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-black/[0.06] shrink-0 bg-white">
        {!isList && artifacts.length > 1 ? (
          <button
            onClick={() => onSelect(null)}
            title="All artifacts"
            className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-black/40 hover:text-black hover:bg-black/[0.06] transition-colors duration-150"
          >
            <ChevronLeft size={17} />
          </button>
        ) : (
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(30,122,86,0.1)" }}
          >
            <FileCode2 size={16} className="text-[#1E7A56]" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-[13.5px] font-semibold text-black/85 truncate font-[Space_Grotesk,sans-serif]">
            {headerTitle}
          </p>
          <p className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/40 truncate">
            {headerSubtitle}
          </p>
        </div>

        <button
          onClick={onClose}
          title="Close"
          className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-black/35 hover:text-black hover:bg-black/[0.06] active:scale-90 transition-all duration-150"
        >
          <X size={16} />
        </button>
      </div>

      {isList ? (
        <ArtifactListView entries={artifacts} onOpen={onSelect} />
      ) : (
        <ArtifactDetailView
          key={selectedEntry.id}
          entry={selectedEntry}
          onBack={() => onSelect(null)}
          showBack={artifacts.length > 1}
          onWidthChange={onWidthChange}
        />
      )}
    </aside>
  );
}

export default ArtifactPanel;