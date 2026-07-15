import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import ThemeBackground from "../components/layout/ThemeBackground";
import TopBar from "../components/layout/TopBar";

export default function AuthenticatedLayout() {
  return (

    <ThemeBackground>
      <div className="flex min-h-screen">

        {/* Sidebar */}

        <Sidebar />

        {/* Main */}

        <main className="flex-1 flex flex-col">

          <TopBar />

          <div className="flex-1 p-8">

              <Outlet />

          </div>

      </main>

     </div>
    </ThemeBackground>
    
  );
}