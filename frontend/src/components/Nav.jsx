// import React from "react";
// import { useSelector } from "react-redux";

// function Nav({ messageCount = 0 }) {
//   const { selectedConversation } = useSelector((state) => state.conversation);

//   return (
//     <div className="relative h-14 border-b border-black/[0.07] flex items-center gap-4 px-6 bg-white/35 backdrop-blur-xl z-10 overflow-hidden motion-safe:animate-[fadeUp_0.5s_ease-out_both]">
//       <p className="text-sm font-medium">
//         {selectedConversation?.title ||
//           (messageCount > 0 ? "Active session" : "New session")}
//       </p>

//       {selectedConversation && (
//         <>
//           <span className="w-1 h-1 rounded-full bg-black/20" />
//           <span className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/35">
//             {messageCount} {messageCount === 1 ? "message" : "messages"}
//           </span>
//         </>
//       )}

//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 overflow-hidden"
//       >
//         <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent motion-safe:animate-[sheen_7s_ease-in-out_infinite]" />
//       </div>
//     </div>
//   );
// }

// export default Nav;

import React from "react";
import { useSelector } from "react-redux";

function Nav() {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { messages } = useSelector((state) => state.message);
  const messageCount = messages.length;

  if (!selectedConversation) {
    return null;
  }

  return (
    <div className="relative h-14 border-b border-black/[0.07] flex items-center gap-4 px-6 bg-white/35 backdrop-blur-xl z-10 overflow-hidden motion-safe:animate-[fadeUp_0.5s_ease-out_both]">
      <p className="text-sm font-medium">
        {selectedConversation.title || "Active session"}
      </p>

      <span className="w-1 h-1 rounded-full bg-black/20" />
      <span className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/35">
        {messageCount} {messageCount === 1 ? "message" : "messages"}
      </span>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent motion-safe:animate-[sheen_7s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}

export default Nav;
