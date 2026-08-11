import {
  ChevronRight,
  UserRound,
} from "lucide-react";

import { MyProfileResponse } from "../../types/user";

type Props = {
  user: MyProfileResponse;
  onViewProfile: () => void;
};

export default function ProfileDropdown({
  user,
  onViewProfile,
}: Props) {
  const initials = user.full_name
    .split(" ")
    .map((name) => name[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="
        w-58
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
      "
    >
      {/* Top Accent */}
      <div className="bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-500" />

      {/* User Section */}
      <div className="px-5 py-4">
        <div className="flex flex-col items-center">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-blue-500
              via-blue-600
              to-sky-700
              text-xl
              font-bold
              text-white
              ring-2
              ring-white/10
              shadow-lg
              shadow-blue-500/30
            "
          >
            {initials}
          </div>

          <h3 className="mt-3 text-lg font-semibold text-white">
            {user.full_name}
          </h3>

          <div
            className="
              mt-2
              rounded-full
              border
              border-blue-400/20
              bg-blue-400/10
              px-3
              py-1
              text-xs
              font-medium
              text-blue-200
            "
          >
            {user.department} • {user.role}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-white/10" />

      {/* Menu */}
      <div className="p-3">
        <button
            onClick={onViewProfile}
          className="
            group
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            px-4
            py-3
            text-white
            transition-all
            duration-200
            hover:bg-white/8
            hover:translate-x-1
          "
        >
          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-white/5
                transition-all
                duration-200
                group-hover:bg-blue-500/20
              "
            >
              <UserRound
                size={18}
                className="text-blue-300"
              />
            </div>

            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">
                My Profile
              </span>

              <span className="text-xs text-white/50">
                View your profile
              </span>
            </div>
          </div>

          <ChevronRight
            size={17}
            className="
              text-white/40
              transition-transform
              duration-200
              group-hover:translate-x-1
            "
          />
        </button>
      </div>
    </div>
  );
}