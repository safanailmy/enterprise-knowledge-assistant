import api from "./axios";

import {
  AuditLogListResponse,
} from "../types/auditLog";

export async function getAuditLogs() {
  const { data } =
    await api.get<AuditLogListResponse>(
      "/audit-logs/"
    );

  return data;
}