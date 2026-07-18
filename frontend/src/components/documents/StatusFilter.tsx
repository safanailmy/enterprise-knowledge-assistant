const filters = [
  "All (24)",
  "Indexed (20)",
  "Processing (2)",
  "Failed (2)",
];

export default function StatusFilter() {
  return (
    <div className="flex gap-2">
      {filters.map((item, index) => (
        <button
          key={item}
          className={`
            rounded-full
            border
            px-4
            py-2
            text-xs
            transition
            ${
              index === 0
                ? "border-[#5C86F8] bg-[#5C86F8] text-white"
                : "border-white/10 bg-transparent text-white/60 hover:bg-white/5"
            }
          `}
        >
          {item}
        </button>
      ))}
    </div>
  );
}