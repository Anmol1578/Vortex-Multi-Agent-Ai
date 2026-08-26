// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import sendMessage from "../features/sendMessage";
// import { addMessages } from "../redux/messageSlice";
// import { createConversation } from "../features/createConversation";
// import {
//   setSelectedConversation,
//   addConversation,
//   setJustCreated,
//   setConvTitle,
// } from "../redux/conversationSlice";
// import { updateConversation } from "../features/updateConversation";

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

// const MODES = [
//   { id: "auto", label: "Auto" },
//   { id: "chat", label: "Chat" },
//   { id: "coding", label: "Coding" },
//   { id: "pdf", label: "PDF" },
//   { id: "ppt", label: "PPT" },
//   { id: "vision", label: "Image" },
//   { id: "search", label: "Search" },
// ];

// // TODO: replace with your real agent definitions (id, label, color per agent)
// const AGENTS = [
//   { id: "chat", label: "CHAT", color: "#1E7A56" },
//   { id: "coding", label: "CODING", color: "#5B4FC7" },
// ];

// function ChatInput({
//   input,
//   setInput,
//   mode,
//   setMode,
//   setThinking,
//   setActiveAgent,
// })

// const [selectedAgent , setSelectedAgent] = useState("Auto")

// {
//   const dispatch = useDispatch();
//   const { selectedConversation } = useSelector((state) => state.conversation);

//   const handleSendMessage = async () => {
//     let conversation = selectedConversation;

//     if (!conversation) {
//       conversation = await createConversation();
//       dispatch(addConversation(conversation));
//       dispatch(setJustCreated(true));
//       dispatch(setSelectedConversation(conversation));
//     }

//     const content = input.trim();
//     if (!content) return;

//     // Auto-title the conversation from the first message
//     if (conversation.title === "New Chat") {
//       const newTitle = content.slice(0, 60); // keep titles reasonably short
//       await updateConversation({ id: conversation._id, title: newTitle });
//       dispatch(
//         setConvTitle({
//           conversationId: conversation._id,
//           title: newTitle,
//         }),
//       );
//     }

//     const guessedId =
//       mode !== "auto"
//         ? mode
//         : /build|api|function|debug|code|endpoint/i.test(content)
//           ? "coding"
//           : "chat";
//     const agent =
//       AGENTS.find((a) => a.id === guessedId) ??
//       AGENTS.find((a) => a.id === "chat");

//     dispatch(addMessages({ role: "user", content }));
//     setInput("");
//     setThinking(true);
//     setActiveAgent(agent);

//     const payload = {
//       prompt: content,
//       conversationId: conversation?._id,
//     };

//     const data = await sendMessage(payload);

//     const replyContent =
//       typeof data === "string"
//         ? data
//         : (data?.content ?? "Something went wrong — no response from agent.");

//     dispatch(addMessages({ role: "agent", agent, content: replyContent }));
//     setThinking(false);
//     setActiveAgent(null);
//   };

//   return (
//     <div className="p-5 border-t border-black/[0.07] bg-white/25 backdrop-blur-xl z-10 overflow-hidden">
//       <div className="max-w-[820px] w-full mx-auto px-1 box-border">
//         <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar">
//           {MODES.map((m) => (
//             <button
//               key={m.id}
//               onClick={() => setMode(m.id)}
//               className={`shrink-0 text-xs font-[IBM_Plex_Mono,monospace] font-medium rounded-md px-3.5 py-1.5 border transition-all duration-300 ${
//                 mode === m.id
//                   ? "bg-[#14151A] border-transparent text-white hover:bg-[#1E7A56]"
//                   : "border-black/15 text-black/45 hover:text-[#1E7A56] hover:border-[#1E7A56]/40 hover:bg-[#1E7A56]/[0.05]"
//               }`}
//             >
//               {m.label}
//             </button>
//           ))}
//         </div>

