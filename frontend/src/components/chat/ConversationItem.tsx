import {
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useEffect, useRef } from "react";

import { ConversationItem as Conversation } from "../../types/chat";

type Props = {
  conversation: Conversation;

  active: boolean;

  menuOpen: boolean;
  onMenuToggle: () => void;

  editing: boolean;
  editingTitle: string;

  onEditingTitleChange: (value: string) => void;

  onRenameSave: () => void;
  onRenameCancel: () => void;

  onSelect: () => void;
  onRename: () => void;
  onDelete: () => void;
};

export default function ConversationItem({
  conversation,
  active,

  menuOpen,
  onMenuToggle,

  editing,
  editingTitle,
  onEditingTitleChange,
  onRenameSave,
  onRenameCancel,

  onSelect,
  onRename,
  onDelete,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
  if (editing && inputRef.current) {
    inputRef.current.focus();
    inputRef.current.select();
  }
}, [editing]);

  return (
    <div
      onClick={onSelect}
      className={`
        group
        relative
        flex
        cursor-pointer
        items-center
        justify-between
        rounded-xl
        border
        px-3
        py-3
        transition-all
        duration-200
        hover:-translate-y-[1px]
        ${menuOpen ? "z-50" : "z-0"}
        ${
          active
            ? "border-[#4F7DF3]/40 bg-[#4F7DF3]/15 shadow-lg"
            : "border-transparent hover:border-white/10 hover:bg-white/5"
        }
      `}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            ${
              active
                ? "bg-[#4F7DF3]/20 text-[#8FB7FF]"
                : "bg-white/5 text-white/60"
            }
          `}
        >
          <MessageSquare size={16} />
        </div>

        <div className="min-w-0 flex-1">
          {editing ? (
            <input
              ref={inputRef}
              value={editingTitle}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => onEditingTitleChange(e.target.value)}
              onBlur={onRenameSave}
              onKeyDown={(e) => {
                e.stopPropagation();

                if (e.key === "Enter") {
                  onRenameSave();
                }

                if (e.key === "Escape") {
                  onRenameCancel();
                }
              }}
              className="
                w-full
                rounded-md
                border
                border-[#4F7DF3]
                bg-transparent
                px-2
                py-1
                text-sm
                font-medium
                outline-none
              "
            />
          ) : (
            <>
              <p className="truncate text-sm font-medium">
                {conversation.title}
              </p>

              <p className="mt-0.5 text-xs text-white/40">
                Conversation
              </p>
            </>
          )}
        </div>
      </div>

      {!editing && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMenuToggle();
          }}
          className="
            rounded-lg
            p-1.5
            opacity-0
            transition-all
            duration-200
            hover:bg-white/10
            group-hover:opacity-100
          "
        >
          <MoreHorizontal size={16} />
        </button>
      )}

      {menuOpen && !editing && (
        <div
          className="
            absolute
            right-0
            top-0
            z-50
            w-44
            overflow-hidden
            rounded-xl
            border
            border-white/10
            bg-[#17395C]
            shadow-2xl
          "
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRename();
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-4
              py-3
              text-sm
              transition
              hover:bg-white/5
            "
          >
            <Pencil size={15} />
            Rename
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-4
              py-3
              text-sm
              text-red-400
              transition
              hover:bg-red-500/10
            "
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}