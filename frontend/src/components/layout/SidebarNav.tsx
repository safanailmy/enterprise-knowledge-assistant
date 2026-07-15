import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Users,
  ClipboardList,
  BarChart3,
} from "lucide-react";

import NavItem from "./NavItem";

export default function SidebarNav() {
  return (
    <nav className="flex-1 flex flex-col gap-1 pt-2">

      <NavItem
        to="/dashboard"
        label="Home"
        icon={LayoutDashboard}
      />

      <NavItem
        to="/chat"
        label="AI Chat"
        icon={MessageSquare}
      />

      <NavItem
        to="/documents"
        label="Documents"
        icon={FileText}
      />

      <NavItem
        to="/users"
        label="Users"
        icon={Users}
      />

      <NavItem
        to="/audit-logs"
        label="Audit Logs"
        icon={ClipboardList}
      />

      <NavItem
        to="/analytics"
        label="Analytics"
        icon={BarChart3}
      />

    </nav>
  );
}