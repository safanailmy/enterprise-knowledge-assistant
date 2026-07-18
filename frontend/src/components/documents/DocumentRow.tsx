import {
  FileText,
  MoreHorizontal,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

type Props = {
  name: string;
  status: "Indexed" | "Processing" | "Failed";
  size: string;
  updated: string;
};

export default function DocumentRow({
  name,
  status,
  size,
  updated,
}: Props) {
  return (
    <div
      className="
        grid
        grid-cols-[1.8fr_1fr_120px_140px_40px]
        items-center
        border-b
        border-white/6
        px-6
        py-4
        transition
        hover:bg-white/[0.03]
      "
    >
      {/* Name */}

      <div className="flex items-center gap-3">

        <FileText
          size={18}
          className="text-[#8CB6FF]"
        />

        <span className="text-[14px] text-white">
          {name}
        </span>

      </div>

      {/* Status */}

      <StatusBadge status={status} />

      {/* Size */}

      <span className="text-sm text-white/55">
        {size}
      </span>

      {/* Updated */}

      <span className="text-sm text-white/55">
        {updated}
      </span>

      {/* Menu */}

      <button
        className="
          flex
          justify-center
          text-white/40
          transition
          hover:text-white
        "
      >
        <MoreHorizontal size={18} />
      </button>

    </div>
  );
}