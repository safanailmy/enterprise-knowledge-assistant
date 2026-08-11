import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import ThemeBackground from "../components/layout/ThemeBackground";
import TopBar from "../components/layout/TopBar";

import { ProfileProvider, useProfile } from "../context/ProfileContext";
import ProfileModal from "../components/profile/ProfileModal";

import { useEffect, useState } from "react";
import { getMyProfile } from "../api/users";
import { MyProfileResponse } from "../types/user";

function LayoutContent() {
  const { open, closeProfile } = useProfile();

  const [user, setUser] =
    useState<MyProfileResponse | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getMyProfile();
        setUser(profile);
      } catch (err) {
        console.error(err);
      }
    }

    loadProfile();
  }, []);

  return (
    <>
      <ThemeBackground>
        <div className="flex h-screen overflow-hidden">

          <Sidebar />

          <main className="flex min-w-0 flex-1 flex-col overflow-hidden">

            <TopBar />

            <div className="flex-1 overflow-hidden p-8">
              <Outlet />
            </div>

          </main>

        </div>
      </ThemeBackground>

      <ProfileModal
        open={open}
        user={user}
        onClose={closeProfile}
      />
    </>
  );
}

export default function AuthenticatedLayout() {
  return (
    <ProfileProvider>
      <LayoutContent />
    </ProfileProvider>
  );
}