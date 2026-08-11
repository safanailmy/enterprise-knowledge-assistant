import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Enter password",
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-white/10
          bg-slate-900/40
          px-4
          py-3
          pr-12
          text-white
          placeholder:text-white/30
          outline-none
          transition-all
          hover:border-white/20
          focus:border-blue-400
        "
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-white/50
          transition
          hover:text-white
        "
      >
        {showPassword ? (
          <EyeOff size={18} className="text-white"/>
        ) : (
          <Eye size={18} className="text-white" />
        )}
      </button>
    </div>
  );
}