const tabs = [
  "All (24)",
  "Indexed (20)",
  "Processing (2)",
  "Failed (2)",
];

export default function StatusTabs() {
  return (
    <section className="mb-5">

      <div className="flex gap-3">

        {tabs.map((tab, index) => (

          <button
            key={tab}
            className={`
              rounded-full
              border
              px-4
              py-2
              text-sm
              transition-all

              ${
                index === 0
                  ? "border-[#5C86F8] bg-[#5C86F8] text-white"
                  : "border-white/10 text-white/60 hover:bg-white/5 hover:text-white"
              }
            `}
          >
            {tab}
          </button>

        ))}

      </div>

    </section>
  );
}