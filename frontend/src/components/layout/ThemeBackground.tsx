export default function ThemeBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(
            circle at 50% 35%,
            rgba(88,150,255,.12) 0%,
            transparent 45%
          ),

          radial-gradient(
            circle at 50% 85%,
            rgba(35,105,180,.18) 0%,
            transparent 55%
          ),

          linear-gradient(
            180deg,
            #0A2742 0%,
            #0D3655 45%,
            #071A2A 100%
          )
        `,
      }}
    >
      {children}
    </div>
  );
}