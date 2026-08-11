import { UserAnalytics } from "../../types/analytics";

import UserDepartmentChart from "./UserDepartmentChart";
import UserRoleChart from "./UserRoleChart";

type Props = {
  users: UserAnalytics;
};

export default function AnalyticsUserCharts({
  users,
}: Props) {
  return (
    <section className="mt-12">
      <h2 className="mb-5 text-lg font-semibold text-white">
        User Analytics
      </h2>

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        <UserDepartmentChart
          data={users.by_department}
        />

        <UserRoleChart
          data={users.by_role}
        />
      </div>
    </section>
  );
}