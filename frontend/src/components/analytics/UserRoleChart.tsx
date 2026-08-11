import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { CountByName } from "../../types/analytics";

type Props = {
  data: CountByName[];
};

const COLORS = [
  "#3B82F6",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
];

export default function UserRoleChart({
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
        Users by Role
      </h3>

      <div className="h-[380px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="name"
              outerRadius={120}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}