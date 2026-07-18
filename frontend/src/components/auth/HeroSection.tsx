import "./frontend.css";
import ekaIcon from "../../assets/EKA-Logo.png";

export default function HeroSection() {
  return (
    <section
      className="
        relative
        flex
        flex-1
        flex-col
        items-center
        justify-center
        overflow-visible
        select-none
      "
    >
      {/* Background Glow 1 */}
      <div
        className="
          animate-glow
          absolute
          h-[700px]
          w-[700px]
          blur-[220px]
          rounded-full
          bg-[#2563EB]/10
          blur-[180px]
        "
      />

      {/* Background Glow 2 */}
      <div
        className="
          animate-glow
          absolute
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-400/10
          blur-[120px]
        "
        style={{
          animationDelay: "1.5s",
        }}
      />

      {/* Background Glow 3 */}
      <div
        className="
          absolute
          h-[260px]
          w-[260px]
          rounded-full
          bg-blue-400/20
          blur-[70px]
        "
      />

      {/* Reflection */}
      <div
        className="
          animate-reflection
          absolute
          top-[73%]
          h-16
          w-72
          rounded-full
          bg-blue-400/20
          blur-3xl
        "
      />

      {/* Logo */}
      <img
        src={ekaIcon}
        alt="Enterprise Knowledge Assistant"
        draggable={false}
        className="
          animate-logo
          relative
          z-10
          w-[420px]
          transition-all
          duration-500
          hover:scale-[1.03]
          drop-shadow-[0_0_80px_rgba(59,130,246,.55)]
        "
      />

      {/* Product Name */}
      <div className="mt-8 text-center">

        <p
          className="
            text-xs
            uppercase
            tracking-[0.45em]
            text-white/40
          "
        >
          Enterprise Knowledge Assistant
        </p>

      </div>
    </section>
  );
}