import {
  User,
  LogOut,
  ArrowUpCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { getConversations } from "../features/getConversations";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  setConversations,
  setSelectedConversation,
} from "../redux/conversationSlice";
import logout from "../features/logout";
import BillingDrawer from "./BillingDrawer";
import { setUserdata } from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";
import { useNavigate } from "react-router-dom";

function RailIcon({ children, label, active, onClick }) {
  return (
    <button
      title={label}
      onClick={onClick}
      className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
        active
          ? "bg-[#1E7A56]/10 text-[#1E7A56]"
          : "text-black/35 hover:bg-black/[0.04] hover:text-black/70"
      }`}
    >
      {children}
    </button>
  );
}

function PlusIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function FilesIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}
function HistoryIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 3v5h5" />
      <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}

/**
 * Groups a list of conversations into date buckets for the History panel.
 */
function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function groupConversationsByDate(conversations) {
  const groups = { Today: [], Yesterday: [], "This Week": [], Earlier: [] };

  const today = startOfDay(new Date());

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  conversations.forEach((conv) => {
    const convDayStart = startOfDay(new Date(conv.updatedAt));

    if (convDayStart.getTime() === today.getTime()) {
      groups.Today.push(conv);
    } else if (convDayStart.getTime() === yesterday.getTime()) {
      groups.Yesterday.push(conv);
    } else if (convDayStart.getTime() > weekAgo.getTime()) {
      groups["This Week"].push(conv);
    } else {
      groups.Earlier.push(conv);
    }
  });

  return groups;
}

function Sidebar({ onNewSession }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imageError, setImageError] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Which panel is showing inside the 64-wide sessions/history aside
  const [activeRail, setActiveRail] = useState("sessions"); // "sessions" | "history"

  const [showBilling , setShowBilling]=useState(false);

  const [historySearch, setHistorySearch] = useState("");

  const conversations = useSelector(
    (state) => state.conversation.conversations,
  );

  const selectedConversation = useSelector(
    (state) => state.conversation.selectedConversation,
  );

  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (!userData?.userId) return; // was userData?._id

    const getConv = async () => {
      const data = await getConversations();
      dispatch(setConversations(data));
    };

    getConv();
  }, [dispatch, userData?.userId]); // was userData?._id

  const handleSelectConversation = (conversation) => {
    dispatch(setSelectedConversation(conversation));
  };

  const handleCreateConversation = () => {
    dispatch(setSelectedConversation(null));
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setUserdata(null));
      dispatch(setSelectedConversation(null));
      dispatch(setConversations([]));
      dispatch(setMessages([]));
      navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  const handleUpgrade = () => {
    // TODO: route to your billing/upgrade flow
    console.log("Upgrade clicked");
  };

  const planLabel = userData?.plan === "pro" ? "Pro Plan" : "Free Plan";

  return (
    <>
      {/* Icon rail */}
      <aside className="w-16 shrink-0 border-r border-black/[0.07] bg-white/50 backdrop-blur-xl flex flex-col items-center py-5 gap-6 z-10 motion-safe:animate-[fadeUp_0.5s_ease-out_both]">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="w-9 h-9 rounded-md bg-gradient-to-br from-[#14151A] to-[#0B2E22] flex items-center justify-center relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-[#14151A] to-[#0B2E22] flex items-center justify-center relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            {/* soft glow */}
            <div className="absolute inset-0 bg-[#1E7A56]/25 blur-md rounded-full scale-75" />

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="relative z-10"
            >
              <defs>
                <linearGradient id="vGradient" x1="0" y1="0" x2="24" y2="24">
                  <stop offset="0%" stopColor="#5EEAD4" />
                  <stop offset="100%" stopColor="#1E7A56" />
                </linearGradient>
              </defs>
              <path
                d="M3 4L12 20L21 4"
                stroke="url(#vGradient)"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M7.5 4L12 12.5L16.5 4"
                stroke="url(#vGradient)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.5"
              />
            </svg>

            <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#1E7A56] motion-safe:animate-[blink_2.2s_ease-in-out_infinite] ring-2 ring-white z-10" />
          </div>
        </button>

        <nav className="flex flex-col items-center gap-1 mt-4">
          <RailIcon
            label="Sessions"
            // active={activeRail === "sessions"}
            active={!collapsed && activeRail === "sessions"}
            onClick={() => {
              setActiveRail("sessions");
              setCollapsed(false);
            }}
          >
            <ChatIcon />
          </RailIcon>

          <RailIcon label="Files">
            <FilesIcon />
          </RailIcon>

          <RailIcon
            label="History"
            // active={activeRail === "history"}
            active={!collapsed && activeRail === "history"}
            onClick={() => {
              setActiveRail("history");
              setCollapsed(false);
            }}
          >
            <HistoryIcon />
          </RailIcon>
        </nav>

        <div className="mt-auto flex flex-col items-center gap-3">
          {/* Collapsed state: show expand button here instead of avatar */}
          {collapsed && (
            <RailIcon
              label="Expand sidebar"
              onClick={() => setCollapsed(false)}
            >
              <PanelLeftOpen size={18} />
            </RailIcon>
          )}
        </div>
      </aside>

      {/* Sessions / History panel — collapses to width 0 when toggled */}
      <aside
        className={`shrink-0 border-r border-black/[0.07] bg-white/35 backdrop-blur-xl flex flex-col z-10 overflow-hidden transition-[width] duration-300 ease-in-out motion-safe:animate-[fadeUp_0.55s_ease-out_0.05s_both] ${
          collapsed ? "w-0 border-r-0" : "w-64"
        }`}
      >
        <div className="w-64 flex flex-col h-full">
          {activeRail === "sessions" ? (
            <>
              <div className="p-4 flex items-center gap-2">
                <button
                  onClick={handleCreateConversation}
                  className="flex-1 flex items-center justify-center gap-2 rounded-md bg-[#14151A] text-white text-sm font-medium py-2.5 transition-colors duration-300 hover:bg-[#1E7A56]"
                >
                  <PlusIcon /> New session
                </button>

                <button
                  onClick={() => setCollapsed(true)}
                  title="Collapse sidebar"
                  className="w-9 h-9 shrink-0 rounded-md flex items-center justify-center text-black/40 hover:text-black hover:bg-black/[0.06] transition-colors"
                >
                  <PanelLeftClose size={18} />
                </button>
              </div>

              <div className="px-4 flex-1 overflow-y-auto">
                <p className="flex items-center gap-2 text-[13px] font-[IBM_Plex_Mono,monospace] font-semibold uppercase tracking-[0.18em] text-[#1E7A56]/70 mb-3 mt-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A56]" />
                  Recent Sessions
                </p>

                <div className="space-y-1">
                  {conversations.map((conversation) => {
                    const isActive =
                      selectedConversation?._id === conversation._id;

                    return (
                      <button
                        key={conversation._id}
                        onClick={() => handleSelectConversation(conversation)}
                        className={`w-full text-left rounded-md px-3 py-2.5 transition-colors group ${
                          isActive
                            ? "bg-[#1E7A56]/10 border border-[#1E7A56]/30"
                            : "glass-row hover:bg-white/60"
                        }`}
                      >
                        <p className="text-sm text-black/80 truncate group-hover:text-black">
                          {conversation.title || "New Conversation"}
                        </p>

                        <div className="mt-1">
                          <span className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/35">
                            {new Date(conversation.updatedAt).toLocaleString()}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30"
                  />
                  <input
                    type="text"
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    placeholder="Search history..."
                    className="w-full rounded-md bg-black/[0.04] pl-8 pr-3 py-2.5 text-sm text-black/80 placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-[#1E7A56]/40"
                  />
                </div>

                <button
                  onClick={() => setCollapsed(true)}
                  title="Collapse sidebar"
                  className="w-9 h-9 shrink-0 rounded-md flex items-center justify-center text-black/40 hover:text-black hover:bg-black/[0.06] transition-colors"
                >
                  <PanelLeftClose size={18} />
                </button>
              </div>

              <div className="px-4 flex-1 overflow-y-auto pb-4">
                {(() => {
                  const filtered = conversations.filter((c) =>
                    (c.title || "New Conversation")
                      .toLowerCase()
                      .includes(historySearch.toLowerCase()),
                  );
                  const grouped = groupConversationsByDate(filtered);

                  const sections = Object.entries(grouped).filter(
                    ([, items]) => items.length > 0,
                  );

                  if (sections.length === 0) {
                    return (
                      <p className="text-sm text-black/35 mt-6 text-center">
                        No matching conversations
                      </p>
                    );
                  }

                  return sections.map(([label, items]) => (
                    <div key={label} className="mb-4">
                      <p className="text-[13px] font-[IBM_Plex_Mono,monospace] font-semibold uppercase tracking-[0.18em] text-[#1E7A56]/70 mb-2 mt-3">
                        {label}
                      </p>
                      <div className="space-y-1">
                        {items.map((conversation) => {
                          const isActive =
                            selectedConversation?._id === conversation._id;

                          return (
                            <button
                              key={conversation._id}
                              onClick={() =>
                                handleSelectConversation(conversation)
                              }
                              className={`w-full text-left rounded-md px-3 py-2.5 transition-colors group ${
                                isActive
                                  ? "bg-[#1E7A56]/10 border border-[#1E7A56]/30"
                                  : "glass-row hover:bg-white/60"
                              }`}
                            >
                              <p className="text-sm text-black/80 truncate group-hover:text-black">
                                {conversation.title || "New Conversation"}
                              </p>
                              <span className="text-[11px] font-[IBM_Plex_Mono,monospace] text-black/35">
                                {new Date(
                                  conversation.updatedAt,
                                ).toLocaleString()}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </>
          )}

          {/* User footer row — the ONLY place the avatar shows */}
          <div className="p-4 border-t border-black/[0.07]">
            <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-white/60 transition-colors group">
              <div className="w-9 h-9 rounded-full bg-[#14151A] flex items-center justify-center overflow-hidden text-white shrink-0">
                {userData?.avatar && !imageError ? (
                  <img
                    src={userData.avatar}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <User size={16} />
                )}
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-sm font-medium text-black/80 truncate">
                  {userData?.name || userData?.displayName || "User"}
                </span>
                <span className="text-xs text-black/40">{planLabel}</span>
              </div>

              <div className="flex items-center gap-1 shrink-0">

                {/* <button  
                onClick={() => setShowBilling(true)}
                  onClick={handleUpgrade}
                  title="Upgrade plan"
                  className="w-7 h-7 rounded-md flex items-center justify-center text-black/40 hover:text-[#1E7A56] hover:bg-black/[0.06] transition-colors"
                >
                  <ArrowUpCircle size={16} />
                </button> */}

                <button onClick={() => setShowBilling(true)} title="Upgrade plan" className="w-7 h-7 rounded-md flex items-center justify-center text-black/40 hover:text-[#1E7A56] hover:bg-black/[0.06] transition-colors" > <ArrowUpCircle size={16} /> </button>

                <button
                  onClick={handleLogout}
                  title="Log out"
                  className="w-7 h-7 rounded-md flex items-center justify-center text-black/40 hover:text-black hover:bg-black/[0.06] transition-colors"
                >
                  <LogOut size={14} />
                </button>
              </div>
            </div>
          </div> 
        </div>
         {/* <BillingDrawer
          isOpen={showBilling}
          onClose={() => setShowBilling(false)}
         /> */}
      </aside>

      <BillingDrawer
      open={showBilling}
      onClose={() => setShowBilling(false)}
      userData={userData}
    />
    </>
  );
}

export default Sidebar;
