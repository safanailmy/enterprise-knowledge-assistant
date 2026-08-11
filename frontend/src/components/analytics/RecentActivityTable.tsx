import { RecentActivityItem } from "../../types/analytics";

type Props = {
  activities: RecentActivityItem[];
};

export default function RecentActivityTable({
  activities,
}: Props) {
  return (
    <section className="mt-12 mb-12">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Recent Activity
      </h2>

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/5
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-[#173A5D]">
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
              {activities.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-24 text-center text-white/40"
                  >
                    No recent activity.
                  </td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <tr
                    key={activity.audit_id}
                    className="
                      border-b
                      border-white/5
                      transition
                      hover:bg-white/5
                    "
                  >
                    <td className="px-6 py-4 text-white/70">
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(
                        new Date(activity.created_at)
                      )}
                    </td>

                    <td className="px-6 py-4 text-white">
                      {activity.user_email}
                    </td>

                    <td className="px-6 py-4">
                      <ActionBadge
                        action={activity.action}
                      />
                    </td>

                    <td className="px-6 py-4 text-white/80">
                      {activity.resource_type}
                    </td>

                    <td className="px-6 py-4 text-white/60">
                      {activity.resource_id ?? "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

type ActionBadgeProps = {
  action: string;
};

function ActionBadge({
  action,
}: ActionBadgeProps) {
  const colors: Record<string, string> = {
    CREATE:
      "bg-emerald-500/15 text-emerald-300",

    UPDATE:
      "bg-blue-500/15 text-blue-300",

    DELETE:
      "bg-red-500/15 text-red-300",

    LOGIN:
      "bg-cyan-500/15 text-cyan-300",

    UPLOAD:
      "bg-purple-500/15 text-purple-300",
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${
          colors[action.toUpperCase()] ??
          "bg-slate-500/15 text-slate-300"
        }
      `}
    >
      {action}
    </span>
  );
}