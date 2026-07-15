import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";

import { useSidebar } from "../../context/SidebarContext";

export default function Sidebar() {

  const { collapsed } = useSidebar();

  return (

    <aside
      className={`
        flex
        flex-col
        transition-all
        duration-300
        h-screen
        ${collapsed ? "w-[72px]" : "w-[248px]"}
      `}
      style={{
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-primary)",
      }}
    >

      <SidebarHeader />

      <SidebarNav />

      <SidebarFooter />

    </aside>

  );
}