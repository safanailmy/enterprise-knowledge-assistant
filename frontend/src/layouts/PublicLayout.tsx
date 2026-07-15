import ThemeBackground from "../components/layout/ThemeBackground";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <ThemeBackground>
      <main
        className="min-h-screen flex items-center justify-center"
        style={{
          color: "var(--text-primary)",
        }}
      >
        <Outlet />
      </main>
    </ThemeBackground>
    
  );
}