//         <div className="rounded-lg border border-black/[0.08] bg-white shadow-[0_4px_20px_rgba(20,21,26,0.05)] px-4 py-3 focus-within:border-[#1E7A56]/50 transition-colors">
//           <textarea
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSendMessage();
//               }
//             }}
//             placeholder="Tell Vortex what to do…"
//             rows={1}
//             className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-black/30 max-h-40"
//           />
//           <div className="flex items-center justify-between mt-2">
//             <div className="flex items-center gap-3 text-black/35">
//               <button
//                 className="hover:text-[#1E7A56] transition-colors"
//                 aria-label="Attach file"
//               >
//                 <AttachIcon />
//               </button>
//               <button
//                 className="hover:text-[#1E7A56] transition-colors"
//                 aria-label="Voice input"
//               >
//                 <MicIcon />
//               </button>
//             </div>
//             <button
//               onClick={handleSendMessage}
//               disabled={!input.trim()}
//               className="rounded-md bg-[#14151A] p-2 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1E7A56] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(30,122,86,0.25)]"
//               aria-label="Send"
//             >
//               <SendIcon />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatInput;










// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserdata } from "../redux/userSlice";
// import sendMessage from "../features/sendMessage";
// import { addMessages } from "../redux/messageSlice";
// import { createConversation } from "../features/createConversation";
// import {
//   setSelectedConversation,
//   addConversation,
//   setJustCreated,
//   setConvTitle,
// } from "../redux/conversationSlice";
// import { updateConversation } from "../features/updateConversation";

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

// const MODES = [
//   { id: "auto", label: "Auto" },
//   { id: "chat", label: "Chat" },
//   { id: "coding", label: "Coding" },
//   { id: "pdf", label: "PDF" },
//   { id: "ppt", label: "PPT" },
//   { id: "vision", label: "Image" },
//   { id: "search", label: "Search" },
// ];

// // Every MODES entry needs a matching key here so mode -> agent always
// // resolves to a real agent instead of silently falling back to "chat".
// const MODE_AGENT_MAP = {
//   auto: { id: "auto", label: "AUTO", color: "#6B7280" },
//   chat: { id: "chat", label: "CHAT", color: "#1E7A56" },
//   coding: { id: "coding", label: "CODING", color: "#5B4FC7" },
//   pdf: { id: "pdf", label: "PDF", color: "#B45309" },
//   ppt: { id: "ppt", label: "PPT", color: "#B91C1C" },
//   vision: { id: "vision", label: "VISION", color: "#0369A1" },
//   search: { id: "search", label: "SEARCH", color: "#7C3AED" },
// };

// function ChatInput({
//   input,
//   setInput,
//   mode,
//   setMode,
//   setThinking,
//   setActiveAgent,
// }) {
//   const dispatch = useDispatch();
//   const { selectedConversation } = useSelector((state) => state.conversation);
//   const userData = useSelector((state) => state.user.userData);

//   // Keep the displayed "selected agent" in sync with whichever mode is
//   // active, using the map above instead of a separate AGENTS list whose
//   // ids didn't cover every mode.
//   const [selectedAgent, setSelectedAgent] = useState(MODE_AGENT_MAP.auto);

//   useEffect(() => {
//     setSelectedAgent(MODE_AGENT_MAP[mode] ?? MODE_AGENT_MAP.auto);
//   }, [mode]);

//   const handleSendMessage = async () => {
//     let conversation = selectedConversation;

//     if (!conversation) {
//       conversation = await createConversation();
//       dispatch(addConversation(conversation));
//       dispatch(setJustCreated(true));
//       dispatch(setSelectedConversation(conversation));
//     }

//     const content = input.trim();
//     if (!content) return;

//     // Auto-title the conversation from the first message
//     if (conversation.title === "New Chat") {
//       const newTitle = content.slice(0, 60); // keep titles reasonably short
//       await updateConversation({ id: conversation._id, title: newTitle });
//       dispatch(
//         setConvTitle({
//           conversationId: conversation._id,
//           title: newTitle,
//         }),
//       );
//     }

//     const guessedId =
//       mode !== "auto"
//         ? mode
//         : /build|api|function|debug|code|endpoint/i.test(content)
//           ? "coding"
//           : "chat";
//     const agent = MODE_AGENT_MAP[guessedId] ?? MODE_AGENT_MAP.chat;

//     dispatch(addMessages({ role: "user", content }));
//     setInput("");
//     setThinking(true);
//     setActiveAgent(agent);
//     setSelectedAgent(agent);

//     const payload = {
//       prompt: content,
//       conversationId: conversation?._id,
//       agent: mode,
//     };

