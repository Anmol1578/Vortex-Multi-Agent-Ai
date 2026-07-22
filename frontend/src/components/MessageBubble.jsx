// import React from "react";
// import Markdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

// /* ------------------------- icons used only here ------------------------- */

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

// /* ------------------------- artifact extraction ------------------------- */

// // Defensive: some stored/incoming messages can have missing or non-string
// // `content` (e.g. an older stub agent once saved a message with no content
// // field to the DB). Never let that crash the whole message list.
// function extractArtifact(content) {
//   if (typeof content !== "string" || !content) {
//     return { text: "", artifact: null };
//   }
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

// /* ------------------------- markdown renderers ------------------------- */

// const markdownComponents = {
//   a: ({ children, ...props }) => (
//     <a
//       {...props}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="text-[#1E7A56] hover:underline"
//     >
//       {children}
//     </a>
//   ),
//   code: ({ className, children, ...props }) => {
//     const match = /language-(\w+)/.exec(className || "");
//     const codeText = String(children).replace(/\n$/, "");

//     if (!match) {
//       return (
//         <code
//           className="bg-black/[0.06] rounded px-1 py-0.5 text-[13px]"
//           {...props}
//         >
//           {children}
//         </code>
//       );
//     }

//     return (
//       <SyntaxHighlighter
//         language={match[1]}
//         style={oneLight}
//         customStyle={{
//           borderRadius: "8px",
//           fontSize: "12.5px",
//           margin: "0.5rem 0",
//         }}
//       >
//         {codeText}
//       </SyntaxHighlighter>
//     );
//   },
// };

// /* --------------------------- message bubble --------------------------- */

// function MessageBubble({ message, onOpenArtifact }) {
//   if (!message) return null;

//   if (message.role === "user") {
//     return (
//       <div className="flex justify-end motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
//         <div className="max-w-[80%] rounded-lg rounded-tr-sm bg-[#14151A] text-white text-sm px-4 py-3">
//           {message.content ?? ""}
//         </div>
//       </div>
//     );
//   }

//   const { text, artifact } = extractArtifact(message.content);
//   const agent = message.agent;
//   const hasFallback = !text && !artifact;

//   return (
//     <div className="flex justify-start motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
//       <div className="max-w-[85%] w-full">
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
//           {hasFallback && (
//             <span className="text-black/35 italic">
//               (this message has no content)
//             </span>
//           )}
//           {text && (
//             <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-headings:my-2 prose-ul:my-1.5 prose-ol:my-1.5">
//               <Markdown components={markdownComponents}>{text}</Markdown>
//             </div>
//           )}
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

// export default MessageBubble;

// import React from "react";
// import Markdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

// /* ------------------------- icons used only here ------------------------- */

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

// /* ------------------------- artifact extraction ------------------------- */

// // Defensive: some stored/incoming messages can have missing or non-string
// // `content` (e.g. an older stub agent once saved a message with no content
// // field to the DB). Never let that crash the whole message list.
// function extractArtifact(content) {
//   if (typeof content !== "string" || !content) {
//     return { text: "", artifact: null };
//   }
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

// /* ------------------------- image grid ------------------------- */

// // Tavily can return images as plain URL strings, or (with
// // includeImageDescriptions) as { url, description } objects.
// // Handle both without crashing.
// function ImageGrid({ images }) {
//   if (!Array.isArray(images) || images.length === 0) return null;

//   return (
//     <div className="grid grid-cols-2 gap-2 pt-1">
//       {images.map((img, idx) => {
//         const src = typeof img === "string" ? img : img?.url;
//         const alt = typeof img === "string" ? "" : (img?.description ?? "");
//         if (!src) return null;

//         return (
//           <a
//             key={idx}
//             href={src}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block rounded-lg overflow-hidden border border-black/[0.07] hover:opacity-90 transition-opacity"
//           >
//             <img
//               src={src}
//               alt={alt}
//               loading="lazy"
//               className="w-full h-32 object-cover"
//               onError={(e) => {
//                 e.currentTarget.parentElement.style.display = "none";
//               }}
//             />
//           </a>
//         );
//       })}
//     </div>
//   );
// }

