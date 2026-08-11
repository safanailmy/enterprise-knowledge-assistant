import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useChat } from "../../hooks/useChat";

import ChatHeader from "../../components/chat/ChatHeader";
import ChatMessages from "../../components/chat/ChatMessages";
import ChatInput from "../../components/chat/ChatInput";
import ConversationSidebar from "../../components/chat/ConversationSidebar";
import { ChatFilters } from "../../types/chatFilters";
import AdvancedSearchPopover from "../../components/chat/AdvancedSearchPopover";

type NavigationState = {
  question?: string;
  filters?: ChatFilters;
};

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const initialMessageSent = useRef(false);

  const [showFilters, setShowFilters] = useState(false);

  const {
    messages,
    loading,
    sendMessage,

    conversations,
    conversationId,
    loadConversation,
    newConversation,
    renameConversation,
    deleteConversation,

    filters,
    setFilters,
  } = useChat();

 useEffect(() => {
  if (initialMessageSent.current) return;

  const state = location.state as NavigationState | null;

  if (!state?.question) return;

const question = state.question;
const incomingFilters = state.filters ?? {};

initialMessageSent.current = true;

const sendInitialMessage = async () => {
  setFilters(incomingFilters);

  await sendMessage(question, incomingFilters);

  navigate(location.pathname, {
    replace: true,
    state: null,
  });
};

  sendInitialMessage();

// We intentionally only react to navigation state.
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [location.state]);

  return (
    <>
      <ConversationSidebar
        open={sidebarOpen}
        conversations={conversations}
        currentConversationId={conversationId}
        onClose={() => setSidebarOpen(false)}
        onNewChat={newConversation}
        onSelectConversation={loadConversation}
        onRenameConversation={renameConversation}
        onDeleteConversation={deleteConversation}
      />

      <AdvancedSearchPopover
          open={showFilters}
          filters={filters}
          onChange={setFilters}
          onClose={() => setShowFilters(false)}
      />

      <main
        className="
          relative
          mx-auto
          flex
          h-full
          w-full
          max-w-[1100px]
          flex-col
          overflow-Visible
          px-8
        "
      >
        {/* Background Glow */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-56
            h-[500px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#4F7DF3]/10
            blur-[160px]
          "
        />

        <div className="relative z-999 flex h-full flex-col">
          <ChatHeader
            onOpenConversations={() =>
              setSidebarOpen((prev) => !prev)
            }
          />

          <div className="flex-1 overflow-y-auto scrollbar-hide py-6">
            <div className="mx-auto w-full max-w-3xl">
              <ChatMessages
                messages={messages}
                loading={loading}
              />
            </div>
          </div>

          <div className="mx-auto w-full max-w-3xl pb-4">
            <ChatInput
              loading={loading}
              filters={filters}
              onFiltersChange={setFilters}
              onSend={sendMessage}
              onOpenFilters={() => setShowFilters(true)}
            />
          </div>
        </div>
      </main>
    </>
  );
}