// //     try {
// //     const data = await sendMessage(payload);

// //     const replyContent =
// //       typeof data === "string"
// //         ? data
// //         : (data?.content ?? "Something went wrong — no response from agent.");

// //     dispatch(
// //       addMessages({
// //         role: "agent",
// //         agent: data?.agent ?? agent,
// //         content: replyContent,
// //         images: data?.images,
// //         artifacts: data?.artifacts,
// //       }),
// //     );
// //      } catch (error) {
// //     const status = error.response?.status;
// //     const errData = error.response?.data;

// //     const isCreditsError = status === 402 || errData?.code === "INSUFFICIENT_CREDITS";

// //     dispatch(
// //       addMessages({
// //         role: "agent",
// //         agent,
// //         content: isCreditsError
// //           ? `⚡ Not enough credits — you have ${errData?.credits} Credits, this needs ${errData?.requiredCredits} Credits. Upgrade your plan to continue.`
// //           : "Something went wrong. Please try again.",
// //         isError: true,
// // isCreditsError,
// //       }),
// //     );
// //   } finally {
// //     setThinking(false);
// //     setActiveAgent(null);
// //     }
// //   };

//     try {
//     const data = await sendMessage(payload);

//     const replyContent =
//       typeof data === "string"
//         ? data
//         : (data?.content ?? "Something went wrong — no response from agent.");

//     if (typeof data?.credits === "number" && userData) {
//       dispatch(setUserdata({ ...userData, credits: data.credits }));
//     }

//     dispatch(
//       addMessages({
//         role: "agent",
//         agent: data?.agent ?? agent,
//         content: replyContent,
//         images: data?.images,
//         artifacts: data?.artifacts,
//       }),
//     );
//      } catch (error) {
//     const status = error.response?.status;
//     const errData = error.response?.data;

//     const isCreditsError = status === 402 || errData?.code === "INSUFFICIENT_CREDITS";

//     if (isCreditsError && typeof errData?.credits === "number" && userData) {
//       dispatch(setUserdata({ ...userData, credits: errData.credits }));
//     }

//     dispatch(
//       addMessages({
//         role: "agent",
//         agent,
//         content: isCreditsError
//           ? `⚡ Not enough credits — you have ${errData?.credits} Credits, this needs ${errData?.requiredCredits} Credits. Upgrade your plan to continue.`
//           : "Something went wrong. Please try again.",
//         isError: true,
// isCreditsError,
//       }),
//     );
//   } finally {
//     setThinking(false);
//     setActiveAgent(null);
//     }
//   };

//   return (
//     <div className="p-5 border-t border-black/[0.07] bg-white/25 backdrop-blur-xl z-10 overflow-hidden">

//       <div className="max-w-[820px] w-full mx-auto px-1 box-border">
//         <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar">
//           {MODES.map((m) => (
//             <button
//               key={m.id}
//               onClick={() => setMode(m.id)}
//               className={`shrink-0 text-xs font-[IBM_Plex_Mono,monospace] font-medium rounded-md px-3.5 py-1.5 border transition-all duration-300 ${
//                 mode === m.id
//                   ? "bg-[#14151A] border-transparent text-white hover:bg-[#1E7A56]"
//                   : "border-black/15 text-black/45 hover:text-[#1E7A56] hover:border-[#1E7A56]/40 hover:bg-[#1E7A56]/[0.05]"
//               }`}
//             >
//               {m.label}
//             </button>
//           ))}
//         </div>

//         <div className="rounded-lg border border-black/[0.08] bg-white shadow-[0_4px_20px_rgba(20,21,26,0.05)] px-4 py-3 focus-within:border-[#1E7A56]/50 transition-colors">
//           <textarea
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSendMessage();
//               }
//             }}
//             placeholder="Tell Vortex what to do…"
//             rows={1}
//             className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-black/30 max-h-40"
//           />
//           <div className="flex items-center justify-between mt-2">
//             <div className="flex items-center gap-3 text-black/35">
//               <button
//                 className="hover:text-[#1E7A56] transition-colors"
//                 aria-label="Attach file"
//               >
//                 <AttachIcon />
//               </button>
//               <button
//                 className="hover:text-[#1E7A56] transition-colors"
//                 aria-label="Voice input"
//               >
//                 <MicIcon />
//               </button>
//             </div>
//             <button
//               onClick={handleSendMessage}
//               disabled={!input.trim()}
//               className="rounded-md bg-[#14151A] p-2 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1E7A56] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(30,122,86,0.25)]"
//               aria-label="Send"
//             >
//               <SendIcon />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatInput;


