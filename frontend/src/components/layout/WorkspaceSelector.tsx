import {
  ChevronDown,
  Check,
  Building2,
} from "lucide-react";

import {
  useState,
  useRef,
  useEffect,
} from "react";

const departments = [
  "Human Resources",
  "Information Technology",
  "Finance",
  "Sales",
  "Marketing",
  "Legal",
  "Administration",
];

export default function WorkspaceSelector() {
  const [selected, setSelected] = useState(
    departments[0]
  );

  const [open, setOpen] = useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const initials = selected
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      {/* Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          group
          flex
          items-center
          gap-2
          rounded-full
          border
          border-white/10
          bg-white/[0.05]
          backdrop-blur-xl
          px-3.5
          py-2.5
          shadow-lg
          shadow-black/20
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:border-white/20
          hover:bg-white/[0.08]
          hover:shadow-blue-500/10
          active:scale-[0.98]
        "
      >
        {/* Department Avatar */}
        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-blue-500
            via-blue-600
            to-sky-700
            text-xs
            font-bold
            text-white
            ring-2
            ring-white/10
            shadow-lg
            shadow-blue-500/20
            transition-all
            duration-300
            group-hover:shadow-blue-400/40
          "
        >
          {initials}
        </div>

        {/* Text */}
        <div className="flex flex-col items-start">
          <span className="text-xs text-white/45">
            Department
          </span>

          <span className="max-w-[170px] truncate text-sm font-semibold text-white">
            {selected}
          </span>
        </div>

        <ChevronDown
          size={18}
          className={`
            text-white/60
            transition-all
            duration-300
            ${
              open
                ? "rotate-180 text-white"
                : ""
            }
          `}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute
          left-0
          top-full
          z-50
          mt-3
          w-72
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-b
          from-[#1B446D]
          via-[#173A5D]
          to-[#143553]
          backdrop-blur-xl
          shadow-2xl
          shadow-black/40
          origin-top-left
          transition-all
          duration-200
          ${
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none -translate-y-2 scale-95 opacity-0"
          }
        `}
      >
        {/* Accent */}
        <div className="h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-500" />

        {/* Header */}
        <div className="px-5 py-4">
          <p className="text-sm font-semibold text-white">
            Select Department
          </p>

          <p className="mt-1 text-xs text-white/50">
            Choose the workspace you want to access.
          </p>
        </div>

        <div className="mx-4 border-t border-white/10" />

        {/* Departments */}
        <div className="p-3">
          {departments.map((department) => {
            const selectedItem =
              department === selected;

            return (
              <button
                key={department}
                onClick={() => {
                  setSelected(department);
                  setOpen(false);
                }}
                className={`
                  group
                  mb-2
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-2xl
                  px-4
                  py-3
                  text-left
                  transition-all
                  duration-200
                  ${
                    selectedItem
                      ? "bg-blue-500/15 border border-blue-400/20"
                      : "hover:bg-white/6"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      ${
                        selectedItem
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-white/5 text-white/70 group-hover:bg-blue-500/10 group-hover:text-blue-300"
                      }
                    `}
                  >
                    <Building2 size={17} />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">
                      {department}
                    </span>

                    <span className="text-xs text-white/45">
                      Workspace
                    </span>
                  </div>
                </div>

                {selectedItem && (
                  <div
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      bg-emerald-500/15
                    "
                  >
                    <Check
                      size={15}
                      className="text-emerald-400"
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}