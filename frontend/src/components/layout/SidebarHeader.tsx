import {
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { useSidebar } from "../../context/SidebarContext";
import Logo from "../layout/Logo";

export default function SidebarHeader() {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <div className="px-5 pt-8 pb-6">
      {/* Expanded Sidebar */}
      {!collapsed ? (
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-base font-semibold leading-none">
              Enterprise
            </h1>

            <p
              className="mt-1 text-xs"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Knowledge Assistant
            </p>
          </div>

          <button
            onClick={toggleSidebar}
            className="
              rounded-lg
              p-2
              transition
              hover:bg-white/10
            "
          >
            <PanelLeftClose size={18} />
          </button>
        </div>
      ) : (
        /* Collapsed Sidebar */
        <button
          onClick={toggleSidebar}
          className="
            group
            relative
            mx-auto
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            transition-all
            duration-300
            hover:bg-white/[0.08]
            hover:border-cyan-400/30
          "
        >
          <div
            className="
              absolute
              transition-all
              duration-300
              opacity-100
              group-hover:opacity-0
              group-hover:scale-90
              group-hover:rotate-6
              group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]
              group-hover:[filter:drop-shadow(0_0_8px_rgba(255,255,255,0.5))_drop-shadow(0_0_18px_rgba(56,189,248,0.9))]
            "
          >
            <Logo className="h-6 w-6 text-white/90 transition-all duration-300"/>
          </div>

          <PanelLeftOpen
            size={20}
            className="
              absolute
              transition-all
              duration-300
              opacity-0
              scale-75
              group-hover:opacity-100
              group-hover:scale-100
            "
          />
        </button>
      )}

      <div
        className="mt-7"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      />
    </div>
  );
}