import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata } from "../redux/userSlice";
import sendMessage from "../features/sendMessage";
import { addMessages } from "../redux/messageSlice";
import { createConversation } from "../features/createConversation";
import {
  setSelectedConversation,
  addConversation,
  setJustCreated,
  setConvTitle,
} from "../redux/conversationSlice";
import { updateConversation } from "../features/updateConversation";

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
function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

// pdfRag / imageAnalyzer are intentionally NOT here — they're invisible,
// auto-detected agents (like Claude/ChatGPT), not user-facing modes.
// Attaching a PDF or image while mode="auto" lets router.js's
// deterministicFileDefault route it correctly with no button needed.
const MODES = [
  { id: "auto", label: "Auto" },
  { id: "chat", label: "Chat" },
  { id: "coding", label: "Coding" },
  { id: "pdf", label: "PDF" },
  { id: "ppt", label: "PPT" },
  { id: "vision", label: "Image" },
  { id: "search", label: "Search" },
];

// Every MODES entry needs a matching key here so mode -> agent always
// resolves to a real agent instead of silently falling back to "chat".
// pdfRag/imageAnalyzer stay in this map (not in MODES) since
// selectedAgent/activeAgent still need to display their label+color
// once the backend tells us that's what actually ran.
const MODE_AGENT_MAP = {
  auto: { id: "auto", label: "AUTO", color: "#6B7280" },
  chat: { id: "chat", label: "CHAT", color: "#1E7A56" },
  coding: { id: "coding", label: "CODING", color: "#5B4FC7" },
  pdf: { id: "pdf", label: "PDF", color: "#B45309" },
  pdfRag: { id: "pdfRag", label: "DOC INTELLIGENCE", color: "#92400E" },
  ppt: { id: "ppt", label: "PPT", color: "#B91C1C" },
  vision: { id: "vision", label: "VISION", color: "#0369A1" },
  imageAnalyzer: { id: "imageAnalyzer", label: "Vision Intelligence", color: "#075985" },
  search: { id: "search", label: "SEARCH", color: "#7C3AED" },
};

const ACCEPTED_FILE_TYPES = ".pdf,image/*";

