import { NavLink } from "react-router-dom";
import { LucideIcon } from "lucide-react";

import { useSidebar } from "../../context/SidebarContext";

interface NavItemProps {
  to: string;
  label: string;
  icon: LucideIcon;
}

export default function NavItem({
  to,
  label,
  icon: Icon,
}: NavItemProps) {

  const { collapsed } = useSidebar();

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        group
        flex
        items-center
        rounded-xl
        transition-all
        duration-200
        h-11
        ${
          collapsed
            ? "justify-center w-11 mx-auto"
            : "pl-3 pr-4 gap-3"
        }
        ${
          isActive
            ? "bg-white/10"
            : "hover:bg-white/10 border-l-2 border-sky-950"
        }
      `}
    >
      {({ isActive }) => (
        <>
          <Icon
            size={18}
            className={
              isActive
                ? "text-blue-400"
                : "text-slate-300 group-hover:text-white"
            }
          />

          {!collapsed && (
            <span
              className={
                isActive
                  ? "text-white font-medium"
                  : "text-slate-300 group-hover:text-white"
              }
            >
              {label}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}