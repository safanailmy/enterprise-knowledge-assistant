import {
  MessageSquare,
  Menu,
} from "lucide-react";

type Props = {
  onOpenConversations: () => void;
};

export default function ChatHeader({
  onOpenConversations,
}: Props) {
  return (
    <div className="pt-7 pb-5">

      {/* Title + Conversations Button */}
      <div className="flex items-center justify-between">

        <h1 className="text-sm font-semibold text-white/60">
          Enterprise Knowledge Assistant
        </h1>

        <button
          onClick={onOpenConversations}
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-white/5
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition-all
            duration-200
            hover:bg-white/10
          "
        >
          <Menu size={15} />
            Conversations
        </button>

      </div>

      {/* Divider */}
      <div className="mt-5 h-px bg-white/10" />

    </div>
  );
}