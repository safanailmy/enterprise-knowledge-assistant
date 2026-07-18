import {
  ArrowUp,
  Mic,
  Paperclip,
} from "lucide-react";

export default function ChatInput() {
  return (
    <div
      className="
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
          transition-all
        "
      >
        <textarea
          placeholder="Type your message..."
          rows={1}
          style={{
            minHeight: "20px",
            maxHeight: "20px",
          }}
          className="
            w-full
            resize-none
            overflow-hidden
            bg-transparent
            text-[15px]
            leading-6
            text-white
            placeholder:text-white/40
            outline-none
          "
        />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-2 text-[13px] text-white/60 transition hover:text-white">
              <Paperclip size={15} />
              Attach
            </button>

            <button className="flex items-center gap-2 text-[13px] text-white/60 transition hover:text-white">
              <Mic size={15} />
              Voice
            </button>
          </div>

          <button
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              bg-[#5C86F8]
              transition-all
              hover:scale-105
              hover:bg-[#7098FF]
            "
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}