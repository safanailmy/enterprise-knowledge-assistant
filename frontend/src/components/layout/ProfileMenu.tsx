import { ChevronDown } from "lucide-react";

export default function ProfileMenu() {
  return (
    <button
      className="
        flex
        items-center
        gap-4
        rounded-full
        border
        px-4
        py-2.5
        transition
        hover:bg-white/5
      "
      style={{
        borderColor: "rgba(255,255,255,.10)",
        background: "rgba(255,255,255,.05)",
      }}
    >
      <div
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          text-sm
          font-semibold
          text-white
        "
        style={{
            backgroundColor: "#16395C",
            border: "1px solid rgba(255,255,255,.12)"
        }}
      >
        S
      </div>

        <span className="text-sm font-medium text-white">
            Safana
        </span>

      <ChevronDown
        size={16}
        className="text-white/70"
      />
    </button>
  );
}