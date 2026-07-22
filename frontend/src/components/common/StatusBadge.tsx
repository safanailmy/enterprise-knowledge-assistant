type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const normalizedStatus = status.toUpperCase();

  let classes =
    "bg-gray-500/10 text-gray-400";

  switch (normalizedStatus) {
    case "READY":
      classes =
        "bg-emerald-500/10 text-emerald-400";
      break;

    case "PROCESSING":
      classes =
        "bg-sky-500/10 text-sky-400";
      break;

    case "FAILED":
      classes =
        "bg-red-500/10 text-red-400";
      break;
  }

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-2.5
        py-1
        text-[11px]
        font-medium
        ${classes}
      `}
    >
      ● {normalizedStatus}
    </span>
  );
}