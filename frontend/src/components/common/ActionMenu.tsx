import { useEffect, useRef, useState } from "react";
import {
  Eye,
  Download,
  Upload,
  Trash2,
  MoreHorizontal,
  RotateCcw,
  Trash,
  History,
} from "lucide-react";

type ActionMenuProps = {
  isRecycleBin: boolean;

  onView: () => void;
  onDownload: () => void;
  onUploadVersion: () => void;
  onViewVersions: () => void;
  onDelete: () => void;

  onRestore: () => void;
  onPermanentDelete: () => void;
};

export default function ActionMenu({
  isRecycleBin,
  onView,
  onDownload,
  onUploadVersion,
  onViewVersions,
  onDelete,
  onRestore,
  onPermanentDelete,
}: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  function handleAction(action: () => void) {
    action();
    setOpen(false);
  }

  return (
    <div
      className="relative flex justify-center"
      ref={menuRef}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          rounded-lg
          p-2
          text-white/45
          transition-all
          hover:bg-white/5
          hover:text-white
        "
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-10
            z-50
            w-56
            overflow-hidden
            rounded-xl
            border
            border-white/10
            bg-[#173A5D]
            shadow-2xl
            backdrop-blur-lg
          "
        >
          {isRecycleBin ? (
            <>
              <MenuItem
                icon={<RotateCcw size={17} />}
                label="Restore Document"
                onClick={() => handleAction(onRestore)}
              />

              <div className="my-1 border-t border-white/10" />

              <MenuItem
                danger
                icon={<Trash size={17} />}
                label="Delete Permanently"
                onClick={() =>
                  handleAction(onPermanentDelete)
                }
              />
            </>
          ) : (
            <>
              <MenuItem
                icon={<Eye size={17} />}
                label="View Document"
                onClick={() => handleAction(onView)}
              />

              <MenuItem
                icon={<Download size={17} />}
                label="Download"
                onClick={() => handleAction(onDownload)}
              />

              <MenuItem
                icon={<Upload size={17} />}
                label="Upload New Version"
                onClick={() =>
                  handleAction(onUploadVersion)
                }
              />

              <MenuItem
                icon={<History size={17} />}
                label="Version History"
                onClick={() =>
                  handleAction(onViewVersions)
                }
              />

              <div className="my-1 border-t border-white/10" />

              <MenuItem
                danger
                icon={<Trash2 size={17} />}
                label="Delete Document"
                onClick={() => handleAction(onDelete)}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
};

function MenuItem({
  icon,
  label,
  onClick,
  danger = false,
}: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-3
        px-4
        py-3
        text-sm
        transition-all

        ${
          danger
            ? "text-red-400 hover:bg-red-500/10"
            : "text-white/80 hover:bg-white/5 hover:text-white"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}