import { ReactNode } from "react";

type Props = {
  title: string;
  value: number;
  icon: ReactNode;
};

export default function OverviewCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-5
        transition-all
        duration-200
        hover:border-cyan-400/30
        hover:bg-white/10
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-slate-400">{icon}</span>

        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {title}
        </span>
      </div>

      <h2 className="mt-6 text-3xl font-bold text-white">
        {value.toLocaleString()}
      </h2>
    </div>
  );
}