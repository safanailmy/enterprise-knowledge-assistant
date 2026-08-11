import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { CountByName } from "../../types/analytics";

type Props = {
  data: CountByName[];
};

export default function QueriesDepartmentChart({
  data,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
      "
    >
      <h3 className="mb-8 text-lg font-semibold text-white">
        Queries by Department
      </h3>

      <div className="h-[380px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            layout="vertical"
            data={data}
          >
            <CartesianGrid stroke="#334155" />

            <XAxis type="number" />

            <YAxis
              type="category"
              dataKey="name"
              width={100}
            />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#06B6D4"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}