// /* ------------------------- markdown renderers ------------------------- */

// const markdownComponents = {
//   a: ({ children, ...props }) => (
//     <a
//       {...props}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="text-[#1E7A56] hover:underline"
//     >
//       {children}
//     </a>
//   ),
//   code: ({ className, children, ...props }) => {
//     const match = /language-(\w+)/.exec(className || "");
//     const codeText = String(children).replace(/\n$/, "");

//     if (!match) {
//       return (
//         <code
//           className="bg-black/[0.06] rounded px-1 py-0.5 text-[13px]"
//           {...props}
//         >
//           {children}
//         </code>
//       );
//     }

//     return (
//       <SyntaxHighlighter
//         language={match[1]}
//         style={oneLight}
//         customStyle={{
//           borderRadius: "8px",
//           fontSize: "12.5px",
//           margin: "0.5rem 0",
//         }}
//       >
//         {codeText}
//       </SyntaxHighlighter>
//     );
//   },
// };

// /* --------------------------- message bubble --------------------------- */

// function MessageBubble({ message, onOpenArtifact }) {
//   if (!message) return null;

//   if (message.role === "user") {
//     return (
//       <div className="flex justify-end motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
//         <div className="max-w-[80%] rounded-lg rounded-tr-sm bg-[#14151A] text-white text-sm px-4 py-3">
//           {message.content ?? ""}
//         </div>
//       </div>
//     );
//   }

//   const { text, artifact } = extractArtifact(message.content);
//   const agent = message.agent;
//   const images = message.images;
//   const hasImages = Array.isArray(images) && images.length > 0;
//   const hasFallback = !text && !artifact && !hasImages;

//   return (
//     <div className="flex justify-start motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
//       <div className="max-w-[85%] w-full">
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
//           {hasFallback && (
//             <span className="text-black/35 italic">
//               (this message has no content)
//             </span>
//           )}
//           {text && (
//             <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-headings:my-2 prose-ul:my-1.5 prose-ol:my-1.5">
//               <Markdown components={markdownComponents}>{text}</Markdown>
//             </div>
//           )}
//           {artifact && (
//             <ArtifactCard
//               artifact={artifact}
//               onOpen={() => onOpenArtifact(artifact)}
//             />
//           )}
//           {hasImages && <ImageGrid images={images} />}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MessageBubble;

// import React, { useState, useEffect } from "react";
// import { createPortal } from "react-dom";
// import Markdown from "react-markdown";
// import remarkGfm from 'remark-gfm'
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

// /* ------------------------- icons used only here ------------------------- */

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

// /* ------------------------- artifact extraction ------------------------- */

// // Defensive: some stored/incoming messages can have missing or non-string
// // `content` (e.g. an older stub agent once saved a message with no content
// // field to the DB). Never let that crash the whole message list.
// function extractArtifact(content) {
//   if (typeof content !== "string" || !content) {
//     return { text: "", artifact: null };
//   }
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

// /* ------------------------- image grid ------------------------- */

// // Tavily can return images as plain URL strings, or (with
// // includeImageDescriptions) as { url, description } objects.
// // Handle both without crashing.
// function ImageGrid({ images, onImageClick }) {
//   if (!Array.isArray(images) || images.length === 0) return null;

//   return (
//     <div className="grid grid-cols-2 gap-2 pt-1">
//       {images.map((img, idx) => {
//         const src = typeof img === "string" ? img : img?.url;
//         const alt = typeof img === "string" ? "" : (img?.description ?? "");
//         if (!src) return null;

//         return (
//           <button
//             key={idx}
//             type="button"
//             onClick={() => onImageClick({ src, alt })}
//             className="block rounded-lg overflow-hidden border border-black/[0.07] hover:opacity-90 transition-opacity cursor-zoom-in"
//           >
//             <img
//               src={src}
//               alt={alt}
//               loading="lazy"
//               className="w-full h-32 object-cover"
//               onError={(e) => {
//                 e.currentTarget.parentElement.style.display = "none";
//               }}
//             />
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// /* ------------------------- image lightbox ------------------------- */

