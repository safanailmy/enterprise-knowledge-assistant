import CreateUserForm from "../../components/users/CreateUserForm";

export default function UsersPage() {
  return (
    <div className="flex justify-center">
      <main className="w-full max-w-4xl px-10 pt-2 pb-20">
        {/* Header */}
        <div>

          <p className="mt-2 text-sm text-white/60">
            Manage employee accounts for the Enterprise Knowledge Assistant.
          </p>

          <div className="mt-5 border-b border-white/10" />
        </div>

        <div className="mt-8 ">
          <CreateUserForm />
        </div>
      </main>
    </div>
  );
}