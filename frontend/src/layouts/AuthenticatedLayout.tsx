import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import ThemeBackground from "../components/layout/ThemeBackground";
import TopBar from "../components/layout/TopBar";

export default function AuthenticatedLayout() {
  return (

    <ThemeBackground>
      <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}

        <Sidebar />

        {/* Main */}

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">

          <TopBar />

          <div className="flex-1 overflow-hidden p-8">
              <Outlet />
          </div>

      </main>

     </div>
    </ThemeBackground>
    
  );
}