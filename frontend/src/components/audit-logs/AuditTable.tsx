import { AuditLog } from "../../types/auditLog";

type Props = {
  logs: AuditLog[];
  loading: boolean;
  error: string | null;
};

export default function AuditTable({
  logs,
  loading,
  error,
}: Props) {
  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-white/60">
          Loading audit logs...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-red-400">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 scrollbar-hide">
      <table className="w-full">
        <thead className="sticky top-0 z-10 bg-[#173A5D]">
          <tr className="border-b border-white/10">
            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
              Time
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
              User
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
              Action
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
              Resource
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
              Resource ID
            </th>
          </tr>
        </thead>

        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-32 text-center text-white/40"
              >
                No audit logs available.
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr
                key={log.audit_id}
                className="
                  border-b
                  border-white/5
                  transition-colors
                  hover:bg-white/[0.03]
                "
              >
                <td className="px-6 py-4 text-sm text-white">
                  {new Date(log.created_at).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-sm text-white">
                  {log.user_email}
                </td>

                <td className="px-6 py-4 text-sm text-white">
                  {log.action}
                </td>

                <td className="px-6 py-4 text-sm text-white">
                  {log.resource_type}
                </td>

                <td className="px-6 py-4 text-sm text-white/70">
                  {log.resource_id ?? "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}