// function CloseIcon() {
//   return (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="white"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6L6 18M6 6l12 12" />
//     </svg>
//   );
// }

// function ImageLightbox({ image, onClose }) {
//   // Close on Escape, and lock background scroll while open.
//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     document.addEventListener("keydown", handleKey);
//     const prevOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.removeEventListener("keydown", handleKey);
//       document.body.style.overflow = prevOverflow;
//     };
//   }, [onClose]);

//   if (!image) return null;

//   return createPortal(
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-md motion-safe:animate-[fadeUp_0.2s_ease-out_both]"
//       onClick={onClose}
//     >
//       <button
//         type="button"
//         onClick={onClose}
//         aria-label="Close"
//         className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
//       >
//         <CloseIcon />
//       </button>
//       <img
//         src={image.src}
//         alt={image.alt}
//         onClick={(e) => e.stopPropagation()}
//         className="max-w-full max-h-full rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.5)] object-contain"
//       />
//       {image.alt && (
//         <p
//           onClick={(e) => e.stopPropagation()}
//           className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-[80%] text-center text-white/80 text-xs font-[IBM_Plex_Mono,monospace] px-3"
//         >
//           {image.alt}
//         </p>
//       )}
//     </div>,
//     document.body,
//   );
// }

// /* ------------------------- markdown renderers ------------------------- */

// const markdownComponents = {
//   a: ({ children, ...props }) => (
//     <a
//       {...props}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="text-[#1E7A56] hover:underline"
//     >
//       {children}
//     </a>
//   ),
//   code: ({ className, children, ...props }) => {
//     const match = /language-(\w+)/.exec(className || "");
//     const codeText = String(children).replace(/\n$/, "");

//     if (!match) {
//       return (
//         <code
//           className="bg-black/[0.06] rounded px-1 py-0.5 text-[13px]"
//           {...props}
//         >
//           {children}
//         </code>
//       );
//     }

//     return (
//       <SyntaxHighlighter
//         language={match[1]}
//         style={oneLight}
//         customStyle={{
//           borderRadius: "8px",
//           fontSize: "12.5px",
//           margin: "0.5rem 0",
//         }}
//       >
//         {codeText}
//       </SyntaxHighlighter>
//     );
//   },
// };

// /* --------------------------- message bubble --------------------------- */

// function MessageBubble({ message, onOpenArtifact }) {
//   const [lightboxImage, setLightboxImage] = useState(null);

//   if (!message) return null;

//   if (message.role === "user") {
//     return (
//       <div className="flex justify-end motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
//         <div className="max-w-[80%] rounded-lg rounded-tr-sm bg-[#14151A] text-white text-sm px-4 py-3">
//           {message.content ?? ""}
//         </div>
//       </div>
//     );
//   }

//   const { text, artifact } = extractArtifact(message.content);
//   const agent = message.agent;
//   const images = message.images;
//   const hasImages = Array.isArray(images) && images.length > 0;
//   const hasFallback = !text && !artifact && !hasImages;

//   return (
//     <div className="flex justify-start motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
//       <div className="max-w-[85%] w-full">
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
//           {hasFallback && (
//             <span className="text-black/35 italic">
//               (this message has no content)
//             </span>
//           )}
//           {text && (
//             <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-headings:my-2 prose-ul:my-1.5 prose-ol:my-1.5">
//               <Markdown components={markdownComponents}>{text}</Markdown>
//             </div>
//           )}
//           {artifact && (
//             <ArtifactCard
//               artifact={artifact}
//               onOpen={() => onOpenArtifact(artifact)}
//             />
//           )}
//           {hasImages && (
//             <ImageGrid images={images} onImageClick={setLightboxImage} />
//           )}
//         </div>
//       </div>
//       <ImageLightbox
//         image={lightboxImage}
//         onClose={() => setLightboxImage(null)}
//       />
//     </div>
//   );
// }

// export default MessageBubble;











import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

/* ------------------------- icons used only here ------------------------- */

function CodeGlyphIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#5B4FC7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

/* ------------------------- artifact extraction ------------------------- */

