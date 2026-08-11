import { useState } from "react";
import { RotateCw } from "lucide-react";

import AuditFilters from "../../components/audit-logs/AuditFilters";
import AuditStats from "../../components/audit-logs/AuditStats";
import AuditTable from "../../components/audit-logs/AuditTable";

import { useAuditLogs } from "../../hooks/useAuditLogs";

export default function AuditLogsPage() {
  const {
    logs,
    loading,
    error,
    refreshAuditLogs,
  } = useAuditLogs();

  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("All");
  const [selectedResource, setSelectedResource] = useState("All");

  // Available filter options
  const actions = [
    "All",
    ...new Set(logs.map((log) => log.action)),
  ];

  const resources = [
    "All",
    ...new Set(logs.map((log) => log.resource_type)),
  ];

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      search === "" ||
      log.user_email.toLowerCase().includes(search) ||
      log.action.toLowerCase().includes(search) ||
      log.resource_type.toLowerCase().includes(search) ||
      (log.resource_id ?? "").toLowerCase().includes(search);

    const matchesAction =
      selectedAction === "All" ||
      log.action === selectedAction;

    const matchesResource =
      selectedResource === "All" ||
      log.resource_type === selectedResource;

    return (
      matchesSearch &&
      matchesAction &&
      matchesResource
    );
  });

  return (
    <main
      className="
        mx-auto
        flex
        h-full
        w-full
        max-w-7xl
        flex-col
        overflow-hidden
        px-10
        pt-0
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Audit Logs
          </h1>

          <p className="mt-2 text-sm text-white/60">
            Track every action performed in the system.
          </p>
        </div>

        <button
          type="button"
          onClick={refreshAuditLogs}
          className="
            mt-5
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-blue-500/15
            px-4
            py-2.5
            text-sm
            text-white
            transition
            hover:bg-blue-500/25
            active:scale-95
          "
        >
          <RotateCw size={16} />
          Refresh
        </button>
      </div>

      <div className="mt-6 border-b border-white/10" />

      {/* Statistics */}
      <div className="mt-6">
        <AuditStats logs={logs} />
      </div>

      {/* Table */}
      <div className="mt-6 min-h-0 flex-1 overflow-hidden">
        <div
          className="
            flex
            h-full
            flex-col
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
          "
        >
          <AuditFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            actions={actions}
            selectedAction={selectedAction}
            onActionChange={setSelectedAction}
            resources={resources}
            selectedResource={selectedResource}
            onResourceChange={setSelectedResource}
          />

          <AuditTable
            logs={filteredLogs}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </main>
  );
}