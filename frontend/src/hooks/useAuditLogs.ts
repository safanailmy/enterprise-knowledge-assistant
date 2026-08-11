import { useEffect, useState } from "react";

import { getAuditLogs } from "../api/auditLogs";
import { AuditLog } from "../types/auditLog";

export function useAuditLogs() {
  const [logs, setLogs] =
    useState<AuditLog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  async function refreshAuditLogs() {
    try {
      setLoading(true);

      const response =
        await getAuditLogs();

      setLogs(response.audit_logs);

      setError(null);
    } catch (err) {
      console.error(err);

      setError("Failed to load audit logs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshAuditLogs();
  }, []);

  return {
    logs,
    loading,
    error,
    refreshAuditLogs,
  };
}