// Defensive: some stored/incoming messages can have missing or non-string
// `content` (e.g. an older stub agent once saved a message with no content
// field to the DB). Never let that crash the whole message list.
function extractArtifact(content) {
  if (typeof content !== "string" || !content) {
    return { text: "", artifact: null };
  }
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

/* ------------------------- image grid ------------------------- */

// Tavily can return images as plain URL strings, or (with
// includeImageDescriptions) as { url, description } objects.
// Handle both without crashing.
function ImageGrid({ images, onImageClick }) {
  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-2 pt-1">
      {images.map((img, idx) => {
        const src = typeof img === "string" ? img : img?.url;
        const alt = typeof img === "string" ? "" : (img?.description ?? "");
        if (!src) return null;

        return (
          <button
            key={idx}
            type="button"
            onClick={() => onImageClick({ src, alt })}
            className="block rounded-lg overflow-hidden border border-black/[0.07] hover:opacity-90 transition-opacity cursor-zoom-in"
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="w-full h-32 object-cover"
              onError={(e) => {
                e.currentTarget.parentElement.style.display = "none";
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------- image lightbox ------------------------- */

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ImageLightbox({ image, onClose }) {
  // Close on Escape, and lock background scroll while open.
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!image) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-md motion-safe:animate-[fadeUp_0.2s_ease-out_both]"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <CloseIcon />
      </button>
      <img
        src={image.src}
        alt={image.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-full rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.5)] object-contain"
      />
      {image.alt && (
        <p
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-[80%] text-center text-white/80 text-xs font-[IBM_Plex_Mono,monospace] px-3"
        >
          {image.alt}
        </p>
      )}
    </div>,
    document.body,
  );
}

/* ------------------------- markdown renderers ------------------------- */

const markdownComponents = {
  a: ({ children, ...props }) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#1E7A56] hover:underline"
    >
      {children}
    </a>
  ),
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const codeText = String(children).replace(/\n$/, "");

    if (!match) {
      return (
        <code
          className="bg-black/[0.06] rounded px-1 py-0.5 text-[13px]"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <SyntaxHighlighter
        language={match[1]}
        style={oneLight}
        customStyle={{
          borderRadius: "8px",
          fontSize: "12.5px",
          margin: "0.5rem 0",
        }}
      >
        {codeText}
      </SyntaxHighlighter>
    );
  },
};

/* --------------------------- message bubble --------------------------- */

function MessageBubble({ message, onOpenArtifact }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!message) return null;

  if (message.role === "user") {
    return (
      <div className="flex justify-end motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
        <div className="max-w-[80%] rounded-lg rounded-tr-sm bg-[#14151A] text-white text-sm px-4 py-3">
          {message.content ?? ""}
        </div>
      </div>
    );
  }

  const { text, artifact } = extractArtifact(message.content);
  const agent = message.agent;
  const images = message.images;
  const hasImages = Array.isArray(images) && images.length > 0;
  const hasFallback = !text && !artifact && !hasImages;

  return (
    <div className="flex justify-start motion-safe:animate-[fadeUp_0.35s_ease-out_both]">
      <div className="max-w-[85%] w-full">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: agent?.color ?? "#1E7A56" }}
          />
          <span
            className="text-[11px] font-[IBM_Plex_Mono,monospace] font-medium"
            style={{ color: agent?.color ?? "#1E7A56" }}
          >
            {agent?.label ?? "VORTEX"}
          </span>
        </div>
        <div className="rounded-lg rounded-tl-sm border border-black/[0.07] bg-white text-sm px-4 py-3 text-black/80 shadow-[0_2px_10px_rgba(20,21,26,0.04)] space-y-3">
          {hasFallback && (
            <span className="text-black/35 italic">
              (this message has no content)
            </span>
          )}
          {text && (
            <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-headings:my-2 prose-ul:my-1.5 prose-ol:my-1.5">
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {text}
              </Markdown>
            </div>
          )}
          {artifact && (
            <ArtifactCard
              artifact={artifact}
              onOpen={() => onOpenArtifact(artifact)}
            />
          )}
          {hasImages && (
            <ImageGrid images={images} onImageClick={setLightboxImage} />
          )}
        </div>
      </div>
      <ImageLightbox
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
}

export default MessageBubble;
