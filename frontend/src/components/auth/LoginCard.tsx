import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <section
      className="
        relative
        w-full
        max-w-md
        overflow-hidden
        rounded-[40px]
        border
        border-white/10
        bg-white/[0.045]
        p-10
        backdrop-blur-3xl
        shadow-[0_25px_80px_rgba(0,0,0,.35)]
      "
    >
      {/* Top Highlight */}
      <div
        className="
          absolute
          left-0
          top-0
          h-px
          w-full
          bg-gradient-to-r
          from-transparent
          via-blue-400/60
          to-transparent
        "
      />

      {/* Blue Glow */}
      <div
        className="
          absolute
          -right-20
          -top-20
          h-52
          w-52
          rounded-full
          bg-blue-500/10
          blur-[90px]
        "
      />

      {/* Bottom Glow */}
      <div
        className="
          absolute
          -bottom-24
          left-1/2
          h-52
          w-52
          -translate-x-1/2
          rounded-full
          bg-cyan-400/10
          blur-[100px]
        "
      />

      <div className="relative z-10">
        <LoginForm />
      </div>
    </section>
  );
}