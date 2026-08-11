import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
} from "recharts";

import { CountByName } from "../../types/analytics";

type Props = {
  data: CountByName[];
};

export default function StatusChart({
  data,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="mb-5 text-lg font-semibold text-white">
        Documents by Status
      </h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#334155" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              radius={[6, 6, 0, 0]}
              fill="#06B6D4"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}