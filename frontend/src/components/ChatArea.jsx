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

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [activeArtifact, setActiveArtifact] = useState(null);
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

  return (
    <div className="flex-1 flex min-w-0 h-full relative overflow-hidden">
      {/* Chat column — shrinks when the artifact panel opens */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Nav />

        <MessageList
          messages={messages}
          thinking={thinking}
          activeAgent={activeAgent}
          onSuggest={(text) => setInput(text)}
          onOpenArtifact={setActiveArtifact}
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

      {/* Artifact panel — docked on the right, sibling not overlay */}
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
