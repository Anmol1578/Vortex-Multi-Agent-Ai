// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Nav from "./Nav";
// import MessageList from "./MessageList";
// import ChatInput from "./ChatInput";
// // import ArtifactPanel from "./artifact";
// import getMessages from "../features/getMessages";
// import { setMessages } from "../redux/messageSlice";
// import { setJustCreated } from "../redux/conversationSlice";

// function ChatArea() {
//   const dispatch = useDispatch();

//   const { selectedConversation } = useSelector((state) => state.conversation);
//   const messages = useSelector((state) => state.message.messages ?? []);

//   const [mode, setMode] = useState("auto");
//   const [input, setInput] = useState("");
//   const [activeAgent, setActiveAgent] = useState(null);
//   const [thinking, setThinking] = useState(false);
//   const [activeArtifact, setActiveArtifact] = useState(null);
//   const scrollRef = useRef(null);

//   // Fetch messages whenever the selected conversation changes

//    useEffect(() => {
//     if (!selectedConversation?._id) {
//       dispatch(setMessages([]));
//       return;
//     }

//     if (justCreated) {
//       // Freshly created client-side — nothing on the backend yet, skip fetch.
//       dispatch(setJustCreated(false));
//       return;
//     }

//     // const loadMessages = async () => {
//     //   const data = await getMessages(selectedConversation._id);
//     //   dispatch(setMessages(Array.isArray(data) ? data : []));
//     // };

//     const idAtRequestTime = selectedConversation._id;

//     const loadMessages = async () => {
//   const data = await getMessages(idAtRequestTime);
//   // ignore if the user has since switched conversations
//   if (idAtRequestTime !== selectedConversation?._id)
//     return;
//   dispatch(setMessages(Array.isArray(data) ? data : []));
// };

//     loadMessages();
//   }, [selectedConversation?._id, justCreated, dispatch]);

//   useEffect(() => {
//     scrollRef.current?.scrollTo({
//       top: scrollRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [messages, thinking]);

//   return (
//     <div className="flex-1 flex flex-col min-w-0 relative">
//       {/* ...styles unchanged... */}

//       <Nav />

//       <MessageList
//         messages={messages}
//         thinking={thinking}
//         activeAgent={activeAgent}
//         onSuggest={(text) => setInput(text)}
//         onOpenArtifact={setActiveArtifact}
//         scrollRef={scrollRef}
//       />

//       <ChatInput
//         input={input}
//         setInput={setInput}
//         mode={mode}
//         setMode={setMode}
//         setThinking={setThinking}
//         setActiveAgent={setActiveAgent}
//       />

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
// import { useDispatch, useSelector } from "react-redux";
// import Nav from "./Nav";
// import MessageList from "./MessageList";
// import ChatInput from "./ChatInput";
// import ArtifactPanel from "../components/ArtifactPanel";
// import getMessages from "../features/getMessages";
// import { setMessages } from "../redux/messageSlice";
// import { setJustCreated } from "../redux/conversationSlice";

// function ChatArea() {
//   const dispatch = useDispatch();

//   const { selectedConversation, justCreated } = useSelector(
//     (state) => state.conversation,
//   );
//   const messages = useSelector((state) => state.message.messages ?? []);

//   const [mode, setMode] = useState("auto");
//   const [input, setInput] = useState("");
//   const [activeAgent, setActiveAgent] = useState(null);
//   const [thinking, setThinking] = useState(false);
//   const [activeArtifact, setActiveArtifact] = useState(null);
//   const scrollRef = useRef(null);

//   // Mirror justCreated into a ref so toggling it doesn't retrigger the fetch effect
//   const justCreatedRef = useRef(justCreated);
//   useEffect(() => {
//     justCreatedRef.current = justCreated;
//   }, [justCreated]);

//   // Fetch messages whenever the selected conversation changes
//   useEffect(() => {
//     if (!selectedConversation?._id) {
//       dispatch(setMessages([]));
//       return;
//     }

//     if (justCreatedRef.current) {
//       // Freshly created client-side — nothing on the backend yet, skip fetch.
//       dispatch(setJustCreated(false));
//       return;
//     }

//     const idAtRequestTime = selectedConversation._id;

//     const loadMessages = async () => {
//       const data = await getMessages(idAtRequestTime);
//       // ignore if the user has since switched conversations
//       if (idAtRequestTime !== selectedConversation?._id) return;
//       dispatch(setMessages(Array.isArray(data) ? data : []));
//     };

//     loadMessages();
//   }, [selectedConversation?._id, dispatch]);

