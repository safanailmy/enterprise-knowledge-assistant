import {
  Paperclip,
  Mic,
  ArrowUp,
} from "lucide-react";

export default function PromptBox() {
  return (
    <div
      className="
        relative
        w-full
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
          <div className="flex items-center gap-2">
            <button
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-white/8
                bg-white/[0.04]
                px-3
                py-2
                text-sm
                text-white/70
                transition-all
                duration-200
                hover:border-white/15
                hover:bg-white/[0.08]
                hover:text-white
              "
            >
              <Paperclip size={14} strokeWidth={2} />
              Attach
            </button>

            <button
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-white/8
                bg-white/[0.04]
                px-3
                py-2
                text-sm
                text-white/70
                transition-all
                duration-200
                hover:border-white/15
                hover:bg-white/[0.08]
                hover:text-white
              "
            >
              <Mic size={14} strokeWidth={2} />
              Voice
            </button>
          </div>

          <button
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
            "
            style={{
              background:
                "linear-gradient(135deg,#76A8FF 0%,#5B84F8 100%)",
              boxShadow:
                "0 0 16px rgba(104,154,255,.35), inset 0 1px 2px rgba(255,255,255,.20)",
            }}
          >
            <ArrowUp size={15} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </div>
  );
}