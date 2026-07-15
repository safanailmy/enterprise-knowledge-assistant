import WorkspaceSelector from "./WorkspaceSelector";
import NotificationButton from "./NotificationButton";
import ProfileMenu from "./ProfileMenu";

export default function TopBar() {
  return (
    <header
    className="
    flex
    items-center
    justify-between
    px-10
    pt-8
    pb-5
    "
    >
      <WorkspaceSelector />

      <div className="flex items-center gap-3">

        <NotificationButton />

        <ProfileMenu />

      </div>

    </header>
  );
}