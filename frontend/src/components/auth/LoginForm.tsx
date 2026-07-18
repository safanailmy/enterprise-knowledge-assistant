import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isFormValid =
  email.trim() !== "" &&
  password.trim() !== "";

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (isLoading) return;

  setError("");
  setIsLoading(true);

  try {
    await login(email, password);

    navigate("/dashboard");
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      setError("Invalid email or password.");
    } else {
      setError("Unable to sign in. Please try again.");
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      {/* Header */}

      <div className="mb-10">
        <h2 className="text-3xl font-semibold text-white">
          Welcome Back
        </h2>

        <p className="mt-3 leading-7 text-white/55">
          Sign in to access your Enterprise Knowledge Assistant.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Error Message */}

        {error && (
          <div
            className="
              rounded-xl
              border
              border-red-500/30
              bg-red-500/10
              px-4
              py-3
              text-sm
              text-red-300
            "
          >
            {error}
          </div>
        )}

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-medium text-white/65">
            Email Address
          </label>

          <div
            className="
              group
              flex
              items-center
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              px-4
              transition-all
              duration-300
              focus-within:border-blue-400/80
              focus-within:bg-white/[0.06]
              focus-within:shadow-[0_0_20px_rgba(59,130,246,.18)]
            "
          >
            <Mail
              size={19}
              className="
                mr-3
                text-white/35
                transition-colors
                duration-300
                group-focus-within:text-blue-400
              "
            />

            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                h-10
                w-full
                bg-transparent
                text-white
                placeholder:text-white/30
                outline-none
              "
              required
            />
          </div>
        </div>

        {/* Password */}

        <div>
          <label className="mb-2 block text-sm font-medium text-white/65">
            Password
          </label>

          <div
            className="
              group
              flex
              items-center
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              px-4
              transition-all
              duration-300
              focus-within:border-blue-400/80
              focus-within:bg-white/[0.06]
              focus-within:shadow-[0_0_20px_rgba(59,130,246,.18)]
            "
          >
            <Lock
              size={19}
              className="
                mr-3
                text-white/35
                transition-colors
                duration-300
                group-focus-within:text-blue-400
              "
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                h-10
                w-full
                bg-transparent
                text-white
                placeholder:text-white/30
                outline-none
              "
              required
            />
          </div>
        </div>

        {/* Sign In Button */}

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="
            group
            mt-3
            flex
            h-14
            w-full
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-r
            from-[#3B82F6]
            via-[#2563EB]
            to-[#1D4ED8]
            font-medium
            text-white
            shadow-[0_10px_35px_rgba(37,99,235,.35)]
            transition-all
            duration-300

            enabled:hover:-translate-y-1
            enabled:hover:shadow-[0_18px_45px_rgba(37,99,235,.45)]

            disabled:opacity-50
            disabled:shadow-none
          "
        >
          {isLoading ? (
            <>
              <Loader2
                size={18}
                className="mr-2 animate-spin"
              />

              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>

              <ArrowRight
                size={18}
                className="
                  ml-2
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </>
          )}
        </button>

        {/* Divider */}

        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
        </div>

        {/* Footer */}

        <p className="text-center text-sm leading-7 text-white/45">
          Need an account?
          <br />
          Please contact your system administrator.
        </p>
      </form>
    </>
  );
}