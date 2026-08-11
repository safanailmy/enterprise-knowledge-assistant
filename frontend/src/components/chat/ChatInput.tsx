import { useState, KeyboardEvent } from "react";
import {
  ArrowUp,
  Loader2,
  SlidersHorizontal,
  Building2,
  User,
  FileText,
  Hash,
  X,
  LucideIcon,
} from "lucide-react";

import { ChatFilters } from "../../types/chatFilters";

type Props = {
  loading: boolean;
  filters: ChatFilters;
  onFiltersChange: (filters: ChatFilters) => void;
  onSend: (message: string) => Promise<void>;
  onOpenFilters: () => void;
};

type ActiveFilter = {
  key: keyof ChatFilters;
  icon: LucideIcon;
  label: string;
};

export default function ChatInput({
  loading,
  filters,
  onFiltersChange,
  onSend,
  onOpenFilters,
}: Props) {
  const [input, setInput] = useState("");

  const handleSend = async () => {
    const message = input.trim();

    if (!message || loading) return;

    setInput("");
    await onSend(message);
  };

  const handleKeyDown = async (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSend();
    }
  };

  const activeFilters: ActiveFilter[] = [];

  if (filters.department) {
    activeFilters.push({
      key: "department",
      icon: Building2,
      label: filters.department,
    });
  }

  if (filters.uploaded_by) {
    activeFilters.push({
      key: "uploaded_by",
      icon: User,
      label: filters.uploaded_by,
    });
  }

  if (filters.version !== undefined) {
    activeFilters.push({
      key: "version",
      icon: Hash,
      label: `v${filters.version}`,
    });
  }

  if (filters.status) {
    activeFilters.push({
      key: "status",
      icon: FileText,
      label: filters.status,
    });
  }

  const removeFilter = (key: keyof ChatFilters) => {
    onFiltersChange({
      ...filters,
      [key]: undefined,
    });
  };

  return (
    <div
      className="
        relative
        sticky
        bottom-0
        rounded-[34px]
        bg-transparent
        px-1
        pb-2
        pt-2
        backdrop-blur-sm
      "
    >
      <div
        className="
          rounded-[30px]
          border
          border-white/10
          bg-[#173A5D]
          px-6
          py-3
          shadow-[0_12px_40px_rgba(0,0,0,.22)]
        "
      >
        <textarea
          placeholder="Ask anything about your documents..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className="
            min-h-[24px]
            max-h-40
            w-full
            resize-none
            overflow-y-auto
            bg-transparent
            text-[15px]
            leading-6
            text-white
            placeholder:text-white/40
            outline-none
          "
        />

        <div className="mt-3 flex items-center justify-between gap-3">
          {/* Left Toolbar */}
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
            {/* Advanced Search */}
            <button
              onClick= {onOpenFilters}
              className={`
                flex
                shrink-0
                items-center
                gap-2
                whitespace-nowrap
                rounded-full
                border
                border-white/10
                bg-white/5
                px-4
                py-2
                text-[13px]
                text-white/70
                transition-all
                duration-200
                hover:border-white/20
                hover:bg-white/10
                hover:text-white
              `}
            >
              <SlidersHorizontal size={15} />
              <span>Advanced Search</span>
            </button>

            {/* Active Filters */}
            {activeFilters.map((filter) => {
              const Icon = filter.icon;

              return (
                <div
                  key={filter.key}
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-1
                    rounded-full
                    border
                    border-[#76A8FF]/25
                    bg-[#76A8FF]/10
                    px-2
                    py-0.5
                    text-[10px]
                    leading-4
                    text-[#AFCBFF]
                  "
                >
                  <Icon
                    size={12}
                    className="text-[#AFCBFF]"
                  />

                  <span className="max-w-[70px] truncate">
                    {filter.label}
                  </span>

                  <button
                    onClick={() => removeFilter(filter.key)}
                    className="
                      rounded-full
                      p-0.5
                      text-white/60
                      transition
                      hover:bg-white/10
                      hover:text-white
                    "
                  >
                    <X size={10} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              text-white
              transition-all
              duration-300
              hover:scale-105
              active:scale-95
              disabled:opacity-50
            "
            style={{
              background:
                "linear-gradient(135deg,#76A8FF 0%,#5B84F8 100%)",
              boxShadow:
                "0 0 16px rgba(104,154,255,.35), inset 0 1px 2px rgba(255,255,255,.20)",
            }}
          >
            {loading ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <ArrowUp
                size={15}
                strokeWidth={2.4}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}