//   useEffect(() => {
//     scrollRef.current?.scrollTo({
//       top: scrollRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [messages, thinking]);

//   return (
//     <div className="flex-1 flex flex-col min-w-0 relative">
//       <Nav />

//       <MessageList
//         messages={messages}
//         thinking={thinking}
//         activeAgent={activeAgent}
//         onSuggest={(text) => setInput(text)}
//         onOpenArtifact={setActiveArtifact}
//         scrollRef={scrollRef}
//       />

//       <ChatInput
//         input={input}
//         setInput={setInput}
//         mode={mode}
//         setMode={setMode}
//         setThinking={setThinking}
//         setActiveAgent={setActiveAgent}
//       />

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
// import { useDispatch, useSelector } from "react-redux";
// import Nav from "./Nav";
// import MessageList from "./MessageList";
// import ChatInput from "./ChatInput";
// import ArtifactPanel from "../components/ArtifactPanel";
// import getMessages from "../features/getMessages";
// import { setMessages } from "../redux/messageSlice";
// import { setJustCreated } from "../redux/conversationSlice";

// function ChatArea() {
//   const dispatch = useDispatch();

//   const { selectedConversation, justCreated } = useSelector(
//     (state) => state.conversation,
//   );
//   const messages = useSelector((state) => state.message.messages ?? []);

//   const [mode, setMode] = useState("auto");
//   const [input, setInput] = useState("");
//   const [activeAgent, setActiveAgent] = useState(null);
//   const [thinking, setThinking] = useState(false);
//   const [activeArtifact, setActiveArtifact] = useState(null);
//   const scrollRef = useRef(null);

//   // Mirror justCreated into a ref so toggling it doesn't retrigger the fetch effect
//   const justCreatedRef = useRef(justCreated);
//   useEffect(() => {
//     justCreatedRef.current = justCreated;
//   }, [justCreated]);

//   // Fetch messages whenever the selected conversation changes
//   useEffect(() => {
//     if (!selectedConversation?._id) {
//       dispatch(setMessages([]));
//       return;
//     }

//     if (justCreatedRef.current) {
//       // Freshly created client-side — nothing on the backend yet, skip fetch.
//       dispatch(setJustCreated(false));
//       return;
//     }

//     const idAtRequestTime = selectedConversation._id;

//     const loadMessages = async () => {
//       const data = await getMessages(idAtRequestTime);
//       // ignore if the user has since switched conversations
//       if (idAtRequestTime !== selectedConversation?._id) return;
//       dispatch(setMessages(Array.isArray(data) ? data : []));
//     };

//     loadMessages();
//   }, [selectedConversation?._id, dispatch]);

//   useEffect(() => {
//     scrollRef.current?.scrollTo({
//       top: scrollRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [messages, thinking]);

//   return (
//     <div className="flex-1 flex min-w-0 h-full relative overflow-hidden">
//       {/* Chat column — shrinks when the artifact panel opens */}
//       <div className="flex-1 flex flex-col min-w-0 h-full">
//         <Nav />

//         <MessageList
//           messages={messages}
//           thinking={thinking}
//           activeAgent={activeAgent}
//           onSuggest={(text) => setInput(text)}
//           onOpenArtifact={setActiveArtifact}
//           scrollRef={scrollRef}
//         />

//         <ChatInput
//           input={input}
//           setInput={setInput}
//           mode={mode}
//           setMode={setMode}
//           setThinking={setThinking}
//           setActiveAgent={setActiveAgent}
//         />
//       </div>

//       {/* Artifact panel — docked on the right, sibling not overlay */}
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





import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FileCode2 } from "lucide-react";
import Nav from "./Nav";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import ArtifactPanel from "../components/ArtifactPanel";
import getMessages from "../features/getMessages";
import { setMessages } from "../redux/messageSlice";
import { setJustCreated } from "../redux/conversationSlice";

