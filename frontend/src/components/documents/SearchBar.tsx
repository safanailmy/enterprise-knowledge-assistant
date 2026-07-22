import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-white/35
        "
      />

      <input
  type="text"
  value={value}
  onChange={(e) => onChange(e.target.value)}
  placeholder="Search documents..."
  className="
    h-11
    w-full
    rounded-xl
    border
    border-white/10
    bg-[#183C61]
    pl-11
    pr-4
    text-sm
    text-white
    placeholder:text-white/35
    outline-none
    transition-all
    focus:border-[#5C86F8]
    focus:ring-2
    focus:ring-[#5C86F8]/20
  "
/>
    </div>
  );
}