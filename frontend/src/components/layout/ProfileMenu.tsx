import {
  ChevronDown,
  UserCircle2,
} from "lucide-react";

import {
  useState,
  useEffect,
  useRef,
} from "react";

import ProfileDropdown from "../profile/ProfileDropdown";

import { getMyProfile } from "../../api/users";
import { MyProfileResponse } from "../../types/user";
import { useProfile } from "../../context/ProfileContext";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const { openProfile } = useProfile();
  const [user, setUser] =
    useState<MyProfileResponse | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getMyProfile();
        setUser(profile);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
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

  const initials =
    user?.full_name
      ?.split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "";

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          group
          flex
          items-center
          gap-3
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
        {/* Avatar */}
        <div
          className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-blue-500
            via-blue-600
            to-sky-700
            text-sm
            font-semibold
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
          {initials ? (
            initials
          ) : (
            <UserCircle2 size={22} />
          )}

          {/* Online indicator */}
          <span
            className="
              absolute
              bottom-0
              right-0
              h-3
              w-3
              rounded-full
              border-2
              border-[#16395C]
              bg-emerald-400
            "
          />
        </div>

        {/* Name */}
        <div className="flex flex-col items-start">
          <span className="max-w-[160px] truncate text-sm font-semibold text-white">
            {user?.full_name ?? "Loading..."}
          </span>

          {user && (
            <span className="text-xs text-white/50">
              {user.role}
            </span>
          )}
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

      {user && (
        <div
          className={`
            absolute
            -right-3
            top-full
            mt-3
            origin-top-right
            transition-all
            duration-200
            ${
              open
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-2 scale-95 opacity-0"
            }
          `}
        >
          <ProfileDropdown
  user={user}
  onViewProfile={() => {
    setOpen(false);
    openProfile();
  }}
/>
        </div>
      )}
    </div>
  );
}