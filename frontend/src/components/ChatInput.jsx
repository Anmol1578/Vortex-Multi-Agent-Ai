// import React , {useState} from "react";
// import sendMessage from '../features/sendMessage'
// import { useSelector } from "react-redux";
// function AttachIcon() {
//   return (
//     <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//       <path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.19 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
//     </svg>
//   );
// }
// function MicIcon() {
//   return (
//     <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//       <rect x="9" y="2" width="6" height="12" rx="3" />
//       <path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
//     </svg>
//   );
// }
// function SendIcon() {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
//   { id: "vision", label: "Vision" },
//   { id: "search", label: "Search" },
// ];

// function ChatInput({ input, setInput, mode, setMode, onSend }) {

//    const { selectedConversation } = useSelector((state) => state.conversation);

// const handleSendMessage = async ()=>{
//   const payload = {
//      prompt:setInput.trim(), conversationId:selectedConversation?._id
//   }
//   const data= await sendMessage(payload)
//   console.log(data)
// }

//   return (
//     <div className="p-5 border-t border-black/[0.07] bg-white/25 backdrop-blur-xl z-10">
//       <div className="max-w-2xl mx-auto">
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
//                 onSend();
//               }
//             }}
//             placeholder="Tell Vortex what to do…"
//             rows={1}
//             className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-black/30 max-h-40"
//           />
//           <div className="flex items-center justify-between mt-2">
//             <div className="flex items-center gap-3 text-black/35">
//               <button className="hover:text-[#1E7A56] transition-colors" aria-label="Attach file">
//                 <AttachIcon />
//               </button>
//               <button className="hover:text-[#1E7A56] transition-colors" aria-label="Voice input">
//                 <MicIcon />
//               </button>
//             </div>
//             <button
//               onClick={onSend}
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




import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.19 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}
function MicIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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
  { id: "vision", label: "Image" },
  { id: "search", label: "Search" },
];

// Every MODES entry needs a matching key here so mode -> agent always
// resolves to a real agent instead of silently falling back to "chat".
const MODE_AGENT_MAP = {
  auto: { id: "auto", label: "AUTO", color: "#6B7280" },
  chat: { id: "chat", label: "CHAT", color: "#1E7A56" },
  coding: { id: "coding", label: "CODING", color: "#5B4FC7" },
  pdf: { id: "pdf", label: "PDF", color: "#B45309" },
  ppt: { id: "ppt", label: "PPT", color: "#B91C1C" },
  vision: { id: "vision", label: "VISION", color: "#0369A1" },
  search: { id: "search", label: "SEARCH", color: "#7C3AED" },
};

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

  // Keep the displayed "selected agent" in sync with whichever mode is
  // active, using the map above instead of a separate AGENTS list whose
  // ids didn't cover every mode.
  const [selectedAgent, setSelectedAgent] = useState(MODE_AGENT_MAP.auto);

  useEffect(() => {
    setSelectedAgent(MODE_AGENT_MAP[mode] ?? MODE_AGENT_MAP.auto);
  }, [mode]);

  const handleSendMessage = async () => {
    let conversation = selectedConversation;

    if (!conversation) {
      conversation = await createConversation();
      dispatch(addConversation(conversation));
      dispatch(setJustCreated(true));
      dispatch(setSelectedConversation(conversation));
    }

    const content = input.trim();
    if (!content) return;

    // Auto-title the conversation from the first message
    if (conversation.title === "New Chat") {
      const newTitle = content.slice(0, 60); // keep titles reasonably short
      await updateConversation({ id: conversation._id, title: newTitle });
      dispatch(
        setConvTitle({
          conversationId: conversation._id,
          title: newTitle,
        }),
      );
    }

    const guessedId =
      mode !== "auto"
        ? mode
        : /build|api|function|debug|code|endpoint/i.test(content)
          ? "coding"
          : "chat";
    const agent = MODE_AGENT_MAP[guessedId] ?? MODE_AGENT_MAP.chat;

    dispatch(addMessages({ role: "user", content }));
    setInput("");
    setThinking(true);
    setActiveAgent(agent);
    setSelectedAgent(agent);

    const payload = {
      prompt: content,
      conversationId: conversation?._id,
      agent: mode,
    };

    const data = await sendMessage(payload);

    const replyContent =
      typeof data === "string"
        ? data
        : (data?.content ?? "Something went wrong — no response from agent.");

    dispatch(
      addMessages({
        role: "agent",
        agent: data?.agent ?? agent,
        content: replyContent,
       images: data?.images,
      }),
    );
    setThinking(false);
    setActiveAgent(null);
  };

  return (
    <div className="p-5 border-t border-black/[0.07] bg-white/25 backdrop-blur-xl z-10 overflow-hidden">
      {/*
        NOTE: previously this wrapper used `-translate-x-[5%]` to nudge the
        input for the future artifact panel. `transform` shifts the box
        visually without changing layout, so it could visually slide left
        over the sidebar's edge whenever the sidebar was open at a wider
        (custom) size. Using width/padding instead keeps it layout-safe —
        it will never overlap a sibling like the sidebar.
      */}
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
              <button
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
