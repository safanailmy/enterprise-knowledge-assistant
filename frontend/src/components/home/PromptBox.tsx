import { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowUp,
  Loader2,
  SlidersHorizontal,
  Building2,
  User,
  FileText,
  Hash,
  X,
  type LucideIcon,
} from "lucide-react";
import { ChatFilters } from "../../types/chatFilters";

type Props = {
  filters: ChatFilters;
  onFiltersChange: (filters: ChatFilters) => void;
  onOpenFilters: () => void;
};

type ActiveFilter = {
  key: keyof ChatFilters;
  icon: LucideIcon;
  label: string;
};

export default function PromptBox({
  filters,
  onFiltersChange,
  onOpenFilters,
}: Props) {
  const navigate = useNavigate();

  const [input, setInput] = useState("");

  const handleSend = () => {
    const message = input.trim();

    if (!message) return;

    navigate("/chat", {
      state: {
        question: message,
        filters,
      },
    });
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
        w-200
        overflow-hidden
        rounded-[22px]
        border
        px-6
        py-3
        shadow-[0_10px_24px_rgba(0,0,0,.22)]
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-white/15
      "
      style={{
        background:
          "linear-gradient(180deg,#204A73 0%,#1B4168 100%)",
        borderColor: "rgba(255,255,255,.08)",
      }}
    >
      {/* Copilot-style light reflection */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg,rgba(255,255,255,.06),transparent 35%)",
        }}
      />

      <div className="relative">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your enterprise..."
          className="
            w-full
            resize-none
            overflow-hidden
            bg-transparent
            text-[16px]
            font-normal
            leading-7
            tracking-[0.01em]
            text-white
            placeholder:text-white/45
            outline-none
          "
          style={{
            minHeight: "32px",
          }}
        />

        <div className="mt-3 flex items-center justify-between">
          {/* Left */}
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">

  <button
    type="button"
    onClick={onOpenFilters}
    className="
      inline-flex
      items-center
      gap-2
      rounded-full
      border
      border-white/10
      bg-white/5
      px-3
      py-1.5
      text-xs
      font-medium
      text-white/80
      transition-all
      hover:bg-white/10
      hover:text-white
    "
  >
    <SlidersHorizontal size={14} />
    Advanced Search
  </button>

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
          {/* Right */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim()}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              text-white
              transition-all
              duration-300
              hover:scale-105
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            style={{
              background:
                "linear-gradient(135deg,#76A8FF 0%,#5B84F8 100%)",
              boxShadow:
                "0 0 16px rgba(104,154,255,.35), inset 0 1px 2px rgba(255,255,255,.20)",
            }}
          >
            <ArrowUp
              size={15}
              strokeWidth={2.4}
            />
          </button>
        </div>
      </div>
    </div>
  );
}