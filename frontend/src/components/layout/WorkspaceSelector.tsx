import { ChevronDown } from "lucide-react";
import { LayoutGrid } from "lucide-react";

export default function WorkspaceSelector() {
  return (
    <button
      className="
        flex
        items-center
        gap-2
        rounded-full
        border
        px-4
        py-2.5
        text-sm
        transition
        hover:bg-white/5
      "
      style={{
        borderColor: "rgba(255,255,255,.10)",
        background: "rgba(255,255,255,.05)",
      }}
    >
        <LayoutGrid size={16} className="text-white/90" />
        
    <span className="text-sm font-medium text-white">
        Workspace
    </span>

      <ChevronDown
        size={16}
        className="text-white/70"
      />
    </button>
  );
}