import HeroSection from "../../components/auth/HeroSection";
import LoginCard from "../../components/auth/LoginCard";

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <div
        className="
          mx-auto
          flex
          min-h-screen
          max-w-7xl
          items-center
          justify-between
          gap-16
          px-10
        "
      >
        <HeroSection />

        <div className="-translate-y-4">
            <LoginCard />
        </div>
      </div>
    </main>
  );
}