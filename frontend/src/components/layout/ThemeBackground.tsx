export default function ThemeBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg,#0A2742 0%, #0E3B56 45%, #071A2A 100%)",
      }}
    >
      {children}
    </div>
  );
}