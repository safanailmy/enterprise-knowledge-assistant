import Logo from "../layout/Logo";

export default function LoadingScreen() {
  return (
    <div
      className="
        flex
        h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#06111F]
        relative
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          h-[700px]
          w-[700px]
          rounded-full
          bg-blue-500/10
          blur-[180px]
        "
      />

      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
        "
      >
        <Logo className="w-28 animate-logo" />

        <h2
          className="
            mt-8
            text-xl
            font-semibold
            tracking-wide
            text-white
          "
        >
          Enterprise Knowledge Assistant
        </h2>

        <p
          className="
            mt-3
            text-sm
            text-white/50
          "
        >
          Initializing Workspace...
        </p>

        {/* Animated Dots */}

        <div className="mt-8 flex gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}