function ChatInput({
  input,
  setInput,
  mode,
  setMode,
  setThinking,
  setActiveAgent,
}) {
  const dispatch = useDispatch();
  const { selectedConversation } = useSelector((state) => state.conversation);
  const userData = useSelector((state) => state.user.userData);

  const [selectedAgent, setSelectedAgent] = useState(MODE_AGENT_MAP.auto);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    setSelectedAgent(MODE_AGENT_MAP[mode] ?? MODE_AGENT_MAP.auto);
  }, [mode]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // No mode switch here — stays "auto" (or whatever the user picked),
      // and the backend router decides pdfRag vs imageAnalyzer vs pdf/vision
      // from the file + prompt, same as Claude/ChatGPT.
    }
    // reset so re-selecting the same file re-fires onChange
    e.target.value = "";
  };

  const clearFile = () => setSelectedFile(null);

  const handleSendMessage = async () => {
    let conversation = selectedConversation;

    if (!conversation) {
      conversation = await createConversation();
      dispatch(addConversation(conversation));
      dispatch(setJustCreated(true));
      dispatch(setSelectedConversation(conversation));
    }

    const content = input.trim();

    // A file alone is a valid request (e.g. "analyze this image"), so don't
    // block on empty text — only block if there's truly nothing to send.
    if (!content && !selectedFile) return;

    // Neither pdfRag nor imageAnalyzer should ever see an empty prompt —
    // pdfRag throws on it, and even though imageAnalyzer defaults on its
    // own, being explicit here keeps behavior consistent either way.
    const effectivePrompt =
      !content && selectedFile
        ? selectedFile.type === "application/pdf"
          ? "Summarize the key points of this document."
          : "Analyze this image in detail and describe what you see."
        : content;

    if (conversation.title === "New Chat" && effectivePrompt) {
      const newTitle = effectivePrompt.slice(0, 60);
      await updateConversation({ id: conversation._id, title: newTitle });
      dispatch(setConvTitle({ conversationId: conversation._id, title: newTitle }));
    }

    // Client-side guess only for the typing indicator label — the real
    // decision is router.js's, using the actual file mimetype + prompt.
    const guessedId =
      mode !== "auto"
        ? mode
        : selectedFile?.type === "application/pdf"
          ? "pdfRag"
          : selectedFile?.type?.startsWith("image/")
            ? "imageAnalyzer"
            : /build|api|function|debug|code|endpoint/i.test(effectivePrompt)
              ? "coding"
              : "chat";
    const agent = MODE_AGENT_MAP[guessedId] ?? MODE_AGENT_MAP.chat;

    dispatch(
      addMessages({
        role: "user",
        content: content || `[Attached: ${selectedFile?.name}]`,
        fileName: selectedFile?.name,
      }),
    );

    setInput("");
    const fileToSend = selectedFile;
    setSelectedFile(null);
    setThinking(true);
    setActiveAgent(agent);
    setSelectedAgent(agent);

    // Build the request as FormData so a File object actually survives
    // the network hop — a plain object here would get JSON.stringify'd
    // and silently drop the file.
    const formData = new FormData();
    formData.append("prompt", effectivePrompt);
    formData.append("conversationId", conversation?._id ?? "");
    formData.append("agent", mode); // "auto" unless the user explicitly picked a visible mode
    if (fileToSend) {
      formData.append("file", fileToSend);
    }

    try {
      const data = await sendMessage(formData);

      const replyContent =
        typeof data === "string"
          ? data
          : (data?.content ?? "Something went wrong — no response from agent.");

      if (typeof data?.credits === "number" && userData) {
        dispatch(setUserdata({ ...userData, credits: data.credits }));
      }

      dispatch(
        addMessages({
          role: "agent",
          agent: data?.agent ?? agent,
          content: replyContent,
          images: data?.images,
          artifacts: data?.artifacts,
        }),
      );
    } catch (error) {
      const status = error.response?.status;
      const errData = error.response?.data;

      const isCreditsError = status === 402 || errData?.code === "INSUFFICIENT_CREDITS";

      if (isCreditsError && typeof errData?.credits === "number" && userData) {
        dispatch(setUserdata({ ...userData, credits: errData.credits }));
      }

      dispatch(
        addMessages({
          role: "agent",
          agent,
          content: isCreditsError
            ? `⚡ Not enough credits — you have ${errData?.credits} Credits, this needs ${errData?.requiredCredits} Credits. Upgrade your plan to continue.`
            : "Something went wrong. Please try again.",
          isError: true,
          isCreditsError,
        }),
      );
    } finally {
      setThinking(false);
      setActiveAgent(null);
    }
  };

  return (
    <div className="p-5 border-t border-black/[0.07] bg-white/25 backdrop-blur-xl z-10 overflow-hidden">
      <div className="max-w-[820px] w-full mx-auto px-1 box-border">
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
          {selectedFile && (
            <div className="flex items-center gap-2 mb-2 px-2.5 py-1.5 rounded-md bg-black/[0.04] text-xs text-black/60 w-fit max-w-full">
              <FileIcon />
              <span className="truncate max-w-[200px]">{selectedFile.name}</span>
              <button
                onClick={clearFile}
                className="text-black/40 hover:text-red-500 transition-colors ml-1"
                aria-label="Remove file"
              >
                ×
              </button>
            </div>
          )}

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Tell Vortex what to do…"
            rows={1}
            className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-black/30 max-h-40"
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3 text-black/35">
              <input
                type="file"
                accept={ACCEPTED_FILE_TYPES}
                hidden
                ref={fileRef}
                onChange={handleFileChange}
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="hover:text-[#1E7A56] transition-colors"
                aria-label="Attach file"
              >
                <AttachIcon />
              </button>
              <button
                className="hover:text-[#1E7A56] transition-colors"
                aria-label="Voice input"
              >
                <MicIcon />
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() && !selectedFile}
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