import {
  Settings,
  LogOut,
  User,
} from "lucide-react";

import { useSidebar } from "../../context/SidebarContext";

export default function SidebarFooter() {

  const { collapsed } = useSidebar();

  return (
    <div className="mt-auto pt-6 space-y-2">

      <button
        className="flex items-center gap-1 rounded-lg p-3 hover:bg-white/10 transition w-full"
      >
        <User size={20} />

        {!collapsed && <span>Safana</span>}
      </button>

      <button
        className="flex items-center gap-1 rounded-lg p-3 hover:bg-white/10 transition w-full"
      >
        <Settings size={20} />

        {!collapsed && <span>Settings</span>}
      </button>

      <button
        className="flex items-center gap-1 rounded-lg p-3 hover:bg-red-500/20 transition w-full"
      >
        <LogOut size={20} />

        {!collapsed && <span>Logout</span>}
      </button>

    </div>
  );
}