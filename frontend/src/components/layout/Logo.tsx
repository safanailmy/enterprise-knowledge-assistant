import { BrainCircuit } from "lucide-react";

export default function Logo() {
  return (
    <div
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
      "
      style={{
        backgroundColor: "var(--bg-hover)",
      }}
    >
      <BrainCircuit size={20} />
    </div>
  );
}