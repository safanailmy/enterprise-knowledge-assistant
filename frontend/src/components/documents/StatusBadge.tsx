type Props = {
  status: "Indexed" | "Processing" | "Failed";
};

export default function StatusBadge({ status }: Props) {
  const styles = {
    Indexed:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Processing:
      "bg-sky-500/10 text-sky-400 border-sky-500/20",
    Failed:
      "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1
        text-[12px]
        font-medium
        ${styles[status]}
      `}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {status}
    </span>
  );
}