import {
  X,
  Mail,
  Building2,
  ShieldCheck,
  Fingerprint,
} from "lucide-react";

import { MyProfileResponse } from "../../types/user";

type Props = {
  open: boolean;
  user: MyProfileResponse | null;
  onClose: () => void;
};

export default function ProfileModal({
  open,
  user,
  onClose,
}: Props) {
  if (!open || !user) return null;

  const initials = user.full_name
    .split(" ")
    .map((name) => name[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-slate-950/70
        backdrop-blur-md
        p-4
      "
    >
      <div
        className="
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-gradient-to-b
          from-[#1B446D]
          via-[#173A5D]
          to-[#143553]
          shadow-2xl
          shadow-black/50
        "
      >
        {/* Top Accent */}
        <div className="h-20 bg-gradient-to-r from-blue-800/40 via-cyan-800/40 to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute
            right-5
            top-5
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white/5
            text-white/70
            backdrop-blur
            transition-all
            duration-300
            hover:rotate-90
            hover:bg-white/10
            hover:text-white
          "
        >
          <X size={18} />
        </button>

        {/* Avatar */}
        <div className="-mt-10 flex justify-center">
          <div
            className="
              relative
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-blue-500
              via-blue-600
              to-sky-700
              text-2xl
              font-bold
              text-white
              ring-4
              ring-[#173A5D]
              shadow-xl
              shadow-blue-500/30
            "
          >
            {initials}

            <span
              className="
                absolute
                bottom-1
                right-1
                h-4
                w-4
                rounded-full
                border-2
                border-[#173A5D]
                bg-emerald-400
              "
            />
          </div>
        </div>

        {/* Name */}
        <div className="px-8 pt-4 pb-5 text-center">
          <h2 className="text-xl font-semibold text-white">
            {user.full_name}
          </h2>

          <div
            className="
              mx-auto
              mt-3
              inline-flex
              items-center
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

        {/* Details */}
        <div className="space-y-3 px-5 pb-5">
          <ProfileItem
            icon={<Mail size={18} />}
            label="Email"
            value={user.email}
          />

          <ProfileItem
            icon={<Building2 size={18} />}
            label="Department"
            value={user.department}
          />

          <ProfileItem
            icon={<ShieldCheck size={18} />}
            label="Role"
            value={user.role}
          />

          <ProfileItem
            icon={<Fingerprint size={18} />}
            label="User ID"
            value={user.user_id}
          />
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-6 py-4">
          <p className="text-center text-xs text-white/35">
            Enterprise Knowledge Assistant
          </p>
        </div>
      </div>
    </div>
  );
}

type ItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function ProfileItem({
  icon,
  label,
  value,
}: ItemProps) {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-white/5
        bg-white/[0.04]
        px-4
        py-3
        transition-all
        duration-200
        hover:border-blue-400/20
        hover:bg-white/[0.06]
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-blue-400/20
          bg-blue-500/10
          text-blue-300
          transition-colors
          group-hover:bg-blue-500/20
        "
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className="
            text-[11px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-white/45
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            break-all
            text-sm
            font-medium
            text-white
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}