function ChatArea() {
  const dispatch = useDispatch();

  const { selectedConversation, justCreated } = useSelector(
    (state) => state.conversation,
  );
  const messages = useSelector((state) => state.message.messages ?? []);

  const [mode, setMode] = useState("auto");
  const [input, setInput] = useState("");
  const [activeAgent, setActiveAgent] = useState(null);
  const [thinking, setThinking] = useState(false);

  // Artifact panel state: whether it's open, and which artifact (by id) is
  // selected within it. selectedArtifactId === null means "show the list".
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedArtifactId, setSelectedArtifactId] = useState(null);
  // Measured width (px) the currently open file actually needs; null = default.
  const [panelWidth, setPanelWidth] = useState(null);

  const scrollRef = useRef(null);

  // Mirror justCreated into a ref so toggling it doesn't retrigger the fetch effect
  const justCreatedRef = useRef(justCreated);
  useEffect(() => {
    justCreatedRef.current = justCreated;
  }, [justCreated]);

  // Fetch messages whenever the selected conversation changes
  useEffect(() => {
    if (!selectedConversation?._id) {
      dispatch(setMessages([]));
      return;
    }

    if (justCreatedRef.current) {
      // Freshly created client-side — nothing on the backend yet, skip fetch.
      dispatch(setJustCreated(false));
      return;
    }

    const idAtRequestTime = selectedConversation._id;

    const loadMessages = async () => {
      const data = await getMessages(idAtRequestTime);
      // ignore if the user has since switched conversations
      if (idAtRequestTime !== selectedConversation?._id) return;
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

  // Flatten every artifact across every message into one addressable list,
  // so the persistent artifacts button can show "all artifacts, like Claude".
  const allArtifacts = useMemo(() => {
    const list = [];
    messages.forEach((m, mi) => {
      (m.artifacts || []).forEach((artifact, ai) => {
        list.push({
          id: `${mi}-${ai}`,
          artifact,
          agent: m.agent,
          createdAt: m.createdAt || m.timestamp || null,
        });
      });
    });
    return list;
  }, [messages]);

  // Reset the panel whenever the conversation changes so a stale artifact
  // from the previous chat can't stay selected.
  useEffect(() => {
    setPanelOpen(false);
    setSelectedArtifactId(null);
    setPanelWidth(null);
  }, [selectedConversation?._id]);

  const handleOpenArtifactFromMessage = (artifact) => {
    const entry = allArtifacts.find((e) => e.artifact === artifact);
    setSelectedArtifactId(entry ? entry.id : null);
    setPanelOpen(true);
  };

  const handleOpenArtifactsList = () => {
    setSelectedArtifactId(null);
    setPanelOpen(true);
  };

  const handleClosePanel = () => {
    setPanelOpen(false);
  };

  return (
    <div className="flex-1 flex min-w-0 h-full relative overflow-hidden">
      {/* Chat column — width is fixed via flex-1, unaffected by the panel animating */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <Nav />

        {/* Persistent "all artifacts" button — always visible, like Claude's */}
        <button
          onClick={handleOpenArtifactsList}
          title="View artifacts"
          className="absolute top-3 right-4 z-10 flex items-center gap-1.5 h-8 pl-2.5 pr-3 rounded-full border border-black/[0.08] bg-white text-black/55 shadow-sm hover:text-[#1E7A56] hover:border-[#1E7A56]/30 active:scale-95 transition-all duration-150"
        >
          <FileCode2 size={14} />
          {allArtifacts.length > 0 && (
            <span className="text-[11px] font-[IBM_Plex_Mono,monospace] font-medium leading-none">
              {allArtifacts.length}
            </span>
          )}
        </button>

        <MessageList
          messages={messages}
          thinking={thinking}
          activeAgent={activeAgent}
          onSuggest={(text) => setInput(text)}
          onOpenArtifact={handleOpenArtifactFromMessage}
          scrollRef={scrollRef}
        />

        <ChatInput
          input={input}
          setInput={setInput}
          mode={mode}
          setMode={setMode}
          setThinking={setThinking}
          setActiveAgent={setActiveAgent}
        />
      </div>

      {/*
        Artifact panel wrapper — this is what animates, not the panel's own
        internals. The panel always fills whatever width this wrapper gives
        it; this wrapper clips it with overflow-hidden while tweening width
        and opacity. Width is a CSS clamp(): a 440px floor, growing to fit
        whatever the open file actually needs (reported via onWidthChange),
        capped so it never eats more than ~65% of the viewport or crushes
        the chat column below a usable size.
      */}
      <div
        className="shrink-0 h-full overflow-hidden transition-[width,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: panelOpen
            ? `clamp(380px, ${panelWidth ?? 440}px, min(880px, 65vw))`
            : "0px",
          opacity: panelOpen ? 1 : 0,
        }}
      >
        <ArtifactPanel
          artifacts={allArtifacts}
          selectedId={selectedArtifactId}
          onSelect={setSelectedArtifactId}
          onClose={handleClosePanel}
          onWidthChange={setPanelWidth}
        />
      </div>
    </div>
  );
}

export default ChatArea;








