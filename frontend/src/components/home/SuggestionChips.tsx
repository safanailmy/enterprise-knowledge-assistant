import {
  FileText,
  UserRound,
  ShieldCheck,
} from "lucide-react";

const chips = [
  {
    icon: FileText,
    label: "Explain Leave Policy",
  },
  {
    icon: UserRound,
    label: "Employee Handbook",
  },
  {
    icon: ShieldCheck,
    label: "ISO 27001 Guide",
  },
];

export default function SuggestionChips() {
  return (
    <div className="flex justify-center gap-2">
      {chips.map(({ icon: Icon, label }) => (
        <button
          key={label}
          className="
            group
            flex
            items-center
            gap-2
            rounded-full
            border
            px-3
            py-1.5
            text-xs
            font-medium
            text-white/65
            backdrop-blur-md
            transition-all
            duration-300
            hover:-translate-y-[1px]
            hover:text-white
          "
          style={{
            background: "rgba(255,255,255,.035)",
            borderColor: "rgba(255,255,255,.08)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,.04)",
          }}
        >
          <Icon
            size={14}
            className="
              text-white/45
              transition-colors
              duration-300
              group-hover:text-[#9DBDFF]
            "
          />
          {label}
        </button>
      ))}
    </div>
  );
}