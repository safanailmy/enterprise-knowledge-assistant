import { Search, ChevronDown } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  searchTerm: string;
  onSearchChange: (value: string) => void;

  actions: string[];
  selectedAction: string;
  onActionChange: (value: string) => void;

  resources: string[];
  selectedResource: string;
  onResourceChange: (value: string) => void;
};

export default function AuditFilters({
  searchTerm,
  onSearchChange,
  actions,
  selectedAction,
  onActionChange,
  resources,
  selectedResource,
  onResourceChange,
}: Props) {
  const [actionOpen, setActionOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);

  const actionRef = useRef<HTMLDivElement>(null);
  const resourceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target as Node)
      ) {
        setActionOpen(false);
      }

      if (
        resourceRef.current &&
        !resourceRef.current.contains(event.target as Node)
      ) {
        setResourceOpen(false);
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

  return (
    <div
      className="
        flex
        items-center
        justify-between
        border-b
        border-white/10
        p-5
      "
    >
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-white/40
            "
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search audit logs..."
            className="
              w-80
              rounded-xl
              border
              border-white/10
              bg-white/[0.05]
              py-2.5
              pl-10
              pr-4
              text-sm
              text-white
              placeholder:text-white/40
              outline-none
              transition-all
              duration-200
              focus:border-blue-400/50
              focus:bg-white/[0.08]
              focus:ring-2
              focus:ring-blue-500/20
            "
          />
        </div>

        {/* Action Filter */}
        <div
          ref={actionRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => {
              setActionOpen((prev) => !prev);
              setResourceOpen(false);
            }}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/[0.05]
              px-4
              py-2.5
              text-sm
              text-white
              transition-all
              duration-200
              hover:border-white/20
              hover:bg-white/[0.08]
            "
          >
            <span>{selectedAction}</span>

            <ChevronDown
              size={16}
              className={`
                transition-transform
                duration-200
                ${
                  actionOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>

          {actionOpen && (
            <div
              className="
                absolute
                left-0
                z-20
                mt-2
                w-52
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-gradient-to-b
                from-[#1B446D]
                via-[#173A5D]
                to-[#143553]
                shadow-2xl
                shadow-black/30
              "
            >
              {actions.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => {
                    onActionChange(action);
                    setActionOpen(false);
                  }}
                  className="
                    block
                    w-full
                    px-4
                    py-3
                    text-left
                    text-sm
                    text-white
                    transition
                    hover:bg-white/10
                  "
                >
                  {action}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Resource Filter */}
        <div
          ref={resourceRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => {
              setResourceOpen((prev) => !prev);
              setActionOpen(false);
            }}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/[0.05]
              px-4
              py-2.5
              text-sm
              text-white
              transition-all
              duration-200
              hover:border-white/20
              hover:bg-white/[0.08]
            "
          >
            <span>{selectedResource}</span>

            <ChevronDown
              size={16}
              className={`
                transition-transform
                duration-200
                ${
                  resourceOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>

          {resourceOpen && (
            <div
              className="
                absolute
                left-0
                z-20
                mt-2
                w-52
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-gradient-to-b
                from-[#1B446D]
                via-[#173A5D]
                to-[#143553]
                shadow-2xl
                shadow-black/30
              "
            >
              {resources.map((resource) => (
                <button
                  key={resource}
                  type="button"
                  onClick={() => {
                    onResourceChange(resource);
                    setResourceOpen(false);
                  }}
                  className="
                    block
                    w-full
                    px-4
                    py-3
                    text-left
                    text-sm
                    text-white
                    transition
                    hover:bg-white/10
                  "
                >
                  {resource}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}