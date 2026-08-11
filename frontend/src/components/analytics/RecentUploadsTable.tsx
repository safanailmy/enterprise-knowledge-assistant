import { RecentUploadItem } from "../../types/analytics";

type Props = {
  uploads: RecentUploadItem[];
};

export default function RecentUploadsTable({
  uploads,
}: Props) {
  return (
    <section className="mt-12">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Recent Uploads
      </h2>

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/5
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className="
                sticky
                top-0
                bg-[#173A5D]
              "
            >
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                  Filename
                </th>

                <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                  Uploaded By
                </th>

                <th className="px-6 py-4 text-center text-sm font-medium text-white/60">
                  Version
                </th>

                <th className="px-6 py-4 text-center text-sm font-medium text-white/60">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-sm font-medium text-white/60">
                  Upload Date
                </th>
              </tr>
            </thead>

            <tbody>
              {uploads.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="
                      py-24
                      text-center
                      text-white/40
                    "
                  >
                    No uploads available.
                  </td>
                </tr>
              ) : (
                uploads.map((upload) => (
                  <tr
                    key={upload.document_id}
                    className="
                      border-b
                      border-white/5
                      transition
                      hover:bg-white/5
                    "
                  >
                    <td className="px-6 py-4 text-white">
                      {upload.filename}
                    </td>

                    <td className="px-6 py-4 text-white/80">
                      {upload.department}
                    </td>

                    <td className="px-6 py-4 text-white/80">
                      {upload.uploaded_by}
                    </td>

                    <td className="px-6 py-4 text-center text-white">
                      v{upload.version}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <StatusBadge
                        status={upload.status}
                      />
                    </td>

                    <td className="px-6 py-4 text-right text-white/70">
                      {new Date(
                        upload.upload_date
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

type StatusBadgeProps = {
  status: string;
};

function StatusBadge({
  status,
}: StatusBadgeProps) {
  const colors: Record<string, string> = {
    READY:
      "bg-emerald-500/15 text-emerald-300",

    PROCESSING:
      "bg-amber-500/15 text-amber-300",

    FAILED:
      "bg-red-500/15 text-red-300",
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${
          colors[status] ??
          "bg-slate-500/15 text-slate-300"
        }
      `}
    >
      {status}
    </span>
  );
}