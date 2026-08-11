import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";

import ConversationItem from "./ConversationItem";

import { ConversationItem as Conversation } from "../../types/chat";


type Props = {
  open: boolean;
  conversations: Conversation[];
  currentConversationId: string;
  onClose: () => void;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onRenameConversation: (
  id: string,
  title: string
) => Promise<void>;
  onDeleteConversation: (id: string) => void;
};

export default function ConversationSidebar({
  open,
  conversations,
  currentConversationId,
  onClose,
  onNewChat,
  onSelectConversation,
  onRenameConversation,
  onDeleteConversation,
}: Props) {
  const [activeMenuId, setActiveMenuId] =
  useState<string | null>(null);

  const [
  editingConversationId,
  setEditingConversationId,
] = useState<string | null>(null);

  const [
  editingTitle,
  setEditingTitle,
] = useState("");

const saveRename = async () => {
  if (
    !editingConversationId ||
    !editingTitle.trim()
  )
    return;

  await onRenameConversation(
    editingConversationId,
    editingTitle.trim()
  );

  setEditingConversationId(null);
  setEditingTitle("");
};

const cancelRename = () => {
  setEditingConversationId(null);
  setEditingTitle("");
};
  return (
    <aside
      className={`
        fixed
        left-0
        top-0
        z-40
        flex
        h-screen
        w-65
        flex-col
        border-r
        border-white/5
        shadow-2xl
        transition-transform
        duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
      style={{
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-primary)",
      }}
    >
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Conversations
            </h2>

            <p
              className="mt-1 text-xs"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Continue where you left off
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-2
              transition
              hover:bg-white/10
            "
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        <div className="mt-6 border-b border-white/8" />
      </div>

      {/* New Chat */}
      <div className="px-5 pb-5">
        <button
          onClick={onNewChat}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#4F7DF3]
            px-4
            py-3
            text-sm
            font-medium
            text-white
            shadow-lg
            transition-all
            duration-200
            hover:bg-[#5C88FF]
            hover:shadow-xl
          "
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-6">
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.conversation_id}
              conversation={conversation}
              active={
                conversation.conversation_id ===
                currentConversationId
              }

              menuOpen={
                activeMenuId ===
                conversation.conversation_id
              }

              editing={
                editingConversationId ===
                conversation.conversation_id
              }

              editingTitle={editingTitle}

              onEditingTitleChange={setEditingTitle}

              onRenameSave={saveRename}

              onRenameCancel={cancelRename}

              onMenuToggle={() =>
                setActiveMenuId((prev) =>
                  prev === conversation.conversation_id
                    ? null
                    : conversation.conversation_id
                )
              }

              onSelect={() => {
                setActiveMenuId(null);

                onSelectConversation(
                  conversation.conversation_id
                );
              }}

              onRename={() => {
                setActiveMenuId(null);

                setEditingConversationId(
                  conversation.conversation_id
                );

                setEditingTitle(
                  conversation.title
                );
              }}

              onDelete={() => {
                setActiveMenuId(null);

                onDeleteConversation(
                  conversation.conversation_id
                );
              }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}