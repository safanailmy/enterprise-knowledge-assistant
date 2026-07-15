import { Bell } from "lucide-react";

export default function NotificationButton() {
  return (
    <button
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        border
        transition
        hover:bg-white/5
      "
      style={{
        borderColor: "rgba(255,255,255,.10)",
        background: "rgba(255,255,255,.05)",
      }}
    >
      <Bell size={18} className="text-white"/>
    </button>
  );
}