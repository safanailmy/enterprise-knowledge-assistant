import {
  FileClock,
  CalendarDays,
  Users,
  Database,
} from "lucide-react";

import { AuditLog } from "../../types/auditLog";

type Props = {
  logs: AuditLog[];
};

export default function AuditStats({ logs }: Props) {
  const today = new Date();

  const todayLogs = logs.filter((log) => {
    const logDate = new Date(log.created_at);

    return (
      logDate.getFullYear() === today.getFullYear() &&
      logDate.getMonth() === today.getMonth() &&
      logDate.getDate() === today.getDate()
    );
  });

  const uniqueUsers = new Set(
    logs.map((log) => log.user_email)
  );

  const uniqueResources = new Set(
    logs.map((log) => log.resource_type)
  );

  const stats = [
    {
      title: "Total",
      value: logs.length,
      icon: FileClock,
    },
    {
      title: "Today",
      value: todayLogs.length,
      icon: CalendarDays,
    },
    {
      title: "Users",
      value: uniqueUsers.size,
      icon: Users,
    },
    {
      title: "Resources",
      value: uniqueResources.size,
      icon: Database,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
              group
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              px-4
              py-3
              backdrop-blur-xl
              shadow-lg
              shadow-black/10
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-white/20
              hover:bg-white/[0.06]
              hover:shadow-blue-500/10
            "
          >
            <div className="flex items-center justify-between">

              {/* Text */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-white/50">
                  {stat.title}
                </p>

                <h2 className="mt-1 text-xl font-bold text-white">
                  {stat.value}
                </h2>
              </div>

              {/* Icon */}
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-blue-400/15
                  bg-blue-500/10
                  text-blue-300
                  transition-all
                  duration-300
                  group-hover:bg-blue-500/20
                  group-hover:scale-105
                "
              >
                <Icon size={18} />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}